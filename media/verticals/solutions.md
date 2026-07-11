# 🏭 Verticales de partida — Media & Entertainment

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-11

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso |
|------------|----------|------------|-------|-------------|
| **MediaCMS** | AGPL-3.0 | [mediacms-io/mediacms](https://github.com/mediacms-io/mediacms) | Python/Django + React + REST API | CMS de video moderno y completo. Multi-tipo de media, búsqueda avanzada, múltiples workflows de publicación, control total de datos. Ideal para broadcasters y OTT. |
| **PeerTube** | AGPL-3.0 | [Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | Node.js + PostgreSQL + P2P | Plataforma de video federada (ActivityPub). Alternativa open source a YouTube. Self-hosted, sin anuncios. |
| **Jellyfin** | GPL-2.0 | [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) | .NET + Web | Media server: streaming de video/audio/foto. API rica. Base para pipelines de ingesta + transcripción + subtítulos. |
| **Owncast** | MIT | [owncast/owncast](https://github.com/owncast/owncast) | Go + Web | Live streaming self-hosted. Alternativa a Twitch/YouTube Live. API para integrar agentes de moderación y chat. |
| **AVideo** | AGPL-3.0 | [WWBN/AVideo](https://github.com/WWBN/AVideo) | PHP + MySQL | Red de broadcast propia: streaming, descarga, categorías. Similar a YouTube self-hosted. |
| **PuMuKIT** | EUPL | [pumukit/pumukit](https://github.com/pumukit/pumukit) | PHP/Symfony + MongoDB | Plataforma institucional de video (universidades, broadcasters). Enterprise-class, gestión de metadatos avanzada. |
| **ComfyUI** | GPL-3.0 | [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) | Python | UI nodo-a-nodo para generación de imagen/video. Estándar de facto para workflows creativos con IA. 117k ★. |
| **InvokeAI** | Apache-2.0 | [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) | Python + React | Creative engine Stable Diffusion. UI profesional, fine-tuning, canvas. Base para estudios de producción digital. 27.5k ★. |
| **Icecast** | GPL-2.0 | [xiph/Icecast-Server](https://github.com/xiph/Icecast-Server) | C | Servidor de streaming de audio de alta performance. Base para radio IP y podcasting. Integrable con AudioCraft para radio AI. |
| **Funkwhale** | AGPL-3.0 | [funkwhale/funkwhale](https://github.com/funkwhale/funkwhale) | Python/Django + Vue | Plataforma federada de música. API para integrar generación musical con AudioCraft/ACE-Step. |

---

## Cómo customizar con AI

### Patrón MediaCMS + AI
```
MediaCMS (video CMS base)
   ↓ webhook al subir video
Whisper / SubsAI (transcripción automática)
   ↓
Claude Haiku (resumen, tags, descripción)
   ↓
VideoCaptioner (subtítulos + traducción)
   ↓
Almacenado en MediaCMS con metadatos enriquecidos
```

### Patrón Jellyfin + AI
```
Jellyfin (biblioteca de media)
   ↓ API de nuevos items
subgen (Whisper subtítulos automáticos)
   ↓
Claude (etiquetado de contenido, descripción)
   ↓
UI: búsqueda semántica sobre la biblioteca
```

### Patrón Owncast + Agente de Moderación
```
Owncast (live streaming)
   ↓ mensajes de chat en tiempo real
Agente LLM (moderación + análisis de sentimiento)
   ↓ highlights automáticos
Bark (respuestas TTS del streamer virtual)
```

---
*Ver `compose/patterns.md` para recetas detalladas.*
