# 🎯 Agentes AI — Education

> Agentes y herramientas AI open source para la industria educativa. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-12

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [DeepTutor](https://github.com/HKUDS/DeepTutor) | Apache-2.0 | Agent-native learning workspace (HKUDS / U. Hong Kong): Chat, Quiz, Research, Visualize, Solve, Mastery Path en un único runtime. RAG multi-engine (LlamaIndex + LightRAG + GraphRAG + PageIndex), memoria 3 capas (traces→summaries→synthesis), MCP marketplace EduHub. FastAPI + Next.js. | ~28k |
| [Open-TutorAI CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | Apache-2.0 | Plataforma educativa colaborativa multi-agente: clonación de exámenes, resolución multi-agente, knowledge graphs, evaluación teach-back, 12 idiomas (ES-LA + PT-BR nativos), web + móvil. Paper ICLR 2025 workshop. | ~420 |
| [tutor-gpt](https://github.com/plastic-labs/tutor-gpt) | GPL-3.0 | Tutor AI con Theory-of-Mind (ToM) reasoning (Plastic Labs): modela el estado cognitivo del estudiante y actualiza sus propios prompts dinámicamente. TypeScript + Honcho memory layer. Soporte multi-asignatura. | ~904 |
| [OATutor](https://github.com/CAHLR/OATutor) | MIT | Open-source Adaptive Tutoring System (UC Berkeley, CAHLR): Bayesian Knowledge Tracing (BKT) para estimación de maestría, sin backend requerido — ReactJS + localForage + Firebase opcional. Section 508 accesible. | ~221 |
| [AITutorAgent](https://github.com/Ebimsv/AITutorAgent) | MIT | Sistema de tutoring construido con LangGraph: tutoriales estructurados, Q&A interactivo, evaluación de conocimiento — SQLite state persistence, interfaz Streamlit o CLI. | ~350 |
| [EduAgent](https://github.com/StudentTraineeCenter/edu-agent) | MIT | Plataforma LangGraph + RAG que transforma documentos estáticos en entornos de tutoring dinámico: study plans adaptativos, quizzes, flashcards, mind maps semánticos — principios de active recall. | ~180 |
| [Bloom](https://github.com/Li-Evan/Bloom) | MIT | Tutor privado basado en Bloom's 2-Sigma research: genera syllabus adaptativo, enseña con método socrático, ajusta la siguiente lección al nivel real del alumno. Claude Code skill + webapp self-hostable (中文优先). | ~196 |
| [adaptive-knowledge-graph](https://github.com/MysterionRise/adaptive-knowledge-graph) | MIT | Plataforma adaptativa privacy-first: Knowledge Graphs + LLMs locales + BKT/IRT. RAG con KG-enhanced retrieval y generación de assessments en tiempo real. Sin cloud requerido. | ~90 |
| [education-agent-skills](https://github.com/GarethManning/education-agent-skills) | MIT | 165 habilidades pedagógicas evidence-based para Claude, Codex, Hermes y cualquier herramienta Agent Skills-compatible. Scaffolding socrático, diseño de rúbricas, diferenciación UDL, análisis de misconceptions. | ~220 |
| [responsible-ai-tutor-k12](https://github.com/petetrujillo/responsible-ai-tutor-k12) | MIT | Tutor multi-agente governance-first para K-12: arquitectura RAG con control curricular estricto, FERPA-compliant, human-in-the-loop oversight. Python + Flask + Gemini. | ~60 |

---

## Notas de evaluación

- **DeepTutor** es el más completo y production-ready con 28k★: agente unificado con memoria L1/L2/L3, MCP servers, EduHub de community skills, Docker deploy. Arranque de proyecto enterprise-grade.
- **Open-TutorAI CE** es el más equipado para LATAM: multi-idioma (español + portugués), auto-hosted, exam cloning, arquitectura extensible.
- **tutor-gpt** sobresale con Theory-of-Mind: modela el estado cognitivo del estudiante — el enfoque más psicológicamente fundamentado del catálogo. 904★ con foco en literacy y multi-asignatura.
- **OATutor** + **Bloom** se complementan bien: OATutor para modelado BKT + Bloom para UX socrática conversacional.
- **education-agent-skills** es el puente más rápido para añadir pedagogía de calidad a cualquier agente existente sin construir desde cero — plug-and-play con Claude Code.
- **responsible-ai-tutor-k12**: único con FERPA compliance explícita — crítico para K-12 en EE.UU. y obligatorio bajo EU AI Act (agosto 2026 educational assessment = "high risk").
- **EduAgent** y **AITutorAgent**: los más accesibles para equipos nuevos en LangGraph — configuración mínima, resultados visibles en 1-2 días.

---
*Actualizado automáticamente por el pipeline de ingest.*
