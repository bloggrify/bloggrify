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
    let baseUrl = useAppConfig().url
    // remove trailing slash if exists
    if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.slice(0, -1)
    }
    return baseUrl + route.path
}


</script>
