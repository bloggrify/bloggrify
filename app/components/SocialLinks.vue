<template>
    <div v-if="links.length">
        <NuxtLink
            v-for="link in links"
            :key="link.platform"
            :to="link.url"
            :aria-label="`Open ${link.label} profile`"
            :class="linkClass"
            target="_blank"
            :rel="link.rel"
        >
            <UIcon :name="link.icon" :class="iconClass" />
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { Socials } from '@nuxt/schema'

/**
 * Renders the profile links of a `socials` block, from either the site identity
 * or an author. Which networks exist and how they map to an icon lives in
 * `app/utils/socials.ts`; a theme only decides how they look.
 */
const props = withDefaults(defineProps<{
    socials?: Socials
    /** Classes applied to each link. */
    linkClass?: string
    /** Classes applied to each icon. */
    iconClass?: string
}>(), {
    socials: undefined,
    linkClass: undefined,
    iconClass: 'size-6',
})

const links = computed(() => resolveSocialLinks(props.socials))
</script>
