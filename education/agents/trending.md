# 📡 Trending This Week — Education AI

> Last updated: 2026-07-09 (v3)

## Breakout Repos (July 2026)

| Repo | Stars | What's happening |
|------|-------|-----------------|
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | 22k+ | Still hottest edu AI repo of 2026. Paper published arXiv:2604.26962. Math Animator + LightRAG integration live. 10k stars in 39 days from Dec 2025 launch. |
| [studyield/studyield](https://github.com/studyield/studyield) | 80+ | Growing steadily; teach-back evaluation becoming the de-facto OSS alternative to Quizlet. High fork velocity signals teams building on it. |
| [open-spaced-repetition/fsrs4anki](https://github.com/open-spaced-repetition/fsrs4anki) | 3.8k | FSRS-7 now default Anki algorithm. 10+ language ports (Python, Rust, Go, JS, Swift, Kotlin). Every new flashcard app shipping FSRS-first. |
| [microsoft/mcp-for-beginners](https://github.com/microsoft/mcp-for-beginners) | 10k+ | Open-source MCP curriculum exploding since Google Classroom MCP announcement. Reference for building EdTech tools on MCP standard. |
| [GeminiLight/awesome-ai-llm4education](https://github.com/GeminiLight/awesome-ai-llm4education) | 800+ | Most comprehensive academic survey of AI/LLM for education research. Key reference for anyone building edu AI. |
| [ai-infra-curriculum/ai-infra-engineer-learning](https://github.com/ai-infra-curriculum/ai-infra-engineer-learning) | 1.4k | AI infrastructure engineer curriculum; growing as enterprises invest in AI reskilling programs. Apache 2.0. |
| [Vacademy-io/vacademy_platform](https://github.com/Vacademy-io/vacademy_platform) | 20+ | Early-stage but full e-learning: content delivery, learner tracking, assessment. AGPL-3.0. Watch for growth. |
| [StudentTraineeCenter/edu-agent](https://github.com/StudentTraineeCenter/edu-agent) | 200+ | LangGraph ReAct + RAG active recall platform. Proactive card generation during tutoring sessions. Growing steadily. |
| [A-R007/Multi-Agent-Study-Assistant](https://github.com/A-R007/Multi-Agent-Study-Assistant) | 100+ | 6-agent Phidata study platform. Adaptive roadmaps + RAG Q&A. Built at Google × Kaggle Agents Intensive. |

## Key Signal: Google Classroom MCP Server (ISTE 2026)

**The biggest structural development in EdTech AI this month**: Google announced a Google Classroom MCP server at ISTE 2026, allowing external EdTech platforms to build secure connections to Classroom context. Simultaneously, Gemini LTI is launching for Moodle — bringing Gemini, NotebookLM, and AI Podcast Lessons directly into Moodle. This creates an open integration surface for AI agents to read/write Classroom data via standard protocols.

**Impact**: Any AI agent that implements MCP can now access Google Classroom context natively. Globant teams building on MCP should evaluate Google Classroom MCP immediately.

## Key Signal: Khan Academy + Microsoft Phi-3 Offline Tutoring

Khan Academy announced summer 2026 rollout of reimagined Khanmigo to all district partners. More significant for open-source: Khan Academy and Microsoft are exploring small language models (SLMs) based on the Phi-3 family that run **locally on device** — targeting resource-constrained schools with no cloud access. This validates the local-first AI tutoring architecture trend (Ollama + Phi-4 pattern).

**Contrasting signal**: A notable substack post "RIP Khanmigo" (Dan Meyer, 2026) signals growing skepticism about AI tutor business models — paid AI tutors struggling for adoption, while open-source alternatives thrive.

## Key Signal: EduBench Era — Pedagogical Quality Benchmarking

2026 is seeing the rise of education-specific LLM benchmarks that go beyond factual accuracy:
- **EduBench** (arXiv:2505.16160): K-12 to postgrad, 4 evaluation dimensions
- **EduGuardBench** (arXiv:2511.06890): Pedagogical fidelity AND adversarial safety testing
- **L2-Bench** (Oxford University Press): First benchmark for second-language AI tutoring
- **EduResearchBench** (arXiv:2602.15034): Full research lifecycle evaluation

Implication: "Does the AI get the right answer?" is no longer the bar. "Does the AI teach well, safely, and without bias?" is the new evaluation standard.

## Key Signal: AI Personalized Learning Market Explosion

The AI in personalized learning and education technology market is valued at **$9.15 billion in 2025** and is projected to reach **$291.85 billion by 2035** at a **41.5% CAGR** (InsightAce Analytic, 2026). This is the highest projected CAGR of any education technology segment.

**Evidence-backed outcomes** (2026):
- **42% improvement** in learning outcomes from AI adaptive systems
- **71% of higher education institutions** plan to deploy adaptive learning platforms by end 2026 (up from 34% in 2023)
- **83%** of institutions plan AI teaching assistant deployment by end of 2026
- **67%** of educators saving 10+ hours/week with AI tools

**Implication for Globant**: The market is at an inflection point. Clients investing in AI tutoring infrastructure now will capture the learning-outcomes premium. The 71% → adaptive learning stat is a powerful sales argument for any AI-in-EdTech engagement.

## Key Trends Driving Activity

1. **Teach-back evaluation** — forcing learners to explain concepts back to the AI proves more effective than passive quizzes. studyield pioneered this in OSS.
2. **FSRS algorithm adoption** — ML-based spaced repetition eating Leitner/SM-2. Every new flashcard/quiz app is FSRS-first.
3. **Local-first tutors** — Ollama + small models (Gemma 3, Phi-4, Qwen2.5) enabling offline/privacy-safe tutors for FERPA/GDPR/LGPD-constrained schools.
4. **MCP as EdTech integration layer** — Google Classroom MCP server and Gemini LTI for Moodle signal MCP becoming the standard way AI agents interact with LMS platforms.
5. **Kids AI platforms** — ai4kids and YC-backed children's AI education apps; parents/schools demanding age-appropriate alternatives to ChatGPT.
6. **Pedagogical benchmarking** — EduBench, EduGuardBench, L2-Bench establishing quality standards beyond factual accuracy.
7. **Active recall agents** — EduAgent + Multi-Agent-Study-Assistant demonstrate proactive quiz/flashcard generation as the next evolution beyond passive RAG chatbots.

## Repos to Watch (Next 30 Days)

- **Google Classroom MCP server** (Google) — watch for OSS release of the MCP server spec
- **Gemini LTI for Moodle** — Gemini + NotebookLM available directly in Moodle is a massive unlock
- **HKUDS/LightRAG** — the graph RAG engine powering DeepTutor; standalone use in edu apps growing
- **Pedagogy Benchmark (AI-for-Education)** — standardising pedagogical quality evaluation

---
*Pipeline: auto-updated hourly.*
