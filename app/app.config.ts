export default defineAppConfig({
  url: 'https://minimalist.bloggrify.com/',

  logo: '/images/logo.png',

  theme: 'minimalist',

  name: 'John Doe',
  avatar: '/images/profile-john.jpg',
  description:
    'I\'m a professional web developer with a passion for writing about technology and the web.',

  pagination: {
    per_page: 5,
  },

  socials: {
    mastodon: 'https://piaille.fr',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com',

    // possible values, see https://github.com/stefanobartoletti/nuxt-social-share
    sharing_networks: ['facebook', 'bluesky', 'linkedin', 'email', 'pinterest', 'reddit', 'pocket', 'whatsapp', 'telegram', 'skype']
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
        twitter: 'https://twitter.com',
        twitter_username: 'username',
        mastodon: 'https://piaille.fr',
        youtube: 'https://youtube.com',
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        github: 'https://github.com',
      },
    },
  ],

  menu: [
    { name: 'Documentation', path: '/about' },
    { name: 'Archives', path: '/archives' },
  ],

})
