# 🏗️ Repos fundacionales — Education (v6)

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-14

## Plataformas y frameworks base

| Repo | Licencia | Descripción | Stars | ¿Base para AI? |
|------|----------|-------------|-------|----------------|
| [moodle/moodle](https://github.com/moodle/moodle) | GPL-3.0 | LMS líder mundial: 400M+ usuarios, 150k+ sitios. Plugin AI subsystem v4.5+ con OpenAI/Azure/Ollama/DeepSeek. | 6.2k | ✅ plugin ecosystem masivo |
| [openedx/edx-platform](https://github.com/openedx/edx-platform) | Apache-2.0 | El LMS detrás de edX (Harvard+MIT). MOOC-grade. Python/Django. Base para portales corporativos y gubernamentales. | 7.1k | ✅ XBlock API + MCP bridges |
| [openedx/XBlock](https://github.com/openedx/XBlock) | Apache-2.0 | Framework para construir componentes de aprendizaje en Open edX. Entry point para integrar agentes AI. | 468 | ✅ entry point ideal para AI |
| [openfun/richie](https://github.com/openfun/richie) | MIT | CMS para portales educativos: Django + React. MOOCs grande escala. France Université Numérique. | 311 | ✅ portal front para AI tutors |
| [GibbonEdu/core](https://github.com/GibbonEdu/core) | GPL-3.0 | Plataforma gestión escolar flexible. SIS + academic records + scheduling. Complementa Moodle. | ~1.2k | ✅ SIS base para agentes admin |
| [pykt-team/pykt-toolkit](https://github.com/pykt-team/pykt-toolkit) | MIT | PyTorch knowledge tracing: 10+ modelos DL (MoC-KT, DenoiseKT, MTKT), 7 datasets, 5 escenarios. Referencia del campo. | 1.2k | ✅ core para adaptive learning |
| [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | MIT | Open-source Adaptive Tutoring System con BKT. ReactJS + Firebase. 80+ problem sets matemáticos, scaffold hints. UC Berkeley. | ~300 | ✅ ITS base para STEM |
| [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | BSD-3-Clause | Tutoring multimodal: LLMs + avatares 3D + voice + video. Docker-first. arXiv:2602.07176. | ~800 | ✅ tutoring productizable |
| [DaRL-GenAI/instructional_agents](https://github.com/DaRL-GenAI/instructional_agents) | Apache-2.0 | Multi-agent ADDIE: genera materiales de curso end-to-end. EACL 2026. 5 roles + 4 modos de operación. | ~200 | ✅ automatización docente |
| [GeminiLight/awesome-ai-llm4education](https://github.com/GeminiLight/awesome-ai-llm4education) | MIT | Colección curada papers AI+LLM para educación. Knowledge tracing, tutoring agents, evaluación, generación. | 1.5k | ✅ research base |

## Por qué estos repos

### LMS Base (Moodle + Open edX)
Los dos LMS open-source más deployados del mundo. Moodle domina K-12 e institucional; Open edX domina MOOC y corporativo. APIs REST maduras, ecosistemas de plugins maduros. LATAM: UNAM, USP, UBA, UNAL ya los tienen.

### Knowledge Tracing (pyKT)
Toolkit estándar para modelar el conocimiento del estudiante: predice performance futura, detecta gaps, personaliza recomendaciones. MoC-KT + DenoiseKT (May-Jun 2026) son SOTA.

### Tutoring Systems (OATutor + Open TutorAI CE)
- OATutor: ITS clásico con BKT, production-ready, UC Berkeley.
- Open TutorAI CE: Moderno, multimodal, avatar-native — diferenciador visual.

### Automatización Docente (Instructional Agents)
Genera materiales completos: syllabus → slides → evaluaciones. EACL 2026 da credibilidad técnica.

### SIS (GibbonEdu)
Datos de asistencia, notas, scheduling — inputs para agentes de predicción de abandono.

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas. v6.*
