import { queryCollection } from '@nuxt/content/server'
import type { PageCollectionItem } from '@nuxt/content'
import { withoutTrailingSlash } from 'ufo'

/**
 * Generates `/llms.txt`, a markdown index of the blog aimed at LLM consumption.
 *
 * See https://llmstxt.org. The route is only prerendered when `seo.ai.llms` is
 * enabled in `app.config.ts`; the guard below covers the dev server, where every
 * route is reachable.
 */
export default defineEventHandler(async (event) => {
    const config = useAppConfig()

    if (!config.seo?.ai?.llms) {
        throw createError({
            statusCode: 404,
            statusMessage: 'llms.txt is disabled. Set `seo.ai.llms: true` in app.config.ts to enable it.',
        })
    }

    const url = withoutTrailingSlash(useRuntimeConfig().public.url)

    const posts = await queryCollection(event, 'page')
        .order('date', 'DESC')
        .all()

    const published = posts.filter((post: PageCollectionItem) => {
        return Boolean(post.date) && !post.draft && post.listed !== false
    })

    const lines: string[] = [
        `# ${config.name}`,
        '',
        `> ${config.description}`,
        '',
        '## Posts',
        '',
    ]

    for (const post of published) {
        const link = withoutTrailingSlash(url + post.path)
        const title = post.title ?? '-'
        lines.push(post.description ? `- [${title}](${link}): ${post.description}` : `- [${title}](${link})`)
    }

    lines.push('')

    setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')

    return lines.join('\n')
})
