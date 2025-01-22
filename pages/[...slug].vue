<template>
    <NuxtLayout :name="theme" :doc="doc"  fallback='invalid' />
</template>
<script setup lang="ts">
import type { NuxtError } from '#app'
import {withoutTrailingSlash} from 'ufo'
import {findAuthor} from '~/composables/useAuthor'
import {msToISO8601Duration} from '~/composables/useDateFormat'

const route = useRoute()
const config = useAppConfig()
const slug = route.params.slug as string[]

/**
 * Checks and throws errors from Nuxt data fetching composables
 * @param error Error property from useAsyncData()
 */
function checkFetchError(error: Ref<NuxtError<unknown> | null>){
    // Check for error after fetching result
    if (error.value) {
        // Error must be declared as fatal or it will be ignored in production CSR mode
        throw createError({...error.value, fatal:true})
    }
}

const isPaginated = slug[slug.length - 2] === 'page' && !Number.isNaN(Number(slug[slug.length - 1]))

const getDocumentPath = () => {
    if (!isPaginated) return route.path

    // Retirer '/page/X' de l'URL
    const path = route.path.replace(/\/page\/\d+$/, '')

    // Gérer les cas spéciaux
    if (path === '/' || path === '') return '/'

    return withoutTrailingSlash(path)
}

const configTheme = config.theme || 'minimalist'
let theme = `themes-${configTheme}-default`

const {data: doc, error} = await useAsyncData(getDocumentPath(), () => {
    return queryContent('').where({ _path: getDocumentPath() }).findOne()
})

// Check for fetch error
checkFetchError(error)

if (doc.value?.layout) {
    const documentLayout = doc.value.layout
    // a document Layout can be either : themes-something-${configTheme} or layout
    // if it's a layout, we need to prefix it with themes-${configTheme}-
    if (!documentLayout.startsWith('themes')) {
        theme = `themes-${configTheme}-${documentLayout}`
    } else {
        theme = documentLayout
    }
}

if (doc.value?.redirect_to_domain) {
    const redirect = doc.value?.redirect_to_domain + doc.value?._path
    useHead({
        script: [
            {
                innerHTML: `window.location = "${redirect || '/'}"`,
            },
        ],
    })
}
if (doc.value?.redirect_to_full_url) {
    const redirect = doc.value?.redirect_to_full_url
    useHead({
        script: [
            {
                innerHTML: `window.location = "${redirect || '/'}"`,
            },
        ],
    })
}

if (doc.value) {
    useContentHead(doc.value)
}
const runtimeConfig = useRuntimeConfig()
const url = withoutTrailingSlash(runtimeConfig.public.url)

const postLink = url + doc.value?._path

const author = findAuthor(doc.value?.author)
let schemaAuthor

if (author) {
    schemaAuthor = {
        '@type': 'Person',
        name: author.name,
    }
}
let timeRequired
if (doc.value.readingTime?.time && doc.value.readingTime?.time > 0) {
    timeRequired = msToISO8601Duration(doc.value.readingTime.time)
}

useSchemaOrg([
    defineWebPage({
        '@type': '@BlogPosting',
        datePublished: doc.value?.date,
        headline: doc.value?.title,
        author: schemaAuthor,
        timeRequired: timeRequired,
    }),
])

useSeoMeta({
    canonical: withoutTrailingSlash(postLink),
    author: findAuthor(doc.value?.author).name,
    articleAuthor: findAuthor(doc.value?.author).name,
    ogType: 'article',
    ogUrl: withoutTrailingSlash(postLink),
    twitterTitle: doc.value?.title,
    twitterCard: 'summary',
    articleTag: doc.value?.tags ? doc.value.tags?.toString() : '',
})

if (doc.value.readingTime?.time && doc.value.readingTime?.time > 0) {
    useSeoMeta({
        twitterLabel1: 'Est. reading time',
        twitterData1: doc.value?.readingTime?.text,
        twitterLabel2: 'Est. reading time',
        twitterData2: doc.value?.readingTime?.text,
    })
}

if (doc.value?.cover) {
    useSeoMeta({
        ogImage: url + '/images/' + doc.value?.cover,
        ogImageAlt: doc.value?.title,
        twitterImage: url + '/images/' + doc.value?.cover
    })
}

if (doc.value?.date) {
    useSeoMeta({
        articlePublishedTime: new Date(doc.value?.date).toISOString(),
        articleModifiedTime: new Date(doc.value?.date).toISOString()
    })
}
</script>
