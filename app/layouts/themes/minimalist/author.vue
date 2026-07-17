<template>
    <div>
        <MinimalistHeader/>

        <MinimalistMenu />

        <main class="mt-10 w-full lg:w-3/5 mx-6 lg:mx-auto">
            <!-- Author Info -->
            <div class="mb-12 flex flex-col items-center text-center">
                <!-- Avatar -->
                <img
                    v-if="author.avatar"
                    :src="author.avatar"
                    :alt="author.name"
                    class="w-32 h-32 rounded-full object-cover mb-6 border-4 border-gray-200 dark:border-gray-700"
                >

                <!-- Name -->
                <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {{ author.name }}
                </h1>

                <!-- Description -->
                <p v-if="author.description" class="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
                    {{ author.description }}
                </p>

                <!-- Social Links -->
                <SocialLinks
                    :socials="author.socials"
                    class="flex gap-4"
                    link-class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                />
            </div>

            <!-- Posts by author -->
            <div class="border-t border-gray-200 dark:border-gray-700 pt-8 ">
                <MinimalistListing
                    :title="`Posts by ${author.name}`"
                    :author="author.username"
                    format="list"
                />
            </div>
        </main>

        <MinimalistFooter />
    </div>
</template>

<script setup lang="ts">
import type { Author } from "@nuxt/schema"
import MinimalistMenu from '~/components/minimalist/MinimalistMenu.vue'
import MinimalistFooter from '~/components/minimalist/MinimalistFooter.vue'
import MinimalistHeader from '~/components/minimalist/MinimalistHeader.vue'

defineProps<{
    author: Author;
}>()
</script>
