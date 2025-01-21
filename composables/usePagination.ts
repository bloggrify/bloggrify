export const usePagination = () => {
    const config = useAppConfig()
    const route = useRoute()

    // Get the number of items per page from the config
    const itemsPerPage = computed(() =>
        config.pagination?.per_page || 6
    )

    // Extract the current page from the route
    const currentPage = computed(() => {
        const match = route.path.match(/\/page\/(\d+)$/)
        return match ? Number.parseInt(match[1]) : 1
    })

    // Create a path for a given page number
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
