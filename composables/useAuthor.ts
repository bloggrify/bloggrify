export const findAuthor = (authorId?: string) => {
    const config = useAppConfig();

    if (authorId === undefined) {
        return config.authors.find((author) => author.default);
    }
    return config.authors.find((author) => author.username === authorId);
};
