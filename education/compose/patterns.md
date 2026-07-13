# 🧩 Patrones de composición — Education AI

> Recetas concretas para construir soluciones educativas AI.
> Cada patrón: repos específicos + cómo conectarlos + tiempo estimado.
> Última actualización: 2026-07-13

## Arquitectura base

```
[LMS open-source (Moodle / Open edX / Frappe LMS)]
          ↓ (API REST / webhooks / MCP)
[Orquestador de agentes (LangGraph)]
          ↓
[Agentes especializados (DeepTutor / AITutorAgent / pyBKT)]
          ↓
[Capa de observabilidad (Langfuse self-hosted)]
          ↓
[Modelos: Ollama local o Claude API]
```

---

## P1 — AI Tutor sobre Moodle (instituciones existentes)

**Caso**: Universidad con Moodle quiere tutoría AI sin migrar de plataforma.

**Stack**: `moodle/moodle`(GPL) + `cgrevisse/moodle-qbank_genai`(MIT) + `Ebimsv/AITutorAgent`(MIT) + Ollama local + Langfuse + LTI 1.3

**Arquitectura**:
```
Moodle (LTI 1.3) → AITutorAgent (LangGraph) → Ollama (Llama 3.3)
                     ↓ moodle-qbank_genai → Langfuse
```

**Cómo**:
1. Habilitar AI subsystem Moodle 4.5+ con proveedor Ollama
2. Instalar moodle-qbank_genai, configurar endpoint Ollama
3. Desplegar AITutorAgent como FastAPI + SQLite (estado por estudiante)
4. Registrar como LTI 1.3 tool en Moodle
5. Langfuse para tracking + eval pedagógica

**Tiempo**: 6-10 semanas | **Costo infra**: ~$0/mes (self-hosted) | **ROI**: -40% consultas docentes, +15-25% resultados quizzes

---

## P2 — ERP escolar LATAM + AI (K-12 / universidades pequeñas)

**Caso**: Colegio/universidad LATAM sin ERP que necesita sistema completo + AI desde cero.

**Stack**: `frappe/education`(MIT) + `frappe/lms`(MIT) + `HKUDS/DeepTutor`(Apache-2.0) + Langfuse + Claude API

**Arquitectura**:
```
Frappe Education (ERP) → webhooks → LangGraph
    ├─ DeepTutor (tutoría)
    ├─ Agente riesgo académico (asistencia + notas)
    └─ Agente comunicación padres (WhatsApp/email)
          → Claude API + Langfuse
```

**Cómo**:
1. Deploy Frappe Education en VPS (Docker, 1-2 días)
2. Fork DeepTutor → customizar curriculum local (materia, nivel, idioma)
3. LangGraph: webhooks Frappe → agentes especializados
4. Trigger riesgo: asistencia < 70% o nota < 50 → alerta docente + tutor

**Tiempo**: 10-16 semanas | **Costo infra**: ~$200-500/mes | **ROI**: -30% abandono, -50% carga admin

---

## P3 — Quiz adaptativo con knowledge tracing (BKT)

**Caso**: Evaluación adaptativa real — preguntas calibradas al nivel actual del estudiante.

**Stack**: `CAHLR/pyBKT`(MIT) + `CAHLR/OATutor`(MIT) + `HKUDS/DeepTutor`(Apache-2.0) + `openedx/XBlock`(Apache-2.0) + `cgrevisse/moodle-qbank_genai`(MIT)

**Arquitectura**:
```
Estudiante responde → pyBKT actualiza p(conocimiento)
    if p < 0.6: DeepTutor genera hint Socrático + pregunta más informativa
    else: avanza a siguiente habilidad
    → Langfuse registra interacción (eval pedagógica)
```

**Cómo**:
1. Mapear curriculum en skill graph (habilidades + prerequisitos)
2. Cargar banco de preguntas (OATutor JSON format)
3. pyBKT service: actualiza p(conocimiento) tras cada respuesta
4. DeepTutor fork: recibe p(conocimiento) + contexto → hint Socrático
5. XBlock/LTI para integración en LMS

**Tiempo**: 12-20 semanas | **Diferenciador**: BKT = gold standard académico

---

## P4 — L&D corporativo AI (capacitación interna empresas)

**Caso**: Empresa 5,000+ empleados. Sin pagar $200k/año en licencias propietarias.

**Stack**: `frappe/lms`(MIT) + `HKUDS/DeepTutor`(Apache-2.0) + `Ebimsv/AITutorAgent`(MIT) + Langfuse + `kirill-markin/flashcards-open-source-app`(MIT)

