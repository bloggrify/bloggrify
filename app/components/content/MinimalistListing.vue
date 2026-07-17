<template>
  <section class="w-full">
    <h2
      v-if="title"
      class="text-2xl sm:text-3xl font-semibold mb-8"
    >
      {{ title }}
    </h2>

    <p
      v-if="docs && docs.length === 0"
      class="text-muted"
    >
      No posts yet.
    </p>

    <UBlogPosts
      v-else
      orientation="vertical"
      class="gap-6 sm:gap-8"
    >
      <UBlogPost
        v-for="(article, index) in docs"
        :key="article.id"
        v-reveal="(index % 4) * 80"
        :to="article.path"
        :title="article.title"
        :description="article.description"
        :image="coverOf(article)"
        :orientation="article.cover ? 'horizontal' : 'vertical'"
        variant="naked"
        :ui="{
          root: 'group items-start ring-0 hover:ring-0',
          header: article.cover ? 'sm:w-2/5 overflow-hidden rounded-lg' : '',
          image: 'group-hover:scale-105 transition-transform duration-500',
          body: 'px-0! sm:px-0!',
          title: 'text-xl font-semibold group-hover:text-primary transition-colors',
          description: 'line-clamp-2',
        }"
      >
        <template #footer>
          <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
            <time
              v-if="article.date"
              :datetime="new Date(article.date).toISOString()"
            >
              {{ formatDate(article.date) }}
            </time>
            <span v-if="article.date && article.readingTime?.text">·</span>
            <span v-if="article.readingTime?.text">
              {{ article.readingTime.text }}
            </span>
            <span
              v-if="article.tags?.length"
              class="flex flex-wrap gap-1"
            >
              <UBadge
                v-for="tagName in article.tags"
                :key="tagName"
                :label="tagName"
                color="neutral"
                variant="soft"
                size="sm"
              />
            </span>
          </div>
        </template>
      </UBlogPost>
    </UBlogPosts>

    <div
      v-if="paginated && totalItems > perPage"
      class="flex justify-center mt-12"
    >
      <UPagination
        :total="totalItems"
        :items-per-page="perPage"
        :page="currentPage"
        :to="(page: number) => createPath(page)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PageCollectionItem } from '@nuxt/content'

const props = withDefaults(defineProps<{
  category?: string
  tag?: string
  author?: string
  title?: string
  prefix?: string
  /** @deprecated kept for backward compatibility; listings now always use the card list. */
  format?: string
  paginated?: boolean
  limit?: number
}>(), {
  format: 'card',
  paginated: true,
  limit: 6,
  category: undefined,
  title: undefined,
  tag: undefined,
  author: undefined,
  prefix: undefined,
})

// Pagination state is route-driven (`/page/N`). For paginated listings the page size is
// the site's configured `per_page`; for a capped, non-paginated listing (e.g. the home
// "latest posts") it is the `limit` prop. Using one value for both the query and the
// pagination control keeps the page count and the links in sync.
const { currentPage, itemsPerPage, createPath } = usePagination()
const perPage = computed(() => (props.paginated ? itemsPerPage.value : props.limit))

const { docs, totalItems } = await useContentListing({
  category: props.category,
  tag: props.tag,
  author: props.author,
  prefix: props.prefix,
  paginated: props.paginated,
  itemsPerPage: perPage.value,
})

/**
 * Maps a post's optional `cover` to a `UBlogPost` image. Returns `undefined` when the
 * post has no cover so the card degrades to a clean text-only row (the common case).
 */
function coverOf(article: PageCollectionItem) {
  return article.cover ? { src: article.cover, alt: article.title } : undefined
}
</script>
