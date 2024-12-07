import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'
import {cleanDoubleSlashes, withoutLeadingSlash, withTrailingSlash} from 'ufo'

export default defineEventHandler(async (event) => {
    const config = useAppConfig()
    const url = withTrailingSlash(config.url)

    const docs = await serverQueryContent(event)
        .where({ hidden: { $ne: true }, draft: { $ne: true } })
        .find()
    const sitemap = new SitemapStream({
        hostname: url,
        xslUrl: 'style.xsl',
    })
    for (const doc of docs) {
        sitemap.write({
            url: cleanDoubleSlashes(url + withoutLeadingSlash(doc._path)),
            lastmod: doc.date ,
            img: doc.cover ? [{
                url: url + withoutLeadingSlash(doc.cover),
                caption: doc.title || '',
            }] : undefined
        })
    }

    sitemap.end()
    return streamToPromise(sitemap)
})
