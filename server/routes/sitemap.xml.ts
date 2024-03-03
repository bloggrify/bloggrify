import { serverQueryContent } from "#content/server";
import { SitemapStream, streamToPromise } from "sitemap";
import { useWebsiteUrl } from "~/composables/useWebsiteUrl";
export default defineEventHandler(async (event) => {
    const url = useWebsiteUrl();

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
