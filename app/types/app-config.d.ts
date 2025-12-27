
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

  type AnalyticsProvider = 'hakanai' | 'blogtally' | 'pirsch' | 'plausible' | 'umami' | 'fathom' | 'google'

  type AnalyticsProviderConfig = {
    provider: AnalyticsProvider
    code: string
  } & Record<string, string | boolean | number>

  interface AppConfig {
    url: string
    logo: string
    language?: string
    theme: string
    name: string
    avatar: string
    description: string

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
      hyvor_talk: {
        website_id: string
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
