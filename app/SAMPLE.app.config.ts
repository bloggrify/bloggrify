export default defineAppConfig({
    // The public URL of your blog. It drives the canonical tags, og:url, the sitemap
    // and the RSS feed, so set it to your own domain before going live: leaving it
    // wrong points your SEO at somebody else's site. It takes precedence over the
    // BASE_URL environment variable.
    url: 'https://example.com/',

    logo: '/images/logo.png',

    theme: 'minimalist',

    // Nuxt UI theme overrides. `primary` drives buttons, badges, links, focus rings and
    // the pagination of the minimalist theme. Any Nuxt UI colour name works.
    ui: {
        colors: {
            primary: 'green',
            neutral: 'neutral',
        },
    },

    name: 'John Doe',
    avatar: '/images/profile-john.jpg',
    description:
        'I\'m a professional web developer with a passion for writing about technology and the web.',

    // Photos shown in the scrolling gallery of the home hero. Add your own images under
    // `public/` and reference them here. Leave the array empty (or remove it) to hide the
    // gallery: the hero then shows just your avatar, name, description and social links.
    gallery: [
        // { src: '/gallery/photo-1.jpg', alt: 'A short caption' },
        // { src: '/gallery/photo-2.jpg', alt: 'Another caption' },
    ],

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
        provider: 'hyvor_talk', // 'hyvor_talk' or 'hakanai'
        hyvor_talk: {
            website_id: '10519', // Replace with your Hyvor Talk website ID (it won't work with this one)
        },
        // hakanai: {
        //     key: 'YOUR_HAKANAI_KEY', // your Hakanai Connect key (https://connect.hakanai.io/)
        // },
    },

    table_of_contents: true,

    seo: {
        // Allow search engines to index the site. Takes precedence over the
        // SITE_INDEXABLE environment variable. Remove to keep using the env var.
        // indexable: true,

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

    // if you have multiple authors, you can set them here
    authors: [
        {
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
