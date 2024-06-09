<template>
    <div class="mt-5 space-y-4">
        <div class="mt-5 space-y-4">
            <div class="flex flex-wrap items-center gap-x-1.5 md:gap-x-2">
                <!-- Nav Tabs -->
                <div class="flex bg-gray-100 rounded-lg p-0.5 dark:bg-neutral-800">
                    <nav class="flex gap-x-0.5 md:gap-x-1" aria-label="Tabs" role="tablist">
                        <button
                            :class="previewActive ? 'bg-white text-gray-800 shadow-sm hover:border-transparent' : ''"
                            type="button"
                            class="text-xs md:text-[13px] text-gray-800 border border-transparent hover:border-gray-400 font-medium rounded-md py-2 px-2.5 dark:text-neutral-200 dark:hover:text-white dark:hover:border-neutral-500 dark:hs-tab-active:bg-neutral-700 dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:hover:border-transparent"
                            role="tab" @click="displayPreview"
                        >
                            Preview
                        </button>
                        <button
                            :class="htmlActive ? 'bg-white text-gray-800 shadow-sm hover:border-transparent' : ''"
                            type="button"
                            class="text-xs md:text-[13px] text-gray-800 border border-transparent hover:border-gray-400 font-medium rounded-md py-2 px-2.5 dark:text-neutral-200 dark:hover:text-white dark:hover:border-neutral-500 dark:hs-tab-active:bg-neutral-700 dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:hover:border-transparent active"
                            role="tab"
                            @click="displayHtml"
                        >
                            Markup
                        </button>
                    </nav>
                </div>
                <!-- Nav Tabs -->
            </div>
        </div>

        <div class="mt-3">
            <!-- Tab Content -->
            <div v-if="previewActive" role="tabpanel">
                <div class="border rounded-xl p-6 dark:bg-neutral-800 dark:border-neutral-700">
                    <slot name="preview" />
                </div>
            </div>
            <!-- End Tab Content -->

            <!-- Tab Content -->
            <div v-if="htmlActive" role="tabpanel">
                <div class="">
                    <div>
                        <slot name="markup" />
                    </div>
                </div>
            </div>
            <!-- End Tab Content -->
        </div>
    </div>
</template>
<script setup lang="ts">
const previewActive = ref(true)
const htmlActive = ref(false)

const displayPreview = () => {
    previewActive.value = true
    htmlActive.value = false
}

const displayHtml = () => {
    previewActive.value = false
    htmlActive.value = true
}
</script>
