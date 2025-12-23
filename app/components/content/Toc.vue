<template>
    <Nav v-if="isTocEnabled" class="w-full lg:w-2/3 mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <div class="p-5">
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
                Table of contents
            </h2>
            <div class="mb-3 font-normal ">
                <ul class="pl-0 ">
                    <li
                        v-for="subtitle in doc.body.toc.links"
                        :key="subtitle.text"
                        class="py-1 list-decimal ml-4 "
                        :class="{ 'ml-6': subtitle.depth === 3 }"
                    >
                        <NuxtLink
                            class="hover:text-smalt-blue-700 font-normal text-slate-800 dark:text-slate-300"
                            :class="{ 'text-shark-400': subtitle.depth === 3 }"
                            :to="'#' + subtitle.id"
                        >
                            {{ subtitle.text }}
                        </NuxtLink>
                        <ul v-if="subtitle.children && showTocChildren" class="my-2">
                            <li
                                v-for="{ id: childId, text: childText } in subtitle.children"
                                :id="`${childId}`"
                                :key="childId"
                                class="mb-2 text-xs last:mb-0"
                            >
                                <NuxtLink :to="`#${childId}`">
                                    {{ childText }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </Nav>
</template>
<script setup lang="ts">
const props = defineProps({
    showChildren: {
        type: Boolean,
        default: false
    }
})

const config = useAppConfig()

const showTocChildren = props.showChildren || (config.toc?.showChildren ?? false)

const route = useRoute()
const { data: doc } = await useAsyncData(route.path, () => {
    return queryCollection('page').path(route.path).first()
})

const isTocEnabled = doc.value?.body?.toc?.links.length && doc.value?.body.toc?.links.length > 0

</script>
