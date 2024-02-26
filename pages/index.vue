<template>
    <component :is="headerComponent" />
    <component :is="homePageComponent" />
    <component :is="footerComponent" />
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const config = useRuntimeConfig();

const headerComponent = defineAsyncComponent(
    () => import(`../components/themes/${config.public.theme}/Header.vue`),
);
const footerComponent = defineAsyncComponent(
    () => import(`../components/themes/${config.public.theme}/Footer.vue`),
);
const homePageComponent = defineAsyncComponent(
    () => import(`../components/themes/${config.public.theme}/Home.vue`),
);

useHead({
    title: config.public.name,
    meta: [
        {
            key: "description",
            name: "description",
            content: config.public.description,
        },
        {
            key: "og:description",
            name: "og:description",
            content: config.public.description,
        },
        { key: "og:type", name: "og:type", content: "website" },
        { key: "og:title", name: "og:title", content: config.public.name },
        { key: "og:image", name: "og:image", content: config.public.logo },
        { key: "og:url", name: "og:url", content: config.public.url },
        {
            key: "twitter:text:title",
            name: "twitter:text:title",
            content: config.public.name,
        },
        { key: "twitter:card", name: "twitter:card", content: "summary" },
    ],
});
</script>
