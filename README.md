# Minimal Notes

A quiet, minimal blog focused on clarity. Built with Next.js App Router + TypeScript + Tailwind CSS.

## Write a new post

1) Create a markdown file in `content/posts`.
2) Add frontmatter and content.

Example:

```md
---
title: "New Note"
date: "2025-02-01"
description: "Short summary for lists and previews."
tags: ["design", "note"]
draft: false
canonical: "https://example.com/original-post"
---

Your content here.
```

Notes:
- `draft: true` hides the post in production builds.
- `canonical` is optional and only applied when present.

## Local development

```bash
npm run dev
```

## Build & lint

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy

- Vercel: import the repository, set `NEXT_PUBLIC_SITE_URL`, and deploy.
- Other platforms: run `npm run build` and serve `.next` with `npm run start`.

## Design principles

- Less, but better: typography and spacing over decoration.
- Monotone palette + one restrained accent.
- Single column, readable line length (65–75ch).
- Minimal components: header, footer, and post list.

## Content architecture

- Markdown source: `content/posts/*.md`
- Routing: `/posts`, `/posts/[slug]`, `/tags`, `/tags/[tag]`, `/about`
- SEO: metadata, RSS (`/feed.xml`), sitemap, robots
