# 🎯 Agentes AI — Media & Entertainment

> Agentes y herramientas AI open source para la industria. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-11

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| OpenMontage | [nerdzap/openmontage](https://github.com/nerdzap/openmontage) | MIT | ~800 | Agentic video production: AI coding assistant actúa como director creativo, scripta y edita videos completos desde modelos locales o footage archival libre. Integra Piper TTS y subtítulos automáticos. |
| SubsAI | [absadiki/subsai](https://github.com/absadiki/subsai) | MIT | ~3.5k | Subtítulos automáticos con Whisper para video: Web-UI + CLI + Python. Exporta .srt, .ass, .vtt, .json. Traducción multilingüe integrada. |
| subgen | [McCloudS/subgen](https://github.com/McCloudS/subgen) | MIT | ~2.8k | Generación automática de subtítulos vía Whisper para Jellyfin, Plex, Emby, Tautulli y Bazarr. Muy usado en producción para pipelines de localización. |
| veyracast | [veyralabsgroup/veyracast](https://github.com/veyralabsgroup/veyracast) | MIT | ~500 | Agente de contenido social API-first: genera posts/comentarios con Claude, agenda y publica en X, Instagram Graph. Multi-provider, self-hostable. |
| mediago-drama | [mediago-dev/mediago-drama](https://github.com/mediago-dev/mediago-drama) | Apache-2.0 | ~900 | Agent workbench de texto-a-video para short dramas: convierte novelas en guiones estructurados y lanza pipelines de generación de video. |
| AudioCraft / MusicGen | [facebookresearch/audiocraft](https://github.com/facebookresearch/audiocraft) | MIT | ~22k | Framework PyTorch de Meta para generación de audio/música. Incluye MusicGen (control textual y melódico), EnCodec y AudioGen para efectos de sonido. |
| ACE-Step | [ace-step/ace-step](https://github.com/ace-step/ace-step) | Apache-2.0 | ~4.8k | Modelo local de generación musical: 4 minutos de canción en <10 segundos en RTX 3090. v1.5 con mejor coherencia lírica. Alternativa open source a Suno. |
| VideoCaptioner | [WEIFENG2333/VideoCaptioner](https://github.com/WEIFENG2333/VideoCaptioner) | MIT | ~6.2k | Captioning AI con transcripción automática, segmentación, corrección de errores y traducción multilingüe. Ideal para localización a escala. |
| media_monitor | [matuteiglesias/media_monitor](https://github.com/matuteiglesias/media_monitor) | Apache-2.0 | ~120 | Pipeline de inteligencia de noticias en vivo: scraping, análisis LLM, publicación automática. Útil para monitoreo de marca y análisis de sentimiento. |
| Bark | [suno-ai/bark](https://github.com/suno-ai/bark) | MIT | ~39k | TTS generativo multilingüe de Suno AI: voz, música, efectos de sonido, risa. 100 idiomas. Integrable en pipelines de doblaje y narración automatizada. |

---

## Notas de uso

- **Whisper** (`openai/whisper`, MIT, 104k ★) es la base de SubsAI y subgen — para transcripción y STT en cualquier idioma.
- **AudioCraft** es la base para generación musical; combinar con **Bark** para narración + música de fondo.
- **mediago-drama** usa Wan2.1/Wan2.2 como backend de generación de video.
- Para pipelines completos ver `compose/patterns.md`.

---
*Actualizado automáticamente por el pipeline de ingest.*
