<template>
    <div>
        <MinimalistHeader/>

        <MinimalistMenu />

        <main class="mt-10 w-3/4 mx-auto">
            <div class="mt-4">
                {{ description }}
            </div>

            <div class="mt-10">
                <MinimalistListing title="Last Posts" />

                <div class="mt-4">
                    <NuxtLink class="underline " to="/archives">
                        Read all posts
                    </NuxtLink>
                </div>
            </div>
        </main>
        <MinimalistFooter />
    </div>
</template>
<script setup lang="ts">
import type { PageCollectionItem } from '@nuxt/content'
import MinimalistMenu from '~/components/minimalist/MinimalistMenu.vue'
import MinimalistFooter from '~/components/minimalist/MinimalistFooter.vue'
import MinimalistHeader from '~/components/minimalist/MinimalistHeader.vue'
import MinimalistListing from '~/components/content/MinimalistListing.vue'

defineProps<{
    doc: PageCollectionItem;
}>()

const config = useAppConfig()
const description = config.description || 'A minimalist theme for Bloggrify'
</script>
<style>
@reference "~/assets/css/core.css";
body {
    @apply bg-white dark:bg-slate-900 dark:text-white;
}
</style>
