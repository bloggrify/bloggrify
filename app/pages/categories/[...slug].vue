<template>
    <NuxtLayout :name="theme" :category="category" fallback='invalid' />
</template>
<script setup lang="ts">
import type { LayoutKey } from "#build/types/layouts"
const route = useRoute()
const config = useAppConfig()
const slug = route.params.slug as string[]

const configTheme = config.theme || 'minimalist'
const category = slug[0]
const title = 'Category: ' + category
const description = title
useSeoMeta({
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})

const theme = `themes-${configTheme}-category` as LayoutKey
</script>
