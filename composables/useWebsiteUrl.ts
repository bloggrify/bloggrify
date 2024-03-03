export const useWebsiteUrl = () => {
    const config = useAppConfig();
    // @ts-ignore
    return config.url?.replace(/\/$/, "");
};
