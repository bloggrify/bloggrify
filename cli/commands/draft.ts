import { getDraftPosts } from '../utils/markdown'
import process from 'process'

export async function draftList() {
  try {
    const drafts = await getDraftPosts()

    if (drafts.length === 0) {
      console.log('📝 No drafts found')
      return
    }

    console.log(`📝 Found ${drafts.length} draft${drafts.length > 1 ? 's' : ''}:\n`)

    // Sort by date (newest first)
    drafts.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })

    for (const draft of drafts) {
      console.log(`📄 ${draft.title || 'Untitled'}`)
      if (draft.description) {
        console.log(`   ${draft.description}`)
      }
      console.log(`   📅 ${draft.date || 'No date'}`)
      if (draft.author) {
        console.log(`   ✍️  ${draft.author}`)
      }
      if (draft.tags && draft.tags.length > 0) {
        console.log(`   🏷️  ${draft.tags.join(', ')}`)
      }
      console.log(`   📁 ${draft.filePath}`)
      console.log('')
    }
  } catch (error) {
    console.error('Error listing drafts:', error)
    process.exit(1)
  }
}
