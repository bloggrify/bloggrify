<template>
    <div class="flex flex-col min-h-screen">
        <NuxtPage />
    </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();

useHead({
    meta: [
        {
            key: "poweredBy",
            name: "poweredBy",
            content: "bloggr",
        },
        {
            key: "bloggr-theme",
            name: "bloggr-theme",
            content: config.public.theme,
        },
    ],
});
</script>
