# 📈 Trending AI Agents — Media & Entertainment

> What's new and gaining traction this week. Updated: 2026-07-10 (v10 — video-use agent video editor Jul 2 2026; HKUDS/VideoAgent 30+ editing agents; ACE-Step 1.5 XL 4B DiT <2s/song; openreel-video OSS CapCut; Agentic OTT full-stack; OS-level discovery above apps)

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

## v9 Breakouts (July 9, 2026 — second pass)

### 18. OpenMontage — CORRECTION: AGPL-3.0, 36.2k Stars, calesthio/ (Not MIT / 3k)
- **Correct repo**: [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) (AGPL-3.0)
- **Stars**: ~36.2k (hit #1 GitHub Trending June 20, 2026 — not the 3-4k in prior entries)
- **License note**: AGPL-3.0 — prior entries incorrectly listed MIT. AGPL-3.0 requires derivative network-deployed services to publish their modifications. For Globant client builds: deploy OpenMontage as a backend microservice (standard SaaS practice) — this avoids AGPL disclosure for the client's own application layer on top.
- **Key capabilities**: 12 production pipelines (documentary, demo, LMS, short-form, social), 52 registered tools, 500+ SKILL.md agent skills. Works natively with Claude Code, Cursor, Copilot, Windsurf, Codex. Free/local workflows: Piper TTS + FFmpeg + Remotion + Archive.org/NASA/Wikimedia stock footage.
- **Globant angle**: Now validated at 36k★ and #1 Trending — proven demand signal. The AGPL-3.0 change means pair with MIT/Apache-2.0 components for client-facing layers.

### 19. ComfyUI — $30M Raised at $500M Valuation (April 2026)
- **Repo**: [comfy-org/comfyui](https://github.com/comfy-org/comfyui) (GPL-3.0)
- **Stars**: ~89-106k (April → July 2026 range)
- **Funding**: $30M Series A at $500M valuation led by Craft Ventures (April 2026); Pace Capital, Chemistry, TruArrow participating
- **Traction**: 4 million users, 60,000+ community-built nodes, 150,000+ daily downloads
- **Enterprise adoption**: Silverside AI used ComfyUI to power SVEDKA's 2026 Super Bowl commercial — first primarily AI-generated Super Bowl ad. Agencies + ad studios now in production use.
- **Impact**: ComfyUI's node-based model has become the interface layer for all major 2026 video models (LTX-2, Wan 2.7, MAGI-1, CogVideoX all have ComfyUI nodes). $500M valuation at GPL-3.0 shows OSS creative tools are infrastructure-grade businesses.
- **Globant angle**: ComfyUI is the workflow layer for client studios (backend; don't distribute GPL binaries). The 60k+ community nodes mean rapid integration of new models — evaluate nodes before building custom pipelines.

### 20. DiffRhythm 2 — Block Flow Matching for Parallel Song Generation
- **Repo**: [ASLP-lab/DiffRhythm2](https://github.com/ASLP-lab/DiffRhythm2) (Apache-2.0)
- **What it is**: Follow-on to DiffRhythm 1 (first widely-adopted open-source diffusion music model). DiffRhythm 2 introduces Block Flow Matching: splits the audio latent into ~2-second blocks, denoises blocks in parallel, and conditions each block on all prior clean blocks via KV-cached attention. Result: faster inference than autoregressive models (YuE, ACE-Step), comparable quality.
- **Why it matters**: Three viable open-source full-song generation architectures now exist: YuE (autoregressive, lyrics2song), DiffRhythm 2 (parallel Block Flow, speed-focused), ACE-Step (architecturally novel). Each has trade-offs. DiffRhythm 2 wins on speed per song.
- **Globant angle**: For high-volume branded content generation (100+ original BGM tracks/week), DiffRhythm 2's parallel denoising reduces GPU-hours vs YuE. Use YuE for quality-first projects, DiffRhythm 2 for volume.

### 21. VoxCPM2 — 30-Language 48kHz TTS (Apache 2.0)
- **Repo**: [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) (Apache-2.0)
- **What it is**: 2B parameter tokenizer-free TTS model. 30 languages (includes Spanish, Portuguese), creative voice design (character/emotion control), and true-to-life voice cloning. 48kHz output — same audio quality level as HunyuanVideo-Foley. Developed by OpenBMB (Tsinghua + Renmin U).
- **Why it matters**: Apache-2.0 vs Coqui TTS MPL-2.0 license. For projects where MPL-2.0 is a legal concern (some client IP policies), VoxCPM2 offers a clean Apache-2.0 alternative at comparable quality. 30-language coverage is broader than most open TTS models.
- **Globant angle**: Evaluate as a Coqui TTS replacement for LATAM (pt-BR, es-MX) podcast and dubbing pipelines. Apache-2.0 = clean for commercial distribution. Test on Pattern 4 (LATAM Localization) and Pattern 8 (Podcast Studio).

### 22. Disney Vertical Video AI — Archive-to-Mobile Conversion (January 2026 Signal)
- **Company**: Disney (internal product, closed-source)
- **Status**: Proprietary — market signal only
- **What it is**: In January 2026, Disney unveiled an AI tool that converts horizontal video archives into vertical format for TikTok/mobile consumption. AI analyzes each frame for key action/characters and reframes for 9:16 aspect ratio intelligently (not just center-crop).
- **Why it matters**: Every studio/broadcaster/OTT platform with 20+ years of horizontal 16:9 archive content is facing the same problem: 97% of younger audiences consume content on mobile, but archive content is the wrong aspect ratio. Disney's solution validates the product category.
- **Open-source equivalent**: Buildable with `ffmpeg` + `Claude Vision` (frame-analysis for smart-reframe) + Wan 2.7 (re-render sections where simple crop destroys the shot composition). 2-3 week PoC.
- **Globant angle**: High-value quick win for any LATAM broadcaster (Globo, Televisa, Caracol) with legacy archive. Archive-to-mobile is a "unlock existing value" pitch — not net-new AI investment.

## v10 Breakouts (July 10, 2026)

### 23. video-use — Agent-Native Video Editing (browser-use team, July 2, 2026)
- **Repo**: [browser-use/video-use](https://github.com/browser-use/video-use) (MIT)
- **Stars**: ~4,200 (GitHub Trending, July 2026)
- **What it is**: Drop raw footage in a folder, chat with Claude Code → get final.mp4. The LLM never watches the video directly — it reads it through two efficient layers: (1) a word-level transcript from ElevenLabs Scribe (with diarization + audio events), and (2) a handful of PNG keyframes. This reduces token consumption from ~45M (raw video frames) to ~12KB of text. The agent then executes: filler-word removal, dead-space cuts, auto color grade, 30ms audio fades, subtitle burning, and animation overlays (via HyperFrames/Remotion/Manim/PIL).
- **Why it matters**: Extends the browser-use ecosystem into video. "Editor's agent" vs OpenMontage's "producer's agent" — together they cover the full production pipeline: OpenMontage creates content from scratch; video-use refines and edits raw footage. This is the first tool where a journalist or corporate videographer can describe the edit in plain English and receive a finished file.
- **Globant angle**: Pattern 13 (compose/patterns.md). Immediate PoC for any client with raw interview footage, training video content, or UGC that needs polishing. 3-4 week engagement.

### 24. HKUDS/VideoAgent — All-in-One Video Understanding, Editing, Remaking (arXiv:2606.23327)
- **Repo**: [HKUDS/VideoAgent](https://github.com/HKUDS/VideoAgent) (MIT)
- **Stars**: ~1.5k (growing from HKU Data Science lab, same team as ViMax)
- **What it is**: Multi-modal agentic framework covering three operations: (1) **Understand** — advanced content analysis across video, (2) **Edit** — 30+ specialized editing agents with dynamic workflow composition via intent parsing + textual-gradient graph optimization, (3) **Remake** — generative technologies for creative AI-powered reconstruction. Workflow composition success rate: 0.87–0.95 across all tested LLM backbones. Outperforms all baselines by 2–25%.
- **Distinction from ViMax**: ViMax generates new video (Director+Screenwriter+Generator); VideoAgent processes **existing** footage (understand+edit+remake). They are designed for complementary use: ViMax for generation, VideoAgent for post-production refinement. Both MIT, from the same lab.
- **Globant angle**: VideoAgent + ViMax = complete open-source video AI pipeline. Generate new footage with ViMax; edit and grade existing footage with VideoAgent. For broadcast clients with large archives, VideoAgent's "Understand" mode enables AI-powered archive indexing and clip retrieval.

### 25. ACE-Step 1.5 XL — 4B DiT Achieves <2 Seconds Per Full Song
- **Repo**: [ace-step/ACE-Step-1.5](https://github.com/ace-step/ACE-Step-1.5) (Apache-2.0)
- **Stars**: ~3k (significant upgrade over original ace-step ~2k)
- **What it is**: ACE-Step 1.5 is a major architectural leap from the original. Architecture: LM as "omni-capable planner" (transforms queries → comprehensive song blueprints via Chain-of-Thought) + DiT decoder (denoises audio). XL variant (4B DiT, released April 2, 2026) delivers highest quality. Three XL variants: `xl-base`, `xl-sft`, `xl-turbo`. Key specs: <2s per full song on A100, <10s on RTX 3090, <4GB VRAM, 50+ languages, 1000+ instrument types, 10-second to 10-minute (600s) generation, batch-generate 8 songs simultaneously, cover generation, repainting, vocal-to-BGM conversion.
- **Why it matters**: The original ACE-Step was architecturally novel but limited. ACE-Step 1.5 XL closes the gap with commercial music AI (Suno, Udio) while staying Apache-2.0. At <2s/song on A100, it enables real-time music generation as a microservice — serve music generation requests via REST API at scale without long GPU queues.
- **Globant angle**: Replace original ACE-Step entry in Pattern 12 (Original Music Factory). The XL model's speed means the "volume mode" can now use ACE-Step 1.5 XL instead of DiffRhythm 2 for scenarios where quality AND speed are both required.

### 26. openreel-video — Browser-Based Professional Editor (Open-Source CapCut Alternative)
- **Repo**: [Augani/openreel-video](https://github.com/Augani/openreel-video) (MIT)
- **Stars**: ~800
- **What it is**: Professional browser-based video editor that runs 100% in the browser. No installation required, no cloud uploads, no watermarks. Provides a familiar timeline editor UI — the kind of interface editors already know from CapCut, DaVinci Resolve, or Premiere — but entirely open-source and self-hostable.
- **Why it matters**: For clients who need a human-accessible editing interface alongside the agent pipeline (video-use handles the automated editing; openreel-video handles the manual review and polish step). "Self-hosted video editing as a platform" for media clients who can't use cloud SaaS for data privacy reasons (LATAM data sovereignty).
- **Globant angle**: Bundle openreel-video as the "human-in-the-loop" review interface in the video-use Pattern 13 pipeline. After the agent edits, human editors fine-tune in openreel-video. Full self-hosted, no-subscription video production stack: video-use (agent) + openreel-video (human review) + LTX-2 (generation) + YuE/ACE-Step 1.5 (music).

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
| **ComfyUI funding (Apr 2026)** | **$30M raised @ $500M valuation** | **TechCrunch Apr 2026** |
| **ComfyUI users / nodes / downloads** | **4M users / 60k+ nodes / 150k+ daily DL** | **Craft Ventures Apr 2026** |
| **OpenMontage stars (Jun 2026, corrected)** | **~36.2k** (AGPL-3.0, calesthio/) | **Trendshift Jun 2026** |
| **OpenMontage GitHub Trending peak** | **#1 Jun 20, 2026** | **GitHub Trending** |
| **AI video ad spend 2026** | **$9.1B globally** | **Industry 2026** |
| **Ad buyers committing to GenAI media campaigns** | **78%** | **Industry 2026** |
| **Orgs using GenAI for content creation** | **71%** | **Demandsage 2026** |
| **Creative content workflows using GenAI** | **69%** | **Industry 2026** |
| **GenAI M&E 2026→2035** | **$2.8B → $21.2B (CAGR 25.2%)** | **Precedence Research 2026** |
| Global sports rights revenue 2026 | $67B+ (streaming: $14.2B, +7% YoY) | PwC Outlook 2026 |
| AI exhibitors at NAB 2026 | ~2× vs prior year | NAB 2026 show floor |
| C2PA member organizations | 140+ (including Canon, Nikon, Leica) | C2PA Jan 2026 |
| Versus AI streaming partners (Jul 2026) | Disney+, Paramount+, HBO Max, NFL | Deadline Jul 2026 |
| **video-use GitHub stars (Jul 2, 2026 launch)** | **~4,200** | **GitHub** |
| **ACE-Step 1.5 XL generation speed (A100)** | **<2 seconds per full song** | **ACE-Step 1.5 release notes** |
| **ACE-Step 1.5 XL generation speed (RTX 3090)** | **<10 seconds per full song** | **ACE-Step 1.5 release notes** |
| **ACE-Step 1.5 VRAM requirement** | **<4GB** (consumer GPU deployable) | **ACE-Step 1.5 readme** |
| **VideoAgent workflow composition success rate** | **0.87–0.95** across all LLM backbones | **arXiv:2606.23327** |
| **Agentic OTT platforms facing margin leakage** | 20% without agentic AI (by 2027) | Industry forecast 2026 |
| **AI in M&E revenue 2026 (confirmed)** | **$35.77B** (from $28.32B 2025) | Business Research Company 2026 |

---
*Updated 2026-07-10. Focus on Apache 2.0 / MIT for commercial builds.*
