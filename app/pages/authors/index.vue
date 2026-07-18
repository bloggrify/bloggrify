<template>
    <NuxtLayout :name="theme" :authors="authors" fallback='invalid' />
</template>
<script setup lang="ts">
import type { LayoutKey } from "#app"

const config = useAppConfig()

// The authors directory is opt-in (see `authors_page` in app.config.ts). When it is
// not enabled, `/authors` must not exist: 404 instead of falling back to the default
// author (which is what the `[...username].vue` catch-all would otherwise do for the
// bare `/authors` path).
if (config.authors_page?.enabled !== true) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
        fatal: true
    })
}

// Resolution lives here, not in the theme layout: a theme only styles the list it is
// handed, it never reads the config itself (no data fetching in themes).
const authors = config.authors ?? []

const configTheme = config.theme || 'minimalist'
const theme = `themes-${configTheme}-authors` as LayoutKey

const title = 'Authors'
const description = `The authors writing on ${config.name}`

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})
</script>
