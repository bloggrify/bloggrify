---
id: "1"
title: "Display your table of contents"
description: "The table of content is a great way to help your readers navigate through your blog post. It can be displayed as a sidebar or directly inside the blog post."
date: "2024-02-09"
table_of_contents: true
tags:
  - front_matter
  - configuration
cover: "/doc/toc-mobile.jpg"
---

## Introduction

The table of content is a great way to help your readers navigate through your blog post. It can be displayed as a sidebar or directly inside the blog post.

1. If you want to display the table of content as a navigation sidebar
2. If you prefer to display the table of content directly inside the blog post, you can use the `toc` shortcode.


## Requirements

In order to display the table of content, you need to use several markdown headers. The table of content will be generated based on the headers.

Example:

```markdown
## Title 1
## Title 2
## Title 3
```

::alert
Only the headers with a level 2 will be displayed in the table of content.
::

## Table of content with a shortcode

The table of content can be displayed directly inside the blog post by using the `toc` shortcode.

```markdown
:toc
```

Example : 
:toc


## Table of content as a sidebar

The sidebar will be displayed on the right side of the page on desktop and just below the blog post on mobile.

![Illustration of the table of content as a sidebar](/images/doc/sidebar-toc.jpg "Illustration of the table of content as a sidebar")

The table of content is responsive and will be displayed on the right side of the page on desktop and just below the blog post on mobile : 

![Illustration of the table of content for mobile](/images/doc/toc-mobile.jpg "Illustration of the table of content for mobile")

You can enable it by setting the `table_of_contents` front matter to `true` or you can enable it globally in the nuxt.config.ts file.

### First method : front matter

Enable the table of content by setting the `table_of_contents` front matter to `true` only for the blog post you want to display it.
It will override the global configuration.

```markdown
---
table_of_contents: true
---
```


### Second method : nuxt.config.ts

Enable the table of content globally in the nuxt.config.ts file.
It can be overridden by the front matter to disable it for a specific blog post.

```typescript
// nuxt.config.ts
export default {
    runtimeConfig: {
        public: {
            table_of_contents: true,
        },
    },
};
```
