# Vertical Solutions — Media & Entertainment

> Real open source platforms that can be customized with AI. The strategy: start from something functional, layer agentic AI on top.
> Last updated: 2026-07-11 (v13)

## Platforms for AI Customization

| Platform | Repo | License | Stack | Use Case | AI Opportunity |
|----------|------|---------|-------|----------|----------------|
| **MediaCMS** | [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | AGPL-3.0 | Python/Django + React | Enterprise video CMS and media library | Add AI-powered auto-tagging, transcript generation (Whisper), smart search, content moderation, and chapter generation. REST API enables agent integration. |
| **Open Streaming Platform** | [arut/nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module) + OSP | MIT | Python/Flask + NGINX | Self-hosted live streaming (Twitch/YouTube alternative) | Layer real-time AI commentary, live transcription, sentiment analysis, and automated highlight clipping. |
| **Restreamer** | [datarhei/restreamer](https://github.com/datarhei/restreamer) | Apache-2.0 | Go + React | H.264 real-time video distribution and multi-destination push | Add AI-powered adaptive bitrate logic, scene change detection for dynamic transcription triggers, and content-aware CDN routing. |
| **InvokeAI** | [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) | Apache-2.0 | Python + FastAPI + React | AI image and concept art generation studio | Build agent workflows for batch concept art, storyboard generation, brand asset creation, and style-consistent visual development pipelines. |
| **Jellyfin** | [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) | GPL-2.0 | .NET + React | Self-hosted media server and streaming (Plex alternative) | Add AI: content recommendation, auto-subtitle via Whisper, content discovery agents, mood-based playlist generation with AudioCraft. |
| **Castopod** | [ad-aures/castopod](https://github.com/ad-aures/castopod) | AGPL-3.0 | PHP/Laravel | Podcast hosting platform (self-hosted) | Layer AI: auto-transcription, show notes generation, chapter markers, SEO optimization, voice cloning for ad insertion. |
| **Stremio** (core) | [Stremio/stremio-core](https://github.com/Stremio/stremio-core) | GPL-2.0 | Rust | Streaming media aggregator | Build AI-powered content discovery addons, personalized recommendation engines, and watchlist prediction agents. |

## How to Layer AI on Top

### Step 1: Fork + Deploy the Base Platform
Pick a platform matching the client's use case. Deploy self-hosted to ensure IP protection.

### Step 2: Add AI Microservices
Wire in:
- **Transcription**: Whisper or whisper.cpp via REST endpoint
- **Video generation**: Wan2.2 or LTX-Video via ComfyUI API
- **Audio generation**: AudioCraft MusicGen for background music
- **Agent orchestration**: OpenMontage for multi-step production workflows

### Step 3: Expose an Agentic Layer
Build an agent (LangGraph + Claude) that can:
- Accept natural language production requests
- Invoke the appropriate AI microservices in sequence
- Return deliverables (video files, transcripts, assets) back to the platform

### Step 4: LATAM Localization
- Use whisper.cpp for Spanish/Portuguese transcription
- Use Pedalboard for audio normalization before AI voice dubbing
- Deploy Wan2.2 locally to meet data residency requirements in Brazil/Argentina

---
*Auto-updated by ingest pipeline.*
