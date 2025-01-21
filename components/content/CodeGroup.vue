<template>
    <div>
        <div :class="config.nav_container">
            <nav :class="config.nav">
                <!-- Nav Tabs -->
                <div v-for="(tab, index) in tabs" :key="index" class="">
                    <nav :class="config.nav_item" aria-label="Tabs" role="tablist">
                        <button
                            :class="selectedIndex == index ? config.nav_button_active + config.nav_button : config.nav_button"
                            type="button"
                            :aria-label="tab.label"
                            role="tab" @click="selectTab(index)"
                        >
                            {{ tab.label }}
                        </button>
                    </nav>
                </div>
                <!-- Nav Tabs -->
            </nav>
        </div>
        <div :class="config.content">
            <component :is="selectedTab?.component" :key="selectedIndex" hide-header />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'

const appConfig = useAppConfig()

// Configuration par défaut
const defaultConfig = {
    nav_container: 'mt-5 space-y-4',
    nav: 'flex flex-wrap items-center gap-x-1.5 md:gap-x-2 rounded-t border p-2',
    nav_item: 'flex rounded-lg p-0.5 dark:bg-neutral-800 gap-x-0.5 md:gap-x-1',
    nav_button_active: 'bg-gray-100 text-gray-800 shadow-sm hover:border-transparent dark:bg-neutral-700 dark:text-neutral-200 dark:hover:border-transparent',
    nav_button: 'text-xs md:text-sm text-gray-800 hover:bg-gray-100 border border-transparent hover:border-gray-400 font-medium rounded-md py-2 px-2.5 dark:text-neutral-200 dark:hover:text-white dark:hover:border-neutral-500',
    content: ''
}

// Utilise soit la config utilisateur si elle existe, soit la config par défaut
const config = computed(() =>
    appConfig.ui?.components?.codeGroup?.classes || defaultConfig
)

const selectedIndex = ref(0)
const slots = useSlots()

function selectTab(index: number) {
    selectedIndex.value = index
}

function transformSlot(slot: unknown, index: number) {
    if (typeof slot.type === 'symbol') {
        return slot.children?.map(transformSlot)
    }

    return {
        label: slot.props?.filename || slot.props?.label || `${index}`,
        icon: slot.props?.icon,
        component: slot
    }
}

const tabs = computed(() => slots.default?.()?.flatMap(transformSlot).filter(Boolean) || [])
const selectedTab = computed(() => tabs.value.find((_, index) => index === selectedIndex.value))
</script>
