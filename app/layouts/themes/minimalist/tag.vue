<template>
  <MinimalistShell>
    <header class="mb-10">
      <p class="text-sm uppercase tracking-wide text-muted mb-1">
        Tag
      </p>
      <h1 class="text-4xl sm:text-5xl font-bold tracking-tight">
        {{ tag }}
      </h1>
    </header>

    <MinimalistListing :tag="tag" />
  </MinimalistShell>
</template>

<script setup lang="ts">
defineProps<{
  tag: string
}>()
</script>
