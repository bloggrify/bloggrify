import { access } from 'fs/promises'
import { join } from 'path'
import process from 'process'

export interface MarkdownImage {
  alt: string
  src: string
  line?: number
}

export interface MarkdownLink {
  text: string
  url: string
  line?: number
}

/**
 * Extract images from markdown content
 */
export function extractImages(content: string): MarkdownImage[] {
  const images: MarkdownImage[] = []

  // Match ![alt](src) and ![alt](src "title")
  const imageRegex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g

  let match
  while ((match = imageRegex.exec(content)) !== null) {
    images.push({
      alt: match[1],
      src: match[2]
    })
  }

  return images
}

/**
 * Extract links from markdown content
 */
export function extractLinks(content: string): MarkdownLink[] {
  const links: MarkdownLink[] = []

  // Match [text](url) and [text](url "title") but not ![alt](src) (images)
  const linkRegex = /(?<!!)\[([^\]]+)\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g

  let match
  while ((match = linkRegex.exec(content)) !== null) {
    links.push({
      text: match[1],
      url: match[2]
    })
  }

  return links
}

/**
 * Check if an image file exists in public directory
 */
export async function imageExists(imagePath: string): Promise<boolean> {
  // Handle relative paths (./image.jpg, ../image.jpg, image.jpg)
  // and absolute paths (/images/cover.jpg)

  let fullPath: string

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // External URL, always exists (we don't check external images)
    return true
  }

  if (imagePath.startsWith('/')) {
    // Absolute path from public root
    fullPath = join(process.cwd(), 'public', imagePath)
  } else {
    // Relative path - check in public directory
    fullPath = join(process.cwd(), 'public', imagePath)
  }

  try {
    await access(fullPath)
    return true
  } catch {
    return false
  }
}

/**
 * Check if a URL is accessible (for external links)
 */
export async function checkUrl(url: string): Promise<{ ok: boolean; status?: number; error?: string }> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    })

    return {
      ok: response.ok,
      status: response.status
    }
  } catch (error: unknown) {
    return {
      ok: false,
      error: error.message || 'Unknown error'
    }
  }
}
