# Vertical Platforms — Media & Entertainment

> Real open-source platforms that can be deployed and customized with AI on top. These are the foundations for client-facing media solutions.

---

## Video On Demand (VOD) & CMS

| Platform | Repo | License | Stars | Description | AI Extension Surface |
|----------|------|---------|-------|-------------|----------------------|
| **MediaCMS** | [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | AGPL-3.0 | 2.5k+ | Modern video and media CMS (Python/Django + React); REST API, HLS streaming, video encoding, search, SSO, and fine-grained access control | Hook Whisper into the upload pipeline for auto-transcription; add FAISS semantic search over video embeddings; integrate Open-Sora for AI trailer generation |
| **PeerTube** | [Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | AGPL-3.0 | 13k+ | Federated ActivityPub video hosting (Node.js); WebTorrent P2P delivery; instances federate across the fediverse; the leading self-hosted YouTube alternative | Plugin API supports custom transcription, auto-chapter generation, and AI content moderation; REST API for metadata enrichment |
| **Tube Archivist** | [tubearchivist/tubearchivist](https://github.com/tubearchivist/tubearchivist) | GPL-3.0 | 6k+ | YouTube archive and media manager (Django + Elasticsearch); indexes channels, auto-downloads, and organizes video libraries | Whisper integration for transcript indexing; Elasticsearch powers semantic search over archived content |

## Live Streaming

| Platform | Repo | License | Stars | Description | AI Extension Surface |
|----------|------|---------|-------|-------------|----------------------|
| **Owncast** | [owncast/owncast](https://github.com/owncast/owncast) | MIT | 10k+ | Self-hosted live streaming and chat server (Go + React); RTMP ingest, HLS output, social authentication; MIT makes it fully white-labelable | Plug WhisperLive for real-time closed captions; add AI moderation on the chat WebSocket; overlay real-time analytics |
| **Restreamer** | [datarhei/restreamer](https://github.com/datarhei/restreamer) | Apache 2.0 | 3k+ | Real-time video streaming and re-streaming (Node.js + Docker); supports RTMP/SRT/HLS to any destination; REST API for programmatic control | Middleware for AI scene detection, automated highlight clipping, and dynamic ad insertion |

## Media Server & Library Management

| Platform | Repo | License | Stars | Description | AI Extension Surface |
|----------|------|---------|-------|-------------|----------------------|
| **Jellyfin** | [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) | GPL-2.0 | 40k+ | Free media server for personal and organizational libraries; hardware transcoding (Intel QSV, NVIDIA NVENC); Roku, AppleTV, Android clients | Plugin ecosystem for AI-powered metadata enrichment, face recognition tagging, and content recommendation; REST API for external integrations |
| **Navidrome** | [navidrome/navidrome](https://github.com/navidrome/navidrome) | GPL-3.0 | 12k+ | Modern music streaming server (Go); Subsonic API-compatible; fast, lightweight, and self-contained | Integrate with AI music tagging (genre, mood, BPM), Whisper for lyrics generation, and recommendation engines |
| **Audiobookshelf** | [advplyr/audiobookshelf](https://github.com/advplyr/audiobookshelf) | GPL-3.0 | 8k+ | Self-hosted audiobook and podcast server (Node.js); automatic podcast refresh, progress sync, multi-user | Auto-chaptering with Whisper + LLM summarization; AI-powered show notes generation from transcripts |

## Enterprise / Academic Video Management

| Platform | Repo | License | Stars | Description | AI Extension Surface |
|----------|------|---------|-------|-------------|----------------------|
| **Opencast** | [opencast/opencast](https://github.com/opencast/opencast) | Apache 2.0 | 1.5k+ | Enterprise video management system for universities and broadcasters (Java); automated recording, encoding, distribution, and scheduling | Production-grade Whisper integration for lecture/event transcription; AI-powered indexing for search; used by 300+ universities worldwide |
| **Open Streaming Platform** | [Open-Streaming-Platform/Open-Streaming-Platform](https://github.com/Open-Streaming-Platform/Open-Streaming-Platform) | MIT | 1k+ | Self-hosted live and on-demand streaming platform (Python/Flask); Twitch-like interface with adaptive bitrate HLS and VOD recording | AI clip extraction, automated highlight generation, real-time transcription via WhisperLive |

## Digital Asset Management (DAM)

| Platform | Repo | License | Stars | Description | AI Extension Surface |
|----------|------|---------|-------|-------------|----------------------|
| **ResourceSpace** | [resourcespace/resourcespace](https://github.com/resourcespace/resourcespace) | BSD | 0.5k+ | Open-source DAM platform (PHP); metadata management, collections, workflow, sharing | AI auto-tagging via CLIP embeddings; Whisper transcript indexing for video assets; similarity search |
| **Bynder (OSS alternative: Razuna)** | self-hosted | Apache 2.0 | — | Razuna: open-source DAM for images, video, audio; metadata, collections, CDN integration | Computer vision tagging, AI metadata generation, duplicate detection via perceptual hashing |

---

## Platform Selection Guide

| Client Need | Recommended Platform | License Risk |
|-------------|----------------------|--------------|
| Private VOD portal (internal comms) | MediaCMS or Jellyfin | AGPL/GPL — keep customizations internal |
| Public federated video hosting | PeerTube | AGPL — can deploy as-is |
| White-label live event platform | Owncast | MIT — fully commercializable |
| University / conference recordings | Opencast | Apache 2.0 — fully commercializable |
| Music streaming for media brand | Navidrome | GPL-3.0 — keep customizations internal |
| Social short-form content platform | OpenShorts | MIT — fully commercializable |
