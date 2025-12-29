import { defineCollection, defineContentConfig, z } from '@nuxt/content'
// import { asSitemapCollection } from '@nuxtjs/sitemap/content'
export default defineContentConfig({
  collections: {
    // content: defineCollection(
    //   asSitemapCollection({
    //     type: 'page',
    //     source: '**/*.md',
    //   }),
    // ),
    page: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        prefix: '',
      },
      schema: z.object({
        id: z.string().optional(),

        title: z.string().optional(),
        description: z.string().optional(),
        date: z.coerce.date().optional(),
        cover: z.string().optional(),

        comments: z.boolean().optional(),
        nocomments: z.boolean().optional(),
        listed: z.boolean().optional(),
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

        schemaOrg: z.record(z.any()).optional(),

        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional()
        })).optional(),

        sitemap: z.record(z.any()).optional(),


      })
    })
  }
})
