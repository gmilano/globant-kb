# 🧩 Composition Patterns — Education AI

> Concrete recipes combining specific repos + agents + wiring instructions.
> Each pattern is buildable by a Globant team in the timeframe shown.
> Last updated: 2026-07-06 (second pass)

```
[Open Source LMS Platform]
          ↓
[AI Middleware Layer (LangChain / LangGraph / pyBKT / FSRS)]
          ↓
[Specialized Education Agents (Tutoring / Assessment / Analytics / Memory)]
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

## Pattern 7: FSRS-Powered AI Flashcard System (Memory Science + LLM)

**Goal**: Combine LLM-generated flashcards with scientifically optimal FSRS review scheduling. When a student learns a concept via AI tutor, automatically generate a flashcard and schedule reviews using the forgetting curve to maximize long-term retention.

**Stack**:
- **SRS Engine**: [open-spaced-repetition/fsrs4anki](https://github.com/open-spaced-repetition/fsrs4anki) Python port (MIT) for scheduling logic
- **Web SRS**: [open-spaced-repetition/fsrs.js](https://github.com/open-spaced-repetition/fsrs.js) (MIT) for browser-based review sessions
- **Card generation**: Claude Haiku — converts lecture segment or tutor explanation → front/back flashcard
- **LMS integration**: Open edX XBlock (Apache 2.0) or Moodle plugin
- **Storage**: PostgreSQL — card content + per-user FSRS state (stability, difficulty, due date)
- **UI**: React SPA embedded in XBlock or Moodle block

**Wiring**:
```python
from fsrs import FSRS, Card, Rating
import anthropic

# Step 1: LLM tutor explains concept → auto-generate flashcard
def generate_flashcard(concept_text: str) -> dict:
    client = anthropic.Anthropic()
    msg = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=256,
        messages=[{
            "role": "user",
            "content": f"Create a concise flashcard.\nCONTENT: {concept_text}\n"
                       f"Format exactly:\nFRONT: [one question]\nBACK: [concise answer, max 2 sentences]"
        }]
    )
    lines = msg.content[0].text.strip().splitlines()
    return {
        "front": lines[0].replace("FRONT: ", ""),
        "back": lines[1].replace("BACK: ", "")
    }

# Step 2: FSRS schedules optimal review interval
def schedule_review(card_id: str, user_id: str, rating: Rating):
    f = FSRS()
    db_card = db.get_card(card_id, user_id)  # loads FSRS state from PostgreSQL
    fsrs_card, review_log = f.review_card(db_card.fsrs_state, rating)
    db.save_card_state(card_id, user_id, fsrs_card)  # next_due = fsrs_card.due
    return fsrs_card.due  # datetime of optimal next review

# Step 3: Daily review session — serve only due cards
def get_due_cards(user_id: str) -> list:
    return db.query(
        "SELECT * FROM cards WHERE user_id=? AND due <= NOW() ORDER BY due ASC",
        user_id
    )
