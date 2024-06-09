<template>
    <div>
        <div class="mt-5 space-y-4">
            <div class="flex flex-wrap items-center gap-x-1.5 md:gap-x-2 rounded-t border p-2">
                <!-- Nav Tabs -->
                <div v-for="(tab, index) in tabs" :key="index" class="flex  rounded-lg p-0.5 dark:bg-neutral-800">
                    <nav class="flex gap-x-0.5 md:gap-x-1" aria-label="Tabs" role="tablist">
                        <button
                            :class="selectedIndex == index ? 'bg-gray-100 text-gray-800 shadow-sm hover:border-transparent dark:bg-neutral-700 dark:text-neutral-200 dark:hover:border-transparent' : ''"
                            type="button"
                            class="text-xs md:text-sm text-gray-800 hover:bg-gray-100 border border-transparent hover:border-gray-400 font-medium rounded-md py-2 px-2.5
                            dark:text-neutral-200 dark:hover:text-white dark:hover:border-neutral-500
                            "
                            role="tab" @click="selectTab(index)"
                        >
                            {{ tab.label }}
                        </button>
                    </nav>
                </div>
                <!-- Nav Tabs -->
            </div>
        </div>

        <component :is="selectedTab?.component" :key="selectedIndex" hide-header />
    </div>
</template>
<script setup lang="ts">

const selectedIndex = ref(0)
const slots = useSlots()

function selectTab (index: number) {
    selectedIndex.value = index
}

function transformSlot (slot: any, index: number) {
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
