# 🏗️ Foundational Repos — Media & Entertainment AI

> Battle-tested bases to build on. Open licenses, active communities.
> Last updated: 2026-07-14 (v9)

## Video Generation Foundations

| Repo | License | Description | Stars |
|------|---------|-------------|-------|
| [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) | GPL-3.0 | Node-based visual workflow engine for diffusion models. Supports LTX-Video, Wan, HunyuanVideo, FLUX. Industry standard for AI video pipelines. ComfyUI Manager adds 2,000+ extensions. | 100k+ |
| [anil-matcha/open-generative-ai](https://github.com/anil-matcha/open-generative-ai) | MIT | Self-hosted creative studio: 200+ image/video/lip-sync models unified in one UI. Deploy on your infra, no filters, no subscription lock-in. | ~21.8k |
| [deepbeepmeep/Wan2GP](https://github.com/deepbeepmeep/Wan2GP) | Apache-2.0 | Multi-model video runner: Wan 2.1/2.2, LTX-2, HunyuanVideo, Flux. Optimized for consumer GPUs. Free, no license fees. | ~8k |
| [Lightricks/ltx-video](https://github.com/Lightricks/ltx-video) | Lightricks License | 22B-param DiT model, first synchronized audio+video in single pass. 4K @50fps, 24kHz stereo audio. ComfyUI nodes: [Lightricks/ComfyUI-LTXVideo](https://github.com/Lightricks/ComfyUI-LTXVideo). | ~7k |
| [Tencent-Hunyuan/HunyuanVideo](https://github.com/Tencent-Hunyuan/HunyuanVideo) | Tencent Community | 13B → 8.3B (v1.5) video gen model. ComfyUI-native. Broad commercial with license review. HunyuanVideo-Foley adds synchronized SFX/audio. | ~20k |

## Audio / Music Foundations

| Repo | License | Description | Stars |
|------|---------|-------------|-------|
| [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) | MIT (code) | Meta FAIR: MusicGen (text-to-music), AudioGen (text-to-SFX), EnCodec audio tokenizer. Training + inference. CC-BY-NC on model weights. | ~22k |
| [ace-step/ACE-Step](https://github.com/ace-step/ACE-Step) | Apache-2.0 | Music generation foundation by ACE Studio + StepFun. v1.5 rivals Suno v4.5 quality. Text + lyrics → full track with vocals. Local, unlimited. | ~6k |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Apache-2.0 | Full-song generation up to 5 min: synchronized vocals, accompaniment, multi-language (EN/CN/JP/KR), multi-genre. Advanced timing/pitch/emotion control. | ~5k |

## Speech / Transcription Foundations

| Repo | License | Description | Stars |
|------|---------|-------------|-------|
| [openai/whisper](https://github.com/openai/whisper) | MIT | OpenAI Whisper: robust multilingual speech recognition, 99 language support, transcription + translation. Foundation for all downstream ASR tools. | 104k+ |
| [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | MIT | C/C++ port of Whisper. Zero dependencies, runs on CPU/GPU/Apple Silicon/edge devices. Outputs SRT/VTT directly. Ideal for embedded media pipelines. | ~51k |
| [m-bain/whisperX](https://github.com/m-bain/whisperX) | BSD-4-Clause | Whisper + word-level timestamps + speaker diarization (pyannote). 4× faster via CTranslate2. Production-grade for subtitle sync and transcript search. | ~14k |

## Streaming / Distribution Foundations

| Repo | License | Description | Stars |
|------|---------|-------------|-------|
| [Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | AGPL-3.0 | Decentralized federated video platform (ActivityPub). v8.1 (Mar 2026): podcast support, domain-restricted embeds, 3× playback. Full REST API for AI integration. | ~14k |
| [owncast/owncast](https://github.com/owncast/owncast) | MIT | Self-hosted live streaming + chat. Single-binary deploy. Built-in viewer stats, moderation, stream quality settings. Claude+Redis integration pattern (Interactive CTV). | ~10k |
| [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | AGPL-3.0 | Modern video/media CMS in Python/Django/React. REST API, HLS streaming, subtitle support, search. Best self-hosted YouTube alternative. | ~3k |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
