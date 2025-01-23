<script setup lang="ts">
import { useFuse } from '@vueuse/integrations/useFuse'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { useMagicKeys } from '@vueuse/core'


type BlogSearchResult = {
    id: string
    path: string
    dir: string
    title: string
    description: string
    keywords: string[]
    body?: unknown[]
}

const q = ref('')
const searchContentRef = ref<HTMLDivElement>()
const searchInputRef = ref<HTMLInputElement>()
const resultsAreaRef = ref<HTMLDivElement>()
const selected = ref(-1)

const show = ref(false)

const { activate, deactivate } = useFocusTrap(searchContentRef)

const { meta_K, Escape } = useMagicKeys()

const SEARCH_DATA_KEY = 'search-api'

// Cache results across pages
// Note: does not cache across client instances, use Cache-Control headers or local storage instead
const cachedResults = useNuxtData<BlogSearchResult[]>(SEARCH_DATA_KEY)

function showSearch() {
    show.value = true
    if(!cachedResults.data.value || (cachedResults.data.value.length === 0)){
        execute()
    }
}

const { data: files, execute, status, error} = await useLazyAsyncData<BlogSearchResult[]>(
    SEARCH_DATA_KEY,
    () => $fetch('/api/search', { parseResponse: JSON.parse }),
    {
        default: () => {
            return cachedResults.data.value || [] as BlogSearchResult[]
        },
        // avoid being result being included in bundle
        immediate: false,
        // loading data
    }
)

const { results } = useFuse<BlogSearchResult>(
    q,
    files as unknown,
    {
        fuseOptions: {
            keys: [
                'title',
                'description',
                'keywords',
                'body'
            ],
            ignoreLocation: true,
            threshold: 0,
            includeMatches: true,
            includeScore: true,
        },
        matchAllWhenSearchEmpty: true
    }
)

function highlight(
    text: string,
    result: unknown
): string {
    const { indices, value }: { indices: number[][], value: string } = result || { indices: [], value: '' }

    if (text === value) return ''

    let content = ''
    let nextUnhighlightedIndiceStartingIndex = 0

    indices.forEach((indice) => {
        const lastIndiceNextIndex = indice[1] + 1
        const isMatched = (lastIndiceNextIndex - indice[0]) >= q.value.length

        content += [
            value.substring(nextUnhighlightedIndiceStartingIndex, indice[0]),
            isMatched && '<mark>',
            value.substring(indice[0], lastIndiceNextIndex),
            isMatched && '</mark>'
        ].filter(Boolean).join('')

        nextUnhighlightedIndiceStartingIndex = lastIndiceNextIndex
    })

    content += value.substring(nextUnhighlightedIndiceStartingIndex)

    const index = content.indexOf('<mark>')

    if (index > 60) {
        content = `${content.substring(index - 60)}`
    }

    return `${content}`
}

function down() {
    if (selected.value === -1) { selected.value = 0 }
    else if (selected.value === results.value.length - 1) { /* Do nothing  */ }
    else { selected.value = selected.value + 1 }
}

function up() {
    if (selected.value === -1) { selected.value = results.value.length - 1 }
    else if (selected.value === 0) { /* Do nothing */ }
    else { selected.value = selected.value - 1 }
}

function go(index: number) {
    const selectedItem = results?.value?.[index]?.item
    const path = selectedItem?.path

    if (path) {
        show.value = false
        useRouter().push(path)
    }
}

function closeButtonHandler() {
    if (q.value) {
        q.value = ''
        selected.value = -1
        searchInputRef.value?.focus?.()
    } else {
        show.value = false
    }
}

onMounted (() => {
    const route = useRoute()
    if (route.query.q) {
        show.value = true
        q.value = route.query.q
    }
})

// Scroll to selected item on change
watch(selected, value => {
    const nextId = results?.value?.[value]?.item?.id
    if (nextId) document.querySelector(`[id="${nextId}"]`)?.scrollIntoView({ block: 'nearest' })
})

