<template>
    <TheHeader />
    <main class="mt-28">
        <div class="mx-auto max-w-[1330px] md:p-4">
            <div class="grid grid-cols-3 md:gap-4">
                <div class="col-span-3 lg:col-span-2 md:p-4">
                    <ContentList v-slot="{ list }" path="/posts">
                        <div class="space-y-8">
                            <div
                                v-for="article in list"
                                :key="article._path"
                                class="flex flex-col"
                            >
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="col-span-2 p-4">
                                        <h2 class="text-xl font-bold mb-1">
                                            {{ article.title }}
                                        </h2>
                                        <p class="text-gray-700 mb-4">
                                            {{ desc(article) }}
                                        </p>
                                        <div class="mb-3">
                                            <span class="text-sm text-gray-500"
                                                >{{ formatDate(article.date) }}
                                                ∙
                                            </span>
                                            <span
                                                class="text-sm text-gray-500"
                                                >{{
                                                    article.readingTime.text
                                                }}</span
                                            >
                                        </div>
                                        <div class="flex flex-wrap gap-2">
                                            <span
                                                v-for="tag in article.tags"
                                                :key="tag"
                                                class="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700"
                                                >{{ tag }}</span
                                            >
                                        </div>
                                    </div>
                                    <div
                                        class="col-span-1 p-4 flex justify-center items-center"
                                    >
                                        <NuxtImg
                                            v-if="article.cover"
                                            :src="'/images/' + article.cover"
                                            :alt="article.title"
                                            sizes="112px sm:112px md:112px"
                                            format="webp"
                                            loading="lazy"
                                            placeholder
                                        />
                                        <NuxtImg
                                            v-else
                                            src="https://via.placeholder.com/230x230"
                                            class="w-full object-cover"
                                            sizes="233px sm:400px md:400px"
                                            loading="lazy"
                                            placeholder
                                            format="webp"
                                            :alt="article.title"
                                        />
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </ContentList>
                </div>
                <div
                    class="col-span-1 p-4 hidden lg:block border-l border-gray-200 sticky top-28 h-screen overflow-y-auto"
                >
                    <NuxtImg
                        :src="config.public.author.image"
                        :alt="config.public.author.name"
                        class="rounded-full border border-gray-300"
                        width="100"
                        height="100"
                    />

                    <div class="font-semibold text-xl mt-2">
                        {{ config.public.author.name }}
                    </div>
                    <div class="text-gray-500 text-sm mt-2">
                        {{ config.public.author.description }}
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();

function formatDate(date: string | number): string {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString("en", options);
}

function desc(article: any): string {
    return (
        article.description.slice(0, 200) + "..." ||
        article.body.slice(0, 200) + "..."
    );
}
</script>
