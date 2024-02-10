// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            url: "https://bloggr.com",
            name: "Bloggr",
            description: "A blog about stuff",

            author: {
                name: "John Doe",
                description:
                    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                image: "/images/avatar.webp",
                socials: {
                    twitter: "https://twitter.com",
                    mastodon: "https://piaille.fr",
                    youtube: "https://youtube.com",
                    linkedin: "https://linkedin.com",
                    facebook: "https://facebook.com",
                    instagram: "https://instagram.com",
                    github: "https://github.com",
                },
            },

            menu: [
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
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
    },
});
