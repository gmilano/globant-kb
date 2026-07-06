# 🧩 Composition Patterns — Education AI

> Concrete recipes combining specific repos + agents + wiring instructions.
> Each pattern is buildable by a Globant team in the timeframe shown.
> Last updated: 2026-07-06

```
[Open Source LMS Platform]
          ↓
[AI Middleware Layer (LangChain / LangGraph / pyBKT)]
          ↓
[Specialized Education Agents (Tutoring / Assessment / Analytics)]
          ↓
[Student UI (Chat / XBlock / Moodle Plugin) + Admin Dashboard]
```

---

## Pattern 1: Persistent AI Tutor on Open edX (DeepTutor Architecture)

**Goal**: Deploy a persistent AI TutorBot that remembers each student across sessions, tracks mastery, sends proactive study nudges.

**Stack**:
- **LMS**: [Open edX + Tutor](https://github.com/overhangio/tutor) (AGPL 3.0) — base platform
- **XBlock**: [openedx/XBlock](https://github.com/openedx/XBlock) (Apache 2.0) — plugin framework
- **Orchestration**: [LangGraph](https://github.com/langchain-ai/langgraph) (MIT) — stateful multi-agent graph
- **Memory**: Supabase (PostgreSQL) — persistent student state, mastery vectors
- **LLM**: Anthropic Claude Sonnet (extended context, instruction-following) or Ollama local
- **Reference architecture**: [DeepTutor](https://github.com/HKUDS/DeepTutor) (Apache 2.0) — study its TutorBot + Heartbeat design

**Wiring**:
```python
# XBlock calls LangGraph agent with student_id + current_problem
# LangGraph fetches student history from Supabase (memory layer)
# BKT mastery scores from pyBKT inform problem difficulty selection
# Agent responds with explanation + next adaptive problem
# Heartbeat cron: daily LangGraph node checks inactive students → sends nudge via email/SMS
```

**Estimated build**: 6-8 weeks (2 engineers)
**Value prop**: Persistent tutor = 2-3x completion rate improvement over stateless chatbots

---

## Pattern 2: BKT Adaptive Math Tutor on Moodle (OATutor + pyBKT)

**Goal**: Add a mastery-based adaptive practice system to an existing Moodle installation. Students work through problems at their level — system adjusts difficulty as they demonstrate mastery.

**Stack**:
- **LMS**: [Moodle](https://github.com/moodle/moodle) (GPL 3.0) — existing client install
- **ITS**: [OATutor](https://github.com/CAHLR/OATutor) (MIT) — React SPA with BKT + 550+ math problems
- **KT Engine**: [pyBKT](https://github.com/CAHLR/pyBKT) (BSD 3-Clause) — student mastery model
- **LTI bridge**: OATutor LTI middleware — connects Moodle gradebook to OATutor sessions
- **AI Hints**: LangChain (MIT) + OpenAI/Claude — generates Socratic hints when student is stuck

**Wiring**:
```
1. Moodle activity → LTI 1.3 launch → OATutor SPA
2. Student answers → pyBKT.update(skill_id, correct) → mastery score
3. If mastery < threshold: select next problem from same skill
4. If stuck (3 wrong): LangChain generates Socratic hint from problem context
5. On mastery: OATutor returns grade → Moodle gradebook via LTI
```

**Estimated build**: 3-4 weeks (1 engineer, existing Moodle)
**Value prop**: 42% learning outcome improvement; replaces static homework with adaptive practice

---

## Pattern 3: AI Course Factory (Corporate L&D Accelerator)

**Goal**: Generate full course shells (outline → slides → video script → quiz → SCORM package) from a topic specification using AI. Reduce course production from 80 hours → 4 hours.

**Stack**:
- **LMS**: [ClassroomIO](https://github.com/classroomio/classroomio) (Apache 2.0) or Open edX
- **Content pipeline**: [LangChain](https://github.com/langchain-ai/langchain) (MIT) — document processing, generation
- **LLM**: Claude Opus (curriculum design) + Claude Sonnet (content generation)
- **Video**: Whisper (MIT) — transcript → slides; open TTS for voiceover
- **Interactives**: H5P (MIT) — quiz + interactive video packaging
- **SCORM output**: Open edX Studio API (Apache 2.0)

**Wiring**:
```
Input: topic + learning_objectives + target_audience + hours
  ↓
CrewAI agents:
  - Instructional Designer: outline → learning objectives per module
  - Content Writer: each module → explanatory text + examples
  - Quiz Generator: LLM generates 5 MCQ + 2 open-ended per module
  - SCORM Packager: assembles H5P units → SCORM 2004 zip
  ↓
Output: SCORM package → upload to ClassroomIO/Open edX in one click
```

**Estimated build**: 4-5 weeks (2 engineers)
**Value prop**: 95% cost reduction in course production; enable client L&D teams to self-serve

---

## Pattern 4: Dropout Early Warning System on Moodle

**Goal**: Predict at-risk students 3-4 weeks before likely dropout using LMS behavioral data. Surface intervention alerts to academic advisors.

**Stack**:
- **LMS**: [Moodle](https://github.com/moodle/moodle) (GPL 3.0) — xAPI/log data source
- **EWS Reference**: [dssg/student-early-warning](https://github.com/dssg/student-early-warning) (MIT) — feature engineering, model architecture
- **ML**: scikit-learn / XGBoost — gradient-boosted classifier on engagement features
- **Feature pipeline**: Python ETL reading Moodle `mdl_logstore_standard_log` + gradebook
- **Explainability**: SHAP values → "why this student is flagged" for counselors
- **UI**: Moodle plugin (`local_ews`) — counselor dashboard with risk scores + intervention checklist

**Key features to extract from Moodle logs**:
```python
features = [
    'days_since_last_login', 'assignment_submission_rate',
    'forum_post_count', 'quiz_average_score',
    'video_completion_rate', 'grade_trend_7d',
    'predicted_grade_gap'  # vs class average
]
```

**Estimated build**: 5-6 weeks (1 data scientist + 1 backend engineer)
**Value prop**: 15-25% dropout reduction; counselors reach the right student at the right time

---

## Pattern 5: Privacy-Safe Campus AI Stack (Sovereign EdTech)

**Goal**: Full AI tutoring + analytics stack deployed entirely on-premise. Zero student data leaves campus network. Required for EU/LATAM data privacy compliance.

**Stack**:
- **LMS**: [Open edX via Tutor](https://github.com/overhangio/tutor) (AGPL 3.0) — on-premise
- **LLM runtime**: [Ollama](https://github.com/ollama/ollama) (MIT) — serves Llama 3.1 70B / Mistral 7B locally
- **LLM router**: LiteLLM (MIT) — unified API proxy; swap models without code changes
- **Tutoring agent**: [Open-TutorAI-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) (MIT) — configured for Ollama backend
- **RAG store**: [FAISS](https://github.com/facebookresearch/faiss) (MIT) + LangChain — indexes course PDFs locally
- **KT model**: [pyBKT](https://github.com/CAHLR/pyBKT) (BSD 3-Clause) — mastery tracking, local PostgreSQL
- **Monitoring**: local Langfuse (MIT) — LLM observability, cost tracking

**Deployment**:
```yaml
# docker-compose on university servers
services:
  openedx: tutor local start
  ollama: ollama serve --model llama3.1:70b
  litellm: litellm --config litellm_config.yaml
  open-tutor-ai: docker run open-tutor-ai-ce --llm-backend=ollama
  faiss-rag: custom FastAPI + FAISS
  langfuse: langfuse/langfuse:latest
```

**Estimated build**: 8-10 weeks (2 engineers + 1 DevOps)
**Value prop**: GDPR/LGPD compliant; no API costs after setup (~$0.001/query vs $0.01-0.05 cloud); sells to EU/government accounts that block cloud AI

---

## Pattern 6: WhatsApp Study Companion (LATAM Student Retention)

**Goal**: Meet students where they are — WhatsApp is the primary communication platform in LATAM. Agent sends daily study reminders, answers subject questions, delivers adaptive micro-quizzes, tracks streaks.

**Stack**:
- **Messaging**: WhatsApp Business API (Meta) via Twilio or Green API
- **Orchestration**: [LangGraph](https://github.com/langchain-ai/langgraph) (MIT) — stateful conversation graph
- **LMS integration**: Moodle REST API or Open edX APIs — reads enrolled courses + grades
- **Mastery**: [pyBKT](https://github.com/CAHLR/pyBKT) (BSD 3-Clause) — skill mastery per student
- **LLM**: Anthropic Claude Haiku (fast, cheap, Spanish/Portuguese proficiency)
- **Memory**: Redis — student session state, last interaction, streak counter
- **RAG**: LangChain + FAISS over course textbook PDFs

**Conversation flow**:
```
7:00 AM: "Hola [name]! 🎓 Hoy te toca practicar Cálculo Integral.
          ¿Empezamos con 3 problemas rápidos? (5 min)"
  → Student: "sí"
  → Agent: delivers micro-quiz from pyBKT-selected problems
  → Correct: updates mastery, sends congratulation + next topic hint
  → Wrong: sends Socratic hint, retries with simpler variant
8:00 PM: "¿Estudiaste hoy? Llevas 5 días seguidos — ¡sigue así! 🔥"
```

**Estimated build**: 3-4 weeks (1 full-stack engineer)
**Value prop**: 30-40% improvement in daily study consistency; works on any phone without app install; perfect for LATAM market

---

*Each pattern can be adjusted in scope. Minimum viable version of any pattern: 1 sprint (2 weeks) for a demo, 4-8 weeks for production.*
