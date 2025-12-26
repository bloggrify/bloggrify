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
                <div v-if="hasSocials" class="flex gap-4">
                    <a
v-if="author.socials?.twitter"
:href="author.socials.twitter"
target="_blank"
rel="noopener noreferrer"
class="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a
v-if="author.socials?.github"
:href="author.socials.github"
target="_blank"
rel="noopener noreferrer"
class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a
v-if="author.socials?.linkedin"
:href="author.socials.linkedin"
target="_blank"
rel="noopener noreferrer"
class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a
v-if="author.socials?.mastodon"
:href="author.socials.mastodon"
target="_blank"
rel="noopener noreferrer"
class="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-500">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/></svg>
                    </a>
                </div>
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

const props = defineProps<{
    author: Author;
}>()

const hasSocials = computed(() => {
    return props.author.socials && Object.keys(props.author.socials).length > 0
})
</script>
