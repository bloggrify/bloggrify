export default defineAppConfig({
  url: 'https://minimalist.bloggrify.com/',

  logo: '/images/logo.svg',

  theme: 'minimalist',

  // Nuxt UI theme overrides. `primary` drives buttons, badges, links, focus rings and
  // the pagination of the minimalist theme.
  ui: {
    colors: {
      primary: 'green',
      neutral: 'neutral',
    },
  },

  name: 'Bloggrify',
  avatar: '/images/logo.svg',
  description:
    'The official Bloggrify blog: release notes, features and guides for the static blog generator built on Nuxt Content.',

  // Photos shown in the scrolling gallery of the home hero. Leave empty (or remove) to
  // hide the gallery entirely; the hero then shows just the avatar, name and links.
  gallery: [
    { src: '/images/templates/minimalist.jpg', alt: 'Minimalist theme' },
    { src: '/images/templates/bento.jpg', alt: 'Bento theme' },
    { src: '/images/templates/epoxia.png', alt: 'Epoxia theme' },
    { src: '/images/templates/bloggr.png', alt: 'Bloggr theme' },
  ],

  pagination: {
    per_page: 5,
  },

  socials: {
    github: 'https://github.com/bloggrify/bloggrify',
    bluesky: 'https://bsky.app/profile/hakanai.io',
  },

  sharing: {
    // The networks offered by the share buttons at the end of a post.
    // Possible values, see https://github.com/stefanobartoletti/nuxt-social-share
    networks: ['bluesky', 'linkedin', 'facebook', 'reddit', 'whatsapp', 'telegram', 'email']
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

  // Client-side analytics. Both codes are public client IDs (they ship in the HTML
  // of every page), so they live in clear here. This file is not part of the npm
  // package, the distributed template is SAMPLE.app.config.ts.
  //   - openpanel: OpenPanel client ID for this blog.
  //   - hakanai:   Hakanai Pulse tracker code (distinct from the Hakanai Connect
  //                key used by `comments` above, which is a different product).
  analytics: {
    providers: [
      { provider: 'openpanel', code: 'ac46ee2c-652e-41e9-b731-749a3ccfc7c8' },
      { provider: 'hakanai', code: 'f36ee1f4-9341-4009-9358-a0f0c219c0e3' },
    ],
  },

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
        bluesky: 'https://bsky.app/profile/hakanai.io',
      },
    },
  ],

  // Publish a `/authors` page listing every author above. Off by default: it is only
  // useful on a multi-author blog, and aggregating everyone's name and bio is a choice,
  // not a default. Add `/authors` to `menu` below to link it. Individual author pages
  // (`/authors/{username}`) work regardless of this setting.
  // authors_page: {
  //   enabled: true,
  // },

  menu: [
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/archives' },
  ],

})
