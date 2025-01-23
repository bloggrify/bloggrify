---
id: "1"
title: "Announcing Bloggrify 1.0: A New Static Blog Generator Built on Nuxt"
description: "Bloggrify is now available! A fast, secure and simple static blog generator that brings all the features you need out of the box, powered by Nuxt-Content and Vue.js"
tags:
    - release
date: "2024-01-18"
cover: "/blog/bloggrify.png"

---

After months of development, I'm excited to announce the first stable release of Bloggrify - a static blog generator that prioritizes simplicity without compromising on features.

## What is Bloggrify?

Bloggrify is a static blog generator built on top of Nuxt Content that provides everything you need for a modern blog, right out of the box:

- 📝 Write in Markdown with full support for MDC syntax
- 🔍 Built-in full-text search
- 💬 Comments system integration
- 📨 Newsletter integration
- 📊 Analytics integration
- 🎨 Themeable design
- 🚀 SEO optimized 
- 📡 RSS feed built-in

## Why Another Blog Generator?
While there are many excellent static site generators available, I found myself repeatedly implementing the same features for different blogs. Bloggrify emerged from this experience - it's not just a framework, but a complete solution that brings common blog features together in a cohesive way.
The goal is simple: you should be able to focus on writing, not configuring.

## Core Features in Detail

### Comments Integration
Out of the box, Bloggrify includes integration with Hyvor Talk for managing comments. Being a static blog generator, we carefully chose Hyvor Talk as our default comments provider for its:

* Quick setup (just add your site ID)
* Clean, modern interface
* Privacy-focused approach
* Spam protection
* Multiple authentication options
* Full theming support

No complex configuration needed - Bloggrify handles the integration automatically while keeping your blog fully static. Planning to add support for other comment providers in future releases.

### Search that Works Offline
The search is built using local indexing, providing instant results without external services. It works even offline!

### Newsletter & Feed Integration 📡 📨
Bloggrify comes with pre-configured integrations for keeping your readers updated:

* **RSS Feed**: Built-in RSS feed support, optimized for RSSFeedPulse for easy newsletter automation
* **MailerLite**: Using RSS feed support

Bloggrify recommends the RSS to Email approach, converting your RSS feed into newsletters - write once, publish everywhere. 

### Analytics Integration 📊

Bloggrify supports privacy-focused analytics out of the box with multiple provider options:

* Blogtally: Simple blog-focused analytics with reader engagement metrics
* Pirsch: GDPR-compliant website statistics without compromising user privacy
* Fathom: Ethical alternative to Google Analytics with real-time data

### Theming System

Want to customize the look? Bloggrify comes with a powerful theming system. Use one of the existing themes or create your own using Vue components.

**Try It Out**
Ready to start your blog? Check out:

* [Documentation](https://bloggrify.com/)
* [GitHub Repository](https://github.com/bloggrify/bloggrify)

Feel free to open issues, contribute, or give a star if you like the project.

Happy blogging!
