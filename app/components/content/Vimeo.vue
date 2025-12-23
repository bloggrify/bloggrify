<template>
    <div class="flex justify-center items-center">
        <iframe
            :src="`https://player.vimeo.com/video/${videoId}`"
            width="640"
            height="360"
            frameborder="0"
            allowfullscreen
        />
    </div>
</template>
<script setup lang="ts">
defineProps<{
    videoId: string;
}>()
</script>

