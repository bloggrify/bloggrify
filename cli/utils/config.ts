import { readFile } from 'fs/promises'
import { join } from 'path'
import process from 'process'

/**
 * Get the default author from app.config.ts
 */
export async function getDefaultAuthor(): Promise<string> {
  try {
    const configPath = join(process.cwd(), 'app', 'app.config.ts')
    const configContent = await readFile(configPath, 'utf-8')

    // Extract authors array
    const authorsMatch = configContent.match(/authors:\s*\[([\s\S]*?)\]/m)
    if (!authorsMatch) {
      return ''
    }

    // Find default author
    const defaultAuthorMatch = authorsMatch[1].match(/username:\s*['"]([^'"]+)['"]/m)
    if (defaultAuthorMatch) {
      return defaultAuthorMatch[1]
    }

    return ''
  } catch {
    return ''
  }
}

/**
 * Validate that an author exists in app.config.ts
 */
export async function validateAuthor(username: string): Promise<boolean> {
  try {
    const configPath = join(process.cwd(), 'app', 'app.config.ts')
    const configContent = await readFile(configPath, 'utf-8')

    const regex = new RegExp(`username:\\s*['"]${username}['"]`)
    return regex.test(configContent)
  } catch {
    return false
  }
}
