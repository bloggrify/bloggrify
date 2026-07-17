<template>
  <UApp>
    <NuxtLoadingIndicator />
    <div class="flex flex-col min-h-screen">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>
<script setup lang="ts">
import {useAnalytics} from '#imports'

const config = useAppConfig()

useAnalytics()

// Color mode is configured declaratively in nuxt.config (`colorMode.preference: 'light'`):
// every site defaults to light, and a theme enables dark simply by rendering a toggle
// (e.g. `UColorModeButton`). The core does not force or override the mode here, so it never
// has to know which theme is active.

useSchemaOrg([
    defineWebSite({
        name: config.name,
        url: config.url,
        description: config.description,
        inLanguage: (config.language || 'en') as string,
    })
])

useHead({
    htmlAttrs: {
        lang: (config.language || 'en') as string,
    },
    link: [
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'RSS Feed',
          href: '/rss.xml'
        },
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
