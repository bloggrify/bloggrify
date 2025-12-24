export const usePagination = () => {
  const config = useAppConfig()
  const route = useRoute()

  const itemsPerPage = computed(() =>
    config.pagination?.per_page || 6
  )

  const currentPage = computed(() => {
    const match = route.path.match(/\/page\/(\d+)$/)
    if (!match) {
      return 1
    }
    const firstMatch = match[1]
    if (firstMatch) {
      return match ? Number.parseInt(firstMatch) : 1
    } else {
      return 1
    }

  })

  const createPath = (page: number): string => {
    const baseUrl = route.path.replace(/\/page\/\d+$/, '')
    return `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}page/${page}`
  }

  return {
    itemsPerPage,
    currentPage,
    createPath
  }
}
