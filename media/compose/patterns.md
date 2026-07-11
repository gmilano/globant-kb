# 🧩 Patrones de composición — Media & Entertainment

> Recetas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-11

## Arquitectura base

```
[Plataforma vertical base (MediaCMS / Jellyfin / Owncast)]
          ↓
[Capa de integración AI (LangGraph / FastAPI)]
          ↓
[Agentes especializados M&E (Whisper / AudioCraft / Wan2.2)]
          ↓
[UI conversacional / API para el cliente]
```

---

## P1 — Pipeline de Subtitulación y Localización Automática

**Problema**: Un broadcaster regional recibe 500 horas de contenido al mes y necesita subtítulos en 4 idiomas.

**Stack**:
- `openai/whisper` (MIT, 104k ★) — transcripción ASR multilingüe
- `absadiki/subsai` (MIT) — generación de subtítulos multi-formato (.srt, .ass, .vtt)
- Claude Haiku — traducción y corrección contextual
- `WEIFENG2333/VideoCaptioner` (MIT) — integración final y quemado de subtítulos
- `mediacms-io/mediacms` (AGPL) — CMS de distribución

**Flujo**:
```
Video entrada (MP4/MKV)
   ↓ Whisper (STT en idioma original)
SubsAI (.srt en idioma original)
   ↓ Claude Haiku (traducción ES/PT/EN/FR + corrección)
VideoCaptioner (subtítulos quemados o sidecar)
   ↓
MediaCMS (publicación con metadatos enriquecidos)
```

**Tiempo estimado de implementación**: 2-3 semanas  
**Costo estimado**: $30k–$80k  
**ROI para cliente**: ~70% reducción de costo vs. localización manual

---

## P2 — Producción de Video Agentic con OpenMontage

**Problema**: Una agencia de contenido necesita producir 50 videos cortos por semana con presupuesto limitado.

**Stack**:
- `nerdzap/openmontage` (MIT) — director creativo agentic
- `Wan-Video/Wan2.2` (Apache-2.0) — generación de video T2V
- `suno-ai/bark` (MIT) — narración TTS
- `openai/whisper` (MIT) — subtítulos automáticos de la narración
- Claude Sonnet — script writing, prompt engineering para video

**Flujo**:
```
Brief del cliente (texto)
   ↓ Claude Sonnet (script + storyboard)
OpenMontage (orquestador agentic)
   ├→ Wan2.2 (generación de clips por escena)
   ├→ Bark (narración TTS)
   └→ Whisper (subtítulos automáticos)
   ↓
Video final montado (.mp4) + assets separados
```

**Tiempo estimado**: 3-4 semanas  
**Costo estimado**: $50k–$120k  
**ROI**: 80% reducción en tiempo de producción de video

---

## P3 — Motor de Recomendación de Contenido Semántico

**Problema**: Una plataforma OTT quiere reemplazar su sistema de recomendación basado en collaborative filtering con uno semántico.

**Stack**:
- `openai/whisper` (MIT) — transcripción del contenido audiovisual
- Claude Haiku — análisis de sentimiento, temas, personajes
- Embeddings vectoriales (pgvector / Qdrant) — indexación semántica
- `mediacms-io/mediacms` (AGPL) — plataforma de distribución
- LangGraph (MIT) — orquestación del pipeline

**Flujo**:
```
Contenido nuevo en MediaCMS
   ↓ Whisper (transcripción)
Claude Haiku (extracción: temas, tono, personajes, género)
   ↓ Embeddings semánticos
Qdrant (vector search)
   ↓ LangGraph (agente de recomendación)
Recomendaciones personalizadas por usuario (API REST)
```

**Tiempo estimado**: 4-6 semanas  
**Costo estimado**: $80k–$200k  
**ROI**: mejora de 30-40% en engagement metrics vs. collaborative filtering

---

## P4 — Radio / Podcast AI 24/7

**Problema**: Una radio regional quiere emitir contenido las 24 horas con una fracción del costo actual.

**Stack**:
- `facebookresearch/audiocraft` / MusicGen (MIT, 22k ★) — música de fondo y jingles
- `ace-step/ace-step` (Apache-2.0) — canciones completas en segundos
- `suno-ai/bark` (MIT) — locutores virtuales TTS
- `matuteiglesias/media_monitor` — noticias y contenido de contexto en tiempo real
- `xiph/Icecast-Server` (GPL-2.0) — streaming de audio

**Flujo**:
```
Scheduler (agenda de programación)
   ├→ media_monitor (noticias del momento)
   ├→ Claude Sonnet (guión del locutor)
   ├→ Bark (voz del locutor virtual)
   └→ AudioCraft/ACE-Step (música de transición)
Icecast (broadcast en vivo)
   ↓
Oyentes vía HTTP stream
```

