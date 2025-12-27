import { mkdir, writeFile, access } from 'fs/promises'
import { join } from 'path'
import { generateSlug } from '../utils/slug'
import { getDefaultAuthor, validateAuthor } from '../utils/config'
import process from 'process'

interface NewPostOptions {
  description: string
  author?: string
  tags: string
  categories: string
  draft: boolean
  published: boolean
  cover: string
  date?: string
  comments: boolean
  flat: boolean
  interactive: boolean
}

export async function newPost(title: string, options: NewPostOptions) {
  try {
    // Generate slug
    const slug = generateSlug(title)

    // Parse date
    const postDate = options.date ? new Date(options.date) : new Date()
    const year = postDate.getFullYear()
    const month = String(postDate.getMonth() + 1).padStart(2, '0')
    const day = String(postDate.getDate()).padStart(2, '0')
    const dateStr = postDate.toISOString().split('T')[0]

    // Determine paths
    let contentPath: string
    let publicPath: string
    let coverPath: string

    if (options.flat) {
      contentPath = join(process.cwd(), 'content', `${slug}.md`)
      publicPath = join(process.cwd(), 'public', slug)
      coverPath = `/${slug}/cover.jpg`
    } else {
      contentPath = join(process.cwd(), 'content', String(year), month, day, `${slug}.md`)
      publicPath = join(process.cwd(), 'public', String(year), month, day, slug)
      coverPath = `/${year}/${month}/${day}/${slug}/cover.jpg`
    }

    // Check if file already exists
    try {
      await access(contentPath)
      console.error(`Error: Post already exists at ${contentPath}`)
      process.exit(1)
    } catch {
      // File doesn't exist, good to continue
    }

    // Get or validate author
    let author = options.author
    if (!author) {
      author = await getDefaultAuthor()
      if (!author) {
        console.error('Error: No default author found in app.config.ts')
        console.error('Please specify an author with --author <username>')
        process.exit(1)
      }
    } else {
      const isValid = await validateAuthor(author)
      if (!isValid) {
        console.warn(`Warning: Author "${author}" not found in app.config.ts`)
        console.warn('Make sure to add this author to your configuration')
      }
    }

    // Parse tags and categories
    const tags = options.tags ? options.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    const categories = options.categories ? options.categories.split(',').map(c => c.trim()).filter(Boolean) : []

    // Determine draft status
    const isDraft = options.published ? false : options.draft

    // Build frontmatter
    const frontmatter = `---
title: "${title}"
description: "${options.description}"
date: ${dateStr}
cover: "${options.cover || coverPath}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
categories: [${categories.map(c => `"${c}"`).join(', ')}]
author: "${author}"
draft: ${isDraft}${!options.comments ? '\nnocomments: true' : ''}
---

# ${title}

Start writing your content here...
`

    // Create directories
    await mkdir(join(contentPath, '..'), { recursive: true })
    await mkdir(publicPath, { recursive: true })

    // Write file
    await writeFile(contentPath, frontmatter, 'utf-8')

    // Success message
    console.log('✅ Post created successfully!')
    console.log('')
    console.log(`📄 Content: ${contentPath}`)
    console.log(`🖼️  Images:  ${publicPath}`)
    console.log('')
    console.log(`Status: ${isDraft ? '📝 Draft' : '✨ Published'}`)
    console.log(`Author: ${author}`)
    if (tags.length > 0) {
      console.log(`Tags: ${tags.join(', ')}`)
    }
    if (categories.length > 0) {
      console.log(`Categories: ${categories.join(', ')}`)
    }

  } catch (error) {
    console.error('Error creating post:', error)
    process.exit(1)
  }
}
