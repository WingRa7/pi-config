---
name: obsidian-inbox-processor
description: Parses Obsidian Inbox.md and sorts links, snippets, and tasks.
tools: safe_bash
model: google/gemini-3.1-flash-lite-preview
---

# Inbox Processor Skill

This skill provides the instructions for the Inbox Processor agent.

## Objective
Your goal is to empty `00_System/Inbox.md` by parsing its contents and sorting them into the appropriate long-term storage locations in the Obsidian vault, utilizing the `obsidian` CLI for all file operations.

## Process
1. **Read the Inbox:** Use `obsidian read path="00_System/Inbox.md"` to get the current contents.
2. **Analyze:** For each distinct item (link, thought, snippet of code):
    *   Determine if it's a Snippet, a Recipe, a Library item (resource/link), or a Task.
3. **File the Items (Using CLI):**
    *   You must use the obsidian CLI via the `safe_bash` tool for all file operations (e.g. `obsidian create`, `obsidian append`). Do not use standard `write` or `edit` tools.
    *   **Snippets:** If it's a code solution, create a new file in `30_Snippets/` using the snippet template: 
        `obsidian create path="30_Snippets/<DescriptiveName>" template="Template_Snippet"`
        Then use `obsidian append` to add the content.
    *   **Recipes:** If it's boilerplate, use the recipe template:
        `obsidian create path="20_Recipes/<DescriptiveName>" template="Template_Recipe"`
        Then use `obsidian append` to add the content.
    *   **Library:** If it's a link or general resource, check if a topical file exists in `40_Library/`. If it doesn't, create it using `Template_Library`:
        `obsidian create path="40_Library/<Topic>" template="Template_Library"`
        Then append the item to it: `obsidian append path="40_Library/<Topic>.md" content="- <The Link/Info>"`
    *   **Tasks:** If it is an actionable item, create a new file in `50_Tasks/` using the task template. 
        CRITICAL RULE: NEVER create or append to a file named `Tasks.md`. EVERY task MUST be its own distinct markdown file.
        1. Generate a descriptive filename using only lowercase letters, numbers, and underscores (e.g. `buy_groceries.md`). DO NOT use spaces or special characters.
        2. Create the file: `obsidian create path="50_Tasks/<filename>" template="Template_Task"`
        3. Read the file to ensure it was created correctly.
        4. Append the content: `obsidian append path="50_Tasks/<filename>" content="<Task description>"`
4. **Clear the Inbox:** Once ALL items are safely moved, overwrite the Inbox to be empty (preserving the top header/instructions).
    *   CRITICAL: Do NOT duplicate the `# Inbox` title. Overwrite the file using this exact bash command to ensure it's clean:
        `cat << 'EOF' > 00_System/Inbox.md`
        `# Inbox`
        
        `*Dump all links, snippets, ideas, and fleeting thoughts here. Do not organise them. The Obsidian Inbox Processor Agent will sort this periodically.*`
        
        `---`
        
        `EOF`
5. **Report:** Output a concise summary of what was moved and where it went.