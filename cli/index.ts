import { Command } from 'commander'
import { newPost } from './commands/new'
import { draftList } from './commands/draft'
import { publish } from './commands/publish'
import { stats } from './commands/stats'
import { authorList, authorAdd } from './commands/author'
import { validate } from './commands/validate'
import process from 'process'

export async function run() {
  const program = new Command()

  program
    .name('bloggrify')
    .description('CLI tool to manage your Bloggrify blog')
    .version('3.0.0-alpha.1')

  // Command: bloggrify new post <title>
  program
    .command('new')
    .description('Create new content')
    .argument('<type>', 'Content type (post, page)')
    .argument('<title>', 'Content title')
    .option('-d, --description <description>', 'Post description', '')
    .option('-a, --author <username>', 'Author username')
    .option('-t, --tags <tags>', 'Comma-separated tags', '')
    .option('-c, --categories <categories>', 'Comma-separated categories', '')
    .option('--draft', 'Create as draft', true)
    .option('-p, --published', 'Publish immediately (draft: false)', false)
    .option('--cover <path>', 'Cover image path', '')
    .option('--date <date>', 'Publication date (YYYY-MM-DD)')
    .option('--no-comments', 'Disable comments')
    .option('--flat', 'Create in content/slug.md instead of content/YYYY/MM/DD/slug.md', false)
    .option('-i, --interactive', 'Interactive mode', false)
    .action(async (type, title, options) => {
      if (type === 'post') {
        await newPost(title, options)
      } else {
        console.error(`Error: Unknown content type "${type}". Available types: post`)
        process.exit(1)
      }
    })

  // Command: bloggrify draft list
  const draft = program
    .command('draft')
    .description('Manage draft posts')

  draft
    .command('list')
    .description('List all draft posts')
    .action(async () => {
      await draftList()
    })

  // Command: bloggrify publish <slug>
  program
    .command('publish')
    .description('Publish a draft post')
    .argument('<slug>', 'Post slug or path')
    .action(async (slug) => {
      await publish(slug)
    })

  // Command: bloggrify stats
  program
    .command('stats')
    .description('Show blog statistics')
    .action(async () => {
      await stats()
    })

  // Command: bloggrify author
  const author = program
    .command('author')
    .description('Manage blog authors')

  author
    .command('list')
    .description('List all authors')
    .action(async () => {
      await authorList()
    })

  author
    .command('add')
    .description('Add a new author')
    .action(async () => {
      await authorAdd()
    })

  // Command: bloggrify validate
  program
    .command('validate')
    .description('Validate all posts for errors and warnings')
    .action(async () => {
      await validate()
    })

  program.parse()
}
