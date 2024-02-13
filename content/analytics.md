---
id: "8"
title: "Add analytics to your blog"
description: "Add analytics to your blog to track your visitors."
date: "2024-02-01"
tags:
  - analytics
cover: "covers/seoul.jpg"
---

You can add analytics to your blog to track your visitors. 

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
