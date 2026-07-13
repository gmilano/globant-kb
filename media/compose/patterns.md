# Composition Patterns — Media & Entertainment

> Concrete recipes combining specific repos + agents to build production-ready solutions.
> Last updated: 2026-07-13 (v15)

```
[Open Source Media Platform (MediaCMS / InvokeAI / Castopod / Owncast)]
          ↓
[AI Microservices (Wan2.2, LTX-Video, AudioCraft, Whisper, FoleyCrafter, Kokoro-82M)]
          ↓
[Orchestration Agent (OpenMontage / HyperFrames / GPT-Researcher / LangGraph + Claude)]
          ↓
[Client-facing API or conversational UI]
```

---

## P1: Agentic Video Production Studio

**Problem**: Client needs to produce 50+ short-form marketing videos per month at 1/10 the current cost.

**Stack**:
- **Orchestration**: [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) (AGPL-3.0) — 12 pipelines, 500+ agent skills
- **Video generation**: [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) (Apache-2.0) via ComfyUI API
- **Image generation**: [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) (Apache-2.0) for stills
- **Audio**: [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) MusicGen for background scoring
- **UI**: OpenMontage natural language interface + Claude for script direction

**Wiring**:
1. Client describes video in natural language → OpenMontage agent decomposes into pipeline steps
2. Script generation → scene breakdown → asset generation (Wan2.2 for video, InvokeAI for stills)
3. MusicGen generates background score from scene mood description
4. OpenMontage's editing pipeline assembles timeline, adds transitions, exports
5. MediaCMS stores and serves final assets with metadata

**Estimated time to MVP**: 3–4 weeks. **Differentiator**: Apache-2.0 Wan2.2 means no per-video API costs.

---

## P2: AI Dubbing and Localization Pipeline (LATAM)

**Problem**: OTT platform needs to dub 200 hours of English content into Spanish/Portuguese per quarter.

