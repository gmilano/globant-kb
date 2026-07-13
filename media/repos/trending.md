# Trending Repos — Media & Entertainment

> GitHub trending repositories in media and entertainment AI — July 2026.
> Last updated: 2026-07-13 (v16)

## Trending This Week

| Repo | License | Stars | What's Happening |
|------|---------|-------|------------------|
| **[resemble-ai/chatterbox](https://github.com/resemble-ai/chatterbox)** | **MIT** | **~25k** | **NEW v16: Resemble AI's SoTA open TTS hit 25k stars and 1M+ HuggingFace downloads. Chatterbox Turbo (350M, 75ms latency) is the first open TTS model fast enough for real-time broadcast use cases. Multilingual V3 supports 23+ languages with zero-shot voice cloning. MIT license = commercial self-hosting. Perth watermarker bakes C2PA-compatible provenance into every audio file — critical for EU AI Act compliance (Aug 2, 2026).** |
| **[ossrs/srs](https://github.com/ossrs/srs)** | **MIT** | **~29k** | **NEW v16: SRS (Simple Realtime Server) — RTMP/WebRTC/HLS/SRT/MPEG-DASH live streaming infrastructure, MIT license. SRS 8.0 (codename Kai) in active development for end of 2026. Growing adoption as AI intelligence layers (real-time Whisper.cpp transcription, Claude topic tagging, Chatterbox Turbo live dubbing) hook into the SRS stream pipeline.** |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | Apache-2.0 | ~22k | Q2 2026 breakout — HeyGen's HTML-to-video engine for AI agents. Write HTML, render MP4: agents compose videos the same way they write code. 20 loadable skills, integrates with Claude Code / Cursor / Codex. No timeline editors, no per-frame API costs. Most-starred new Apache-2.0 media repo of Q2 2026. |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | AGPL-3.0 | ~45k | Topped GitHub Trending in June 2026. World's first agentic video production system — 12 pipelines, 52 tools, 500+ agent skills. New "documentary montage" and "cinematic trailer" pipelines added in v0.4. |
| [open-mmlab/FoleyCrafter](https://github.com/open-mmlab/FoleyCrafter) | Apache-2.0 | ~2.5k | IJCV 2026 publication; ComfyUI node added Jul 2026. Video-to-audio: feed silent video → get synchronized, realistic sound effects. Semantic adapter + temporal controller for frame-accurate audio-video alignment. Closes the automated post-production loop. |
| [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | MIT | ~9k | Self-hosted studio: 200+ image and video models, no content filters. Gained 7,500+ stars within days of viral launch (April 2026). Adding Lip Sync Studio and Cinema mode. |
| [deepbeepmeep/Wan2GP](https://github.com/deepbeepmeep/Wan2GP) | Apache-2.0 | ~5k | GPU-poor optimized runner for Wan 2.1/2.2, LTX-2, HunyuanVideo, Flux. July 2026 update adds Wan2.2 MoE support. Key enabler for solo creators on consumer hardware. |
| [mediago-dev/mediago-drama](https://github.com/mediago-dev/mediago-drama) | Apache-2.0 | ~250 | Novel-to-short-drama agent pipeline (Chinese-market focus). Text → video one-stop workbench. Gaining stars rapidly as short-form drama market expands in APAC. |
| [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) | Apache-2.0 | ~18k | July 2026: community LoRA hub growing, with style LoRAs, character consistency models, and motion control models — similar ecosystem maturity to SD1.5 in its prime. |
| [Lightricks/LTX-Desktop](https://github.com/Lightricks/LTX-Desktop) | Apache-2.0 | ~2k | Open-source desktop app for LTX-Video. New in June 2026. Lets Mac/Windows users run 4K video generation locally without CLI setup. |
| [Tencent-Hunyuan/HunyuanVideo](https://github.com/Tencent-Hunyuan/HunyuanVideo) | Tencent CL | ~16k | Active community around 480p→720p quality improvements and I2V variants. Growing ComfyUI workflow ecosystem. |
| [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) | Apache-2.0 | **~29k** | **Star surge: up from ~24k (v15) to ~29k (v16). Open-Sora 2.0 (11B) benchmarks on par with HunyuanVideo and Step-Video.** Most-starred Apache-2.0 video generation repo. Ships full training pipeline + inference — unlike Wan2.2 (inference only) this enables custom video model fine-tuning from scratch. Growing LoRA ecosystem for brand and style consistency. Gaining stars as studios want training ownership. |
| [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher) | MIT | ~20k | Autonomous multi-agent research system. Newsroom adoption accelerating in H1 2026 as publishers seek to counter 40% decline in search referrals (Reuters Institute 2026). Powers background research pipelines at BBC, Guardian, and regional newsrooms. |
| [stanford-oval/storm](https://github.com/stanford-oval/storm) | MIT | ~25k | Stanford LLM article generation. Referenced by Reuters Institute 2026 as a foundational pattern for AI-assisted long-form journalism. Modular: runs with any LLM and search backend. July 2026: active community adding video and podcast output adapters. |
| [hexgrad/Kokoro-82M](https://github.com/hexgrad/Kokoro-82M) | Apache-2.0 | ~8k | Lightweight CPU-viable TTS. July 2026 uptick as LATAM media teams compare against ElevenLabs API costs. Spanish/Portuguese support + 54 voice presets + Apache-2.0 = preferred open TTS for commercial media production in Brazil and LATAM. |

## Ecosystem Signals

### Agent-Native Video Pipeline Maturing
HyperFrames (22k★, Apache-2.0) represents the clearest signal in Q2 2026: LLM coding agents can now generate production-ready video by writing HTML compositions — the same workflow as generating a web page. No timeline editors, no cloud API per-frame costs, no proprietary format. This unlocks video generation inside agentic coding loops (Claude Code, Cursor, Codex) for the first time at scale.

### LoRA and Fine-Tune Markets
Open video model ecosystems are developing LoRA marketplaces (similar to CivitAI for images):
- Wan2.2 has the most active LoRA community as of July 2026
- LTX-Video IC-LoRA (V2V) is seeing rapid adoption for brand consistency and style transfer
- Character consistency LoRAs are the fastest-growing category — solves the biggest pain point in AI video production

### V2A (Video-to-Audio) Segment Emerging
FoleyCrafter's IJCV publication and ComfyUI integration (July 2026) signals V2A is maturing from research to production use. Combined with LTX-2.3 native audio sync, automated audio post-production is now a realistic pipeline target.

### Newsroom AI Segment Opening
GPT-Researcher (MIT, ~20k★) and Stanford STORM (MIT, ~25k★) represent a new segment: open-source tools for automating the journalism research and drafting workflow. Reuters Institute 2026 confirms the demand signal — 75% of news executives expect large agentic AI impact. Regional newsrooms (especially LATAM) are the underserved opportunity; they face the same economics as large publishers at 1/10th the budget.

---
*Auto-updated by ingest pipeline.*
