<template>
    <!-- Pagination -->
    <nav class="flex items-center gap-x-1 p-4">
        <NuxtLink :to="left.to" :aria-disabled="left.disabled" aria-label="Previous page" :class="{ 'pointer-events-none cursor-not-allowed': left.disabled }">
            <button
                :disabled="left.disabled"
                type="button"
                class="min-h-[12px] min-w-[12px] py-2 px-2.5 inline-flex justify-center
                    items-center gap-x-2 rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                    disabled:opacity-50 disabled:pointer-events-none
                    dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            >
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                <span aria-hidden="true" class="sr-only">Previous</span>
            </button>
        </NuxtLink>
        <div class="flex items-center gap-x-1">
            <span class="min-h-[12px] min-w-[12px] flex justify-center items-center text-black py-2 px-3 rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:focus:bg-white/10" aria-current="page">{{ currentPage }}</span>
            <span class="min-h-[12px] flex justify-center items-center text-gray-400 py-2 px-1.5 dark:text-neutral-500">of</span>
            <span class="min-h-[12px] flex justify-center items-center text-gray-400 py-2 px-1.5 dark:text-neutral-500">{{ Math.ceil(total/itemsPerPage) }}</span>
        </div>
        <NuxtLink :to="right.to" :aria-disabled="right.disabled" aria-label="Next page" :class="{ 'pointer-events-none cursor-not-allowed': right.disabled }">
            <button
                :disabled="right.disabled"
                type="button"
                class="min-h-[12px] min-w-[12px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm
                    rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none
                    dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            >
                <span aria-hidden="true" class="sr-only">Next</span>
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </button>
        </NuxtLink>
    </nav>
</template>
<script setup lang="ts">
const config = useAppConfig()
const itemsPerPage = config.pagination?.per_page || 5

type arrowLink =  {
    to: string;
    disabled: boolean;
}

const props = defineProps<{
    category?: string;
    tag?: string;
    currentPage: number;
    total: number;
}>()

/**
 * Generate a URL path based on the current page and available properties.
 *
 * @param page - The page number to include in the path.
 * @returns The generated URL path as a string.
 */
function createPath(page: number): string {
    return props.category
        ? `/categories/${props.category}/page/${page}`
        : props.tag
            ? `/tags/${props.tag}/page/${page}`
            : `/archives/page/${page}`
}

// Determine if the current page is the first page
// Check if the previous page number (currentPage - 1) is equal to 0
const isFirstPage = props.currentPage - 1 === 0

// Left Arrow Link
const left: arrowLink = {
    to: isFirstPage
        ? createPath(props.currentPage)
        : createPath(props.currentPage - 1),
    disabled: isFirstPage
}

// Determine if the current page is the last page
// Check if the next page number (currentPage + 1) exceeds the total number of pages
// Total number of pages is calculated by dividing the total number of items by items per page and rounding up
const isEndOfPages = props.currentPage + 1 > Math.ceil(props.total / itemsPerPage)

// Right Arrow Link
const right: arrowLink = {
    to: isEndOfPages
        ? createPath(props.currentPage)
        : createPath(props.currentPage + 1),
    disabled: isEndOfPages
}
</script>
