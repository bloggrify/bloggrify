---
id: "2"
title: "Writing in Bloggrify: Beyond Basic Markdown"
description: "Discover how Bloggrify enhances your writing experience with MDC syntax, Vue components in Markdown, and advanced formatting features"
date: "2024-02-10"
tags:
  - markdown
  - documentation
---

Bloggrify is built on [standard Markdown](https://www.markdownguide.org/). If you're new to Markdown, it's a lightweight markup language with plain text formatting syntax. It's easy to read and write, and it's widely used in documentation, README files, and blogs. 

While Bloggrify is built on standard Markdown, it offers much more powerful writing capabilities. Let's explore how you can enhance your content using advanced features.

## MDC: Markdown Components

MDC (Markdown Components) allows you to seamlessly integrate Vue components within your Markdown:


::alert{type="tip"}
This is an info alert box
::

::code-group

```bash [npm]
npm run dev
```

```bash [yarn]
yarn dev
```

```bash [pnpm]
pnpm run dev
```

::

## Built-in Components
Bloggrify comes with several pre-built components to enhance your content:

::alert{type="warning"}
Remember to configure your environment variables
::

Nuxt-content provide code highlighting with [shiki](https://github.com/shikijs/shiki). You can specify the language of the code block to enable syntax highlighting:
This is a paragraph with a code block:
``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

It's also possible to display a code block with a specific file name:
```js [file.js]
  export default () => {
    console.log('Code block')
  }
```


## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](https://www.google.com)

[link with title](https://www.google.com "title text!")

Autoconverted link https://www.google.com

## Youtube and Twitter embed

You can embed youtube videos and tweets in your markdown files

https://www.youtube.com/watch?v=su2gNQJkteg

https://twitter.com/hugolassiege/status/1750435525071159309

Links to a channel won't be transformed : 

https://youtube.com/@eventuallycoding

## Images

This is a paragraph with an image ![the image is automatically centered on the page and the alt text is displayed below as a caption](/android-chrome-192x192.png).

## Emojies

> Classic markup: :wink: :cry: :laughing: :yum:



### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

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
  - documentation
cover: "doc/markdown.png"
---
```

* `id` is mandatory if you want to use the comment system. It is used to identify the article.  
* `title` and `description` are used for SEO and social sharing. It's also used on the index page. Don't forget to fill them.
* `date` is used to sort the articles. Date in the future will not be displayed.
* `tags` are only used to display the tags on the article page. It's optional.
* `cover` is used to display an image on the index page. It's also used when you share your article on social media. It's optional (it's however better to have one). 

## Conclusion

With these features, you can create rich, interactive blog posts while keeping the simplicity of Markdown. Remember, all these features work out of the box - no additional configuration needed!
