<template>
    <NuxtLayout :name="theme" :doc="doc" :docs="docs" :current-page="page" :total="totalNumberOfPages" :category="category" :tag="tag" fallback='invalid' />
</template>
<script setup lang="ts">
import type { NuxtError } from '#app'
import {withoutTrailingSlash} from 'ufo'

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

// detect if we are on a special page like :
// /categories/something/page/2
// /tags/something/page/2
// /archives/page/1
const isCategory = slug[0] === 'categories'
const isTag = slug[0] === 'tags'
const isArchives = slug[0] === 'archives'

let doc = null
let docs = null
let page = 1
let totalNumberOfPages = 1
const configTheme = config.theme || 'minimalist'
let theme = `themes-${configTheme}-default`
let category = ''
let tag = ''
const numberOfPostsPerPage = config.pagination?.per_page || 10

if (isCategory) {
    category = slug[1]
    const title = 'Category: ' + category
    const description = title
    useSeoMeta({
        title: 'Archives',
        description: description,
        ogTitle: title,
        ogDescription: description,
        twitterTitle: title,
        twitterDescription: description
    })
    page = Number.parseInt(slug[3]) || 1
    const where = { categories: { $in: category }, hidden: { $ne: true }, listed: { $ne: false } }
    const {data: result, error} = await useAsyncData(route.path, () => {
        let queryBuilder = queryContent('')
            .where(where)
            .sort({ date: -1 })

        if (numberOfPostsPerPage != -1) {
            queryBuilder = queryBuilder.limit(numberOfPostsPerPage).skip((page - 1) * numberOfPostsPerPage)
        }

        return queryBuilder.find()
    })

    // Check for fetch error
    checkFetchError(error)

    totalNumberOfPages = await queryContent('').where(where).count()
    docs = result
    theme = `themes-${configTheme}-category`
} else if (isArchives) {
    const title = 'Archives'
    const description = 'Archives'
    useSeoMeta({
        title: title,
        description: description,
        ogTitle: title,
        ogDescription: description,
        twitterTitle: title,
        twitterDescription: description
    })

    page = Number.parseInt(slug[2]) || 1
    const where = { hidden: { $ne: true }, listed: { $ne: false }}

    const {data: result, error } = await useAsyncData(route.path, () => {
        let queryBuilder = queryContent('')
            .where(where)
            .sort({ date: -1 })

        if (numberOfPostsPerPage != -1) {
            queryBuilder = queryBuilder.limit(numberOfPostsPerPage).skip((page - 1) * numberOfPostsPerPage)
        }

        return queryBuilder.find()
    })

    // Check for fetch error
    checkFetchError(error)

    // TODO: handle fetch error
    totalNumberOfPages = await queryContent('').where(where).count()

    docs = result
    theme = `themes-${configTheme}-archive`

} else if (isTag) {
    tag = slug[1]
    const title = 'Tag: ' + tag
    const description = title
    useSeoMeta({
        title: 'Archives',
        description: description,
        ogTitle: title,
        ogDescription: description,
        twitterTitle: title,
        twitterDescription: description
    })
    page = Number.parseInt(slug[2]) || 1
    const where = { tags: { $in: tag }, hidden: { $ne: true }, listed: { $ne: false } }
    const {data: result, error} = await useAsyncData(route.path, () => {
        let queryBuilder = queryContent('')
            .where(where)
            .sort({ date: -1 })

        if (numberOfPostsPerPage != -1) {
            queryBuilder = queryBuilder.limit(numberOfPostsPerPage).skip((page - 1) * numberOfPostsPerPage)
        }

        return queryBuilder.find()
    })

    // Check for fetch error
    checkFetchError(error)

    // TODO: handle fetch error
    totalNumberOfPages = await queryContent('').where(where).count()

    docs = result
    theme = `themes-${configTheme}-tag`
} else {
    const {data: result, error} = await useAsyncData(route.path, () => {
        return queryContent('').where({ _path: route.path }).findOne()
    })

    // Check for fetch error
    checkFetchError(error)

    doc = result

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

    useSeoMeta({
        canonical: withoutTrailingSlash(postLink),
        ogType: 'article',
        ogUrl: withoutTrailingSlash(postLink),
        twitterTitle: doc.value?.title,
        twitterCard: 'summary',
        articleTag: doc.value?.tags ? doc.value.tags?.toString() : ''
    })

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
}
</script>
