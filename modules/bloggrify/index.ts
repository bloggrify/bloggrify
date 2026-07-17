import {consola} from 'consola'
import {colors} from 'consola/utils'
import {createResolver, defineNuxtModule} from '@nuxt/kit'
import {createJiti} from 'jiti'
import {defu} from 'defu'
import fs from 'node:fs'
import type {AppConfig} from '@nuxt/schema'

// `SeoConfig` is declared inside the `@nuxt/schema` augmentation, and a module
// augmentation cannot add new exports, so it is reached through `AppConfig`.
type SeoConfig = NonNullable<AppConfig['seo']>

/** The only part of a layer's `app.config.ts` this module reads at build time. */
type PartialAppConfig = {seo?: SeoConfig}

export default defineNuxtModule({
    meta: {
        name: 'bloggrify',
        configKey: 'bloggrify',
    },
    setup (options, nuxt) {

        const {resolve} = createResolver(import.meta.url)

        // Defaults for the `seo` key. These land in Nuxt's inline app config, which
        // has the lowest priority, so any user `app.config.ts` overrides them.
        nuxt.options.appConfig.seo = defu(nuxt.options.appConfig.seo, {
            ai: {
                llms: false,
                allowCrawlers: true,
            },
        })

        // `/llms.txt` is opt-in, so the route must only be prerendered when the user
        // asked for it: an unconditional prerender would emit a 404 on every build
        // for everyone else. Deciding this needs the merged app config at build time,
        // which Nuxt only exposes as a list of file paths (`app:resolve`), hence the
        // manual read below. `prerender:routes` fires later, so the flag is set by then.
        let llmsEnabled = false

        nuxt.hook('prerender:routes', (ctx) => {
            if (llmsEnabled) {
                ctx.routes.add('/llms.txt')
            }
        })

        nuxt.hook('app:resolve', async (app) => {
            const seo = await _readSeoConfig(app.configs)
            llmsEnabled = seo?.ai?.llms === true

            if (llmsEnabled && seo?.ai?.allowCrawlers === false) {
                consola.warn(
                    colors.greenBright('Bloggrify') + ' - contradictory `seo.ai` config: ' +
                    '`llms: true` publishes an LLM-friendly index of your content, while ' +
                    '`allowCrawlers: false` asks AI crawlers to stay away. Keeping both, but ' +
                    'you probably want only one.'
                )
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
                    message += 'BASE_URL is not set. This is not a problem if you are running Bloggrify in development mode.\n' +
                        'However, it is recommended to set BASE_URL in production.\n\n'
                }

                if(!process.env.SITE_INDEXABLE) {
                    message += 'SITE_INDEXABLE is not set. It means your site will not be indexed by search engines..\n' +
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

/**
 * Reads the `seo` key out of the resolved `app.config.ts` files, most specific first.
 *
 * `app.config.ts` relies on the `defineAppConfig` auto-import, which only exists inside
 * the bundler, so it is stubbed here for the duration of the read. The identity stub
 * matches Nuxt's own implementation.
 */
async function _readSeoConfig (configPaths: string[]): Promise<SeoConfig | undefined> {
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
        return configs.reduce<PartialAppConfig>((merged, config) => defu(merged, config), {}).seo
    } finally {
        globals.defineAppConfig = previous
    }
}

function _createError (message: string) {
    const error = new Error(message)
    try {error.stack = ''} catch { /* runtime not supports */ }
    return error
}
