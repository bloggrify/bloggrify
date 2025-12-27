import { getAllPosts } from './markdown'
import type { PostMetadata } from './markdown'

/**
 * Find posts matching a slug or partial path
 */
export async function findPosts(slugOrPath: string): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts()

  // Normalize input
  const normalizedInput = slugOrPath
    .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
    .replace(/\\/g, '/') // Normalize backslashes to forward slashes

  // If user provides exact path with content/ or .md, try exact match first
  const hasContentPrefix = normalizedInput.startsWith('content/')
  const hasMdExtension = normalizedInput.endsWith('.md')

  // Create normalized search term (without content/ and .md)
  const searchTerm = normalizedInput
    .replace(/^content\//, '')
    .replace(/\.md$/, '')

  const matches: PostMetadata[] = []

  for (const post of allPosts) {
    // Normalize post path for comparison
    const normalizedPath = post.filePath
      .replace(/^content\//, '')
      .replace(/\.md$/, '')
      .replace(/\\/g, '/')

    // Extract just the slug (last part of the path)
    const slug = normalizedPath.split('/').pop() || ''

    // If user specified exact path (with content/ or .md), only match exact paths
    if (hasContentPrefix || hasMdExtension) {
      if (normalizedPath === searchTerm) {
        matches.push(post)
      }
    } else {
      // Otherwise, check for matches:
      // 1. Exact slug match
      // 2. Exact path match
      // 3. Path ends with search term (for partial paths like 2025/12/27/slug)
      if (slug === searchTerm ||
          normalizedPath === searchTerm ||
          normalizedPath.endsWith('/' + searchTerm)) {
        matches.push(post)
      }
    }
  }

  return matches
}

/**
 * Find a single post or throw error if ambiguous
 */
export async function findSinglePost(slugOrPath: string): Promise<PostMetadata | null> {
  const matches = await findPosts(slugOrPath)

  if (matches.length === 0) {
    return null
  }

  if (matches.length === 1) {
    return matches[0]
  }

  // Multiple matches - return null to signal ambiguity
  // The caller should handle showing the list
  return null
}
