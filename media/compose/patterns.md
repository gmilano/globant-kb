# 🧩 Composition Patterns — Media & Entertainment AI

> Concrete recipes: specific repos + agents + wiring. Build-ready.
> Last updated: 2026-07-14 (v9)

## Architecture Base

```
[Open-source vertical platform (Owncast / PeerTube / MediaCMS / Strapi)]
          ↓
[AI Inference Layer (Claude API / Ollama / local Whisper / ComfyUI API)]
          ↓
[Specialized Media AI agents (ACE-Step / WhisperX / Wan2GP / open-dubbing)]
          ↓
[Conversational UI / MCP server / REST API for client]
```

---

## P1 — AI Dubbing Pipeline (Open Source, 100+ Languages)

**Use case:** Dub any video into 100+ languages locally, no per-minute API fees.

**Stack:**
- `shyhirt/AutoDub` (MIT) — orchestrator: Whisper transcription → Ollama LLM translation → XTTS v2 voice cloning
- `facebook/demucs` (MIT) — vocal isolation to separate speech from music/SFX
- `m-bain/whisperX` (BSD-4) — word-level timestamps for lip-sync alignment
- `claude-sonnet-5` — translation quality review and cultural adaptation pass

**Wiring:**
```python
# 1. Separate vocals from background audio
demucs.separate(input_video)  # → vocals.wav + bg_music.wav

# 2. Transcribe with word-level timestamps
whisperx.transcribe(vocals.wav, language="auto")  # → transcript + timestamps

# 3. Translate with cultural adaptation
claude.message(f"Translate to {target_lang}, preserve timing: {transcript}")

# 4. Synthesize dubbed audio with voice clone of original speaker
xtts_v2.synthesize(translated_text, speaker_embedding=original_speaker)

# 5. Mix dubbed audio back with background music
ffmpeg.merge(dubbed_audio, bg_music.wav)
```

**Effort:** 3–5 weeks | **Cost:** ~$0.001–0.01/minute of content (Claude API for QA only)
**LATAM opportunity:** ES/PT dubbing for streaming services, education, YouTube channels

---

## P2 — AI Music Generation Studio (ACE-Step + AudioCraft)

**Use case:** White-label music generation for media clients — background scores, jingles, licensed-free music.

**Stack:**
- `ace-step/ACE-Step` (Apache-2.0) — text+lyrics → full song with vocals
- `fspecii/ace-step-ui` (MIT) — professional Gradio UI
- `facebookresearch/audiocraft` (MIT code) — MusicGen for instrumental background + AudioGen for SFX
- `multimodal-art-projection/YuE` (Apache-2.0) — long-form (5 min) compositions with vocals

**Wiring:**
```python
# Brand jingle generation
musicgen.generate(
    descriptions=["upbeat corporate 30s jingle, strings, modern pop"],
    duration=30
)

# Full song from brief
ace_step.generate(
    lyrics="[verse] ...",
    style="latin pop, guitar, female vocal",
    duration=180
)

# SFX for video
audiogen.generate(descriptions=["thunder storm", "crowd cheer", "city ambience"])
```

**Effort:** 2–4 weeks | **Cost:** ~$0 model cost (local GPU) + $0.01–0.05/prompt (Claude for briefs)
**LATAM opportunity:** Music labels in BR/AR/MX, ad agencies, gaming studios

---

## P3 — Self-Hosted AI Creative Studio (Open-Generative-AI)

**Use case:** White-label creative platform for media clients replacing Midjourney/Sora/Runway subscriptions.

**Stack:**
- `anil-matcha/open-generative-ai` (MIT) — 200+ image/video models, self-hosted, no filters
- `deepbeepmeep/Wan2GP` (Apache-2.0) — Wan 2.2 / LTX-2 / HunyuanVideo local runner
- `comfyanonymous/ComfyUI` (GPL-3.0) — node-graph workflow engine for complex pipelines
- `claude-sonnet-5` via MCP — creative brief → visual prompt expansion agent

