import { serverQueryContent } from "#content/server";
import { Feed } from "feed";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const docs = await serverQueryContent(event)
        .where({ listed: { $ne: false } })
        .sort({ date: -1 })
        .find();

    const now = new Date();

    const feed = new Feed({
        title: config.public.name,
        description: config.public.description,
        id: config.public.url,
        link: config.public.url,
        favicon: config.public.url + "/favicon.ico",
        copyright: `All rights reserved ${now.getFullYear()}, ${config.public.name}`,
        generator: "https://github.com/jpmonette/feed",
    });
    docs.forEach((post) => {
        const path = post._path;

        feed.addItem({
            title: post.title ?? "-",
            id: config.public.url + path,
            link: config.public.url + path,
            description: post.description,
            date: new Date(post.date),
        });
    });

    event.node.res.setHeader("content-type", "text/xml");
    return feed.rss2();
});
