# Media Optimizer (`media-optimizer`)

This skill equips Pi with the ability to autonomously inspect, aggressively compress, and convert images and videos for modern web environments (specifically Next.js).

## Triggers
Use this skill when the user asks to "optimize this media", "compress this image", "compress video for next.js", "generate placeholders", "create a blurhash", or "web optimize this file".

## General Workflow
1. **Inspect:** Run `ls -lh <file>` and optionally `ffprobe -hide_banner <file>` to check the original file size, codecs, and resolution.
2. **Convert/Compress:** Run the appropriate `ffmpeg` command (see Reference below) based on the user's request.
3. **Verify:** Run `ls -lh <new-file>` to get the new file size.
4. **Report:** Provide the user with a concise "Savings Report" comparing the original size to the new size (e.g., "Reduced from 45MB to 3.2MB (92% savings)").

## FFMPEG Command Reference

Always use these specific commands to ensure maximum web compatibility, size reduction, and privacy (by stripping metadata). 

### 1. Images: WebP & AVIF Generation
Next.js modern formats. WebP is standard, AVIF is the next-gen hyper-compressed format.

**To WebP (75% quality, metadata stripped):**
```bash
ffmpeg -i input.jpg -c:v libwebp -lossless 0 -q:v 75 -map_metadata -1 output.webp
```

**To AVIF (CRF 30, metadata stripped):**
```bash
ffmpeg -i input.jpg -c:v libaom-av1 -crf 30 -b:v 0 -strict experimental -map_metadata -1 output.avif
```

### 2. Images: Low-Quality Image Placeholders (LQIP / Blur Data)
Used for Next.js `blurDataURL` to show a blurry placeholder while the main image loads.

**Generate a tiny blurry WebP file:**
```bash
ffmpeg -i input.jpg -vf "scale=20:-1,gblur=sigma=2" -c:v libwebp -q:v 20 -map_metadata -1 output-placeholder.webp
```

**Generate a Base64 string directly (Best for Next.js inline `blurDataURL`):**
```bash
ffmpeg -i input.jpg -vf "scale=20:-1" -vframes 1 -f image2pipe -vcodec libwebp - 2>/dev/null | base64
```
*(Copy the output string and format it as `data:image/webp;base64,<STRING>` for the user).*

### 3. Videos: Web-Optimized MP4 (H.264)
For videos, we strictly use MP4 for maximum cross-browser compatibility (including iOS). We apply `+faststart` so the video begins playing immediately before fully downloading.

**Standard Web Video (with compressed audio):**
```bash
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 24 -movflags +faststart -map_metadata -1 -c:a aac -b:a 128k output.mp4
```

**Background / Hero Video (Stripped Audio):**
*(Audio tracks consume a lot of data. Always use this `-an` flag if the video is just for background/visual purposes).*
```bash
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 24 -movflags +faststart -map_metadata -1 -an output.mp4
```

## Important Notes
- Always check if the file exists before running commands.
- If a video takes a long time to process, warn the user.
- `-map_metadata -1` is crucial as it removes EXIF data, GPS coordinates, and unnecessary color profiles to save space and protect privacy.
