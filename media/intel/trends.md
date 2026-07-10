# Trends — Media & Entertainment AI

> Current and emerging trends. Signal-to-noise curated.
> Last updated: 2026-07-10 (v11)

---

## T1 — Agent-Native Video Editing (Breakout, Jul 2026)

**Signal**: `video-use` (browser-use/video-use, MIT, ~4.2k★) launched Jul 2 2026.
**The shift**: LLMs can't watch video. They CAN read transcripts and keyframe images. video-use makes this the editing interface: raw footage → ElevenLabs Scribe → word-level transcript → Claude Code → ffmpeg commands → final.mp4.
**What it does**: cuts fillers (umm/uh/false starts), auto color grades, burns subtitles, generates animation overlays, self-evaluates at cut boundaries.
**Why it matters**: Video editing becomes a coding agent task. Any developer can build a video editing pipeline. Cost drops from $200-500/video (human editor) to $0.05-0.30 (agent + API calls).
**Globant deal size**: $50k-$200k for a client-specific video production agent. Repeating: $0.05-0.30/video.

---

## T2 — Agentic Full-Stack Video Production (OpenMontage, Jun 2026)

**Signal**: `calesthio/OpenMontage` (MIT) was #1 GitHub Trending globally on Jun 26 2026.
**The shift**: Complete video production (research → script → asset gen → B-roll → music → edit → compose) automated by a multi-skill agent system.
**Architecture**: 12 pipelines, 52 tools, 500+ agent skills. Integrates Kling/Runway Gen-4/Google Veo 3 for video gen; ElevenLabs/Piper TTS for voice; FFmpeg for post.
**Why it matters**: First open system that can take a brief ("30s ad for eco-friendly sneakers targeting Gen Z") and produce a finished video.
**Globant deal size**: $80k-$300k for custom OpenMontage deployment for ad agencies or content studios.

---

## T3 — Multi-Agent Video Generation (ViMax + VideoAgent, HKU, 2026)

**Signal**: Two repos from Hong Kong University Data Science Lab both active in June-July 2026.
- **ViMax** (7.1k★): Director + Screenwriter + Producer + Generator agents. RAG-based script engine. TUI workflow.
- **VideoAgent** (2k★): 30+ editing sub-agents. 0.95 workflow success rate. CVPR 2026 3rd place. arXiv:2606.23327.
**The shift**: Video production as multi-agent orchestration problem (same as software dev with CrewAI/LangGraph).
**Why it matters**: Open-source, MIT licensed. These are the research foundations that will be productized in 2026-2027.

---

## T4 — Open Source Music Generation Reaches Commercial Quality (ACE-Step 1.5 XL, Apr 2026)

**Signal**: `ace-step/ACE-Step-1.5` (Apache-2.0, ~3k★) released Apr 2 2026.
**Specs**: 4B DiT architecture. <2s/song on A100. <10s on RTX 3090. <4GB VRAM. 50+ languages, 1000+ instruments. Covers, vocal-to-BGM, repainting. Outperforms Suno/Udio on key benchmarks.
**The shift**: Commercially viable open-source music generation. LoRA fine-tuning from 5-10 songs = brand-consistent music style.
**Why it matters**: $0 music licensing. Custom brand sound identities. Scalable background music for any content.

---

## T5 — Avid + Google Cloud Agentic Production Partnership (NAB Apr 2026)

**Signal**: Multi-year strategic deal announced Apr 16, 2026 at NAB Show (Las Vegas).
**Details**: Gemini models + Vertex AI integrated into Media Composer + Avid Content Core.
- Media Composer: multimodal search by visual action, dialogue, emotional cues → auto B-Roll retrieval
- Content Core: BigQuery + Vision Warehouse + Vertex AI Search = passive storage → active intelligent library
**Why it matters**: The pro NLE market is going agentic. Media Composer is used by all major studios and broadcasters. This sets the standard. Open alternative: OpenMontage + video-use.

---

## T6 — LATAM Media Revenue $65B, Outpacing the US (2026)

**Signal**: Omdia forecast, Jan 2026. LATAM +10.7% YoY vs US +6.9%.
- LATAM OTT: $9.8B (2026) → $25.89B (2035)
- Brazil: 3rd-largest FAST market globally ($152M)
- Mexico + Brazil: 53% and 40% FAST usage respectively
**Why it matters**: LATAM is growing faster than the US/EU. M&E AI solutions built for the LATAM market (Portuguese/Spanish, LGPD-compliant, FAST-native) are a greenfield opportunity.

---

## T7 — Microdrama Wave ($14B Globally by End 2026)

