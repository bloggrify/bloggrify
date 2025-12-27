import { getAllAuthors, addAuthor, type Author } from '../utils/author'
import process from 'process'
import { createInterface } from 'readline'

/**
 * List all authors
 */
export async function authorList() {
  try {
    const authors = await getAllAuthors()

    if (authors.length === 0) {
      console.log('✍️  No authors found in app.config.ts')
      return
    }

    console.log(`✍️  Found ${authors.length} author${authors.length > 1 ? 's' : ''}:\n`)

    for (const author of authors) {
      console.log(`📝 ${author.name}${author.default ? ' (default)' : ''}`)
      console.log(`   Username: ${author.username}`)
      if (author.description) {
        console.log(`   Description: ${author.description}`)
      }
      if (author.avatar) {
        console.log(`   Avatar: ${author.avatar}`)
      }

      const socials = []
      if (author.socials?.twitter) socials.push(`Twitter`)
      if (author.socials?.mastodon) socials.push(`Mastodon`)
      if (author.socials?.github) socials.push(`GitHub`)
      if (author.socials?.linkedin) socials.push(`LinkedIn`)
      if (author.socials?.youtube) socials.push(`YouTube`)
      if (author.socials?.facebook) socials.push(`Facebook`)
      if (author.socials?.instagram) socials.push(`Instagram`)

      if (socials.length > 0) {
        console.log(`   Socials: ${socials.join(', ')}`)
      }
      console.log('')
    }
  } catch (error) {
    console.error('Error listing authors:', error)
    process.exit(1)
  }
}

/**
 * Prompt for input
 */
function prompt(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

/**
 * Add a new author (interactive mode)
 */
export async function authorAdd() {
  try {
    console.log('✍️  Add a new author\n')

    // Check for existing authors
    const existingAuthors = await getAllAuthors()
    const existingUsernames = existingAuthors.map(a => a.username)

    // Collect author information
    const username = await prompt('Username (slug, e.g. john-doe): ')
    if (!username.trim()) {
      console.error('Error: Username is required')
      process.exit(1)
    }

    if (existingUsernames.includes(username.trim())) {
      console.error(`Error: Author with username "${username}" already exists`)
      process.exit(1)
    }

    const name = await prompt('Full name: ')
    if (!name.trim()) {
      console.error('Error: Name is required')
      process.exit(1)
    }

    const description = await prompt('Description: ')
    const avatar = await prompt('Avatar path (e.g. /images/avatar.jpg): ')

    // Optional socials
    console.log('\nSocial links (press Enter to skip):')
    const twitter = await prompt('Twitter URL: ')
    const mastodon = await prompt('Mastodon URL: ')
    const github = await prompt('GitHub URL: ')
    const linkedin = await prompt('LinkedIn URL: ')
    const youtube = await prompt('YouTube URL: ')

    // Build author object
    const author: Author = {
      username: username.trim(),
      name: name.trim(),
      description: description.trim(),
      avatar: avatar.trim()
    }

    // Add socials if any provided
    const hasSocials = twitter || mastodon || github || linkedin || youtube
    if (hasSocials) {
      author.socials = {}
      if (twitter) author.socials.twitter = twitter.trim()
      if (mastodon) author.socials.mastodon = mastodon.trim()
      if (github) author.socials.github = github.trim()
      if (linkedin) author.socials.linkedin = linkedin.trim()
      if (youtube) author.socials.youtube = youtube.trim()
    }

    // Add author to config
    await addAuthor(author)

    console.log('\n✅ Author added successfully!')
    console.log(`\n✍️  ${author.name}`)
    console.log(`   Username: ${author.username}`)
    console.log(`   📁 Updated: app/app.config.ts`)

  } catch (error) {
    console.error('Error adding author:', error)
    process.exit(1)
  }
}
