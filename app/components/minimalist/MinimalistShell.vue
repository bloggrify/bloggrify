<script setup lang="ts">
// Shared chrome for every minimalist layout: the bordered container, the floating pill
// navigation and the footer. Layouts only provide their page content through the slot,
// so the frame stays defined in one place.
</script>

<template>
  <div class="minimalist min-h-screen flex flex-col bg-default">
    <MinimalistNav />
    <UContainer
      as="main"
      class="flex-1 w-full sm:border-x border-default pt-16 sm:pt-20 pb-16 sm:pb-24"
    >
      <slot />
    </UContainer>
    <MinimalistFooter />
  </div>
</template>
