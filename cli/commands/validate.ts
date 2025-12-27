import { getAllPosts } from '../utils/markdown'
import { getAllAuthors } from '../utils/author'
import { access } from 'fs/promises'
import { join } from 'path'
import process from 'process'

interface ValidationIssue {
  file: string
  message: string
  type: 'error' | 'warning'
}

export async function validate() {
  try {
    console.log('🔍 Validating posts...\n')

    const posts = await getAllPosts()
    const authors = await getAllAuthors()
    const authorUsernames = authors.map(a => a.username)

    if (posts.length === 0) {
      console.log('📝 No posts found')
      return
    }

    const errors: ValidationIssue[] = []
    const warnings: ValidationIssue[] = []

    for (const post of posts) {
      const file = post.filePath

      // Check if this is a page (not a blog post)
      const isPage = post.listed === false || post.hidden === true

      // ============================================
      // ERRORS (Critical issues)
      // ============================================

      // Missing title
      if (!post.title || post.title.trim() === '') {
        errors.push({ file, message: 'Missing title', type: 'error' })
      }

      // Missing date (only required for blog posts, not pages)
      if (!isPage && !post.date) {
        errors.push({ file, message: 'Missing date', type: 'error' })
      } else if (post.date) {
        // Invalid date format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        if (!dateRegex.test(post.date)) {
          errors.push({ file, message: `Invalid date format: '${post.date}' (expected YYYY-MM-DD)`, type: 'error' })
        } else {
          // Check if date is valid (not 2024-99-99)
          const dateObj = new Date(post.date)
          if (isNaN(dateObj.getTime())) {
            errors.push({ file, message: `Invalid date: '${post.date}'`, type: 'error' })
          }
        }
      }

      // Author does not exist in app.config.ts
      if (post.author && !authorUsernames.includes(post.author)) {
        errors.push({ file, message: `Author '${post.author}' not found in app.config.ts`, type: 'error' })
      }

      // ============================================
      // WARNINGS (Recommended best practices)
      // ============================================

      // Missing description (SEO) - always recommended
      if (!post.description || post.description.trim() === '') {
        warnings.push({ file, message: 'Missing description (recommended for SEO)', type: 'warning' })
      } else {
        // Description too short
        if (post.description.length < 50) {
          warnings.push({ file, message: `Description too short (${post.description.length} chars, recommended min 50)`, type: 'warning' })
        }
        // Description too long
        if (post.description.length > 160) {
          warnings.push({ file, message: `Description too long (${post.description.length} chars, recommended max 160)`, type: 'warning' })
        }
      }

      // Missing author (only for blog posts)
      if (!isPage && (!post.author || post.author.trim() === '')) {
        warnings.push({ file, message: 'Missing author', type: 'warning' })
      }

      // No tags (only for blog posts)
      if (!isPage && (!post.tags || post.tags.length === 0)) {
        warnings.push({ file, message: 'No tags (recommended for discoverability)', type: 'warning' })
      }

      // Title too long (SEO)
      if (post.title && post.title.length > 60) {
        warnings.push({ file, message: `Title too long (${post.title.length} chars, recommended max 60 for SEO)`, type: 'warning' })
      }

      // Cover image check
      if (post.cover && post.cover.trim() !== '') {
        const coverPath = join(process.cwd(), 'public', post.cover)
        try {
          await access(coverPath)
        } catch {
          warnings.push({ file, message: `Cover image not found: ${post.cover}`, type: 'warning' })
        }
      } else {
        warnings.push({ file, message: 'Missing cover image (recommended)', type: 'warning' })
      }
    }

    // ============================================
    // Display Results
    // ============================================

    let hasIssues = false

    // Display ERRORS
    if (errors.length > 0) {
      hasIssues = true
      console.log(`❌ ERRORS (${errors.length}):\n`)

      // Group by file
      const errorsByFile = new Map<string, string[]>()
      for (const error of errors) {
        if (!errorsByFile.has(error.file)) {
          errorsByFile.set(error.file, [])
        }
        errorsByFile.get(error.file)!.push(error.message)
      }

      for (const [file, messages] of errorsByFile) {
        console.log(`📄 ${file}`)
        messages.forEach(msg => console.log(`   - ${msg}`))
        console.log('')
      }
    }

    // Display WARNINGS
    if (warnings.length > 0) {
      hasIssues = true
      console.log(`⚠️  WARNINGS (${warnings.length}):\n`)

      // Group by file
      const warningsByFile = new Map<string, string[]>()
      for (const warning of warnings) {
        if (!warningsByFile.has(warning.file)) {
          warningsByFile.set(warning.file, [])
        }
        warningsByFile.get(warning.file)!.push(warning.message)
      }

      for (const [file, messages] of warningsByFile) {
        console.log(`📄 ${file}`)
        messages.forEach(msg => console.log(`   - ${msg}`))
        console.log('')
      }
    }

    // Summary
    const postsWithErrors = new Set(errors.map(e => e.file)).size
    const postsWithWarnings = new Set(warnings.map(w => w.file)).size
    const validPosts = posts.length - postsWithErrors - postsWithWarnings

    if (!hasIssues) {
      console.log(`✅ All ${posts.length} post${posts.length > 1 ? 's' : ''} passed validation!\n`)
    } else {
      if (validPosts > 0) {
        console.log(`✅ ${validPosts} post${validPosts > 1 ? 's' : ''} passed validation\n`)
      }

      console.log('Summary:')
      if (errors.length > 0) {
        console.log(`   ❌ ${postsWithErrors} post${postsWithErrors > 1 ? 's' : ''} with errors`)
      }
      if (warnings.length > 0) {
        console.log(`   ⚠️  ${postsWithWarnings} post${postsWithWarnings > 1 ? 's' : ''} with warnings`)
      }
      if (validPosts > 0) {
        console.log(`   ✅ ${validPosts} post${validPosts > 1 ? 's' : ''} valid`)
      }
      console.log('')
    }

    // Exit with error code if errors found
    if (errors.length > 0) {
      process.exit(1)
    }

  } catch (error) {
    console.error('Error validating posts:', error)
    process.exit(1)
  }
}
