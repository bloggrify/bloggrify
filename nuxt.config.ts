export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: "en",
            },
            script: [
                ...(process.env.PIRSCH_CODE
                    ? [
                        {
                            src: "https://api.pirsch.io/pirsch.js",
                            id: "pirschjs",
                            defer: true,
                            "data-code": process.env.PIRSCH_CODE,
                            type: "text/javascript",
                        },
                    ]
                    : []),
            ],
        },
    },

    devtools: { enabled: true },
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxt/content",
        "@nuxt/image",
        "@nuxtjs/robots",
    ],
    image: {
        format: ["webp"],
    },
    content: {
        markdown: {
            remarkPlugins: ["remark-reading-time"],
        },
        highlight: {
            theme: {
                default: "catppuccin-frappe",
                // Theme used if `html.dark`
                dark: "github-dark",
            },
        },
    },
    nitro: {
        prerender: {
            routes: ["/sitemap.xml", "/rss.xml"],
        },
    },
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => ["hyvor-talk-comments"].includes(tag),
        },
    },
});
