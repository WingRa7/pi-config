import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
    pi.registerCommand("inbox-tidy", {
        description: "Instantly trigger the inbox-processor subagent to sort your Obsidian Inbox.",
        handler: async (args, ctx) => {
            ctx.ui.notify("Triggering the Inbox Processor...", "info");
            
            // The cleanest way to trigger a subagent from a command is to send a 
            // user message instructing the core agent to spawn the task.
            // (Note: `pi.executeTask` and `ctx.ui.writeText` are not standard Pi API methods)
            if ('sendUserMessage' in pi) {
                await pi.sendUserMessage("Please use the Task tool to launch the inbox-processor agent with the task: Empty 00_System/Inbox.md by sorting its contents into 30_Snippets/, 20_Recipes/, 40_Library/, or individual task files in 50_Tasks/ using the obsidian CLI via safe_bash.");
            } else if ('sendUserMessage' in ctx) {
                // Fallback depending on Pi version
                await (ctx as any).sendUserMessage("Please use the Task tool to launch the inbox-processor agent with the task: Empty 00_System/Inbox.md by sorting its contents into 30_Snippets/, 20_Recipes/, 40_Library/, or individual task files in 50_Tasks/ using the obsidian CLI via safe_bash.");
            }
        }
    });
}