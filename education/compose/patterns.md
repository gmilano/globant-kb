# 🧩 Patrones de composición — Education

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-12 (v12)

## Stack base

```
[LMS open source (Moodle / Open edX / LearnHouse / Vacademy)]
          ↓
[MCP Server custom — expone grades, assignments, calendar al agente]
          ↓
[Agente educativo (LangGraph / DeepTutor / OATutor)]
          ↓
[LLM soberano (Claude API) o local (Ollama + modelo cuantizado)]
          ↓
[UI conversacional (Next.js / React) + Analytics (xAPI / LRS)]
          ↓
[Governance layer: audit logs, human-in-the-loop, integrity checks]  ← nuevo v12
```

---

## Patrón 1: Tutor Adaptativo sobre Moodle

**Objetivo:** Añadir tutoring 1-a-1 AI a un Moodle existente sin reemplazar la plataforma.

**Repos:**
- [moodle/moodle](https://github.com/moodle/moodle) — LMS base con Webservices REST API + AI Subsystem v2
- [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) — agente tutor con RAG multi-engine y memoria 3 capas
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
                    Respuesta socrática + siguiente ejercicio → UI chat embed Moodle
                                        ↓
                    Audit log: prompt + response + modelo → LRS xAPI
```

**Cómo:** Plugin Moodle (PHP) que embebe un iframe/widget Next.js. El widget llama al agente DeepTutor con `course_id` + `user_id`. El agente recupera el contexto del curso via LlamaIndex y el mastery score via BKT. Claude genera la respuesta socrática. xAPI log de la sesión al LRS de Moodle para academic integrity tracking.

**Tiempo estimado:** 3-4 semanas | **Equipo:** 2 devs + 1 AI/ML

---

## Patrón 2: Generador de Quiz Adaptativo (Open edX)

**Objetivo:** Generar evaluaciones calibradas al nivel del estudiante, auto-corregidas con feedback AI.

**Repos:**
- [openedx/edx-platform](https://github.com/openedx/edx-platform) — LMS base + AI Course Creator
- [openedx/XBlock](https://github.com/openedx/XBlock) — componente custom
- [getzep/graphiti](https://github.com/getzep/graphiti) — knowledge graph del currículo
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — orquestación del flujo

**Arquitectura:**
```
Open edX grades API → identify weak concepts (KG traversal)
                                ↓
Graphiti KG → conceptos relacionados + prerrequisitos no dominados
                                ↓
Claude API → generate 5 MCQ questions + distractors calibrados (Bloom's taxonomy)
                                ↓
XBlock custom → render quiz en Open edX → submit → auto-grade
                                ↓
Claude API → feedback personalizado por respuesta incorrecta
```

**Cómo:** XBlock Python que llama al AI service. El AI service usa Graphiti para mapear qué conceptos el estudiante domina. Claude genera preguntas con dificultad ajustada. Respuestas almacenadas en Open edX grades para analytics downstream.

**Tiempo estimado:** 2-3 semanas | **Equipo:** 1 dev Open edX + 1 AI/ML

---

## Patrón 3: Stack Soberano para Educación Pública LATAM

**Objetivo:** Plataforma education AI 100% on-prem para cumplir LGPD / GDPR / FERPA / EU AI Act — sin datos de estudiantes en nubes externas.

**Repos:**
- [moodle/moodle](https://github.com/moodle/moodle) — LMS on-prem
- [ollama/ollama](https://github.com/ollama/ollama) — inferencia LLM local (MIT, ~110k★)
- [CAHLR/OATutor](https://github.com/CAHLR/OATutor) — tutoring adaptativo sin backend externo
- [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) — multi-idioma, ES-LA + PT-BR
- [MysterionRise/adaptive-knowledge-graph](https://github.com/MysterionRise/adaptive-knowledge-graph) — KG + BKT local

**Arquitectura:**
```
Servidor on-prem / VPC privada:
  Moodle (PHP) ←→ Ollama (Llama 3.3 70B / Qwen2.5 72B) ←→ Open-TutorAI CE
  OATutor ←→ adaptive-knowledge-graph ← KG currículo local
                         ↑
               GPU server H100/A100 o CPU-only (Qwen 7B cuantizado)
                         ↓
                 No internet required — air-gapped capable
```

**Cómo:** Docker Compose stack: Moodle + MariaDB + Ollama + Open-TutorAI CE + Nginx. Moodle llama al agente via webhook local. Datos de estudiantes nunca salen del servidor institucional. ES-LA y PT-BR nativo. EU AI Act compliance: logs auditables, human-in-the-loop via admin dashboard.

**Tiempo estimado:** 2 semanas infraestructura + 2 semanas integración | **Equipo:** 1 DevOps + 1 backend

---

## Patrón 4: Theory-of-Mind Tutor con Memoria Persistente

**Objetivo:** Tutor que modela el estado cognitivo real del estudiante (no solo sus respuestas), con memoria que persiste entre sesiones.

**Repos:**
- [plastic-labs/tutor-gpt](https://github.com/plastic-labs/tutor-gpt) — ToM reasoning + Honcho memory layer
- [GarethManning/education-agent-skills](https://github.com/GarethManning/education-agent-skills) — 165 habilidades pedagógicas
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — RAG sobre materiales del curso

**Arquitectura:**
```
Historial sesiones anteriores → Honcho memory layer → estado cognitivo inferido
                                                ↓
Materiales del curso → LlamaIndex RAG → contexto relevante
                                                ↓
education-agent-skills → selección dinámica: ¿explicar / preguntar / scaffold?
                                                ↓
tutor-gpt ToM module → decide estrategia pedagógica → Claude API → respuesta
                                                ↓
Observación de respuesta → actualizar modelo cognitivo del estudiante
```

**Tiempo estimado:** 2-3 semanas | **Equipo:** 1 AI/ML + 1 backend

---

## Patrón 5: Asistente de Estudio con Spaced Repetition + AI

**Objetivo:** App de estudio personal que genera flashcards inteligentes desde cualquier material y las agenda con spaced repetition óptimo.

**Repos:**
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

**Tiempo estimado:** 1 semana (MVP) | **Equipo:** 1 dev full-stack

---

## Patrón 6: AI Teaching Assistant para Docentes

**Objetivo:** Copiloto para docentes que automatiza planificación de clases, generación de rúbricas, calificación de ensayos y compliance EU AI Act.

**Repos:**
- [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) — agente base con Research mode
- [instructure/canvas-lms](https://github.com/instructure/canvas-lms) — LMS con Submissions API
- [Li-Evan/Bloom](https://github.com/Li-Evan/Bloom) — generador de syllabi adaptativos
- [GarethManning/education-agent-skills](https://github.com/GarethManning/education-agent-skills) — skills de diseño de rúbricas

**Arquitectura:**
```
Docente input (tema, nivel, duración) → education-agent-skills → Bloom → lesson plan
                                                ↓
Canvas Submissions API → ensayos estudiantes → Claude API → rubric grading
                                                ↓
Embeddings comparación → detectar plagio / AI-generated
                                                ↓
Claude API → feedback personalizado por estudiante (idioma del curso)
                                                ↓
Canvas gradebook API → upload grades + feedback + audit log (EU AI Act)
```

**Tiempo estimado:** 3 semanas | **Equipo:** 1 frontend + 1 backend + 1 AI/ML

---

## Patrón 7: Tutor de Idiomas Multimodal (LATAM)

**Objetivo:** Tutor conversacional de idiomas con pronunciación nativa, corrección en tiempo real, adaptado al español/portugués de LATAM.

**Repos:**
- [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) — base multi-idioma con tracking CEFR
- [openedx/edx-platform](https://github.com/openedx/edx-platform) — tracking de progreso + certificaciones

**Arquitectura:**
```
Micrófono → Deepgram STT (modelo ES-LA / PT-BR) → texto transcripto
                                ↓
Claude API → evaluar pronunciación implícita + corregir gramática + responder
                                ↓
ElevenLabs TTS → audio respuesta con acento nativo consistente
                                ↓
Open-TutorAI CE → tracking nivel CEFR + próxima lección → Open edX LRS (xAPI)
```

**Tiempo estimado:** 3-4 semanas | **Equipo:** 1 frontend + 1 backend + 1 AI/ML

---

## Patrón 8: Education Agent Skills Stack

**Objetivo:** Elevar la calidad pedagógica de cualquier agente existente con 165 skills evidence-based sin rediseñar el sistema.

**Repos:**
- [GarethManning/education-agent-skills](https://github.com/GarethManning/education-agent-skills) — 165 skills pedagógicas
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — orquestador del agente

**Arquitectura:**
```
Pregunta del estudiante → intent classifier → selección de skill pedagógica
                                        ↓
skill: "socratic-questioning" | "misconception-probe" | "worked-example" | "UDL-scaffold"
                                        ↓
LangGraph state → LLM con skill como system prompt enrichment
                                        ↓
Respuesta pedagógica de alta calidad + metadata (skill usada, nivel Bloom's taxonomy)
                                        ↓
Analytics: qué skills se usan más → indicador de qué conceptos son difíciles
```

**Tiempo estimado:** 3-5 días (MVP sobre agente existente) | **Equipo:** 1 AI/ML

---

## Patrón 9: LearnHouse AI-native EdTech Starter (nuevo v12)

**Objetivo:** Plataforma EdTech moderna AI-first para startups o corporativos, con block editor, AI content generation y tutoring integrado — alternativa ágil a Moodle sin su complejidad PHP.

**Repos:**
- [learnhouse/learnhouse](https://github.com/learnhouse/learnhouse) — LMS AGPL-3.0: block editor, AI study assistant, multi-tenant, pagos, self-hostable
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — agente tutor sobre el LMS
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — RAG sobre contenido del curso

**Arquitectura:**
```
LearnHouse API (TypeScript) → extraer cursos + materiales → LlamaIndex RAG index
                                        ↓
Estudiante abre curso → pregunta al AI study assistant integrado
                                        ↓
LangGraph agente: RAG query → Claude API → respuesta contextualizada al bloque actual
                                        ↓
LearnHouse UI (block viewer) → muestra respuesta inline junto al contenido
                                        ↓
LearnHouse analytics → registra interacción + progreso + audit log
```

**Cómo:** LearnHouse ya incluye un AI study assistant en la UI. Se extiende con un LangGraph agent como backend AI: indexa los bloques del curso en LlamaIndex, permite preguntas contextuales al contenido, genera quizzes inline. Deployment: Docker Compose (LearnHouse + PostgreSQL + LlamaIndex service + Claude API). Para privacy-first: swapear Claude API por Ollama.

**Tiempo estimado:** 1-2 semanas (LearnHouse ya tiene UI) | **Equipo:** 1 dev full-stack + 1 AI/ML

---

## Patrón 10: Multi-Agent Study Coach (Google×Kaggle pattern) (nuevo v12)

**Objetivo:** Study coach multi-agente para corporate training — memoria del estudiante, quizzes adaptativos, predicción de debilidades con ML, roadmap personalizado.

**Inspirado en:** StudyAlpha (Google×Kaggle Agents Intensive 2026, MIT)

**Repos:**
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — orquestación multi-agente
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — RAG sobre materiales + historial
- [frappe/lms](https://github.com/frappe/lms) — LMS MIT para tracking de progreso

**Arquitectura:**
```
┌─────────────────── Coordinator Agent (LangGraph) ──────────────────┐
│                                                                     │
│  Memory Agent           Quiz Agent           Weakness Agent         │
│  (RAG memory +          (adaptive MCQ        (ML predictor:         │
│   session history)       calibrated          sklearn XGBoost        │
│                          to BKT score)        → weak topics)        │
│                                                      ↓              │
│  Plan Agent: genera roadmap personalizado ← debilidades detectadas  │
│                                ↓                                    │
│  Streamlit / Next.js UI ← respuesta + quiz + plan actualizado       │
└─────────────────────────────────────────────────────────────────────┘
          ↓
  Frappe LMS → registra progreso + completions → dashboard manager
```

**Cómo:** Coordinator Agent en LangGraph despacha subtareas: Memory Agent recupera contexto relevante del historial, Quiz Agent genera 3-5 preguntas calibradas al nivel actual (BKT score de Frappe LMS), Weakness Agent corre un clasificador ML (scikit-learn / XGBoost) sobre el historial de respuestas para predecir qué temas necesitan refuerzo, Plan Agent genera el roadmap de la semana. Toda la orquestación en Python. UI Streamlit para MVP, Next.js para producción.

**Caso de uso Globant:** Corporate upskilling para clientes Fortune 500 — el coach recuerda qué aprendió cada empleado, adapta la dificultad y predice quién necesita refuerzo antes de un assessment. 70% mejor completion rate documentado con AI-personalized vs. lineal.

**Tiempo estimado:** 2-3 semanas | **Equipo:** 1 ML + 1 backend + 1 frontend
