# 🎯 Agentes AI — Education (v6)

> Agentes y herramientas AI open source para la industria educativa. Foco: MIT / Apache 2.0 / BSD.
> Última actualización: 2026-07-14

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| DeepTutor | [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Apache-2.0 | Agent-native personalized tutoring con 6 modos de aprendizaje, memoria persistente, sistema Heartbeat de check-ins y multi-agent orchestration. Tutor que evoluciona con el estudiante. | 22k+ |
| Instructional Agents | [DaRL-GenAI/instructional_agents](https://github.com/DaRL-GenAI/instructional_agents) | Apache-2.0 | Framework EACL 2026: multi-agent ADDIE para generar syllabus, slides LaTeX y evaluaciones automáticamente. Roles: Teaching Faculty, Instructional Designer, TA, Coordinator. Reduce 40% carga docente. | ~200 |
| Open TutorAI CE | [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | BSD-3-Clause | Plataforma de tutoría open-source con voz, video y avatares 3D personalizables. Docker-first, integra LLMs locales via Ollama. arXiv:2602.07176. | ~800 |
| pyKT | [pykt-team/pykt-toolkit](https://github.com/pykt-team/pykt-toolkit) | MIT | Librería PyTorch para knowledge tracing: 10+ modelos DL (MoC-KT, DenoiseKT, MTKT), 7 datasets estándar, 5 escenarios de predicción. Base para sistemas de aprendizaje adaptativo. | 1.2k |
| OATutor | [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | MIT | Sistema de tutoría inteligente open-source con Bayesian Knowledge Tracing (BKT). Construido en ReactJS + Firebase. CAHLR/Berkeley. | ~300 |
| EduAdapt AI | [mwasifanwar/eduadapt-ai](https://github.com/mwasifanwar/eduadapt-ai) | MIT | Sistema de aprendizaje adaptativo con RL: personaliza contenido, paths y evaluaciones por estilo de aprendizaje, rendimiento y engagement en tiempo real. | ~150 |
| awesome-ai-llm4education | [GeminiLight/awesome-ai-llm4education](https://github.com/GeminiLight/awesome-ai-llm4education) | MIT | Colección curada de papers y repos de AI/LLM para educación: knowledge tracing, tutoring agents, evaluación, generación de contenido. Base de investigación. | 1.5k |
| vacademy_platform | [Vacademy-io/vacademy_platform](https://github.com/Vacademy-io/vacademy_platform) | AGPL-3.0 | Plataforma e-learning completa con delivery de contenido, learner tracking y assessment management. Moderna, modular. | ~500 |
| XBlock SDK | [openedx/XBlock](https://github.com/openedx/XBlock) | Apache-2.0 | Framework para construir componentes de aprendizaje personalizados en Open edX. Base para integrar agentes AI en el LMS. | 468 |
| Richie CMS | [openfun/richie](https://github.com/openfun/richie) | MIT | CMS open-source para portales educativos sobre Django+React. Base para construir MOOC portals customizables con AI. | 311 |

## Agentes por función

### Tutorías personalizadas
- **DeepTutor** — El estándar de facto 2026 para tutoring agentic. 6 modos: Chat, Quiz, Flashcard, Deep Dive, Socratic, Practice.
- **Open TutorAI CE** — Multimodal con avatares: ideal para LATAM donde la interacción face-to-face importa.
- **OATutor** — Tutoring estructurado con knowledge tracing bayesiano, bueno para matemáticas.

### Generación de contenido / automatización docente
- **Instructional Agents** — ADDIE multi-agent: desde requisitos del curso hasta slides y evaluaciones listas para aula.
- **EduAdapt AI** — Recomienda paths y ajusta dificultad vía RL en tiempo real.

### Knowledge Tracing & Analytics
- **pyKT** — La librería de referencia para modelar el conocimiento del estudiante (BKT, DKT, SAKT, MoC-KT, DenoiseKT).
- **OATutor** — BKT integrado en el tutor, ideal para demostrar value en producción.

### Investigación y benchmarking
- **awesome-ai-llm4education** — Punto de entrada para el estado del arte académico.
- **LectūraAgents** (arXiv:2606.16428) — Framework jerárquico con ProfessorAgent y TASA algorithm para tutoring embodied.

---
*Actualizado automáticamente por el pipeline de ingest — v6.*
