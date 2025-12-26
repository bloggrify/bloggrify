<template>
    <div>
        <MinimalistHeader/>

        <MinimalistMenu />

        <main class="mt-10 w-full lg:w-3/5 mx-6 lg:mx-auto">
            <div v-if="doc">
                <div class="text-center">
                    <h2 class="text-3xl font-bold">
                        {{ doc.title }}
                    </h2>
                </div>

                <ContentRenderer
                    id="nuxtContent"
                    :value="doc"
                    class="prose pt-6 text-sm md:text-xl dark:prose-invert max-w-none"
                />

                <MinimalistAuthorBio v-if="author" :author="author" />

                <CommentSystem :id="doc.id" :nocomments="doc.nocomments" />
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
import MinimalistAuthorBio from '~/components/minimalist/MinimalistAuthorBio.vue'

const props = defineProps<{
    doc: PageCollectionItem;
}>()

const author = computed(() => findAuthor(props.doc?.author))
</script>
<style lang="scss">
@reference "~/assets/css/core.css";
.prose {
    a {
        @apply underline underline-offset-2 decoration-dotted;
    }

    h1 a,
    h2 a,
    h3 a,
    h4 a,
    h5 a,
    h6 a {
        @apply no-underline ;
    }
}
</style>

