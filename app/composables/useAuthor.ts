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
        return config.authors?.find((author: Author) => author.username === authorId)
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
