<template>
    <footer class="mt-auto bg-gray-100 text-gray-800 p-6">
        <div
            class="max-w-6xl mx-auto grid grid-cols-1 gap-4"
            :class="newsletterEnabled ? 'md:grid-cols-3' : 'md:grid-cols-2'"
        >
            <div>
                <h3 class="font-bold text-lg mb-4">Menu</h3>
                <ul>
                    <li v-for="item in menu" :key="item.path">
                        <NuxtLink
                            :key="item.path"
                            :to="item.path"
                            class="hover:text-gray-400"
                            >{{ item.name }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div>
                <h3 class="font-bold text-lg mb-4">Follow</h3>
                <div class="flex flex-col items-start mt-6">
                    <div class="flex mb-3 space-x-4">
                        <NuxtLink
                            aria-label="Open Youtube profile"
                            class="text-sm text-gray-500 transition hover:text-gray-600"
                            target="_blank"
                            rel="me"
                            :to="config.public.socials.youtube"
                            ><span class="sr-only">Youtube</span>
                            <img
                                alt="Icon for Youtube"
                                class="transition-transform hover:scale-110 w-6 h-6"
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
                                class="transition-transform hover:scale-110 w-6 h-6"
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
                                class="transition-transform hover:scale-110 w-6 h-6"
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
                                class="transition-transform hover:scale-110 w-6 h-6"
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
                                class="transition-transform hover:scale-110 w-6 h-6"
                                src="~assets/icon/twitter.svg"
                            />
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div v-if="newsletterEnabled">
                <h3 class="font-bold text-lg mb-4">Subscribe</h3>
                <p class="mb-4">Subscribe to get the latest posts by email.</p>
                <p v-if="error" class="text-red-500 text-xs italic mb-2">
                    Subscription failed. Please retry later
                </p>
                <p v-if="success" class="text-green-500 text-xs italic mb-2">
                    You have successfully subscribed
                </p>

                <form :action="formAction" method="post" target="_blank">
                    <input
                        v-model="email"
                        name="fields[email]"
                        autocomplete="email"
                        type="email"
                        placeholder="Your email"
                        class="p-2 text-gray-700 w-full"
                        required
                    />
                    <input type="hidden" name="ml-submit" value="1" />
                    <input type="hidden" name="anticsrf" value="true" />
                    <button
                        class="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        @click.prevent="subscribe"
                    >
                        Subscribe
                    </button>
                </form>
            </div>

            <div
                class="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400"
            >
                <div>Copyright © {{ new Date().getFullYear() }}</div>
                <div>•</div>
                &nbsp;{{ config.public.name }}
                <div>•</div>
                &nbsp; Powered by
                <a href="https://github.com/hlassiege/bloggr">Bloggr</a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const menu = config.public.menu;
const newsletterEnabled = config.public.newsletter.enabled;
const formAction = config.public.newsletter.form_action;
const email = ref("");
const success = ref(false);
const error = ref(false);

async function subscribe() {
    const formData = new FormData();
    formData.append("fields[email]", email.value);
    formData.append("ml-submit", "1");
    formData.append("anticsrf", "true");
    const response = await fetch(formAction, {
        method: "POST",
        body: formData,
    });
    email.value = "";

    if (response.ok) {
        success.value = true;
    } else {
        error.value = true;
    }
}
</script>
