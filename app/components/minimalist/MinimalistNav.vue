<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// Floating pill navigation, styled after the Nuxt UI portfolio template. The site name
// lives in the hero, so the bar only carries navigation, search and the theme toggle.
const config = useAppConfig()

const links = computed<NavigationMenuItem[]>(() => [
  { label: 'Home', to: '/' },
  ...(config.menu ?? []).map(item => ({ label: item.name, to: item.path })),
])
</script>

<template>
  <div class="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50">
    <UNavigationMenu
      :items="links"
      variant="link"
      color="neutral"
      class="bg-muted/80 backdrop-blur-sm rounded-full px-1 sm:px-2 border border-default shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-1',
        linkLeadingIcon: 'hidden',
      }"
    >
      <template #list-trailing>
        <div class="flex items-center">
          <AppSearch collapsed />
          <MinimalistColorModeButton />
        </div>
      </template>
    </UNavigationMenu>
  </div>
</template>
