<template>
    <div :class="config.component">
        <div :class="config.nav_bar">
            <!-- Nav Tabs -->
            <div :class="config.nav_container">
                <nav :class="config.nav" aria-label="Tabs" role="tablist">
                    <button
                        :class="previewActive ? config.nav_item_active + config.nav_item : config.nav_item"
                        type="button"
                        aria-label="Preview"
                        role="tab" @click="displayPreview"
                    >
                        Preview
                    </button>
                    <button
                        :class="htmlActive ? config.nav_item_active + config.nav_item : config.nav_item"
                        type="button"
                        role="tab"
                        aria-label="Markup"
                        @click="displayHtml"
                    >
                        Markup
                    </button>
                </nav>
            </div>
            <!-- Nav Tabs -->
        </div>

        <div :class="config.content">
            <!-- Tab Content -->
            <div v-if="previewActive" role="tabpanel">
                <div :class="config.preview">
                    <slot name="preview" />
                </div>
            </div>
            <!-- End Tab Content -->

            <!-- Tab Content -->
            <div v-if="htmlActive" role="tabpanel">
                <div :class="config.markup">
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
import { computed } from 'vue'

const appConfig = useAppConfig()

// Configuration par défaut
const defaultConfig = {
    component: 'mt-4',
    nav_bar: 'flex flex-wrap items-center gap-x-1.5 md:gap-x-2',
    nav_container: 'flex bg-gray-100 rounded-lg p-0.5 dark:bg-neutral-800',
    nav: 'flex gap-x-0.5 md:gap-x-1',
    nav_item: 'text-xs md:text-sm text-gray-800 border border-transparent hover:border-gray-400 font-medium rounded-md py-2 px-2.5 dark:text-neutral-200 dark:hover:text-white dark:hover:border-neutral-500',
    nav_item_active: 'bg-white text-gray-800 shadow-sm hover:border-transparent dark:bg-neutral-700 dark:text-neutral-200 dark:hover:border-transparent',
    preview: 'border rounded-xl p-6 dark:bg-neutral-800 dark:border-neutral-700',
    markup: '',
    content: 'mt-3',
}

// Utilise soit la config utilisateur si elle existe, soit la config par défaut
const config = computed(() =>
    appConfig.ui?.components?.mdd?.classes || defaultConfig
)

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
