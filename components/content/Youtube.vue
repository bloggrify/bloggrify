<template>
    <div class="flex justify-center items-center">
        <iframe
            :src="`https://www.youtube-nocookie.com/embed/${videoId}`"
            width="560"
            height="315"
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

