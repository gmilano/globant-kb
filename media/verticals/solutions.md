# Vertical Solutions — Media & Entertainment

> Real platforms that exist, are open source, and can be customized with AI on top.
> Strategy: start from a working platform, add an agentic AI layer.
> Last updated: 2026-07-14 (v10 — full rewrite)

## Content Management & Publishing

| Platform | License | Repo | Stars | Stack | AI Integration Point |
|----------|---------|------|-------|-------|----------------------|
| **Ghost** | MIT | [TryGhost/Ghost](https://github.com/TryGhost/Ghost) | ~48k | Node.js, MySQL | Content generation agents, SEO agents, newsletter personalization via Ghost Admin API |
| **Strapi** | MIT (Community) | [strapi/strapi](https://github.com/strapi/strapi) | ~65k | Node.js, React | Headless CMS; AI-powered content ingestion agents via REST/GraphQL; DAM integration |
| **Directus** | BSL 1.1 (MIT <$5M) | [directus/directus](https://github.com/directus/directus) | ~29k | Node.js, Vue | API-first; AI metadata tagging hooks; content workflow orchestration |
| **Payload CMS** | MIT | [payloadcms/payload](https://github.com/payloadcms/payload) | ~28k | TypeScript, Next.js | Code-first headless CMS; AI fields, hooks for generation on-save; used in streaming platforms |

## Video Streaming & Management

| Platform | License | Repo | Stars | Stack | AI Integration Point |
|----------|---------|------|-------|-------|----------------------|
| **MediaCMS** | AGPL-3.0 | [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | ~3k | Python/Django, React | Full-featured video CMS with REST API; add Whisper transcription + AI tagging agents on ingest |
| **PeerTube** | AGPL-3.0 | [Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | ~13k | TypeScript, ActivityPub | Federated video platform; AI subtitle/transcription plugins; content moderation agents |
| **Jellyfin** | GPL-2.0 | [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) | ~37k | C#, .NET | Media server with plugin API; AI recommendation plugins; metadata enrichment agents |
| **Owncast** | MIT | [owncast/owncast](https://github.com/owncast/owncast) | ~10k | Go, JS | Self-hosted live streaming; webhook API for real-time AI moderation/captioning agents |

## Digital Asset Management (DAM)

| Platform | License | Repo / Site | Stack | AI Integration Point |
|----------|---------|-------------|-------|----------------------|
| **Pimcore** | GPL-3.0 (Community) | [pimcore/pimcore](https://github.com/pimcore/pimcore) | ~3.5k | PHP, Symfony | DAM + CMS + PIM in one; AI auto-tagging on asset upload; metadata enrichment agents |
| **ResourceSpace** | BSD | resourcespace.com (OSS) | PHP | Open DAM; REST API; AI metadata/tagging layer via webhooks |
| **Tropy** | LGPL-3.0 | [tropy/tropy](https://github.com/tropy/tropy) | ~1.4k | Electron, SQLite | Research photo organizer; AI auto-description for archival workflows |

## Podcast & Audio Production

| Platform | License | Repo | Stack | AI Integration Point |
|----------|---------|------|-------|----------------------|
| **Castopod** | AGPL-3.0 | [ad-aures/castopod](https://github.com/ad-aures/castopod) | ~2.5k | PHP, ActivityPub | Federated podcast hosting; add Whisper transcription + ACE-Step music bed agents |
| **Podlove Publisher** | MIT | [podlove/podlove-publisher](https://github.com/podlove/podlove-publisher) | ~800 | PHP/WordPress | WordPress podcast plugin; AI show-notes generation, chapter detection via LLM agents |

## Ad-Tech & Monetization

| Platform | License | Notes | AI Integration Point |
|----------|---------|-------|----------------------|
| **Prebid.js** | Apache-2.0 | [prebid/Prebid.js](https://github.com/prebid/Prebid.js) ~11k | Header bidding framework; AI bid optimization agents; contextual targeting models |
| **OpenRTB** Python | Apache-2.0 | [openrtb/openrtb](https://github.com/openrtb/openrtb) | Protocol library for agentic ad buying/selling; Fox/Disney agentic stack foundation |

## Broadcast & Production Tools

| Platform | License | Repo | AI Integration Point |
|----------|---------|------|----------------------|
| **Flowblade** | GPL-3.0 | [jliljebl/flowblade](https://github.com/jliljebl/flowblade) ~2.4k | Linux NLE; AI cut-detection, scene segmentation plugins |
| **Shotcut** | GPL-3.0 | [mltframework/shotcut](https://github.com/mltframework/shotcut) ~11k | Cross-platform NLE; scriptable via MLT framework; AI scene analysis integration |
| **FFmpeg** | LGPL/GPL | [FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg) ~48k | Foundation of all video pipelines; Whisper + AI models wrap FFmpeg; must-know for M&E |

## Recommended AI-on-Platform Patterns

1. **MediaCMS + Whisper + Llama** — self-hosted video CMS with AI transcription and summarization at ingest
2. **Ghost + LangGraph** — editorial content generation agent with human approval gate before publish
3. **PeerTube + Whisper + GPT** — federated video platform with automatic CC and content moderation
4. **Prebid.js + LangGraph** — agentic header bidding optimization layer on OSS ad-tech stack
5. **Pimcore + CLIP/BLIP** — AI-powered asset tagging and semantic search for DAM workflows

---
*AGPL platforms (MediaCMS, PeerTube, Pimcore community) require careful architecture: keep AI layer as a separate service to avoid AGPL contagion into proprietary code.*
*Globant-safe licenses for direct incorporation: MIT, Apache-2.0, BSD, LGPL (when used as library).*
