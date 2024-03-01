<template>
    <component :is="headerComponent" />
    <component :is="archiveComponent" />
    <component :is="footerComponent" />
</template>
<script setup lang="ts">
const config = useAppConfig();
function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const theme = capitalizeFirstLetter(config.theme);

const headerComponent = resolveComponent(`Themes${theme}Header`);
const footerComponent = resolveComponent(`Themes${theme}Footer`);
const archiveComponent = resolveComponent(`Themes${theme}Archive`);

useHead({
    title: config.name,
    meta: [
        {
            key: "description",
            name: "description",
            content: config.description,
        },
        {
            key: "og:description",
            name: "og:description",
            content: config.description,
        },
        { key: "og:type", name: "og:type", content: "website" },
        { key: "og:title", name: "og:title", content: config.name },
        { key: "og:url", name: "og:url", content: useRequestURL() },
        {
            key: "twitter:text:title",
            name: "twitter:text:title",
            content: config.name,
        },
        { key: "twitter:card", name: "twitter:card", content: "summary" },
    ],
});
</script>
