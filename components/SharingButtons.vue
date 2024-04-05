<template>
    <SocialShare
        v-for="network in sharingNetworks"
        :key="network"
        :image="cover"
        :title="title"
        :network="network"
        :styled="styled"
        :label="false"
        :class="classButton"
    />
</template>
<script setup lang="ts">
const config = useAppConfig()
const sharingNetworks = config.socials?.sharing_networks || []
defineProps<{
    title: string;
    cover: string | undefined;
    classButton: string | undefined;
    styled: boolean | undefined;
}>()

</script>
