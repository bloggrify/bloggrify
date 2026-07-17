<template>
  <div class="w-full h-full flex bg-white">
    <div class="w-full h-full flex flex-col items-center justify-center bg-slate-900 p-16">
      <div class="w-20 h-2 bg-blue-500 rounded-full mb-12" />
      <h1 class="text-6xl font-bold text-white text-center leading-tight mb-6">
        {{ title }}
      </h1>
      <p class="text-3xl text-slate-400 text-center max-w-4xl">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>
