<template>
    <NuxtLayout :name="theme" :tag="tag" fallback='invalid' />
</template>
<script setup lang="ts">
import type { LayoutKey } from "#app"
const route = useRoute()
const config = useAppConfig()
// Same vue-router 5 guard as the root catch-all: an empty param arrives as `undefined`.
const slug = (route.params.slug ?? []) as string[]

const configTheme = config.theme || 'minimalist'
const tag = slug[0]

// `/tags` without a tag is not a listing we serve, it is a not-found.
if (!tag) {
    throw createError({statusCode: 404, statusMessage: 'Page not found', fatal: true})
}
const title = 'Tag: ' + tag
const description = title
useSeoMeta({
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})

const theme = `themes-${configTheme}-tag` as LayoutKey
</script>
