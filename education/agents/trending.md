# 📡 Agentes trending — Education

> Señales frescas esta semana. Última actualización: 2026-07-10

## Señales de la semana (S1–S8)

### S1 — DeepTutor v1.0 GA: el tutor agentico open source de referencia (Apache-2.0, 23.7k★)
**repo**: https://github.com/HKUDS/DeepTutor  
**señal**: In April 2026, HKUDS (Data Intelligence Lab @ HKU) released DeepTutor v1.0 — a complete ground-up rewrite spanning 200k lines of code. Support for 30+ LLM providers (Claude, GPT-4o, Gemini, Ollama local). Dual-loop reasoning: outer loop adapts to the learner's evolving knowledge state; inner loop generates personalized explanations, exercises, and visual aids. Self-hostable via Docker Compose. 23.7k GitHub stars.

**Por qué importa para Globant**: Most robust open-source AI tutor in 2026. Directly forkable and deployable on top of edX/Moodle content. White-label or customize for enterprise training clients in LATAM.

---

### S2 — LectūraAgents: enseñanza encarnada multi-agente (arXiv:2606.16428, Jun 2026)
**arxiv**: https://arxiv.org/abs/2606.16428  
**señal**: ProfessorAgent leads a hierarchical team of subordinate agents (Research, Planning, Review) for end-to-end personalized lecture generation. TASA algorithm (Teaching Action-Speech Alignment) uses salience-based heuristics and temporal semantic segmentation to synchronize handwriting, highlighting, and underlining actions with the avatar teacher's speech. Evaluated across high school, undergraduate, and graduate levels by expert educators.

**Por qué importa**: First framework to bring "embodied AI teacher" actions to multi-agent education. Enables avatar-based AI lectures for async courses — replaces expensive video production. Composable with D-ID or HeyGen for avatar rendering.

---

### S3 — Open TutorAI CE: plataforma de tutoring LLM-native (Apache-2.0)
**repo**: https://github.com/Open-TutorAi/open-tutor-ai-CE  
**paper**: https://arxiv.org/abs/2602.07176  
**señal**: arXiv paper published Feb 2026 describing the full architecture. Community Edition now actively maintained. Features: RAG over course PDFs, adaptive hint generation, student progress tracking. Designed as a drop-in tutoring layer on top of any LMS.

**Por qué importa**: Full data ownership alternative to Khanmigo. Directly integrable with Open edX or Moodle.

---

### S4 — Microsoft Moodle AI Assistant: accelerator de producción (MIT)
**repo**: https://github.com/microsoft/moodle-ai-assistant  
**señal**: Microsoft open-sourced a production-oriented Moodle AI Agent accelerator. RAG over course materials, FAQ agent, grading assistant. Configurable for Claude or local models (not tied to Azure). Updated May 2026.

**Por qué importa**: Fastest path to "AI copilot on existing Moodle" for K-12 / university clients. MIT license — no restrictions. Globant can take this and customize without re-architecting.

---

### S5 — openedx-ai-extensions: plugin AI oficial de Open edX (Apache-2.0)
**repo**: https://github.com/openedx/openedx-ai-extensions  
**señal**: Official experimental plugin for Open edX; modular architecture allows swapping AI providers (OpenAI, Claude, Cohere). Features include grading hooks, recommendation engine slots, student-support chatbot entry points. Updated Jun 2026.

**Por qué importa**: Safe extensibility point — won't break with Open edX upstream updates. The right architectural layer for production edX deployments.

---

### S6 — GenAI EdTech breakout: $0.76B (2026) → $3.22B (2030), CAGR 43.6%
**fuente**: The Business Research Company / GlobeNewswire Jul 8 2026  
**señal**: Generative AI in EdTech is the fastest-growing AI vertical by percentage. 86% of education organizations now use GenAI — the highest adoption rate of any industry (Microsoft Education Report 2025). Driven by virtual tutors, adaptive content, and automated grading.

**Por qué importa**: Window is open NOW. Education clients already have budget and institutional mandate. First-mover integrators capture the market.

---

### S7 — LATAM education AI acceleration: Google.org $4.6M + 30k survey respondents
**fuente**: EdTech Innovation Hub / Digital Education Council AI in Higher Education LATAM Survey 2026  
**señal**: Google.org invested $4.6M specifically in AI education across Latin America (teacher training + 1.25M students). The Digital Education Council LATAM AI Survey 2026 gathered 30k+ responses from 29 higher education institutions across the region. LATAM AI in Education market: ~$420M (2026) → $1.5B by 2030 at 32.4% CAGR.

**Por qué importa**: Globant has deep LATAM roots. EdTech AI is exploding in the region with real institutional demand and fresh capital flows.

---

### S8 — Agentic campus: el agente inicia, el estudiante responde
**fuente**: UPCEA "Rise of the Agentic AI University 2026" / 8allocate.com / Gartner  
**señal**: Universities moving from reactive chatbots to proactive agentic systems. By end 2026: 40% of enterprise applications embed task-specific AI agents. In education specifically, 80% of routine tasks (grading, basic explanations, progress tracking) handled by agents. The agent now detects at-risk students, sends personalized nudges, schedules tutoring sessions, and adjusts curricula — all without the student initiating anything.

**Por qué importa**: Biggest design shift in EdTech since MOOCs. Requires multi-agent orchestration (LangGraph / CrewAI), persistent student state, and observability pipelines — all Globant strengths.

---
*Señales actualizadas semanalmente por el pipeline de ingest.*
