# 📈 Trending AI Agents — Media & Entertainment

> What's new and gaining traction this week. Updated: 2026-07-09 (v8 — HunyuanVideo-Foley, Versus AI interactive streaming, CTV market signal, ComfyUI 106k★)

## Breakout Projects (June–July 2026)

### 1. OpenMontage — Agentic Video Production Goes Viral
- **Repo**: [Open-Montage/OpenMontage](https://github.com/Open-Montage/OpenMontage) (MIT)
- **Stars**: ~3k (rapid growth)
- **What it is**: The first open-source, agentic video production system built to work with AI coding assistants (Claude Code, Cursor). Describes video in plain language → agent handles research, scripting, asset generation, editing, composition.
- **Why it matters**: 12 named pipelines (documentary, screen demo, LMS, short-form), 52 registered tools, 500+ agent skills. Supports free stock footage + open archives for zero-cost motion clips.
- **Globant angle**: Instant differentiator for media/broadcast clients who want AI-native production without rebuilding their stack.

### 2. ViMax (HKUDS) — Multi-Agent Video Framework
- **Repo**: [HKUDS/ViMax](https://github.com/HKUDS/ViMax) (MIT)
- **Stars**: 1.1k+ (growing fast since May 2026 paper)
- **What it is**: Director + Screenwriter + Producer + Video Generator all-in-one. Orchestrates multi-shot narrative video with character/scene consistency.
- **Why it matters**: Solves the hardest video generation problem — maintaining visual identity across shots. Academic-grade architecture from HKU Data Science lab.
- **Globant angle**: Foundation for branded content automation (ads, explainer videos, training content).

### 3. vita-epfl/Stable-Video-Infinity — ICLR 2026 Oral
- **Repo**: [vita-epfl/Stable-Video-Infinity](https://github.com/vita-epfl/Stable-Video-Infinity)
- **License**: Apache-2.0
- **What it is**: Infinite-length video generation using error recycling to maintain coherence. ICLR 2026 Oral paper — highest visibility academic track.
- **Why it matters**: Removes the "30-second wall" on AI video. Long-form content (documentaries, courses, serialized video) is now tractable.

### 4. Wan 2.2 — Apache 2.0 MoE Video Model
- **Repo**: [Wan-Video/Wan2.1](https://github.com/Wan-Video/Wan2.1)
- **License**: Apache-2.0
- **What it is**: Mixture-of-Experts video generation, updated to 2.2 for 24GB GPU deployment. Image conditioning, high resolution, strong motion quality.
- **Why it matters**: One of two major Apache-2.0 licensed video gen models (with Mochi 1). Clean license for commercial builds.

### 5. CogVideoX 1.5 — Best Developer-Friendly Video Model
- **Repo**: [THUDM/CogVideo](https://github.com/THUDM/CogVideo)
- **License**: Apache-2.0
- **Stars**: 12.5k
- **What it is**: 5B and 2B text/image-to-video models from Tsinghua. ComfyUI native integration; excellent documentation and fine-tuning support.
- **Milestone**: 12.5k stars as of July 2026 — fastest-growing open video model.

### 6. LTX-Video 2.3 — Real-Time Generation
- **Repo**: [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video)
- **License**: Apache-2.0
- **Stars**: ~6k
- **What it is**: Generates 30fps video at 1216×704 faster than real time on A100. Latency-optimized for interactive applications.
- **Why it matters**: First model to break the real-time barrier — enables live/interactive video generation.

## 4th-Pass Breakouts (July 2026)

### 7. LTX-2.3 — First Open-Source 4K Audio+Video in a Single Pass
- **Repo**: [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) (Apache-2.0)
- **Stars**: ~8k (launched Jan 6, 2026; 2.3 update Mar 5, 2026)
- **What it is**: The first DiT-based open-source model that generates native 4K video with synchronized audio in one forward pass — no separate audio step. LTX-2.3 is ~22B parameters with IC-LoRA adapters, camera control LoRAs, and FP8 quantization for 32GB GPUs. Includes LTX Desktop editor for fully local workflows.
- **Why it matters**: Ends the "silent video" era for open-source. Every prior open model (CogVideoX, Wan, HunyuanVideo) required separate audio generation. LTX-2 collapses that to one step.
- **Globant angle**: Production-ready for client video generation pipelines — 4K output, commercial-safe Apache-2.0 license, fine-tuning supported.

### 8. Open-Generative-AI — Self-Hosted 200-Model Studio Goes Viral
- **Repo**: [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) (MIT)
- **Stars**: ~22.6k (April 2026 viral launch, +7.5k in days)
- **What it is**: Self-hosted studio with 200+ models: Image, Video, Lip Sync, and Cinema studios. Supports Flux, Midjourney-compatible, Kling, Sora, Veo — all from one interface. One-click installers for macOS/Windows/Linux. No subscription required.
- **Why it matters**: Framed as "the end of subscription AI platforms" — hit GitHub Trending in April 2026. Shows the consumer demand for self-hosted, no-filter alternatives.
- **Globant angle**: Reference architecture for building branded AI creative studios on top of open models for media clients.

### 9. SkyReels-V2 — Infinite-Length Human-Centric Video
- **Repo**: [SkyworkAI/SkyReels-V2](https://github.com/SkyworkAI/SkyReels-V2) (Apache-2.0)
- **Stars**: ~4.5k
- **What it is**: Infinite-length film generation using Autoregressive Diffusion-Forcing (ADF). SkyReels-V1 is the human-centric base (fine-tuned on HunyuanVideo). V2 adds infinite temporal extension — generates arbitrarily long videos with consistent characters.
- **Why it matters**: Complements ViMax for the long-form narrative use case. Human-centric focus makes it ideal for actor-driven content, interviews, documentary.

### 10. MAGI-1 (Sand AI) — 24B Autoregressive Video
- **Repo**: [SandAI-org/MAGI-1](https://github.com/SandAI-org/MAGI-1) (Apache-2.0)
- **Stars**: ~3.5k
- **What it is**: 24B parameter autoregressive denoising model. Generates video chunk-by-chunk (24 frames/chunk), enabling streaming generation — you can see frames as they produce. T2V, I2V, V2V modes. A 4.5B lightweight variant for low-VRAM deployment.
- **Why it matters**: Autoregressive architecture enables streaming output — ideal for interactive applications and progressive generation in broadcast workflows.

## v7 Breakouts (July 8, 2026)

### 14. Wan 2.7 — First Open Video Model with "Thinking Mode"
- **Repo**: [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) (Apache-2.0)
- **Stars**: ~18k (cumulative Wan-Video org); released April 2026
- **What it is**: Wan 2.7 inserts an explicit "Thinking Mode" reasoning step before generation — the model builds a compositional plan (spatial relationships, motion logic, prompt intent) before denoising begins. Result: fewer failed clips, better prompt adherence, less iteration.
- **Key features**: 1080p/15s, T2V/I2V, native audio, first/last-frame control, 5000-char prompts, Apache-2.0 open weights on HuggingFace/ModelScope.
- **Globant angle**: Default open-source video model recommendation for new projects from H2 2026; storyboard-driven workflows with first/last frame control.

### 15. KrillinAI — AI-Agent-Native Video Dubbing
- **Repo**: [krillinai/KrillinAI](https://github.com/krillinai/KrillinAI) (Apache-2.0)
- **Stars**: ~10.4k (10k milestone reached in ~6 months)
- **What it is**: Full video dubbing pipeline (download → transcribe → translate → TTS → reformat → cover) with each stage exposed as a composable AI Agent `skill`. Claude or any agent can orchestrate autonomous localization.
- **Languages**: 100+; optimized for YouTube/TikTok/Bilibili/Shorts.
- **Globant angle**: Drop-in Pattern 4 upgrade — LATAM dubbing at $0.50/minute without a translation team.

## 5th-Pass Breakouts (July 2026)

### 11. YuE — Open-Source Full-Song Generation (Lyrics → Complete Song)
- **Repo**: [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) (Apache-2.0)
- **Stars**: ~6.1k
- **What it is**: The first widely-adopted open-source foundation model for full-song generation from lyrics. Input: lyrics + style prompt → output: multi-minute song with vocal track + accompaniment. Think Suno.ai but open, Apache-2.0, self-hostable.
- **Why it matters**: Every prior open-source music generation tool (AudioCraft/MusicGen) generates instrumental or short clips. YuE generates complete, cohesive songs with singing. This is the capability that content studios need for original soundtracks, jingles, branded content.
- **Globant angle**: Replace expensive sync licensing for short-form content with AI-original songs. LATAM Portuguese/Spanish lyric support makes it ideal for regional campaigns.

### 12. Podcastfy — Multi-Modal Content to Podcast (NotebookLM Rival)
- **Repo**: [souzatharsis/podcastfy](https://github.com/souzatharsis/podcastfy) (Apache-2.0)
- **Stars**: ~3k (explosive growth: "the open-source version of the most popular product Google built in the last decade")
- **What it is**: Python library + app that transforms any content (URLs, PDFs, YouTube videos, text, images) into AI audio conversations. Supports 100+ LLM backends and major TTS providers (ElevenLabs, Google, OpenAI). Shorts (2-5 min) and longform (30+ min) modes. Multilingual.
- **Why it matters**: Google NotebookLM's podcast feature is wildly popular but proprietary and limited. Podcastfy replicates it with full control over LLM, voice, language, and format. The content-to-podcast pipeline is the most demanded media AI workflow of 2026.
- **Globant angle**: Any client with a content library (news, research, training materials) can instantly launch a podcast channel using Podcastfy + Coqui TTS for LATAM Spanish/Portuguese.

### 13. NeuralNoise — Multi-Agent Podcast Studio
- **Repo**: [leopiney/neuralnoise](https://github.com/leopiney/neuralnoise) (MIT)
- **Stars**: ~800
- **What it is**: Multi-agent AI podcast studio where agents work as a team: analyst → writer → audio engineer. Each "worker" in the studio has a specialized role. Higher quality than single-agent approaches for complex content.
- **Why it matters**: Complements Podcastfy for complex multi-segment shows. Good for client-facing demos of agent orchestration in media workflows.

## v8 Breakouts (July 9, 2026)

### 16. HunyuanVideo-Foley — Synchronized Foley Audio from Video
- **Repo**: [Tencent-Hunyuan/HunyuanVideo-Foley](https://github.com/Tencent-Hunyuan/HunyuanVideo-Foley) (Tencent Hunyuan Community License)
- **Stars**: ~2k (+ ComfyUI node repos: `vantagewithai/Vantage-HunyuanFoley`, `if-ai/ComfyUI_HunyuanVideoFoley`)
- **Released**: Aug 2025 (base); Sep 2025 (XL model with offload)
- **What it is**: Multimodal diffusion model that generates frame-synchronized, high-fidelity foley audio (SFX, music, vocals) from video + text prompt in a single pass. Self-developed 48kHz audio VAE achieves professional-grade quality. Benchmarks: best across ALL evaluation metrics vs. prior foley models. XL model supports GPU offload for lower-VRAM inference.
- **Why it matters**: Closes the critical gap in the open-source media stack. Before Foley, the pipeline was: generate video → manually add SFX in DAW (expensive human labor) or use AudioCraft (not video-synchronized). Foley makes silent-video-to-finished-media a one-click operation for short-form content producers.
- **ComfyUI integration**: `vantagewithai/Vantage-HunyuanFoley` is a ComfyUI custom node — plug-in to any existing ComfyUI video pipeline.
- **Globant angle**: Use in Pattern 10 (see compose/patterns.md). Upgrade the short-form content factory (Pattern 2) from AudioCraft BGM to synchronized foley. Especially valuable for LATAM social media clients producing high-volume shorts where post-production audio is the cost bottleneck.

### 17. Versus AI — Interactive AI Overlay for Streaming (Market Signal, Jul 2026)
- **Company**: Versus AI (stealth → public July 2026)
- **Status**: Proprietary, not open source — but important market intelligence
- **Investors**: Jeffrey Katzenberg, former Google CEO Eric Schmidt, LinkedIn co-founder Reid Hoffman, former Disney exec & TikTok CEO Kevin Mayer, TV producer Mark Burnett
- **Partners**: Disney+, Paramount+, HBO Max, NFL, Lionsgate, Reddit
- **What it is**: AI overlay system for streaming — viewers point phone at screen to receive real-time interactive elements: games, trivia, polls, predictions, leaderboards, prizes. Works with live sports, series, digital content. "Second-screen" AI engagement layer built natively into streamer apps.
- **Why it matters**: The $42B+ global CTV ad market (2026) is moving toward interactive AI formats. Shoppable/interactive CTV converts 5× better than standard video ads. Versus shows the product category: **real-time AI engagement layers over live and on-demand content**. As a closed product it's a competitive signal — but the pattern is buildable on open infrastructure.
- **Globant angle**: Pattern 11 (compose/patterns.md) — build the open-source equivalent of Versus AI for LATAM sports/media clients using Owncast (live stream) + Claude API (trivia/game generation) + Redis pub/sub (real-time push to mobile app). PoC: 4-6 weeks.

## Audio Ecosystem Moves

### faster-whisper now default for production
SYSTRAN/faster-whisper has become the production standard over openai/whisper due to:
- 4× speed improvement with CTranslate2
- INT8 quantization for CPU deployment
- Native speaker diarization integration
- WhisperX builds on top of it for word-level timestamps

### AudioCraft MusicGen fine-tuning wave
Meta's AudioCraft (facebookresearch/audiocraft) seeing large spike in fine-tuning activity:
- Broadcast stations training on house music style
- Game studios generating procedural soundtracks
- Short-video platforms generating licensed-free BGM at scale

## Numbers to Watch

| Metric | Value | Source |
|--------|-------|--------|
| Monthly active users, AI video platforms | 124M+ (Jan 2026) | Industry reports |
| AI video generation CAGR | 36.2% | Coherent Market Insights |
| LATAM total media market 2026 | $65B (+10.7% YoY) | Omdia Jan 2026 |
| Brazil FAST revenue (3rd global) | $152M | Omdia |
| Open source AI video models available | 31+ | AIFreeForever survey |
| OTT revenues 2025 | $226.6B (+13.9% YoY from $199B) | Industry tracking |
| AI M&E market 2026 | $35.77B → $256B by 2035 | SNS Insider May 2026 |
| **GenAI in M&E (specific) 2026** | **$3.16B → $8.06B by 2030, CAGR 26.4%** | **Globe Newswire Jul 7, 2026** |
| **GenAI Content Creation (broader) 2025→2030** | **$21.53B → $77.22B (CAGR 29.2%)** | **Globe Newswire Jul 7, 2026** |
| Morgan Stanley AI production cost savings | Up to 30% reduction in TV/film prod. costs | Morgan Stanley 2026 |
| AI video production cost per minute | ~$400 (↓91% vs traditional) | Industry 2026 |
| **Global CTV ad spend 2026** | **$42B+** | **Interactive CTV Trends 2026** |
| **Interactive CTV conversion vs standard video** | **5× higher conversion rate** | **CTV advertising data 2026** |
| KrillinAI stars (July 2026) | 10.4k | GitHub |
| **ComfyUI stars (July 2026)** | **106k+** (↑ from 75k at v7) | **GitHub** |
| Global sports rights revenue 2026 | $67B+ (streaming: $14.2B, +7% YoY) | PwC Outlook 2026 |
| AI exhibitors at NAB 2026 | ~2× vs prior year | NAB 2026 show floor |
| C2PA member organizations | 140+ (including Canon, Nikon, Leica) | C2PA Jan 2026 |
| Versus AI streaming partners (Jul 2026) | Disney+, Paramount+, HBO Max, NFL | Deadline Jul 2026 |

---
*Updated 2026-07-07. Focus on Apache 2.0 / MIT for commercial builds.*
