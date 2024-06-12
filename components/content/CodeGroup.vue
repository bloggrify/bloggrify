<template>
    <div>
        <div :class="ui.nav_container">
            <nav :class="ui.nav">
                <!-- Nav Tabs -->
                <div v-for="(tab, index) in tabs" :key="index" class="">
                    <nav :class="ui.nav_item" aria-label="Tabs" role="tablist">
                        <button
                            :class="selectedIndex == index ? ui.nav_button_active + ui.nav_button : ui.nav_button"
                            type="button"
                            role="tab" @click="selectTab(index)"
                        >
                            {{ tab.label }}
                        </button>
                    </nav>
                </div>
                <!-- Nav Tabs -->
            </nav>
        </div>
        <div class="ui.content">
            <component :is="selectedTab?.component" :key="selectedIndex" hide-header />
        </div>
    </div>
</template>
<script setup lang="ts">

const config = useAppConfig()
const ui = config.ui.components.codeGroup.classes

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
