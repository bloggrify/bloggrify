export type Author = {
    username: string
    name: string
    avatar: string
    description: string
    default: boolean
}

export const findAuthor = (authorId?: string): Author => {
    const config = useAppConfig()

    const defaultAuthor = { username: authorId, name: authorId, avatar: '', description: '', default: false }


    if (authorId === undefined) {
        return config.authors?.find((author: Author) => author.default) || defaultAuthor
    }
    return config.authors?.find((author: Author) => author.username === authorId) || defaultAuthor
}
