# 🏗️ Foundational Repos — Media & Entertainment

> Build-on-top foundations: active communities, open licenses, production-proven.
> Last updated: 2026-07-06

## Core AI Model Foundations

| Repo | License | Stars | Description | Why foundational |
|------|---------|-------|-------------|------------------|
| [openai/whisper](https://github.com/openai/whisper) | MIT | 104k+ | Multilingual ASR — 680k hrs training; 99-language transcription + translation | Standard for subtitling, dubbing, accessibility, live captioning — every media pipeline needs this |
| [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | MIT | 51k+ | Whisper in C/C++ with CUDA/Metal/Vulkan; quantized; real-time on consumer HW | Production deployment layer for whisper — integrates into broadcast and mobile workflows |
| [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) | Apache-2.0 | 24k+ | Open video generation (11B); T2V + I2V; full training code + checkpoints; ~$200K training cost | Only fully open video model with training code — enables fine-tuning on proprietary content |
| [Wan-Video/Wan2.1](https://github.com/Wan-Video/Wan2.1) | Apache-2.0 | 18k+ | Alibaba Tongyi MoE; 1.3B (8GB VRAM) + 14B (24GB); T2V + I2V; Apache commercial | Best open T2V for consumer GPU deployments; Wan 2.2 is 30% faster at 720p |
| [THUDM/CogVideo](https://github.com/THUDM/CogVideo) | Apache-2.0 | 12.5k | Zhipu AI; 2B + 5B variants; native HF Diffusers; best multi-clause prompt following | Diffusers-native = easiest integration into existing ML pipelines; CogKit for fine-tuning |

## Media Infrastructure Foundations

| Repo | License | Stars | Description | Why foundational |
|------|---------|-------|-------------|------------------|
| [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) | GPL-2.0 | 40k+ | Free Software Media System; no-vendor-lock media server; 1,100+ contributors | Largest fully open media server — streaming backbone for internal content platforms |
| [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) | AGPL-3.0 | 145k+ | Leading open image generation UI; API mode; ControlNet, LoRA, fine-tuning ecosystem | Industry-standard for concept art, storyboarding, marketing assets, thumbnail generation at scale |
| [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) | Apache-2.0 | 27.5k | Professional creative engine for SD models; Node-based workflow builder; API-first | Apache-2.0 (vs AGPL) makes it the preferred commercial-safe alternative to A1111 |
| [google-ai-edge/mediapipe](https://github.com/google-ai-edge/mediapipe) | Apache-2.0 | 28k+ | Cross-platform ML for face detection, pose, object tracking, hand tracking | AR/VR content tools, broadcast overlays, interactive media — base layer for real-time CV |

## Audio/Music Foundations

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [facebookresearch/demucs](https://github.com/facebookresearch/demucs) | MIT | 9k+ | Music source separation (vocals/drums/bass/other); v4 Hybrid Transformer |
| [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) | MIT | 22k+ | Meta's audio generation: MusicGen (text-to-music) + AudioGen (text-to-sound) + EnCodec |
| [suno-ai/bark](https://github.com/suno-ai/bark) | MIT | 36k+ | Text-to-audio: speech + music + sound effects; multilingual; AI voiceover/dubbing |

---
*See also: `verticals/solutions.md` for full vertical platforms to build on top of.*
