# Vertical Solutions — Media & Entertainment

> Real platforms that can be customized with AI on top.
> Model: start from something working → add agentic layer.
> Last updated: 2026-07-10 (v11)

## Content Management & Distribution Platforms

| Platform | Repo | License | Stack | AI Customization Entry Point |
|----------|------|---------|-------|------------------------------|
| **MediaCMS** | [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | AGPL-3.0 | Python/Django + React + REST API | Add AI post-processing hooks: auto-tagging with CLIP, Whisper transcription, NeMo content moderation, SEO metadata via Claude. Fork → add `signals/` app → AI microservices behind REST. |
| **PeerTube** | [Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | AGPL-3.0 | Node.js + PostgreSQL + ActivityPub | Plugin API: `registerHook('action:api.video.uploaded')` → trigger Whisper transcription + Gorse recommendation ingest. White-label federated video for broadcasters. |
| **Jellyfin** | [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) | GPL-2.0 | .NET + React | Plugin SDK: add AI-powered metadata enrichment, face recognition, auto-chapter generation, semantic search via Qdrant embeddings. |
| **Owncast** | [owncast/owncast](https://github.com/owncast/owncast) | MIT | Go + Svelte | Webhook integration: live stream events → AI moderator (NeMo) → real-time chat moderation + live transcription → Whisper.cpp. |
| **SRS (Simple Realtime Server)** | [ossrs/SRS](https://github.com/ossrs/SRS) | MIT | C++ + Go callbacks | HTTP callbacks on stream publish/unpublish → AI agent for real-time quality scoring, auto-transcoding triggers, anomaly detection. |

## Recommendation & Personalization

| Platform | Repo | License | Stack | Use Case |
|----------|------|---------|-------|----------|
| **Gorse** | [gorse-io/gorse](https://github.com/gorse-io/gorse) | Apache-2.0 | Go + Redis + PostgreSQL | Drop-in recommender for OTT "What to Watch". LLM ranker adds semantic re-ranking: "shows that feel like Severance but faster-paced". Add to MediaCMS/PeerTube for recommendation sidebar. |
| **Meilisearch** | [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | MIT | Rust | Fast semantic search for media libraries. Embed video descriptions with Claude/OpenAI → vector search → "find scenes with rainy night car chase". |

## Audio / Music Production

| Platform | Repo | License | Stack | Use Case |
|----------|------|---------|-------|----------|
| **ACE-Step 1.5 XL** | [ace-step/ACE-Step-1.5](https://github.com/ace-step/ACE-Step-1.5) | Apache-2.0 | Python + DiT | Music generation for game audio, ad jingles, show themes, podcast intros. LoRA fine-tune on 5-10 songs for brand/genre consistency. Zero licensing fees vs Suno/Epidemic Sound. |
| **Voicebox** | [jamiepine/voicebox](https://github.com/jamiepine/voicebox) | MIT | Next.js + Python | AI voice studio: clone artist voice, generate narration/dubbing, batch localization. LATAM dubbing (PT/ES) at scale. |

## Video Production

| Platform | Repo | License | Stack | Use Case |
|----------|------|---------|-------|----------|
| **OpenMontage** | [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | MIT | Python + agent skills | Full agentic video production studio. 12 pipelines: research → script → asset gen → edit → compose. Build custom "video factory" workflows for social/ads/entertainment. |
| **video-use** | [browser-use/video-use](https://github.com/browser-use/video-use) | MIT | Python + FFmpeg | Integrate into CI/CD for video: PR with raw footage → agent delivers final.mp4 with color grade, subs, no fillers. |

## Content Moderation & Safety

| Platform | Repo | License | Stack | Use Case |
|----------|------|---------|-------|----------|
| **NeMo Guardrails** | [NVIDIA-NeMo/Guardrails](https://github.com/NVIDIA-NeMo/Guardrails) | Apache-2.0 | Python | Programmable content safety for UGC platforms. IORails: parallel content-safety + topic-safety + jailbreak detection. Integrate into MediaCMS upload pipeline or Owncast chat. |
| **Llama Guard 4** | Meta (Llama Community License) | via HuggingFace | Python + vLLM | Multimodal safety model (image + text). Self-host on single A10 GPU, 80-150ms latency. For platforms with image/video uploads needing CSAM/violence detection. |

## How to Customize Any Platform with AI

```
1. Fork the vertical platform repo (MediaCMS / PeerTube / Jellyfin)
2. Identify the right hooks/events (upload webhooks, API callbacks, plugin SDKs)
3. Stand up AI microservices:
   - Transcription: Whisper.cpp (local, fast)
   - Recommendations: Gorse (drop-in REST API)
   - Content moderation: NeMo Guardrails (Python, configurable policies)
   - Music: ACE-Step 1.5 XL (local GPU or cloud)
   - Search: Meilisearch + Claude embeddings
4. Wrap AI services with an orchestration agent (LangGraph / CrewAI)
5. Build conversational UI on top (Claude MCP tool, Slack bot, dashboard)
```

---
*See compose/patterns.md for concrete wiring recipes.*
