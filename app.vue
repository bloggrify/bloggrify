<template>
    <div class="flex flex-col min-h-screen">
        <NuxtPage />
    </div>
</template>
<script setup lang="ts">
import {useAnalytics} from '~/composables/useAnalytics'

const config = useAppConfig()

useAnalytics()

useHead({
    htmlAttrs: {
        lang: config.language,
    },
    link: [
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
    ],
    meta: [
        {
            key: 'poweredBy',
            name: 'poweredBy',
            content: 'bloggrify',
        },
        {
            key: 'bloggrify-theme',
            name: 'bloggrify-theme',
            content: config.theme,
        },
    ],
})
</script>
<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.prose {
    img {
        max-width: 80%;
        margin: auto;
    }
}

.katex-html {
    display: none;
}
</style>
