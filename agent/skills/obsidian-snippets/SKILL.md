---
name: obsidian-snippets
description: Use this skill when the user asks to "save a snippet", "add this to my Obsidian snippets", or anytime they want a piece of code saved to their personal knowledge base (Obsidian vault).
---
# Obsidian Snippets

## Description
Use this skill when the user asks to "save a snippet", "add this to my Obsidian snippets", or anytime they want a piece of code saved to their personal knowledge base (Obsidian vault). 

## Context & Tools
- Always use the `obsidian` CLI to interact with the vault.
- Target directory in the vault: `30_Snippets/`
- Command to create: `obsidian create path="30_Snippets/<FileName>.md" content="<Content>"`
- Command to verify: `obsidian read path="30_Snippets/<FileName>.md"`

## Formatting Guidelines
When saving a snippet, construct the markdown content using the following structure:

\`\`\`md
# <Snippet Title>

> **Note:** <Any specific notes, instructions, or context the user provided>

\`\`\`<language>
<The code snippet>
\`\`\`
\`\`\`

## Execution Steps
1. **Analyze:** Identify the code snippet, the desired file name, and any notes the user wants to include. Ask the user for a name if it's not obvious.
2. **Format:** Prepare the markdown string according to the guidelines above. (Remember to escape strings appropriately if using bash, or use the \`default_api:write\` tool directly to the absolute path if it's easier, but the `obsidian create` CLI is preferred per system instructions).
3. **Execute:** Run the `obsidian create` command. Note: if using `obsidian create`, you can pass the content directly or save to a temp file and use standard bash to pipe it, depending on size. **Actually, the safest method is to use the `obsidian base:create` or `obsidian` CLI if possible, OR just use `default_api:write` directly to the resolved vault path if you know it.** 
*Correction for implementation discipline:* To strictly follow the global instruction "Always use the `obsidian` CLI for reading, writing...", use:
\`obsidian create path="30_Snippets/<FileName>.md" content="<Formatted Markdown>"\`
*(Make sure to handle multiline content properly, or write to a temp file and append/move if CLI parsing gets tricky).*
4. **Verify:** Run `obsidian read path="30_Snippets/<FileName>.md"` to ensure the content saved correctly.
5. **Confirm:** Report back to the user that the snippet was saved and verified.