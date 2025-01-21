<template>
    <NuxtLayout :name="theme" :tag="tag" fallback='invalid' />
</template>
<script setup lang="ts">

const route = useRoute()
const config = useAppConfig()
const slug = route.params.slug as string[]

const configTheme = config.theme || 'minimalist'
const tag = slug[0]
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

const theme = `themes-${configTheme}-tag`
</script>
