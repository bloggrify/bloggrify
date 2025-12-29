import type { PageCollectionItem } from '@nuxt/content'

export interface ContentListingOptions {
  /**
   * Filter by path prefix
   */
  prefix?: string
  /**
   * Filter by category
   */
  category?: string
  /**
   * Filter by tag
   */
  tag?: string
  /**
   * Filter by author
   */
  author?: string
  /**
   * Enable pagination
   * @default true
   */
  paginated?: boolean
  /**
   * Number of items per page (overrides config)
   */
  itemsPerPage?: number
  /**
   * Current page number (overrides route-based pagination)
   */
  currentPage?: number
  /**
   * Custom key for useAsyncData caching
   */
  key?: string
}

export interface ContentListingResult<T = PageCollectionItem> {
  /**
   * Array of content documents
   */
  docs: Ref<T[] | null | undefined>
  /**
   * Total number of pages (undefined if not paginated)
   */
  totalPages?: number
  /**
   * Total number of items
   */
  totalItems: number
  /**
   * Current page number (undefined if not paginated)
   */
  currentPage?: number
}

/**
 * Composable to fetch content listings with optional pagination
 * @param options - Configuration options for filtering and pagination
 * @returns Content documents and pagination metadata
 */
export const useContentListing = async <T = PageCollectionItem>(
  options: ContentListingOptions = {}
): Promise<ContentListingResult<T>> => {
  const {
    prefix,
    category,
    tag,
    author,
    paginated = true,
    itemsPerPage: customItemsPerPage,
    currentPage: customCurrentPage,
    key
  } = options

  // Get pagination info from composable or custom values
  const { itemsPerPage: defaultItemsPerPage, currentPage: routeCurrentPage } = paginated
    ? usePagination()
    : { itemsPerPage: ref(0), currentPage: ref(0) }

  const itemsPerPage = customItemsPerPage || (paginated ? defaultItemsPerPage.value : 0)
  const currentPage = customCurrentPage || (paginated ? routeCurrentPage.value : 1)

  // Build unique cache key
  const cacheKey = key || [
    'content-listing',
    prefix && `prefix-${prefix}`,
    category && `cat-${category}`,
    tag && `tag-${tag}`,
    author && `author-${author}`,
    paginated && `page-${currentPage}`
  ].filter(Boolean).join('-')

  /**
   * Helper function to build the base query with all filters
   */
  const buildQuery = () => {
    let query = queryCollection('page')

    if (prefix) {
      query = query.where('path', 'LIKE', `${prefix}/%`)
    }

    if (category) {
      query = query.where('categories', 'IN', [category])
    }

    if (tag) {
      query = query.where('tags', 'IN', [tag])
    }

    if (author) {
      query = query.where('author', '=', author)
    }

    // Visibility filters
    query = query
      .orWhere(q => q.where('listed', '=', true).where('listed', 'IS NULL'))
      .orWhere(q => q.where('hidden', '=', false).where('hidden', 'IS NULL'))
      .orWhere(q => q.where('draft', '=', false).where('draft', 'IS NULL'))

    return query
  }

  // Fetch documents
  const { data: docs } = await useAsyncData(cacheKey, () => {
    let query = buildQuery().order('date', 'DESC')

    // Apply limit if itemsPerPage is specified
    if (itemsPerPage > 0) {
      // Apply pagination skip only if paginated mode is enabled
      if (paginated) {
        query = query.skip((currentPage - 1) * itemsPerPage)
      }
      query = query.limit(itemsPerPage)
    }

    return query.all() as Promise<T[]>
  })

  // Count total items
  const totalItems = await buildQuery().count()

  // Calculate total pages if paginated
  const totalPages = paginated && itemsPerPage > 0
    ? Math.ceil(totalItems / itemsPerPage)
    : undefined

  return {
    docs,
    totalPages,
    totalItems,
    currentPage: paginated ? currentPage : undefined
  }
}
