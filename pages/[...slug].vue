<template>
    <component :is="headerComponent" />
    <component :is="postComponent" :doc="doc" />
    <component :is="footerComponent" />
</template>
<script setup lang="ts">
import { navigateTo } from "#app";

const config = useAppConfig();

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const theme = capitalizeFirstLetter(config.theme);

const headerComponent = resolveComponent(`Themes${theme}Header`);
const footerComponent = resolveComponent(`Themes${theme}Footer`);
const postComponent = resolveComponent(`Themes${theme}Post`);

const route = useRoute();
const { data: doc } = await useAsyncData(route.path, async () => {
    return await queryContent("").where({ _path: route.path }).findOne();
});

if (doc.value?.redirect_to_domain) {
    const redirect = doc.value?.redirect_to_domain + doc.value?._path;
    navigateTo(redirect, { external: true, redirectCode: 301 });
}
if (doc.value?.redirect_to_full_url) {
    const redirect = doc.value?.redirect_to_full_url;
    navigateTo(redirect, { external: true, redirectCode: 301 });
}

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

if (config.comments.enabled) {
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

const url = useAppConfig().url;
const postLink = useAppConfig().url + doc.value?._path;

const alternates =
    doc.value?.alternates?.map((alternate: any) => {
        const key = Object.keys(alternate)[0];
        const value = alternate[key];
        return {
            rel: "alternate",
            href: value,
            hreflang: key,
        };
    }) || [];

alternates.push({
    rel: "alternate",
    href: postLink,
    hreflang: doc.value?.language || "en",
});

useHead({
    meta: [
        { key: "og:type", name: "og:type", content: "article" },
        {
            key: "og:url",
            name: "og:url",
            content: postLink,
        },
        {
            key: "og:image",
            name: "og:image",
            content: url + "/images/" + doc.value?.cover,
        },
        { name: "og:image:alt", content: doc.value?.title },
        { name: "twitter:text:title", content: doc.value?.title },
        {
            name: "twitter:image",
            content: url + "/images/" + doc.value?.cover,
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
            href: postLink,
        },
        ...alternates,
    ],
});
</script>
