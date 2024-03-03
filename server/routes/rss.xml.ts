import { serverQueryContent } from "#content/server";
import { Feed } from "feed";

export default defineEventHandler(async (event) => {
    const config = useAppConfig();
    // @ts-ignore
    const url = config.url?.replace(/\/$/, "");

    const docs = await serverQueryContent(event)
        .where({ listed: { $ne: false } })
        .sort({ date: -1 })
        .find();

    const now = new Date();

    const feed = new Feed({
        title: config.name,
        description: config.description,
        id: url,
        link: url,
        favicon: url + "/favicon.ico",
        copyright: `All rights reserved ${now.getFullYear()}, ${config.name}`,
        generator: "https://github.com/jpmonette/feed",
    });
    docs.forEach((post) => {
        const path = post._path;

        feed.addItem({
            title: post.title ?? "-",
            id: url + path,
            link: url + path,
            description: post.description,
            date: new Date(post.date),
        });
    });

    event.node.res.setHeader("content-type", "text/xml");
    return feed.rss2();
});
