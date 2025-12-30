import type { PageCollectionItem } from '@nuxt/content'

export interface ContentRelatedOptions {
  /**
   * The current article document (takes precedence over path/tags)
   */
  doc?: PageCollectionItem
  /**
   * Path of the current article (to exclude from results, defaults to route.path if doc not provided)
   */
  path?: string
  /**
   * Tags to find related articles by (defaults to current article's tags)
   */
  tags?: string[]
  /**
   * Filter by path prefix (e.g., '/blog')
   */
  prefix?: string
  /**
   * Maximum number of related articles to return
   * @default 3
   */
  limit?: number
  /**
   * Minimum number of shared tags to be considered related
   * @default 1
   */
  minSharedTags?: number
  /**
   * Custom key for useAsyncData caching
   */
  key?: string
}

export interface RelatedArticle extends PageCollectionItem {
  /**
   * Number of tags shared with the current article
   */
  sharedTagCount: number
  /**
   * Array of shared tags
   */
  sharedTags: string[]
}

export interface ContentRelatedResult {
  /**
   * Array of related articles sorted by relevance
   */
  related: Ref<RelatedArticle[]>
  /**
   * Total number of articles found (before limit)
   */
  totalFound: number
}

/**
 * Composable to find related articles based on shared tags
 *
 * @example
 * ```typescript
 * // Find related articles using current article document
 * const { related } = await useContentRelated({ doc: article })
 *
 * // Find related articles for current route
 * const { related } = await useContentRelated({ limit: 3 })
 *
 * // Find related articles by specific tags
 * const { related } = await useContentRelated({
 *   tags: ['vue', 'nuxt'],
 *   limit: 5
 * })
 * ```
 *
 * @param options - Configuration options for filtering and similarity
 * @returns Related articles sorted by number of shared tags
 */
export const useContentRelated = async (
  options: ContentRelatedOptions = {}
): Promise<ContentRelatedResult> => {
  const route = useRoute()

  const {
    doc,
    path = doc?.path || route.path,
    tags: providedTags = doc?.tags,
    prefix,
    limit = 3,
    minSharedTags = 1,
    key
  } = options

  // Build cache key (with sorted tags for consistency)
  const tagsCacheKey = providedTags ? [...providedTags].sort().join('+') : 'from-current'
  const cacheKey = key || [
    'content-related',
    prefix && `prefix-${prefix}`,
    `path-${path.replace(/\//g, '-')}`,
    `tags-${tagsCacheKey}`,
    `limit-${limit}`
  ].filter(Boolean).join('-')

  /**
   * Helper function to build the base query with visibility filters
   */
  const buildQuery = () => {
    let query = queryCollection('page')

    if (prefix) {
      query = query.where('path', 'LIKE', `${prefix}/%`)
    }

    // Exclude current article
    query = query.where('path', '<>', path)

    // Visibility filters (same as useContentListing)
    query = query
      .orWhere(q => q.where('listed', '=', true).where('listed', 'IS NULL'))
      .orWhere(q => q.where('hidden', '=', false).where('hidden', 'IS NULL'))
      .orWhere(q => q.where('draft', '=', false).where('draft', 'IS NULL'))

    return query
  }

  // Fetch data with useAsyncData for caching
  const { data: relatedData } = await useAsyncData(cacheKey, async () => {
    // Get current article tags if not provided
    let currentTags = providedTags

    if (!currentTags) {
      const currentArticle = await queryCollection('page')
        .path(path)
        .select('tags')
        .first()

      currentTags = currentArticle?.tags || []
    }

    // Return empty if no tags
    if (!currentTags || currentTags.length === 0) {
      return {
        related: [],
        totalFound: 0
      }
    }

    // Step 1: Fetch lightweight candidates (only path, tags, date for scoring)
    const candidatesQuery = buildQuery().select('path', 'tags', 'date')
    const candidates = await candidatesQuery.all() as Array<{ path: string; tags?: string[]; date?: string }>

    // Step 2: Calculate tag similarity and sort
    const scoredPaths = candidates
      .map((article) => {
        const articleTags = article.tags || []
        const sharedTags = articleTags.filter((tag: string) => currentTags.includes(tag))

        return {
          path: article.path,
          date: article.date,
          sharedTagCount: sharedTags.length,
          sharedTags
        }
      })
      .filter(article => article.sharedTagCount >= minSharedTags)
      .sort((a, b) => {
        // Primary sort: shared tag count descending
        if (a.sharedTagCount !== b.sharedTagCount) {
          return b.sharedTagCount - a.sharedTagCount
        }
        // Secondary sort: date descending
        const dateA = new Date(a.date || 0).getTime()
        const dateB = new Date(b.date || 0).getTime()
        return dateB - dateA
      })

    const totalFound = scoredPaths.length

    // Step 3: Get top N paths
    const topPaths = scoredPaths.slice(0, limit)

    // Step 4: Fetch full articles for only the top N results
    if (topPaths.length === 0) {
      return {
        related: [],
        totalFound: 0
      }
    }

    const fullArticlesQuery = queryCollection('page')
      .where('path', 'IN', topPaths.map(p => p.path))

    const fullArticles = await fullArticlesQuery.all() as PageCollectionItem[]

    // Step 5: Merge scoring data with full articles and preserve sort order
    const limitedArticles: RelatedArticle[] = topPaths.map(scored => {
      const fullArticle = fullArticles.find(a => a.path === scored.path)!
      return {
        ...fullArticle,
        sharedTagCount: scored.sharedTagCount,
        sharedTags: scored.sharedTags
      } as RelatedArticle
    })

    return {
      related: limitedArticles,
      totalFound
    }
  })

  return {
    related: computed(() => relatedData.value?.related || []),
    totalFound: relatedData.value?.totalFound || 0
  }
}
