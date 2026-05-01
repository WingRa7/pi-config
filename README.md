# Pi Config (`pi-config`)

Welcome to my personal AI agent configuration repository. This folder (`~/.pi`) acts as the brain and environment for **Pi**, my personalized AI assistant powered by the Day 1 Agents framework. 

This repository centralises my working environment context, preferences, skills, and extensions to ensure Pi works exactly how I need it to, wherever I invoke it.

## Structure

- **`agent/SYSTEM.md`**: The global system profile. This file defines my identity, neurodivergent working context (prioritizing action over endless planning), preferred tech stack (React, Next.js, Tailwind, etc.), and strict implementation disciplines for the agent.
- **`agent/SYSTEM.example.md`**: A templated version of the system profile that can be adapted for new projects or by others looking to create their own Pi configuration.
- **`agent/skills/`**: A collection of specialized tools and instructions (symlinked to central repositories) covering domains like SEO audits, Vercel deployments, Next.js best practices, and more.
- **`agent/extensions/`**: Custom TypeScript extensions that grant Pi specific abilities, such as web scraping, searching, safe bash execution, and memory management.

## Philosophy

Pi is configured to minimize planning friction and get straight to execution. The instructions strictly command the AI to:
1. **Understand Before Building:** Never guess, always verify.
2. **Keep It Simple:** Edit over creating, prioritize the direct request.
3. **Be Direct:** Honest feedback and technical accuracy over polite validation.
4. **Investigate Before Fixing:** Observe, hypothesize, verify, fix.
5. **Verify Before Claiming Done:** Run the tests, check the output.

## Installed Skills

These skills give Pi specialized expertise and workflows. They are installed via [skills.sh](https://skills.sh/). 

**Current Skills:**
- `agent-browser`
- `convex-quickstart`
- `deploy-to-vercel`
- `next-best-practices`
- `orchestrator`
- `seo`
- `seo-audit`
- `seo-backlinks`
- `seo-competitor-pages`
- `seo-content`
- `seo-dataforseo`
- `seo-geo`
- `seo-google`
- `seo-hreflang`
- `seo-image-gen`
- `seo-images`
- `seo-local`
- `seo-maps`
- `seo-page`
- `seo-plan`
- `seo-programmatic`
- `seo-schema`
- `seo-sitemap`
- `seo-technical`
- `vercel-composition-patterns`
- `vercel-react-best-practices`
- `web-design-guidelines`

**How to Install These Skills:**

Because these skills are critical to the `pi-config` environment, they are hardcoded directly into the repository. If you clone this repository, you already have all the skills configured.

There is no need to run massive install commands or use symlinks. Just clone and go!

## How It Works

When Pi runs, it loads `SYSTEM.md` as the system prompt. Pi can delegate tasks to subagents, access my local Obsidian vault via CLI, and execute workflows defined in the skills folder. This keeps the assistant contextualized to my business (RaineTech), my coding habits, and my current tasks.
