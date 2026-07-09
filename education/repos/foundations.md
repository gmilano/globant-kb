# 🏗️ Foundational Repos — Education

> Battle-tested open source bases to build on. Prioritising MIT / Apache 2.0 / BSD.
> Last updated: 2026-07-09 (v3)

## LMS Platforms

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [openedx/openedx-platform](https://github.com/openedx/openedx-platform) | AGPLv3 | 8.1k | The Open edX LMS & Studio — powers Harvard, MIT, Google, NASA. 100M+ learners. Python/Django + React. | Yes — XBlock API for custom AI components, Tutor plugins |
| [frappe/lms](https://github.com/frappe/lms) | AGPL-3.0 | 3k | Frappe Learning: 100% open-source course platform. Video, quizzes, assignments. Python/Vue. Note: AGPL-3.0 (not MIT). | Yes — REST API, Frappe hooks, extensible |
| [frappe/education](https://github.com/frappe/education) | GPLv3 | 563 | Full school/university ERP on Frappe: admissions, attendance, grades, fees, scheduling. | Yes — ERP + AI layer via Python hooks |
| [openedx/XBlock](https://github.com/openedx/XBlock) | Apache 2.0 | 468 | Framework for building custom learning components that run inside Open edX LMS. | Core AI integration point for Open edX |
| [openfun/richie](https://github.com/openfun/richie) | MIT | 311 | Django-based education portal CMS — course catalog, search, enrollment flows. France Université Numérique. | Yes — API-first, search AI ready |
| [chamilo/chamilo-lms](https://github.com/chamilo/chamilo-lms) | GPL v3 | 750+ | Leading LMS in LATAM (Spanish-speaking markets). 30M+ users. PHP. Strong in Argentina, Colombia, Mexico. | Plugin system, REST API |

## Intelligent Tutoring Systems

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Apache 2.0 | 22k+ | Agent-native tutoring workspace: 6 modes, GraphRAG (LightRAG), Math Animator. arXiv:2604.26962. | Yes — agent-native, API |
| [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | MIT | 219 | First fully open-source ITS with Bayesian Knowledge Tracing. ReactJS + Firebase. Berkeley CAHLR Lab. | Yes — core AI system |
| [studyield/studyield](https://github.com/studyield/studyield) | MIT | 80+ | Multi-agent AI learning: exam cloning, knowledge graphs, teach-back evaluation. Self-hosted, TypeScript. | Yes — multi-agent native |
| [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | BSD-3-Clause | 80+ | Local RAG tutoring (Ollama), avatar, voice, video. 173+ forks. FERPA/LGPD-safe local deployment. | Yes — fully AI-native, offline capable |

## Spaced Repetition & Memory

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [open-spaced-repetition/fsrs4anki](https://github.com/open-spaced-repetition/fsrs4anki) | MIT | 3.8k | FSRS-7 spaced repetition scheduler for Anki — default algorithm since 2025. Learns from individual review history. | Yes — ML scheduler |
| [open-spaced-repetition/awesome-fsrs](https://github.com/open-spaced-repetition/awesome-fsrs) | MIT | — | Curated list of FSRS implementations: Python, Rust, Go, JS, Swift, Kotlin, C#, Julia. | Reference, port to any stack |

## Evaluation & Benchmarking

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [EleutherAI/lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) | MIT | 9k+ | Standard framework for few-shot LLM evaluation (700+ tasks). Powers HELM, Open LLM Leaderboard. | Yes — eval backbone |
| EduBench (arXiv:2505.16160) | Academic | — | Benchmark for LLMs in diverse educational scenarios: K-12 to postgrad, 4 dimensions (subject, difficulty, language, type). | Reference benchmark |
| EduGuardBench (arXiv:2511.06890) | Academic | — | Pedagogical fidelity + adversarial safety evaluation of LLMs as simulated teachers. | Safety benchmark |
| L2-Bench (Oxford Univ. Press) | — | — | First LLM benchmark for second language (L2) education. Launched 2026. | Language learning eval |

## Active Recall & Agentic Learning

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [StudentTraineeCenter/edu-agent](https://github.com/StudentTraineeCenter/edu-agent) | MIT | 200+ | LangGraph ReAct agent + RAG: uploads course docs → auto-generates adaptive study plans, quizzes, flashcards, semantic mind maps. Proactive AI tutor. | Yes — LangGraph-native, highly composable |
| [A-R007/Multi-Agent-Study-Assistant](https://github.com/A-R007/Multi-Agent-Study-Assistant) | MIT | 100+ | 6 specialised Phidata agents: Skills Analyser, Roadmap Planner, Tutor, Quiz, RAG Q&A, Learning Style Adapter. Streamlit UI. | Yes — multi-agent Phidata |

## Content & Quiz Generation

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [ECuiDev/obsidian-quiz-generator](https://github.com/ECuiDev/obsidian-quiz-generator) | MIT | 200+ | Generates interactive flashcards/quizzes from Obsidian notes using OpenAI or local LLMs. | Yes — LLM-native |
| [jmshea/jupyterquiz](https://github.com/jmshea/jupyterquiz) | MIT | 166 | Interactive quiz widget for Jupyter notebooks. Embeds assessments in teaching materials. | Yes — notebook-native |

## Mobile Apps

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [moodlehq/moodleapp](https://github.com/moodlehq/moodleapp) | Apache 2.0 | 979 | Official Moodle mobile app (Ionic/Angular). Access to 400M+ user base via Moodle platform. | Via Moodle Web Services API |

## MCP & Integration

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [microsoft/mcp-for-beginners](https://github.com/microsoft/mcp-for-beginners) | MIT | 10k+ | Open-source MCP curriculum by Microsoft. Multi-language (Python, TypeScript, Java, .NET, Rust). Essential for building AI on MCP in EdTech. | Yes — MCP reference |
| Google Classroom MCP (Google, 2026) | TBD | — | Announced ISTE 2026: MCP server for Google Classroom context. Enables external AI tools to access Classroom data securely. | Yes — launch Q3 2026 |

## Research & Curation

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [GeminiLight/awesome-ai-llm4education](https://github.com/GeminiLight/awesome-ai-llm4education) | MIT | 800+ | Curated academic papers: intelligent tutoring, automatic grading, question generation, knowledge tracing, dialogue systems. |
| [Geralt-Targaryen/Awesome-Education-LLM](https://github.com/Geralt-Targaryen/Awesome-Education-LLM) | MIT | 400+ | Another curated list of LLM research and applications in education. Focus on STEM tutoring and assessment. |

---
*See `verticals/solutions.md` for complete vertical platforms.*
