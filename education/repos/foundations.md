# 🏗️ Repos fundacionales — Education

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-11

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [moodle/moodle](https://github.com/moodle/moodle) | GPL-3.0 | LMS más desplegado del mundo: 400M+ usuarios, 150k+ sitios en 240 países, 1.800+ plugins, soporte para AI via plugins y API externa (Moodle AI Subsystem 4.5+) | Sí — 6.3k ★ |
| [openedx/edx-platform](https://github.com/openedx/edx-platform) | AGPLv3 | LMS institucional de Harvard/MIT/IBM: 70M+ usuarios, escalable a miles de alumnos, analytics avanzados, XBlocks para componentes AI custom, base para cursos MOOC enterprise | Sí — 7.2k ★ |
| [learnhouse/learnhouse](https://github.com/learnhouse/learnhouse) | MIT | LMS moderno con AI nativa: code execution 30+ lenguajes, auto-grading, whiteboard colaborativo, editor Notion-like, Docker-deployable, stack Next.js + FastAPI + PostgreSQL | Sí — ~2.1k ★ |
| [learningequality/kolibri](https://github.com/learningequality/kolibri) | MIT | Plataforma offline-first para educación universal: 200+ países, dispositivos de bajo costo, OER completo, crítico para LATAM sin internet confiable, integrable con Ollama local | Sí — 942 ★ |
| [openedx/XBlock](https://github.com/openedx/XBlock) | Apache-2.0 | SDK para construir componentes de learning custom en Open edX: base para integrar agentes AI dentro del LMS como actividades interactivas nativas | Sí — 468 ★ |
| [openfun/richie](https://github.com/openfun/richie) | MIT | CMS open source para portales educativos: catalog management, search avanzado, integrable con Open edX, soporte i18n y A11y, base para frontends modernos | Sí — 311 ★ |
| [instructure/canvas-lms](https://github.com/instructure/canvas-lms) | AGPLv3 | Canvas LMS: +30M estudiantes en higher ed USA, UI limpia, API REST completa, LTI 1.3, OAuth2, base para extensiones AI en universidades americanas | Sí — 5.1k ★ |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | MIT | Classroom multi-agente de Tsinghua Univ: turns cualquier documento en una clase inmersiva con AI teachers, quizzes y simulaciones (MIT desde jun 2026) | Sí — ~3.8k ★ |

---

## Cuándo usar cada base

| Escenario | Plataforma recomendada |
|-----------|----------------------|
| Universidad / institución con escala (10k+ alumnos) | Open edX + XBlock para AI custom |
| Empresa con cursos propios (L&D corporativo) | LearnHouse (MIT, stack moderno) |
| Clientes K-12 o zonas sin internet confiable | Kolibri (offline-first, MIT) |
| Portal de cursos público con catalog amplio | Moodle o Richie + Open edX |
| Experiencia inmersiva con AI teachers | OpenMAIC (MIT desde jun 2026) |
| Higher ed con Canvas ya instalado | canvas-lms + extensiones AI via API |
| Proyecto nuevo greenfield | LearnHouse + DeepTutor + EduAgent |

---

## Stack base recomendado para proyectos nuevos (Globant)

```
LearnHouse (MIT) — LMS base moderno
  + DeepTutor (Apache-2.0) — capa de tutoring AI
  + EduAgent (MIT) — RAG sobre materiales del cliente con LangGraph + pgvector
  + Ollama / Claude Haiku — modelo LLM (on-prem o cloud según compliance)
  + PostgreSQL + pgvector — embeddings semánticos y datos del LMS
```

---
*Ver también: `agents/top.md` para agentes especializados, `verticals/solutions.md` para plataformas verticales completas.*
*Ingest education v9 — 2026-07-11*
