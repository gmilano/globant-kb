# 🧩 Patrones de composición — Education

> Recetas concretas para construir soluciones usando repos reales + agentes + AI.
> Última actualización: 2026-07-05

## Arquitectura base

```
[Plataforma vertical base (Moodle / Open edX / Frappe LMS)]
          ↓
[Capa RAG: contenido de cursos → embeddings → vector DB]
          ↓
[Agentes LangGraph: assess → explain → quiz → remediate loop]
          ↓
[UI conversacional / API para el cliente]
```

---

## Patrón 1: AI Tutor sobre Open edX (Universidad)

**Objetivo**: Añadir tutoring conversacional a una instalación Open edX existente sin migrar datos.

**Stack**:
- [openedx/openedx-platform](https://github.com/openedx/openedx-platform) — LMS base
- [openedx/XBlock](https://github.com/openedx/XBlock) — insertar el tutor dentro de unidades de curso
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — loop assess→teach→quiz→remediate
- [langgenius/dify](https://github.com/langgenius/dify) — RAG pipeline sobre PDFs del curso + monitoring
- [ollama/ollama](https://github.com/ollama/ollama) — LLM local si datos sensibles (estudiantes menores)

**Flujo**:
```
Estudiante abre unidad → XBlock AI tutor activa LangGraph agent
  → Agent lee progreso del estudiante (Open edX API)
  → RAG query sobre material del curso (Dify + Qdrant)
  → Genera explicación adaptada al nivel del estudiante
  → Propone quiz (DeepTutor style: 3 preguntas escaladas)
  → Si falla: remediation path → nodo LangGraph alternativo
  → Registra progreso → Open edX gradebook API
```

**Tiempo estimado**: 4-6 semanas (1 XBlock + LangGraph pipeline + RAG ingest)
**Licencias**: Apache 2.0 + MIT → Globant puede deployar y customizar sin restricciones

---

## Patrón 2: Essay Grader Automático sobre Moodle

**Objetivo**: Feedback inmediato y grading multi-criteria para assignments de texto.

**Stack**:
- [moodle/moodle](https://github.com/moodle/moodle) — LMS base
- [Hasif50/Automated-Essay-Grader](https://github.com/Hasif50/Automated-Essay-Grader) — core grading engine
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) — orquestación prompts + rubrics
- Claude API (claude-sonnet-5) o GPT-4 — modelo de lenguaje para grading
- Moodle Webhook → trigger al submit del assignment

**Flujo**:
```
Estudiante sube ensayo → Moodle webhook → Grader microservice
  → LangChain: extrae rubrica del assignment (desde descripción Moodle)
  → Automated Essay Grader: evalúa por criterio (tesis, argumentación, gramática, sources)
  → Genera feedback rubric-aligned en el idioma del curso
  → Detección de plagio (similitud vs. corpus)
  → Push resultado a Moodle Gradebook API
  → Notificación al estudiante con feedback detallado
```

**Tiempo estimado**: 2-3 semanas
**Modelo recomendado**: claude-sonnet-5 (mejor ratio quality/cost para feedback educativo largo)
**Licencias**: GPL 3.0 (Moodle) + MIT (Grader) → distribución restringida, ideal para cliente que deployea internamente

---

## Patrón 3: Adaptive Corporate Upskilling (Frappe LMS + ERPNext)

**Objetivo**: Plataforma corporativa donde el LMS está conectado a HR — cursos recomendados por gap de skills, progreso vinculado a performance review.

**Stack**:
- [frappe/lms](https://github.com/frappe/lms) — LMS base (MIT)
- ERPNext / Frappe HR — HR y performance management (mismo stack)
- [mwasifanwar/eduadapt-ai](https://github.com/mwasifanwar/eduadapt-ai) — adaptive learning paths
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — orquestación del learning agent
- [jmshea/jupyterquiz](https://github.com/jmshea/jupyterquiz) — evaluaciones técnicas para roles data/dev

**Flujo**:
```
HR crea job role con skills requeridos → Frappe HR
  → EduAdapt AI: analiza gap entre skills del empleado y rol target
  → LangGraph: genera learning path personalizado (cursos Frappe LMS + recursos externos)
  → Empleado completa cursos → quizzes automáticos vía jupyterquiz (para roles técnicos)
  → Manager dashboard: progreso + predicción de tiempo para alcanzar competencia
  → Performance review Frappe HR ingesta resultados LMS → evalúa cumplimiento learning goals
```

**Tiempo estimado**: 6-8 semanas
**Licencias**: MIT (Frappe LMS, EduAdapt AI) → ideal para Globant, deployable sin fricción legal

---

## Patrón 4: Knowledge Tracing Tutor (K-12 / STEM)

**Objetivo**: Tutor de matemáticas/ciencias con estimación científica de dominio por skill usando Bayesian Knowledge Tracing.

**Stack**:
- [CAHLR/OATutor](https://github.com/CAHLR/OATutor) — ITS base con BKT (MIT)
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) — generación de explicaciones naturales
- [ollama/ollama](https://github.com/ollama/ollama) — LLM local (privacidad menores)
- [moodle/moodle](https://github.com/moodle/moodle) — LMS institucional donde se integra

**Flujo**:
```
Estudiante intenta problema → OATutor evalúa respuesta
  → BKT actualiza probabilidad de dominio por skill (ej. "fracciones: 0.72")
  → Si P(dominio) < 0.8: LangChain genera hint Socrático (no da respuesta, guía)
  → Si falla 3 veces: LangChain genera explicación completa con ejemplos
  → OATutor selecciona siguiente problema: más fácil si P<0.5, más difícil si P>0.8
  → Dashboard docente: mapa de calor P(dominio) por skill × estudiante
  → Export a Moodle gradebook
```

**Tiempo estimado**: 3-5 semanas
**Diferencial**: BKT es científicamente validado (Carnegie Mellon); no es "AI que adivina", es modelo probabilístico.

---

## Patrón 5: RAG Course Q&A (Cualquier LMS)

**Objetivo**: Chatbot que responde preguntas de estudiantes sobre el material del curso 24/7, reduciendo carga docente.

**Stack**:
- Cualquier LMS (Moodle / Open edX / Frappe) como source de contenido
- [langgenius/dify](https://github.com/langgenius/dify) — RAG pipeline + UI chatbot + monitoring
- [StudentTraineeCenter/edu-agent](https://github.com/StudentTraineeCenter/edu-agent) — orchestration LangGraph + RAG
- Vector DB: Qdrant (MIT) o Chroma (Apache 2.0)
- Claude API o Ollama para respuestas

**Flujo**:
```
Docente sube PDFs/PPTs/videos del curso → Dify ingest pipeline
  → Chunking + embeddings → Qdrant
  → Estudiante pregunta en chat widget del LMS
  → EduAgent: RAG query → retrieve top-k chunks relevantes
  → LLM genera respuesta con citations al material del curso
  → Si fuera del scope del curso: responde "esto no está en el material; consulta al docente"
  → Dify monitoring: preguntas frecuentes → dashboard para el docente
```

**Tiempo estimado**: 1-2 semanas (el más rápido de implementar)
**KPI**: Reducción de emails al docente, satisfacción del estudiante, preguntas resueltas fuera de horario

---

## Patrón 6: AI para Predicción de Deserción (Analytics)

**Objetivo**: Alertar proactivamente sobre estudiantes en riesgo de abandonar el curso.

**Stack**:
- [openedx/openedx-platform](https://github.com/openedx/openedx-platform) — fuente de datos de engagement
- Open edX Analytics (Aspects) — pipeline de datos
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — agente de análisis + alertas
- [langgenius/dify](https://github.com/langgenius/dify) — dashboard + notificaciones

**Señales de riesgo**:
- Días sin login > umbral configurable
- % completitud < peers similares
- Notas en quizzes decrecientes
- Foros: 0 posts en últimas 2 semanas

**Flujo**:
```
Cron diario → LangGraph analytics agent
  → Extrae métricas de Open edX Analytics API
  → Scoring model: asigna riesgo 0-1 por estudiante
  → Si riesgo > 0.7: genera mensaje personalizado para el estudiante
  → Notifica al docente/advisor con contexto: "Ana tiene 12 días sin ingresar, últimas 2 notas <50%"
  → Opcional: trigger email personalizado al estudiante con recurso de ayuda
```

**Tiempo estimado**: 3-4 semanas
**Impacto**: Retención +15-25% reportada en implementaciones similares