**Wiring:**
```
Client brief → Claude prompt engineer → Open-Generative-AI (text-to-video)
                                      → ComfyUI workflow (img2img / ControlNet)
                                      → Asset stored in Strapi CMS
                                      → Delivered via branded CDN
```

**Effort:** 4–6 weeks | **Cost:** GPU infra ($200–500/month) + Claude API (~$50–200/month)
**Revenue model:** $2k–10k/month per client vs. $500–3k/month SaaS per-seat

---

## P4 — AI Subtitle Generator (Whisper + PeerTube)

**Use case:** Automatic subtitles + search indexing for video library at scale.

**Stack:**
- `ggml-org/whisper.cpp` (MIT) — fast local transcription, outputs SRT/VTT
- `m-bain/whisperX` (BSD-4) — word-level timestamps + speaker diarization for multi-speaker videos
- `Chocobozzz/PeerTube` (AGPL-3.0) — video platform with subtitle support via REST API
- `absadiki/subsai` (Apache-2.0) — web UI + CLI for subtitle generation

**Wiring:**
```python
# For each video in library:
whisperx.transcribe(video, language="auto")  # → timestamped transcript
subtitles.to_srt(transcript)                 # → .srt file

# Upload to PeerTube via API
peertube_api.upload_caption(video_id, srt_content, language)

# Index transcripts for full-text search
elasticsearch.index(video_id, transcript_text)
```

**Effort:** 2–3 weeks | **Cost:** ~$0 (local CPU/GPU) | **Scale:** 1,000+ videos/day on single server

---

## P5 — Interactive CTV Second-Screen (Owncast + Claude)

**Use case:** Real-time AI engagement layer during live sports/events, open alternative to Versus AI.

**Stack:**
- `owncast/owncast` (MIT) — self-hosted live streaming with webhook events
- `claude-haiku-4-5` — real-time audience intelligence (sub-100ms latency)
- Redis pub/sub — event stream from stream → AI → viewers
- Next.js — second-screen web app with live AI overlays

**Wiring:**
```
Live stream event (viewer count, chat spike, goal scored)
    → Owncast webhook
    → Redis pub/sub
    → Claude Haiku (contextual question/poll/stat generation)
    → WebSocket push to second-screen app
    → Viewer sees: "37th minute goal — Messi's 8th this season. Quick: was this from a free kick?"
```

**Effort:** 4–6 weeks | **Cost:** $0.25/$1.25 per million input/output tokens (Claude Haiku)
**LATAM opportunity:** Football/soccer rights holders in BR/AR/CO/MX

---

## P6 — Agentic Newsroom (CMS-Embedded Publishing Agent)

**Use case:** AI agent embedded in CMS that auto-drafts, researches, fact-checks, and publishes.

**Stack:**
- `TryGhost/Ghost` (MIT) — publishing platform with REST API
- `strapi/strapi` (MIT) — headless CMS for structured content
- `claude-sonnet-5` — writing, research, fact-checking agent
- `openai/whisper` (MIT) — transcribing press conferences/interviews
- `m-bain/whisperX` (BSD-4) — speaker attribution for interview transcripts

**Wiring:**
```
Input sources: RSS, press release, video interview, wire service
    → Whisper/WhisperX transcribes audio/video
    → Claude Sonnet 5 drafts article with citations
    → Editor reviews in Ghost/Strapi interface
    → Claude fact-checks against source material
    → One-click publish to Ghost (web + newsletter) + social (via Ghost webhooks)
```

**Effort:** 6–8 weeks | **Cost:** ~$0.10–0.50 per article (Claude API)
**Revenue model:** $10k–50k implementation + $2k–5k/month managed service for news orgs

---

## P7 — Novel-to-Short-Drama Pipeline

**Use case:** Convert written content (novels, scripts, blogs) to short-form video automatically.

