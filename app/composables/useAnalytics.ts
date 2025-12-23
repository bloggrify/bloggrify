type AnalyticsProvider = 'hakanai' | 'blogtally' | 'pirsch' | 'plausible' | 'fathom' | 'google'

// Modification du type pour accepter des propriétés supplémentaires
type AnalyticsProviderConfig = {
    provider: AnalyticsProvider
    code: string
    [key: string]: string | boolean | number
}

type ScriptAttributes = {
    src?: string
    defer?: boolean
    async?: boolean
    id?: string
    innerHTML?: string
    [key: string]: string | boolean | number
}

export const useAnalytics = () => {
    const config = useAppConfig()
    const providers = config.analytics?.providers || []

    const getProviderScript = (provider: AnalyticsProviderConfig): ScriptAttributes[] => {
        // Configuration de base pour chaque fournisseur
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

        // Récupérer les scripts de base pour le provider
        const scripts = baseScripts[provider.provider] || []

        // Ajouter les propriétés supplémentaires au premier script
        if (scripts.length > 0) {
            const extraParams = Object.entries(provider).reduce((acc, [key, value]) => {
                // Ignorer les propriétés de base
                if (key !== 'provider' && key !== 'code') {
                    // Convertir les propriétés camelCase en data-attribute si nécessaire
                    const attributeKey = key.startsWith('data-') ? key : `data-${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`
                    acc[attributeKey] = value
                }
                return acc
            }, {} as Record<string, string | boolean | number>)

            // Fusionner les propriétés supplémentaires avec le premier script
            scripts[0] = { ...scripts[0], ...extraParams }
        }

        return scripts
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
