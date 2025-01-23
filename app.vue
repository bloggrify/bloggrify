<template>
    <div class="flex flex-col min-h-screen">
        <NuxtPage />
    </div>
</template>
<script setup lang="ts">
import {useAnalytics} from '#imports'
import {useColorMode, useDark} from '@vueuse/core'

const config = useAppConfig()

useAnalytics()
useColorMode({initialValue: 'light'})
useDark().value = false

useSchemaOrg([
    defineWebSite({
        name: config.name,
        url: config.url,
        description: config.description,
        inLanguage: config.language || 'en',
    })
])

useHead({
    htmlAttrs: {
        lang: config.language || 'en',
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
            content: config.theme || 'minimalist',
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

.dark .pieTitleText,
.dark .titleText,
.dark .sectionTitle,
.dark  .legend text,
.dark  .legend tspan,
.dark  .tick text,
.dark .messageText,
.dark .loopText tspan  {
    fill: white !important;
}
.dark .messageLine0, .dark .messageLine1 {
    stroke: #d9d9d9 !important;
}
</style>
