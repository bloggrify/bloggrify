<template>
    <TheHeader />
    <main class="mt-28">
        <div v-if="doc">
            <div v-if="doc.cover" class="flex justify-center mt-24">
                <NuxtImg
                    :src="'/images/' + doc.cover"
                    :alt="doc.title"
                    class="object-cover w-96"
                />
            </div>
            <div class="px-4 mx-auto sm:px-6 xl:max-w-7xl xl:px-0 mt-10">
                <ArticleHeader :article="doc" />

                <div class="text-left mx-auto">
                    <div class="flex flex-wrap lg:flex-row-reverse py-12">
                        <div v-if="isTocEnabled" class="w-full lg:w-1/4 px-5">
                            <PageSidebar :toc="doc.body.toc.links" />
                        </div>

                        <div
                            class="w-full px-5 max-w-none centered-image"
                            :class="isTocEnabled ? 'lg:w-3/4 ' : ''"
                        >
                            <ContentRenderer
                                id="nuxtContent"
                                :value="doc"
                                class="prose font-proxima text-sm md:text-xl font-medium min-w-full md:p-10 mx-auto"
                            />
                        </div>
                    </div>
                </div>

                <hr class="mb-8" />

                <!--                    <SharingButtons-->
                <!--                        :title="doc.title"-->
                <!--                        :twitter_user="siteMetadata.twitter_user"-->
                <!--                        :post-link="postLink"-->
                <!--                    />-->

                <hyvor-talk-comments
                    website-id="7045"
                    :page-id="doc.id"
                ></hyvor-talk-comments>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const { data: doc } = await useAsyncData(route.path, async () => {
    const doc = await queryContent("").where({ _path: route.path }).findOne();
    return doc;
});

const isTocEnabled =
    doc.value?.body?.toc?.links.length &&
    doc.value?.body.toc?.links.length > 0 &&
    (config.public.table_of_contents || doc.value?.table_of_contents);

onMounted(() => {
    useYoutubeTwitterEnhancer("nuxtContent");
});
</script>
