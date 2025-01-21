interface RobotRule {
    UserAgent: string;
    Disallow: string[];
    Allow: string[];
}

export default defineEventHandler(async (event) => {
    const config = useAppConfig()
    const configUrl = config.url || 'https://www.example.com'
    const url = configUrl.replace(/\/$/, '')

    const robotsConfig = config.robots || [
        {
            UserAgent: '*',
            Allow: ['/'],
            Disallow: [],
        },
    ]

    let robotsContent = ''
    robotsConfig.forEach((rule: RobotRule) => {
        if (rule.UserAgent) {
            robotsContent += `User-agent: ${rule.UserAgent}\n`
        }
        if (rule.Disallow && rule.Disallow.length) {
            rule.Disallow.forEach((path) => {
                robotsContent += `Disallow: ${path}\n`
            })
        }
        if (rule.Allow && rule.Allow.length) {
            rule.Allow.forEach((path) => {
                robotsContent += `Allow: ${path}\n`
            })
        }
        robotsContent += '\n'
    })

    robotsContent += `Sitemap: ${url}/sitemap.xml\n`

    setHeader(event, 'Content-Type', 'text/plain')

    return robotsContent
})
