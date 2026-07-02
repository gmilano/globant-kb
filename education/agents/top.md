# Top AI Agents & Tools — Education Industry

> Last updated: 2026-07-02 | Focus: MIT / Apache 2.0 licenses Globant can build on

## AI Agents Table

| # | Name | GitHub | License | Stars | Description |
|---|------|--------|---------|-------|-------------|
| 1 | **DeepTutor** | [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Apache 2.0 | 23k+ | Agent-native personalized tutoring workspace from HKU's Data Intelligence Lab; multi-agent system with persistent memory, proactive engagement, problem solving, quiz generation, research, and mastery practice; supports 30+ LLM providers (OpenAI, Anthropic, DeepSeek, Ollama) |
| 2 | **OATutor** | [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | MIT | 800+ | Open-source Adaptive Tutoring System from UC Berkeley; uses Bayesian Knowledge Tracing (BKT) to model student mastery; built in ReactJS with optional Firebase logging; production-proven in mathematics courses |
| 3 | **AnythingLLM** | [mintplex-labs/anything-llm](https://github.com/mintplex-labs/anything-llm) | MIT | 54k+ | All-in-one document-chat + RAG agent platform; multi-user, hyper-configurable, runs fully local; ideal for building private course material Q&A bots, student support agents, and institutional knowledge bases with zero cloud egress |
| 4 | **EduGPT** | [hqanhh/EduGPT](https://github.com/hqanhh/EduGPT) | MIT | 600+ | CAMEL-inspired dual-agent AI instructor using LangChain; two role-playing agents discuss and co-design a syllabus from learning outcomes, then one agent teaches the student step-by-step; pure Python, easily extended |
| 5 | **AI_Tutor** | [098765d/AI_Tutor](https://github.com/098765d/AI_Tutor) | MIT | 400+ | LLM + RAG-enhanced tutoring agent for university courses; ingests lecture slides and reading materials into a vector store, answers student questions with source citations; designed for offline / self-hosted deployments |
| 6 | **Automated-Essay-Grader** | [Hasif50/Automated-Essay-Grader](https://github.com/Hasif50/Automated-Essay-Grader) | MIT | 500+ | GPT-4 + LangChain AI essay grading tool; multi-criteria scoring (content, grammar, coherence, originality), real-time feedback, integrated plagiarism detection, and PDF report export; Streamlit UI; supports OpenAI, Azure AI, and Cohere backends |
| 7 | **openedx-ai-extensions** | [openedx/openedx-ai-extensions](https://github.com/openedx/openedx-ai-extensions) | Apache 2.0 | 300+ | Official Open edX plugin housing AI tools and helpers — content summarization, question generation, and learner feedback; integrates with the Open edX course platform used by 70M+ learners worldwide; actively maintained by the Open edX core team |
| 8 | **LocalAI** | [mudler/LocalAI](https://github.com/mudler/LocalAI) | MIT | 29k+ | Open-source AI engine that runs LLMs, vision, voice, and video models on any hardware with no GPU required; privacy-first (data never leaves infrastructure); ideal for K-12 and universities with strict data residency requirements |
| 9 | **GenMentor** | [GenMentor/GenMentor](https://github.com/HKU-MedAI/GenMentor) | Apache 2.0 | 250+ | Multi-agent framework for goal-oriented learning in Intelligent Tutoring Systems (ITS); accepted WWW 2025 Industry Track (Oral); decomposes learning goals, assigns sub-agents per concept, tracks mastery, and adapts difficulty dynamically |
| 10 | **CrewAI** | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52k+ | Role-based multi-agent orchestration used to compose education automation pipelines — curriculum design crews, assessment generation, student support routing; 5M+ monthly downloads; fastest-growing agent framework in production |

## Notes

- **Tutoring agents are the breakout category**: DeepTutor's explosive growth (0 → 23k stars in months) signals that AI tutoring agents are the #1 funded and adopted edu-AI category in 2026. Lead client proposals here.
- **RAG is the default architecture**: AnythingLLM, AI_Tutor, EduGPT all use RAG over course materials — this is now the standard pattern for education AI, not fine-tuning.
- **Offline-first matters**: K-12 and underserved markets require offline capability. LocalAI + OATutor can run with no internet connection — critical differentiator for global Globant clients.
- **Assessment is underserved**: Automated-Essay-Grader is one of few open-source tools in this space; strong opportunity for Globant to build proprietary value on top.
- **LMS integration is table stakes**: Any client with an existing LMS (Moodle, Open edX) expects AI agents to integrate via plugin, not replace the platform — use openedx-ai-extensions and Moodle AI connector as the integration layer.
- **License note**: Open edX platform is AGPLv3 (not commercially ideal) but its plugins (openedx-ai-extensions) are Apache 2.0. Moodle is GPL-3.0 — plugins inherit GPL. Check with Globant legal when distributing Moodle plugins.
