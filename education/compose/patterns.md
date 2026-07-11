# 🧩 Patrones de composición — Education

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-11

## Stack base

```
[Plataforma vertical base (open source)]
          ↓
[Capa de integración AI (API Gateway / LangGraph)]
          ↓
[Agentes especializados de Education]
          ↓
[UI conversacional / dashboard docente / API cliente]
```

---

## Patrón P1 — Corporate L&D AI Tutor (LearnHouse + EduAgent + DeepTutor)

**Objetivo**: reemplazar LMS legacy corporativo con stack agent-native para capacitación interna.

**Stack**:
- [learnhouse/learnhouse](https://github.com/learnhouse/learnhouse) (MIT) — LMS base moderno
- [StudentTraineeCenter/edu-agent](https://github.com/StudentTraineeCenter/edu-agent) (MIT) — RAG sobre materiales del cliente
- [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) (Apache-2.0) — tutoring multi-modo
- Ollama + Llama 3.1 8B (on-prem) o Claude 3.5 Haiku (cloud)
- pgvector (embeddings semánticos de documentos)

**Flujo**:
1. Cliente sube documentos de capacitación (PDFs, PPTs, transcripciones) → EduAgent los indexa con pgvector
2. Empleado entra a LearnHouse → DeepTutor como actividad nativa via API interna
3. DeepTutor tutoriza en modo Chat → detecta gap → activa modo Quiz → genera flashcards
4. EduAgent resuelve Q&A grounding respuestas en documentos del cliente (con citations)
5. Dashboard de L&D: completion rates, knowledge gaps por competencia, riesgo de abandono

**Tiempo estimado**: 8-12 semanas
**Rango de proyecto Globant**: USD 80k-250k
**Diferenciador**: todo on-prem o EU/LATAM data residency — no datos salen a OpenAI

---

## Patrón P2 — Higher Ed Adaptive MOOC (Open edX + XBlock AI + LangGraph)

**Objetivo**: añadir tutoring adaptativo AI a un LMS Open edX existente sin reemplazarlo.

**Stack**:
- [openedx/edx-platform](https://github.com/openedx/edx-platform) (AGPLv3) — LMS base existente
- [openedx/XBlock](https://github.com/openedx/XBlock) (Apache-2.0) — componente AI como actividad nativa
- LangGraph (MIT) — orquestación de agentes de tutoring
- Claude 3.5 Haiku (bajo costo para scale) o GPT-4o-mini
- Redis — estado de sesión del estudiante

**Flujo**:
1. Docente define XBlock AI en el curso → aparece como actividad interactiva para el alumno
2. Alumno interactúa con el XBlock → LangGraph invoca agente tutor con contexto del módulo
3. Agente evalúa respuestas del alumno → ajusta dificultad → genera hints Socráticos
4. Agente genera reporte semanal al docente: gaps de la clase, alumnos en riesgo, sugerencias pedagógicas
5. Analytics feed a edX Insights: visualización de mastery por concepto y estudiante

**Tiempo estimado**: 10-14 semanas
**Rango de proyecto Globant**: USD 100k-300k
**Diferenciador**: integra en Moodle/edX existente — cero migración para el cliente

---

## Patrón P3 — Multi-Agent Immersive Classroom (OpenMAIC + cliente)

**Objetivo**: crear experiencias de aula inmersiva para training corporativo o higher ed.

**Stack**:
- [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) (MIT) — core del aula multi-agente
- Claude 3.5 Sonnet — AI teacher con voz y narrativa
- ElevenLabs API — voice synthesis para el maestro AI (opcional)
- Cualquier documento del cliente → OpenMAIC lo convierte en slides + quizzes + simulaciones

**Flujo**:
1. Docente/cliente sube material (PDF, PPT, URL) → OpenMAIC genera la clase en minutos
2. El alumno accede a la "aula": AI teacher da la clase con voz, pizarra, laser pointer
3. AI classmates hacen preguntas y comentarios que enriquecen la clase
4. Quizzes interactivos con grading AI en tiempo real
5. Simulaciones HTML auto-generadas para conceptos abstractos (física, economía, código)
6. PBL v2: proyectos colaborativos con AI facilitador (feature de v0.3.0 jun 2026)

**Tiempo estimado**: 6-10 semanas
**Rango de proyecto Globant**: USD 60k-180k
**Diferenciador**: tiempo de creación de módulo se reduce de semanas a minutos; MIT license

---

## Patrón P4 — LATAM Offline Tutor (Kolibri + Ollama + Llama 3.1)

**Objetivo**: llevar tutoring AI a escuelas sin internet confiable en LATAM.

**Stack**:
- [learningequality/kolibri](https://github.com/learningequality/kolibri) (MIT) — LMS offline-first
- Ollama (MIT) — runner de modelos locales
- Llama 3.1 8B Instruct (Meta, open weights) — modelo en español, ~5GB VRAM
- Raspberry Pi 5 (8GB RAM) o NUC local — servidor sin internet
- Sync periódico vía USB o WiFi esporádica

**Flujo**:
1. Kolibri server en Raspberry Pi 5 — corre sin internet, sirve a 30-50 alumnos en red local
2. Llama 3.1 8B via Ollama en el mismo servidor — respuestas en español en <2s
3. Plugin Kolibri custom (Python) que llama a Ollama API para Q&A sobre el contenido cargado
4. Alumno pregunta sobre el contenido de la lección → el agente local responde citando el libro
5. Sync semanal/mensual cuando hay conexión: actualizar modelos, contenido OER, logs de progreso

**Tiempo estimado**: 8-12 semanas + hardware provisioning
**Rango de proyecto Globant**: USD 50k-120k (más hardware)
**Diferenciador**: único stack completo offline-AI-education — gap de mercado real en LATAM

---

## Patrón P5 — Adaptive Quiz Engine (EduAdapt + pgvector + LangGraph)

**Objetivo**: generar quizzes adaptativos desde materiales del cliente con ajuste de dificultad por RL.

**Stack**:
- [mwasifanwar/eduadapt-ai](https://github.com/mwasifanwar/eduadapt-ai) (MIT) — RL para paths adaptativos
- [StudentTraineeCenter/edu-agent](https://github.com/StudentTraineeCenter/edu-agent) (MIT) — generación de quizzes desde RAG
- LangGraph (MIT) — orquestación del loop adaptativo
- pgvector — embeddings de preguntas y respuestas del banco
- FastAPI — API de servicio de quizzes para cualquier LMS via LTI 1.3

**Flujo**:
1. Subir materiales del curso → EduAgent genera banco de 200+ preguntas con metadatos de dificultad
2. El alumno empieza quiz → EduAdapt RL selecciona siguiente pregunta basado en performance histórico
3. Respuesta incorrecta → LangGraph invoca agente explicador → hint Socrático → retry
4. Respuesta correcta → RL sube dificultad → EduAgent genera variante más difícil del mismo concepto
5. Al terminar: mastery map por competencia + recomendación de módulos débiles

**Tiempo estimado**: 6-8 semanas
**Rango de proyecto Globant**: USD 40k-120k
**Diferenciador**: quiz adaptativo RL desde materiales propios del cliente — no una librería genérica

---

## Patrón P6 — SCORM to AI Migration Pipeline

**Objetivo**: modernizar cursos SCORM legacy corporativos sin recrearlos desde cero.

**Stack**:
- Python SCORM parser (custom, MIT-friendly) — extrae contenido de paquetes SCORM/xAPI
- Claude 3.5 Sonnet — transcribe y estructura el contenido extraído
- [learnhouse/learnhouse](https://github.com/learnhouse/learnhouse) (MIT) — destino moderno
- EduAgent (MIT) — RAG sobre el contenido migrado
- pgvector — indexación semántica del corpus migrado

**Flujo**:
1. Parser extrae HTML/JS/media de paquetes SCORM del cliente
2. Claude estructura el contenido: módulos, objetivos de aprendizaje, evaluaciones
3. LearnHouse recibe el contenido estructurado via API → curso listo para publicar
4. EduAgent indexa el corpus migrado → tutor AI responde preguntas sobre el contenido
5. xAPI statements del LMS antiguo → enrichen el perfil del learner en el nuevo sistema

**Tiempo estimado**: 8-12 semanas (varía con volumen de cursos)
**Rango de proyecto Globant**: USD 70k-200k
**Diferenciador**: gap de mercado real — no existe OSS de migración SCORM→AI; potencial de producto

---

## Patrón P7 — Teacher Co-Pilot (LangGraph + Moodle + grading AI)

**Objetivo**: amplificar la productividad del docente con un agente asistente integrado en Moodle.

**Stack**:
- [moodle/moodle](https://github.com/moodle/moodle) (GPL) — LMS existente del cliente
- LangGraph (MIT) — orquestación del agente docente
- Claude 3.5 Haiku — grading de respuestas abiertas (bajo costo, alta velocidad)
- Moodle Webhook plugin — triggers desde eventos del LMS
- FastAPI — backend del agente

**Flujo**:
1. Docente define rubric para el assignment en una UI simple fuera de Moodle
2. Alumno entrega → Moodle webhook dispara → agente recibe entrega + rubric
3. Claude evalúa según rubric → genera grade + feedback personalizado por alumno
4. Si confidence < threshold → marca para revisión humana del docente
5. Agente genera reporte semanal: distribución de notas, errores más comunes, sugerencias pedagógicas
6. Docente revisa solo los casos flaggeados — 70%+ del grading automático

**Tiempo estimado**: 6-8 semanas
**Rango de proyecto Globant**: USD 40k-100k
**Diferenciador**: alto ROI percibido: docente ahorra 5-10h/semana en corrección — venta fácil

---

## Patrón P8 — AI-Powered Upskilling Platform (LearnHouse + DeepTutor + certificados)

**Objetivo**: plataforma completa de upskilling/reskilling para RRHH corporativo con certificación.

**Stack**:
- [learnhouse/learnhouse](https://github.com/learnhouse/learnhouse) (MIT) — plataforma base
- [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) (Apache-2.0) — tutoring multi-modo
- [mwasifanwar/eduadapt-ai](https://github.com/mwasifanwar/eduadapt-ai) (MIT) — paths adaptativos por rol y nivel
- Claude 3.5 Sonnet — generación de contenido y evaluación de respuestas abiertas
- WeasyPrint (MIT) — certificados PDF auto-generados con firma digital

**Flujo**:
1. RRHH define skill matrix por rol (ej: "Data Analyst L2 debe dominar SQL + Python + ML basics")
2. EduAdapt genera path personalizado según assessment inicial del empleado
3. DeepTutor tutoriza en cada módulo — Chat, Quiz, Deep Solve disponibles
4. LearnHouse trackea completion + time-on-task + quiz scores por módulo
5. Al completar el path: certificado PDF auto-generado con skills verificados + fecha
6. Dashboard RRHH: skill gaps por equipo, ROI de capacitación, readiness por competencia

**Tiempo estimado**: 12-16 semanas
**Rango de proyecto Globant**: USD 120k-350k
**Diferenciador**: único stack OSS end-to-end para upskilling corporativo AI-native con certificación

---

## Selección rápida por tipo de cliente

| Tipo de cliente | Patrón recomendado | Tiempo | Rango USD |
|----------------|-------------------|--------|-----------|
| Empresa LATAM con capacitación interna | P1 (LearnHouse + EduAgent) | 8-12 sem | 80k-250k |
| Universidad con Moodle existente | P7 (Teacher Co-Pilot) | 6-8 sem | 40k-100k |
| Universidad con Open edX | P2 (XBlock AI) | 10-14 sem | 100k-300k |
| Corporación con training inmersivo | P3 (OpenMAIC) | 6-10 sem | 60k-180k |
| Cliente LATAM sin internet confiable | P4 (Kolibri + Ollama) | 8-12 sem | 50k-120k |
| Evaluación y quizzes adaptativos | P5 (EduAdapt + RAG) | 6-8 sem | 40k-120k |
| Empresa con SCORM legacy | P6 (SCORM Migration) | 8-12 sem | 70k-200k |
| RRHH / upskilling enterprise | P8 (Full upskilling stack) | 12-16 sem | 120k-350k |

---
*Ingest education v9 — 2026-07-11*
