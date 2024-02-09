// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {

      name: "Bloggr",

      author : {
        name : "John Doe",
        description : "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        image : "/images/avatar.webp",
        socials : [
          { name: "Twitter", link: "https://twitter.com" },
          { name: "Mastodon", link: "https://piaille.fr" },
          { name: "Youtube", link: "https://youtube.com" },
          { name: "Facebook", link: "https://facebook.com" },
          { name: "Instagram", link: "https://instagram.com" },
          { name: "Github", link: "https://github.com" },
        ],
      },

      menu : [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ],
    }
  },

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/content', "@nuxt/image"],
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
})
