# Composition Patterns — Media & Entertainment

> Concrete recipes combining specific repos + agents to build production-ready solutions.
> Last updated: 2026-07-11 (v13)

```
[Open Source Media Platform (MediaCMS / InvokeAI / Castopod)]
          ↓
[AI Microservices (Wan2.2, LTX-Video, AudioCraft, Whisper)]
          ↓
[Orchestration Agent (OpenMontage / LangGraph + Claude)]
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
- **Voice synthesis**: ElevenLabs API (or open-source Coqui TTS for on-premise)
- **Audio processing**: [spotify/pedalboard](https://github.com/spotify/pedalboard) (GPL-3.0) for audio normalization and effects
- **Lip sync**: [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video) (Apache-2.0) LipDub mode for visible-speaker scenes
- **CMS integration**: [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) (AGPL-3.0) REST API for asset management

**Wiring**:
1. Video ingested into MediaCMS → triggers Whisper.cpp transcription job
2. Claude translates transcript with regional localization (Mexico vs. Argentina Spanish)
3. TTS generates dubbed audio track in target language
4. Pedalboard normalizes audio, matches room tone from original
5. LTX-Video LipDub resyncs visible speaker lip movements
6. Dubbed version stored in MediaCMS with original; both served via adaptive streaming

**Cost model**: ~$0.02/minute for Claude translation + near-zero for on-premise video/audio processing.

---

## P3: AI-Powered Podcast Production (Castopod + Claude + Whisper)

**Problem**: Podcast network needs auto-transcription, show notes, chapter markers, and SEO-optimized descriptions for 30+ episodes/week.

**Stack**:
- **Platform**: [ad-aures/castopod](https://github.com/ad-aures/castopod) (AGPL-3.0) self-hosted podcast hosting
- **Transcription**: [openai/whisper](https://github.com/openai/whisper) (MIT) large-v3 model
- **Content agent**: Claude (claude-sonnet-5) for show notes, chapter markers, social copy, SEO titles
- **Audio enhancement**: [spotify/pedalboard](https://github.com/spotify/pedalboard) (GPL-3.0) for noise reduction and leveling

**Wiring**:
1. Episode uploaded to Castopod → webhook triggers processing pipeline
2. Whisper generates full transcript with timestamps
3. Claude ingests transcript → outputs: JSON chapter markers, HTML show notes, 5 social variants, SEO title+description
4. Pedalboard processes audio: noise gate, EQ, loudness normalization (−14 LUFS for podcast standards)
5. All metadata pushed back to Castopod via REST API; episode publishes with full SEO package

**Output per episode**: transcript, chapter markers, show notes, 5 social posts, SEO package — in ~8 minutes unattended.

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
*Auto-updated by ingest pipeline.*
