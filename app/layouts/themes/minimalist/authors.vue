<template>
  <MinimalistShell>
    <header class="mb-10">
      <p class="text-sm uppercase tracking-wide text-muted mb-1">
        Authors
      </p>
      <h1 class="text-4xl sm:text-5xl font-bold tracking-tight">
        Authors
      </h1>
    </header>

    <ul class="grid gap-4 sm:grid-cols-2">
      <li
        v-for="author in authors"
        :key="author.username"
      >
        <ULink
          :to="author.username ? `/authors/${author.username}` : undefined"
          class="flex items-start gap-4 rounded-xl border border-default bg-elevated/40 p-5 h-full hover:border-primary transition-colors"
        >
          <UAvatar
            :src="author.avatar"
            :alt="author.name"
            :text="getInitials(author.name)"
            size="xl"
          />
          <div class="min-w-0">
            <p class="font-semibold text-default">
              {{ author.name }}
            </p>
            <p
              v-if="author.description"
              class="text-sm text-muted mt-1 line-clamp-3"
            >
              {{ author.description }}
            </p>
          </div>
        </ULink>
      </li>
    </ul>
  </MinimalistShell>
</template>

<script setup lang="ts">
import type { Author } from '@nuxt/schema'

defineProps<{
  authors: Author[]
}>()
</script>
