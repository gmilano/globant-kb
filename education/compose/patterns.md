# 🧩 Patrones de composición — Education

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-11

## Stack base

```
[LMS open source (Moodle / Open edX / Vacademy)]
          ↓
[MCP Server custom — expone grades, assignments, calendar al agente]
          ↓
[Agente educativo (LangGraph / DeepTutor / OATutor)]
          ↓
[LLM soberano (Claude API) o local (Ollama + modelo cuantizado)]
          ↓
[UI conversacional (Next.js / React) + Analytics (xAPI / LRS)]
```

---

## Patrón 1: Tutor Adaptativo sobre Moodle

**Objetivo:** Añadir tutoring 1-a-1 AI a un Moodle existente sin reemplazar la plataforma.

**Repos:**
- [moodle/moodle](https://github.com/moodle/moodle) — LMS base con Webservices REST API
- [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) — agente tutor con RAG multi-engine
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — indexación del material del curso
- [getzep/graphiti](https://github.com/getzep/graphiti) — knowledge graph del currículo

**Arquitectura:**
```
Moodle REST API → sync materials → LlamaIndex index
                                        ↓
Moodle grades API → BKT mastery score → LangGraph router
                                        ↓
                              DeepTutor agente ← Claude API
                                        ↓
                              Respuesta + siguiente ejercicio → UI chat embed en Moodle
```

**Cómo:** Plugin Moodle (PHP) que embebe un iframe/widget Next.js. El widget llama al agente DeepTutor con `course_id` + `user_id`. El agente recupera el contexto del curso via LlamaIndex y el mastery score via BKT. Claude genera la respuesta socrática. xAPI log de la sesión al LRS de Moodle.

**Tiempo estimado:** 3-4 semanas | **Equipo:** 2 devs + 1 AI/ML

---

## Patrón 2: Generador de Quiz Adaptativo (Open edX)

**Objetivo:** Generar evaluaciones calibradas al nivel del estudiante, auto-corregidas con feedback AI.

**Repos:**
- [openedx/edx-platform](https://github.com/openedx/edx-platform) — LMS base
- [openedx/XBlock](https://github.com/openedx/XBlock) — componente custom
- [098765d/AI_Tutor](https://github.com/098765d/AI_Tutor) — KG-RAG para generación de preguntas
- [getzep/graphiti](https://github.com/getzep/graphiti) — knowledge graph del currículo

**Arquitectura:**
```
Open edX grades API → identify weak concepts (KG traversal)
                                ↓
Graphiti KG → find related concepts + prerequisites
                                ↓
Claude API → generate 5 MCQ questions + distractors calibrados
                                ↓
XBlock custom → render quiz en Open edX → submit → auto-grade
                                ↓
Claude API → feedback personalizado por respuesta incorrecta
```

**Cómo:** XBlock Python que llama al AI service. El AI service usa Graphiti para mapear qué conceptos el estudiante domina y cuáles son weakness. Claude genera preguntas con dificultad ajustada (Bloom's taxonomy level). Respuestas almacenadas en Open edX grades para analytics downstream.

**Tiempo estimado:** 2-3 semanas | **Equipo:** 1 dev Open edX + 1 AI/ML

---

## Patrón 3: Stack Soberano para Educación Pública LATAM

**Objetivo:** Plataforma education AI 100% on-prem para cumplir LGPD / GDPR / regulaciones LATAM — sin datos de estudiantes en nubes externas.

**Repos:**
- [moodle/moodle](https://github.com/moodle/moodle) — LMS on-prem
- [ollama/ollama](https://github.com/ollama/ollama) — inferencia LLM local (MIT, 110k★)
- [continuedev/continue](https://github.com/continuedev/continue) — AI assistant local
- [CAHLR/OATutor](https://github.com/CAHLR/OATutor) — tutoring adaptativo sin backend externo
- [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) — multi-idioma, ES-LA

**Arquitectura:**
```
Servidor on-prem / VPC privada:
  Moodle (PHP) ←→ Ollama (Llama 3.3 70B / Qwen2.5) ←→ Open-TutorAI CE
                         ↑
               GPU server H100/A100 o CPU-only (Qwen 7B cuantizado)
                         ↓
                 No internet required — air-gapped capable
```

**Cómo:** Docker Compose stack: Moodle + MariaDB + Ollama + Open-TutorAI CE + Nginx. Ollama corre modelos cuantizados (GGUF Q4_K_M). Moodle llama al agente via webhook local. Datos de estudiantes nunca salen del servidor institucional. Soporte ES-LA y PT-BR nativo en Open-TutorAI.

**Tiempo estimado:** 2 semanas de infraestructura + 2 semanas integración | **Equipo:** 1 DevOps + 1 backend

---

## Patrón 4: Asistente de Estudio con Spaced Repetition + AI

**Objetivo:** App de estudio personal que genera flashcards inteligentes desde cualquier material y las agenda con spaced repetition óptimo.

**Repos:**
- [scaphandre/anki-mcp](https://github.com/scaphandre/anki-mcp) — Anki via MCP
- [kirill-markin/flashcards-open-source-app](https://github.com/kirill-markin/flashcards-open-source-app) — app móvil spaced repetition
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — parsing de PDFs/videos/slides

**Arquitectura:**
```
Material (PDF/video/slides) → LlamaIndex parser → chunk + embed
                                        ↓
Claude API → generar Q&A flashcards (frente/dorso) + dificultad inicial
                                        ↓
Anki MCP Server → crear mazo en Anki → SM-2 algorithm scheduling
                                        ↓
flashcards-open-source-app (iOS/Android) → review sessions
                                        ↓
Performance analytics → ajustar dificultad generación nuevas cards
```

**Cómo:** Script Python que toma un directorio de materiales, los procesa con LlamaIndex, llama a Claude para generar flashcards en formato JSON, y las importa a Anki via MCP server. La app móvil sincroniza vía AnkiConnect API. Modo offline para estudiar sin internet.

**Tiempo estimado:** 1 semana (MVP) | **Equipo:** 1 dev full-stack

---

## Patrón 5: Portal Educativo con AI Content Generation

**Objetivo:** Portal público de cursos (tipo Open edX) con generación automática de contenido, SEO AI-driven y recomendaciones personalizadas.

**Repos:**
- [openfun/richie](https://github.com/openfun/richie) — CMS portal educativo (MIT ✅)
- [openedx/edx-platform](https://github.com/openedx/edx-platform) — LMS backend
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — RAG sobre catálogo de cursos
- [getzep/graphiti](https://github.com/getzep/graphiti) — grafo de relaciones cursos/habilidades

**Arquitectura:**
```
Richie CMS → catálogo de cursos → LlamaIndex index
                                        ↓
Graphiti KG → skills → job roles → cursos relacionados
                                        ↓
Claude API → descripción de curso AI-generada + SEO metadata
                                        ↓
Richie frontend → recomendaciones personalizadas por historial
                                        ↓
Open edX → matrícula + completion tracking
```

**Cómo:** Richie como frontend/portal, Open edX como LMS backend. Plugin Richie llama a Claude para generar metadata enriquecido (descripción, tags, learning outcomes) de cursos nuevos. El KG de Graphiti conecta cursos → habilidades → roles laborales para recomendaciones tipo LinkedIn Learning. 

**Tiempo estimado:** 4-6 semanas | **Equipo:** 2 devs + 1 UX + 1 AI/ML

---

## Patrón 6: AI Teaching Assistant para Docentes

**Objetivo:** Copiloto para docentes que automatiza planificación de clases, generación de rúbricas, calificación de ensayos y detección de plagio AI.

**Repos:**
- [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) — agente base con Research mode
- [instructure/canvas-lms](https://github.com/instructure/canvas-lms) — LMS con Submissions API
- [Li-Evan/Bloom](https://github.com/Li-Evan/Bloom) — generador de syllabi adaptativos

**Arquitectura:**
```
Docente input (tema, nivel, duración) → Claude API → lesson plan estructurado
                                                ↓
Canvas Submissions API → ensayos estudiantes → Claude API → rubric grading
                                                ↓
Comparación embeddings → detectar plagio AI-generated
                                                ↓
Claude API → feedback personalizado por estudiante (en idioma del curso)
                                                ↓
Canvas gradebook API → upload grades + feedback automático
```

**Cómo:** Web app standalone (Next.js) que se autentica con Canvas LTI 1.3. El docente configura el curso una vez; el asistente genera el plan semestral con Bloom (Li-Evan). Para calificación: el docente define la rúbrica (o Claude la sugiere), se aplica a todos los submissions via batch. Detección AI: embeddings cosine similarity + detector fine-tuned.

**Tiempo estimado:** 3 semanas | **Equipo:** 1 frontend + 1 backend + 1 AI/ML

---

## Patrón 7: Tutor de Idiomas Multimodal (LATAM)

**Objetivo:** Tutor conversacional de idiomas con pronunciación nativa, corrección en tiempo real, adaptado al español/portugués de LATAM.

**Repos:**
- [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) — base multi-idioma
- [Sule-Bashir/omni-tutor](https://github.com/Sule-Bashir/omni-tutor) — referencia: live audio+video AI tutor
- [openedx/edx-platform](https://github.com/openedx/edx-platform) — tracking de progreso

**Arquitectura:**
```
Micrófono → Deepgram STT (ES-LA / PT-BR model) → texto transcripto
                                ↓
Claude API → evaluar pronunciación implícita + corregir gramática + responder
                                ↓
ElevenLabs TTS → audio respuesta con acento nativo
                                ↓
Open-TutorAI CE → tracking nivel CEFR + próxima lección → Open edX LRS
```

**Cómo:** React app con WebRTC para audio en tiempo real. Deepgram transcribe (modelo ES-LA o PT-BR). Claude evalúa la respuesta del estudiante, corrige errores, y continúa la conversación manteniendo contexto. ElevenLabs genera audio con voz nativa consistente. El progreso se persiste en Open edX via xAPI.

**Tiempo estimado:** 3-4 semanas | **Equipo:** 1 frontend + 1 backend + 1 AI/ML
