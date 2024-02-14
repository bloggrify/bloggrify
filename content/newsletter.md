---
id: "9"
title: "Add a newsletter"
description: "Add a newsletter to your blog to keep your readers updated."
date: "2024-02-03"
table_of_contents: true
cover: "covers/lyon.jpg"
---


## Add a newsletter to a static blog

You can add a newsletter to your blog to keep your readers updated when you publish new content.

The tricky part here is that this blog is a static site, so you can't use a traditional newsletter service, or you'll have to manually send out emails every time you publish a new post and that's not very practical.

Instead, you can use a RSS-to-email service to create a newsletter and then add a form to your blog to allow your readers to sign up. 
This is the approach I'm using for this blog. I'm using [Mailerlite](https://www.mailerlite.com/) 

Of course you can use another service, here you'll find an example of how to do it with Mailerlite but please feel free to use any other service you like.

## Enable RSS feed

The RSS feed is enabled by default in this blog, you can find it at `/rss.xml`. You can check it by going to `https://yourblog.com/feed.xml`.

## Create a Mailerlite account

Go to [Mailerlite](https://www.mailerlite.com/) and create an account.

## Create a new form

Go to the [forms section](https://dashboard.mailerlite.com/forms/embedded) and create a new form. You can create a simple form with just an email field.
Don't worry about the design, we won't use their form, we'll create our own.

Look at the "HTML code" section and copy the form action URL, it should look like this:

```html
<form action="https://assets.mailerlite.com/jsonp/ID1/forms/ID2/subscribe"" method="post">
```

Copy the form action URL, you'll need it later.

## Add the form to your blog

You just have to enable the newsletter section in the `nuxt.config.ts` file and add the form action URL you copied before.

```typescript
newsletter: {
  enabled: true,
  form_action: "YOUR_FORM_ACTION_URL",
},
```

## Create a new campaign

Go to the [campaigns section](https://dashboard.mailerlite.com/campaigns/status/ready) and create a new **RSS** campaign. Then, the rest should be straightforward, just follow the steps.

And voilà! You have a newsletter for your static blog. People can sign up and they'll receive an email every time you publish a new post.
