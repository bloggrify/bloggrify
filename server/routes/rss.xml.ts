import { Feed } from 'feed'
import type { PageCollectionItem } from '@nuxt/content'
import {withLeadingSlash, withoutTrailingSlash} from 'ufo'

export default defineEventHandler(async (event) => {
    const config = useAppConfig()
    const runtimeConfig = useRuntimeConfig()
    const configUrl = runtimeConfig.public.url
    const url = withoutTrailingSlash(configUrl)

    const docs = await queryCollection(event, 'page')
      .orWhere(query => query.where('hidden', '=', true).where('hidden', 'IS NULL'))
      .orWhere(query => query.where('draft', '=', true).where('draft', 'IS NULL'))
      .order('date', 'DESC')
        .all()

    const now = new Date()

    const feed = new Feed({
        title: config.name,
        description: config.description,
        id: url,
        link: url,
        language: config.language,
        favicon: url + '/favicon.ico',
        copyright: `All rights reserved ${now.getFullYear()}, ${config.name}`,
        generator: 'bloggrify',
    })
    docs.forEach((post: PageCollectionItem) => {
        const path = post.path
        if (post.date) {
            feed.addItem({
                title: post.title ?? '-',
                id: withoutTrailingSlash(url + path),
                link: withoutTrailingSlash(url + path),
                description: post.description,
                date: new Date(post.date),
                image: post.cover ? url + withLeadingSlash(post.cover) : undefined,
            })
        }
    })

    event.node.res.setHeader('content-type', 'text/xml')
    return feed.rss2()
})
