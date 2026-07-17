
declare module '@nuxt/schema' {

  type Author = {
    default?: boolean
    username?: string
    name?: string
    description?: string
    avatar?: string
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

  type AnalyticsProvider = 'hakanai' | 'blogtally' | 'pirsch' | 'plausible' | 'umami' | 'fathom' | 'google' | 'openpanel'

  type AnalyticsProviderConfig = {
    provider: AnalyticsProvider
    code: string
  } & Record<string, string | boolean | number>

  type SeoAiConfig = {
    /**
     * Generate a `/llms.txt` index of the blog, aimed at LLM consumption.
     *
     * This is an *invitation*, not a restriction: it makes the content easier
     * for AI tools to read. It is not a way to opt out of crawling.
     *
     * @default false
     */
    llms?: boolean

    /**
     * Allow AI crawlers (both model training and retrieval/answer engines) to
     * access the site, through `robots.txt`.
     *
     * Setting this to `false` adds a `Disallow: /` group for the known AI user
     * agents (GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot, ...).
     * Regular search engines are unaffected.
     *
     * This is a declarative request only. Well-behaved crawlers honour it;
     * nothing enforces it at the network level.
     *
     * @default true
     */
    allowCrawlers?: boolean
  }

  type SeoConfig = {
    /**
     * Allow search engines to index the site.
     *
     * When set, this takes precedence over the `SITE_INDEXABLE` environment
     * variable. Leave undefined to keep the env-based behaviour.
     */
    indexable?: boolean

    ai?: SeoAiConfig
  }

  interface AppConfig {
    url: string
    logo: string
    language?: string
    theme: string
    name: string
    avatar: string
    description: string

    seo?: SeoConfig

    pagination: {
      per_page: number
    }

    socials: {
      mastodon?: string
      youtube?: string
      linkedin?: string
      facebook?: string
      instagram?: string
      github?: string
      twitter?: string
      twitter_username?: string
      sharing_networks: string[]
    }

    newsletter: {
      enabled: boolean
      form_action: string
      provider: string
    }

    analytics: {
      providers: Array<AnalyticsProviderConfig>
    }

    comments: {
      enabled: boolean
      provider?: 'hyvor_talk' | 'hakanai'
      hyvor_talk?: {
        website_id: string
      }
      hakanai?: {
        key: string
      }
    }

    toc?: {
      showChildren?: boolean
    }

    table_of_contents: boolean

    components?: {
      mdd?: {
        classes?: {
          component?: string
          nav_bar?: string
          nav_container?: string
          nav?: string
          nav_item?: string
          nav_item_active?: string
          preview?: string
          markup?: string
          content?: string
        }
      }
    }

    authors: Array<Author>

    menu: Array<{
      name: string
      path: string
    }>
  }
}

export {}
