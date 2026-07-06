# 🎬 Top AI Agents & Tools — Media & Entertainment

> Open source AI agents and tools for the media industry. Focus: MIT / Apache 2.0 / BSD.
> Last updated: 2026-07-06

## Top Agents & Tools

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| Whisper | [openai/whisper](https://github.com/openai/whisper) | MIT | 104k+ | OpenAI's multilingual ASR — 680k hrs training; 99-language transcription + translation; foundation for subtitling, dubbing, and accessibility pipelines |
| Open-Sora | [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) | Apache-2.0 | 24k+ | Fully open video generation (11B model); T2V + I2V; trained for ~$200K; on-par with HunyuanVideo on VBench; includes training code + checkpoints |
| Wan 2.1 | [Wan-Video/Wan2.1](https://github.com/Wan-Video/Wan2.1) | Apache-2.0 | 18k+ | Alibaba Tongyi MoE video model; 1.3B variant runs on 8GB VRAM, 14B on 24GB; strongest open-source T2V/I2V on consumer GPUs; Wan 2.2 is 30% faster at 720p; fully commercial |
| CogVideoX | [THUDM/CogVideo](https://github.com/THUDM/CogVideo) | Apache-2.0 | 12.5k | Zhipu AI video gen; 2B and 5B variants; best-in-class multi-clause prompt following; native Hugging Face Diffusers integration; 16GB VRAM min |
| HunyuanVideo | [Tencent-Hunyuan/HunyuanVideo](https://github.com/Tencent-Hunyuan/HunyuanVideo) | Apache-2.0† | 11.9k | Tencent's production video model (720p/1080p); HunyuanVideo 1.5 is Apache-2.0; exceptional motion quality; requires 60–80GB VRAM for full model |
| ViMax | [HKUDS/ViMax](https://github.com/HKUDS/ViMax) | MIT | 4k+ | Agentic end-to-end video production: Director + Screenwriter + Producer + Video Generator; orchestrates scriptwriting, storyboarding, character creation, and final video synthesis |
| WhisperX | [m-bain/whisperX](https://github.com/m-bain/whisperX) | BSD-4 | 11k+ | Whisper + word-level timestamps + speaker diarization; production-ready subtitle and caption pipeline; faster inference than vanilla Whisper |
| whisper.cpp | [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | MIT | 51k+ | Whisper in C/C++; Apple Silicon Metal, CUDA, OpenCL, Vulkan backends; quantized models; real-time on consumer hardware; CoreML backend for on-device live captioning |
| MediaPipe | [google-ai-edge/mediapipe](https://github.com/google-ai-edge/mediapipe) | Apache-2.0 | 28k+ | Google cross-platform ML for face detection, pose estimation, object tracking, hand tracking — core building block for AR/VR content, broadcast overlays |
| Stable Diffusion (AUTOMATIC1111) | [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) | AGPL-3.0 | 145k+ | The leading open-source image generation UI; used industry-wide for concept art, storyboarding, marketing assets, thumbnail generation at scale |

†HunyuanVideo 1.5+ is Apache-2.0; earlier versions used Tencent Community License (commercial ≤100M MAU).

---

## Specialized Supporting Tools

| Name | Repo | License | Purpose |
|------|------|---------|--------|
| Demucs | [facebookresearch/demucs](https://github.com/facebookresearch/demucs) | MIT | Music source separation (vocals/drums/bass/other); v4 Hybrid Transformer; used in remixing, content clearance, karaoke generation |
| AudioCraft | [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) | MIT | Meta's audio generation: MusicGen + AudioGen + EnCodec; text-to-music, text-to-sound for media scoring |
| Bark | [suno-ai/bark](https://github.com/suno-ai/bark) | MIT | Text-to-audio model with speech, music, and sound effects; multilingual; used for AI voiceover and dubbing |
| InvokeAI | [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) | Apache-2.0 | Professional creative engine for SD models; Node-based workflow builder; API-first; Apache-2.0 commercial-safe alternative to A1111 |
| FILM | [google-research/frame-interpolation](https://github.com/google-research/frame-interpolation) | Apache-2.0 | Frame interpolation for slow-motion / upscaling video frame rate |
| TEN-Agent | [TEN-framework/TEN-Agent](https://github.com/TEN-framework/TEN-Agent) | Apache-2.0 | Real-time multimodal conversational voice AI agent framework; <100ms E2E latency; voice/video/text; Docker-deployable; extensions in Python/TS/Go/C++/Rust; live broadcast AI hosts, audio guides, sports commentary AI |
| MoviePy | [Zulko/moviepy](https://github.com/Zulko/moviepy) | MIT | Python library for programmatic video editing: cuts, concatenations, compositing, effects, title insertion; the scripting glue that assembles AI-generated clips into final productions; 14.8k★ |

---
*Auto-updated by the Globant AI Studios ingest pipeline. Second pass: 2026-07-06.*
