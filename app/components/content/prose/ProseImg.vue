<template>
    <figure>
        <component
            :is="imgComponent"
            :src="refinedSrc"
            :alt="alt"
            :width="width"
            :height="height"
            :aria-labelledby="alt ? `caption-${uniqueId}` : undefined"
        />
        <figcaption v-if="alt" :id="`caption-${uniqueId}`" class="text-sm  text-center text-gray-600 dark:text-gray-300 mt-1">
            {{ alt }}
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'
import { useRuntimeConfig, computed, resolveComponent } from '#imports'
import { useId } from 'vue'

const uniqueId = useId()

const imgComponent = resolveComponent('NuxtImg')

const props = defineProps({
    src: {
        type: String,
        default: ''
    },
    alt: {
        type: String,
        default: ''
    },
    width: {
        type: [String, Number],
        default: undefined
    },
    height: {
        type: [String, Number],
        default: undefined
    }
})

const refinedSrc = computed(() => {
    if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
        const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
        if (_base !== '/' && !props.src.startsWith(_base)) {
            return joinURL(_base, props.src)
        }
    }
    return props.src
})
</script>
