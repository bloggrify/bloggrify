<template>
    <NuxtLayout :name="theme" :doc="doc" :docs="docs" :current-page="page" :total="totalNumberOfPages" :category="category" :tag="tag" />
</template>
<script setup lang="ts">
const route = useRoute()
const config = useAppConfig()
const slug = route.params.slug as string[]

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
let theme = `themes-${config.theme}-default`
let category = ''
let tag = ''
const numberOfPostsPerPage = config.pagination?.per_page || 10

async function fillAllDataForCategoryPages() {
    category = slug[1]
    page = Number.parseInt(slug[3]) || 1
    const where = {categories: {$in: category}, hidden: {$ne: true}, listed: {$ne: false}}
    const result = await useAsyncData(route.path, async () => {
        let queryBuilder = queryContent('')
            .where(where)
            .sort({date: -1})

        if (numberOfPostsPerPage != -1) {
            queryBuilder = queryBuilder.limit(numberOfPostsPerPage).skip((page - 1) * numberOfPostsPerPage)
        }

        return await queryBuilder.find()
    })
    totalNumberOfPages = await queryContent('').where(where).count()
    docs = result.data
}

async function fillAllDataForArchivePages() {
    page = Number.parseInt(slug[2]) || 1
    const where = {hidden: {$ne: true}, listed: {$ne: false}}

    const result = await useAsyncData(route.path, async () => {
        let queryBuilder = queryContent('')
            .where(where)
            .sort({date: -1})

        if (numberOfPostsPerPage != -1) {
            queryBuilder = queryBuilder.limit(numberOfPostsPerPage).skip((page - 1) * numberOfPostsPerPage)
        }

        return await queryBuilder.find()
    })
    totalNumberOfPages = await queryContent('').where(where).count()
    docs = result.data
}

async function fillAllDataForTagPages() {
    tag = slug[1]
    page = Number.parseInt(slug[2]) || 1
    const where = {tags: {$in: tag}, hidden: {$ne: true}, listed: {$ne: false}}
    const result = await useAsyncData(route.path, async () => {
        let queryBuilder = queryContent('')
            .where(where)
            .sort({date: -1})

        if (numberOfPostsPerPage != -1) {
            queryBuilder = queryBuilder.limit(numberOfPostsPerPage).skip((page - 1) * numberOfPostsPerPage)
        }

        return await queryBuilder.find()
    })
    totalNumberOfPages = await queryContent('').where(where).count()
    docs = result.data
}

if (isCategory) {
    await fillAllDataForCategoryPages()
    theme = `themes-${config.theme}-category`
} else if (isArchives) {
    await fillAllDataForArchivePages()
    theme = `themes-${config.theme}-archive`
} else if (isTag) {
    await fillAllDataForTagPages()
    theme = `themes-${config.theme}-tag`
} else {
    const result = await useAsyncData(route.path, async () => {
        return await queryContent('').where({ _path: route.path }).findOne()
    })
    doc = result.data

    if (doc.value?.layout) {
        const documentLayout = doc.value.layout
        // a document Layout can be either : themes-something-${config.theme} or layout
        // if it's a layout, we need to prefix it with themes-${config.theme}-
        if (!documentLayout.startsWith('themes')) {
            theme = `themes-${config.theme}-${documentLayout}`
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

    const url = useAppConfig().url.replace(/\/$/, '')
    const postLink = url + doc.value?._path

    useHead({
        meta: [
            { key: 'og:type', name: 'og:type', content: 'article' },
            {
                key: 'og:url',
                name: 'og:url',
                content: postLink,
            },
            { name: 'twitter:text:title', content: doc.value?.title },
            { name: 'twitter:card', content: 'summary' },
            {
                name: 'article:article:tag',
                content: doc.value?.tags ? doc.value.tags?.toString() : '',
            },
        ],
        link: [
            {
                rel: 'canonical',
                href: postLink,
            },
        ],
    })

    if (doc.value?.alternates) {
        const alternates =
            doc.value?.alternates?.map((alternate: any) => {
                const key = Object.keys(alternate)[0]
                const value = alternate[key]
                return {
                    rel: 'alternate',
                    href: value,
                    hreflang: key,
                }
            }) || []

        alternates.push({
            rel: 'alternate',
            href: postLink,
            hreflang: doc.value?.language || 'en',
        })

        useHead({
            link: alternates,
        })
    }

    if (doc.value?.cover) {
        useHead({
            meta: [
                {
                    key: 'og:image',
                    name: 'og:image',
                    content: url + '/images/' + doc.value?.cover,
                },
                { name: 'og:image:alt', content: doc.value?.title },
                {
                    name: 'twitter:image',
                    content: url + '/images/' + doc.value?.cover,
                },
            ],
        })
    }

    if (doc.value?.date) {
        useHead({
            meta: [
                {
                    name: 'article:published_time',
                    content: new Date(doc.value?.date).toISOString(),
                },
                {
                    name: 'article:article:modified_time',
                    content: new Date(doc.value?.date).toISOString(),
                },
            ],
        })
    }
}

onMounted(() => {
    useYoutubeTwitterEnhancer('nuxtContent')
})

onMounted(() => {
    const images = document.querySelectorAll('.prose img')

    images.forEach((img) => {
        const captionText = img.alt
        const captionElement = document.createElement('div')
        captionElement.textContent = captionText
        captionElement.classList.add(
            'text-sm',
            'text-center',
            'text-gray-600',
            'mt-1',
        )
        img.parentNode?.insertBefore(captionElement, img.nextSibling)
    })
})

</script>
