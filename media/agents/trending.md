# Trending Agents — Media & Entertainment

> What's new this week in AI agents for media. Signals from GitHub, arXiv, and industry news.
> Last updated: 2026-07-10 (v11)

## Week of July 7–10, 2026

### 🔥 Hottest Repos

**video-use** (`browser-use/video-use`, MIT, ~4.2k★ — launched Jul 2 2026)
- Agent-native video editing: the LLM reads transcript+PNG frames, never raw video bytes (12KB vs 45M tokens)
- Drives FFmpeg, subtitle burners, animation renderers, color grading via natural language
- Self-evaluates rendered output at every cut boundary
- Works with Claude Code, OpenAI Codex, Hermes, OpenClaw
- Key insight: makes video editing a *coding agent* task, not a browser agent task

**OpenMontage** (`calesthio/OpenMontage`, MIT, ~8k★ — launched Jun 26 2026)
- Was #1 GitHub Trending globally on launch day
- 12 production pipelines (research, scriptwriting, asset gen, editing, composition)
- Integrates: Kling, Runway Gen-4, Google Veo 3, ElevenLabs, Piper TTS (offline), FFmpeg, Remotion
- First open-source system to handle full video production end-to-end from a natural language brief
- Active pull requests and growing contributor community

**ViMax** (`HKUDS/ViMax`, MIT, ~7.1k★ — agents loop TUI update Jun 28 2026)
- New: stronger LLM retries, persistent render status, landscape image guards, Script2Video resume fixes
- RAG-based long script engine: novel-length → multi-scene screenplay automatically
- Supported backends: Gemini 2.5 Flash Lite, MiniMax; image gen via Nanobana API; video via Veo

**VideoAgent** (`HKUDS/VideoAgent`, MIT)
- 0.95 workflow composition success rate across all LLM backbones (GPT-4o, Claude, Gemini)
- CVPR 2026 CASTLE Challenge 3rd place for multi-view long-context video understanding
- Decomposes user intent into explicit + implicit sub-intents — goes beyond surface-level commands
- Graph-powered adaptive feedback loops for robust error recovery

**ACE-Step 1.5 XL** (`ace-step/ACE-Step-1.5`, Apache-2.0, ~3k★ — released Apr 2 2026)
- 4B DiT architecture — biggest jump in quality in open music gen
- community: `ace-step/awesome-ace-step` growing with LoRA packs, style libraries, ComfyUI nodes

### 📡 Industry Signals This Week

**Avid + Google Cloud — NAB 2026 Partnership (Apr 16, 2026)**
- Multi-year strategic deal: Gemini models + Vertex AI → Media Composer + Avid Content Core
- Media Composer: multimodal search (visual actions, dialogue, emotional cues → B-Roll)
- Avid Content Core: BigQuery + Vision Warehouse + Vertex AI Search = passive storage → active library
- Weeks of manual archive discovery → seconds of automated insight
- Verdict: the pro editing market is going agentic; open source alternative is OpenMontage + video-use

**WPP Agentic Campaigns (Google Cloud Blog, 2026)**
- WPP uses Gemini Enterprise, releasing an AI-led campaign every 4 days
- 2.5x more value for clients vs traditional production
- Open equivalent: OpenMontage + ACE-Step 1.5 + ElevenLabs → same workflow at 1/10th cost

**Gray Media Quickplay Full Deployment**
- All 113 TV markets live on Google Cloud AI-powered streaming platform
- Signals: AI metadata, recommendations, and ad-targeting now table stakes for broadcast

**Generative AI in M&E hits $3.16B in 2026** (GlobeNewswire Jul 7, 2026)
- Growing from $2.5B in 2025 → $8.06B by 2030 (CAGR 26.4%)
- Agentic AI in M&E: active use grew 5×+ in H1 2026

### 🌎 LATAM Signals

**LATAM Media Revenue: $65 Billion in 2026** (Omdia, Jan 2026)
- Growing 10.7% YoY — outpacing the US (6.9%)
- Brazil: 3rd-largest FAST market globally by revenue ($152M)
- Mexico + Brazil: top FAST usage (53% and 40% respectively)
- LATAM OTT market: $9.8B in 2026 → $25.89B by 2035 (CAGR 11.4%)

**Microdrama Wave**
- $14B globally by end of 2026 (including $3B outside China)
- Low production cost + high engagement = perfect for agentic production
- `mediago-drama` repo directly targets this use case: novel → short video workbench

---
*Previous week: video-use launch (Jul 2), OpenMontage (Jun 26), ACE-Step 1.5 XL (Apr 2).*