**Arquitectura**:
```
Frappe LMS (rutas + cursos + certificaciones)
    → LangGraph
        ├─ DeepTutor (onboarding por rol: tech, ventas, ops)
        ├─ AITutorAgent (Q&A procedimientos = RAG sobre docs internos)
        └─ Quiz agent (evaluación + certificación automática)
    → Langfuse (dashboard HR: completitud, scores)
```

**Cómo**:
1. Deploy Frappe LMS (Docker Compose, 1 día)
2. Ingestar materiales training (PDF/PPTX → RAG)
3. AITutorAgent RAG sobre docs internos
4. DeepTutor por rol
5. Langfuse dashboard para HR

**Tiempo**: 8-14 semanas | **Costo**: $0 licencias + $300-800/mes infra | **ROI**: -40% onboarding, -60% consultas HR

---

## P5 — MOOCs LATAM en español/portugués (Open edX)

**Caso**: Universidad/ministerio quiere MOOC regional con AI tutoring integrado.

**Stack**: `openedx/openedx-platform`(Apache-2.0) + `openedx/XBlock`(Apache-2.0) + `HKUDS/DeepTutor`(Apache-2.0) + `openedx/openedx-events`(Apache-2.0) + Langfuse + Ollama (Llama 3.3 / Mistral Nemo 12B)

**Cómo**:
1. Deploy Open edX en cloud regional (AWS LATAM / GCP São Paulo)
2. Contenido español/portugués con localización completa
3. XBlock "AI Tutor" que llama DeepTutor por contexto del curso
4. Webhooks openedx-events: enrollment → personalize → completion
5. Agente retención: inactivo 7 días → WhatsApp/email proactivo

**Tiempo**: 16-24 semanas | **Escala**: 100k-1M+ usuarios | **Diferenciador**: idioma nativo + datos en país

---

## P6 — Admisiones inteligentes (agente para procesos de ingreso)

**Caso**: Universidad 50k+ postulantes/año quiere automatizar pre-screening + orientación.

**Stack**: `frappe/education`(MIT) + LangGraph + Claude API (claude-haiku-4-5) + WhatsApp Business API + Langfuse

**Arquitectura**:
```
Postulante → Frappe Education (webhook: new_application)
    → LangGraph
        ├─ Agente orientación (WhatsApp: carrera, requisitos)
        ├─ Agente pre-screening (documentos, puntajes)
        └─ Agente seguimiento (estado, fechas, próximos pasos)
    → Frappe Education: actualiza estado en tiempo real
    → Langfuse: conversion rate, tiempo respuesta, satisfaction
```

**Tiempo**: 8-12 semanas | **ROI**: -70% tiempo staff admisiones, +30% tasa de conversión

---

## P7 — Self-hosted AI education stack (privacidad total)

**Caso**: Institución sin datos a APIs externas (FERPA, LGPD, LPDP, EU AI Act Art.10).

**Stack completo on-prem**: Moodle o Open edX + Ollama (Llama 3.3 70B Q4_K_M) + LiteLLM (MIT) + Langfuse self-hosted + `HKUDS/DeepTutor`(Apache-2.0) + `CAHLR/pyBKT`(MIT)

```
[LMS] → [LiteLLM proxy] → [Ollama on-prem]
              ↓
       [DeepTutor + pyBKT] → [Langfuse self-hosted]
```

**Cómo**:
1. Server on-prem (mín: 2x A100 GPU o 4x A10G)
2. Ollama + Llama 3.3 70B (Q4_K_M, 40GB VRAM)
3. LiteLLM: fallback a Claude API si Ollama cae (filtro PII)
4. LMS AI subsystem apuntando a LiteLLM
5. DeepTutor con base_url LiteLLM local

**Tiempo**: 4-8 semanas | **Costo**: $2,000-5,000/mes GPU vs $0 datos a terceros

---

## Guía de selección

```
¿El cliente ya tiene LMS?
├─ Moodle → P1 (LTI 1.3 + Ollama)
├─ Open edX → P5 (MOOCs LATAM)
└─ No → ¿Qué necesita?
      ├─ ERP escolar completo → P2 (Frappe Education)
      ├─ L&D corporativo → P4
      ├─ Evaluación rigurosa → P3 (BKT)
      ├─ Admisiones → P6
      └─ Privacidad total → P7

¿Cuánto tiempo?
├─ < 8 semanas → P1 o P6 (MVP rápido)
├─ 8-16 semanas → P2, P4, P7
└─ > 16 semanas → P3, P5 (escala)
```