**Tiempo estimado**: 3-4 semanas  
**Costo estimado**: $40k–$100k

---

## P5 — Short Drama Generator (Texto → Video)

**Problema**: Un estudio de contenido digital necesita convertir IP textual (novelas cortas, guiones) en short dramas para TikTok/Reels.

**Stack**:
- `mediago-dev/mediago-drama` (Apache-2.0) — agent workbench novela → drama
- `Wan-Video/Wan2.2` (Apache-2.0) — generación de clips de video
- `comfyanonymous/ComfyUI` (GPL-3.0) — UI de composición y edición
- `openai/whisper` (MIT) — subtítulos automáticos
- Claude Sonnet — adaptación de guión y prompts de video

**Flujo**:
```
Texto (novela/guión)
   ↓ Claude Sonnet (adaptación a formato episodios cortos)
mediago-drama (estructura escenas + prompts de video)
   ↓ Wan2.2 (generación de clips por escena)
ComfyUI (composición, transiciones, efectos)
   ↓ Whisper (subtítulos)
Video final para TikTok/Reels/YouTube Shorts
```

**Tiempo estimado**: 4-5 semanas  
**Costo estimado**: $60k–$150k

---

## P6 — Content Intelligence para Editorial

**Problema**: Una agencia de medios necesita monitorear 500 fuentes de noticias y detectar tendencias emergentes para sus editores.

**Stack**:
- `matuteiglesias/media_monitor` (Apache-2.0) — pipeline de scraping + análisis
- Claude Opus — análisis profundo de tendencias, clustering de temas
- `veyralabsgroup/veyracast` (MIT) — publicación automática en redes sociales
- LangGraph — orquestación del agente editorial

**Flujo**:
```
media_monitor (scraping 500 fuentes cada 15 min)
   ↓ Claude Haiku (clasificación + sentimiento)
Claude Opus (análisis de tendencias, recomendaciones editoriales)
   ↓ LangGraph (agente editorial)
   ├→ Dashboard para editores humanos
   └→ veyracast (publicación de breaking news en X/Instagram)
```

**Tiempo estimado**: 2-3 semanas  
**Costo estimado**: $35k–$90k

---

## P7 — Post-Producción AI para Documentales

**Problema**: Un canal de documentales necesita reducir el tiempo de post-producción de 6 semanas a 2 semanas por episodio.

**Stack**:
- `openai/whisper` (MIT) — transcripción completa del material bruto
- `IDEA-Research/Grounded-Segment-Anything` (Apache-2.0, 17.7k ★) — segmentación visual
- `Sanster/IOPaint` (Apache-2.0, 23.3k ★) — inpainting y limpieza de imágenes
- Claude Sonnet — análisis narrativo, selección de mejores tomas, estructura
- `comfyanonymous/ComfyUI` (GPL-3.0) — color grading y efectos AI
- `WEIFENG2333/VideoCaptioner` (MIT) — subtítulos finales

**Flujo**:
```
Material bruto (horas de grabación)
   ↓ Whisper (transcripción de todo)
Claude Sonnet (análisis narrativo: mejores momentos, estructura dramática)
   ↓ Grounded-SAM (identificación de elementos visuales clave)
IOPaint (limpieza de planos: logos, objetos no deseados)
   ↓ ComfyUI (color grading AI-assisted)
VideoCaptioner (subtítulos finales multi-idioma)
   ↓ Video final editado
```

**Tiempo estimado**: 5-7 semanas  
**Costo estimado**: $100k–$250k  
**ROI**: reducción de 60% en tiempo de post-producción

---

## P8 — Plataforma de Streaming Self-Hosted con AI

**Problema**: Una universidad o corporación necesita su propia plataforma de streaming con transcripción, búsqueda semántica y recomendaciones.

**Stack**:
- `jellyfin/jellyfin` (GPL-2.0) — media server base
- `McCloudS/subgen` (MIT) — subtítulos automáticos con Whisper
- Claude Haiku — etiquetado automático, descripciones, capítulos
- Qdrant — búsqueda semántica sobre transcripciones
- `mediacms-io/mediacms` (AGPL) — CMS de cara al usuario

**Flujo**:
```
Nuevo video en Jellyfin
   ↓ webhook → subgen (transcripción automática)
Claude Haiku (tags, descripción, capítulos, keywords)
   ↓ Embeddings
Qdrant (índice semántico)
   ↓
MediaCMS (publicación enriquecida)
   + búsqueda semántica por contenido
   + recomendaciones automáticas
```

**Tiempo estimado**: 3-4 semanas  
**Costo estimado**: $45k–$110k

---
*Ver `repos/foundations.md` para detalles de cada repo. Ver `verticals/solutions.md` para plataformas base.*
