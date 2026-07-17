export default defineAppConfig({
  url: 'https://minimalist.bloggrify.com/',

  logo: '/images/logo.svg',

  theme: 'minimalist',

  name: 'Bloggrify',
  avatar: '/images/logo.svg',
  description:
    'The official Bloggrify blog: release notes, features and guides for the static blog generator built on Nuxt Content.',

  pagination: {
    per_page: 5,
  },

  socials: {
    github: 'https://github.com/bloggrify/bloggrify',
  },

  sharing: {
    // possible values, see https://github.com/stefanobartoletti/nuxt-social-share
    networks: ['facebook', 'bluesky', 'linkedin', 'email', 'pinterest', 'reddit', 'pocket', 'whatsapp', 'telegram', 'skype']
  },

  newsletter: {
    enabled: true,
    form_action: 'YOUR_NEWSLETTER_FORM_ACTION',
    provider: 'demo'
  },

  comments: {
    enabled: true,
    provider: 'hakanai', // 'hyvor_talk' or 'hakanai'
    // hyvor_talk: {
    //   website_id: '10519', // Replace with your Hyvor Talk website ID (it won't work with this one)
    // },
    hakanai: {
      key: '14ab8e46-4872-472f-be00-f519c0eac4ae', // your Hakanai Connect key (https://connect.hakanai.io/)
    },
  },

  table_of_contents: true,

  seo: {
    // Allow search engines to index the site. Takes precedence over the
    // SITE_INDEXABLE environment variable. Remove to keep using the env var.
    indexable: true,

    ai: {
      // Publish /llms.txt, a markdown index of your posts for AI tools.
      // This makes your content easier to consume, it does not restrict anything.
      llms: false,

      // Set to false to ask AI crawlers (GPTBot, ClaudeBot, CCBot,
      // Google-Extended, PerplexityBot, ...) not to use your content.
      // Regular search engines are unaffected. This is a polite request:
      // well-behaved crawlers honour it, nothing enforces it.
      allowCrawlers: true,
    },
  },

  // The list of authors. The `username` is the key referenced by the `author`
  // frontmatter field of a post, and it is the slug of the `/authors/{username}` page.
  // The author flagged `default: true` is used for posts without an explicit author.
  // See SAMPLE.app.config.ts for the template shipped to new projects.
  authors: [
    {
      default: true,
      username: 'hlassiege',
      name: 'Hugo',
      description:
        'Author and maintainer of Bloggrify',
      socials: {
        github: 'https://github.com/hlassiege',
      },
    },
  ],

  menu: [
    { name: 'Documentation', path: '/about' },
    { name: 'Archives', path: '/archives' },
  ],

})
