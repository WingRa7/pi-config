---
name: vercel-blob-cli
description: Use this skill to manage Vercel Blob storage, including uploading files, listing blobs, deleting assets, and managing storage configurations.
---

# Vercel Blob CLI
Use this skill to manage Vercel Blob storage, including uploading files, listing blobs, deleting assets, and managing storage configurations.

## Authentication & Setup
If you encounter a `No Vercel Blob token found` error, do not ask the user for it. Do the following:
1. Run `vercel link` with the appropriate scope and project (check `AGENTS.md` or `SYSTEM.md` for the team scope if you don't know it).
2. Run `vercel env pull` to retrieve the `.env.local` file containing the `BLOB_READ_WRITE_TOKEN`.
3. Re-run your `vercel blob` command.

## Frontend Integration
After uploading an image intended for a Next.js frontend:
*   Always verify that the newly generated Blob's hostname (e.g., `xxxx.public.blob.vercel-storage.com`) is included in the `remotePatterns` array inside `next.config.ts` so Next.js Image Optimization can process it.
