<template>
    <!-- Pagination -->
    <nav class="flex items-center gap-x-1 p-4">
        <button
            :disabled="currentPage - 1 === 0"
            type="button"
            class="min-h-[12px] min-w-[12px] py-2 px-2.5 inline-flex justify-center
                        items-center gap-x-2 rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            @click="goToPage(currentPage - 1)"
        >
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6" />
            </svg>
            <span aria-hidden="true" class="sr-only">Previous</span>
        </button>
        <div class="flex items-center gap-x-1">
            <span class="min-h-[12px] min-w-[12px] flex justify-center items-center text-black py-2 px-3 rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:focus:bg-white/10">{{ currentPage }}</span>
            <span class="min-h-[12px] flex justify-center items-center text-gray-400 py-2 px-1.5 dark:text-neutral-500">of</span>
            <span class="min-h-[12px] flex justify-center items-center text-gray-400 py-2 px-1.5 dark:text-neutral-500">{{ Math.ceil(total/itemsPerPage) }}</span>
        </div>
        <button
            :disabled="currentPage + 1 > Math.ceil(total/itemsPerPage)"
            type="button"
            class="min-h-[12px] min-w-[12px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm
                rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none
                dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            @click="goToPage(currentPage + 1)"
        >
            <span aria-hidden="true" class="sr-only">Next</span>
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6" />
            </svg>
        </button>
    </nav>
</template>
<script setup lang="ts">
const config = useAppConfig()
const itemsPerPage = config.pagination.per_page

const props = defineProps<{
    category?: string;
    tag?: string;
    currentPage: number;
    total: number;
}>()

const goToPage = (page: number) => {
    if (page < 1 || page > Math.ceil(props.total/itemsPerPage)) {
        return
    }
    const path = props.category ? `/categories/${props.category}/page/${page}` : props.tag ? `/tags/${props.tag}/page/${page}` : `/archives/page/${page}`
    navigateTo(path)
}
</script>
