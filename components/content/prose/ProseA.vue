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

const isYoutube = computed(() => {
    return props.href.includes('youtube.com') || props.href.includes('youtu.be')
})

const isTwitter = props.href.match(
    /^https:\/\/twitter\.com\/[0-9a-zA-Z_]*\/status\/([0-9a-zA-Z]*)$/,
) || props.href.match(/^https:\/\/mobile\.twitter\.com\/[0-9a-zA-Z_]*\/status\/([0-9a-zA-Z]*)$/)
    || props.href.match(/^https:\/\/x\.com\/[0-9a-zA-Z_]*\/status\/([0-9a-zA-Z]*)$/)

if (isTwitter) {
    isTwitter.forEach((match) => {
        twitterUrl.value = `https://x.com/x/status/${match}`
    })
}

onMounted(() => {
    if (isTwitter) {
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
