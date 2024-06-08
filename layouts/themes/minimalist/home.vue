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
            {{ title }}
        </h1>

        <div class="mt-4">
            {{ description }}
        </div>

        <div class="mt-10">
            <NuxtLink class="underline " to="/archives">
                Read all posts
            </NuxtLink>
        </div>
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
const title = config.name
const description = config.description
const menu = config.menu
</script>
