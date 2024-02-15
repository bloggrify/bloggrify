<template>
    <TheHeader />
    <main class="mt-28">
        <div class="mx-auto max-w-[1330px] md:p-4">
            <div class="col-span-3 lg:col-span-2 md:p-4">
                <h2
                    class="text-xl font-bold text-gray-700 mb-8 flex justify-center"
                >
                    Archives
                </h2>
                <ContentList :query="query">
                    <template #not-found>
                        <p>No posts found.</p>
                    </template>
                    <template #default="{ list }">
                        <div
                            v-for="(article, index) in list"
                            :key="article._path"
                            class="mb-2 ml-4 lg:ml-0"
                        >
                            <div
                                v-if="
                                    shouldDisplayYear(list, article.date, index)
                                "
                                class="mb-4"
                            >
                                <span class="text-xl font-bold">{{
                                    getYear(article.date)
                                }}</span>
                            </div>
                            <NuxtLink :to="article._path" class="text-gray-700">
                                <span>{{ article.date }}</span> &middot;
                                <span>{{ article.title }}</span>
                            </NuxtLink>
                        </div>
                    </template>
                </ContentList>
            </div>
        </div>
    </main>
    <TheFooter />
</template>
<script setup lang="ts">
import { formatDate } from "~/common/format";
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";

const config = useRuntimeConfig();

const query: QueryBuilderParams = {
    path: "",
    where: [{ listed: { $ne: false } }],
    sort: [{ date: -1 }],
};

function getYear(date) {
    return new Date(date).getFullYear();
}

function shouldDisplayYear(list, date, index) {
    const currentYear = getYear(date);
    const prevYear = index > 0 ? getYear(list[index - 1].date) : null;
    return currentYear !== prevYear;
}

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
