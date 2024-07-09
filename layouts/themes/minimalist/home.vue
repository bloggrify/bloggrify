<template>
    <div>
        <nav class="mt-10 w-3/4 mx-auto">
            <h1 class="text-3xl font-bold">
                {{ title }}
            </h1>
        </nav>

        <MinimalistMenu />

        <main class="mt-10 w-3/4 mx-auto">
            <div class="mt-4">
                {{ description }}
            </div>

            <div class="mt-10">
                <NuxtLink class="underline " to="/archives">
                    Read all posts
                </NuxtLink>
            </div>
        </main>
    </div>
</template>
<script setup lang="ts">
import MinimalistMenu from '~/components/MinimalistMenu.vue'

defineProps<{
    doc: any;
    docs: any;
    currentPage: number;
    total: number;
    category: string;
    tag: string;
}>()

const config = useAppConfig()
const title = config.name
const description = config.description
</script>
<style>
body {
    @apply bg-white dark:bg-slate-900 dark:text-white;
}
</style>
