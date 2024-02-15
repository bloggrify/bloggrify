---
id: "11"
title: "All features"
description: "Discover all the features of Bloggr."
date: "2024-02-11"
cover: "covers/tokyo.jpg"
table_of_contents: true
listed: false
---

## Introduction

Bloggr is built on top of
* [Nuxt.js 3.x](https://nuxt.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Nuxt-Content](https://content.nuxt.com/)
* [Lucide icons](https://lucide.dev/)
* [Hyvor Talk](https://talk.hyvor.com/)
* and other cool stuff

It is a **static** blog generator that uses markdown files to generate blog posts.

## Static blog generator

A static blog generator is a tool that generates a blog from markdown files. It is a great way to create a blog because it is simple, fast, and secure. It requires no database and no server-side code. It is just a bunch of HTML, CSS, and JavaScript files.

* It is **secure** because there is no server-side code that can be hacked. 
* It is **fast** because there is no database to query and no server-side code to execute.    
* It is **simple** because it is just a bunch of files.
* It is **cheap** because it can be hosted on a static hosting provider.  

## Markdown

You can use all standard markdown features plus some extra features such as frontmatter to add metadata to your markdown files.  
You can read more about it [here](/markdown).

## SEO friendly

Bloggr is SEO friendly. It generates a sitemap and a RSS feed. It also supports Open Graph and Twitter cards. It has been optimized for search engines.  
You can read more about it [here](/seo).

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


## Very flexible file structure

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

You just have to modify the `nuxt.config.ts` file to add the tracking code of your analytics provider.

For example, to add [Pirsch](https://pirsch.io/), you can add the following code to the `nuxt.config.ts` file:

```typescript
export default {
    app: {
        head: {
            htmlAttrs: {
                lang: "en",
            },
            script: [
                {
                    src: "https://api.pirsch.io/pirsch.js",
                    id: "pirschjs",
                    defer: true,
                    "data-code": "YOUR_PIRSCH_CODE",
                    type: "text/javascript",
                },
            ],
        },
    },
}
```
::alert
Replace `YOUR_PIRSCH_CODE` with your Pirsch code.
::
