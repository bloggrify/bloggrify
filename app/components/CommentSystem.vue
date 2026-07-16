<template>
    <hyvor-talk-comments
        v-if="isCommentsEnabled && provider === 'hyvor_talk'"
        :website-id="config.comments?.hyvor_talk?.website_id"
        :page-id="id"
        class="dark:text-white"
        :colors="isDark ? 'dark' : 'light'"
    />
    <div
        v-else-if="isCommentsEnabled && provider === 'hakanai'"
        id="hakanai-connect"
    />
</template>
<script setup lang="ts">
import { useDark } from '@vueuse/core'
const props = defineProps<{
    id: string | undefined;
    nocomments: boolean | undefined;
}>()

const config = useAppConfig()
const isDark = useDark()
const isCommentsEnabled = config.comments?.enabled && !props.nocomments
const provider = config.comments?.provider ?? 'hyvor_talk'

if (isCommentsEnabled && provider === 'hyvor_talk') {
    useHead({
        script: [
            {
                async: true,
                src: 'https://talk.hyvor.com/embed/embed.js',
                type: 'module',
            },
        ],
    })
}

if (isCommentsEnabled && provider === 'hakanai') {
    useHead({
        script: [
            {
                async: true,
                src: 'https://connect.hakanai.io/embed.js',
                'data-key': config.comments?.hakanai?.key,
                ...(props.id ? { 'data-page-id': props.id } : {}),
            },
        ],
    })
}
</script>