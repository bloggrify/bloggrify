<template>
    <div v-if="isLinkToYoutubeVideo" class="flex justify-center items-center">
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
        v-if="!isLinkToYoutubeVideo && !isTwitter"
        :href="href"
        :target="target"
        v-bind="attrs"
    >
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
import type {PropType} from 'vue'

defineOptions({
    inheritAttrs: false
})

const attrs = useAttrs()

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

const isLinkToYoutubeVideo = computed(() => {
    const isYoutubeLink = props.href.includes('youtube.com') || props.href.includes('youtu.be')

    if (!isYoutubeLink) {
        return false
    }
    const videoId = getVideoId()

    return isYoutubeLink && videoId
})

isTwitter.value = (props.href.includes('twitter.com') || props.href.includes('x.com')) && props.href.includes('status')

if (isTwitter.value) {
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

function getVideoId() {
    const regExpMatchArray = props.href.match(/v=(.*)$/) || props.href.match(/youtu.be\/(.*)$/)
    if (regExpMatchArray) {
        return regExpMatchArray[1]
    }
}

if (isLinkToYoutubeVideo.value) {
    const videoId = getVideoId()
    if (videoId) {
        youtubeUrl.value = `https://www.youtube-nocookie.com/embed/${videoId}`
    }
}

</script>
