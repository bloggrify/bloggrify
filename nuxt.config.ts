const url = process.env.BASE_URL || 'http://localhost:3000'
const indexable = process.env.SITE_INDEXABLE || false

export default defineNuxtConfig({

  site: {
    indexable,
    url
  },

  routeRules: {
    '/api/search': {
      prerender: true
    }
  },

  runtimeConfig: {
    public: {
      url: url,
    }
  },

  devtools: {enabled: true},

  // Easy access to enabling sourcemaps for debugging
  sourcemap: {
    // server: true,
    // client: true
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@stefanobartoletti/nuxt-social-share',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-schema-org'
  ],

  siteConfig: {
    url: url,
  },

  image: {
    format: ['webp'],
  },

  sitemap: {
    includeAppSources: true,
  },

  css: ['~/assets/css/core.css'],

  content: {
    build: {
      markdown: {
        remarkPlugins: {'remark-reading-time': {}, 'remark-math': {}, 'remark-mermaidjs': {}},
        rehypePlugins: {'rehype-katex': {}},
        highlight: {
          langs: [
            'json',
            'js',
            'javascript',
            'ts',
            'typescript',
            'html',
            'css',
            'vue',
            'shell',
            'bash',
            'mdc',
            'mermaid',
            'md',
            'yaml',
            'python',
            'c',
            'csharp',
            'cpp',
            'sql',
            'java',
            'xml',
            'scala',
            'kotlin',
          ],
          theme: {
            default: 'catppuccin-frappe',
            // Theme used if `html.dark`
            dark: 'github-dark',
          },
        },
      },

    },


  },

  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'remove',
      }
    }
  },
  nitro: {
    prerender: {
      routes: ['/rss.xml'],
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['hyvor-talk-comments'].includes(tag),
    },
  },

  compatibilityDate: '2024-11-23',
})
