# 📈 Trending Agents — Education

> What's moving fast this week. High-velocity repos and notable releases.
> Last updated: 2026-07-06

## Breaking: DeepTutor v1.0 — The Benchmark Shift (April 2026)

[**DeepTutor**](https://github.com/HKUDS/DeepTutor) crossed 22k GitHub stars and dropped v1.0 — a 200k+ line ground-up rewrite in April 2026. The University of Hong Kong team introduced:
- **Persistent TutorBots** that maintain evolving learner models across sessions (no more context resets)
- **Heartbeat system** — proactive study check-ins, reminders, habit formation
- **Multi-agent Book Engine** — teams of agents collaborate on a knowledge base built from uploaded documents
- **Agent-native CLI** — every KB, session, and TutorBot is one command away

This is the first truly agent-native ITS (Intelligent Tutoring System) at production scale. Fast-followers already building on it.

## SOLA Moodle Plugin — In Production (May 2026)

[**moodle-local_ai_course_assistant**](https://github.com/saylordotorg/moodle-local_ai_course_assistant) by Saylor.org shipped to 30-course production pilot in May 2026:
- Floating chat widget embedded in course pages
- Streaming responses via SSE (no waiting)
- Multi-provider: Claude, OpenAI, Ollama (self-hosted), MiniMax
- Role-based behavior (student vs instructor context)

This is the reference implementation for AI-in-Moodle in 2026.

## High-Momentum Repos This Week

| Repo | Stars (now) | Why it's moving |
|------|-------------|-----------------|
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | 22k+ | v1.0 complete rewrite; viral HN + Twitter coverage June 2026 |
| [plastic-labs/tutor-gpt](https://github.com/plastic-labs/tutor-gpt) | 650+ | Theory-of-Mind tutoring; cited in 3 NeurIPS 2025 papers |
| [pykt-team/pykt-toolkit](https://github.com/pykt-team/pykt-toolkit) | 620+ | Added 5 new KT model baselines + EDM 2026 dataset integrations |
| [Vacademy-io/vacademy_platform](https://github.com/Vacademy-io/vacademy_platform) | 350+ | New video assessment + AI quiz generation; AGPL-3.0 |
| [kirill-markin/flashcards-open-source-app](https://github.com/kirill-markin/flashcards-open-source-app) | 280+ | Spaced repetition + AI card improvement; iOS/Android/Web; MIT |
| [microsoft/moodle-ai-assistant](https://github.com/microsoft/moodle-ai-assistant) | 190+ | Microsoft-backed; official Moodle AI plugin; RAG pipeline built-in |
| [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | 320+ | Ollama-first; rising as privacy-safe Khanmigo alternative |

## Emerging Pattern: Open edX AI Plugins

Open edX XBlock ecosystem is seeing a surge in AI plugins. The [XBlock SDK](https://github.com/openedx/XBlock) makes it straightforward to embed AI tutoring, auto-grading, and adaptive problem selection directly into edX courses. Several universities (MIT OpenCourseWare, Africa Learning Exchange) are publishing their XBlock AI extensions in 2026.

## Research Turning Into Code

| Paper → Repo | What it does |
|---|---|
| StanBKT (arxiv 2605.23048) | Better BKT parameter estimation — pyBKT integration in progress |
| OpenTutorAI (arxiv 2602.07176) | Personalized + immersive LLM tutoring with AR hooks |
| FOKE (2025) | Knowledge Graph + Foundation Models for explainable edu AI |

---
*Pipeline updates every hour.*
