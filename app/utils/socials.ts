import type { SocialPlatform, Socials } from '@nuxt/schema'

/**
 * The single source of truth for how a social network is rendered.
 *
 * Themes must not redefine this map: they style `<SocialLinks>`, they do not
 * decide which networks exist or what they look like.
 */
export const SOCIAL_PLATFORMS: Record<SocialPlatform, { icon: string, label: string }> = {
    bluesky: { icon: 'i-simple-icons-bluesky', label: 'Bluesky' },
    facebook: { icon: 'i-simple-icons-facebook', label: 'Facebook' },
    github: { icon: 'i-simple-icons-github', label: 'GitHub' },
    instagram: { icon: 'i-simple-icons-instagram', label: 'Instagram' },
    linkedin: { icon: 'i-simple-icons-linkedin', label: 'LinkedIn' },
    mastodon: { icon: 'i-simple-icons-mastodon', label: 'Mastodon' },
    twitter: { icon: 'i-simple-icons-x', label: 'X' },
    youtube: { icon: 'i-simple-icons-youtube', label: 'YouTube' },
}

export type SocialLink = {
    platform: SocialPlatform
    url: string
    icon: string
    label: string
}

const _isPlatform = (key: string): key is SocialPlatform => key in SOCIAL_PLATFORMS

/**
 * Turns a `socials` block into the list of profile links to render, in the
 * declaration order of {@link SOCIAL_PLATFORMS} so every theme agrees on it.
 *
 * Keys that are not a network (`twitter_username`, the deprecated
 * `sharing_networks`) are dropped silently: they are legitimate config, they are
 * simply not profile links. An unknown key warns in dev, since it is a typo.
 */
export function resolveSocialLinks (socials?: Socials): SocialLink[] {
    if (!socials) {
        return []
    }

    if (import.meta.dev) {
        for (const [key, value] of Object.entries(socials)) {
            if (value && !_isPlatform(key) && key !== 'twitter_username' && key !== 'sharing_networks') {
                console.warn(
                    `[bloggrify] Unknown social network "${key}", it will not be rendered. ` +
                    `Supported: ${Object.keys(SOCIAL_PLATFORMS).join(', ')}.`
                )
            }
        }
    }

    return (Object.keys(SOCIAL_PLATFORMS) as SocialPlatform[])
        .filter(platform => Boolean(socials[platform]))
        .map(platform => ({
            platform,
            url: socials[platform] as string,
            ...SOCIAL_PLATFORMS[platform],
        }))
}
