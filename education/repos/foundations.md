# 🏗️ Repos fundacionales — Education

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-12

## Plataformas LMS y CMS educativo

| Repo | Licencia | Descripción | Stars | ¿Base para AI? |
|------|----------|-------------|-------|----------------|
| [moodle/moodle](https://github.com/moodle/moodle) | GPL-3.0 | La plataforma LMS más usada del mundo: 300M+ usuarios, 240+ países, PHP + JavaScript, AI Subsystem v2 en v4.6 | ~6.5k | Sí — REST API + Webservices + plugin ecosystem + AI subsystem interface |
| [openedx/edx-platform](https://github.com/openedx/edx-platform) | AGPL-3.0 | Open edX LMS+CMS (Django + React): 70M+ usuarios, base de Coursera/edX, Harvard+MIT; AI Course Creator Plugin GA 2026 | ~7.2k | Sí — XBlock API, LTI 1.3, SCORM, AI grading, openedx-ai-extensions |
| [instructure/canvas-lms](https://github.com/instructure/canvas-lms) | AGPL-3.0 | Canvas: LMS líder en educación superior EE.UU., Ruby on Rails + React; integración oficial Anthropic Claude anunciada Q3 2026 | ~5.6k | Sí — REST API, LTI, GraphQL API |
| [openedx/XBlock](https://github.com/openedx/XBlock) | Apache-2.0 | Framework para construir componentes de aprendizaje personalizados (Apache 2.0 — mejor licencia del ecosistema edX) | ~468 | Sí — montar cualquier herramienta AI como XBlock plugin |
| [openfun/richie](https://github.com/openfun/richie) | MIT | CMS open source para portales educativos (France Université Numérique); Django + React — MIT ✅ | ~311 | Sí — base limpia para portal educativo + AI recommendation layer |
| [Vacademy-io/vacademy_platform](https://github.com/Vacademy-io/vacademy_platform) | AGPL-3.0 | E-learning open source moderno: contenido, learner tracking, assessments; AI hooks integrados desde el inicio | ~200 | Sí — alternativa moderna a Moodle/Open edX con AI-native design |
| [moodlehq/moodleapp](https://github.com/moodlehq/moodleapp) | Apache-2.0 | App móvil oficial de Moodle (Ionic + Angular); API Moodle Mobile — Apache 2.0 ✅ | ~979 | Sí — shell para añadir features AI nativas en móvil |

## Frameworks de AI/RAG para construir sobre plataformas educativas

| Repo | Licencia | Descripción | Stars | ¿Base para AI? |
|------|----------|-------------|-------|----------------|
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | MIT | Framework RAG y agentes: data connectors, query engines, chat engines. Base interna de DeepTutor. Python | ~40k | Sí — motor RAG de referencia para cualquier LMS |
| [getzep/graphiti](https://github.com/getzep/graphiti) | Apache-2.0 | Knowledge graphs temporales para AI agents: rastrea cómo cambian los hechos, provenance, ontología aprendida | ~3.2k | Sí — curriculum knowledge graph para tutores adaptativos |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | Framework multi-agente con estado persistente: cycles, branching, checkpointing — base de AITutorAgent y EduAgent | ~34k | Sí — orquestador de agentes para flujos pedagógicos complejos |
| [mlabonne/llm-course](https://github.com/mlabonne/llm-course) | MIT | Curso completo sobre LLMs con roadmaps y Colab notebooks; recurso de referencia para onboarding de equipos | ~38k | Sí — base de contenido reutilizable y plantilla de curriculum |
| [DataTalksClub/llm-zoomcamp](https://github.com/DataTalksClub/llm-zoomcamp) | MIT | Curso gratuito 10 semanas sobre LLMs en producción: RAG, evaluación, monitoring | ~5.5k | Sí — plantilla de curso AI auto-hosteable + materiales libres |

## Plataformas de Assessment

| Repo | Licencia | Descripción | Stars | ¿Base para AI? |
|------|----------|-------------|-------|----------------|
| [oat-sa/tao-core](https://github.com/oat-sa/tao-core) | GPL-2.0 | Open Assessment Tool (TAO): assessments adaptativos IRT, SCORM, QTI 2.2 — adoptado por ETS, Pearson | ~400 | Sí — assessment platform con IA calibración de dificultad |
| [oppia/oppia](https://github.com/oppia/oppia) | Apache-2.0 | Lecciones interactivas con feedback inteligente (Google-backed); Python + TypeScript | ~11k | Sí — lecciones adaptativas + AI feedback integrado |
| [h5p/h5p-php-library](https://github.com/h5p/h5p-php-library) | MIT | Contenido interactivo embebible en Moodle/Canvas/WordPress; 75+ tipos de actividad | ~1.1k | Sí — actividades interactivas en cualquier LMS |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
