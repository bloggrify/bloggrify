<template>
    <TheHeader />
    <main class="mt-28">
        <div class="mx-auto max-w-[1330px] md:p-4">
            <div class="grid grid-cols-3 md:gap-4">
                <div class="col-span-3 lg:col-span-2 md:p-4">
                    <ContentList v-slot="{ list }">
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
                                            <h2 class="text-xl font-bold mb-2">
                                                {{ article.title }}
                                            </h2>
                                            <p class="text-gray-700 mb-4">
                                                {{ desc(article) }}
                                            </p>
                                            <div class="mb-3">
                                                <span
                                                    class="text-sm text-gray-500"
                                                    >{{
                                                        formatDate(article.date)
                                                    }}
                                                    ∙
                                                </span>
                                                <span
                                                    class="text-sm text-gray-500"
                                                    >{{
                                                        article.readingTime.text
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
                                        <NuxtImg
                                            :src="'/images/' + article.cover"
                                            :alt="article.title"
                                            class="w-full object-cover cursor-pointer"
                                            sizes="233px sm:400px md:400px"
                                            format="webp"
                                            loading="lazy"
                                            placeholder
                                            @click="navigateTo(article._path)"
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
                        :src="config.public.author.avatar"
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
                    <div class="mt-4">
                        <div class="flex mb-3 space-x-4">
                            <NuxtLink
                                aria-label="Open Youtube profile"
                                class="text-sm text-gray-500 transition hover:text-gray-600"
                                target="_blank"
                                rel="me"
                                :to="config.public.author.socials.youtube"
                                ><span class="sr-only">Youtube</span>
                                <img
                                    alt="Icon for Youtube"
                                    class="transition-transform hover:scale-110 w-8 h-8"
                                    src="~assets/icon/youtube.svg"
                                />
                            </NuxtLink>
                            <NuxtLink
                                aria-label="Open Mastodon profile"
                                class="text-sm text-gray-500 transition hover:text-gray-600"
                                rel="me"
                                target="_blank"
                                :to="config.public.author.socials.mastodon"
                                ><span class="sr-only">Mastodon</span>
                                <img
                                    alt="Icon for Mastodon"
                                    class="transition-transform hover:scale-110 w-8 h-8"
                                    src="~assets/icon/mastodon.svg"
                                />
                            </NuxtLink>
                            <NuxtLink
                                aria-label="Open github profile"
                                class="text-sm text-gray-500 transition hover:text-gray-600"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                :to="config.public.author.socials.github"
                                ><span class="sr-only">github</span>
                                <img
                                    alt="Icon for Github"
                                    class="transition-transform hover:scale-110 w-8 h-8"
                                    src="~assets/icon/github_new.svg"
                                />
                            </NuxtLink>
                            <NuxtLink
                                aria-label="Open Facebook profile"
                                class="text-sm text-gray-500 transition hover:text-gray-600"
                                target="_blank"
                                rel="noopener noreferrer"
                                :to="config.public.author.socials.facebook"
                                ><span class="sr-only">Facebook</span>
                                <img
                                    alt="Icon for Facebook"
                                    class="transition-transform hover:scale-110 w-8 h-8"
                                    src="~assets/icon/facebook.svg"
                                />
                            </NuxtLink>
                            <NuxtLink
                                aria-label="Open linkedin profile"
                                class="text-sm text-gray-500 transition hover:text-gray-600"
                                target="_blank"
                                rel="noopener noreferrer"
                                :to="config.public.author.socials.linkedin"
                                ><span class="sr-only">Linkedin</span>
                                <img
                                    alt="Icon for Linkedin"
                                    class="transition-transform hover:scale-110 w-8 h-8"
                                    src="~assets/icon/linkeding.svg"
                                />
                            </NuxtLink>
                            <NuxtLink
                                aria-label="Open twitter profile"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                :to="config.public.author.socials.twitter"
                                class="text-sm text-gray-500 transition hover:text-gray-600"
                            >
                                <img
                                    alt="Icon for Twitter"
                                    class="transition-transform hover:scale-110 w-8 h-8"
                                    src="~assets/icon/twitter.svg"
                                />
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
import { formatDate } from "~/common/format";

const config = useRuntimeConfig();

function desc(article: any): string {
    return (
        article.description.slice(0, 200) + "..." ||
        article.body.slice(0, 200) + "..."
    );
}
</script>
