<template>
    <div class="flex justify-center items-center">
        <blockquote class="twitter-tweet">
            <a :href="twitterUrl">{{ twitterUrl }}</a>
        </blockquote>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    tweetId: string;
}>()

const twitterUrl = computed(() => `https://twitter.com/x/status/${props.tweetId}`)

onMounted(() => {
    useHead({
        script: [
            {
                src: 'https://platform.twitter.com/widgets.js',
                async: true,
                defer: true
            }
        ]
    })
})


</script>
<style scoped>
    .aspect-w-16 {
        width: 100%;
    }
    .aspect-h-9 {
        height: 0;
        padding-bottom: 56.25%;
    }
</style>
