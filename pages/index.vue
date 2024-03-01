<template>
    <component :is="headerComponent" />
    <component :is="homePageComponent" />
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
const homePageComponent = resolveComponent(`Themes${theme}Home`);

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
        { key: "og:image", name: "og:image", content: config.logo },
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
