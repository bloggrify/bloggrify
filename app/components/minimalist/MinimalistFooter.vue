<script setup lang="ts">
const config = useAppConfig()

const socialLinks = computed(() => resolveSocialLinks(config.socials))
</script>

<template>
  <UContainer class="w-full sm:border-x border-default">
    <footer class="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-default py-8">
      <p class="text-sm text-muted">
        Powered by
        <ULink
          to="https://bloggrify.com"
          class="text-default hover:text-primary font-medium"
        >
          Bloggrify
        </ULink>
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
          size="sm"
          target="_blank"
          rel="nofollow noopener noreferrer"
        />
      </div>
    </footer>
  </UContainer>
</template>
