import { serverQueryContent } from "#content/server";
import { SitemapStream, streamToPromise } from "sitemap";
export default defineEventHandler(async (event) => {
    const config = useAppConfig();
    // @ts-ignore
    const url = config.url?.replace(/\/$/, "");

    const docs = await serverQueryContent(event)
        .where({ hidden: { $ne: true } })
        .find();
    const sitemap = new SitemapStream({
        hostname: url,
    });
    for (const doc of docs) {
        sitemap.write({
            url: url + doc._path,
            lastmod: doc.date,
        });
    }
    sitemap.end();
    return streamToPromise(sitemap);
});