**Stack**:
- **Transcription**: [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) (MIT) for source language ASR
- **Translation**: Claude API (claude-sonnet-5) for English → Spanish/Portuguese with cultural adaptation
- **Voice synthesis**: [hexgrad/Kokoro-82M](https://github.com/hexgrad/Kokoro-82M) (Apache-2.0) for on-premise TTS (or ElevenLabs API for premium voices)
- **Audio processing**: [spotify/pedalboard](https://github.com/spotify/pedalboard) (GPL-3.0) for audio normalization and effects
- **Lip sync**: [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video) (Apache-2.0) LipDub mode for visible-speaker scenes
- **Foley & sound effects**: [open-mmlab/FoleyCrafter](https://github.com/open-mmlab/FoleyCrafter) (Apache-2.0) for automated environmental audio
- **CMS integration**: [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) (AGPL-3.0) REST API for asset management

**Wiring**:
1. Video ingested into MediaCMS → triggers Whisper.cpp transcription job
2. Claude translates transcript with regional localization (Mexico vs. Argentina Spanish)
3. Kokoro-82M generates dubbed audio track in target language (CPU-viable; $0 per-character)
4. Pedalboard normalizes audio, matches room tone from original
5. LTX-Video LipDub resyncs visible speaker lip movements
6. FoleyCrafter regenerates ambient sound layer in target acoustic profile
7. Dubbed version stored in MediaCMS with original; both served via adaptive streaming

**Cost model**: ~$0.02/minute for Claude translation + $0 for on-premise Kokoro TTS and video/audio processing.

---

## P3: AI-Powered Podcast Production (Castopod + Claude + Whisper)

**Problem**: Podcast network needs auto-transcription, show notes, chapter markers, and SEO-optimized descriptions for 30+ episodes/week.

**Stack**:
- **Platform**: [ad-aures/castopod](https://github.com/ad-aures/castopod) (AGPL-3.0) self-hosted podcast hosting
- **Transcription**: [openai/whisper](https://github.com/openai/whisper) (MIT) large-v3 model
- **Content agent**: Claude (claude-sonnet-5) for show notes, chapter markers, social copy, SEO titles
- **Audio enhancement**: [spotify/pedalboard](https://github.com/spotify/pedalboard) (GPL-3.0) for noise reduction and leveling
- **Audio narration**: [hexgrad/Kokoro-82M](https://github.com/hexgrad/Kokoro-82M) (Apache-2.0) for auto-generated episode previews and article audio versions

**Wiring**:
1. Episode uploaded to Castopod → webhook triggers processing pipeline
2. Whisper generates full transcript with timestamps
3. Claude ingests transcript → outputs: JSON chapter markers, HTML show notes, 5 social variants, SEO title+description
4. Pedalboard processes audio: noise gate, EQ, loudness normalization (−14 LUFS for podcast standards)
5. Kokoro-82M generates short audio preview/trailer in Spanish or Portuguese for social distribution
6. All metadata pushed back to Castopod via REST API; episode publishes with full SEO package

**Output per episode**: transcript, chapter markers, show notes, 5 social posts, SEO package, audio preview — in ~8 minutes unattended.

---

## P4: Short-Form Drama Pipeline (Novel → Video Series)

**Problem**: Digital publisher wants to convert popular web novels into short-drama video series for LATAM social platforms (inspired by Chinese 短剧 market).

**Stack**:
- **Script agent**: Claude (claude-opus-4-8) for novel-to-screenplay adaptation, scene breakdown
- **Video generation**: [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) (Apache-2.0) for scene visualization
- **Character consistency**: Wan2.2 LoRA trained on character reference sheets (fine-tuned in 2–4 hours)
- **Agentic pipeline**: [mediago-dev/mediago-drama](https://github.com/mediago-dev/mediago-drama) (Apache-2.0) as reference pattern
- **Music**: [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) MusicGen for episode scores
- **Distribution**: MediaCMS + social API integrations (TikTok, Instagram Reels, YouTube Shorts)

**Wiring**:
1. Novel chapter submitted → Claude breaks into 10–15 scenes with visual descriptions and dialogue
2. Wan2.2 (with character LoRA) generates 5–10 second clips per scene
3. AudioCraft scores each scene based on mood tag from Claude
4. FFmpeg assembles clips into 1–3 minute episode with music and optional Whisper-generated captions
5. Auto-posted to LATAM social platforms via MediaCMS distribution layer

**Business model**: $0.05–0.10 per episode production cost vs. $2–5K traditional production.

---

## P5: Real-Time Live Stream Intelligence Agent

**Problem**: News broadcaster needs real-time transcription, topic tagging, highlight detection, and social clip generation during live broadcasts.

**Stack**:
- **Streaming infrastructure**: [datarhei/restreamer](https://github.com/datarhei/restreamer) (Apache-2.0) for RTMP ingest and distribution
- **Real-time transcription**: [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) (MIT) streaming mode
- **Intelligence agent**: Claude (claude-haiku-4-5) for real-time topic classification and quote extraction (low-latency tier)
- **Highlight agent**: Claude (claude-sonnet-5) for summarization and clip recommendation
- **Clip generation**: Wan2GP + Wan2.2 for AI-illustrated highlight cards
- **Distribution**: [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) (AGPL-3.0) for VOD and clip library

**Wiring**:
1. Live RTMP stream ingested by Restreamer → audio extracted in 30-second chunks
2. Whisper.cpp processes each chunk → rolling transcript with timestamps
3. Claude Haiku classifies topics, extracts key quotes in near-real-time (<2s latency)
4. Claude Sonnet identifies highlight moments from accumulated transcript → generates clip markers
5. Highlighted segments auto-clipped and published to MediaCMS with AI-generated social captions
6. Dashboard shows live topic tags, quote stream, and clip queue for human editor approval

---

## P6: AI Music and Audio Scoring Service

**Problem**: Ad agency needs licensed background music for 500+ ad variations per month; stock music libraries are too generic.

**Stack**:
- **Music generation**: [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) MusicGen large (MIT code, CC-BY-NC weights — verify commercial license with Meta for production)
- **Audio post**: [spotify/pedalboard](https://github.com/spotify/pedalboard) (GPL-3.0) for mastering, EQ, and format export
- **Prompt engineering agent**: Claude for generating precise MusicGen prompts from ad brief/mood board
- **Variation engine**: LangGraph for generating 10+ style variations per brief
- **Asset management**: [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) for scored asset library with rights metadata

**Note on licensing**: AudioCraft model weights are CC-BY-NC 4.0. For fully commercial output, investigate alternative models: Suno API, Udio API, or Meta commercial licensing. The pipeline pattern is the same regardless of underlying music model.

**Wiring**:
1. Ad brief + mood board submitted → Claude generates 10 MusicGen prompt variations
2. AudioCraft generates 30s–2min audio tracks for each prompt (parallel generation)
3. Pedalboard post-processes: normalize to −14 LUFS, EQ for ad contexts, export MP3/WAV
4. Human curator reviews in MediaCMS, approves/rejects, tags for brief categories
5. Approved tracks available via API to ad production pipeline with metadata (BPM, key, mood, duration)

---

## P7: Agent-Native Marketing Video Pipeline (HyperFrames + Claude)

**Problem**: Marketing team needs 200+ branded video variants per month for multi-market campaigns — each variant differs by language, market, offer, and format (16:9, 9:16, 1:1). Traditional production is $500–2,000 per variant.

**Stack**:
- **Video rendering**: [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) (Apache-2.0) — HTML-to-video, agent-native
- **Composition agent**: Claude (claude-sonnet-5) as the composition writer — generates HTML video compositions from brand briefs
- **Asset generation**: [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) (Apache-2.0) for static brand assets
- **Localization**: [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) (MIT) + Claude for script translation
- **Voice narration**: [hexgrad/Kokoro-82M](https://github.com/hexgrad/Kokoro-82M) (Apache-2.0) for Spanish/Portuguese voiceover at $0/character
- **Asset management**: [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) (AGPL-3.0) for variant library with metadata
- **Orchestration**: LangGraph (MIT) for multi-market variant generation loop

**Wiring**:
1. Campaign brief (offer text, brand assets, market list) submitted → Claude generates HyperFrames HTML composition template
2. LangGraph loops over market × format variants → Claude fills data-start/data-duration attributes per variant
3. HyperFrames CLI renders each HTML composition → deterministic MP4 via headless Chrome + FFmpeg
4. InvokeAI generates or resizes brand imagery to target aspect ratios per format
5. Whisper.cpp + Claude localizes voiceover scripts; Kokoro-82M generates Spanish/Portuguese audio tracks on-premise
6. All variants stored in MediaCMS with searchable metadata (market, format, offer, language)
7. Brand manager reviews → approves → distributes via MediaCMS API to ad platforms

**Key insight**: HyperFrames renders are deterministic — same HTML + same data = same MP4. This enables version control, A/B testing, and audit trails for regulated industries.

**Estimated time to MVP**: 2–3 weeks. **Cost model**: ~$0.01–0.05 per video variant vs. $500–2,000 traditional production.

**LATAM angle**: High-value for brands serving Brazil/Mexico/Argentina with per-country legal/language variant requirements. HyperFrames' deterministic rendering also satisfies content compliance audit requirements (CONAR in Brazil, CONARP in Argentina).

---

## P8: AI Newsroom Research & Content Pipeline

**Problem**: Regional broadcaster or digital publisher needs to compete as search referrals drop 40% (Reuters Institute 2026). Must produce more high-quality content faster with a smaller editorial team.

**Stack**:
- **Research agent**: [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher) (MIT) — autonomous multi-source web research → sourced research brief
- **Article generation**: [stanford-oval/storm](https://github.com/stanford-oval/storm) (MIT) — multi-perspective outline + Wikipedia-quality article draft
- **Editorial AI**: Claude (claude-sonnet-5) — adapts STORM draft to house style, brand voice, regional context; generates social variants
- **Narration/audio**: [hexgrad/Kokoro-82M](https://github.com/hexgrad/Kokoro-82M) (Apache-2.0) — auto-generates audio narration in Spanish/Portuguese for podcast/audio article distribution
- **Transcription**: [openai/whisper](https://github.com/openai/whisper) (MIT) — converts interview audio to text for journalist review
- **CMS**: [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) (AGPL-3.0) — stores articles, audio, video with metadata and REST API for distribution
- **Orchestration**: LangGraph (MIT) — event-driven pipeline from topic assignment to publish queue

**Wiring**:
1. Editor assigns topic via Slack/webhook → LangGraph pipeline activates
2. GPT-Researcher runs multi-source web sweep → returns sourced research brief (5–6 pages, JSON)
3. STORM generates structured outline + full draft with inline citations
4. Claude adapts draft to house style: adjusts tone, adds regional context (Brazil/Mexico/Argentina), checks factual claims, flags for human review
5. Whisper processes any related interview audio → transcript injected into Claude for quote integration
6. Kokoro-82M generates audio narration of final article in Spanish or Portuguese
7. All outputs (article, audio, social posts, citations) pushed to MediaCMS via REST API
8. Human editor reviews in MediaCMS editorial queue → approves → publishes with one click
9. Personalized briefing version (shorter, Huxe-style) generated for newsletter/app distribution

**Human-in-the-loop gates**: Claude flags low-confidence factual claims for human review. STORM outputs always reviewed before publish. Kokoro audio reviewed if story is sensitive.

**Output per topic**: sourced research brief + full article draft + audio narration + 5 social variants + SEO package — in ~12 minutes unattended.

**LATAM angle**: Spanish/Portuguese STORM + Claude + Kokoro pipeline enables regional newsrooms (Brazil, Mexico, Argentina) to compete on content volume against well-funded national players. Full on-premise deployment available; no external API dependency except Claude.

**Estimated time to MVP**: 2–3 weeks. **Cost model**: ~$0.05–0.10/article for Claude API; Kokoro TTS and Whisper at $0 on-premise.

---

## Pattern Selection Guide

| Client Situation | Recommended Pattern |
|-----------------|-----------------------|
| Marketing agency, high-volume short-form | P1: Agentic Video Studio |
| OTT platform, localization at scale | P2: AI Dubbing Pipeline |
| Podcast network, content operations | P3: Podcast Production |
| Digital publisher, LATAM short drama | P4: Short-Form Drama |
| News broadcaster, live intelligence | P5: Live Stream Agent |
| Ad agency, background music at scale | P6: Music Scoring Service |
| Brand team, 200+ video variants/month | P7: Agent-Native Marketing Video |
| Regional news publisher, search referral decline | P8: AI Newsroom Research & Content |

---
*Auto-updated by ingest pipeline.*
