import { serverQueryContent } from "#content/server";
import { SitemapStream, streamToPromise } from "sitemap";
export default defineEventHandler(async (event) => {
    const scheme = event.req.headers["x-forwarded-proto"] || "https";
    const host = event.req.headers.host;
    const url = `${scheme}://${host}`;

    const docs = await serverQueryContent(event)
        .where({ listed: { $ne: false } })
        .find();
    const sitemap = new SitemapStream({
        hostname: url,
    });
    for (const doc of docs) {
        sitemap.write({
            url: url + doc._path,
        });
    }
    sitemap.end();
    return streamToPromise(sitemap);
});
