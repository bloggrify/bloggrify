<template>
    <div class="relative">
        <div v-if="filename && !hideHeader" class="text-gray-700 dark:text-gray-200 text-sm rounded-t py-3 px-4 border dark:border-slate-600 italic">
            <span>{{ filename }}</span>
        </div>

        <div v-if="isSupported" class="absolute top-2.5 right-2.5">
            <div class="flex border border-gray-200 rounded-lg dark:border-neutral-700">
                <!-- Clipboard -->
                <button
                    type="button" class="p-1 inline-flex justify-center items-center gap-2 rounded-lg font-medium bg-white text-gray-700
                hover:bg-gray-100 focus:outline-none focus:bg-gray-50 text-xs
                dark:bg-neutral-900 dark:hover:bg-neutral-700 dark:focus:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                    @click="copy(code)"
                >
                    <svg v-if="!copied" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="flex-shrink-0 size-3 md:size-3.5 group-hover:rotate-6 transition"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" /></svg>


                    <svg v-if="copied" class="flex-shrink-0 size-3 md:size-3.5 text-blue-600 rotate-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span v-if="copied">Copied</span>
                </button>
                <!-- End Clipboard -->
            </div>
        </div>


        <slot />
    </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import { useClipboard } from '@vueuse/core'



const props = defineProps({
    code: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: undefined
    },
    language: {
        type: String,
        default: undefined
    },
    hideHeader: {
        type: Boolean,
        default: false
    },
    filename: {
        type: String,
        default: undefined
    },
    highlights: {
        type: Array as PropType<number[]>,
        default: undefined
    },
    meta: {
        type: String,
        default: undefined
    }
})

const { copy, copied, isSupported } = useClipboard({ source : props.code })

</script>
<style>
.prose pre {
    margin: 0;
    border-radius: 0;
    @apply rounded-b;
}

pre code .line {
    display: block;
    min-height: 1rem;
}
</style>
