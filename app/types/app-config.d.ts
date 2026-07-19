
declare module '@nuxt/schema' {

  /**
   * The social networks Bloggrify knows how to render a profile link for.
   *
   * Adding one here is not enough: `app/utils/socials.ts` must also map it to an
   * icon and a label, otherwise the value is ignored at render time.
   */
  type SocialPlatform =
    | 'bluesky'
    | 'facebook'
    | 'github'
    | 'instagram'
    | 'linkedin'
    | 'mastodon'
    | 'twitter'
    | 'youtube'

  /**
   * Profile links, keyed by network. Every value is a full URL.
   *
   * Used both for the site identity (`AppConfig.socials`) and for each author
   * (`Author.socials`), so a single component can render either.
   */
  type Socials = Partial<Record<SocialPlatform, string>> & {
    /**
     * The X/Twitter handle, without the leading `@`.
     *
     * This is *not* a URL and is not rendered as a profile link: it exists to
     * attribute the post in the `twitter:creator` meta tag.
     */
    twitter_username?: string
  }

  type Author = {
    default?: boolean
    username?: string
    name?: string
    description?: string
    avatar?: string
    socials?: Socials
  }

  type AnalyticsProvider = 'hakanai' | 'blogtally' | 'pirsch' | 'plausible' | 'umami' | 'fathom' | 'google' | 'openpanel'

  type AnalyticsProviderConfig = {
    provider: AnalyticsProvider
    code: string
    /**
     * Endpoint the tracker sends events to, for self-hosted instances.
     *
     * Only read by `openpanel` today. Left empty, the tracker talks to the
     * provider's own cloud. Any *other* extra key is forwarded to the tracker
     * script as a `data-*` attribute instead.
     */
    apiUrl?: string
    /**
     * URL of the tracker script itself, for self-hosted instances that serve it
     * from their own domain. Defaults to the provider's public CDN.
     */
    scriptUrl?: string
  } & Record<string, string | boolean | number | undefined>

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
    /**
     * The public URL of the site, used for canonical tags, the sitemap, the RSS
     * feed and schema.org.
     *
     * This takes precedence over the `BASE_URL` environment variable, which only
     * provides the fallback used in development (`http://localhost:3000`).
     */
    url: string
    logo: string
    language?: string
    theme: string
    name: string
    avatar: string
    description: string

    /**
     * Photos shown in the scrolling gallery of the home hero (minimalist theme).
     *
     * Each entry is served from `public/`. Leave empty or omit to hide the gallery.
     */
    gallery?: Array<{
      src: string
      alt?: string
      width?: number
      height?: number
    }>

    seo?: SeoConfig

    pagination: {
      per_page: number
    }

    socials: Socials & {
      /**
       * @deprecated Moved to `sharing.networks`. Sharing buttons are not a social
       * profile, and keeping them here forced every consumer of `socials` to filter
       * out a key that is not a network. Still honoured, with a build-time warning.
       */
      sharing_networks?: string[]
    }

    sharing?: {
      /**
       * The networks offered by the share buttons of a post.
       *
       * Possible values: see https://github.com/stefanobartoletti/nuxt-social-share
       */
      networks?: string[]
    }

    newsletter: {
      enabled: boolean
      form_action: string
      provider: string
    }

    analytics?: {
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

    /**
     * The `/authors` directory page, listing every author declared in `authors`
     * and linking to each `/authors/{username}` page.
     *
     * Opt-in on purpose: aggregating the name, bio and links of every contributor
     * is not a neutral default, and a single-author blog gains nothing from it.
     * When disabled (the default) the page is not generated and `/authors` returns
     * a 404. Individual author pages (`/authors/{username}`) are unaffected.
     *
     * @default { enabled: false }
     */
    authors_page?: {
      enabled?: boolean
    }

    menu: Array<{
      name: string
      path: string
    }>
  }
}

export {}
