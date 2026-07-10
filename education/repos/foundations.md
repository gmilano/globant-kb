# 🏗️ Repos fundacionales — Education

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-10 (v6)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [openedx/openedx-platform](https://github.com/openedx/openedx-platform) | Apache-2.0 | Open edX LMS & Studio — powers edX.org; large-scale MOOC platform, Python/Django + React, extensible XBlock architecture. Harvard/MIT origin. 9.6k★ | Sí — extensión nativa AI vía openedx-ai-extensions; XBlock para componentes AI custom |
| [moodlehq/moodle](https://github.com/moodlehq/moodle) | GPL-3.0 | Moodle LMS — 400M+ users, 240+ countries, PHP + MySQL/Postgres. Ecosistema de 2000+ plugins. AI vía microsoft/moodle-ai-assistant. 6.1k★ | Sí — plugin ecosystem + AI agent layer; nota: GPL requiere open source modifications si se distribuye |
| [classroomio/classroomio](https://github.com/classroomio/classroomio) | MIT | Modern corporate LMS: Svelte + Supabase. Unlimited courses, grading, certificates. AI-augmentable via REST hooks + MCP server. Best MIT option for enterprise training builds. 1.5k★ | Sí — stack moderno, licencia máxima libertad, ideal para Globant builds comerciales |
| [learnhouse/learnhouse](https://github.com/learnhouse/learnhouse) | AGPL-3.0 | Next-gen open source learning platform. Block-based content editor, code execution + auto-grading (30+ langs), collaborative whiteboards, AI-generated interactive elements. Next.js + FastAPI + Postgres. ~390★ | Sí — mejor plataforma moderna para EdTech startups; AGPL safe para SaaS |
| [openedx/XBlock](https://github.com/openedx/XBlock) | Apache-2.0 | Framework for building custom learning components that run inside Open edX LMS. The right extensibility layer for AI-native blocks (tutor, quiz, feedback). 468★ | Sí — build AI-native learning blocks: adaptive quiz, personalized tutor widget, knowledge graph |
| [openedx/openedx-ai-extensions](https://github.com/openedx/openedx-ai-extensions) | Apache-2.0 | Official edX AI plugin: modular AI workflows, grading hooks, student-support agents, content recommendation slots. Maintained by Axim/Open edX team. 210★ | Sí — extensión oficial, safe for upstream updates |
| [moodlehq/moodleapp](https://github.com/moodlehq/moodleapp) | Apache-2.0 | Official Moodle mobile app (Ionic + Angular). Add AI copilots on top for mobile-first agentic learning. 979★ | Sí — base para mobile AI tutor en iOS/Android |
| [openfun/richie](https://github.com/openfun/richie) | MIT | Education portal CMS (React + Django). Course catalogue + full-text search. AI recommendation layer drops in via Django signals. Used by France Université Numérique. 311★ | Sí — base para portal educativo público con AI search/recommendations |
| [mwasifanwar/eduadapt-ai](https://github.com/mwasifanwar/eduadapt-ai) | MIT | Adaptive learning framework: RL-based learning path optimization, knowledge tracing, content recommendation, adaptive quiz generation. Policy gradient RL for personalized paths. MIT license = máxima libertad. | Sí — capa de personalización RL sobre cualquier LMS; agnóstico de plataforma |

## Notas de licencias

| Licencia | Uso comercial | Fork privado | Condición |
|----------|---------------|-------------|-----------|
| Apache-2.0 | ✅ Libre | ✅ Libre | Solo mantener atribución |
| MIT | ✅ Libre | ✅ Libre | Solo mantener copyright notice |
| GPL-3.0 | ✅ Libre | ✅ En SaaS interno | Si distribuyes el binario, código debe ser open source |
| AGPL-3.0 | ✅ Libre | ⚠️ SaaS expuesto | Modificaciones deben publicarse si se accede via red (incluso SaaS) |

**Recomendación Globant**: Preferir Apache-2.0 (Open edX) o MIT (ClassroomIO, EduAdapt-AI) para builds comerciales. GPL (Moodle) OK para SaaS internos o cliente que ya tiene Moodle. AGPL (LearnHouse) viable para SaaS solo si se libera el código de modificaciones.

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
