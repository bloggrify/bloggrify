<template>
    <div>
        <nav class="mt-10 w-3/4 mx-auto">
            <h1 class="text-3xl font-bold">
                {{ title }}
            </h1>
        </nav>
        <MinimalistMenu />
        <main class="mt-10 w-3/4 mx-auto">
            <h1 class="text-3xl font-bold">
                All Posts
            </h1>
            <section class="mt-10">
                <div v-for="article in docs" :key="article._path">
                    <NuxtLink class="text-blue-400 underline" :to="article._path">
                        {{ article.date }} - {{ article.title }}
                    </NuxtLink>
                </div>
            </section>
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
</script>

