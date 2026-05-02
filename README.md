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
│   └── Templates/       (Strict YAML schemas for Snippets, Recipes, Library, and Tasks)
├── 10_Agents
│   └── AGENTS.md        (Obsidian specific knowledge for agents, commands etc)
├── 20_Recipes/          (Project templates & boilerplates)
├── 30_Snippets/         (Code solutions & problem fixes)
├── 40_Library/          (Wiki/Map of Content for tools, frameworks, and concepts)
├── 50_Tasks/            (Active tasks sorted automatically by status: NOW/NEXT/LATER)
└── 60_Archive/          (Completed tasks automatically moved here)
```

### Automated Obsidian Workflows (Subagents & Extensions)

This environment features a suite of highly-focused subagents that act as an automated backend for your Obsidian vault. They format data, link concepts, and sort tasks to minimize planning friction.

**Note on Configuration:** For any extensions that require knowing your specific vault path (like `obsidian-maintenance` or `obsidian-inbox`), you can configure the path by creating a `config.json` inside the extension's folder (e.g. `~/.pi/agent/extensions/obsidian-maintenance/config.json`) based on the provided `config.example.json`. This keeps your absolute paths out of version control.

*   **`/inbox-tidy`**: Triggers the `obsidian-inbox-processor`. Reads `00_System/Inbox.md`, parses the brain dump, and automatically files items into `30_Snippets/`, `20_Recipes/`, `40_Library/`, or individual files in `50_Tasks/` using strict templates.
*   **`/eod` (End of Day)**: Triggers three parallel maintenance subagents:
    1.  **`obsidian-task-archiver`**: Finds all `DONE` tasks in `50_Tasks/`, injects a completion date, and moves them to `60_Archive/` to reduce visual clutter.
    2.  **`obsidian-knowledge-linker`**: Scans snippets and recipes, automatically identifying topics to inject `[[Wikilinks]]` referencing Library files, building a relational knowledge base automatically.
    3.  **`obsidian-task-sorter`**: Analyzes the active tasks in `50_Tasks/`, scores them based on tech-stack relevance, actionability, and age, and strictly limits your `NOW` backlog to 3 tasks, pushing the rest to `NEXT` or `LATER`.

### Agent Configuration (`~/.pi/agent`)

- **`agent/SYSTEM.md`**: The global system profile. This file defines my identity, my working context (prioritizing action over endless planning), preferred tech stack (React, Next.js, Tailwind, etc.), and strict implementation disciplines for the agent.
- **`agent/SYSTEM.example.md`**: A templated version of the system profile that can be adapted for new projects or by others looking to create their own Pi configuration. Remember to rename it after customising it for yourself.
- **`agent/skills/`**: A collection of specialized tools and instructions covering domains like SEO audits, Vercel deployments, Next.js best practices, and more. Some like `ochestrator` are key to my system, but the rest are optional and mostly suited to my preferences as a developer. Remove the skills you don't need and add the ones you do need by using `pi install git:github.com/user/repo` or the `npx skills` command and the directory at https://skills.sh/.
- **`agent/extensions/`**: Custom TypeScript extensions that grant Pi specific abilities, such as web scraping, searching, safe bash execution, memory management, and our custom Obsidian subagents (`obsidian-inbox`, `obsidian-maintenance`, etc.).

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
- `seo-competitor-pages`
- `seo-content`
- `seo-geo`
- `seo-hreflang`
- `seo-images`
- `seo-local`
- `seo-page`
- `seo-plan`
- `seo-programmatic`
- `seo-schema`
- `seo-sitemap`
- `seo-technical`
- `vercel-blob-cli`
- `vercel-composition-patterns`
- `vercel-react-best-practices`
- `web-design-guidelines`

## How It Works

When Pi runs, it loads `SYSTEM.md` as the system prompt. Pi can delegate tasks to subagents, access my local Obsidian vault via CLI, and execute workflows defined in the skills folder. This keeps the assistant contextualized to my business (RaineTech), my coding habits, and my current tasks.