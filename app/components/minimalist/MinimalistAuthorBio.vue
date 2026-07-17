<template>
  <div class="my-12 flex items-start gap-4 rounded-xl border border-default bg-elevated/40 p-5">
    <UAvatar
      :src="author.avatar"
      :alt="author.name"
      :text="getInitials(author.name)"
      size="xl"
    />
    <div class="min-w-0">
      <p class="text-xs text-muted mb-0.5">
        Written by
      </p>
      <ULink
        :to="author.username ? `/authors/${author.username}` : undefined"
        class="font-semibold text-default hover:text-primary"
      >
        {{ author.name }}
      </ULink>
      <p
        v-if="author.description"
        class="text-sm text-muted mt-1"
      >
        {{ author.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Author } from '@nuxt/schema'

defineProps<{
  author: Author
}>()
</script>
