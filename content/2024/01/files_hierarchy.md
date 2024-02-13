---
id: "4"
title: "Files hierarchy"
description: "Understand the files hierarchy of the blog, how to add new pages and the url structure."
date: "2024-02-09"
tags:
  - markdown
cover: "covers/santorin.jpg"
---

Each file under the `content` directory will be transformed into a page of the blog.

All the files are markdown files with a frontmatter at the top of the file. They are all listed on the index page, except the ones 
* with the `draft: true` property.
* with the `listed: false` property.

The url of the page is the path of the file, without the `.md` extension.
It means you can define the url structure of your blog by organizing the files in the `content` directory.

For example, the url of this page is `/2024/01/files_hierarchy` because the file is located at `content/2024/01/files_hierarchy.md`.

It is highly recommended to use a hierarchical structure for the files, to make the blog more organized and to make the urls more meaningful.
