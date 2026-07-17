import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { useNuxt } from '@nuxt/kit'
import { joinURL } from 'ufo'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { defineRobotsSchema } from '@nuxtjs/robots/content'
import { defineSchemaOrgSchema } from 'nuxt-schema-org/content'
const { options } = useNuxt()
const cwd = joinURL(options.rootDir, 'content')


export default defineContentConfig({
  collections: {
    page: defineCollection({
      type: 'page',
      source: {
        cwd,
        include: '**/*.md',
        prefix: '',
      },
      schema: z.object({
        pageid: z.string().optional(),
        id: z.string().optional(),

        title: z.string().optional(),
        description: z.string().optional(),
        date: z.coerce.date().optional(),
        cover: z.string().optional(),

        comments: z.boolean().optional(),
        nocomments: z.boolean().optional(),
        listed: z.boolean().optional(),
        /** @deprecated synonym of `listed: false`, normalised at build time by the bloggrify module. */
        hidden: z.boolean().optional(),
        draft: z.boolean().optional(),

        readingTime: z.object({
          time: z.number().optional(),
          text: z.string().optional()
        }).optional(),

        table_of_contents: z.boolean().optional(),
        layout: z.string().optional(),

        tags: z.array(z.string()).optional(),
        categories: z.array(z.string()).optional(),

        author: z.string().optional(),

        redirect_to_domain: z.string().optional(),
        redirect_to_full_url: z.string().optional(),

        language: z.string().optional(),
        alternates: z.array(z.object({
          hreflang: z.string(),
          href: z.string()
        })).optional(),

        schemaOrg: defineSchemaOrgSchema(),

        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional()
        })).optional(),

        // Controls search visibility, independently of `listed`, which only controls
        // whether a page shows up in the blog's own listings.
        // `robots: false` means noindex/nofollow; a string sets the directive verbatim.
        robots: defineRobotsSchema({ z }),

        // What gets advertised must be exactly what exists and what we want indexed.
        // Drafts are never generated, so leaving one in the sitemap advertises a 404.
        // `robots: false` pages do exist, but asking Google to index a page that says
        // noindex earns a "Submitted URL marked noindex" error, so they come out too.
        // Note this filter is on us: unlike its Nuxt Content v2 integration, @nuxtjs/sitemap
        // does not exclude `robots: false` entries by itself on v3.
        // Unlisted pages stay in, they are real, reachable pages and `/about` is one.
        sitemap: defineSitemapSchema({
          name: 'page',
          z,
          filter: entry => entry.draft !== true && entry.robots !== false,
        }),


      })
    })
  }
})
