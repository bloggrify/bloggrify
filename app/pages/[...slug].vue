<template>
    <NuxtLayout :name="theme" :doc="doc"  fallback='invalid' />
</template>
<script setup lang="ts">
import type { LayoutKey, NuxtError } from "#app"
import {joinURL, withoutTrailingSlash} from 'ufo'
import {findAuthor, msToISO8601Duration, resolveSocialLinks} from '#imports'

const route = useRoute()
const config = useAppConfig()
const slug = route.params.slug as string[]

/**
 * Checks and throws errors from Nuxt data fetching composables
 * @param error Error property from useAsyncData()
 */
function checkFetchError(error: Ref<NuxtError<unknown> | undefined>){
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
let theme = `themes-${configTheme}-default` as LayoutKey

const {data: doc, error} = await useAsyncData(route.path, () => {
    return queryCollection('page').path(getDocumentPath()).first()
})

// Check for fetch error
checkFetchError(error)

// A draft is never published. The module already keeps drafts out of the prerendered
// routes, so this only bites when something links to one explicitly: rather than
// generating the page anyway, the build reports it and writes nothing.
// Drafts stay fully visible in dev, which is the point of writing one.
if (!import.meta.dev && doc.value?.draft) {
    throw createError({statusCode: 404, statusMessage: 'This post is a draft.', fatal: true})
}

if (doc.value?.layout) {
    const documentLayout = doc.value.layout as LayoutKey
    // a document Layout can be either : themes-something-${configTheme} or layout
    // if it's a layout, we need to prefix it with themes-${configTheme}-
    if (!documentLayout.startsWith('themes')) {
        theme = `themes-${configTheme}-${documentLayout}` as LayoutKey
    } else {
        theme = documentLayout
    }
}

if (doc.value?.redirect_to_domain) {
    const redirect = doc.value?.redirect_to_domain + doc.value?.path
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

const runtimeConfig = useRuntimeConfig()
const url = withoutTrailingSlash(runtimeConfig.public.url)

const postLink = withoutTrailingSlash(joinURL(url, doc.value?.path || '/'))

const author = findAuthor(doc.value?.author)
let schemaAuthor

if (author?.name) {
    // Link the Person to their author page (`url`) and their profiles (`sameAs`) so
    // search engines can reconcile the byline across the site and the wider web.
    // `sameAs` reuses `resolveSocialLinks` rather than re-mapping the socials block.
    const sameAs = resolveSocialLinks(author.socials).map(link => link.url)
    schemaAuthor = {
        '@type': 'Person',
        name: author.name,
        url: author.username
            ? withoutTrailingSlash(joinURL(url, 'authors', author.username))
            : undefined,
        sameAs: sameAs.length ? sameAs : undefined,
    }
}

// `twitter_username` is a handle, not a profile URL: its only job is to attribute
// the post to its author on X. Rendered here as `twitter:creator` (P19).
const twitterCreator = author?.socials?.twitter_username
    ? `@${author.socials.twitter_username}`
    : undefined
let timeRequired
if (doc.value?.readingTime?.time && doc.value?.readingTime?.time > 0) {
    timeRequired = msToISO8601Duration(doc.value.readingTime.time)
}

useSchemaOrg([
    defineArticle({
        '@type': 'BlogPosting',
        datePublished: doc.value?.date,
        headline: doc.value?.title,
        author: schemaAuthor,
        timeRequired: timeRequired,
    }),
])

useHead({
    link: [
        {
            rel: 'canonical',
            href: postLink
        }
    ]
})

// `seo` is typed loosely by Nuxt Content, and `@nuxtjs/robots` injects `seo.robots`
// after parsing, so the resolved directive string is not visible to the schema.
const docRobots = doc.value?.seo?.robots as string | undefined

useSeoMeta({
    title: doc.value?.title,
    description: doc.value?.description,
    // `@nuxtjs/robots` turns the `robots` frontmatter into `seo.robots` at parse time,
    // but it is up to the page to emit it. Left undefined, the module's own site-wide
    // default applies, so this only ever narrows a single page.
    robots: docRobots,
    ogTitle: doc.value?.title,
    ogDescription: doc.value?.description,
    author: author?.name,
    articleAuthor: author?.name ? [author.name] : undefined,
    ogType: 'article',
    ogUrl: withoutTrailingSlash(postLink),
    twitterTitle: doc.value?.title,
    twitterDescription: doc.value?.description,
    twitterCreator: twitterCreator,
    twitterCard: 'summary',
    articleTag: doc.value?.tags ? doc.value.tags : [],
})

if (doc.value?.readingTime?.time && doc.value?.readingTime?.time > 0) {
    useSeoMeta({
        twitterLabel1: 'Est. reading time',
        twitterData1: doc.value?.readingTime?.text,
        twitterLabel2: 'Est. reading time',
        twitterData2: doc.value?.readingTime?.text,
    })
}

if (doc.value?.cover) {
    useSeoMeta({
        ogImage: joinURL(url, 'images', doc.value?.cover),
        ogImageAlt: doc.value?.title,
        twitterImage: joinURL(url ,'images/', doc.value?.cover)
    })
} else {
  defineOgImage('BlogPostSatori', {
    title: doc.value?.title,
    description: doc.value?.description,
    author: author?.name,
  })
}

if (doc.value?.date) {
    useSeoMeta({
        articlePublishedTime: new Date(doc.value?.date).toISOString(),
        articleModifiedTime: new Date(doc.value?.date).toISOString()
    })
}
</script>
