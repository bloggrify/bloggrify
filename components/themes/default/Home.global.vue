<template>
    <main class="mt-28">
        <div class="mx-auto max-w-[1330px] md:p-4">
            <div class="grid grid-cols-3 md:gap-4">
                <div class="col-span-3 lg:col-span-2 md:p-4">
                    <ContentList :query="query">
                        <template #not-found>
                            <p>No posts found.</p>
                        </template>
                        <template #default="{ list }">
                            <div class="space-y-8">
                                <div
                                    v-for="article in list"
                                    :key="article._path"
                                    class="flex flex-col"
                                >
                                    <div class="grid grid-cols-3 gap-4">
                                        <div
                                            class="col-span-2 p-4"
                                            :class="
                                                article.cover
                                                    ? 'col-span-2'
                                                    : 'col-span-3'
                                            "
                                        >
                                            <NuxtLink :to="article._path">
                                                <h2
                                                    class="text-3xl font-bold mb-2"
                                                >
                                                    {{ article.title }}
                                                </h2>
                                                <p class="text-gray-700 mb-4">
                                                    {{ desc(article) }}
                                                </p>
                                                <div class="mb-3">
                                                    <span
                                                        class="text-sm text-gray-500"
                                                        >{{
                                                            formatDate(
                                                                article.date,
                                                            )
                                                        }}
                                                        ∙
                                                    </span>
                                                    <span
                                                        class="text-sm text-gray-500"
                                                        >{{
                                                            article.readingTime
                                                                .text
                                                        }}</span
                                                    >
                                                </div>
                                            </NuxtLink>
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
                                            v-if="article.cover"
                                            class="col-span-1 p-4 flex justify-center items-center"
                                        >
                                            <NuxtLink
                                                :to="article._path"
                                                class="w-full"
                                            >
                                                <NuxtImg
                                                    :src="
                                                        '/images/' +
                                                        article.cover
                                                    "
                                                    :alt="article.title"
                                                    class="w-full object-cover"
                                                    sizes="233px sm:400px md:400px"
                                                    format="webp"
                                                    loading="lazy"
                                                    placeholder
                                                />
                                            </NuxtLink>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </template>
                    </ContentList>
                </div>
                <div
                    class="col-span-1 p-4 hidden lg:block border-l border-gray-200 sticky top-28 h-screen overflow-y-auto"
                >
                    <NuxtImg
                        :src="config.avatar"
                        :alt="config.name"
                        class="rounded-full border border-gray-300"
                        width="100"
                        height="100"
                    />

                    <div class="font-semibold text-xl mt-2">
                        {{ config.name }}
                    </div>
                    <div class="text-gray-500 text-sm mt-2">
                        {{ config.description }}
                    </div>
                    <div class="mt-4">
                        <div class="flex mb-3 space-x-4">
                            <NuxtLink
                                v-if="config.socials.youtube"
                                aria-label="Open Youtube profile"
                                class="text-sm text-gray-500 transition hover:text-gray-600"
                                target="_blank"
                                rel="me"
                                :to="config.socials.youtube"
                                ><span class="sr-only">Youtube</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    class="transition-transform hover:scale-110 w-6 h-6"
                                >
                                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                    <path
                                        d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
                                    />
                                </svg>
                            </NuxtLink>
                            <NuxtLink
                                v-if="config.socials.mastodon"
                                aria-label="Open Mastodon profile"
                                class="text-sm text-gray-500 transition hover:text-gray-600"
                                rel="me"
                                target="_blank"
                                :to="config.socials.mastodon"
                                ><span class="sr-only">Mastodon</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    class="transition-transform hover:scale-110 w-6 h-6"
                                >
                                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                    <path
                                        d="M433 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.6-28.4-290.5 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54a102.5 102.5 0 0 1 -.9-13.9c85.6 20.9 158.7 9.1 178.8 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zm-75.1 125.2h-46.6v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.3V197c0-58.5-64-56.6-64-6.9v114.2H90.2c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175z"
                                    />
                                </svg>
                            </NuxtLink>
                            <NuxtLink
                                v-if="config.socials.github"
                                aria-label="Open github profile"
                                class="text-sm text-gray-500 transition hover:text-gray-600"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                :to="config.socials.github"
                                ><span class="sr-only">github</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 496 512"
                                    class="transition-transform hover:scale-110 w-6 h-6"
                                >
                                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                    <path
                                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                    />
                                </svg>
                            </NuxtLink>
                            <NuxtLink
                                v-if="config.socials.facebook"
                                aria-label="Open Facebook profile"
                                class="text-sm text-gray-500 transition hover:text-gray-600"
                                target="_blank"
                                rel="noopener noreferrer"
                                :to="config.socials.facebook"
                                ><span class="sr-only">Facebook</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="transition-transform hover:scale-110 w-6 h-6"
                                    viewBox="0 0 320 512"
                                >
                                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                    <path
                                        d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                                    />
                                </svg>
                            </NuxtLink>
                            <NuxtLink
                                v-if="config.socials.linkedin"
                                aria-label="Open linkedin profile"
                                class="text-sm text-gray-500 transition hover:text-gray-600"
                                target="_blank"
                                rel="noopener noreferrer"
                                :to="config.socials.linkedin"
                                ><span class="sr-only">Linkedin</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    class="transition-transform hover:scale-110 w-6 h-6"
                                >
                                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                    <path
                                        d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                                    />
                                </svg>
                            </NuxtLink>
                            <NuxtLink
                                v-if="config.socials.twitter"
                                aria-label="Open twitter profile"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                :to="config.socials.twitter"
                                class="text-gray-500 transition hover:text-gray-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    class="transition-transform hover:scale-110 w-6 h-6"
                                >
                                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                    <path
                                        d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"
                                    />
                                </svg>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
const config = useAppConfig();

const query = {
    path: "",
    where: [{ listed: { $ne: false } }],
    limit: 10,
    sort: [{ date: -1 }],
};

function desc(article: any): string {
    return (
        article.description.slice(0, 200) + "..." ||
        article.body.slice(0, 200) + "..."
    );
}
</script>
