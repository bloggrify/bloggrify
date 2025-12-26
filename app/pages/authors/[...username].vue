<template>
    <NuxtLayout :name="theme" :author="author" fallback='invalid' />
</template>
<script setup lang="ts">
import type { LayoutKey } from "#build/types/layouts"

const route = useRoute()
const config = useAppConfig()
const params = route.params.username as string | string[]

// Handle pagination: /authors/username or /authors/username/page/2
let username: string | undefined
if (Array.isArray(params)) {
    // params = ['username', 'page', '2']
    username = params[0]
} else {
    username = params
}

const configTheme = config.theme || 'minimalist'
const theme = `themes-${configTheme}-author` as LayoutKey

// Find the author from app.config
const author = findAuthor(username)

// If author not found, throw 404 error
if (!author) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Author not found',
        fatal: true
    })
}

// SEO meta
const title = author.name || username
const description = author.description || `Posts by ${author.name}`

useSeoMeta({
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})
</script>
