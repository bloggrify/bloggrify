import { defineCollection, defineContentConfig, z } from '@nuxt/content'
export default defineContentConfig({
  collections: {
    page: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        prefix: '',
        cwd: 'app/content'
      },
      schema: z.object({
        // Identifiant unique (requis pour les commentaires)
        id: z.string().optional(),

        // Métadonnées de base
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.string().or(z.date()).optional(),
        cover: z.string().optional(),

        // Contrôle de visibilité
        // Pas de .default() pour permettre NULL en base et simplifier les filtres
        comments: z.boolean().optional(),
        listed: z.boolean().optional(),
        hidden: z.boolean().optional(),
        draft: z.boolean().optional(),

        readingTime: z.object({
          time: z.number().optional(),
          text: z.string().optional()
        }).optional(),

        // Configuration
        table_of_contents: z.boolean().optional(),
        layout: z.string().optional(),

        // Taxonomie
        tags: z.array(z.string()).optional(),
        categories: z.array(z.string()).optional(),

        // Auteur
        author: z.string().optional(),

        // Redirections
        redirect_to_domain: z.string().optional(),
        redirect_to_full_url: z.string().optional(),

        // Multilingual
        language: z.string().optional(),
        alternates: z.array(z.object({
          hreflang: z.string(),
          href: z.string()
        })).optional(),

        // Schema.org (peut être n'importe quel objet)
        schemaOrg: z.record(z.any()).optional(),

        // Liens personnalisés
        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional()
        })).optional(),

        // Commentaires (alias de comments)
        nocomments: z.boolean().optional()
      })
    })
  }
})
