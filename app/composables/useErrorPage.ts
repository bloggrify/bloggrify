import type { NuxtError } from '#app'

/**
 * Derives everything an error page renders from the raw error: the status code, a visitor-safe
 * title and description, the document title, and the action that leaves the error state.
 *
 * Shared by the default error layout (`layouts/error-default.vue`) and every theme's own error
 * layout (`layouts/themes/{theme}/error.vue`), so a theme only styles the page and never
 * re-derives this. The raw `error.message` / `error.stack` are deliberately *not* returned for
 * display: they can carry absolute file paths and internals. Only `message` is exposed, for a
 * dev-only detail line, never to be shown in production.
 */
export const useErrorPage = (error: MaybeRefOrGetter<NuxtError | undefined>) => {
  const statusCode = computed(() => toValue(error)?.statusCode || 500)
  const isNotFound = computed(() => statusCode.value === 404)

  const title = computed(() => (isNotFound.value ? 'Page not found' : 'Something went wrong'))
  const description = computed(() =>
    isNotFound.value
      ? 'The page you are looking for does not exist or has moved.'
      : 'An unexpected error occurred. Please try again later.',
  )

  useHead({
    title: () => `${statusCode.value} - ${title.value}`,
  })

  // `clearError` leaves the error state; without it a client-side navigation keeps the error
  // page mounted. The redirect drops the visitor back on a working route.
  const handleError = () => clearError({ redirect: '/' })

  return {
    statusCode,
    isNotFound,
    title,
    description,
    message: computed(() => toValue(error)?.message),
    isDev: import.meta.dev,
    handleError,
  }
}
