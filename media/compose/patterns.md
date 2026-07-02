# Composition Patterns — Media & Entertainment AI

> Concrete recipes using real repos. Each pattern is buildable from open-source components.

---

## Pattern 1: Automated Transcription & Accessibility Pipeline

**Use case:** Broadcast or streaming client must comply with ADA/WCAG closed-caption mandates for both live and on-demand content.

**Components:**
- **Live transcription:** [collabora/WhisperLive](https://github.com/collabora/WhisperLive) (MIT) — WebSocket real-time server
- **VOD transcription:** [m-bain/whisperX](https://github.com/m-bain/whisperX) (BSD-2-Clause) — word timestamps + diarization
- **Subtitle output:** [absadiki/subsai](https://github.com/absadiki/subsai) (MIT) — SRT/VTT generation
- **NLE integration:** [tmoroney/auto-subs](https://github.com/tmoroney/auto-subs) (MIT) — DaVinci Resolve / Premiere plugin
- **CMS:** [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) (AGPL-3.0) — stores and serves VTT alongside video

**Wiring:**
```
[Live RTMP Feed] → WhisperLive WebSocket server
                        │
                        └── SRT stream → broadcast encoder overlay (live captions)
                        └── Stored transcript → post-broadcast VTT generation

[Uploaded VOD] → MediaCMS upload webhook
                        │
                        └── WhisperX worker (Docker) → transcript.json (word-level)
                                │
                                └── subsai formatter → episode.vtt + episode.srt
                                        │
                                        └── MediaCMS API: PATCH /api/v1/media/{id}/ {subtitles}
```

**WhisperX Docker example:**
```python
import whisperx

model = whisperx.load_model("large-v3", device="cuda", compute_type="float16")
audio = whisperx.load_audio("episode.mp4")
result = model.transcribe(audio, batch_size=16)

# Align for word-level timestamps
model_a, metadata = whisperx.load_align_model(language_code=result["language"], device="cuda")
result = whisperx.align(result["segments"], model_a, metadata, audio, device="cuda")

# Diarize speakers (for multi-host podcasts)
diarize_model = whisperx.DiarizationPipeline(use_auth_token=HF_TOKEN, device="cuda")
diarize_segments = diarize_model(audio)
result = whisperx.assign_word_speakers(diarize_segments, result)

# Export to SRT
whisperx.utils.write_srt(result["segments"], open("episode.srt", "w"))
```

**Outcome:** VOD with searchable transcripts and proper SRT/VTT in <3 minutes per hour of content (GPU); live captions with ~800ms latency on CPU.

---

## Pattern 2: AI Trailer & Promo Generation Pipeline

**Use case:** Media studio needs to produce 30–90 second promos and trailers from long-form content without a full editing team.

**Components:**
- **Agentic production:** [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) (MIT) — orchestrates full pipeline
- **Transcript source:** [openai/whisper](https://github.com/openai/whisper) (MIT) — extract spoken content
- **B-roll generation:** [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) (Apache 2.0) — synthetic clips
- **Thumbnail generation:** [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) (GPL-3.0) — batch poster variants
- **Distribution:** [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) (AGPL-3.0) — publish and CDN

**Wiring:**
```
[Episode File + Brief] → OpenMontage Agent
    │
    ├── Whisper: extract transcript + identify highlight moments (high-energy segments)
    ├── LLM (Claude Sonnet 5): generate trailer script from highlight moments
    ├── Open-Sora: generate synthetic B-roll for gaps in source footage
    ├── ComfyUI: generate 5× thumbnail variants (A/B test)
    ├── FFmpeg: assemble final cut (source clips + synthetic B-roll + narration)
    └── MediaCMS API: publish trailer + thumbnails

[Human Review Gate] → approve / regenerate specific segments
```

**OpenMontage pipeline invocation:**
```bash
# Define the brief in natural language
cat > brief.md << 'EOF'
Create a 60-second trailer for episode 3 of "The Future of Energy."
Highlight: the fusion reactor breakthrough at minute 14:30, the CEO interview at 22:15.
Tone: inspiring, forward-looking. Target: LinkedIn and YouTube Shorts.
EOF

# Run the agentic pipeline
openmon run --pipeline social_promo --brief brief.md --source episode_03.mp4 --output ./trailer/
```

**Outcome:** 60-second trailer produced in ~15 minutes with one human review pass; 5 thumbnail variants for A/B testing; eliminates 4–6 hours of editor time per episode.

---

## Pattern 3: AI Content Moderation Pipeline

**Use case:** Live streaming platform (built on Owncast) needs to detect harmful content in real-time chat and flag dangerous audio/visual segments.

**Components:**
- **Live stream:** [owncast/owncast](https://github.com/owncast/owncast) (MIT) — streaming + chat
- **Audio transcription:** [collabora/WhisperLive](https://github.com/collabora/WhisperLive) (MIT) — live speech-to-text
- **Text moderation:** LlamaGuard 3 (Meta, open weights) or fine-tuned Llama 3.1 8B
- **Vision moderation:** OpenCLIP + custom classifier (scene safety scoring)
- **Agent orchestration:** [huggingface/smolagents](https://github.com/huggingface/smolagents) (Apache 2.0)

**Wiring:**
```
Owncast RTMP Stream
    │
    ├── Audio → WhisperLive → text chunks (every 5s)
    │               └── LlamaGuard: classify {safe/unsafe/review}
    │                       └── unsafe → Owncast webhook: mute + flag
    │
    ├── Video frames (1fps) → CLIP embeddings
    │               └── cosine similarity to "harmful content" anchor embeddings
    │                       └── score > 0.85 → flag for human review
    │
    └── Chat WebSocket → smolagents moderation agent
                └── LLM: detect harassment, spam, doxxing
                        └── action: warn / timeout / ban via Owncast API
```

**Outcome:** Real-time content moderation latency <2s for audio; <500ms for chat; ~90% precision on harmful speech with LlamaGuard 3 (reduces human moderation burden by 70%).

---

## Pattern 4: Semantic Video Archive Search

**Use case:** News broadcaster has 20+ years of video archive (100k+ clips). Journalists need to find relevant footage by semantic query ("find shots of flooding in Southeast Asia after 2020").

**Components:**
- **Transcription:** [openai/whisper](https://github.com/openai/whisper) (MIT) — batch-transcribe entire archive
- **Vector search:** [facebookresearch/faiss](https://github.com/facebookresearch/faiss) (MIT) — index transcript + visual embeddings
- **Multimodal embeddings:** [jina-ai/jina](https://github.com/jina-ai/jina) (Apache 2.0) — text + visual CLIP embeddings
- **Search UI:** Custom React UI over MediaCMS (AGPL-3.0)

**Wiring:**
```
Archive Ingestion (one-time batch):
    [Video File] → Whisper → transcript (per-minute chunks)
                → CLIP visual embeddings (1 frame/5s)
                → Jina Encoder: combined text+visual embedding
                → FAISS index (IVF-PQ for 100k+ clips)

Query Time:
    [Journalist query: "flooding Southeast Asia"] →
        Jina Encoder: query embedding →
            FAISS ANN search (top-20 results, <50ms) →
                MediaCMS: return clips with timestamps →
                    Preview player with matched segment highlighted
```

**FAISS indexing example:**
```python
import faiss
import numpy as np

d = 768  # embedding dimension (CLIP ViT-L/14)
index = faiss.IndexIVFPQ(faiss.IndexFlatL2(d), d, 256, 8, 8)
index.train(all_embeddings)  # train on archive embeddings
index.add_with_ids(all_embeddings, clip_ids)
faiss.write_index(index, "archive_index.faiss")

# Query
query_vec = encode_query("flooding Southeast Asia 2020")  # shape (1, 768)
distances, ids = index.search(query_vec, k=20)  # top-20 clips in <50ms
```

**Outcome:** Journalists find relevant archive footage in seconds instead of hours; average search time drops from 45 minutes to under 2 minutes; enables discovery of clips previously unfindable via keyword tags.

---

## Pattern 5: Self-Hosted AI Media Studio (Full Stack)

**Use case:** Media agency or digital broadcaster wants a complete, AI-enabled, self-hosted media production and distribution platform — without SaaS vendor lock-in.

**Components:**
- **VOD CMS:** [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) (AGPL-3.0) — upload, encode, stream, search
- **Live streaming:** [owncast/owncast](https://github.com/owncast/owncast) (MIT) — RTMP → HLS with chat
- **AI generation studio:** [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) (MIT) — 200+ models for image/video
- **Transcription:** [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) (MIT) — CPU-only, no GPU required for post
- **Agentic production:** [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) (MIT) — automated promo/short creation
- **Vector search:** [facebookresearch/faiss](https://github.com/facebookresearch/faiss) (MIT) — semantic archive search

**Architecture:**
```
                    ┌─────────────────────────────────┐
                    │        Reverse Proxy (nginx)    │
                    └────────┬─────────┬──────────────┘
                             │         │
               ┌─────────────┘         └──────────────┐
               ▼                                      ▼
       ┌──────────────┐                    ┌──────────────────┐
       │   MediaCMS   │                    │    Owncast       │
       │  (VOD + API) │                    │  (Live + Chat)   │
       └──────┬───────┘                    └────────┬─────────┘
              │                                     │
              ▼                                     ▼
    ┌──────────────────┐                 ┌──────────────────────┐
    │  AI Workers      │                 │  WhisperLive server  │
    │  (Celery + Redis)│                 │  (real-time captions)│
    │  - whisper.cpp   │                 └──────────────────────┘
    │  - OpenMontage   │
    │  - Open-Gen-AI   │
    └──────────────────┘
              │
              ▼
    ┌──────────────────┐
    │  FAISS index     │
    │  (semantic search│
    │   over archive)  │
    └──────────────────┘
```

**Deployment:**
```yaml
# docker-compose.yml excerpt
services:
  mediacms:
    image: mediacms/mediacms:latest
    environment:
      - MEDIA_IS_UNICODE=true
  owncast:
    image: ghcr.io/owncast/owncast:latest
    ports: ["1935:1935", "8080:8080"]  # RTMP + Web
  whisper-worker:
    build: ./whisper-worker  # whisper.cpp + FastAPI wrapper
    volumes: ["./models:/models"]
  opengen-ai:
    image: open-generative-ai:latest
    deploy:
      resources:
        reservations:
          devices: [{driver: nvidia, capabilities: [gpu]}]
  faiss-search:
    build: ./faiss-service
```

**Outcome:** Complete AI-enabled media platform deployable on a single GPU server or Kubernetes cluster; eliminates $5k–$20k/month in SaaS costs for mid-size media operations; full data sovereignty.

---

## Pattern 6: Podcast AI Production Assistant

**Use case:** Podcast network (50+ shows) wants to automate show notes, chapter markers, transcript publishing, social clips, and audio cleanup.

**Components:**
- **Transcription + diarization:** [m-bain/whisperX](https://github.com/m-bain/whisperX) (BSD-2-Clause)
- **LLM summarization:** Claude Sonnet 5 or Llama 3.3 70B (for on-prem)
- **Short clips:** [mutonby/openshorts](https://github.com/mutonby/openshorts) (MIT) — AI clip extraction
- **Audio hosting:** [advplyr/audiobookshelf](https://github.com/advplyr/audiobookshelf) (GPL-3.0)
- **Music bed generation:** [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) (MIT) — MusicGen for royalty-free intros/outros

**Wiring:**
```
[Episode MP3/WAV upload] → WhisperX
    │
    ├── Diarized transcript (Host A / Host B / Guest)
    ├── LLM: generate show notes (200 words) + 5 chapter titles + timestamps
    ├── LLM: extract 3 best quotes → OpenShorts clip generator → 3× social clips (60s)
    ├── AudioCraft MusicGen: generate 30s intro music matching show mood
    └── Audiobookshelf API: publish episode + chapters + transcript + show notes

[RSS Feed] → distributed to Spotify, Apple Podcasts, etc.
```

**Outcome:** Per-episode production time drops from 3–4 hours (manual) to 20 minutes (AI-assisted + human review); social clip output increases 5× with zero additional editing effort.
