<template>
    <NuxtLayout :name="theme"  fallback='invalid' />
</template>
<script setup lang="ts">

const config = useAppConfig()

const configTheme = config.theme || 'minimalist'
const theme = `themes-${configTheme}-archives`


const title = 'Archives'
const description = 'List of all posts'
useSeoMeta({
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})


</script>
