# 🧩 Composition Patterns — Media & Entertainment

> Concrete recipes combining open-source repos + AI agents into deployable solutions.
> Last updated: 2026-07-06

---

## Pattern 1: Automated Dubbing & Localization Pipeline

**Problem:** Dubbing a 45-min episode costs $50-200K/episode with human studios. AI can reduce this by 80%+ with near-human quality.

**Stack:**
```
Raw Video/Audio
    ↓
[openai/whisper] — transcription + language detection
    ↓
[LLM (Claude / GPT-4) via LangGraph] — translation + lip-sync timing adaptation
    ↓
[suno-ai/bark] — voice synthesis in target language
    ↓
[meituan-longcat/LongCat-Video] — audio-driven lip sync compositing
    ↓
[ffmpeg] — final video mux
    ↓
[PeerTube / Jellyfin] — delivery
```

**Repos:** `openai/whisper`, `suno-ai/bark`, `meituan-longcat/LongCat-Video`, `Chocobozzz/PeerTube`
**Estimate:** 6–10 weeks to MVP for a single language pair
**Commercial note:** All Apache-2.0 / MIT — no licensing friction for client delivery

---

## Pattern 2: Agentic Short-Form Content Pipeline (ViMax Pattern)

**Problem:** Brands and studios need to produce 10-50 short videos/week. Manual production can't scale.

**Stack:**
```
Creative Brief / Script Prompt
    ↓
[ViMax — HKUDS/ViMax] — Director + Screenwriter + Producer agents
    ├── Scriptwriting agent (LangGraph + Claude)
    ├── Storyboarding agent (InvokeAI for frame generation)
    └── Production agent (Wan2.1 / CogVideoX for video synthesis)
    ↓
[AudioCraft / Bark] — background music + voiceover
    ↓
[Demucs] — audio mixing / stem separation if using licensed music
    ↓
[Ghost CMS API] — publish with auto-generated SEO metadata
    ↓
[Social distribution agent] — X, Instagram, YouTube via APIs
```

**Repos:** `HKUDS/ViMax`, `Wan-Video/Wan2.1`, `invoke-ai/InvokeAI`, `facebookresearch/audiocraft`, `TryGhost/Ghost`
**Estimate:** 8–14 weeks for full pipeline; 4 weeks for ViMax-only proof of concept
**GPU requirement:** 24GB VRAM recommended (Wan 2.2 14B); 8GB workable (Wan 2.2 1.3B)

---

## Pattern 3: Live Broadcast AI Overlay System

**Problem:** Sports broadcasters and live event producers need real-time graphics, stats overlays, and AI commentary without large editorial teams.

**Stack:**
```
Live Video Stream (RTMP/SRT)
    ↓
[ossrs/srs] — live ingest + HLS distribution
    ↓
[whisper.cpp — real-time] — live speech-to-text for commentary
    ↓
[mediapipe] — real-time player tracking / pose detection
    ↓
[LangGraph agent] — stats lookup + commentary generation (Claude)
    ↓
[CasparCG] — graphics playout (lower thirds, scores, replays)
    ↓
[owncast/owncast] — delivery + live chat (AI moderation layer)
    ↓
[content-checker] — real-time chat moderation
```

**Repos:** `ossrs/srs`, `ggml-org/whisper.cpp`, `google-ai-edge/mediapipe`, `CasparCG/server`, `owncast/owncast`
**Estimate:** 10–16 weeks; sports data API integration is the main complexity
**LATAM play:** Copa Libertadores, Liga MX, Brasileirão broadcast modernization

---

## Pattern 4: AI-Powered Media Asset Management (MAM) System

**Problem:** Studios have 10k-1M assets with poor metadata; finding content for re-use takes days.

**Stack:**
```
Asset Upload (video/image/audio/docs)
    ↓
[MediaCMS REST API] — ingest + basic catalog
    ↓
[whisper] — auto-transcription for all video/audio
    ↓
[CLIP embeddings] — visual semantic search via Weaviate/Qdrant
    ↓
[LangGraph agent] — auto-tagging: people, locations, themes, rights flags
    ↓
[OpenMetadata] — unified metadata catalog + lineage
    ↓
[LLM search agent (Claude)] — "find me all clips with crowd scenes at night"
    ↓
[Jellyfin] — delivery / preview
```

**Repos:** `mediacms-io/mediacms`, `openai/whisper`, `open-metadata/OpenMetadata`, `jellyfin/jellyfin`
**Estimate:** 6–10 weeks; scales with asset volume
**ROI:** Search time from days → seconds; enables content re-use revenue

---

## Pattern 5: Creator Self-Service Studio (White-Label)

**Problem:** M&E client wants to offer a self-service AI content creation tool to their creator network without paying Runway/Adobe Creative Cloud at scale.

**Stack:**
```
Creator Browser UI
    ↓
[InvokeAI / Open-Generative-AI] — self-hosted image + video gen
├── Image: InvokeAI (Apache-2.0) with LoRA fine-tuned on brand assets
├── Video: Wan 2.2 (Apache-2.0) for T2V / I2V
└── Audio: AudioCraft MusicGen (MIT) for background music
    ↓
[Strapi headless CMS] — content management + approval workflow
    ↓
[content-checker] — moderation before publish
    ↓
[PeerTube] — distribution to platform or social
```

**Repos:** `invoke-ai/InvokeAI`, `Wan-Video/Wan2.1`, `facebookresearch/audiocraft`, `strapi/strapi`, `Chocobozzz/PeerTube`
**Estimate:** 10–14 weeks for white-label platform; 4 weeks for MVP
**Commercial model:** Client hosts the platform; Globant provides integration + maintenance

---

## Pattern 6: News Intelligence & Automated Publishing Agent

**Problem:** Regional newsrooms are understaffed; need to monitor, summarize, and publish at scale while maintaining editorial quality.

**Stack:**
```
RSS Feeds / Social APIs / Wire Services
    ↓
[LangGraph agent] — ingestion + deduplication + priority scoring
    ↓
[Claude] — summarization + angle identification + fact flagging
    ↓
[Human editorial review] — lightweight approval gate (Slack bot)
    ↓
[Ghost CMS API] — publish + SEO meta generation
    ↓
[Social distribution agent] — X, Instagram, WhatsApp Channels
    ↓
[Whisper + Bark] — auto-generate audio version for podcast feed
```

**Repos:** `TryGhost/Ghost`, `openai/whisper`, `suno-ai/bark`
**Estimate:** 4–8 weeks; editorial review workflow is the key design decision
**LATAM play:** Spanish-language regional news desks; 50+ potential clients in LATAM

---

## Infrastructure Notes (All Patterns)

```yaml
# Minimum recommended infra for Globant media engagements
inference_server:
  gpu: "NVIDIA A10G (24GB) or RTX 4090 (24GB)"
  models:
    video_gen: "Wan-Video/Wan2.1 14B"
    image_gen: "InvokeAI + SDXL"
    transcription: "whisper.cpp large-v3"
    audio_gen: "facebookresearch/audiocraft MusicGen-large"
  
orchestration:
  framework: "LangGraph (Apache-2.0)"
  llm: "Claude claude-sonnet-5 via Anthropic API"
  
storage:
  assets: "S3-compatible (MinIO for self-hosted)"
  vector: "Qdrant or Weaviate"
  
delivery:
  vod: "Jellyfin or MediaCMS"
  live: "ossrs/srs + Owncast"
```
