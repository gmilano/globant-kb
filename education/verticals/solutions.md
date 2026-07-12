# 🏭 Verticales de partida — Education

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-12 (v12)

## Plataformas LMS — punto de entrada recomendado

| Plataforma | Licencia | URL | Stack | Usuarios / Escala | Caso de uso |
|------------|----------|-----|-------|-------------------|-------------|
| **Moodle** | GPL-3.0 | [github.com/moodle/moodle](https://github.com/moodle/moodle) | PHP + JS + PostgreSQL/MySQL | 300M+ usuarios, 240+ países | K-12, universidad, corporativo — el más customizable vía plugins; AI Subsystem v2 en v4.6 |
| **Open edX** | AGPL-3.0 | [github.com/openedx/edx-platform](https://github.com/openedx/edx-platform) | Django + React + MongoDB | 70M+ usuarios, base de edX/Coursera | MOOCs, certificaciones, upskilling corporativo; AI Course Creator Plugin GA 2026 |
| **Canvas LMS** | AGPL-3.0 | [github.com/instructure/canvas-lms](https://github.com/instructure/canvas-lms) | Ruby on Rails + React | #1 en educación superior EE.UU. | Higher education, distritos K-12 grandes; integración Anthropic Claude Q3 2026 |
| **LearnHouse** | AGPL-3.0 | [github.com/learnhouse/learnhouse](https://github.com/learnhouse/learnhouse) | TypeScript + Python | ~400★, crecimiento rápido 2026 | Alternativa moderna a Moodle/Udemy/Skool — AI-native, block editor, multi-tenant, self-hostable |
| **Vacademy** | AGPL-3.0 | [github.com/Vacademy-io/vacademy_platform](https://github.com/Vacademy-io/vacademy_platform) | Python + TypeScript | ~200★ emergente | E-learning moderno AI-native desde el diseño |
| **Richie** | MIT | [github.com/openfun/richie](https://github.com/openfun/richie) | Django + React | France Université Numérique | Portal educativo / catálogo de cursos — MIT ✅ ideal para portales personalizados |

## Plataformas de Assessment y Quiz

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Open Assessment Tool (TAO)** | GPL-2.0 | [github.com/oat-sa/tao-core](https://github.com/oat-sa/tao-core) | PHP + JavaScript | Assessments adaptativos IRT, SCORM, QTI 2.2 — adoptado por ETS, Pearson, Prometric |
| **Oppia** | Apache-2.0 | [github.com/oppia/oppia](https://github.com/oppia/oppia) | Python + TypeScript | Lecciones interactivas con feedback inteligente; Google-backed; 11k★ |
| **H5P** | MIT | [github.com/h5p/h5p-php-library](https://github.com/h5p/h5p-php-library) | PHP + JS | Contenido interactivo embebible en Moodle/Canvas/WP; 75+ tipos de actividad |

## Plataformas de Tutoring Adaptativo

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **DeepTutor** | Apache-2.0 | [github.com/HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | FastAPI + Next.js | Learning workspace completo: Chat, Quiz, Research, Mastery Path; ~28k★; EduHub MCP marketplace |
| **Open-TutorAI CE** | Apache-2.0 | [github.com/Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | Python + Web | Multi-agente, knowledge graphs, 12 idiomas; LATAM-ready (ES-LA + PT-BR) |
| **OATutor** | MIT | [github.com/CAHLR/OATutor](https://github.com/CAHLR/OATutor) | React + Firebase | Tutoring adaptativo con BKT; sin backend propio — deploy estático |

## Education ERP / School Management

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Frappe Education** | AGPL-3.0 | [github.com/frappe/education](https://github.com/frappe/education) | Python + Vue.js (ERPNext) | School management: admisiones, asistencia, calificaciones, fees, biblioteca; 565★ |
| **Frappe Learning (LMS)** | MIT | [github.com/frappe/lms](https://github.com/frappe/lms) | Python + Vue.js | LMS 100% open source para empresas y educadores; integración nativa con ERPNext — MIT ✅ |
| **OpenEduCat** | LGPL-3.0 | [github.com/openeducat/openeducat_erp](https://github.com/openeducat/openeducat_erp) | Python (Odoo) | ERP educativo completo: LMS + SIS + fees + parent app en una BD |

## Plataformas de Video / Contenido

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **PeerTube** | AGPL-3.0 | [github.com/Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | TypeScript + PostgreSQL | Video educativo federado; auto-hosted con HLS adaptive streaming |
| **Jellyfin** | GPL-2.0 | [github.com/jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) | C# .NET | Media server para biblioteca de contenido educativo; API para AI search |

## Cómo customizar con AI (patrón recomendado)

```
1. Seleccionar LMS base (Moodle / Open edX / LearnHouse / Vacademy según contexto del cliente)
2. Añadir AI service layer:
   - Endpoint OpenAI-compatible (Ollama local para privacy-first, Claude API para calidad)
   - MCP server custom: expone grades, assignments, calendar al agente
3. Envolver flujos existentes con agentes:
   - Quiz generation: LMS grades API → LLM → preguntas calibradas por KG
   - Adaptive content: BKT score → LLM selector → siguiente lección óptima
   - Tutoring chat: contexto del curso en RAG → Claude → respuesta fundamentada
4. UI conversacional (Next.js / React) sobre la plataforma base
5. Métricas de aprendizaje: LRS (xAPI / SCORM) → dashboard AI-powered
6. Governance layer: audit logs, human-in-the-loop hooks, academic integrity checks (v12)
```

## Decisión rápida: ¿qué plataforma elegir?

| Contexto del cliente | Recomendación |
|---------------------|---------------|
| Corporativo / upskilling | **Open edX** — XBlock API + LTI 1.3, escala horizontal |
| K-12 / Universidad LATAM | **Moodle** — GPL, plugins ES/PT maduros, comunidad activa |
| Startup EdTech AI-first | **LearnHouse** o **Vacademy** — AI-native, ramp-up rápido, TypeScript/Python |
| Tutoring 1-a-1 AI-first | **DeepTutor** — agent-native desde el inicio, ~28k★ respaldo, EduHub MCP |
| Assessments / Certificaciones | **Open Assessment Tool (TAO)** — QTI, IRT, adoptado por ETS |
| School management + ERP | **Frappe Education** + **Frappe LMS** — ERPNext + LMS en un stack |
| Privacy regulatoria K-12 | **OATutor** + **Moodle** on-prem + **Ollama** — sin cloud externo |
| Corporate LMS + AI | **Frappe LMS** (MIT) + Claude API — integración ERPNext, licencia limpia |
