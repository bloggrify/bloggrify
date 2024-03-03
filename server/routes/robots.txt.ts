import { serverQueryContent } from "#content/server";
import { useWebsiteUrl } from "~/composables/useWebsiteUrl";

export default defineEventHandler(async (event) => {
    const config = useAppConfig();
    const url = useWebsiteUrl();

    const robotsConfig = config.robots || [
        {
            UserAgent: "*",
            Allow: ["/"],
            Disallow: [],
        },
    ];

    let robotsContent = "";
    robotsConfig.forEach((rule) => {
        if (rule.UserAgent) {
            robotsContent += `User-agent: ${rule.UserAgent}\n`;
        }
        if (rule.Disallow && rule.Disallow.length) {
            rule.Disallow.forEach((path) => {
                robotsContent += `Disallow: ${path}\n`;
            });
        }
        if (rule.Allow && rule.Allow.length) {
            rule.Allow.forEach((path) => {
                robotsContent += `Allow: ${path}\n`;
            });
        }
        robotsContent += `\n`;
    });

    robotsContent += `Sitemap: ${url}/sitemap.xml\n`;

    setHeader(event, "Content-Type", "text/plain");

    return robotsContent;
});
