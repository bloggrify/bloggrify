import {consola} from 'consola'
import {colors} from 'consola/utils'
import {createResolver, defineNuxtModule} from '@nuxt/kit'
import {createJiti} from 'jiti'
import {defu} from 'defu'
import fs from 'node:fs'
import {join} from 'node:path'
import type {AppConfig} from '@nuxt/schema'

// `SeoConfig` is declared inside the `@nuxt/schema` augmentation, and a module
// augmentation cannot add new exports, so it is reached through `AppConfig`.
type SeoConfig = NonNullable<AppConfig['seo']>

/** The parts of a layer's `app.config.ts` this module reads at build time. */
type PartialAppConfig = {
    url?: string
    seo?: SeoConfig
    socials?: {sharing_networks?: string[]}
    authors_page?: {enabled?: boolean}
}

export default defineNuxtModule({
    meta: {
        name: 'bloggrify',
        configKey: 'bloggrify',
    },
    async setup (options, nuxt) {

        const {resolve} = createResolver(import.meta.url)

        // `runtimeConfig.public.url` is seeded from BASE_URL in `nuxt.config.ts`, which falls
        // back to `http://localhost:3000`. It is what `pages/[...slug].vue` builds the canonical
        // and og:url tags from, and what `SharingButtons.vue` links to, so a deploy that forgets
        // the env var ships canonical tags pointing at localhost, which is worse than not being
        // indexed at all. Letting `app.config.ts` win keeps the URL next to the rest of the site
        // identity, and makes BASE_URL a pure development fallback.
        //
        // The Nitro plugin in `server/plugins/seo.ts` pushes the same value onto the site config
        // stack for nuxt-robots and nuxt-sitemap. Both are needed: this one never reaches those
        // modules, and that one never reaches the tags rendered by the Vue app.
        //
        // Reading the config here rather than in a later hook is deliberate: `app:resolve` fires
        // after the modules that consume `runtimeConfig` have been set up.
        const layerAppConfig = await _readAppConfig(
            nuxt.options._layers
                .map(layer => join(layer.config.srcDir ?? layer.cwd, 'app.config.ts'))
                .filter(path => fs.existsSync(path))
        )

        if (layerAppConfig.url) {
            nuxt.options.runtimeConfig.public.url = layerAppConfig.url

            // Between 2.0 and 3.1 the site URL came from BASE_URL only, so an upgraded project can
            // carry both, with `app.config.ts` holding a value nobody has looked at in a while.
            // The precedence flipped in 3.2, so that value now silently takes over the canonical
            // tags: exactly the kind of SEO breakage nobody notices. Surface it instead of guessing.
            //
            // Only outside dev: pointing BASE_URL at localhost while `url` holds the production URL
            // is the normal development setup, and warning about it on every `npm run dev` would
            // just train everyone to ignore the message.
            if (!nuxt.options.dev && process.env.BASE_URL && process.env.BASE_URL !== layerAppConfig.url) {
                consola.warn(
                    colors.greenBright('Bloggrify') + ' - the site URL is set twice, and the two ' +
                    'disagree:\n' +
                    `  app.config.ts  url: '${layerAppConfig.url}'  <- used\n` +
                    `  BASE_URL           '${process.env.BASE_URL}'  <- ignored\n` +
                    'Since 3.2 `url` in app.config.ts takes precedence and BASE_URL is only a ' +
                    'development fallback. Check that the app.config.ts value is really your ' +
                    'public URL: it drives the canonical tags, og:url, the sitemap and the RSS ' +
                    'feed. Once it is correct, you can drop BASE_URL.'
                )
            }
        }

        // The `/authors` directory is opt-in (`authors_page.enabled`). Unlike the dynamic
        // tag/category pages, it is a *static* route, so Nitro tries to prerender it on every
        // build; when the feature is off, the page raises a 404 and that aborts `nuxt generate`.
        // Decide it once here, at setup (before Nitro is configured): prerender `/authors` only
        // when enabled (added in `prerender:routes` below), and ignore it otherwise. The regex
        // is anchored so it never swallows the individual `/authors/{username}` pages.
        const authorsPageEnabled = layerAppConfig.authors_page?.enabled === true
        if (!authorsPageEnabled) {
            nuxt.options.nitro.prerender ??= {}
            nuxt.options.nitro.prerender.ignore ??= []
            ;(nuxt.options.nitro.prerender.ignore as Array<string | RegExp>).push(/^\/authors\/?$/)
        }

        // Defaults for the `seo` key. These land in Nuxt's inline app config, which
        // has the lowest priority, so any user `app.config.ts` overrides them.
        nuxt.options.appConfig.seo = defu(nuxt.options.appConfig.seo, {
            ai: {
                llms: false,
                allowCrawlers: true,
            },
        })

        // `/llms.txt` is opt-in, so the route must only be prerendered when the user asked
        // for it: an unconditional prerender would emit a 404 on every build for everyone
        // else. Deciding this needs the merged app config at build time, which Nuxt only
        // exposes as a list of file paths (`app:resolve`), hence the manual read below.
        // `prerender:routes` fires later, so the flag is set by then. (`/authors` is decided
        // at setup above, since its ignore rule must land before Nitro is configured.)
        let llmsEnabled = false

        nuxt.hook('prerender:routes', (ctx) => {
            if (llmsEnabled) {
                ctx.routes.add('/llms.txt')
            }
            if (authorsPageEnabled) {
                ctx.routes.add('/authors')
            }
        })

        nuxt.hook('app:resolve', async (app) => {
            const appConfig = await _readAppConfig(app.configs)
            const seo = appConfig.seo
            llmsEnabled = seo?.ai?.llms === true

            if (appConfig.socials?.sharing_networks) {
                consola.warn(
                    colors.greenBright('Bloggrify') + ' - `socials.sharing_networks` is deprecated in ' +
                    'your app.config.ts. Sharing buttons are not a social profile: move the list to its ' +
                    'own `sharing: { networks: [...] }` block. The old key still works for now.'
                )
            }

            if (llmsEnabled && seo?.ai?.allowCrawlers === false) {
                consola.warn(
                    colors.greenBright('Bloggrify') + ' - contradictory `seo.ai` config: ' +
                    '`llms: true` publishes an LLM-friendly index of your content, while ' +
                    '`allowCrawlers: false` asks AI crawlers to stay away. Keeping both, but ' +
                    'you probably want only one.'
                )
            }
        })

        // Every page that is not a draft gets prerendered explicitly.
        //
        // Without this, generation relies entirely on Nitro's link crawler, so a page
        // reachable only by URL (`listed: false`) is never written to disk: it is absent
        // from the listings, nothing links to it, the crawler never finds it, and the URL
        // 404s. That defeats the whole point of an unlisted page. Listing them here also
        // keeps the sitemap honest, since it is built from the same content and would
        // otherwise advertise URLs that do not exist.
        //
        // Drafts are deliberately left out: not registering them is what keeps them off
        // the disk, and `pages/[...slug].vue` refuses to render them outside dev as a
        // second line of defence.
        const publishedPaths = new Set<string>()

        nuxt.hook('content:file:afterParse', (ctx) => {
            const content = ctx.content as {path?: string, draft?: boolean, hidden?: boolean, listed?: boolean}

            // `hidden` is the deprecated spelling of `listed: false`. Normalising it here,
            // once, at build time, means every consumer (listings, RSS, llms.txt, themes)
            // only ever has to know about `listed`.
            if (content.hidden === true) {
                if (content.listed === undefined) {
                    content.listed = false
                }
                _warnDeprecatedHidden(ctx.file?.path)
            }

            if (content.path && !content.draft) {
                publishedPaths.add(content.path)
            }
        })

        nuxt.hook('prerender:routes', (ctx) => {
            for (const path of publishedPaths) {
                ctx.routes.add(path)
            }
        })

        // Propagate core's type augmentations (@nuxt/schema AppConfig, Author, etc.)
        // to consuming layers/themes. When Bloggrify is used through `extends`, the
        // core lives in node_modules and its `app/types/*.d.ts` files fall outside the
        // consumer's tsconfig include glob, so we register them explicitly here.
        nuxt.hook('prepare:types', ({references}) => {
            references.push({path: resolve('../../app/types/app-config.d.ts')})
        })

        nuxt.hook('build:before', async () => {

            if(!process.env.BASE_URL || !process.env.SITE_INDEXABLE) {
                let message = colors.greenBright('Bloggrify') + '\n\n'

                if(!process.env.BASE_URL) {
                    message += 'BASE_URL is not set. This is not a problem if you are running Bloggrify in development mode,\n' +
                        'or if you set `url` in your app.config.ts, which takes precedence over BASE_URL.\n' +
                        'Otherwise your site falls back to http://localhost:3000 and the sitemap and canonical\n' +
                        'tags will point there.\n\n'
                }

                if(!process.env.SITE_INDEXABLE) {
                    message += 'SITE_INDEXABLE is not set. It means your site will not be indexed by search engines,\n' +
                        'unless you set `seo.indexable` in your app.config.ts, which takes precedence over SITE_INDEXABLE.\n' +
                        'Set the environment variable SITE_INDEXABLE to true to enable indexing.'
                }

                consola.box(message)
            }


            if (!fs.existsSync(nuxt.options.rootDir + '/content')) {
                consola.box(
                    colors.greenBright('Bloggrify') + '\n\n' +
                    'Missing `content` folder, please add it to your project. Most of the time, this error occurs when you try to start Bloggrify without using an existing theme.  \n\n' +
                    colors.blueBright('Bloggrify is not designed to work without any content. You should follow the documentation here https://bloggrify.com/introduction/installation .')
                )
                throw _createError('Missing `content` folder.')
            }
        })
    }
})

