# Pi Config (`pi-config`)

Welcome to my personal AI agent configuration repository. This folder (`~/.pi`) acts as the brain and environment for **Pi**, my personalized AI assistant. 

This repository centralises my working environment context, preferences, skills, and extensions to ensure Pi works exactly how I need it to, wherever I invoke it.

Install Pi with 
```bash
npm install -g @mariozechner/pi-coding-agent
```
After running `Pi` run `/login` to add your provider API key and then copy this repo into your `~/.pi` directory. For more info see https://pi.dev/docs/latest

## Structure

Pi's context and memory are built directly around my Obsidian vault. The agent uses the highly capable `obsidian` CLI to systematically read, search, and append tasks/notes directly to my second brain.

### Vault Integration (`/Users/raine/Obsidian/RaineTech`)

```text
/Users/[YourUser]/Obsidian/[YourVaultName]
├── 00_System
│   ├── Inbox.md         (Pi systematically appends raw thoughts/tasks here)
│   ├── Tasks.base
│   └── Templates/
├── 10_Agents
│   └── AGENTS.md        (Obsidian specific knowledge for agents, commands etc)
├── 20_Recipes/          (Project templates & boilerplates)
├── 30_Snippets/         (Code solutions & problem fixes)
├── 40_Library/          
└── 50_Tasks/            (Processed actionable tasks go here)
```

### Agent Configuration (`~/.pi/agent`)

- **`agent/SYSTEM.md`**: The global system profile. This file defines my identity, my working context (prioritizing action over endless planning), preferred tech stack (React, Next.js, Tailwind, etc.), and strict implementation disciplines for the agent.
- **`agent/SYSTEM.example.md`**: A templated version of the system profile that can be adapted for new projects or by others looking to create their own Pi configuration. Remember to rename it after customising it for yourself.
- **`agent/skills/`**: A collection of specialized tools and instructions covering domains like SEO audits, Vercel deployments, Next.js best practices, and more. Some like `ochestrator` are key to my system, but the rest care optional and mostly suited my preferences as a developer. Remove the skills you don't need and add the ones you do need by using `pi install git:github.com/user/repo` or the `npx skills` command and the directory at https://skills.sh/.
- **`agent/extensions/`**: Custom TypeScript extensions that grant Pi specific abilities, such as web scraping, searching, safe bash execution, and memory management. Here is where the `subagents` are located and many of tthese extensions are used for highly focused subagents.

## Philosophy

Pi is configured to minimize planning friction and get straight to execution. The instructions strictly command the AI to:
1. **Understand Before Building:** Never guess, always verify.
2. **Keep It Simple:** Edit over creating, prioritize the direct request.
3. **Be Direct:** Honest feedback and technical accuracy over polite validation.
4. **Investigate Before Fixing:** Observe, hypothesize, verify, fix.
5. **Verify Before Claiming Done:** Run the tests, check the output.

## Pre-Installed skills

**Current Skills:**
- `agent-browser`
- `convex-quickstart`
- `deploy-to-vercel`
- `media-optimizer`
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

## How It Works

When Pi runs, it loads `SYSTEM.md` as the system prompt. Pi can delegate tasks to subagents, access my local Obsidian vault via CLI, and execute workflows defined in the skills folder. This keeps the assistant contextualized to my business (RaineTech), my coding habits, and my current tasks.
