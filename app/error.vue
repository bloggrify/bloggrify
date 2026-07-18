<template>
  <UApp>
    <NuxtLayout
      :name="errorLayout"
      :error="error"
      fallback="error-default"
    />
  </UApp>
</template>

<script setup lang="ts">
import type { LayoutKey, NuxtError } from '#app'

// Nuxt renders this component in place of the whole app when an error is thrown: an unknown
// route, or a page a theme chooses not to implement (the `invalid` layout turns that into a
// 404). It sits *outside* `app.vue`, so it provides its own `<UApp>`.
//
// It delegates to the active theme's error layout (`themes-{theme}-error`), exactly like the
// pages delegate to `themes-{theme}-*`. A theme that ships one styles the page as it likes; a
// theme that does not falls back to `error-default`, the framework's plain page. The shared
// logic (status, messages, home action) lives in `useErrorPage`, so a theme only writes markup.
defineProps<{
  error: NuxtError
}>()

const config = useAppConfig()
const theme = config.theme || 'minimalist'
const errorLayout = `themes-${theme}-error` as LayoutKey
</script>
