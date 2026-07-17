<template>
  <MinimalistShell>
    <MinimalistProfileHeader
      :name="author.name"
      :description="author.description"
      :avatar="author.avatar"
      :socials="author.socials"
    />

    <div class="mt-12 border-t border-default pt-10">
      <MinimalistListing
        :title="`Posts by ${author.name}`"
        :author="author.username"
      />
    </div>
  </MinimalistShell>
</template>

<script setup lang="ts">
import type { Author } from '@nuxt/schema'

defineProps<{
  author: Author
}>()
</script>
