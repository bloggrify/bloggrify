import { getAllPosts } from '../utils/markdown'
import { extractLinks, checkUrl } from '../utils/content'
import { readFile } from 'fs/promises'
import { join } from 'path'
import process from 'process'

interface LinkIssue {
  file: string
  url: string
  text: string
  status?: number
  error?: string
}

export async function validateLinks() {
  try {
    console.log('🔗 Validating external links...\n')

    const posts = await getAllPosts()

    if (posts.length === 0) {
      console.log('📝 No posts found')
      return
    }

    const brokenLinks: LinkIssue[] = []
    const checkedUrls = new Map<string, boolean>() // Cache to avoid checking same URL multiple times
    let totalLinks = 0

    for (const post of posts) {
      try {
        const fullPath = join(process.cwd(), post.filePath)
        const content = await readFile(fullPath, 'utf-8')
        const links = extractLinks(content)

        // Filter only external links (http/https)
        const externalLinks = links.filter(link =>
          link.url.startsWith('http://') || link.url.startsWith('https://')
        )

        for (const link of externalLinks) {
          totalLinks++

          // Skip if already checked
          if (checkedUrls.has(link.url)) {
            if (!checkedUrls.get(link.url)) {
              brokenLinks.push({
                file: post.filePath,
                url: link.url,
                text: link.text
              })
            }
            continue
          }

          // Check URL
          process.stdout.write(`\rChecking ${totalLinks} links...`)
          const result = await checkUrl(link.url)

          checkedUrls.set(link.url, result.ok)

          if (!result.ok) {
            brokenLinks.push({
              file: post.filePath,
              url: link.url,
              text: link.text,
              status: result.status,
              error: result.error
            })
          }
        }
      } catch {
        // Could not read file, skip
      }
    }

    console.log(`\r✅ Checked ${totalLinks} link${totalLinks > 1 ? 's' : ''}\n`)

    // Display results
    if (brokenLinks.length === 0) {
      console.log('✅ All external links are valid!\n')
    } else {
      console.log(`❌ Found ${brokenLinks.length} broken link${brokenLinks.length > 1 ? 's' : ''}:\n`)

      // Group by file
      const linksByFile = new Map<string, LinkIssue[]>()
      for (const link of brokenLinks) {
        if (!linksByFile.has(link.file)) {
          linksByFile.set(link.file, [])
        }
        linksByFile.get(link.file)!.push(link)
      }

      for (const [file, links] of linksByFile) {
        console.log(`📄 ${file}`)
        for (const link of links) {
          const statusInfo = link.status ? ` (${link.status})` : link.error ? ` (${link.error})` : ''
          console.log(`   ❌ [${link.text}](${link.url})${statusInfo}`)
        }
        console.log('')
      }

      console.log('Summary:')
      console.log(`   ❌ ${brokenLinks.length} broken link${brokenLinks.length > 1 ? 's' : ''}`)
      console.log(`   ✅ ${totalLinks - brokenLinks.length} valid link${totalLinks - brokenLinks.length > 1 ? 's' : ''}`)
      console.log('')

      process.exit(1)
    }

  } catch (error) {
    console.error('Error validating links:', error)
    process.exit(1)
  }
}