**Stack:**
- `mediago-dev/mediago-drama` (Apache-2.0) — novel → script → storyboard agent workbench
- `claude-sonnet-5` — scene breakdown, character adaptation, dialogue polishing
- `Lightricks/ltx-video` or `deepbeepmeep/Wan2GP` — script scene → video generation
- `ace-step/ACE-Step` (Apache-2.0) — generate background music matching scene mood
- `Softcatala/open-dubbing` (Apache-2.0) — dub to local language

**Wiring:**
```
Source text (novel chapter / script)
    → Claude: break into 15–30s scenes with visual descriptions
    → LTX-Video / Wan 2.2: generate each scene video clip
    → ACE-Step: generate scene-matched background music
    → FFmpeg: assemble clips + music + subtitles
    → open-dubbing: ES/PT dubbed version
    → Output: TikTok/Reels-ready short drama episode
```

**Effort:** 8–12 weeks | **Cost:** GPU ($300–800/month) + Claude API ($100–300/month)
**LATAM opportunity:** WebToon/web novel adaptation for MX/BR/AR audiences

---

## P8 — AI Content Moderation + Recommendation (MediaCMS)

**Use case:** AI-powered content safety and personalized discovery for self-hosted media platform.

**Stack:**
- `mediacms-io/mediacms` (AGPL-3.0) — video platform with REST API hooks
- `meta-llama/Llama-Guard-3` (MIT) — open source content moderation model
- `openai/clip` (MIT) — visual embedding for content-based recommendation
- `m-bain/whisperX` (BSD-4) — transcript for text-based moderation + search
- `claude-sonnet-5` — content policy explanation, edge-case moderation review

**Wiring:**
```
New video upload → MediaCMS webhook
    → WhisperX: transcript → keyword flag scan
    → LlamaGuard: safety classification
    → CLIP: visual embedding for similarity-based recommendation
    → If flagged: Claude reviews context → accept/reject/human review queue
    → Recommendation: cosine similarity on CLIP + transcript embeddings
```

**Effort:** 6–10 weeks | **Cost:** ~$0 (local models) + Claude API for edge-case review

---

## P9 — AI Podcast Production Suite

**Use case:** End-to-end AI assistance for podcast creation, distribution, and monetization.

**Stack:**
- `m-bain/whisperX` (BSD-4) — full transcript with speaker labels
- `claude-sonnet-5` — show notes, chapter markers, highlights, social clips script
- `facebookresearch/audiocraft` (MIT) — intro/outro music generation
- `shyhirt/AutoDub` (MIT) — multilingual episode versions
- `TryGhost/Ghost` (MIT) — podcast website with newsletter distribution

**Wiring:**
```
Raw audio recording
    → WhisperX: transcript + speaker diarization
    → Claude: generate show notes / chapter markers / 3 tweet versions / 1 LinkedIn post
    → AudioCraft MusicGen: generate custom intro music from brief
    → AutoDub: generate ES/PT episode version
    → Ghost: publish episode + show notes + newsletter to subscribers
```

**Effort:** 3–5 weeks | **Cost:** ~$0.05–0.20 per episode (Claude API)
**LATAM:** Podcast market growing 40%+ in BR/MX/CO — high demand for multilingual distribution

---

## Quick-Start Decision Matrix

| Client Need | Start with | Add AI layer | Timeline |
|-------------|-----------|--------------|----------|
| Video dubbing | AutoDub + Demucs | Claude QA pass | 3–5w |
| Music generation | ACE-Step + ACE-Step UI | Custom fine-tune | 2–4w |
| Creative studio | Open-Generative-AI | ComfyUI workflows | 4–6w |
| Subtitle library | whisper.cpp + PeerTube | WhisperX + search index | 2–3w |
| Live event AI | Owncast + Redis | Claude Haiku real-time | 4–6w |
| Newsroom AI | Ghost + Strapi | Claude Sonnet 5 agent | 6–8w |
| Short-drama pipeline | mediago-drama | LTX-Video + ACE-Step | 8–12w |
| Content moderation | MediaCMS | LlamaGuard + CLIP | 6–10w |
| Podcast production | WhisperX + Ghost | Claude content agent | 3–5w |
