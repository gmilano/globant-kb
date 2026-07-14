# Top AI Agents — Media & Entertainment

> Open-source AI agents and tools for the M&E industry. Focus: MIT / Apache 2.0 / BSD — licenses Globant can build on.
> Last updated: 2026-07-14 (v10 — full rewrite)

## Core AI Agents & Tools

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| ACE-Step 1.5 | [ace-step/ACE-Step-1.5](https://github.com/ace-step/ACE-Step-1.5) | Apache-2.0 | ~6k | 4B DiT music foundation model; <2 s/song on A100; LoRA fine-tuning from a few tracks; outperforms most commercial alternatives locally |
| AudioCraft / MusicGen | [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) | MIT (code) | ~22k | Meta's music + audio generation library (MusicGen + AudioGen + EnCodec); text-to-music, melody conditioning, self-supervised audio codec |
| Wan 2.2 | [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) | Apache-2.0 | ~18k | Alibaba Tongyi MoE video diffusion; 5-second 720p in ~9 min on RTX 4090; first/last frame control; 5000-char prompts; Wan-Bench 2.0 leader |
| LTX-Video (LTX-2.3) | [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video) | Apache-2.0 | ~9k | Only OSS model with native audio-video generation in one pass; 4K 50 FPS; IC-LoRA adapters, camera control LoRAs; 2B and 13B variants |
| ComfyUI | [comfy-org/ComfyUI](https://github.com/comfy-org/ComfyUI) | GPL-3.0 | ~75k | Node-graph AI creative pipeline; natively supports image/video/3D/audio models; de-facto standard for local diffusion workflows; huge plugin ecosystem |
| StreamDiffusion | [cumulo-autumn/StreamDiffusion](https://github.com/cumulo-autumn/StreamDiffusion) | Apache-2.0 | ~12k | Real-time interactive diffusion pipeline; minimal latency live video generation; plugs into OBS/streaming pipelines |
| Marigold | [prs-eth/Marigold](https://github.com/prs-eth/Marigold) | Apache-2.0 | ~5k | Diffusion-based monocular depth estimation; Rolling Depth temporal consistency (CVPR 2025); plugs into VFX/compositing pipelines |
| Dia TTS | [nari-labs/dia](https://github.com/nari-labs/dia) | Apache-2.0 | ~13k | 1.6B parameter TTS model generating realistic dialogue from transcripts with non-verbal cues (laughs, coughs); dubbing and voice-over automation |
| OpenVoice v2 | [myshell-ai/OpenVoice](https://github.com/myshell-ai/OpenVoice) | MIT | ~32k | Instant voice cloning with granular style control (emotion, accent, rhythm); zero-shot cross-lingual dubbing; LATAM localization workhorse |
| Chatterbox TTS | [resemble-ai/chatterbox](https://github.com/resemble-ai/chatterbox) | Apache-2.0 | ~9k | Production-quality TTS with emotion exaggeration control; ultra-stable voice cloning; streaming audio generation for real-time pipelines |
| Media-AI Master List | [jayeshmepani/Media-AI](https://github.com/jayeshmepani/Media-AI) | MIT | ~2k | Curated index of 150+ AI media generation tools (text-to-image, video, audio, 3D, editing); updated continuously; useful as an agent's capability registry |

## Agent Orchestration Frameworks Used in M&E

| Framework | Repo | License | Why M&E Uses It |
|-----------|------|---------|------------------|
| LangGraph | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | Stateful multi-agent workflows; HITL interrupts for content approval gates; used in agentic ad pipelines |
| CrewAI | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | Role-based crews for content production (writer, editor, distributor agents); 100+ crew templates |
| n8n | [n8n-io/n8n](https://github.com/n8n-io/n8n) | Sustainable Use | 400+ integrations; bridges broadcast metadata systems, CMS, CDN, and AI APIs in visual workflows |

## Benchmark Reference

| Model | Task | Score / Metric |
|-------|------|----------------|
| ACE-Step 1.5 XL | Music quality | Beats most commercial services (subjective ELO) |
| Wan 2.2 / 2.7 | Video generation | #1 on Wan-Bench 2.0 open leaderboard (Apr 2026) |
| LTX-2.3 | Audio-video sync | Only OSS model with native joint A/V generation |
| Seedance 2.0 | Artificial Analysis ELO | #1 closed (Feb 2026); Wan 2.7 = best OSS slot |

---
*Auto-updated by ingest pipeline. License review: Apache-2.0 / MIT are Globant-safe for commercial delivery; GPL-3.0 (ComfyUI) requires architecture isolation (API or container boundary).*
