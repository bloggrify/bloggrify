// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: "en",
            },
            script: [
                // {
                //     src: "https://api.pirsch.io/pirsch.js",
                //     id: "pirschjs",
                //     defer: true,
                //     "data-code": "YOUR_PIRSCH_CODE",
                //     type: "text/javascript",
                // },
            ],
        },
    },

    runtimeConfig: {
        public: {
            url: "https://bloggr.com",
            name: "Bloggr",
            description: "A blog about stuff",
            logo: "/images/avatar.webp",

            socials: {
                twitter: "https://twitter.com/username",
                mastodon: "https://piaille.fr",
                youtube: "https://youtube.com",
                linkedin: "https://linkedin.com",
                facebook: "https://facebook.com",
                instagram: "https://instagram.com",
                github: "https://github.com",
            },

            newsletter: {
                enabled: false,
                form_action: "YOUR_NEWSLETTER_FORM_ACTION",
            },

            comments: {
                enabled: false,
                hyvor_talk: {
                    website_id: "YOUR_HYVOR_TALK_WEBSITE_ID",
                },
            },

            table_of_contents: false,

            authors: [
                {
                    default: true,
                    username: "john-doe",
                    name: "John Doe",
                    description:
                        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                    avatar: "/images/avatar.webp",
                    socials: {
                        twitter: "https://twitter.com",
                        twitter_username: "username",
                        mastodon: "https://piaille.fr",
                        youtube: "https://youtube.com",
                        linkedin: "https://linkedin.com",
                        facebook: "https://facebook.com",
                        instagram: "https://instagram.com",
                        github: "https://github.com",
                    },
                },
            ],

            menu: [
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Archives", path: "/archives" },
            ],
        },
    },

    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    modules: ["@nuxt/content", "@nuxt/image"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
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
