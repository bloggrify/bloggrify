<template>
    <footer class="lg:mt-40 border-t border-t-2">
        <div class="flex flex-col items-center mt-16">
            <div class="flex mb-3 space-x-4">
                <NuxtLink
                    aria-label="Open RSS feed"
                    target="_blank"
                    to="/rss.xml"
                    class="text-sm text-gray-500 transition hover:text-gray-600"
                >
                    <img
                        alt="Icon for RSS feed"
                        class="transition-transform hover:scale-110 w-8 h-8"
                        src="~assets/icon/rss.svg"
                    />
                </NuxtLink>
                <NuxtLink
                    aria-label="Open Youtube profile"
                    class="text-sm text-gray-500 transition hover:text-gray-600"
                    target="_blank"
                    rel="me"
                    :to="config.public.socials.youtube"
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
                    target="_blank"
                    rel="me"
                    :to="config.public.socials.mastodon"
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
                    :to="config.public.socials.github"
                    ><span class="sr-only">github</span>
                    <img
                        alt="Icon for Github"
                        class="transition-transform hover:scale-110 w-8 h-8"
                        src="~assets/icon/github_new.svg"
                    /> </NuxtLink
                ><NuxtLink
                    aria-label="Open linkedin profile"
                    class="text-sm text-gray-500 transition hover:text-gray-600"
                    target="_blank"
                    rel="noopener noreferrer"
                    :to="config.public.socials.linkedin"
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
                    :to="config.public.socials.twitter"
                    class="text-sm text-gray-500 transition hover:text-gray-600"
                >
                    <img
                        alt="Icon for Twitter"
                        class="transition-transform hover:scale-110 w-8 h-8"
                        src="~assets/icon/twitter.svg"
                    />
                </NuxtLink>
            </div>
            <div
                class="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400"
            >
                <div>Copyright © {{ new Date().getFullYear() }}</div>
                <div>•</div>
                {{ config.public.name }}
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
</script>
