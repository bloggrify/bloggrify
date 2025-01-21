<template>
    <section class="mt-4">
        <div class="text-xl font-semibold ">
            {{title}}
        </div>

        <div v-if="format === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <div

                v-for="article in docs"
                :key="article._id"
                class="block rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
            >
                <!-- Titre -->
                <NuxtLink :to="article._path">
                    <h2 class="text-lg font-medium text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
                        {{ article.title }}
                    </h2>
                </NuxtLink>

                <!-- Date -->
                <p class="mt-2 text-sm italic text-gray-600 dark:text-gray-400">
                    {{ formatDate(article.date) }}
                </p>

                <!-- Tags -->
                <div class="mt-4 flex flex-wrap gap-2">
                    <NuxtLink
                        v-for="tagArticle in article.tags"
                        :key="tagArticle"
                        :to="`/tags/${tagArticle}`"
                        class="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-800 dark:bg-neutral-700 dark:text-gray-200"
                    >
                        {{ tagArticle }}
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div
            v-else
            class="p-5 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        >
            <ol
                class="mt-3 divide-y divider-gray-200 dark:divide-gray-700"
            >
                <li
                    v-for="article in docs"
                    :key="article._path"
                >
                    <div
                        class="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <div class="flex flex-col">
                            <NuxtLink
                                :to="article._path"
                                class="text-gray-600 dark:text-gray-400"
                            >
                                <div class="text-base font-normal">
                                    <span
                                        class="font-medium text-gray-900 dark:text-white"
                                    >{{ article.title }}</span>
                                </div>
                                <div class="text-sm font-normal">
                                    {{ article.description }}
                                </div>
                            </NuxtLink>
                            <div class="text-gray-600 dark:text-gray-400">
                                <span
                                    class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        class="fill-slate-500 h-2.5 w-2.5 me-1"
                                    >
                                        <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                        <path
                                            d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"
                                        />
                                    </svg>

                                    {{ formatDate(article.date) }}
                                </span>
                                <span v-if="article.categories && article.categories.length > 0" class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                    &nbsp; -  &nbsp;
                                </span>
                                <span v-for="category in article.categories" :key="category" class=" text-xs font-normal text-gray-500 dark:text-gray-400">
                                    <NuxtLink class="underline" :to="`/categories/${category}`">{{ category }}</NuxtLink>
                                               &nbsp;

                                </span>
                            </div>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
        <MinimalistPaginationBar :total="totalNumberOfPages"  />
    </section>
</template>
<script setup lang="ts">

const props = defineProps<{
    category?: string;
    tag?: string;
    title?: string;
    prefix?: string;
    format?: string;
}>()



const format = props.format || 'card'
const {itemsPerPage, currentPage} = usePagination()
const id = 'listing-' + props.category + '-' + props.tag + '-' + props.prefix
let where = {}
if (props.category) {
    where['categories'] = { $in: [props.category] }
}
if (props.tag) {
    where['tags'] = { $in: [props.tag] }
}
where = { ...where, ...{ draft: { $ne: true }, listed: { $ne: false } } }

const numberOfPostsPerPage = itemsPerPage.value

const { data: docs } = useAsyncData(id, () => {
    return queryContent(props.prefix || '')
        .where(where)
        .sort({ date: -1 })
        .skip((currentPage.value - 1) * numberOfPostsPerPage)
        .limit(numberOfPostsPerPage)
        .find()
})
const totalNumberOfPages = await queryContent(props.prefix || '').where(where).count()

</script>
