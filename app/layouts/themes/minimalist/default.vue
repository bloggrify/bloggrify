<template>
  <MinimalistShell>
    <article
      v-if="doc"
      class="max-w-3xl mx-auto"
    >
      <ULink
        to="/archives"
        class="text-sm inline-flex items-center gap-1 text-muted hover:text-default"
      >
        <UIcon name="i-lucide-chevron-left" />
        All posts
      </ULink>

      <header class="flex flex-col gap-4 mt-8 text-center">
        <div class="flex items-center justify-center gap-2 text-xs text-muted">
          <time
            v-if="doc.date"
            :datetime="new Date(doc.date).toISOString()"
          >
            {{ formatDate(doc.date) }}
          </time>
          <span v-if="doc.date && doc.readingTime?.text">·</span>
          <span v-if="doc.readingTime?.text">{{ doc.readingTime.text }}</span>
        </div>

        <NuxtImg
          v-if="doc.cover"
          :src="doc.cover"
          :alt="doc.title"
          class="rounded-lg w-full h-[320px] object-cover object-center"
        />

        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight">
          {{ doc.title }}
        </h1>

        <p
          v-if="doc.description"
          class="text-muted max-w-2xl mx-auto"
        >
          {{ doc.description }}
        </p>

      </header>

      <UPageBody>
        <ContentRenderer
          id="nuxtContent"
          :value="doc"
          class="prose dark:prose-invert max-w-none"
        />

        <div class="flex items-center justify-end gap-2 text-sm text-muted mt-8">
          <UButton
            icon="i-lucide-link"
            size="sm"
            variant="link"
            color="neutral"
            label="Copy link"
            @click="copyToClipboard(articleLink, 'Article link copied to clipboard')"
          />
        </div>

        <UContentSurround :surround="surround" />

        <MinimalistAuthorBio
          v-if="author"
          :author="author"
        />

        <CommentSystem
          :id="doc.pageid"
          :nocomments="doc.nocomments"
        />
      </UPageBody>
    </article>
  </MinimalistShell>
</template>

<script setup lang="ts">
import type { PageCollectionItem } from '@nuxt/content'
import type { ContentSurroundLink } from '@nuxt/ui'
import { joinURL, withoutTrailingSlash } from 'ufo'

const props = defineProps<{
  doc: PageCollectionItem
}>()

const author = computed(() => findAuthor(props.doc?.author))

// UContentSurround reads positions [prev, next] and renders an empty slot when either is
// null, so the nulls are kept (not filtered) to preserve left/right alignment.
const { prev, next } = await useContentSurround({ doc: props.doc })
const surround = computed(() => [prev.value, next.value] as ContentSurroundLink[])

const runtimeConfig = useRuntimeConfig()
const articleLink = computed(() =>
  withoutTrailingSlash(joinURL(runtimeConfig.public.url as string, props.doc?.path || '/')),
)
</script>

<style lang="scss">
@reference "#core/assets/css/core.css";
.prose {
    a {
        @apply underline underline-offset-2 decoration-dotted;
    }

    /* Section headings (and their anchor links) must never be underlined, even though the
       typography plugin underlines links by default. */
    :is(h1, h2, h3, h4, h5, h6),
    :is(h1, h2, h3, h4, h5, h6) a {
        text-decoration: none;
    }
}
</style>
