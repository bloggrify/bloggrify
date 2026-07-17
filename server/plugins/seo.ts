import { AiBots } from '@nuxtjs/robots/util'
import type { HookRobotsConfigContext } from '@nuxtjs/robots'

/**
 * AI crawlers absent from the `AiBots` list shipped by `@nuxtjs/robots` (checked against 6.1.2).
 *
 * Two gaps upstream make the module's list alone insufficient:
 * - it only knows Anthropic's legacy `Claude-Web` / `anthropic-ai` names, not `ClaudeBot`, which is
 *   the crawler actually in use;
 * - its `Omigili` / `OmigiliBot` entries are misspellings of `omgili` / `omgilibot` (Webz.io) and
 *   therefore match nothing.
 *
 * Names follow the ai.robots.txt project (https://github.com/ai-robots-txt/ai.robots.txt), which is
 * the reference list. This is a curated subset: it covers the AI vendors, not every scraper or coding
 * agent that project tracks. Users who want the exhaustive list can add their own group through the
 * `robots.groups` key of their `nuxt.config.ts`.
 *
 * Deliberately NOT listed, because blocking them breaks features users expect:
 * - `Applebot` powers Siri and Spotlight search. Only `Applebot-Extended`, its AI-training
 *   counterpart, belongs here, and the module already ships it.
 * - `facebookexternalhit` fetches Open Graph previews. Blocking it kills link previews on Facebook
 *   and WhatsApp.
 * - `Googlebot` is untouched by design: only Google's AI-specific agents are listed, so the blog
 *   stays indexed in Search.
 */
const ADDITIONAL_AI_BOTS = [
    // Anthropic
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    // OpenAI
    'OAI-SearchBot',
    // Google (AI surfaces only)
    'GoogleOther',
    'Google-CloudVertexBot',
    'Google-NotebookLM',
    'Gemini-Deep-Research',
    // Meta
    'meta-externalagent',
    'meta-externalfetcher',
    // Amazon
    'Amazonbot',
    'bedrockbot',
    // Webz.io, correcting the module's misspelling
    'omgili',
    'omgilibot',
    'Webzio-Extended',
    // Other vendors
    'Perplexity-User',
    'MistralAI-User',
    'DeepSeekBot',
    'AI2Bot',
    'Ai2Bot-Dolma',
    'YouBot',
    'Timpibot',
    'PanguBot',
    'DuckAssistBot',
    'FirecrawlAgent',
    'TikTokSpider',
    'ICC-Crawler',
    'Kangaroo Bot',
    'SemrushBot-OCOB',
    'YandexAdditional',
    'YandexAdditionalBot',
    'img2dataset',
]

/** The module's list, completed and deduplicated. */
const AI_CRAWLERS = [...new Set([...AiBots, ...ADDITIONAL_AI_BOTS])]

/**
 * Applies the `seo` key of `app.config.ts` to the runtime SEO surface.
 *
 * This runs as a Nitro plugin rather than at build time on purpose: `app.config.ts`
 * is only merged across layers inside the Nitro bundle (`@nuxt/nitro-server` wires
 * every layer's `app/app.config` into Nitro's own `useAppConfig()`), and both hooks
 * used here are order-independent with regard to module registration.
 *
 * During a static build these hooks run while `robots.txt` and `sitemap.xml` are
 * prerendered, so the generated files reflect the user's config.
 */
export default defineNitroPlugin((nitroApp) => {
    const appConfig = useAppConfig()
    const seo = appConfig.seo

    // `site.url` and `site.indexable` are seeded from the BASE_URL / SITE_INDEXABLE env
    // vars when `nuxt.config.ts` is evaluated, and fall back to a development default
    // (`http://localhost:3000`, non-indexable). Pushing onto the site config stack lets
    // `app.config.ts` win, while leaving the env-based default in place when the key is
    // not set.
    //
    // This is what nuxt-robots and nuxt-sitemap read: setting `nuxt.options.site` at
    // build time is not enough for them. `modules/bloggrify` still has to mirror `url`
    // into `runtimeConfig.public.url`, which is the separate source the canonical and
    // og:url tags are built from, and which this hook cannot reach.
    nitroApp.hooks.hook('site-config:init', ({ siteConfig }) => {
        if (appConfig.url) {
            siteConfig.push({ url: appConfig.url })
        }

        if (typeof seo?.indexable === 'boolean') {
            siteConfig.push({ indexable: seo.indexable })
        }
    })

    if (!seo) {
        return
    }

    // Note: when the site is not indexable, nuxt-robots short-circuits to a blanket
    // `Disallow: /` and never fires `robots:config`. That is fine, everything is
    // already blocked in that case.
    if (seo.ai?.allowCrawlers === false) {
        nitroApp.hooks.hook('robots:config', (ctx: HookRobotsConfigContext) => {
            ctx.groups.push({
                userAgent: AI_CRAWLERS,
                comment: ['Block AI crawlers (seo.ai.allowCrawlers: false)'],
                disallow: ['/'],
                allow: [],
            })
        })
    }
})
