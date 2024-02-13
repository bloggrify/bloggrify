---
id: "3"
title: "Comments : Enable comments on your blog"
description: "Comments are a great way to interact with your readers. It's a great way to get feedback and improve your content."
date: "2024-02-02"
tags:
  - comments
cover: "covers/tanzanie.jpg"
---

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
