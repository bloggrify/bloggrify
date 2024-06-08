<template>
    <nav class="mt-10 w-3/4 mx-auto">
        <div class="flex gap-4">
            <NuxtLink
                to="/"
                class="underline"
            >
                Home
            </NuxtLink>
            <NuxtLink
                v-for="item in menu"
                :key="item.path"
                :to="item.path"
                class="underline"
            >
                {{ item.name }}
            </NuxtLink>
        </div>
    </nav>
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
</template>
<script setup lang="ts">
defineProps<{
    doc: any;
    docs: any;
    currentPage: number;
    total: number;
    category: string;
    tag: string;
}>()
const config = useAppConfig()
const menu = config.menu
</script>
