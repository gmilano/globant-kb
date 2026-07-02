# Foundational Repositories — Media & Entertainment

> These are the open-source bedrock that Globant media engagements should be built on or integrate with.

## Speech & Audio Processing

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [openai/whisper](https://github.com/openai/whisper) | MIT | 75k+ | Automatic speech recognition trained on 680k hours; supports 99 languages and translation; the universal starting point for any audio/video transcription pipeline |
| [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | MIT | 15k+ | C/C++ port of Whisper with no Python dependency; runs on CPU, Apple Silicon (Core ML), and CUDA; embeds into broadcast hardware, mobile apps, and desktop NLEs |
| [m-bain/whisperX](https://github.com/m-bain/whisperX) | BSD-2-Clause | 13k+ | Adds word-level timestamps and multi-speaker diarization to Whisper using pyannote.audio; the production standard for podcast transcription and multi-host shows |
| [collabora/WhisperLive](https://github.com/collabora/WhisperLive) | MIT | 4k+ | WebSocket-based near-real-time Whisper server; handles live transcription streams for broadcast, live events, and accessibility captions |

## Video Generation

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) | Apache 2.0 | 22k+ | Open-source text-to-video generation; supports variable resolution and duration; usable for synthetic B-roll, promotional short clips, and storyboard visualization |
| [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video) | Apache 2.0 | 8k+ | LTX-2.3: first open-source model with native 4K output and synchronized audio generation (HiFi-GAN at 24kHz stereo); released March 2026 |
| [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | MIT | 7.5k+ | Self-hosted studio for 200+ image/video models; REST API for batch generation; MIT makes it fully commercializable in client deployments |

## Image Generation (Visual Media)

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) | GPL-3.0 | 65k+ | Node-based AI generation pipeline; primary tool for complex multi-step media asset workflows: thumbnail generation, cover art, consistent visual style across episode series |
| [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) | AGPL-3.0 | 140k+ | Most widely used SD interface; powers high-volume thumbnail, poster, key art, and promo asset generation; note AGPL requires open-sourcing modifications in networked deployments |

## Media Infrastructure & Streaming

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | AGPL-3.0 | 2.5k+ | Modern open-source video and media CMS (Python/Django + React) with REST API, HLS streaming, video encoding, search, and access control; basis for private VOD platforms |
| [owncast/owncast](https://github.com/owncast/owncast) | MIT | 10k+ | Self-hosted live streaming server (Go + React); RTMP ingest, HLS output, built-in chat; MIT license makes it ideal for white-label live event platforms |
| [Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | AGPL-3.0 | 13k+ | Federated ActivityPub-based video hosting (Node.js); WebTorrent P2P delivery reduces bandwidth costs; the leading self-hosted YouTube alternative |

## Media Processing & Search

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp) | Unlicense | 85k+ | Feature-rich video downloader supporting 1000+ sites; widely used in media archiving, content ingestion pipelines, and competitive monitoring (check ToS per platform) |
| [facebookresearch/faiss](https://github.com/facebookresearch/faiss) | MIT | 33k+ | Efficient similarity search and clustering for dense vectors; powers semantic video/audio search, content-based recommendation, and near-duplicate detection in media archives |
| [jina-ai/jina](https://github.com/jina-ai/jina) | Apache 2.0 | 20k+ | Neural search and MLOps framework; used for multimodal media search (image+text+audio), powering "find similar clips" and AI-driven content discovery features |
