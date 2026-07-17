<script setup lang="ts">
import type { Socials } from '@nuxt/schema'

// A centered profile header (avatar, name, description, social links) reused by the
// author page and anywhere a person needs to be introduced.
const props = defineProps<{
  name?: string
  description?: string
  avatar?: string
  socials?: Socials
}>()

const socialLinks = computed(() => resolveSocialLinks(props.socials))
</script>

<template>
  <div class="flex flex-col items-center text-center gap-4">
    <UAvatar
      :src="avatar"
      :alt="name"
      :text="getInitials(name)"
      size="3xl"
      class="ring-2 ring-default ring-offset-4 ring-offset-default"
    />

    <h1 class="text-4xl sm:text-5xl font-bold tracking-tight">
      {{ name }}
    </h1>

    <p
      v-if="description"
      class="text-muted max-w-2xl"
    >
      {{ description }}
    </p>

    <div
      v-if="socialLinks.length"
      class="flex items-center gap-1"
    >
      <UButton
        v-for="link in socialLinks"
        :key="link.platform"
        :to="link.url"
        :icon="link.icon"
        :aria-label="`Open ${link.label} profile`"
        color="neutral"
        variant="ghost"
        size="lg"
        target="_blank"
        rel="nofollow noopener noreferrer"
      />
    </div>
  </div>
</template>
