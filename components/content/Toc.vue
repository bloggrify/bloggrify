<template>
    <div v-if="isTocEnabled" class="w-full lg:w-2/3 mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <div class="p-5">
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
                Table of contents
            </h2>
            <p class="mb-3 font-normal ">
                <ul class="pl-0">
                    <li
                        v-for="subtitle in doc.body.toc.links"
                        :key="subtitle.text"
                        class="py-1 list-decimal ml-4"
                        :class="{ 'ml-6': subtitle.depth === 3 }"
                    >
                        <a
                            class="hover:text-smalt-blue-700 font-normal"
                            :class="{ 'text-shark-400': subtitle.depth === 3 }"
                            :href="'#' + subtitle.id"
                        >
                            {{ subtitle.text }}
                        </a>
                    </li>
                </ul>
            </p>
        </div>
    </div>
    <div v-else />
</template>
<script setup lang="ts">
const route = useRoute()
const { data: doc } = await useAsyncData(route.path, async () => {
    return await queryContent('').where({ _path: route.path }).findOne()
})

const isTocEnabled =
    doc.value?.body?.toc?.links.length && doc.value?.body.toc?.links.length > 0
</script>
