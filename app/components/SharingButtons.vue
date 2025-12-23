<template>
    <SocialShare
        v-for="network in sharingNetworks"
        :key="network"
        :image="cover"
        :title="title"
        :network="network"
        :styled="styled"
        :label="false"
        :url="url()"
        :class="classButton"
    />
</template>
<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
const config = useAppConfig()
const route = useRoute()
const sharingNetworks = config.socials?.sharing_networks || []
defineProps<{
    title: string;
    cover?: string;
    classButton?: string;
    styled?: boolean;
}>()

const url = function () {
    const baseUrl = useRuntimeConfig().public.url
    return withoutTrailingSlash(baseUrl) + route.path
}


</script>