```

**Estimated build**: 2-3 weeks (1 full-stack engineer)
**Value prop**: FSRS users retain material 2-4x longer than massed practice. Differentiator vs pure-LLM tutors — memory science backbone makes outcomes measurable and provable.

---

## Pattern 8: Offline-First AI Tutoring for Low-Connectivity Schools (Kolibri + On-Device LLM)

**Goal**: Deploy full AI tutoring in schools with no reliable internet. Everything runs on local hardware (Raspberry Pi 5 / refurbished laptop). Zero cloud dependency, zero student data exfiltration. For LATAM rural schools, refugee camps, and government data-sovereignty mandates.

**Stack**:
- **LMS**: [learningequality/kolibri](https://github.com/learningequality/kolibri) (MIT) — offline-first content delivery + Offline AI Phase 3 plugin framework
- **LLM runtime**: [Ollama](https://github.com/ollama/ollama) (MIT) — serves Llama 3.2 3B (Raspberry Pi) or Mistral 7B (NUC/laptop)
- **RAG store**: [FAISS](https://github.com/facebookresearch/faiss) (MIT) — indexes Kolibri channel content locally
- **Tutoring API**: FastAPI wrapper exposing `/ask` endpoint, called from Kolibri frontend plugin
- **SRS**: FSRS Python lib + SQLite — offline spaced repetition, no server needed
- **Sync**: Kolibri's built-in sync protocol — when internet available, sync progress data and optional model updates

**Hardware tiers**:
```
Minimum:    Raspberry Pi 5 (8GB RAM)      → Llama 3.2 3B (~2 tokens/sec, ~30 concurrent reads)
Standard:   Intel NUC / laptop (16GB RAM) → Mistral 7B (~5-8 tokens/sec, class of 20-30)
School srv: Ubuntu 22.04 (32GB RAM)       → Llama 3.1 13B (~12 tokens/sec, 30-50 concurrent)
```

**Deployment**:
```bash
# On school server / Raspberry Pi (Ubuntu 22.04 / Raspberry Pi OS)
pip install kolibri
kolibri start

# LLM runtime
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull llama3.2:3b   # 2GB, fits Raspberry Pi 5 8GB

# Index Kolibri content for RAG
python -m kolibri_ai_indexer \
  --channel-dir /var/kolibri/content/ \
  --faiss-index /var/kolibri/ai/index.faiss

# Start AI tutoring API
python -m kolibri_ai_api \
  --ollama-host http://localhost:11434 \
  --faiss-index /var/kolibri/ai/index.faiss \
  --port 8765

# Enable Kolibri AI plugin (adds AI chat to course pages)
kolibri plugin enable kolibri_ai_tutor
kolibri restart
```

**AI tutor conversation (Spanish, offline)**:
```
Student: "No entiendo la fotosíntesis"
Agent: [queries FAISS for relevant Kolibri content] →
       [Ollama Llama 3.2 generates explanation from local content] →
       "La fotosíntesis es el proceso por el cual las plantas producen
        su propio alimento usando luz solar, agua y CO₂...
        [FSRS schedules flashcard review in 3 days]"
```

**Estimated build**: 8-10 weeks (2 engineers + field deployment support)
**Value prop**: 220+ countries already use Kolibri. Adding AI tutoring reaches millions of students at $0/query after setup. Sells to USAID, World Bank, national MinEdu procurement — clients who explicitly require data sovereignty and offline capability.

---

## Quick-Start Matrix

| Pattern | LMS | Time | Team | Key Tech |
|---------|-----|------|------|----------|
| 1. Persistent AI Tutor (Open edX) | Open edX | 6-8 wks | 2 eng | LangGraph + Supabase + Claude |
| 2. BKT Adaptive Math (Moodle) | Moodle | 3-4 wks | 1 eng | OATutor + pyBKT + LangChain |
| 3. AI Course Factory | ClassroomIO/edX | 4-5 wks | 2 eng | CrewAI + Claude + H5P + Whisper |
| 4. Dropout EWS | Moodle | 5-6 wks | 1 DS + 1 eng | XGBoost + SHAP + Moodle logs |
| 5. Sovereign AI Stack | Open edX | 8-10 wks | 2 eng + DevOps | Ollama + FAISS + pyBKT |
| 6. WhatsApp Study Agent | Any LMS | 3-4 wks | 1 eng | LangGraph + Claude Haiku + pyBKT |
| 7. FSRS Flashcard System | Moodle/edX | 2-3 wks | 1 eng | FSRS + Claude Haiku + PostgreSQL |
| 8. Offline AI (Kolibri) | Kolibri | 8-10 wks | 2 eng + field | Ollama + FAISS + Llama 3.2 3B |

*Each pattern can be adjusted in scope. Minimum viable version of any pattern: 1 sprint (2 weeks) for a demo, 4-8 weeks for production.*
