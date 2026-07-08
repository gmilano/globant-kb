# 🎯 Top AI Agents & Tools — Media & Entertainment

> Open source AI agents and tools for the media industry. Focus: MIT / Apache 2.0.
> Last updated: 2026-07-08 (v7 — Wan 2.7 Thinking Mode, KrillinAI agentic dubbing added)

## Top 10 AI Agents & Tools

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| **Whisper** | [openai/whisper](https://github.com/openai/whisper) | MIT | ~104k | Robust multilingual speech recognition — the universal transcription engine for broadcast, podcast, subtitle generation, and voice search |
| **faster-whisper** | [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper) | MIT | ~15k | CTranslate2-powered reimplementation: 4× faster than openai/whisper at the same accuracy, INT8 quantization, production-ready |
| **AudioCraft** | [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) | MIT (code) | ~22k | Meta's library for audio generation: MusicGen (text→music), AudioGen (text→sound effects), EnCodec compressor/tokenizer |
| **Demucs** | [facebookresearch/demucs](https://github.com/facebookresearch/demucs) | MIT | ~9k | Hybrid Transformer Demucs v4 — state-of-the-art music source separation (drums/bass/vocals/other), 9.20 dB SDR on MUSDB HQ |
| **WhisperX** | [m-bain/whisperX](https://github.com/m-bain/whisperX) | BSD-2 | ~13k | Whisper + phoneme alignment model: word-level timestamps + speaker diarization — essential for closed captions and forensic analysis |
| **CogVideoX** | [THUDM/CogVideo](https://github.com/THUDM/CogVideo) | Apache-2.0 | ~12.5k | Text/image-to-video generation from Tsinghua; CogVideoX-1.5 and 5B variants, most developer-friendly open video model |
| **ViMax** | [HKUDS/ViMax](https://github.com/HKUDS/ViMax) | MIT | ~1.1k | Agentic end-to-end video generation: Director + Screenwriter + Producer + Generator all-in-one; character/scene consistency across shots |
| **OpenMontage** | [Open-Montage/OpenMontage](https://github.com/Open-Montage/OpenMontage) | MIT | ~3k | World's first open-source agentic video production system — 12 pipelines, 52 tools, 500+ agent skills; plain-language video production |
| **ComfyUI** | [comfy-org/comfyui](https://github.com/comfy-org/comfyui) | GPL-3.0 | ~75k | Node-based diffusion model GUI/backend — de-facto standard for image/video production workflows; all major 2026 video models supported |
| **Stable-Video-Infinity** | [vita-epfl/Stable-Video-Infinity](https://github.com/vita-epfl/Stable-Video-Infinity) | Apache-2.0 | ~2k | ICLR 2026 Oral — infinite-length video generation with error recycling; resolves the coherence-over-time problem for long-form content |

## 2026 Breakthrough Models (4th-Pass Additions)

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| **LTX-2** | [Lightricks/LTX-2](https://github.com/Lightricks/LTX-2) | Apache-2.0 | ~8k | First open-source model to generate native 4K video with synchronized audio in a single pass; released Jan 6, 2026; LTX-2.3 (Mar 2026) adds 22B DiT, IC-LoRA adapters, FP8 quant for 32GB GPUs |
| **SkyReels-V2** | [SkyworkAI/SkyReels-V2](https://github.com/SkyworkAI/SkyReels-V2) | Apache-2.0 | ~4.5k | Infinite-length film generation via Autoregressive Diffusion-Forcing (ADF); V1 is human-centric video on HunyuanVideo base — best for character consistency |
| **MAGI-1** | [SandAI-org/MAGI-1](https://github.com/SandAI-org/MAGI-1) | Apache-2.0 | ~3.5k | 24B autoregressive denoising model from Sand AI; generates chunk-by-chunk (24 frames/chunk); supports T2V, I2V, V2V with streaming generation; 4.5B variant also available |
| **Open-Generative-AI** | [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | MIT | ~22.6k | Self-hosted studio with 200+ models (Flux, Kling, Sora, Veo); Image + Video + Lip Sync + Cinema studios; viral April 2026 (+7.5k stars in days); no content filters |
| **Open-Sora 2.0** | [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) | Apache-2.0 | ~22k | Ships complete training pipeline alongside inference weights — the only major video model to do so; data preprocessing, training scripts, eval all included |

## v7 Additions (July 8, 2026)

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| **Wan 2.7** | [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) | Apache-2.0 | ~18k | Alibaba Tongyi Lab video gen with "Thinking Mode" — model reasons compositionally before rendering. 1080p/15s, native audio, first/last frame control, 5000-char prompts. Biggest open-source video model update of Q2 2026. |
| **KrillinAI** | [krillinai/KrillinAI](https://github.com/krillinai/KrillinAI) | Apache-2.0 | ~10.4k | AI-Agent-native video translation & dubbing. Full pipeline: download → transcribe → translate → TTS dub → reformat → cover. 100+ languages. `skills/` directory exposes each stage as AI Agent skill. YouTube/TikTok/Bilibili optimized. |

## 5th-Pass Additions (July 2026)

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| **YuE** | [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Apache-2.0 | ~6.1k | Full-song music generation from lyrics (lyrics2song) — the open-source Suno.ai alternative. Generates complete multi-minute songs with vocals + accompaniment from text prompts. Supports incremental generation. |
| **Podcastfy** | [souzatharsis/podcastfy](https://github.com/souzatharsis/podcastfy) | Apache-2.0 | ~3k | Python alternative to Google NotebookLM's podcast feature. Transforms multi-modal content (websites, PDFs, images, YouTube, text) into multilingual audio conversations using 100+ LLM backends (Anthropic, OpenAI, Google). |
| **NeuralNoise** | [leopiney/neuralnoise](https://github.com/leopiney/neuralnoise) | MIT | ~800 | Multi-agent AI podcast studio: agents collaborate to analyze content, write scripts, and generate audio. Uses "Podcast Studio" metaphor with specialized workers for each production step. |
| **ACE-Step 1.5** | [ace-step/ace-step](https://github.com/ace-step/ace-step) | Apache-2.0 | ~2k | Text-to-audio music model (Jan 2026). Transforms text descriptions into high-fidelity music tracks. Architecturally novel with Block Flow Matching for parallel latent denoising. |

## Supplementary Tools

| Name | Repo | License | Stars | Use Case |
|------|------|---------|-------|----------|
| **whisper.cpp** | [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | MIT | ~51k | C/C++ port of Whisper — runs on edge devices, RPi, mobile; ideal for real-time on-device captioning |
| **LTX-Video** | [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video) | Apache-2.0 | ~6k | Generates 30fps at 1216×704 faster than real-time on capable hardware; Apache-2.0 friendly for production |
| **Wan Video** | [Wan-Video/Wan2.1](https://github.com/Wan-Video/Wan2.1) | Apache-2.0 | ~12k | Apache 2.0 video gen, strong feature set: image conditioning, higher resolution, MoE architecture (Wan 2.2) |
| **WhisperSpeech** | [WhisperSpeech/WhisperSpeech](https://github.com/WhisperSpeech/WhisperSpeech) | MIT | ~4k | Open-source TTS built by inverting Whisper; natural-sounding voices for broadcast automation and podcast generation |
| **Coqui-ai/TTS** | [coqui-ai/TTS](https://github.com/coqui-ai/TTS) | MPL-2.0 | ~36k | Deep learning TTS library: 1100+ pretrained models, fine-tuning, voice cloning — production broadcast voiceover |

## MCP Servers for Media

| Server | Source | Description |
|--------|--------|-------------|
| `@anthropic/mcp-server-fetch` | npm | Fetch web pages and media metadata for content research |
| `mcp-youtube` | community | YouTube transcript extraction, metadata; essential for content repurposing |
| `mcp-ffmpeg` | community | Wrap ffmpeg operations as MCP tools for agent-driven media transcoding |
| `mcp-whisper` | community | Local Whisper transcription as an MCP server for agent pipelines |
| `krillinai-skills` | krillinai | KrillinAI `skills/` directory: per-stage AI Agent skills for orchestrating video dubbing pipelines |

## Key Datasets

| Dataset | License | Description |
|---------|---------|-------------|
| MUSDB HQ | CC-BY-NC | 150 tracks for music source separation benchmarking |
| LibriSpeech | CC-BY-4.0 | 1000h audiobook speech for ASR training |
| Common Voice | CC-0 | Mozilla multilingual speech corpus (120+ languages) |
| Kinetics-700 | CC-BY-4.0 | Video action recognition benchmark |
| WebVid-10M | Custom | 10M video-text pairs for video-language model training |

---
*Auto-updated by ingest pipeline. Focus: MIT/Apache 2.0/BSD licenses suitable for Globant client builds.*
