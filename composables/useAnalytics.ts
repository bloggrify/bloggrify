type AnalyticsProvider = 'blogtally' | 'pirsch' | 'plausible' | 'fathom' | 'google'
type AnalyticsProviderConfig = {
    provider: AnalyticsProvider
    code: string
}

type ScriptAttributes = {
    src?: string
    defer?: boolean
    async?: boolean
    id?: string
    innerHTML?: string
    'data-site'?: string
    'data-code'?: string
    'data-domain'?: string
}

export const useAnalytics = () => {
    const config = useAppConfig()
    const providers = config.analytics?.providers || []

    const getProviderScript = (provider: AnalyticsProviderConfig): ScriptAttributes[] => {
        switch (provider.provider) {
            case 'blogtally':
                return [{
                    src: 'https://tracker.blogtally.com/blogtally.min.js',
                    defer: true,
                    'data-site': provider.code,
                }]
            case 'pirsch':
                return [{
                    src: 'https://api.pirsch.io/pa.js',
                    id: 'pianjs',
                    defer: true,
                    'data-code': provider.code,
                }]
            case 'plausible':
                return [{
                    src: 'https://plausible.io/js/script.js',
                    defer: true,
                    'data-domain': provider.code,
                }]
            case 'fathom':
                return [{
                    src: 'https://cdn.usefathom.com/script.js',
                    'data-site': provider.code,
                    defer: true,
                }]
            case 'google':
                return [
                    {
                        src: `https://www.googletagmanager.com/gtag/js?id=${provider.code}`,
                        async: true,
                        defer: true,
                    },
                    {
                        innerHTML: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${provider.code}');
                        `,
                    },
                ]
            default:
                return []
        }
    }

    // Ajouter tous les scripts pour chaque provider
    providers.forEach(provider => {
        const scripts = getProviderScript(provider)
        if (scripts.length > 0) {
            useHead({
                script: scripts,
            })
        }
    })
}
