# Foundational Repos — Media & Entertainment

> Core open source repositories for building AI-powered media solutions. Real repos, real licenses.
> Last updated: 2026-07-12 (v14)

## Foundational Repositories

| Repo | License | Stars | Role | Description |
|------|---------|-------|------|-------------|
| [comfy-org/ComfyUI](https://github.com/comfy-org/ComfyUI) | GPL-3.0 | ~69k | Visual AI pipeline engine | Node-based workflow engine for diffusion models. Dominant platform for AI media production in 2026. Every major video/image model (Wan2.2, LTX-Video, CogVideoX, FLUX) has ComfyUI nodes. 1,000+ community node packages. |
| [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) | MIT (code) | ~21k | Audio / music generation | Meta's PyTorch library: MusicGen (text-to-music from 20K hrs licensed tracks), AudioGen (text-to-sound effects), EnCodec (neural audio codec). Code MIT; weights CC-BY-NC 4.0. |
| [openai/whisper](https://github.com/openai/whisper) | MIT | ~104k | Speech recognition / transcription | OpenAI's ASR model via weak supervision. Foundation for transcription, captioning, dubbing, and subtitling pipelines. Multilingual. Irreplaceable for LATAM localization. |
| [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | MIT | ~51k | On-device speech recognition | C/C++ port of Whisper. Runs on CPU, Apple Silicon, GPU. Essential for edge deployments and real-time transcription without cloud costs. |
| [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) | Apache-2.0 | ~18k | Video generation | Alibaba MoE video diffusion model. 720P@24fps, runs on RTX 4090. Most commercially viable open video model due to clean Apache-2.0 license with no MAU caps. |
| [Lightricks/LTX-Video](https://github.com/Lightricks/LTX-Video) | Apache-2.0 | ~7k | Synchronized audio+video | 22B DiT model. First open model generating native 4K@50fps with synchronized audio. Supports T2V, I2V, A2V, LipDub, IC-LoRA V2V. Released March 2026. |
| [THUDM/CogVideo](https://github.com/THUDM/CogVideo) | Apache-2.0 (2B) | ~12.7k | Text-to-video (research base) | Zhipu AI / Tsinghua CogVideoX series, ICLR 2025. 2B variant fully Apache-2.0. 10-second clips at 768×1360@16fps. CogKit for fine-tuning. |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | Apache-2.0 | ~22k | Agent-native video rendering | HeyGen's HTML-to-video engine for AI agents. Write HTML compositions with data-start/data-duration attributes; headless Chrome + FFmpeg renders deterministic MP4s. 20 loadable skills; integrates with Claude Code, Cursor, Codex. No per-render fees. |
| [open-mmlab/FoleyCrafter](https://github.com/open-mmlab/FoleyCrafter) | Apache-2.0 | ~2.5k | Video-to-audio generation | OpenMMLab foley framework (IJCV 2026). Semantic adapter + temporal controller generates lifelike, frame-synchronized sound effects from silent video. ComfyUI integration available. Enables fully automated audio post-production. |
| [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | AGPL-3.0 | ~3k | Video asset management (CMS) | Python/Django/React video and media CMS with adaptive streaming, captions, chapters, playlists, and REST API. Self-hosted alternative to Vimeo/Brightcove for enterprise media libraries. |
| [spotify/pedalboard](https://github.com/spotify/pedalboard) | GPL-3.0 | ~5.5k | Audio processing / effects | Spotify's Python audio-effects library. Loads VST3/AU plugins, processes audio 300× faster than pySoX. Powers AI DJ and Voice Translation at Spotify. Foundation for audio post-production automation. |
| [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) | Apache-2.0 | ~27.5k | Image generation studio | Creative engine for Stable Diffusion and FLUX models. Professional UI with canvas, workflow graphs, and model manager. Production-tested by studios for concept art and asset creation. |

---
*See also: `verticals/solutions.md` for full vertical platforms.*
