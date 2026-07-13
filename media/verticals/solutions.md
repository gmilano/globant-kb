# Vertical Solutions — Media & Entertainment

> Real open source platforms that can be customized with AI. The strategy: start from something functional, layer agentic AI on top.
> Last updated: 2026-07-13 (v16)

## Platforms for AI Customization

| Platform | Repo | License | Stack | Use Case | AI Opportunity |
|----------|------|---------|-------|----------|----------------|
| **MediaCMS** | [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | AGPL-3.0 | Python/Django + React | Enterprise video CMS and media library | Add AI-powered auto-tagging, transcript generation (Whisper — built-in), smart search, content moderation, and chapter generation. REST API enables agent integration. Central asset hub for all AI-generated content pipelines (P1–P9). |
| **SRS** | [ossrs/srs](https://github.com/ossrs/srs) | **MIT** | C++ | Live streaming infrastructure (RTMP/WebRTC/HLS/SRT/MPEG-DASH) | **NEW v16: MIT license. ~29k★. Real-time AI intelligence layers: Whisper.cpp for live transcription, Claude Haiku for topic tagging (<2s latency), Chatterbox Turbo for real-time broadcast dubbing (75ms latency). SRS 8.0 (codename Kai) in development. Foundation for AI broadcast infrastructure — hooks into stream pipeline at any stage without proprietary lock-in.** |
| **Open Streaming Platform** | [arut/nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module) + OSP | MIT | Python/Flask + NGINX | Self-hosted live streaming (Twitch/YouTube alternative) | Layer real-time AI commentary, live transcription, sentiment analysis, and automated highlight clipping. |
| **Restreamer** | [datarhei/restreamer](https://github.com/datarhei/restreamer) | Apache-2.0 | Go + React | H.264 real-time video distribution and multi-destination push | Add AI-powered adaptive bitrate logic, scene change detection for dynamic transcription triggers, and content-aware CDN routing. |
| **InvokeAI** | [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) | Apache-2.0 | Python + FastAPI + React | AI image and concept art generation studio | Build agent workflows for batch concept art, storyboard generation, brand asset creation, and style-consistent visual development pipelines. |
| **Jellyfin** | [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) | GPL-2.0 | .NET + React | Self-hosted media server and streaming (Plex alternative) | Add AI: content recommendation, auto-subtitle via Whisper, content discovery agents, mood-based playlist generation with AudioCraft. |
| **Castopod** | [ad-aures/castopod](https://github.com/ad-aures/castopod) | AGPL-3.0 | PHP/Laravel | Podcast hosting platform (self-hosted) | Layer AI: auto-transcription, show notes generation, chapter markers, SEO optimization, Kokoro-82M voice narration for audio articles, ad insertion automation. |
| **Stremio** (core) | [Stremio/stremio-core](https://github.com/Stremio/stremio-core) | GPL-2.0 | Rust | Streaming media aggregator | Build AI-powered content discovery addons, personalized recommendation engines, and watchlist prediction agents. |
| **Owncast** | [owncast/owncast](https://github.com/owncast/owncast) | MIT | Go | Self-hosted live streaming + chat (Twitch alternative) | MIT license, single-binary deploy. Add AI real-time transcription (Whisper.cpp), live topic tagging (Claude Haiku), auto-highlight detection, and clip generation. Ideal for independent broadcasters and LATAM news channels requiring IP control. |

## How to Layer AI on Top

### Step 1: Fork + Deploy the Base Platform
Pick a platform matching the client's use case. Deploy self-hosted to ensure IP protection.

### Step 2: Add AI Microservices
Wire in:
- **Transcription**: Whisper or whisper.cpp via REST endpoint
- **Video generation**: Wan2.2 or LTX-Video via ComfyUI API
- **Agent-native video**: HyperFrames (Apache-2.0) for LLM-composed video output
- **Audio generation**: AudioCraft MusicGen for background music
- **Video-to-audio**: FoleyCrafter (Apache-2.0) for automated foley and sound design
- **Agent orchestration**: OpenMontage for multi-step production workflows
- **Newsroom research**: GPT-Researcher (MIT) + STORM (MIT) for automated content research
- **On-premise TTS**: Kokoro-82M (Apache-2.0) for Spanish/Portuguese narration at zero per-character cost

### Step 3: Expose an Agentic Layer
Build an agent (LangGraph + Claude) that can:
- Accept natural language production requests
- Invoke the appropriate AI microservices in sequence
- Use HyperFrames for structured video composition (HTML → MP4 via agent skills)
- Return deliverables (video files, transcripts, assets) back to the platform

### Step 4: LATAM Localization
- Use whisper.cpp for Spanish/Portuguese transcription
- Use Pedalboard for audio normalization before AI voice dubbing
- Deploy Kokoro-82M for on-premise TTS (CPU-viable; $0 per-character vs. ElevenLabs API)
- Deploy Wan2.2 locally to meet data residency requirements in Brazil/Argentina
- FoleyCrafter for automated foley on locally produced content (saves costly sound design)

---
*Auto-updated by ingest pipeline.*
