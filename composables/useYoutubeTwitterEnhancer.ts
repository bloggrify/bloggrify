export const useYoutubeTwitterEnhancer = (id: string): void => {
    let containTwitterScript = false;
    const rootElement = document.getElementById(id);
    if (rootElement) {
        rootElement.querySelectorAll("p").forEach((block) => {
            const isYoutubeVideo = block.textContent?.match(
                /^https:\/\/www\.youtube\.com\/watch\?(v=[0-9a-zA-Z_]*)$/,
            );
            if (isYoutubeVideo) {
                isYoutubeVideo.forEach((match) => {
                    const regExpMatchArray = match.match(/v=(.*)$/);
                    if (regExpMatchArray) {
                        const videoId = regExpMatchArray[1];
                        const container = document.createElement("div");
                        container.setAttribute(
                            "class",
                            "flex justify-center items-center ",
                        );
                        const iframe = document.createElement("iframe");
                        iframe.setAttribute(
                            "src",
                            `https://www.youtube-nocookie.com/embed/${videoId}`,
                        );
                        iframe.setAttribute("frameborder", "0");
                        iframe.setAttribute(
                            "allowfullscreen",
                            "allowfullscreen",
                        );
                        iframe.setAttribute("width", "560");
                        iframe.setAttribute("height", "315");
                        block.innerHTML = "";
                        container.appendChild(iframe);
                        block.appendChild(container);
                    }
                });
            }
            const isTweet = block.textContent?.match(
                /^https:\/\/twitter\.com\/[0-9a-zA-Z_]*\/status\/([0-9a-zA-Z]*)$/,
            );
            if (isTweet) {
                isTweet.forEach((match) => {
                    const tweetId = match;
                    const container = document.createElement("div");
                    container.setAttribute(
                        "class",
                        "flex justify-center items-center",
                    );
                    const blockQuote = document.createElement("blockquote");
                    blockQuote.setAttribute("class", "twitter-tweet");
                    const link = document.createElement("a");
                    link.setAttribute(
                        "href",
                        `https://twitter.com/x/status/${tweetId}`,
                    );
                    block.innerHTML = "";
                    blockQuote.appendChild(link);
                    container.appendChild(blockQuote);
                    block.appendChild(container);
                    if (!containTwitterScript) {
                        const script = document.createElement("script");
                        script.setAttribute(
                            "src",
                            "https://platform.twitter.com/widgets.js",
                        );
                        script.setAttribute("charset", "utf-8");
                        script.setAttribute("async", "async");
                        script.setAttribute("defer", "defer");
                        document.body.appendChild(script);
                        containTwitterScript = true;
                    }
                });
            }
        });
    }
};
