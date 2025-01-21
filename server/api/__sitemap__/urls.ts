import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { serverQueryContent } from '#content/server'
import { asSitemapUrl } from '#imports'

export default defineEventHandler(async (e) => {
    const contentList = (await serverQueryContent(e).where({ hidden: { $ne: true }, draft: { $ne: true } }).find()) as ParsedContent[]
    return contentList
        .map((c) => {
            return asSitemapUrl({
                loc: `${c._path}`,
                lastmod: c.date,
                images: c.cover ? [{ loc: c.cover, caption: c.title }] : undefined,
                alternatives: c.alternates || [],
            })
        })
})
