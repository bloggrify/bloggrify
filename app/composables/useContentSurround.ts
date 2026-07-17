import type { PageCollectionItem } from '@nuxt/content'

export interface ContentSurroundOptions {
  /**
   * The current article document
   */
  doc: PageCollectionItem
  /**
   * Filter by path prefix (e.g., '/blog')
   */
  prefix?: string
  /**
   * Custom key for useAsyncData caching
   */
  key?: string
}

export interface ContentSurroundResult {
  /**
   * Previous (older) article, null if the current one is the oldest
   */
  prev: Ref<PageCollectionItem | null>
  /**
   * Next (newer) article, null if the current one is the newest
   */
  next: Ref<PageCollectionItem | null>
}

/**
 * Composable to fetch the previous and next articles relative to the current one,
 * ordered by publication date. `prev` is the older post, `next` the newer one.
 *
 * It deliberately does not use `queryCollectionItemSurroundings`: that helper walks the
 * navigation tree, which is sorted by file path (`stem`). On a blog that yields
 * alphabetical neighbours instead of chronological ones. Here we reuse the same
 * date-ordered, visibility-filtered query as the listing, then pick the adjacent posts.
 *
 * @example
 * ```typescript
 * const { prev, next } = await useContentSurround({ doc: article })
 * ```
 *
 * @param options - Configuration options for filtering
 * @returns Previous and next articles
 */
export const useContentSurround = async (
  options: ContentSurroundOptions
): Promise<ContentSurroundResult> => {

  const {
    doc,
    prefix,
    key
  } = options

  // Build unique cache key
  const cacheKey = key || [
    'content-surround',
    prefix && `prefix-${prefix}`,
    `path-${doc.path.replace(/\//g, '-')}`,
  ].filter(Boolean).join('-')

  // Fetch every published post, newest first, using the same filters as useContentListing.
  const { data: posts } = await useAsyncData(cacheKey, () => {
    let query = queryCollection('page')

    // Apply prefix filter if specified
    if (prefix) {
      query = query.where('path', 'LIKE', `${prefix}/%`)
    }

    // Visibility filters (same as useContentListing)
    query = query
      .orWhere(q => q.where('listed', '=', true).where('listed', 'IS NULL'))
      .orWhere(q => q.where('draft', '=', false).where('draft', 'IS NULL'))

    return query.order('date', 'DESC').all()
  })

  // The list runs newest to oldest, so the older post ("previous") sits one index later
  // and the newer post ("next") one index earlier. A missing current post yields nulls.
  const index = computed(() => posts.value?.findIndex(p => p.path === doc.path) ?? -1)
  const prev = computed(() => index.value < 0 ? null : (posts.value?.[index.value + 1] ?? null))
  const next = computed(() => index.value <= 0 ? null : (posts.value?.[index.value - 1] ?? null))

  return {
    prev,
    next
  }
}
