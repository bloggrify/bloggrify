<template>
    <div>
        <MinimalistHeader/>

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
        <MinimalistFooter />
    </div>
</template>
<script setup lang="ts">
import MinimalistMenu from '~/components/MinimalistMenu.vue'
import MinimalistFooter from '~/components/MinimalistFooter.vue'
import MinimalistHeader from '~/components/MinimalistHeader.vue'

defineProps<{
    doc: unknown;
    docs: unknown;
    currentPage: number;
    total: number;
    category: string;
    tag: string;
}>()

const config = useAppConfig()
const title = config.name || 'Minimalist'
const description = config.description || 'A minimalist theme for Bloggrify'
</script>
<style>
body {
    @apply bg-white dark:bg-slate-900 dark:text-white;
}
</style>
