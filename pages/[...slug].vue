<template>
    <component :is="headerComponent" />
    <component :is="postComponent" :doc="doc" />
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
const postComponent = defineAsyncComponent(
    () => import(`../components/themes/${config.public.theme}/Post.vue`),
);

const route = useRoute();
const { data: doc } = await useAsyncData(route.path, async () => {
    return await queryContent("").where({ _path: route.path }).findOne();
});

onMounted(() => {
    useYoutubeTwitterEnhancer("nuxtContent");
});

onMounted(() => {
    const images = document.querySelectorAll(".prose img");

    images.forEach((img) => {
        const captionText = img.alt;
        const captionElement = document.createElement("div");
        captionElement.textContent = captionText;
        captionElement.classList.add(
            "text-sm",
            "text-center",
            "text-gray-600",
            "mt-1",
        );
        img.parentNode?.insertBefore(captionElement, img.nextSibling);
    });
});

if (config.public.comments.enabled) {
    useHead({
        script: [
            {
                async: true,
                src: "https://talk.hyvor.com/embed/embed.js",
                type: "module",
            },
        ],
    });
}

if (doc.value) {
    useContentHead(doc.value);
}

useHead({
    meta: [
        { key: "og:type", name: "og:type", content: "article" },
        {
            key: "og:url",
            name: "og:url",
            content: config.public.url + doc.value?._path,
        },
        {
            key: "og:image",
            name: "og:image",
            content: config.public.url + "/images/" + doc.value?.cover,
        },
        { name: "og:image:alt", content: doc.value?.title },
        { name: "twitter:text:title", content: doc.value?.title },
        {
            name: "twitter:image",
            content: config.public.url + "/images/" + doc.value?.cover,
        },
        { name: "twitter:card", content: "summary" },
        {
            name: "article:published_time",
            content: new Date(doc.value?.date).toISOString(),
        },
        {
            name: "article:article:modified_time",
            content: new Date(doc.value?.date).toISOString(),
        },
        {
            name: "article:article:tag",
            content: doc.value?.tags ? doc.value.tags?.toString() : "",
        },
    ],
    link: [
        {
            rel: "canonical",
            href: config.public.url + doc.value?._path,
        },
    ],
});
</script>
