import type { PageCollectionItem } from '@nuxt/content'
import { hasProtocol, isScriptProtocol, joinURL, withHttps } from 'ufo'

/** The frontmatter keys that turn a page into a redirection. */
type RedirectableDoc = Pick<PageCollectionItem, 'path'> & {
  redirect_to_domain?: string
  redirect_to_full_url?: string
}

/**
 * Resolves the redirection declared in a page's frontmatter, and emits everything a browser
 * and a crawler need to follow it.
 *
 * Two frontmatter keys declare one:
 * - `redirect_to_full_url`: the complete destination URL.
 * - `redirect_to_domain`: another domain, keeping the current path.
 *
 * Bloggrify only deploys statically, so there is no server to answer a real HTTP 301. The
 * closest portable equivalent is an instant `<meta http-equiv="refresh">`, which Google
 * documents as a permanent redirect and which works with JavaScript disabled. `location.replace()`
 * on mount covers client-side navigation, where the meta tag is inserted into an already
 * parsed document, and it replaces rather than pushes so the Back button does not land the
 * visitor on the redirecting page again.
 *
 * The page is also pointed away from itself: the canonical goes to the destination and the
 * page asks not to be indexed (`follow` still passes the link on). It stays out of the sitemap
 * through the collection filter in `content.config.ts`.
 *
 * @param doc - The current content document, or nothing when there is none.
 * @returns The absolute destination URL, or `undefined` when the page is not a redirection.
 *
 * @example
 * ```typescript
 * const redirectTarget = useContentRedirect(doc.value)
 * ```
 */
export const useContentRedirect = (doc: RedirectableDoc | null | undefined): string | undefined => {
  const target = resolveRedirectTarget(doc)

  if (!target) {
    return undefined
  }

  useHead({
    meta: [
      {
        key: 'bloggrify-redirect',
        'http-equiv': 'refresh',
        content: `0; url=${target}`,
      },
    ],
    link: [
      {
        key: 'bloggrify-redirect-canonical',
        rel: 'canonical',
        href: target,
      },
    ],
  })

  // A redirecting page holds no content of its own, so indexing it would only compete with
  // the destination. `follow` keeps the link to the destination worth something.
  useSeoMeta({ robots: 'noindex, follow' })

  onMounted(() => {
    window.location.replace(target)
  })

  return target
}

/**
 * Turns the two frontmatter keys into a single absolute URL, or `undefined` when the page
 * declares no redirection or declares an unusable one.
 */
function resolveRedirectTarget (doc: RedirectableDoc | null | undefined): string | undefined {
  if (!doc) {
    return undefined
  }

  const fullUrl = doc.redirect_to_full_url?.trim()
  const domain = doc.redirect_to_domain?.trim()

  if (fullUrl && domain) {
    _warn(
      `\`${doc.path}\` declares both \`redirect_to_full_url\` and \`redirect_to_domain\`. ` +
      'Only one destination can be used, keeping `redirect_to_full_url`.'
    )
  }

  if (fullUrl) {
    // `javascript:` and friends would turn a frontmatter value into arbitrary code at
    // `location.replace()` time, which matters as soon as a blog takes content by pull request.
    if (isScriptProtocol(fullUrl)) {
      _warn(
        `\`${doc.path}\` has a \`redirect_to_full_url\` with a script protocol: '${fullUrl}'. ` +
        'Ignoring the redirection.'
      )
      return undefined
    }
    // An absolute URL is the documented form, a site-relative path is the obvious neighbouring
    // case (moving a post inside the same blog), and both are safe destinations. Anything else
    // would resolve against the current page and land somewhere nobody intended.
    if (!hasProtocol(fullUrl, { acceptRelative: true }) && !fullUrl.startsWith('/')) {
      _warn(
        `\`${doc.path}\` has a \`redirect_to_full_url\` that is neither an absolute URL nor a ` +
        `path starting with '/': '${fullUrl}'. Ignoring the redirection.`
      )
      return undefined
    }
    return fullUrl
  }

  if (domain) {
    if (isScriptProtocol(domain)) {
      _warn(
        `\`${doc.path}\` has a \`redirect_to_domain\` with a script protocol: '${domain}'. ` +
        'Ignoring the redirection.'
      )
      return undefined
    }
    // A domain is commonly written bare (`example.com`), which would otherwise resolve as a
    // relative path against the current page. Assume https rather than silently redirecting
    // to a URL that does not exist.
    return joinURL(hasProtocol(domain) ? domain : withHttps(domain), doc.path)
  }

  return undefined
}

/**
 * Reports a malformed redirection. This runs during prerendering, so the message lands in the
 * build output where the author can act on it, and stays out of the production bundle's path.
 */
function _warn (message: string) {
  if (import.meta.dev || import.meta.prerender) {
    console.warn(`[bloggrify] ${message}`)
  }
}
