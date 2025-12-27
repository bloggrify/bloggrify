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

  analytics: {
    providers: [{
      provider: 'pirsch',
      code: 'UMgcWhIpdgfYXWLqLmCesiKf6vpSZBfv'
    }
    ]
  },

  comments: {
    enabled: true,
    hyvor_talk: {
      website_id: '10519', // Replace with your Hyvor Talk website ID (it won't work with this one)
    },
  },

  table_of_contents: true,

  // if you have multiple authors, you can set them here
  authors: [{
      default: true,
      username: 'john-doe',
      name: 'John Doe',
      description:
        'I\'m a professional web developer with a passion for writing about technology and the web.',
      avatar: '/images/profile-john.jpg',
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
