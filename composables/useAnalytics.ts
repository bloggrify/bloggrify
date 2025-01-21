type AnalyticsProvider = 'blogtally' | 'pirsch' | 'plausible' | 'fathom' | 'google'
type AnalyticsConfig = {
    provider: AnalyticsProvider
    blogtally?: {
        code: string
    }
    pirsch?: {
        code: string
    }
    plausible?: {
        code: string
    },
    fathom?: {
        code: string
    }
    google?: {
        code: string
    }
}
export const useAnalytics = () => {
    const config = useAppConfig()


    const analyticsProvider = config.analytics?.provider as AnalyticsProvider
    const analyticsConfig = config.analytics as AnalyticsConfig

    if (analyticsProvider === 'blogtally' && analyticsConfig?.blogtally?.code) {
        useHead({
            script: [
                {
                    src: 'https://tracker.blogtally.com/blogtally.min.js',
                    defer: true,
                    'data-site': config.analytics.blogtally.code,
                },
            ],
        })

    } else if (analyticsProvider === 'pirsch' && analyticsConfig?.pirsch?.code) {
        useHead({
            script: [
                {
                    src: 'https://api.pirsch.io/pa.js',
                    id: 'pianjs',
                    defer: true,
                    'data-code': config.analytics.pirsch.code,
                },
            ],
        })
    } else if (analyticsProvider === 'plausible' && analyticsConfig?.plausible?.code) {
        useHead({
            script: [
                {
                    src: 'https://plausible.io/js/script.js',
                    defer: true,
                    'data-domain': analyticsConfig?.plausible.code,
                },
            ],
        })
    } else if (analyticsProvider === 'fathom' && analyticsConfig?.fathom?.code) {
        useHead({
            script: [
                {
                    src: 'https://cdn.usefathom.com/script.js',
                    'data-site': analyticsConfig.fathom.code,
                    defer: true,
                },
            ],
        })
    } else if (analyticsProvider === 'google' && analyticsConfig?.google?.code) {
        useHead({
            script: [
                {
                    src: `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.google.code}`,
                    async: true,
                    defer: true,
                },
                {
                    innerHTML: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${analyticsConfig.google.code}');
                    `,
                },
            ],
        })
    }
}
