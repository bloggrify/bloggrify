export default defineNuxtConfig({
    routeRules: {
        '/api/search': {
            prerender: true,
            cache: true
        }
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
            script: [
                ...(process.env.PIRSCH_CODE
                    ? [
                        {
                            src: 'https://api.pirsch.io/pirsch.js',
                            id: 'pirschjs',
                            defer: true,
                            'data-code': process.env.PIRSCH_CODE,
                            type: 'text/javascript',
                        },
                    ]
                    : []),
            ],
        },
    },

    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image'],
    image: {
        format: ['webp'],
    },
    content: {
        markdown: {
            remarkPlugins: ['remark-reading-time'],
        },
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
                'md',
                'yaml',
                'python',
                'c',
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
    nitro: {
        prerender: {
            routes: ['/sitemap.xml', '/rss.xml', '/robots.txt'],
        },
    },
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => ['hyvor-talk-comments'].includes(tag),
        },
    },
})