**Signal**: Microdrama revenues projected at $14B globally by end of 2026, including $3B outside China.
**What**: Short-form serialized drama (1-5 minutes/episode, 50-100 episodes/series). Low production cost, high engagement, highly sharable.
**Why it matters**: Perfect for agentic production (script from novel + OpenMontage/ViMax + AI voices). `mediago-drama` directly targets this format.
**LATAM angle**: Telenovela culture + mobile-first consumption = natural fit. Mexico and Brazil are prime markets.

---

## T8 — WPP AI Campaign Velocity (2×/week, 2.5× Value)

**Signal**: WPP using Gemini Enterprise: AI-led campaign released every 4 days at 2.5× value vs. traditional.
**Why it matters**: Agency production is being restructured around agentic AI. Globant's opportunity: build the same capability stack on open source (OpenMontage + ACE-Step + video-use + Claude), lower cost, more control, no Google dependency.

---

## T9 — OS-Level Content Discovery Pressuring OTT Metadata Quality (2026)

**Signal**: Apple TV OS, Google TV, Amazon Fire TV, Samsung now recommend content across ALL apps at the OS level. Content metadata quality is the primary discovery lever.
**What this means**: OTT platforms that have poor metadata (no descriptions, no tags, no transcripts) won't appear in OS-level recommendations.
**Agentic response**: Auto-tagging pipeline (Whisper → Grounded-SAM → CLIP → Claude metadata generation) to enrich all catalog content. MediaCMS + AI agents can automate this.
**Globant deal size**: $60k-$200k metadata enrichment project for a regional broadcaster.

---

## T10 — FAST (Free Ad-Supported Streaming) AI Stack (2026)

**Signal**: Ad-supported streaming plans in LATAM grew from 13% → 22% (early 2024 → early 2026). Brazil $152M FAST revenue.
**The FAST stack needs AI for**:
- Content curation (Gorse + LLM ranker for channel playlists)
- Ad targeting (behavioral + semantic)
- Content moderation (NeMo Guardrails)
- Subtitles/localization (Whisper + Claude translation)
**Globant opportunity**: Build FAST channel infrastructure on PeerTube/SRS + Gorse + Whisper for regional broadcasters entering FAST.

---

## T11 — Agentic Content Moderation for UGC Platforms (2026)

**Signal**: Platforms moving from keyword filters → LLM-powered semantic classifiers.
- Llama Guard 4: multimodal (image + text), self-host on single A10 GPU, 80-150ms latency
- NeMo Guardrails IORails: parallel safety rails, OpenAI-compatible, LangChain middleware
**Why it matters**: EU AI Act requires transparency in content moderation. Self-hosted moderation = auditability + GDPR compliance. Platforms need BYO-LLM moderation.

---

## T12 — Generative AI in M&E: Experimentation → Production Dependency (2026)

**Signal**: Multiple sources confirm the shift. Google Cloud NAB keynote: "era of experimentation is over."
- Active use of agentic AI grew 5×+ in H1 2026
- By end 2026, generative AI embedded across full value chain: ideation, production, localization, distribution, monetization
**GenAI M&E market**: $3.16B (2026) → $8.06B (2030), CAGR 26.4% (GlobeNewswire Jul 7 2026)

---

## T13 — Agent-Native Video Editing Wave (video-use Ecosystem, Jul 2026)

**Signal**: video-use launch triggered rapid community adoption. Fork rate high, PRs active.
**Ecosystem forming**: video-use (base) + HyperFrames (animation) + Remotion (React animations) + ElevenLabs Scribe (transcription) + Claude Code (orchestration).
**Next**: Expect OpenMontage integration with video-use for end-to-end (gen + edit) pipeline.

---

## T14 — Agentic OTT Full-Stack + Metadata as Moat (2026)

**Signal**: Quickplay/Gray Media (113 TV markets), WPP, Avid all deploying agentic AI at full stack.
**Pattern**: AI now at every OTT stage (ingest → transcode → moderation → search → personalization → live → analytics).
**20% margin leakage** for non-agentic OTT platforms by 2027 (Google Cloud estimate).
**Metadata moat**: OS-level discovery (Apple/Google/Samsung/Amazon TV OS) means content metadata quality = primary discovery lever.

---

## T24 — Publicis Acquires LiveRamp for Agentic Media Buying ($2.2B, May 2026)

**Signal**: $2.2B acquisition by Publicis of LiveRamp — data + identity + agentic media buying.
**Why it matters**: Ad agencies are acquiring AI-native capabilities to automate media buying. Agentic media buying = AI agents negotiating and placing ads in real-time.
**Open stack alternative**: Gorse (recommendations) + NeMo (brand safety) + Claude (campaign intelligence) for agentic ad operations.

---
*Previous trends archived in git history.*
