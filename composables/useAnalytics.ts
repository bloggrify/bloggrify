type AnalyticsProvider = 'pirsch' | 'plausible'
type AnalyticsConfig = {
    provider: AnalyticsProvider
    pirsch?: {
        code: string
    }
    plausible?: {
        domain: string
    }
}
export const useAnalytics = () => {
    const config = useAppConfig()


    const analyticsProvider = config.analytics?.provider as AnalyticsProvider
    const analyticsConfig = config.analytics as AnalyticsConfig

    if (analyticsProvider === 'pirsch' && analyticsConfig?.pirsch?.code) {
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
    } else if (analyticsProvider === 'plausible' && analyticsConfig?.plausible?.domain) {
        useHead({
            script: [
                {
                    src: 'https://plausible.io/js/script.js',
                    defer: true,
                    'data-domain': analyticsConfig?.plausible.domain,
                },
            ],
        })
    }
}
