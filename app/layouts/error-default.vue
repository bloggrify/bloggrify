<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-default text-default px-4 text-center">
    <p class="text-7xl sm:text-8xl font-bold tracking-tight text-primary">
      {{ statusCode }}
    </p>

    <h1 class="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
      {{ title }}
    </h1>

    <p class="mt-2 text-muted max-w-md">
      {{ description }}
    </p>

    <!-- Development only: the underlying message, to help the blog author debug. Never shown
         in production, where it could leak internals. Plain text, no stack. -->
    <p
      v-if="isDev && message"
      class="mt-4 text-sm text-muted/70 font-mono max-w-lg break-words"
    >
      {{ message }}
    </p>

    <UButton
      class="mt-8"
      size="lg"
      @click="handleError"
    >
      Back to home
    </UButton>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

// The framework's plain error page: no theme chrome, works for any blog. It is the fallback
// used by `error.vue` when the active theme does not ship its own `themes-{theme}-error` layout.
const props = defineProps<{
  error: NuxtError
}>()

const { statusCode, title, description, message, isDev, handleError } = useErrorPage(() => props.error)
</script>
