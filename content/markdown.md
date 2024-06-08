---
id: "1"
title: "Use markdown power"
description: "Use markdown at its full potential."
date: "2024-02-10"
categories:
  - markdown
  - documentation
tags:
  - markdown
  - sample
  - thailand
---



This blog is a static blog generator that uses markdown files to generate blog posts.
It uses [Nuxt-content](https://content.nuxt.com/) under the hood. 

:toc

## Standard markdown features
You can use all standard markdown features such as:
text formatting, images, links, code blocks, etc.

You should read the [official markdown documentation](https://www.markdownguide.org/) to learn more about markdown.   
Edit this file to see how it works.


## Mathematical formulas

**Centered formula**
$$
L = \frac{1}{2} \rho v^2 S C_L
$$

**Using code block**
```math
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
```

**Inline formula**

This is an inline formula $a^2 + b^2 = c^2$.

## Horizontal Rules

___

---

***


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
    - Marker character change forces new list start:
        * Ac tristique libero volutpat at
        + Facilisis in pretium nisl aliquet
        - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar


## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

```
Sample text here...
```

Nuxt-content provide code highlighting with [shiki](https://github.com/shikijs/shiki). You can specify the language of the code block to enable syntax highlighting:
This is a paragraph with a code block:
``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
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

## Images


This is a paragraph with an image ![the image is automatically centered on the page and the alt text is displayed below as a caption](/images/doc/image-eventuallycoding.jpg "title of the image you should add for accessibility").


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
cover: "doc/markdown.png"
---
```

* `id` is mandatory if you want to use the comment system. It is used to identify the article.  
* `title` and `description` are used for SEO and social sharing. It's also used on the index page. Don't forget to fill them.
* `date` is used to sort the articles. Date in the future will not be displayed.
* `tags` are only used to display the tags on the article page. It's optional.
* `cover` is used to display an image on the index page. It's also used when you share your article on social media. It's optional (it's however better to have one). 

## Youtube and Twitter embed

You can embed youtube videos and tweets in your markdown files.

https://www.youtube.com/watch?v=su2gNQJkteg

https://twitter.com/hugolassiege/status/1750435525071159309


## Custom components
You can also use [custom components](https://content.nuxt.com/usage/markdown#vue-components) with vue.js to extend markdown features. Some components are already available such as:

::alert{type="TIP"}
This is a tip 
::

::alert{type="Warning"}
This is a warning
::


And the table of contents : 

:toc
