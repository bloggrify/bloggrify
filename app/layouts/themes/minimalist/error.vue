<template>
  <MinimalistShell>
    <div class="flex flex-col items-center text-center max-w-xl mx-auto pt-8 sm:pt-14 pb-8">
      <!-- Floating badge -->
      <div class="error-floaty flex items-center justify-center size-[52px] rounded-full bg-inverted">
        <UIcon
          name="i-lucide-zap"
          class="size-6 text-inverted"
        />
      </div>

      <!-- Oversized status number: the 404 keeps its playful eyes as the middle 0, any other
           code (500, ...) just shows the number. -->
      <div class="mt-8 leading-none">
        <div
          v-if="isNotFound"
          class="error-display flex items-center justify-center gap-1.5 text-[96px] sm:text-[132px] font-bold tracking-tighter text-highlighted"
        >
          <span>4</span>
          <span class="inline-flex items-center justify-center size-[86px] sm:size-[118px] rounded-full bg-inverted translate-y-1">
            <span class="flex gap-3 sm:gap-[18px] -translate-y-1 text-inverted">
              <span class="error-eye inline-block w-[11px] h-[26px] sm:w-[15px] sm:h-[34px] rounded-full bg-current" />
              <span class="error-eye inline-block w-[11px] h-[26px] sm:w-[15px] sm:h-[34px] rounded-full bg-current" />
            </span>
          </span>
          <span>4</span>
        </div>
        <div
          v-else
          class="error-display text-[96px] sm:text-[132px] font-bold tracking-tighter text-highlighted"
        >
          {{ statusCode }}
        </div>
      </div>

      <h1 class="error-display mt-7 text-3xl sm:text-4xl font-bold tracking-tight text-highlighted">
        {{ isNotFound ? "This page 404'd itself" : title }}
      </h1>

      <p class="mt-4 text-base leading-relaxed text-muted max-w-md">
        {{ isNotFound ? notFoundMessage : description }}
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
        color="neutral"
        size="lg"
        icon="i-lucide-house"
        label="Back to home"
        @click="handleError"
      />

      <div class="mt-16">
        <span class="font-mono text-xs tracking-wide text-muted bg-muted border border-default rounded-md px-2 py-1">
          Error {{ statusCode }} — {{ title }}
        </span>
      </div>
    </div>
  </MinimalistShell>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

// The minimalist theme's own error page: the same nav/footer chrome as the rest of the site, so
// a 404 still feels like the blog. Only markup lives here; the status, messages and home action
// come from `useErrorPage`, shared with the framework default and every other theme.
const props = defineProps<{
  error: NuxtError
}>()

const { statusCode, isNotFound, title, description, message, isDev, handleError } = useErrorPage(() => props.error)

const notFoundMessage = "The post you're looking for was never written, got unpublished, or the URL took a wrong turn."
</script>

<style>
@media (prefers-reduced-motion: no-preference) {
  @keyframes error-floaty {
    0%, 100% { transform: translateY(0) rotate(-1deg); }
    50% { transform: translateY(-8px) rotate(1deg); }
  }
  @keyframes error-blink {
    0%, 92%, 100% { transform: scaleY(1); }
    95% { transform: scaleY(0.1); }
  }
  .error-floaty { animation: error-floaty 5s ease-in-out infinite; }
  .error-eye { animation: error-blink 4.5s ease-in-out infinite; }
}
</style>
