<template>
    <section class="mt-4">
        <div class="text-xl font-semibold ">
            {{title}}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <NuxtLink
                v-for="article in docs"
                :key="article._id"
                :to="article._path"
                class="block rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
            >
                <!-- Titre -->
                <h2 class="text-lg font-medium text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
                    {{ article.title }}
                </h2>

                <!-- Date -->
                <p class="mt-2 text-sm italic text-gray-600 dark:text-gray-400">
                    {{ formatDate(article.date) }}
                </p>

                <!-- Tags -->
                <div class="mt-4 flex flex-wrap gap-2">
                    <span
                        v-for="tag in article.tags"
                        :key="tag"
                        class="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-800 dark:bg-neutral-700 dark:text-gray-200"
                    >
                        {{ tag }}
                    </span>
                </div>
            </NuxtLink>
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
}>()

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
