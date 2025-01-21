---
id: "3"
title: "New custom component: listing page"
description: "This is a new custom component for listing pages."
date: "2025-01-21"
categories:
  - markdown
  - documentation
tags:
  - markdown
  - sample

---

A new custom component has been added to Bloggrify. This component is used to create listing pages.
It's more a proof of concept than a real component because the design is very basic.
It's a way to show how you can create custom components in Bloggrify.


## Listing

::mdd

#preview    
:minimalist-listing{title="My listing"}


#markup
```markdown
:minimalist-listing{title="My listing"}

```
::

This component accepts several parameters:
- `title`: The title of the listing.
- `tag`: The tag to filter the listing.
- `category`: The category to filter the listing.
- `prefix`: All articles starting with this prefix will be displayed.

**Example**: how to list all articles with the tag "markdown":

::mdd

#preview    
:minimalist-listing{title="My listing" tag="markdown"}


#markup
```markdown
:minimalist-listing{title="My listing" tag="markdown"}

```
::
