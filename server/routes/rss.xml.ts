import { Feed } from 'feed'
import { queryCollection } from '@nuxt/content/server'
import type {CollectionQueryGroup, PageCollectionItem} from '@nuxt/content'
import {withLeadingSlash, withoutTrailingSlash} from 'ufo'

// The `@nuxt/schema` `Author` augmentation is only wired into the app tsconfig, not
// nitro's, so it cannot be imported here. This route only reads three fields, typed
// structurally rather than duplicating the whole type.
type AuthorEntry = { username?: string, name?: string, default?: boolean }

export default defineEventHandler(async (event) => {
    const config = useAppConfig()
    const runtimeConfig = useRuntimeConfig()
    const configUrl = runtimeConfig.public.url
    const url = withoutTrailingSlash(configUrl)

    // Mirror `useAuthor().findAuthor`: a post without an explicit author falls back
    // to the one flagged `default: true`, so the feed credits the same name shown on
    // the page. The composable lives in the app bundle and cannot be imported here.
    const authors = (config.authors ?? []) as AuthorEntry[]
    const resolveAuthorName = (authorId?: string): string | undefined => {
        const author = authorId
            ? authors.find(a => a.username === authorId)
            : authors.find(a => a.default)
        return author?.name
    }

    // Same filter as `useContentListing`: only published, listed posts belong in the feed.
    // These groups are OR'd internally and AND'd together, so each line reads as
    // "flag is off, or was never set".
    const docs = await queryCollection(event, 'page')
      .orWhere((query : CollectionQueryGroup<PageCollectionItem>) => query.where('listed', '=', true).where('listed', 'IS NULL'))
      .orWhere((query : CollectionQueryGroup<PageCollectionItem>) => query.where('draft', '=', false).where('draft', 'IS NULL'))
      .order('date', 'DESC')
        .all()

    const now = new Date()

    const feed = new Feed({
        title: config.name,
        description: config.description,
        id: url,
        link: url,
        language: (config.language || 'en') as string,
        favicon: url + '/favicon.ico',
        copyright: `All rights reserved ${now.getFullYear()}, ${config.name}`,
        generator: 'bloggrify',
    })
    docs.forEach((post: PageCollectionItem) => {
        const path = post.path
        if (post.date) {
            const authorName = resolveAuthorName(post.author)
            feed.addItem({
                title: post.title ?? '-',
                id: withoutTrailingSlash(url + path),
                link: withoutTrailingSlash(url + path),
                description: post.description,
                date: new Date(post.date),
                image: post.cover ? url + withLeadingSlash(post.cover) : undefined,
                // The `feed` library only renders RSS2 `<author>` when an email is set,
                // which authors never have. `<dc:creator>` is the standard name-only
                // byline (what WordPress emits); its namespace is declared below.
                extensions: authorName
                    ? [{ name: 'dc:creator', objects: { _text: authorName } }]
                    : undefined,
            })
        }
    })

    event.node.res.setHeader('content-type', 'text/xml')

    // The library only declares `xmlns:dc` when an item carries HTML `content`, which
    // ours never do. Declare it on the root so the `<dc:creator>` above is valid XML.
    return feed.rss2().replace(
        '<rss version="2.0"',
        '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"',
    )
})
