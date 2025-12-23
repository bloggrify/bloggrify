declare module '@nuxt/schema' {
  interface AppConfig {
    url: string
    logo: string
    language: string
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
      providers: Array<{
        provider: string
        code: string
      }>
    }

    comments: {
      enabled: boolean
      hyvor_talk: {
        website_id: string
      }
    }

    table_of_contents: boolean

    authors: Array<{
      default?: boolean
      username: string
      name: string
      description: string
      avatar: string
      socials: {
        twitter?: string
        twitter_username?: string
        mastodon?: string
        youtube?: string
        linkedin?: string
        facebook?: string
        instagram?: string
        github?: string
      }
    }>

    menu: Array<{
      name: string
      path: string
    }>
  }
}

export {}
