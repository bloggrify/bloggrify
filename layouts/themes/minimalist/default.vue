<template>
    <div>
        <nav class="mt-10 w-3/4 mx-auto">
            <h1 class="text-4xl font-bold">
                {{ title }}
            </h1>
        </nav>

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
                    class="prose pt-6 text-sm md:text-xl dark:prose-invert"
                />
            </div>
        </main>
        <MinimalistFooter />
    </div>
</template>
<script setup lang="ts">
import MinimalistMenu from '~/components/MinimalistMenu.vue'
import MinimalistFooter from '~/components/MinimalistFooter.vue'

defineProps<{
    doc: any;
    docs: any;
    currentPage: number;
    total: number;
    category: string;
    tag: string;
}>()
const config = useAppConfig()
const title = config.name
</script>
<style lang="scss">
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

