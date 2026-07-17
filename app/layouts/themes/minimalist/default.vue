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
        <Toc
          v-if="showToc"
          :doc="doc"
          class="mb-8"
        />

        <ContentRenderer
          id="nuxtContent"
          :value="doc"
          class="prose dark:prose-invert max-w-none"
        />

        <div class="flex flex-wrap items-center justify-between gap-2 text-sm text-muted mt-8 pt-6 border-t border-default">
          <div
            v-if="sharingEnabled"
            class="flex items-center gap-1"
          >
            <span class="text-xs mr-1">Share</span>
            <SharingButtons
              :title="doc.title ?? ''"
              :cover="doc.cover"
            />
          </div>

          <UButton
            icon="i-lucide-link"
            size="sm"
            variant="link"
            color="neutral"
            label="Copy link"
            class="ml-auto"
            @click="copyToClipboard(articleLink, 'Article link copied to clipboard')"
          />
        </div>

        <UContentSurround :surround="surround" />

        <MinimalistAuthorBio
          v-if="author"
          :author="author"
        />

        <NewsletterForm
          title="Enjoyed this article?"
          description="Subscribe to get new posts delivered to your inbox."
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

// The core SharingButtons component reads the networks from app.config; the row is only
// rendered when at least one network is configured (sharing.networks, or the deprecated
// socials.sharing_networks).
const appConfig = useAppConfig()
const sharingEnabled = computed(() =>
  (appConfig.sharing?.networks ?? appConfig.socials?.sharing_networks ?? []).length > 0,
)

// The table of contents shows when the site enables it globally (`table_of_contents` in
// app.config) or when a post opts in with its own `table_of_contents` frontmatter, unless the
// post opts out with `notoc`. The component also hides itself on posts with no headings, so
// short pages never show an empty box.
const showToc = computed(() =>
  (appConfig.table_of_contents === true || props.doc?.table_of_contents === true)
  && props.doc?.notoc !== true,
)

// UContentSurround reads positions [prev, next] and renders an empty slot when either is
// null, so the nulls are kept (not filtered) to preserve left/right alignment. Posts are
// mapped to the fields the component renders, since a PageCollectionItem is not a
// ContentSurroundLink.
const { prev, next } = await useContentSurround({ doc: props.doc })
const toLink = (post: PageCollectionItem | null): ContentSurroundLink | null =>
  post ? { path: post.path, title: post.title ?? '', description: post.description } as ContentSurroundLink : null
const surround = computed(() => [toLink(prev.value), toLink(next.value)] as ContentSurroundLink[])

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
