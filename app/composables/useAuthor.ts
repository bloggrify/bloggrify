import type { Author } from "@nuxt/schema";

export const useAuthor = () => {
    const config = useAppConfig()

    /**
     * Find an author by username
     * @param authorId - The username of the author
     * @returns The author if found, undefined otherwise
     */
    const findAuthor = (authorId?: string): Author | undefined => {
        if (!authorId) {
            // Return default author if no authorId provided
            return config.authors?.find((author: Author) => author.default)
        }

        const author = config.authors?.find((author: Author) => author.username === authorId)

        if (!author && import.meta.dev) {
            // An unknown author resolves to undefined without falling back to the default one,
            // and every consumer guards with `v-if`, so the bio, the schema.org Person and the
            // author meta tags would silently disappear. Warn instead of failing quietly.
            console.warn(
                `[bloggrify] Unknown author "${authorId}". Add it to the \`authors\` array of your app.config.ts, `
                + `or fix the \`author\` frontmatter field of the post referencing it. `
                + `Known authors: ${config.authors?.map((a: Author) => a.username).join(', ') || 'none'}.`
            )
        }

        return author
    }

    /**
     * Check if an author exists
     * @param authorId - The username of the author
     * @returns true if the author exists, false otherwise
     */
    const hasAuthor = (authorId?: string): boolean => {
        return findAuthor(authorId) !== undefined
    }

    return {
        findAuthor,
        hasAuthor
    }
}

// Keep the old function for backward compatibility (deprecated)
export const findAuthor = (authorId?: string): Author | undefined => {
    const { findAuthor: find } = useAuthor()
    return find(authorId)
}
