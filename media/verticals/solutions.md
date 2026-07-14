# 🏭 Vertical Solutions — Media & Entertainment

> Existing open source platforms customizable with AI. Model: start from something functional, add agentic layer on top.
> Last updated: 2026-07-14 (v9)

## Video Distribution & Streaming Platforms

| Platform | License | URL | Stack | AI Customization Entry Points |
|----------|---------|-----|-------|-------------------------------|
| PeerTube | AGPL-3.0 | [github.com/Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | Node.js/Angular/PostgreSQL | REST API for metadata, plugins for auto-captioning with Whisper, ActivityPub for syndication |
| Owncast | MIT | [github.com/owncast/owncast](https://github.com/owncast/owncast) | Go/React | Webhooks for stream events, Claude integration for real-time interactive CTV, Redis pub/sub for second-screen |
| MediaCMS | AGPL-3.0 | [github.com/mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | Python/Django/React | REST API for metadata tagging, Whisper subtitle generation via API, custom recommendation hooks |

## Content Management Systems (CMS)

| Platform | License | URL | Stack | AI Customization Entry Points |
|----------|---------|-----|-------|-------------------------------|
| Strapi | MIT | [github.com/strapi/strapi](https://github.com/strapi/strapi) | Node.js | 64k+ stars. Plugin API for AI content generation, media library, REST + GraphQL. |
| Ghost | MIT | [github.com/TryGhost/Ghost](https://github.com/TryGhost/Ghost) | Node.js | Newsletter + publishing platform. Webhook-driven AI content assist, built-in member analytics. |
| Decap CMS | MIT | [github.com/decaporg/decap-cms](https://github.com/decaporg/decap-cms) | React/YAML | Git-backed headless CMS. Config-driven, add AI workflow via GitHub Actions. |

## Audio / Music Production Platforms

| Platform | License | URL | Stack | AI Customization Entry Points |
|----------|---------|-----|-------|-------------------------------|
| AudioCraft | MIT (code) | [github.com/facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) | Python/PyTorch | API for MusicGen (text-to-music) and AudioGen (text-to-SFX). Retrain on custom audio datasets. |
| ACE-Step | Apache-2.0 | [github.com/ace-step/ACE-Step](https://github.com/ace-step/ACE-Step) | Python/Gradio | Local music gen API. Brand voice fine-tuning, lyrics-to-song, integrate into content assembly pipelines. |

## AI Creative Suites

| Platform | License | URL | Stack | AI Customization Entry Points |
|----------|---------|-----|-------|-------------------------------|
| ComfyUI | GPL-3.0 | [github.com/comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) | Python/Vue | Node-graph workflow for image/video. 2,000+ community nodes. Embed headlessly via API for automated pipelines. |
| Open-Generative-AI | MIT | [github.com/anil-matcha/open-generative-ai](https://github.com/anil-matcha/open-generative-ai) | Next.js | 200+ models. White-label for clients. Add auth, billing, custom model fine-tuning as managed service. |
| InvokeAI | Apache-2.0 | [github.com/invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) | Python/React | 27.5k stars. Professional canvas, board management. REST API + workflows for enterprise creative teams. |

## How to Customize with AI

1. **Fork the base repo** and deploy on client infrastructure (AWS/GCP/on-prem)
2. **Add AI inference endpoint** — local (Ollama/Whisper.cpp) or managed (Claude API/Bedrock)
3. **Wire in MCP servers** for tool access: file system, CMS API, video transcoding, asset library
4. **Wrap existing workflows with agents** — auto-tagging, caption generation, content moderation, recommendation
5. **Conversational UI on top** — Claude-powered chat interface for content teams
