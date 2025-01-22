<template>
    <hyvor-talk-comments
        v-if="isCommentsEnabled"
        :website-id="config.comments?.hyvor_talk.website_id"
        :page-id="id"
        class="dark:text-white"
        :colors="isDark ? 'dark' : 'light'"
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

if (isCommentsEnabled) {
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
</script>
