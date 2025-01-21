---
id: "8"
title: "Custom components"
description: "Enhance your markdown files with custom components."
date: "2024-02-11"
categories:
  - markdown
  - documentation
tags:
  - markdown
  - sample
  - documentation
alternates:
   - hreflang: en
     href: https://mistral.bloggrify.com/custom-components
---

You can use [custom components](https://content.nuxt.com/usage/markdown#vue-components) within vue.js to extend markdown features. Some components are already available within Bloggrify such as:

:toc

## Code

### Code group

::mdd

#preview    
:::code-group

```bash [npm]
npm run dev
```

```bash [yarn]
yarn dev
```

```bash [pnpm]
pnpm run dev
```

:::

#markup
```markdown
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
```
::




### Markdown code block

::mdd

#preview    
    :::mdd
    
    #preview    
    _Showing a result_
    
    #markup
    ```markdown
    _Showing the markup_
    ```
    :::

#markup
```markdown
    ::mdd
    
    #preview    
    _Showing a result_
    
    #markup
    ```markdown
    _Showing the markup_
    ```
    ::
```
::


## Alerts

::mdd

#preview    
::alert{type="TIP"}
This is a tip
::

#markup
```markdown
::alert{type="TIP"}
This is a tip
::
```
::

::mdd

#preview    
::alert{type="Warning"}
This is a warning
::

#markup
```markdown
::alert{type="Warning"}
This is a warning
::
```
::



## table of contents 

::mdd

#preview    
:toc

#markup
```markdown
:toc
```
::

