<template>
  <MinimalistShell>
    <MinimalistHero />

    <section class="mt-12 sm:mt-16">
      <MinimalistListing
        title="Latest posts"
        :paginated="false"
        :limit="6"
      />

      <div class="mt-8 flex justify-center">
        <UButton
          to="/archives"
          label="Read all posts"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>
    </section>
  </MinimalistShell>
</template>

<script setup lang="ts">
import type { PageCollectionItem } from '@nuxt/content'

// `doc` is passed by the [...slug] page for the home document; the hero and listing read
// everything they need from app.config and the content collection, so it is unused here.
defineProps<{
  doc: PageCollectionItem
}>()
</script>
