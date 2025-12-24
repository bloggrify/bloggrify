<template>
    <div>
        <MinimalistHeader/>

        <MinimalistMenu />
        <section class="mt-10 w-full lg:w-3/5 mx-6 lg:mx-auto">
            <h2 class="text-4xl font-bold text-gray-700 dark:text-gray-100 mb-8 flex justify-center"> Tag: {{ tag }}</h2>

            <MinimalistListing format="list" :tag="tag"/></section>
        <MinimalistFooter />
    </div>
</template>
<script setup lang="ts">
import MinimalistMenu from '~/components/minimalist/MinimalistMenu.vue'
import MinimalistFooter from '~/components/minimalist/MinimalistFooter.vue'
import MinimalistHeader from '~/components/minimalist/MinimalistHeader.vue'

defineProps<{
    tag: string;
}>()
</script>

