import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import process from 'process'
import { findPosts } from '../utils/search'

export async function publish(slugOrPath: string) {
  try {
    const matches = await findPosts(slugOrPath)

    // No posts found
    if (matches.length === 0) {
      console.error(`❌ No post found matching: "${slugOrPath}"`)
      process.exit(1)
    }

    // Multiple posts found - show list
    if (matches.length > 1) {
      console.log(`⚠️  Multiple posts found matching "${slugOrPath}":\n`)

      matches.forEach((post, index) => {
        console.log(`${index + 1}. ${post.filePath}`)
        console.log(`   📄 ${post.title || 'Untitled'}`)
        console.log(`   📅 ${post.date || 'No date'}`)
        console.log(`   ${post.draft ? '📝 Draft' : '✨ Published'}`)
        console.log('')
      })

      console.log('Please specify the path more precisely:')
      matches.forEach(post => {
        const pathWithoutContent = post.filePath.replace(/^content\//, '').replace(/\.md$/, '')
        console.log(`  bloggrify publish ${pathWithoutContent}`)
      })

      process.exit(1)
    }

    // Single post found
    const post = matches[0]
    const fullPath = join(process.cwd(), post.filePath)

    // Check if already published
    if (post.draft === false) {
      console.log(`ℹ️  Post is already published: ${post.title || 'Untitled'}`)
      console.log(`📄 ${post.filePath}`)
      return
    }

    // Read file content
    const content = await readFile(fullPath, 'utf-8')

    // Replace draft: true with draft: false
    const updatedContent = content.replace(
      /^draft:\s*true/m,
      'draft: false'
    )

    // Write back to file
    await writeFile(fullPath, updatedContent, 'utf-8')

    // Success message
    console.log('✅ Post published successfully!\n')
    console.log(`📄 ${post.title || 'Untitled'}`)
    console.log(`📁 ${post.filePath}`)
    console.log(`📅 ${post.date || 'No date'}`)
    if (post.author) {
      console.log(`✍️  ${post.author}`)
    }

  } catch (error) {
    console.error('Error publishing post:', error)
    process.exit(1)
  }
}
