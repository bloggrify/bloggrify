<template>
    <div>
        <NuxtPage />
    </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();

useHead({
    title: config.public.name,
    meta: [
        {
            hid: "description",
            name: "description",
            content: config.public.description,
        },
        {
            hid: "og:description",
            name: "og:description",
            content: config.public.description,
        },
        { hid: "og:type", name: "og:type", content: "website" },
        { hid: "og:title", name: "og:title", content: config.public.name },
        { hid: "og:url", name: "og:url", content: config.public.url },
        {
            hid: "twitter:text:title",
            name: "twitter:text:title",
            content: config.public.name,
        },
        { hid: "twitter:card", name: "twitter:card", content: "summary" },
    ],
});
</script>
