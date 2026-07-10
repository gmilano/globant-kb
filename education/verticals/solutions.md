# 🏭 Verticales de partida — Education

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica arriba.
> Última actualización: 2026-07-10

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Moodle** | GPL-3.0 | [moodle.org](https://moodle.org) · [github.com/moodlehq/moodle](https://github.com/moodlehq/moodle) | PHP + MySQL/MariaDB + PostgreSQL | LMS universal: K-12, university, enterprise. 400M+ usuarios, 240+ países. 2000+ plugins. Añadir AI via microsoft/moodle-ai-assistant (MIT). |
| **Open edX** | Apache-2.0 | [openedx.org](https://openedx.org) · [github.com/openedx/openedx-platform](https://github.com/openedx/openedx-platform) | Python/Django + React + Celery | MOOC a escala. Origen Harvard/MIT. XBlock extensibility. AI plugin oficial: openedx-ai-extensions. 9.6k★. |
| **ClassroomIO** | MIT | [classroomio.com](https://classroomio.com) · [github.com/classroomio/classroomio](https://github.com/classroomio/classroomio) | Svelte + Supabase + PostgreSQL | LMS corporativo moderno. UI limpia. Completamente open. Mejor opción MIT para builds AI-first en Globant. 1.5k★. |
| **Canvas LMS** | AGPL-3.0 | [github.com/instructure/canvas-lms](https://github.com/instructure/canvas-lms) | Ruby on Rails + React + PostgreSQL | Top LMS en educación superior US. API rica. Integra AI vía LTI 1.3 (estándar de interoperabilidad). Apto para integraciones de grading AI. |
| **Richie** | MIT | [github.com/openfun/richie](https://github.com/openfun/richie) | React + Django + Elasticsearch | Portal de cursos CMS. Catálogo + búsqueda. Capa de recomendación AI se añade limpiamente. Usado por France Université Numérique. 311★. |
| **Vacademy** | AGPL-3.0 | [github.com/Vacademy-io/vacademy_platform](https://github.com/Vacademy-io/vacademy_platform) | TypeScript + Postgres | E-learning + learner tracking + assessment management. Plataforma emergente con desarrollo activo. 14★. |

## Cómo customizar con AI (5 pasos)

1. **Elegir base**: Moodle (GPL, cliente con Moodle existente), Open edX (Apache-2.0, MOOCs grandes), ClassroomIO (MIT, build from scratch)
2. **Añadir capa AI**: openedx-ai-extensions o microsoft/moodle-ai-assistant o Claude API via REST hooks
3. **Motor de tutoring**: HKUDS/DeepTutor (Apache-2.0) — conectar vía REST API; mantiene estado de conocimiento del estudiante
4. **Agentes especializados**: quiz generator, grading agent, content recommendation agent, at-risk student alert agent
5. **UI conversacional**: chatbot embebido en el LMS (widget) o interfaz standalone con deep link al curso

## Stack de referencia por segmento

| Segmento | LMS base | AI layer | Tutoring | Orchestration |
|----------|----------|----------|----------|---------------|
| Universidad LATAM (Moodle existente) | Moodle | moodle-ai-assistant | DeepTutor API | n8n / LangGraph |
| MOOC corporativo (>1k learners) | Open edX | openedx-ai-extensions | DeepTutor / Open TutorAI | LangGraph |
| Corporate training (greenfield) | ClassroomIO | Claude API direct | Custom agents | CrewAI / LangGraph |
| K-12 LATAM (español/portugués) | Open edX o Moodle | openedx-ai-extensions | DeepTutor fork | LangGraph |
| EdTech startup | ClassroomIO | Claude Haiku API | Open TutorAI CE | Simple chain |

## ⚠️ Nota de licencias para Globant
- **GPL-3.0** (Moodle, Canvas): modificaciones deben ser open source si el software se distribuye como binario. Para SaaS donde el cliente accede via browser (no descarga el binario), el copyleft no aplica.
- **Apache-2.0** (Open edX, openedx-ai-extensions): permite código propietario sobre la base. Preferir para builds comerciales.
- **MIT** (ClassroomIO, Richie, moodle-ai-assistant): máxima libertad comercial. Ideal para productos Globant.

---
*Actualizado por el pipeline de ingest.*
