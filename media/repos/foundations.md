# 🏗️ Repos fundacionales — Media & Entertainment

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-11

## Generación de Video (Text-to-Video / Image-to-Video)

| Repo | Licencia | Stars | Descripción | ¿Base para AI? |
|------|----------|-------|-------------|----------------|
| [Wan-Video/Wan2.1](https://github.com/Wan-Video/Wan2.1) | Apache-2.0 | ~15k | Modelos de generación de video de Alibaba. 1.3B y 14B params, hasta 1080p, 10s de clip. Gold standard open source T2V 2026. | Sí |
| [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) | Apache-2.0 | ~18k | Sucesor de Wan2.1 con arquitectura MoE. +65.6% training images, +83.2% videos. Mejor motion, semántica y estética. | Sí |
| [THUDM/CogVideo](https://github.com/THUDM/CogVideo) | Apache-2.0 | ~11k | CogVideoX de Tsinghua/Zhipu AI. 2B y 5B params. Excelente en prompt understanding multi-cláusula. 720×480 @ 8fps. | Sí |
| [SkyworkAI/SkyReels-V2](https://github.com/SkyworkAI/SkyReels-V2) | Apache-2.0 | ~8k | Fine-tune de HunyuanVideo sobre 10M+ clips cine/TV. Calidad cinematográfica, consistencia temporal superior. | Sí |
| [deepbeepmeep/Wan2GP](https://github.com/deepbeepmeep/Wan2GP) | Apache-2.0 | ~6k | Wan2.x optimizado para GPUs consumer. Soporta Wan 2.1/2.2, LTX-2, HunyuanVideo, Flux. Muy adoptado por creadores. | Sí |

## Workflows de Imagen/Video (UI y Pipelines)

| Repo | Licencia | Stars | Descripción | ¿Base para AI? |
|------|----------|-------|-------------|----------------|
| [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) | GPL-3.0 | ~117k | UI estándar para workflows de generación con modelos de difusión. Nodo-a-nodo, extensible. Soporta todos los modelos de video. | Sí — 117k ★ |
| [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) | Apache-2.0 | ~27.5k | Creative engine para Stable Diffusion. UI profesional, fine-tuning, workflows. Base para estudios de producción. | Sí — 27.5k ★ |
| [Sanster/IOPaint](https://github.com/Sanster/IOPaint) | Apache-2.0 | ~23.3k | Inpainting de imagen con SOTA AI. Elimina objetos, restaura imágenes, reemplaza fondos. Integrable en pipelines de post-producción. | Sí — 23.3k ★ |
| [IDEA-Research/Grounded-Segment-Anything](https://github.com/IDEA-Research/Grounded-Segment-Anything) | Apache-2.0 | ~17.7k | Grounded SAM: segmentación precisa de objetos en imágenes. Combina Grounding DINO + SAM + Stable Diffusion. | Sí — 17.7k ★ |

## Audio, Música y Voz

| Repo | Licencia | Stars | Descripción | ¿Base para AI? |
|------|----------|-------|-------------|----------------|
| [openai/whisper](https://github.com/openai/whisper) | MIT | ~104k | Reconocimiento de voz robusto multi-idioma de OpenAI. Base para transcripción y subtitulación en cualquier pipeline. | Sí — 104k ★ |
| [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) | MIT | ~51.2k | Port de Whisper en C/C++. Deploy on-premise eficiente, Android/iOS, WASM. | Sí — 51.2k ★ |
| [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) | MIT | ~22k | AudioCraft de Meta: MusicGen (texto-a-música), AudioGen (efectos de sonido), EnCodec. Framework completo de audio generativo. | Sí — 22k ★ |
| [suno-ai/bark](https://github.com/suno-ai/bark) | MIT | ~39k | TTS generativo multilingüe. Voz, música, efectos, risa. 100 idiomas. Ideal para doblaje y narración automatizada. | Sí — 39k ★ |
| [jamiepine/voicebox](https://github.com/jamiepine/voicebox) | MIT | ~36.8k | Estudio de voz AI open source: clonación, dictado, creación. UI amigable. | Sí — 36.8k ★ |
| [ace-step/ace-step](https://github.com/ace-step/ace-step) | Apache-2.0 | ~4.8k | Generación de música completa local. Canción de 4 min en <10s en RTX 3090. v1.5 con mejora lírica. | Sí — 4.8k ★ |

## Subtítulos y Localización

| Repo | Licencia | Stars | Descripción | ¿Base para AI? |
|------|----------|-------|-------------|----------------|
| [absadiki/subsai](https://github.com/absadiki/subsai) | MIT | ~3.5k | Generación de subtítulos con Whisper. Web-UI + CLI + Python. Múltiples formatos (.srt, .ass, .vtt). Traducción integrada. | Sí |
| [McCloudS/subgen](https://github.com/McCloudS/subgen) | MIT | ~2.8k | Subtítulos automáticos vía Whisper para Jellyfin, Plex, Emby, Tautulli, Bazarr. | Sí |
| [WEIFENG2333/VideoCaptioner](https://github.com/WEIFENG2333/VideoCaptioner) | MIT | ~6.2k | Captioning AI: transcripción, segmentación, corrección, traducción multilingüe. | Sí |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
