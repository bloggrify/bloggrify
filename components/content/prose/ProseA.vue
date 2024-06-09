<template>
    <div v-if="isYoutube" class="flex justify-center items-center">
        <iframe
            :src="youtubeUrl"
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen
        />
    </div>
    <div v-else-if="isTwitter" class="flex justify-center items-center">
        <blockquote class="twitter-tweet">
            <a :href="twitterUrl">{{ twitterUrl }}</a>
        </blockquote>
    </div>

    <NuxtLink
        v-if="!isYoutube && !isTwitter"
        :href="href"
        :target="target"
    >
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
import type {PropType} from 'vue'

const props = defineProps({
    href: {
        type: String,
        default: ''
    },
    target: {
        type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
        default: undefined,
        required: false
    }
})

const youtubeUrl = ref('')
const twitterUrl = ref('')
const isTwitter = ref(false)

const isYoutube = computed(() => {
    return props.href.includes('youtube.com') || props.href.includes('youtu.be')
})

isTwitter.value = props.href.includes('twitter.com') || props.href.includes('x.com')

if (isTwitter) {
    const tweetId = extractTweetId(props.href)

    twitterUrl.value = `https://twitter.com/x/status/${tweetId}`
}

function extractTweetId(tweetUrl: string): string | null {
    const tweetIdMatch = tweetUrl.match(/status\/(\d+)/)
    return tweetIdMatch ? tweetIdMatch[1] : null
}

onMounted(() => {
    if (isTwitter.value) {
        useHead({
            script: [
                {
                    src: 'https://platform.twitter.com/widgets.js',
                    async: true,
                    defer: true
                }
            ]
        })
    }
})

if (isYoutube.value) {
    const regExpMatchArray = props.href.match(/v=(.*)$/) || props.href.match(/youtu.be\/(.*)$/)
    if (regExpMatchArray) {
        const videoId = regExpMatchArray[1]
        youtubeUrl.value = `https://www.youtube-nocookie.com/embed/${videoId}`
    }
}

</script>
