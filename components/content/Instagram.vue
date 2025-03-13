<!-- components/InstagramPost.vue -->
<template>
    <div ref="instagramEmbedRef" class="instagram-embed-container">
        <div v-if="loading" class="flex justify-center items-center p-8">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"/>
        </div>
        <div v-else-if="error" class="p-4 text-red-500 border border-red-200 rounded-md bg-red-50">
            {{ error }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted} from 'vue'

const props = defineProps({
    postId: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        default: 500
    },
    hideCaption: {
        type: Boolean,
        default: false
    }
})

const instagramEmbedRef = ref(null)
const loading = ref(true)
const error = ref(null)

const loadInstagramEmbed = () => {
    if (!import.meta.client) return

    loading.value = true
    error.value = null

    if (window.instgrm) {
        renderEmbed()
        return
    }

    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = '//www.instagram.com/embed.js'

    script.onload = () => {
        renderEmbed()
    }

    script.onerror = () => {
        loading.value = false
        error.value = 'Unable to load Instagram embed'
    }

    document.body.appendChild(script)
}

const renderEmbed = () => {
    if (!instagramEmbedRef.value || !props.postId) return

    instagramEmbedRef.value.innerHTML = ''

    const blockquote = document.createElement('blockquote')
    blockquote.className = 'instagram-media'
    blockquote.setAttribute('data-instgrm-permalink', `https://www.instagram.com/p/${props.postId}/`)
    blockquote.setAttribute('data-instgrm-version', '14')

    if (props.width) {
        blockquote.style.width = `${props.width}px`
        blockquote.setAttribute('data-instgrm-width', props.width.toString())
    }

    if (props.hideCaption) {
        blockquote.setAttribute('data-instgrm-captioned', '')
    }

    instagramEmbedRef.value.appendChild(blockquote)

    if (window.instgrm) {
        try {
            window.instgrm.Embeds.process()
            loading.value = false
        } catch (err) {
            console.error('Error loading Instagram embed:', err)
            error.value = 'Error loading Instagram embed'
            loading.value = false
        }
    }
}

onMounted(() => {
    if (props.postId) {
        loadInstagramEmbed()
    }
})
</script>

<style scoped>
.instagram-embed-container {
    display: flex;
    justify-content: center;
    width: 100%;
    overflow: hidden;
}
</style>
