import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import process from 'process'

export interface Author {
  username: string
  name: string
  description: string
  avatar: string
  default?: boolean
  socials?: {
    twitter?: string
    twitter_username?: string
    mastodon?: string
    youtube?: string
    linkedin?: string
    facebook?: string
    instagram?: string
    github?: string
  }
}

/**
 * Get all authors from app.config.ts
 */
export async function getAllAuthors(): Promise<Author[]> {
  try {
    const configPath = join(process.cwd(), 'app', 'app.config.ts')
    const configContent = await readFile(configPath, 'utf-8')

    // Extract authors array
    const authorsMatch = configContent.match(/authors:\s*\[([\s\S]*?)\n\s*\]/m)
    if (!authorsMatch) {
      return []
    }

    const authorsArrayContent = authorsMatch[1]
    const authors: Author[] = []

    // Split by author objects (looking for opening braces)
    const authorBlocks = authorsArrayContent.split(/(?=\{)/).filter(block => block.trim())

    for (const block of authorBlocks) {
      const author: Author = {
        username: '',
        name: '',
        description: '',
        avatar: ''
      }

      // Extract username
      const usernameMatch = block.match(/username:\s*['"]([^'"]+)['"]/)
      if (usernameMatch) author.username = usernameMatch[1]

      // Extract name
      const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/)
      if (nameMatch) author.name = nameMatch[1]

      // Extract description (handle multi-line with escaped quotes)
      const descriptionMatch = block.match(/description:\s*\n?\s*['"](.+?)['"],?\s*\n/s)
      if (descriptionMatch) {
        author.description = descriptionMatch[1]
          .replace(/\\'/g, "'")
          .replace(/\s+/g, ' ')
          .trim()
      }

      // Extract avatar
      const avatarMatch = block.match(/avatar:\s*['"]([^'"]+)['"]/)
      if (avatarMatch) author.avatar = avatarMatch[1]

      // Extract default
      const defaultMatch = block.match(/default:\s*(true|false)/)
      if (defaultMatch) author.default = defaultMatch[1] === 'true'

      // Extract socials
      const socialsMatch = block.match(/socials:\s*\{([\s\S]*?)\}/)
      if (socialsMatch) {
        author.socials = {}
        const socialsContent = socialsMatch[1]

        const extractSocial = (key: string) => {
          const regex = new RegExp(`${key}:\\s*['"]([^'"]+)['"]`)
          const match = socialsContent.match(regex)
          return match ? match[1] : undefined
        }

        author.socials.twitter = extractSocial('twitter')
        author.socials.twitter_username = extractSocial('twitter_username')
        author.socials.mastodon = extractSocial('mastodon')
        author.socials.youtube = extractSocial('youtube')
        author.socials.linkedin = extractSocial('linkedin')
        author.socials.facebook = extractSocial('facebook')
        author.socials.instagram = extractSocial('instagram')
        author.socials.github = extractSocial('github')
      }

      if (author.username) {
        authors.push(author)
      }
    }

    return authors
  } catch (error) {
    return []
  }
}

/**
 * Add a new author to app.config.ts
 */
export async function addAuthor(author: Author): Promise<void> {
  const configPath = join(process.cwd(), 'app', 'app.config.ts')
  let configContent = await readFile(configPath, 'utf-8')

  // Build author object string
  const indent = '    '
  const authorObj = `${indent}{
${indent}  username: '${author.username}',
${indent}  name: '${author.name}',
${indent}  description:
${indent}    '${author.description}',
${indent}  avatar: '${author.avatar}',${author.socials ? `
${indent}  socials: {` : ''}${author.socials?.twitter ? `
${indent}    twitter: '${author.socials.twitter}',` : ''}${author.socials?.twitter_username ? `
${indent}    twitter_username: '${author.socials.twitter_username}',` : ''}${author.socials?.mastodon ? `
${indent}    mastodon: '${author.socials.mastodon}',` : ''}${author.socials?.youtube ? `
${indent}    youtube: '${author.socials.youtube}',` : ''}${author.socials?.linkedin ? `
${indent}    linkedin: '${author.socials.linkedin}',` : ''}${author.socials?.facebook ? `
${indent}    facebook: '${author.socials.facebook}',` : ''}${author.socials?.instagram ? `
${indent}    instagram: '${author.socials.instagram}',` : ''}${author.socials?.github ? `
${indent}    github: '${author.socials.github}',` : ''}${author.socials ? `
${indent}  },` : ''}
${indent}}`

  // Find the authors array and insert before the closing bracket
  const authorsMatch = configContent.match(/authors:\s*\[([\s\S]*?)\n\s*\]/)

  if (!authorsMatch) {
    throw new Error('Could not find authors array in app.config.ts')
  }

  const beforeAuthors = configContent.substring(0, authorsMatch.index! + authorsMatch[0].indexOf('[') + 1)
  const afterAuthors = configContent.substring(authorsMatch.index! + authorsMatch[0].length - 1)
  let existingAuthors = authorsMatch[1].trim()

  // Remove trailing comma from existing authors if present
  if (existingAuthors.endsWith(',')) {
    existingAuthors = existingAuthors.slice(0, -1).trimEnd()
  }

  // Add comma after existing authors if needed
  const separator = existingAuthors ? ',\n' : '\n'

  configContent = beforeAuthors + existingAuthors + separator + authorObj + '\n  ' + afterAuthors

  await writeFile(configPath, configContent, 'utf-8')
}
