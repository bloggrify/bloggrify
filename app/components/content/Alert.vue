<template>
    <UAlert
        :color="alertColor"
        :variant="variant"
        :icon="alertIcon"
        :title="title || type"
        class="mb-2"
    >
        <template #description>
            <slot />
        </template>
    </UAlert>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    type: {
        type: String,
        required: false,
        default: 'info',
    },
    title: {
        type: String,
        required: false,
    },
    variant: {
        type: String as () => 'solid' | 'outline' | 'soft' | 'subtle',
        default: 'soft',
    },
})

// Mapping des types anciens vers les couleurs UAlert
type UAlertColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

const typeToColorMap: Record<string, UAlertColor> = {
    tip: 'success',
    warning: 'warning',
    error: 'error',
    info: 'info',
    note: 'primary',
}

const alertColor = computed<UAlertColor>(() => {
    const lowerType = props.type.toLowerCase()
    return typeToColorMap[lowerType] || 'info'
})

// Mapping des icônes
const typeToIconMap: Record<string, string> = {
    tip: 'i-lucide-lightbulb',
    warning: 'i-lucide-triangle-alert',
    error: 'i-lucide-circle-x',
    info: 'i-lucide-info',
    note: 'i-lucide-pencil',
}

const alertIcon = computed(() => {
    const lowerType = props.type.toLowerCase()
    return typeToIconMap[lowerType] || 'i-lucide-info'
})
</script>
