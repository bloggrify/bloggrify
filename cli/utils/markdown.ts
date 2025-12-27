import { readFile, readdir, stat } from 'fs/promises'
import { join } from 'path'
import process from 'process'

export interface PostMetadata {
  title?: string
  description?: string
  date?: string
  author?: string
  draft?: boolean
  cover?: string
  listed?: boolean
  hidden?: boolean
  tags?: string[]
  categories?: string[]
  filePath: string
}

/**
 * Parse frontmatter from markdown content
 */
export function parseFrontmatter(content: string): Record<string, any> {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return {}
  }

  const frontmatter: Record<string, any> = {}
  const lines = match[1].split('\n')

  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.substring(0, colonIndex).trim()
    let value = line.substring(colonIndex + 1).trim()

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1)
      if (arrayContent.trim() === '') {
        frontmatter[key] = []
      } else {
        frontmatter[key] = arrayContent
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''))
      }
    }
    // Parse booleans
    else if (value === 'true' || value === 'false') {
      frontmatter[key] = value === 'true'
    }
    // Regular string
    else {
      frontmatter[key] = value
    }
  }

  return frontmatter
}

/**
 * Recursively find all markdown files in a directory
 */
async function findMarkdownFiles(dir: string, files: string[] = []): Promise<string[]> {
  try {
    const entries = await readdir(dir)

    for (const entry of entries) {
      const fullPath = join(dir, entry)
      const stats = await stat(fullPath)

      if (stats.isDirectory()) {
        await findMarkdownFiles(fullPath, files)
      } else if (entry.endsWith('.md')) {
        files.push(fullPath)
      }
    }
  } catch {
    // Directory doesn't exist or no access
  }

  return files
}

/**
 * Get all posts from the content directory
 */
export async function getAllPosts(): Promise<PostMetadata[]> {
  const contentDir = join(process.cwd(), 'content')
  const markdownFiles = await findMarkdownFiles(contentDir)

  const posts: PostMetadata[] = []

  for (const filePath of markdownFiles) {
    try {
      const content = await readFile(filePath, 'utf-8')
      const frontmatter = parseFrontmatter(content)

      posts.push({
        title: frontmatter.title,
        description: frontmatter.description,
        date: frontmatter.date,
        author: frontmatter.author,
        draft: frontmatter.draft ?? false,
        listed: frontmatter.listed,
        hidden: frontmatter.hidden,
        tags: frontmatter.tags ?? [],
        categories: frontmatter.categories ?? [],
        filePath: filePath.replace(process.cwd(), '').replace(/\\/g, '/').slice(1)
      })
    } catch {
      // Skip files that can't be read
    }
  }

  return posts
}

/**
 * Get only draft posts
 */
export async function getDraftPosts(): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => post.draft === true)
}

/**
 * Get only published posts
 */
export async function getPublishedPosts(): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => post.draft === false)
}
