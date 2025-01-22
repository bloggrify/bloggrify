---
id: "3"
title: "All features"
description: "Discover all the features of Bloggrify."
date: "2024-02-11"
cover: "covers/tokyo.jpg"
table_of_contents: true
tags:
    - documentation
    - features
    - bloggrify
---

## Introduction

Bloggrify is built on top of
* [Nuxt.js 3.x](https://nuxt.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Nuxt-Content](https://content.nuxt.com/)
* [BlogTally](https://blogtally.com/)
* [RssFeedPulse](https://rssfeedpulse.com/)
* [Hyvor Talk](https://talk.hyvor.com/)
* and other cool stuff

It is a **static** blog generator that uses markdown files to generate blog posts.

## Static blog generator

A static blog generator is a tool that generates a blog from markdown files. It is a great way to create a blog because it is simple, fast, and secure. It requires no database and no server-side code. It is just a bunch of HTML, CSS, and JavaScript files.

* It is **secure** because there is no server-side code that can be hacked. 
* It is **fast** because there is no database to query and no server-side code to execute.    
* It is **simple** because it is just a bunch of files.
* It is **cheap** because it can be hosted on a static hosting provider.  

## Configuration

The global configuration of the blog is done in the nuxt.config.ts and the app.config.ts files.

Read more about the configuration [on the official documentation](https://bloggrify.com/introduction/configuration).

## Markdown

You can use all standard markdown features plus some extra features such as frontmatter to add metadata to your markdown files.  
You can read more about it [here](/content/2024/markdown.md).

## SEO friendly

Bloggrify is SEO friendly. It generates a sitemap and a RSS feed. It also supports Open Graph and Twitter cards. It has been optimized for search engines.  

## Sitemap and RSS feed

This blog generates automatically a sitemap.xml and a RSS feed (rss.xml).   
All content is automatically added to the sitemap and the RSS feed except the content with the `listed: false` property in the frontmatter.

## Open Graph and Twitter cards

This blog uses the [useHead](https://nuxt.com/docs/api/composables/use-head) composables to add metadata to the head of the pages.

All pages have a default title and description.
You can tweak the image, title and description of each page in the frontmatter of the markdown file.

This is highly recommended to do so to have a good SEO, not even mentioning that your blog will look broken if you don't define title for each page...

## Robots.txt
By default, the robots.txt allows all robots to crawl the website. 

Read more about the robots.txt [on the official documentation](https://bloggrify.com/reference/robots).

## Comment system

You can enable comments on your blog. It uses [Hyvor Talk](https://talk.hyvor.com/).  

Comments are a great way to interact with your readers. It's a great way to get feedback and improve your content.

On a static website, you don't have a database. But you can use a third-party service to add comments to your blog.

I use [Hyvor talk](https://talk.hyvor.com/) for this blog. You can enable it by adding the following code to the `nuxt.config.ts` file:

```typescript
            comments: {
                enabled: true,
                hyvor_talk: {
                    website_id: "YOUR_HYVOR_TALK_WEBSITE_ID",
                },
            },
```

::alert
Replace `YOUR_HYVOR_TALK_WEBSITE_ID` with your Hyvor Talk website id.
::


## Flexible file structure

You can organize your files as you want. You can create folders and subfolders and you can choose the URL of your blog posts.  
Each file under the `content` directory will be transformed into a page of the blog.

All the files are markdown files with a frontmatter at the top of the file. They are all listed on the index page, except the ones
* with the `draft: true` property.
* with the `listed: false` property.

The url of the page is the path of the file, without the `.md` extension.
It means you can define the url structure of your blog by organizing the files in the `content` directory.

For example, you can have url like `/2024/01/files_hierarchy` if the file is located at `content/2024/01/files_hierarchy.md`.

It is highly recommended to use a hierarchical structure for the files, to make the blog more organized and to make the urls more meaningful.


## Analytics

You can add any analytics tool to your blog.  

You just have to modify the `app.config.ts` file to add the tracking code of your analytics provider.

For example, to add [Blogtally](https://blogtally.com/), you can add the following code to the `app.config.ts` file:

```typescript
analytics: {
    provider: 'blogtally',
        blogtally: {
        code: 'YOUR_BLOGTALLY_CODE'
    }
}
```
::alert
Replace `YOUR_BLOGTALLY_CODE` with your Blogtally code.
::

## Newsletter

You can add a newsletter to your blog to keep your readers updated when you publish new content.

The tricky part here is that this blog is a static site, so you can't use a traditional newsletter service, or you'll have to manually send out emails every time you publish a new post and that's not very practical.

Instead, you can use a RSS-to-email service to create a newsletter and then add a form to your blog to allow your readers to sign up.

This is the recommended way to add a newsletter to your blog and you can read more about it [here](https://bloggrify.com/reference/newsletter).
