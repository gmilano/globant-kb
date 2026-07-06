# 🏭 Vertical Solutions — Media & Entertainment

> Existing open platforms to customize with AI. Strategy: start with a functional system, add the agentic layer on top.
> Last updated: 2026-07-06

## Recommended Platforms

### Video & Media Streaming

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| **Jellyfin** | GPL-2.0 | [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) | .NET, React | 40k+ stars; full-featured self-hosted media server for VOD streaming; no vendor lock; REST API for AI integration; metadata, transcoding, mobile clients included |
| **PeerTube** | AGPL-3.0 | [Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | Node.js, Vue | Federated YouTube alternative; instances auto-federate via ActivityPub; used by universities, broadcasters, public media; plugin system for AI overlays |
| **Owncast** | MIT | [owncast/owncast](https://github.com/owncast/owncast) | Go | Self-hosted live streaming + chat; OBS push → browser viewer; MIT = fully commercial; perfect base for branded live streaming with AI commentary/moderation |
| **MediaCMS** | AGPL-3.0 | [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | Python/Django, React | Full-featured video CMS + REST API; S3 storage; HLS adaptive streaming; search; ideal base for internal media portals with AI search/discovery layer |
| **SRS (Simple Realtime Server)** | MIT | [ossrs/srs](https://github.com/ossrs/srs) | C++ | RTMP, WebRTC, HLS, SRT; real-time streaming engine; MIT; used in broadcast infrastructure; low-latency live events; AI can hook into ingest pipeline |

### Digital Asset Management (DAM)

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| **ResourceSpace** | BSD-style | [montala-limited/resourcespace](https://github.com/montala-limited/resourcespace) | PHP | Open source DAM; metadata, versioning, collections, access control; foundation for AI-powered asset tagging and retrieval |
| **OpenMetadata** | Apache-2.0 | [open-metadata/OpenMetadata](https://github.com/open-metadata/OpenMetadata) | Java, Python | Unified metadata platform; use as backbone for cataloguing all media assets + AI lineage tracking |

### Content Management & Publishing

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| **Ghost** | MIT | [TryGhost/Ghost](https://github.com/TryGhost/Ghost) | Node.js | Professional publishing platform; built-in Members API; Webhook support; AI content generation pipelines integrate naturally via API |
| **Strapi** | MIT† | [strapi/strapi](https://github.com/strapi/strapi) | Node.js | Headless CMS with REST + GraphQL API; ideal API layer for AI-powered content generation feeding to any frontend |
| **Directus** | BSL | [directus/directus](https://github.com/directus/directus) | Node.js, Vue | Data platform + headless CMS; strong REST/GraphQL API; AI automation via Flows |

†Strapi Community Edition is MIT; Enterprise Edition is commercial.

### Broadcast & Playout

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| **Restreamer** | Apache-2.0 | [datarhei/restreamer](https://github.com/datarhei/restreamer) | Node.js, Docker | Multi-destination live streaming; RTMP/SRT/HLS; AI scene detection hooks |
| **Caspar CG** | GPL-3.0 | [CasparCG/server](https://github.com/CasparCG/server) | C++ | Professional broadcast playout server used in live TV; extensible with AI graphics generation |

---

## How to Add AI on Top

```
[Open Platform (Jellyfin / PeerTube / MediaCMS / Ghost)]
          ↓ REST API / Webhook / Plugin hook
[AI Integration Layer (LangGraph agent / FastAPI adapter)]
          ↓
[Specialized Media AI Tools]
   ├── Transcription: openai/whisper + whisper.cpp
   ├── Video Generation: Wan2.1 / CogVideoX / Open-Sora
   ├── Audio: AudioCraft / Demucs / Bark
   ├── Image: InvokeAI / AUTOMATIC1111 / MediaPipe
   └── Search: Weaviate / Qdrant + CLIP embeddings
          ↓
[Conversational UI / API exposed to client]
```

### Key integration points per platform:
- **Jellyfin**: Plugin API → auto-tag assets with CLIP; AI-powered search via Weaviate
- **PeerTube**: Webhook on video upload → auto-transcribe (Whisper) → auto-translate subtitles → auto-thumbnail
- **Owncast**: Stream chat → AI moderation → real-time overlay generation
- **MediaCMS**: REST API → batch AI metadata enrichment for existing asset library
- **Ghost**: Content API + Webhooks → LLM draft generation + SEO optimization agent
