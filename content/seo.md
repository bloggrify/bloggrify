---
id: "5"
title: "SEO"
description: "SEO is important for your blog. It helps search engines to understand your content and to display it in the search results."
date: "2024-02-09"
tags:
  - seo
cover: "covers/france.jpg"
---

:toc

## Choose your language


```typescript
The content you'll write on your blog will be in the language you choose. It's important for bots to set up the right language in the html attribute of the `nuxt.config.ts` file. 

The default value is "en"

```typescript
export default {
  head: {
    htmlAttrs: {
      lang: 'en'
    }
  }
}
```

## Sitemap and RSS feed

This blog generates automatically a sitemap.xml and a RSS feed (rss.xml).   
All content is automatically added to the sitemap and the RSS feed except the content with the `listed: false` property in the frontmatter.

## Open Graph and Twitter cards

This blog uses the [useHead](https://nuxt.com/docs/api/composables/use-head) composables to add metadata to the head of the pages.

All pages have a default title and description. 
You can tweak the image, title and description of each page in the frontmatter of the markdown file. 

This is highly recommended to do so to have a good SEO, not even mentioning that your blog will look broken if you don't define title for each page...

## Robots.txt
By default, the robots.txt allows all robots to crawl the website. It's possible to modify the robots.txt file in the `public` folder.

For example if you don't want to allow chatGpt or yandex: 
```txt
User-agent: GPTBot
Disallow: /
User-agent: yandex
Disallow: /
```

## Performance

Performance are an important part of SEO. Here is the lighthouse score of this blog:

| index page                                | blog post                                          |
|-------------------------------------------|----------------------------------------------------|
| ![index page](/images/doc/lighthouse.jpg) | ![blog post](/images/doc/lighthouse-blog-post.jpg) |

Performance could vary depending on the server and the network and images you use in your blog.
