# 🏗️ Foundational Repos — Media & Entertainment

> Core repositories to build on. Open licenses. Active communities.
> Last updated: 2026-07-07

## Speech & Transcription

| Repo | License | Stars | Description | AI-Ready |
|------|---------|-------|-------------|----------|
| [openai/whisper](https://github.com/openai/whisper) | MIT | ~104k | Robust multilingual ASR via large-scale weak supervision — 99 languages, 680k hours training data | Yes — best accuracy |
| [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper) | MIT | ~15k | CTranslate2 reimplementation: 4× faster, INT8 quantization, production-ready | Yes — default for prod |
| [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | MIT | ~51k | C/C++ port — runs on RPi, mobile, edge; no Python dep | Yes — edge/IoT |
| [m-bain/whisperX](https://github.com/m-bain/whisperX) | BSD-2 | ~13k | Word-level timestamps + speaker diarization — closed captions, forensics | Yes — captions/subtitles |

## Audio Generation & Processing

| Repo | License | Stars | Description | AI-Ready |
|------|---------|-------|-------------|----------|
| [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) | MIT* | ~22k | MusicGen (text→music), AudioGen (text→SFX), EnCodec tokenizer. *models CC-BY-NC | Yes — BGM/SFX generation |
| [facebookresearch/demucs](https://github.com/facebookresearch/demucs) | MIT | ~9k | Hybrid Transformer Demucs v4: drums/bass/vocals/other separation, 9.20 dB SDR | Yes — stem separation |
| [spotify/pedalboard](https://github.com/spotify/pedalboard) | GPL-3.0 | ~5.5k | Python audio effects library — VST3/AU support, 300× faster than other libs | Yes — audio ML pipeline |
| [coqui-ai/TTS](https://github.com/coqui-ai/TTS) | MPL-2.0 | ~36k | Deep learning TTS: 1100+ models, voice cloning, multilingual (incl. Spanish/Portuguese) | Yes — broadcast voiceover |

## Video Generation

| Repo | License | Stars | Description | AI-Ready |
|------|---------|-------|-------------|----------|
| [THUDM/CogVideo](https://github.com/THUDM/CogVideo) | Apache-2.0 | ~12.5k | CogVideoX-1.5/5B text/image-to-video — best developer experience in class | Yes — enterprise-safe |
| [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video) | Apache-2.0 | ~6k | Real-time video gen at 30fps/1216×704 — faster than real-time on A100 | Yes — interactive apps |
| [Wan-Video/Wan2.1](https://github.com/Wan-Video/Wan2.1) | Apache-2.0 | ~12k | MoE video model: image conditioning, 24GB GPU deployment, Wan 2.2 update | Yes — Apache-safe |
| [vita-epfl/Stable-Video-Infinity](https://github.com/vita-epfl/Stable-Video-Infinity) | Apache-2.0 | ~2k | ICLR 2026 Oral — infinite-length generation with error recycling | Yes — long-form content |
| [comfy-org/comfyui](https://github.com/comfy-org/comfyui) | GPL-3.0 | ~75k | Node-based GUI for all diffusion models; every major 2026 video model has ComfyUI nodes | Yes (backend API usable) |

## Media Distribution & Streaming

| Repo | License | Stars | Description | AI-Ready |
|------|---------|-------|-------------|----------|
| [Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | AGPL-3.0 | ~13k | ActivityPub-federated video platform — YouTube alternative, REST API | Plugin AI caption/search |
| [owncast/owncast](https://github.com/owncast/owncast) | MIT | ~9.5k | Self-hosted live streaming + chat server (Go backend, React frontend) | Yes — AI moderation hooks |
| [AzuraCast/AzuraCast](https://github.com/AzuraCast/AzuraCast) | Apache-2.0 | ~3.5k | Web radio management suite — stations, playlists, DJ accounts, analytics | AI playlist scheduling |
| [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | AGPL-3.0 | ~3.2k | Full-featured video & media CMS (Python/Django + React) with REST API | AI search, auto-tagging |

## Broadcast & Infrastructure

| Repo | License | Stars | Description | AI-Ready |
|------|---------|-------|-------------|----------|
| [ebu/awesome-broadcasting](https://github.com/ebu/awesome-broadcasting) | Various | ~1.5k | EBU curated list of open source broadcast tech: playout, encoding, monitoring | Reference list |
| [SYSTRAN/CTranslate2](https://github.com/OpenNMT/CTranslate2) | MIT | ~4k | Fast Transformer inference engine — powers faster-whisper; INT8/FP16 on CPU+GPU | Yes — inference infra |

## AI-Readiness Matrix

| Category | Best Pick (Apache/MIT) | Why |
|----------|----------------------|-----|
| Transcription / captions | SYSTRAN/faster-whisper | 4× faster, INT8, MIT license |
| Music generation | facebookresearch/audiocraft | Industry standard, MIT code |
| Source separation | facebookresearch/demucs | Best SDR, MIT, Python |
| Video generation | THUDM/CogVideo | Apache-2.0, best docs, 12.5k★ |
| Long-form video | vita-epfl/Stable-Video-Infinity | ICLR Oral, Apache-2.0 |
| Live streaming | owncast/owncast | MIT, Go, single binary |
| Radio automation | AzuraCast/AzuraCast | Apache-2.0, full stack |
| Video CMS | mediacms-io/mediacms | Most actively maintained |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
