<template>
    <div>
        <h1 class="text-5xl text-gray-700 font-extrabold text-center mb-3">
            {{ article.title }}
        </h1>

        <div class="grid grid-cols-3 text-center sm:w-full md:w-1/2 mx-auto">
            <div>
                <p class="text-center font-bold my-4 text-slate-500 text-xs">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    {{ formatDate(article.date) }}
                </p>
            </div>
            <div>
                <p class="text-center font-bold my-4 text-slate-500 text-xs">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    {{ article.readingTime.text }}
                </p>
            </div>
            <div class="flex items-center font-medium sm:mx-3 justify-center">
                <NuxtImg
                    :src="author.avatar"
                    loading="lazy"
                    alt=""
                    class="mr-3 w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800"
                />
                <div>
                    <div class="font-bold text-slate-500 text-xs">
                        {{ author.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { formatDate } from "~/common/format";
const config = useRuntimeConfig();

const props = defineProps<{
    article: any;
}>();

function findAuthor(authorId?: string) {
    // find author from config.public.authors array or, if authorId is null, return the one with "default" is true
    if (authorId === undefined) {
        return config.public.authors.find((author) => author.default);
    }
    return config.public.authors.find((author) => author.username === authorId);
}

const author = findAuthor(props.article.author);
</script>
