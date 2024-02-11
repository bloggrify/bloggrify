---
id: "10"
title: "Global configuration"
description: "The global configuration of the blog is done in the nuxt.config.ts file."
date: "2024-02-09"
cover: "covers/sanfrancisco.jpg"
---

This blog is a static blog generator that uses markdown files to generate blog posts.
It uses [Nuxt-content](https://content.nuxt.com/) under the hood. 

## Standard markdown features
You can use all standard markdown features such as:
text formatting, images, links, code blocks, etc.

You should read the [official markdown documentation](https://www.markdownguide.org/) to learn more about markdown.   
Edit this file to see how it works.


This is a paragraph with a [link](https://www.google.com). And some **bold** and *italic* text.

This is a paragraph with an image ![the image is automatically centered on the page and the alt text is displayed below as a caption](/images/doc/image-eventuallycoding.jpg "title of the image you should add for accessibility").

Nuxt-content provide code highlighting with [shiki](https://github.com/shikijs/shiki). You can specify the language of the code block to enable syntax highlighting:
This is a paragraph with a code block:
```javascript
console.log('Hello world');
```

This is a paragraph with a list:
- item 1
- item 2
- item 3

This is a paragraph with a numbered list:
1. item 1
2. item 2
3. item 3

This is a paragraph with a quote:
> This is a quote

This is a paragraph with a table:
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

## Frontmatter
It also supports frontmatter to add metadata to your markdown files.

```yaml
---
id: "2"
title: "Use markdown power"
description: "Use markdown at its full potential."
date: "2024-02-09"
tags:
  - markdown
cover: "doc/markdown.png"
---
```

* `id` is mandatory if you want to use the comment system. It is used to identify the article.  
* `title` and `description` are used for SEO and social sharing. It's also used on the index page. Don't forget to fill them.
* `date` is used to sort the articles. Date in the future will not be displayed.
* `tags` are only used to display the tags on the article page. It's optional.
* `cover` is used to display an image on the index page. It's also used when you share your article on social media. It's optional (it's however better to have one). 

## Custom components
You can also use [custom components](https://content.nuxt.com/usage/markdown#vue-components) with vue.js to extend markdown features. Some components are already available such as:

::alert{type="TIP"}
This is a tip
::

::alert{type="Warning"}
This is a warning
::


And the [table of contents described on this page](/tableofcontent). 
