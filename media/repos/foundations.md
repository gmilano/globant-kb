# 🏗️ Foundational Repos — Media & Entertainment

> Core repositories to build on. Open licenses. Active communities.
> Last updated: 2026-07-08 (v7 — Wan 2.7, KrillinAI, open-dubbing added; fish-speech noted non-commercial)

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
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Apache-2.0 | ~6.1k | Full-song music generation from lyrics (lyrics2song) — vocals + accompaniment, multi-minute output | Yes — original songs |
| [ace-step/ace-step](https://github.com/ace-step/ace-step) | Apache-2.0 | ~2k | Text-to-audio model with Block Flow Matching for parallel denoising; high-fidelity music from descriptions | Yes — music gen |
| [souzatharsis/podcastfy](https://github.com/souzatharsis/podcastfy) | Apache-2.0 | ~3k | Multi-modal to multilingual podcast: URLs, PDFs, YouTube, text → AI audio conversation; 100+ LLM backends | Yes — content → podcast |
| [facebookresearch/demucs](https://github.com/facebookresearch/demucs) | MIT | ~9k | Hybrid Transformer Demucs v4: drums/bass/vocals/other separation, 9.20 dB SDR | Yes — stem separation |
| [spotify/pedalboard](https://github.com/spotify/pedalboard) | GPL-3.0 | ~5.5k | Python audio effects library — VST3/AU support, 300× faster than other libs | Yes — audio ML pipeline |
| [coqui-ai/TTS](https://github.com/coqui-ai/TTS) | MPL-2.0 | ~36k | Deep learning TTS: 1100+ models, voice cloning, multilingual (incl. Spanish/Portuguese) | Yes — broadcast voiceover |
| [fishaudio/fish-speech](https://github.com/fishaudio/fish-speech) | Fish Audio Research License ⚠️ | ~31k | SOTA open-source TTS (rivals ElevenLabs quality). **Non-commercial only** — commercial license required from Fish Audio. Use Coqui for client production; fish-speech for internal benchmarking only. | Research/eval only |

## Video Generation

| Repo | License | Stars | Description | AI-Ready |
|------|---------|-------|-------------|----------|
| [THUDM/CogVideo](https://github.com/THUDM/CogVideo) | Apache-2.0 | ~12.5k | CogVideoX-1.5/5B text/image-to-video — best developer experience in class | Yes — enterprise-safe |
| [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video) | Apache-2.0 | ~6k | Real-time video gen at 30fps/1216×704 — faster than real-time on A100 | Yes — interactive apps |
| [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) | Apache-2.0 | ~18k | **Wan 2.7** (Apr 2026): "Thinking Mode" reasoning before generation, 1080p/15s, native audio, first/last frame control, 5000-char prompts — flagship open Apache video model for H2 2026 | Yes — default recommendation |
| [vita-epfl/Stable-Video-Infinity](https://github.com/vita-epfl/Stable-Video-Infinity) | Apache-2.0 | ~2k | ICLR 2026 Oral — infinite-length generation with error recycling | Yes — long-form content |
| [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) | Apache-2.0 | ~8k | First open-source 4K video+audio model in a single pass; 22B DiT, IC-LoRA fine-tuning, LTX Desktop editor; Jan 2026 | Yes — 4K production |
| [SkyworkAI/SkyReels-V2](https://github.com/SkyworkAI/SkyReels-V2) | Apache-2.0 | ~4.5k | Infinite-length film via Autoregressive Diffusion-Forcing; V1 is human-centric on HunyuanVideo | Yes — long-form/character |
| [SandAI-org/MAGI-1](https://github.com/SandAI-org/MAGI-1) | Apache-2.0 | ~3.5k | 24B autoregressive video (chunk-by-chunk, 24 frames/chunk); 4.5B variant for low-VRAM; streaming generation | Yes — streaming/interactive |
| [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) | Apache-2.0 | ~22k | Ships full training pipeline + weights — data preprocessing, training scripts, eval tools all included | Yes — training/fine-tuning |
| [comfy-org/comfyui](https://github.com/comfy-org/comfyui) | GPL-3.0 | ~75k | Node-based GUI for all diffusion models; every major 2026 video model has ComfyUI nodes | Yes (backend API usable) |

## Media Distribution & Streaming

| Repo | License | Stars | Description | AI-Ready |
|------|---------|-------|-------------|----------|
| [Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | AGPL-3.0 | ~13k | ActivityPub-federated video platform — YouTube alternative, REST API | Plugin AI caption/search |
| [owncast/owncast](https://github.com/owncast/owncast) | MIT | ~9.5k | Self-hosted live streaming + chat server (Go backend, React frontend) | Yes — AI moderation hooks |
| [AzuraCast/AzuraCast](https://github.com/AzuraCast/AzuraCast) | Apache-2.0 | ~3.5k | Web radio management suite — stations, playlists, DJ accounts, analytics | AI playlist scheduling |
| [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | AGPL-3.0 | ~3.2k | Full-featured video & media CMS (Python/Django + React) with REST API | AI search, auto-tagging |

## Self-Hosted AI Studio Platforms

| Repo | License | Stars | Description | AI-Ready |
|------|---------|-------|-------------|----------|
| [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | MIT | ~22.6k | Self-hosted studio: Image + Video + Lip Sync + Cinema tabs, 200+ models (Flux, Kling, Sora, Veo), no filters; viral Apr 2026 | Yes — full studio |

## Video Localization & Dubbing (v7 addition)

| Repo | License | Stars | Description | AI-Ready |
|------|---------|-------|-------------|----------|
| [krillinai/KrillinAI](https://github.com/krillinai/KrillinAI) | Apache-2.0 | ~10.4k | AI-Agent-native video translation & dubbing: full pipeline (download → transcribe → translate → TTS → reformat → cover). `skills/` directory exposes each stage as composable agent skill. 100+ languages, YouTube/TikTok/Bilibili optimized. | Yes — agent orchestration |
| [Softcatala/open-dubbing](https://github.com/Softcatala/open-dubbing) | MIT | ~800 | Fully local dubbing via OSS models — Coqui/MMS/Edge TTS + Meta NLLB translation. No cloud dependency, LGPD-compliant offline option. | Yes — local/offline |

## Broadcast & Infrastructure

| Repo | License | Stars | Description | AI-Ready |
|------|---------|-------|-------------|----------|
| [ebu/awesome-broadcasting](https://github.com/ebu/awesome-broadcasting) | Various | ~1.5k | EBU curated list of open source broadcast tech: playout, encoding, monitoring | Reference list |
| [SYSTRAN/CTranslate2](https://github.com/OpenNMT/CTranslate2) | MIT | ~4k | Fast Transformer inference engine — powers faster-whisper; INT8/FP16 on CPU+GPU | Yes — inference infra |

## AI-Readiness Matrix

| Category | Best Pick (Apache/MIT) | Why |
|----------|----------------------|-----|
| Transcription / captions | SYSTRAN/faster-whisper | 4× faster, INT8, MIT license |
| Music generation (BGM/SFX) | facebookresearch/audiocraft | Industry standard, MIT code |
| Music generation (full songs) | multimodal-art-projection/YuE | Lyrics → complete song, Apache-2.0 |
| Podcast generation | souzatharsis/podcastfy | Apache-2.0, 100+ LLM backends, multilingual |
| Source separation | facebookresearch/demucs | Best SDR, MIT, Python |
| Video generation (general/default) | Wan-Video/Wan2.2 (Wan 2.7) | Thinking Mode + first/last frame + native audio, Apache-2.0 |
| Video generation (4K + audio) | Lightricks/LTX-2 | First native audio+video, Apache-2.0 |
| Video generation (training) | hpcaitech/Open-Sora | Full training pipeline included |
| Long-form video | SkyworkAI/SkyReels-V2 | Infinite via ADF, Apache-2.0 |
| Long-form video (alt) | vita-epfl/Stable-Video-Infinity | ICLR Oral, error recycling |
| Streaming video (autoregressive) | SandAI-org/MAGI-1 | Chunk-by-chunk, streaming output |
| Video translation/dubbing (agent) | krillinai/KrillinAI | Apache-2.0, AI-Agent-native, 100+ languages |
| Video dubbing (local/LGPD) | Softcatala/open-dubbing | MIT, no cloud dependency, Coqui/NLLB |
| Self-hosted studio | Anil-matcha/Open-Generative-AI | 200+ models, MIT, desktop installer |
| Live streaming | owncast/owncast | MIT, Go, single binary |
| Radio automation | AzuraCast/AzuraCast | Apache-2.0, full stack |
| Video CMS | mediacms-io/mediacms | Most actively maintained |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
