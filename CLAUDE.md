# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static landing page for OpenClaw setup assistance — a lead magnet funnel collecting leads via Telegram.

**Funnel:** Landing → Telegram (free PDF guide) → chat/support → upsell (paid setup service, business automation).

## Stack

Pure static site — no frameworks, no build tools, no package manager.

- `index.html` — landing page
- `style.css` — styles (light theme, blue accent matching fortech.dev palette)
- `script.js` — click/scroll/time tracking (localStorage-based)

## Development

Open `index.html` directly in browser:
```
open index.html
```

No build step. No dev server needed. Edit files and refresh browser.

## Deploy

Manual static deploy (GitHub Pages, Netlify, or any static host). No CI/CD configured.

## Design

- Light theme: white background (#FFFFFF), blue accent (#355AFF), dark text (#030614)
- Color scheme based on fortech.dev
- Mobile-responsive (breakpoint at 640px)
- CTA buttons link to Telegram (t.me/tima1702 — placeholder)
- Form collection via Formspree (not yet connected, currently using TG links)

## Content Language

All landing page content is in Russian. Target audience: non-technical users who want to set up OpenClaw AI agent but lack DevOps skills.