const _deprecatedHiddenFiles = new Set<string>()

/** Warns once per file that `hidden` is deprecated, listing them all in a single box. */
function _warnDeprecatedHidden (filePath?: string) {
    if (!filePath || _deprecatedHiddenFiles.has(filePath)) {
        return
    }
    _deprecatedHiddenFiles.add(filePath)
    consola.warn(
        colors.greenBright('Bloggrify') + ` - \`hidden: true\` is deprecated in ${filePath}. ` +
        'It is an exact synonym of `listed: false`, which is the supported spelling. ' +
        'Treating it as `listed: false` for now.'
    )
}

/**
 * Reads the keys this module needs out of the resolved `app.config.ts` files, most
 * specific first.
 *
 * `app.config.ts` relies on the `defineAppConfig` auto-import, which only exists inside
 * the bundler, so it is stubbed here for the duration of the read. The identity stub
 * matches Nuxt's own implementation.
 */
async function _readAppConfig (configPaths: string[]): Promise<PartialAppConfig> {
    const jiti = createJiti(import.meta.url)
    const globals = globalThis as Record<string, unknown>
    const previous = globals.defineAppConfig
    globals.defineAppConfig = (config: unknown) => config

    try {
        const configs: PartialAppConfig[] = []
        for (const path of configPaths) {
            try {
                configs.push(await jiti.import<PartialAppConfig>(path, {default: true}))
            } catch {
                // A layer's app.config may legitimately fail to load in isolation.
                // Skip it rather than break the build over an optional feature.
            }
        }
        // Same precedence as Nuxt's own app config template: first file wins.
        return configs.reduce<PartialAppConfig>((merged, config) => defu(merged, config), {})
    } finally {
        globals.defineAppConfig = previous
    }
}

function _createError (message: string) {
    const error = new Error(message)
    try {error.stack = ''} catch { /* runtime not supports */ }
    return error
}
