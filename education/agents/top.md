# 🎯 AI Agents — Education

> Open source AI agents and tools for EdTech. Focus: MIT / Apache 2.0 / BSD.
> Last updated: 2026-07-09 (v4)

## Top AI Agents & Tools

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [DeepTutor](https://github.com/HKUDS/DeepTutor) | Apache 2.0 | 22k+ | Agent-native personalized tutoring from HKUST. 6 modes: Chat, Deep Solve, Quiz Generation, Deep Research, Math Animator, Visualize. Graph-enhanced RAG (LightRAG). Benchmarked on HLE, GPQA-Diamond, GAIA. arXiv:2604.26962 |
| [studyield](https://github.com/studyield/studyield) | MIT | 80+ | Self-hosted AI learning: exam cloning, multi-agent problem solving, knowledge graphs, teach-back evaluation. 12 languages, web + mobile. Pioneer of teach-back eval in OSS. |
| [Open-TutorAI CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | BSD-3-Clause | 80+ | Educational AI platform with local RAG (Ollama), adaptive tutoring, avatar/voice/video modes, web browsing, image generation. 173+ forks — high build-on velocity. |
| [OATutor](https://github.com/CAHLR/OATutor) | MIT | 219 | First fully open-source Intelligent Tutoring System. Bayesian Knowledge Tracing (BKT) for skill mastery estimation. ReactJS + Firebase. Berkeley CAHLR Lab. |
| [lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) | MIT | 9k+ | EleutherAI framework for standardised few-shot LLM evaluation. Powers Open LLM Leaderboard and HELM. Backbone for evaluating edu AI quality. |
| [AI_Tutor](https://github.com/098765d/AI_Tutor) | MIT | — | KG-RAG adaptive AI tutor: knowledge-graph-guided retrieval, DeepSeek-V3 backend, course-specific tutoring. IEEE ICEIT 2025 paper. |
| [fsrs4anki](https://github.com/open-spaced-repetition/fsrs4anki) | MIT | 3.8k | FSRS-7 custom scheduler for Anki — the new default ML-based spaced repetition algorithm since 2025. Ecosystem of 10+ language ports via awesome-fsrs. |
| [obsidian-quiz-generator](https://github.com/ECuiDev/obsidian-quiz-generator) | MIT | 200+ | Generates interactive flashcards/quizzes from Obsidian notes using OpenAI or local LLMs. Spaced-repetition ready. |
| [jupyterquiz](https://github.com/jmshea/jupyterquiz) | MIT | 166 | Interactive quiz generator for Jupyter notebooks and Jupyter Book — embeds assessments in teaching content. |
| [AI-for-Education](https://github.com/AI-for-Education) | Apache 2.0 | — | Collaborative org (Harvard, OpenAI, Gates Foundation) building AI tools for low/middle-income countries (LMICs). Pedagogy Benchmark, lesson-plan generators, teacher tools. |
| [microsoft/mcp-for-beginners](https://github.com/microsoft/mcp-for-beginners) | MIT | 10k+ | Open-source MCP curriculum by Microsoft: real-world examples in Python, TypeScript, Java, .NET, Rust. Practical guide for building edu AI tools on MCP standard. |
| [GeminiLight/awesome-ai-llm4education](https://github.com/GeminiLight/awesome-ai-llm4education) | MIT | 800+ | Curated list of AI/LLM for education papers: tutoring systems, automatic grading, question generation, knowledge tracing, dialogue systems. |
| [StudentTraineeCenter/edu-agent](https://github.com/StudentTraineeCenter/edu-agent) | MIT | 200+ | EduAgent: LangGraph ReAct agent + RAG converts static course docs into adaptive tutoring. Active recall: auto-generates study plans, quizzes, flashcards, semantic mind maps. Proactive tutor surfaces cards during conversation. |
| [A-R007/Multi-Agent-Study-Assistant](https://github.com/A-R007/Multi-Agent-Study-Assistant) | MIT | 100+ | 6-agent AI learning platform: Skills Analyser, Roadmap Planner, Tutor, Quiz, RAG Q&A, Learning Style Adapter. Built with Phidata + Streamlit + LangChain. |
| [LectūraAgents](https://arxiv.org/abs/2606.16428) | Research (Jun 2026) | — | Hierarchical multi-agent framework: ProfessorAgent leads specialized agents for research, planning, review, and embodied delivery. TASA algorithm aligns teaching actions (highlight, underline, handwrite) with speech for personalized instruction. State-of-the-art personalization gains. arXiv:2606.16428 |
| [ALIGNAgent](https://arxiv.org/abs/2601.15551) | Research (Jan 2026) | — | Adaptive Learner Intelligence for Gap Identification and Next-step guidance. Skill Gap Agent (concept-level diagnostic) + Recommender Agent (preference-aware). GPT-4o achieves 0.87–0.90 precision on CS student assessments. Florida Polytechnic. arXiv:2601.15551 |
| [AgentCAT](https://arxiv.org/abs/2606.21832) | Research (Jun 2026) | — | Multi-Agent LLM Computerized Adaptive Testing simulator. High-fidelity dynamic benchmarking environment for CAT — moves beyond static sequence prediction using LLM agents. arXiv:2606.21832 |

## Agent Categories

### Tutoring & Adaptive Learning
| Agent | Approach | Integration |
|-------|----------|-------------|
| DeepTutor | GraphRAG + multi-mode agent + Math Animator | API / self-hosted |
| OATutor | Bayesian Knowledge Tracing + LLM hints | Embed in any LMS |
| Open-TutorAI | Ollama local RAG + avatar/voice | Self-hosted |
| studyield | Multi-agent + teach-back evaluation | Self-hosted SaaS |

### Assessment & Quiz Generation
| Agent | Approach | Integration |
|-------|----------|-------------|
| obsidian-quiz-generator | LLM from notes | Obsidian plugin |
| jupyterquiz | Structured quiz in notebooks | Jupyter |
| studyield | Auto-quiz from any material | API |

### Evaluation & Benchmarking
| Agent | Approach | Integration |
|-------|----------|-------------|
| lm-evaluation-harness | Standardised LLM benchmarks (700+ tasks) | CLI / Python |
| fsrs4anki | ML-based spaced repetition scheduler | Anki / custom |

### Multi-Agent Active Learning
| Agent | Approach | Integration |
|-------|----------|-------------|
| EduAgent (StudentTraineeCenter) | LangGraph ReAct + RAG, proactive card generation | Self-hosted / API |
| Multi-Agent-Study-Assistant (A-R007) | 6 specialised Phidata agents + RAG | Streamlit UI / API |
| studyield | Multi-agent + teach-back evaluation | Self-hosted SaaS |

### Skill Gap Analysis & Learning Path Generation (NEW 2026)
| Agent | Approach | Integration |
|-------|----------|-------------|
| ALIGNAgent (arXiv:2601.15551) | Skill Gap Agent + Recommender Agent; quiz → proficiency → gap → resources | API / research reference |
| Multi-Agent-Study-Assistant (A-R007) | Skills Analyser → Roadmap Planner → Tutor | Streamlit UI / API |

### Embodied & Multimodal Teaching (NEW 2026)
| Agent | Approach | Integration |
|-------|----------|-------------|
| LectūraAgents (arXiv:2606.16428) | ProfessorAgent + TASA: aligns highlights/underlines with speech for personalized delivery | Research reference |
| DeepTutor Math Animator | Step-by-step animated math solutions via GraphRAG | API / self-hosted |

### Adaptive Assessment & Computerized Testing (NEW 2026)
| Agent | Approach | Integration |
|-------|----------|-------------|
| AgentCAT (arXiv:2606.21832) | Multi-Agent CAT simulation: dynamic item selection, LLM student simulation | Research reference |
| OATutor | Bayesian Knowledge Tracing real-time | Embed in LMS |

### MCP & Integration Layer
| Agent | Approach | Integration |
|-------|----------|-------------|
| Google Classroom MCP (Google, 2026) | MCP server for Classroom context | External EdTech platforms |
| microsoft/mcp-for-beginners | MCP curriculum + reference implementations | Any LMS via MCP |

## Education-Specific Benchmarks (2026)

| Benchmark | Source | Scope | Link |
|-----------|--------|-------|------|
| **EduBench** | arXiv:2505.16160 | K-12 to postgrad; 4 dimensions: subject, difficulty, language, question type | Comprehensive LLM eval in edu scenarios |
| **EduGuardBench** | arXiv:2511.06890 | Pedagogical fidelity + adversarial safety of LLMs as simulated teachers | Safety eval for edu AI |
| **EduResearchBench** | arXiv:2602.15034 | Full-lifecycle educational research (hierarchical atomic tasks) | Research AI quality |
| **L2-Bench** | Oxford University Press, 2026 | First benchmark for LLMs in second language (L2) education | Language learning AI |
| **DeepTutor benchmarks** | arXiv:2604.26962 | HLE, GPQA-Diamond, LiveBench, GAIA, AA-LCR | Agent problem-solving quality |

---
*Auto-updated by ingest pipeline.*
