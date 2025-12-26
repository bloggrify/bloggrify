<template>
    <div class="my-8 py-6 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Written by
        </p>
        <NuxtLink
            :to="`/authors/${author.username}`"
            class="text-lg font-medium text-gray-900 dark:text-white hover:underline"
        >
            {{ author.name }}
        </NuxtLink>
        <p v-if="author.description" class="mt-2 text-gray-600 dark:text-gray-400">
            {{ author.description }}
        </p>
    </div>
</template>

<script setup lang="ts">
import type { Author } from "@nuxt/schema"

defineProps<{
    author: Author;
}>()
</script>
