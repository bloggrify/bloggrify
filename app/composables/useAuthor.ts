import type { Author } from "@nuxt/schema";

export const findAuthor = (authorId?: string): Author => {
    const config = useAppConfig()

    const defaultAuthor = { username: authorId, name: authorId, avatar: '', description: '', default: false, socials: {} }

    if (authorId === undefined) {
        return config.authors?.find((author: Author) => author.default) || defaultAuthor
    }
    return config.authors?.find((author: Author) => author.username === authorId) || defaultAuthor
}
