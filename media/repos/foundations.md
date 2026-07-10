# Foundational Repos — Media & Entertainment

> Open source foundations to build on. Active communities, permissive licenses.
> These are the "raw materials" for any media/entertainment AI solution.
> Last updated: 2026-07-10 (v11)

## Tier 1: Production-Grade Foundations

| Repo | License | Stars | Description | AI Entrypoint |
|------|---------|-------|-------------|---------------|
| [openai/whisper](https://github.com/openai/whisper) | MIT | ~104k | Robust multilingual speech recognition via large-scale weak supervision. Word-level timestamps, speaker detection. The universal transcription layer for media. | Direct API call; pipe JSON transcript to any LLM for summarization, search indexing, subtitle generation |
| [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | MIT | ~51k | C/C++ port of Whisper. Runs on CPU, Apple Silicon, CUDA. Real-time capable. For edge deployment (broadcast encoder, camera, mobile). | Compile, pipe audio → JSON transcript → agent |
| [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) | Apache-2.0 | ~27.5k | Leading creative engine for Stable Diffusion. Node canvas, ControlNet, IP-Adapter, multi-model, REST API. Industry standard for AI-assisted image/video pre-viz. | REST API at `/api/v1/generate`; nodes accept JSON; full workflow automation via API |
| [Sanster/IOPaint](https://github.com/Sanster/IOPaint) | Apache-2.0 | ~23.3k | Image inpainting with SOTA models. Remove objects, defects, watermarks. Post-production cleanup automation. | Python API; batch process via CLI; agent can call to auto-remove unwanted elements |
| [IDEA-Research/Grounded-Segment-Anything](https://github.com/IDEA-Research/Grounded-Segment-Anything) | Apache-2.0 | ~17.7k | Grounding DINO + SAM + Stable Diffusion unified. Text-prompted segmentation for VFX, rotoscoping, object replacement. | Python SDK; text prompt → segmentation mask → downstream editing |
| [ossrs/SRS](https://github.com/ossrs/SRS) | MIT | ~26k | Simple, high-efficiency real-time video server. RTMP, WebRTC, HLS, HTTP-FLV, SRT. Production live streaming infrastructure for broadcast and OTT. | SRS HTTP API for stream management; LLM agent can control ingest/egress, transcoding presets |
| [FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg) | LGPL-2.1 | ~48k | The universal media processing backbone. Codec, container, filter, encode/decode, stream. Every AI media pipeline uses FFmpeg at the bottom. | CLI interface; LLM generates ffmpeg commands from natural language (video-use pattern) |
| [gorse-io/gorse](https://github.com/gorse-io/gorse) | Apache-2.0 | ~9k | AI-powered recommender system engine with classical/LLM rankers + multimodal embedding. Go + Redis + PostgreSQL. Drop-in for OTT content recommendations. | REST API; embed as recommendation microservice; LLM ranker adds semantic re-ranking |

## Tier 2: Vertical Platforms as Bases

| Repo | License | Stars | Description | Why It Matters |
|------|---------|-------|-------------|----------------|
| [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | AGPL-3.0 | ~3.5k | Modern full-featured video/media CMS. Python/Django + React. Adaptive streaming, captions, chapters, playlists, REST API, RBAC. | The open YouTube/Vimeo platform — add AI agents on top for auto-tagging, content moderation, SEO optimization |
| [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) | GPL-2.0 | ~40k | Open source media server. Libraries, metadata, transcoding, web/mobile/TV clients. 1,100+ contributors. | Personal/enterprise media server — AI plugin layer for face recognition, scene search, auto-chapters |
| [Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | AGPL-3.0 | ~13k | Decentralized federated video platform (ActivityPub). Self-hosted, peer-to-peer distribution via WebTorrent. | White-label video platform for broadcasters, media companies wanting sovereignty + federation |
| [gorse-io/gorse](https://github.com/gorse-io/gorse) | Apache-2.0 | ~9k | Recommender engine with LLM rankers | OTT personalization, FAST channel curation |
| [ace-step/ACE-Step-1.5](https://github.com/ace-step/ACE-Step-1.5) | Apache-2.0 | ~3k | 4B music generation foundation model. <2s/song A100. Covers, repainting, vocal-to-BGM, 50+ languages. | Open-source Suno/Udio alternative: game audio, ad jingles, show themes, podcast music — no licensing fees |

## Tier 3: Specialized Building Blocks

| Repo | License | Stars | Use Case |
|------|---------|-------|----------|
| [NVIDIA-NeMo/Guardrails](https://github.com/NVIDIA-NeMo/Guardrails) | Apache-2.0 | ~6.5k | LLM content moderation, trust & safety for UGC platforms |
| [jamiepine/voicebox](https://github.com/jamiepine/voicebox) | MIT | ~36.8k | AI voice studio: clone, dictate, create — for dubbing, narration, localization |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | MIT | ~8k | Full agentic video production system (see agents/top.md) |
| [browser-use/video-use](https://github.com/browser-use/video-use) | MIT | ~4.2k | Agent-native video editing via FFmpeg + transcript (see agents/top.md) |
| [HKUDS/ViMax](https://github.com/HKUDS/ViMax) | MIT | ~7.1k | Multi-agent agentic video generation (see agents/top.md) |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
