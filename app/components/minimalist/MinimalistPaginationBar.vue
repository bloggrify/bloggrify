<template>
    <!-- Pagination -->
    <nav class="flex items-center gap-x-1 p-4">
        <NuxtLink
          :to="left.to"
          :aria-disabled="left.disabled"
          aria-label="Previous page"
          :class="{ 'pointer-events-none cursor-not-allowed': left.disabled }">
            <button
                :disabled="left.disabled"
                type="button"
                class="min-h-[12px] min-w-[12px] py-2 px-2.5 inline-flex justify-center
                    items-center gap-x-2 rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                    disabled:opacity-50 disabled:pointer-events-none
                    dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            >
                <UIcon name="heroicons-solid:chevron-left" />
                <span aria-hidden="true" class="sr-only">Previous</span>
            </button>
        </NuxtLink>
        <div class="flex items-center gap-x-1">
            <span class="min-h-[12px] min-w-[12px] flex justify-center items-center text-black py-2 px-3 rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:focus:bg-white/10" aria-current="page">{{ pageNumber }}</span>
            <span class="min-h-[12px] flex justify-center items-center text-gray-400 py-2 px-1.5 dark:text-neutral-500">of</span>
            <span class="min-h-[12px] min-w-[12px] flex justify-center items-center text-black py-2 px-3 rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:focus:bg-white/10">{{ total ?? 0 }}</span>
        </div>
        <NuxtLink
          :to="right.to"
          :aria-disabled="right.disabled"
          aria-label="Next page"
          :class="{ 'pointer-events-none cursor-not-allowed': right.disabled }">
            <button
                :disabled="right.disabled"
                type="button"
                class="min-h-[12px] min-w-[12px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm
                    rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none
                    dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            >
                <span aria-hidden="true" class="sr-only">Next</span>
                <UIcon name="heroicons-solid:chevron-right" />
            </button>
        </NuxtLink>
    </nav>
</template>
<script setup lang="ts">
const { currentPage, createPath } = usePagination()

type arrowLink = {
    to: string;
    disabled: boolean;
}

const props = defineProps<{
    total?: number;
}>()

const pageNumber = computed(() => {
    return currentPage.value
})

// Determine if the current page is the first page
const isFirstPage = pageNumber.value - 1 === 0

// Left Arrow Link
const left: arrowLink = {
    to: isFirstPage
        ? createPath(pageNumber.value)
        : createPath(pageNumber.value - 1),
    disabled: isFirstPage
}

// Determine if the current page is the last page
const isEndOfPages = pageNumber.value >= (props.total ?? 0)

// Right Arrow Link
const right: arrowLink = {
    to: isEndOfPages
        ? createPath(pageNumber.value)
        : createPath(pageNumber.value + 1),
    disabled: isEndOfPages
}
</script>
