
import type { AnalyticsProviderConfig, AnalyticsProvider } from '@nuxt/schema'


type ScriptAttributes = {
    src?: string
    defer?: boolean
    async?: boolean
    id?: string
    innerHTML?: string
    [key: string]: string | boolean | number | undefined
}

export const useAnalytics = () => {
    const config = useAppConfig()
    const providers = (config.analytics?.providers || []) as AnalyticsProviderConfig[]

    const getProviderScript = (provider: AnalyticsProviderConfig): ScriptAttributes[] => {
        const baseScripts: Record<AnalyticsProvider, ScriptAttributes[]> = {
            hakanai: [{
                src: 'https://tracker.hakanai.io/hakanai.min.js',
                defer: true,
                'data-site': provider.code,
            }],
            blogtally: [{
                src: 'https://tracker.hakanai.io/hakanai.min.js',
                defer: true,
                'data-site': provider.code,
            }],
            pirsch: [{
                src: 'https://api.pirsch.io/pa.js',
                id: 'pianjs',
                defer: true,
                'data-code': provider.code,
            }],
            plausible: [{
                src: 'https://plausible.io/js/script.js',
                defer: true,
                'data-domain': provider.code,
            }],
            umami: [{
                src: 'https://cloud.umami.is/script.js',
                'data-website-id': provider.code,
                defer: true,
            }],
            fathom: [{
                src: 'https://cdn.usefathom.com/script.js',
                'data-site': provider.code,
                defer: true,
            }],
            google: [
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
            ],
        }

        const scripts = baseScripts[provider.provider] || []

        if (scripts.length > 0) {
            const extraParams = Object.entries(provider).reduce((acc, [key, value]) => {
                if (key !== 'provider' && key !== 'code') {
                    const attributeKey = key.startsWith('data-') ? key : `data-${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`
                    acc[attributeKey] = value
                }
                return acc
            }, {} as Record<string, string | boolean | number>)

            scripts[0] = { ...scripts[0], ...extraParams }
        }

        return scripts
    }

    providers.forEach(provider => {
        const scripts = getProviderScript(provider)
        if (scripts.length > 0) {
            useHead({
                script: scripts,
            })
        }
    })
}
