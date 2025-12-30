import type { PageCollectionItem, ContentNavigationItem } from '@nuxt/content'

export interface ContentSurroundOptions {
  /**
   * The current article document (takes precedence over path)
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
   * Previous article (null if current is first)
   */
  prev: Ref<ContentNavigationItem | null>
  /**
   * Next article (null if current is last)
   */
  next: Ref<ContentNavigationItem | null>
}

/**
 * Composable to fetch previous and next articles relative to the current article
 * Uses queryCollectionItemSurroundings internally with visibility filters
 *
 * @example
 * ```typescript
 * // Using current route path
 * const { prev, next } = await useContentSurround()
 *
 * // Using a document
 * const { prev, next } = await useContentSurround({ doc: article })
 *
 * // With custom fields
 * const { prev, next } = await useContentSurround({
 *   fields: ['path', 'title', 'cover']
 * })
 * ```
 *
 * @param options - Configuration options for filtering and field selection
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

  // Fetch surrounding items using native Nuxt Content utility
  const { data: surroundings } = await useAsyncData(cacheKey, async () => {
    let query = queryCollectionItemSurroundings('page', doc.path, {
      before: 1,
      after: 1,
    })

    // Apply prefix filter if specified
    if (prefix) {
      query = query.where('path', 'LIKE', `${prefix}/%`)
    }

    // Visibility filters (same as useContentListing)
    query = query
      .orWhere(q => q.where('listed', '=', true).where('listed', 'IS NULL'))
      .orWhere(q => q.where('hidden', '=', false).where('hidden', 'IS NULL'))
      .orWhere(q => q.where('draft', '=', false).where('draft', 'IS NULL'))

    return await query
  })

  // Extract prev and next from surroundings array [prev, next]
  const prev = computed(() => surroundings.value?.[0] || null)
  const next = computed(() => surroundings.value?.[1] || null)

  return {
    prev,
    next
  }
}
