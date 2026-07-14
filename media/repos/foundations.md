# Foundational Repos — Media & Entertainment AI

> These are the bedrock open-source projects for M&E AI. Real repos, real stars, real licenses Globant can build on.
> Last updated: 2026-07-14 (v10 — full rewrite)

## Vision & Image

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [IDEA-Research/Grounded-Segment-Anything](https://github.com/IDEA-Research/Grounded-Segment-Anything) | Apache-2.0 | ~17.7k | GroundingDINO + SAM + Stable Diffusion — detect, segment, generate in one pipeline; powers content isolation and VFX roto |
| [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) | Apache-2.0 | ~27.5k | Professional creative engine for Stable Diffusion; canvas, brushes, workflows; API-first; studio production image generation |
| [Sanster/IOPaint](https://github.com/Sanster/IOPaint) | Apache-2.0 | ~23k | SOTA AI inpainting/outpainting — remove objects, restore photos, fill backgrounds; integrates into post-production pipelines |
| [prs-eth/Marigold](https://github.com/prs-eth/Marigold) | Apache-2.0 | ~5k | Diffusion monocular depth estimation with Rolling Depth temporal consistency (CVPR 2025); feeds into VFX depth compositing |
| [apple/ml-stable-diffusion](https://github.com/apple/ml-stable-diffusion) | MIT | ~17.9k | Stable Diffusion optimized for Apple Silicon via Core ML; on-device generation for mobile/tablet M&E apps |
| [comfy-org/ComfyUI](https://github.com/comfy-org/ComfyUI) | GPL-3.0 | ~75k | Node-graph AI creative pipeline; de-facto standard local diffusion UI; video, 3D, audio nodes; use behind API boundary for commercial work |

## Audio & Music

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) | MIT (code) | ~22k | Meta's audio generation suite: MusicGen (text-to-music), AudioGen (sound effects), EnCodec (audio codec); 20k hours training data |
| [ace-step/ACE-Step-1.5](https://github.com/ace-step/ACE-Step-1.5) | Apache-2.0 | ~6k | 4B DiT music foundation model; 3 variants (base/sft/turbo); <2 s/song on A100; LoRA fine-tuning; surpasses most commercial music APIs |
| [myshell-ai/OpenVoice](https://github.com/myshell-ai/OpenVoice) | MIT | ~32k | Instant voice cloning with granular style control (emotion, accent, rhythm, speed); zero-shot cross-lingual — LATAM dubbing workhorse |
| [nari-labs/dia](https://github.com/nari-labs/dia) | Apache-2.0 | ~13k | 1.6B TTS model generating dialogue with non-verbal cues (laughs, coughs, sighs); transcript-to-realistic-dialogue for dubbing/podcasts |
| [resemble-ai/chatterbox](https://github.com/resemble-ai/chatterbox) | Apache-2.0 | ~9k | Production-grade TTS with emotion exaggeration control; ultra-stable voice identity across long-form content; streaming support |
| [openai/whisper](https://github.com/openai/whisper) | MIT | ~104k | Robust speech recognition across 100+ languages; subtitle generation, transcription, diarization foundation |
| [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | MIT | ~51k | C/C++ Whisper port — runs on-device, embedded, and edge; sub-100 ms latency for live captioning |

## Video Generation

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) | Apache-2.0 | ~18k | Alibaba Tongyi MoE video diffusion; 5s 720p on RTX 4090; first/last frame control; Wan-Bench 2.0 open leader (Wan 2.7) |
| [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video) | Apache-2.0 | ~9k | LTX-2.3: only OSS model with native joint audio-video generation in one pass; 4K 50 FPS; IC-LoRA camera control |
| [cumulo-autumn/StreamDiffusion](https://github.com/cumulo-autumn/StreamDiffusion) | Apache-2.0 | ~12k | Real-time interactive video diffusion pipeline; minimal-latency live generation; OBS/streaming integration |

## Speech-to-Text / Subtitling

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [openai/whisper](https://github.com/openai/whisper) | MIT | ~104k | Gold standard ASR for transcript generation, multilingual subtitle automation |
| [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | MIT | ~51k | Edge deployment; real-time CC for live broadcast |

## Orchestration (M&E-relevant)

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~14k | Stateful multi-agent with HITL interrupts — content approval gates, editorial review loops |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Sustainable Use | ~52k | 400+ integrations; connects broadcast metadata systems, DAM, CDN, and AI APIs visually |

---
*See verticals/solutions.md for full platform-level systems (CMS, DAM, streaming).*
*GPL-3.0 (ComfyUI) requires API/container boundary for commercial products.*
