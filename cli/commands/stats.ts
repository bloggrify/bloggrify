import { getAllPosts } from '../utils/markdown'

export async function stats() {
  try {
    const allPosts = await getAllPosts()

    if (allPosts.length === 0) {
      console.log('📊 No posts found')
      return
    }

    // 1. Overview
    const published = allPosts.filter(p => p.draft === false)
    const drafts = allPosts.filter(p => p.draft === true)

    console.log('📊 Blog Statistics\n')
    console.log('📝 Posts:')
    console.log(`   Total: ${allPosts.length} post${allPosts.length > 1 ? 's' : ''}`)
    console.log(`   ✨ Published: ${published.length}`)
    console.log(`   📝 Drafts: ${drafts.length}`)
    console.log('')

    // 2. Timeline (by year)
    const postsByYear = new Map<string, number>()
    let lastPublishedPost: { title?: string; date?: string } | null = null
    let lastPublishedDate: Date | null = null

    for (const post of allPosts) {
      if (post.date) {
        const year = post.date.substring(0, 4)
        postsByYear.set(year, (postsByYear.get(year) || 0) + 1)

        if (post.draft === false) {
          const postDate = new Date(post.date)
          if (!lastPublishedDate || postDate > lastPublishedDate) {
            lastPublishedDate = postDate
            lastPublishedPost = post
          }
        }
      }
    }

    if (postsByYear.size > 0) {
      console.log('📅 Timeline:')
      const sortedYears = Array.from(postsByYear.entries()).sort((a, b) => b[0].localeCompare(a[0]))
      for (const [year, count] of sortedYears) {
        console.log(`   ${year}: ${count} post${count > 1 ? 's' : ''}`)
      }
      if (lastPublishedPost) {
        console.log(`   Last published: ${lastPublishedPost.date} (${lastPublishedPost.title || 'Untitled'})`)
      }
      console.log('')
    }

    // 3. Tags
    const tagCount = new Map<string, number>()

    for (const post of allPosts) {
      if (post.tags && post.tags.length > 0) {
        for (const tag of post.tags) {
          tagCount.set(tag, (tagCount.get(tag) || 0) + 1)
        }
      }
    }

    if (tagCount.size > 0) {
      console.log('🏷️  Most used tags:')
      const sortedTags = Array.from(tagCount.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10) // Top 10

      sortedTags.forEach(([tag, count], index) => {
        console.log(`   ${index + 1}. ${tag} (${count} post${count > 1 ? 's' : ''})`)
      })
      console.log('')
    }

    // 4. Content quality issues
    const issues = []

    const noDescription = allPosts.filter(p => !p.description || p.description.trim() === '')
    if (noDescription.length > 0) {
      issues.push(`Posts without description: ${noDescription.length}`)
    }

    const noCover = allPosts.filter(p => !p.cover || p.cover.trim() === '')
    if (noCover.length > 0) {
      issues.push(`Posts without cover: ${noCover.length}`)
    }

    const noTags = allPosts.filter(p => !p.tags || p.tags.length === 0)
    if (noTags.length > 0) {
      issues.push(`Posts without tags: ${noTags.length}`)
    }

    const noAuthor = allPosts.filter(p => !p.author || p.author.trim() === '')
    if (noAuthor.length > 0) {
      issues.push(`Posts without author: ${noAuthor.length}`)
    }

    if (issues.length > 0) {
      console.log('⚠️  Content issues:')
      issues.forEach(issue => console.log(`   ${issue}`))
    } else {
      console.log('✅ All posts have complete metadata!')
    }

  } catch (error) {
    console.error('Error calculating stats:', error)
    process.exit(1)
  }
}