// Reset selected item on search change
watch(
    q,
    _ => { selected.value = 0 }
)

// Reset local data when modal closing
watch(show, (value) => {
    if (!value) {
        q.value = ''
        selected.value = -1
        deactivate()
    } else {
        nextTick(() => {
            activate()
        })
    }
})

watch(meta_K, (v) => {
    if (v) {
        show.value = !show.value
    }
})

watch(Escape, () => {
    if (show.value)
        show.value = false
})

</script>

<template>

    <button
        class="border-gray-200 border p-1 px-2 rounded-lg text-sm hover:border-gray-400 flex items-center justify-center gap-1 dark:text-slate-100 hover:dark:text-slate-400"
        type="button"
        aria-label="Search"
        @click="showSearch"
    >
        <svg class="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <span>
            <span>Search</span>
        </span>
    </button>

    <!-- eslint-disable-next-line vue/no-multiple-template-root -->
    <teleport to="body">
        <div
            v-if="show"
            ref="searchContentRef"
            class="bg-slate-600 bg-opacity-75 fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            @click="show = false"
        >
            <div class="relative p-4 w-full max-w-2xl overflow-auto max-h-2xl ">
                <div
                    class="relative bg-white rounded-lg shadow dark:bg-gray-700 dark:border-gray-600 dark:border"
                    @click.stop
                >
                    <div class="flex gap-3 p-4 ">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                id="simple-search" v-model="q"
                                type="text"
                                placeholder="Search..."
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required @keydown.up.prevent="up" @keydown.down.prevent="down" @keydown.enter="go(selected)"
                            >
                        </div>
                        <button
                            @click="closeButtonHandler"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-6 w-6 text-slate-600 hover:text-slate-800 dark:text-slate-100" viewBox="0 0 512 512">
                                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                            </svg>
                        </button>
                    </div>

                    <div
                        v-if="error"
                        class="search-results empty dark:text-red-500"
                    >
                        An error occurred.
                    </div>

                    <div
                        v-if="status === 'pending'"
                        class="search-results empty dark:text-slate-100"
                    >
                        Loading...
                    </div>

                    <div
                        v-else-if="results.length > 0"
                        ref="resultsAreaRef"
                        class="overflow-auto h-96 flex flex-col"
                    >
                        <div
                            v-for="(result, i) in results"
                            :id="result.item.id"
                            :key="result.item.id"
                            class="search-result"
                            :class="{ selected: selected === i }"
                            @click="go(selected)"
                            @mouseenter.prevent="selected = i"
                        >
                            <div class="search-result-content-wrapper">
                                <div class="search-result-content-head">
                                    <span>
                                        {{ result.item.title }}
                                    </span>
                                </div>
                                <p
                                    v-if="result?.matches?.[0]"
                                    class="search-result-content-preview"
                                >
                                    <span
                                        v-html="`${highlight(q, result?.matches?.[0] as any)}`"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        v-else-if="!q"
                        class="search-results empty dark:text-slate-100"
                    >
                        Type your query to search docs
                    </div>

                    <div
                        v-else
                        class="overflow-auto flex flex-col h-32 items-center justify-center dark:text-slate-100"
                    >
                        No results found. Try another query
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<style scoped lang="scss">
.search-result {
    @apply flex flex-col justify-center p-2 cursor-pointer mt-2;

    &.selected {
        @apply bg-gray-100 dark:bg-gray-800;
    }
}
.search-result-content-wrapper {
    @apply flex gap-2 rounded p-1 flex-col overflow-hidden;
}

.dark .search-result.selected {
    @apply bg-gray-800;
}

.search-result-content-head {
    @apply flex items-center gap-1 dark:text-slate-100;
}

.search-result-content-preview {
    @apply truncate relative text-slate-400 text-sm;
}
</style>
