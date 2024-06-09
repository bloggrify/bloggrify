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
        <div v-if="doc">
            <ContentRenderer
                id="nuxtContent"
                :value="doc"
                class="prose text-sm md:text-xl min-w-full md:p-10 mx-auto"
            />
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
const menu = config.menu
</script>
<style lang="scss">
.prose {
    a {
        @apply underline underline-offset-2 decoration-dotted;
    }

    h1 a,
    h2 a,
    h3 a,
    h4 a,
    h5 a,
    h6 a {
        @apply no-underline ;
    }
}

</style>

