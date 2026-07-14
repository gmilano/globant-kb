# Composition Patterns — Education AI

> Concrete recipes: specific repos + agents + wiring instructions.
> Last updated: 2026-07-14 (v5)

## Architecture Blueprint

```
[Open LMS Base]             ← Moodle / Open edX / Canvas / Vacademy
        ↓ LTI 1.3 / REST API
[AI Middleware Layer]        ← FastAPI / LangGraph / CrewAI
        ↓
[Specialist Agents]          ← Tutoring / Assessment / Retention / Copilot
        ↓ student events
[Knowledge Tracing]          ← pyKT (DKT / AKT / MoC-KT)
        ↓ mastery scores
[Adaptive Sequencer]         ← Next-problem selection / difficulty control
        ↓
[LLM Backend]               ← Claude 3.7 / Llama 3.1-8B / Qwen2.5-VL (local)
```

---

## P1 — Adaptive ITS on Open edX

**Goal**: Add a full Intelligent Tutoring System to an existing Open edX platform.

**Stack**:
- **Base**: [openedx/openedx-platform](https://github.com/openedx/openedx-platform) via [overhangio/tutor](https://github.com/overhangio/tutor)
- **Knowledge Tracing**: [pykt-team/pykt-toolkit](https://github.com/pykt-team/pykt-toolkit) (AKT model, ASSISTments-pretrained)
- **Tutoring Agent**: [CAHLR/OATutor-LLM-Learner](https://github.com/CAHLR/OATutor-LLM-Learner) (BKT + LLM hints)
- **AI Extensions**: [openedx/openedx-ai-extensions](https://github.com/openedx/openedx-ai-extensions)
- **LLM**: Claude 3.7 Sonnet via Anthropic API (or Llama 3.1-8B via Ollama for on-prem)

**Wiring**:
```python
# 1. Deploy Tutor + openedx-ai-extensions plugin
tutor plugins install openedx-ai-extensions
tutor local launch

# 2. Configure AI provider in Open edX admin (AI subsystem)
# Settings → Plugins → openedx-ai-extensions → provider=anthropic, key=CLAUDE_API_KEY

# 3. Hook learner events to pyKT
from pykt.models import AKTNet
import json

def on_problem_submit(user_id, kc_id, correct):
    kt_model = AKTNet.load("akt-assistments.pt")
    mastery = kt_model.predict(user_id, kc_id, correct)
    next_problem = select_next_problem(mastery, threshold=0.85)
    return {"next_problem_id": next_problem, "mastery": mastery}

# 4. XBlock delivers LLM hint when student requests help
def get_hint(problem_id, student_attempt):
    response = claude.messages.create(
        model="claude-sonnet-5",
        messages=[{"role":"user","content":f"Student attempted: {student_attempt}. Give a Socratic hint, not the answer."}]
    )
    return response.content[0].text
```

**Estimated build**: 3-4 weeks (2 engineers + 1 ML engineer)

---

## P2 — Multi-Agent Tutoring on Moodle

**Goal**: Add a DeepTutor-style multi-agent tutoring system to Moodle, wired through the Moodle AI subsystem.

**Stack**:
- **Base**: [moodle/moodle](https://github.com/moodle/moodle) v4.5+ (tool_ai subsystem)
- **Agent Framework**: LangGraph (MIT) for multi-agent orchestration
- **Agents**: TutorAgent, QuizAgent, ExplainerAgent, AssessmentAgent
- **Reference Architecture**: [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) (agent skill pattern)
- **LLM**: Claude 3.7 Sonnet (tool_ai backend configuration)

**Wiring**:
```python
# LangGraph multi-agent graph for Moodle AI block
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated

class TutoringState(TypedDict):
    student_id: str
    course_id: str
    current_topic: str
    mastery_score: float
    conversation_history: list
    active_agent: str

def tutor_node(state: TutoringState):
    # Socratic dialogue — never give direct answers
    response = claude.messages.create(
        model="claude-sonnet-5",
        system="You are a Socratic tutor. Guide with questions, never give answers directly.",
        messages=state["conversation_history"]
    )
    return {"conversation_history": state["conversation_history"] + [response]}

def quiz_node(state: TutoringState):
    # Generate formative quiz from current topic
    questions = generate_quiz(state["current_topic"], n=3, difficulty=state["mastery_score"])
    return {"quiz_items": questions}

def assessment_node(state: TutoringState):
    # Evaluate mastery from quiz performance
    mastery = evaluate_mastery(state["quiz_items"], state["quiz_responses"])
    return {"mastery_score": mastery}

def router(state: TutoringState):
    if state["mastery_score"] < 0.6:
        return "tutor"  # More tutoring
    elif state["mastery_score"] < 0.85:
        return "quiz"   # Formative quiz
    else:
        return END      # Mastered — advance topic

graph = StateGraph(TutoringState)
graph.add_node("tutor", tutor_node)
graph.add_node("quiz", quiz_node)
graph.add_node("assessment", assessment_node)
graph.add_conditional_edges("assessment", router)
graph.set_entry_point("tutor")
```

**Moodle Integration**: Deploy as Moodle block plugin calling this LangGraph service via REST.

**Estimated build**: 4-5 weeks (2 engineers + Moodle specialist)

---

## P3 — Dropout Prediction Retention Agent

**Goal**: Real-time student dropout risk scoring with automated counselor alerts, built on LMS data.

**Stack**:
- **LMS Data Source**: Moodle / Open edX event logs (xAPI / Caliper / Moodle standard_log)
- **Knowledge Tracing**: [pykt-team/pykt-toolkit](https://github.com/pykt-team/pykt-toolkit) for mastery trajectory
- **ML Model**: scikit-learn GradientBoosting or XGBoost on engagement features (F1=0.895 baseline)
- **Agent**: LangGraph retention agent → drafts counselor outreach messages
- **Notification**: LMS messaging API or Slack/email

**Feature Engineering**:
```python
def compute_risk_features(student_id, lms_db, window_days=14):
    return {
        "login_frequency": count_logins(student_id, window_days),
        "assignment_completion_rate": assignments_done / assignments_due,
        "grade_trend": linear_trend(get_grades(student_id, window_days)),
        "forum_participation": count_forum_posts(student_id, window_days),
        "video_watch_pct": avg_video_completion(student_id, window_days),
        "days_since_last_access": days_since_login(student_id),
        "peer_interaction_score": peer_messages_sent(student_id, window_days),
    }

def retention_agent(student_id, risk_score):
    if risk_score > 0.7:
        # Draft personalized outreach for counselor review
        draft = claude.messages.create(
            model="claude-sonnet-5",
            system="You are a student success counselor. Draft a warm, non-alarming check-in email.",
            messages=[{"role":"user","content":f"Student {student_id} risk signals: {get_risk_summary(student_id)}"}]
        )
        # Queue for counselor review — never auto-send
        notify_counselor(student_id, draft.content[0].text, risk_score)
```

**Estimated build**: 2-3 weeks (1 ML engineer + 1 backend engineer)

---

## P4 — AI-Powered Instructor Copilot

**Goal**: Reduce instructor workload — quiz generation, rubric creation, grading assistance, student Q&A routing.

**Stack**:
- **Base**: Any LMS with LTI 1.3 (Moodle / Open edX / Canvas)
- **Agent Framework**: CrewAI v0.105 (role-based agents)
- **Agents**: ContentAgent (quiz/rubric gen), GradingAgent (auto-grade + explain), RoutingAgent (student Q&A)
- **LLM**: Claude 3.7 Sonnet

**CrewAI Setup**:
```python
from crewai import Agent, Task, Crew

content_agent = Agent(
    role="Instructional Designer",
    goal="Generate pedagogically sound quizzes, rubrics, and learning objectives from course material",
    backstory="Expert in Bloom's taxonomy and formative assessment design",
    llm="claude-sonnet-5"
)

grading_agent = Agent(
    role="Assessment Specialist",
    goal="Grade student submissions against rubric criteria; provide specific formative feedback",
    backstory="Expert in writing constructive, growth-oriented academic feedback",
    llm="claude-sonnet-5"
)

routing_agent = Agent(
    role="Teaching Assistant",
    goal="Answer Tier-1 student questions from course content; escalate Tier-2 to instructor",
    backstory="Knows the course syllabus, deadlines, and content structure intimately",
    llm="claude-sonnet-5"
)

# Quiz generation task
quiz_task = Task(
    description="Generate 5 multiple-choice questions at Bloom's Apply level for topic: {topic}",
    agent=content_agent,
    expected_output="JSON array of question objects with stem, options, correct_answer, explanation"
)

crew = Crew(agents=[content_agent, grading_agent, routing_agent], tasks=[quiz_task])
```

**Estimated build**: 3-4 weeks (2 engineers)

---

## P5 — Self-Hosted AI Tutoring (LATAM On-Premise)

**Goal**: Full AI tutoring stack for institutions with data residency requirements (LGPD, etc.) — no cloud LLM calls.

**Stack**:
- **LMS**: Moodle (GPL-3.0) + Tutor or Open edX local
- **LLM**: Llama 3.1-8B-Instruct via Ollama (Apache-2.0) — runs on single A10 GPU
- **Tutoring App**: [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) (BSD-3)
- **Knowledge Tracing**: [pykt-team/pykt-toolkit](https://github.com/pykt-team/pykt-toolkit) (MIT)
- **RAG**: LlamaIndex (MIT) over institution's course content
- **Infrastructure**: Docker Compose on-prem

**Deployment**:
```bash
# 1. Install Ollama and pull Llama 3.1-8B
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull llama3.1:8b

# 2. Configure Open TutorAI CE for local LLM
# docker-compose.yml → LLM_PROVIDER=ollama, OLLAMA_URL=http://ollama:11434

# 3. Index course content for RAG
python -c "
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
docs = SimpleDirectoryReader('/course-content').load_data()
index = VectorStoreIndex.from_documents(docs)
index.storage_context.persist('/index-store')
"

# 4. Wire pyKT for adaptive sequencing (fully local)
python train_kt.py --model dkt --dataset local_logs --output /models/kt_local.pt
```

**Cost**: ~$2,000/mo (A10 GPU cloud) or $15,000 capex (on-prem GPU server) for institution of 10k students.

**Estimated build**: 4-6 weeks (1 DevOps + 1 ML engineer + 1 backend)

---

## P6 — Corporate L&D Agentic Onboarding

**Goal**: Agentic onboarding system for enterprise clients — new hire personalized learning paths, compliance tracking, skills assessment.

**Stack**:
- **Base**: [Vacademy-io/vacademy_platform](https://github.com/Vacademy-io/vacademy_platform) (AGPL-3.0) or Open edX
- **Agent Framework**: LangGraph with HITL (Human-in-the-Loop) for manager approval gates
- **Agents**: OnboardingPlannerAgent, ContentCuratorAgent, AssessmentAgent, ComplianceAgent
- **LLM**: Claude 3.7 Sonnet

**Onboarding Flow**:
```python
# Day 1: Assess existing skills
skill_profile = assessment_agent.run(
    user_id=new_hire_id,
    role=job_description,
    assessment_type="diagnostic"
)

# Generate personalized 90-day path
learning_path = planner_agent.run(
    skill_gaps=skill_profile["gaps"],
    role_requirements=job_description,
    available_content=course_catalog,
    timeline_days=90
)

# Compliance modules: flag mandatory completions
compliance_tasks = compliance_agent.run(
    role=job_description,
    location=employee_location,
    regulations=["GDPR", "SOC2", "industry_reqs"]
)

# HITL: manager reviews and approves path before activation
manager_review_gate(learning_path, compliance_tasks, manager_id)
```

**Estimated build**: 5-6 weeks (2 engineers + product manager for L&D design)

---

## P7 — AI-Powered Flashcard + Spaced Repetition System

**Goal**: AI-generated study materials from course content with adaptive scheduling.

**Stack**:
- **Base**: [kirill-markin/flashcards-open-source-app](https://github.com/kirill-markin/flashcards-open-source-app) (MIT)
- **Content Generation**: Claude 3.7 Sonnet — extract key concepts → generate Q&A pairs
- **Scheduling**: SM-2 spaced repetition algorithm (built-in)
- **RAG**: LlamaIndex over course PDFs/slides

**Card Generation Pipeline**:
```python
def generate_cards_from_content(content_path: str, n_cards: int = 20):
    # Extract key concepts via LLM
    concepts = claude.messages.create(
        model="claude-sonnet-5",
        system="Extract the {n} most important concepts from this educational content. Output JSON.",
        messages=[{"role":"user","content": read_content(content_path)}]
    )
    
    # Generate Q&A pairs for each concept
    cards = []
    for concept in concepts:
        card = claude.messages.create(
            model="claude-sonnet-5",
            system="Create a Bloom's-level 'Remember/Understand' flashcard Q&A for this concept.",
            messages=[{"role":"user","content":concept}]
        )
        cards.append({"front": card.question, "back": card.answer, "tags": [concept]})
    
    return cards
```

**Estimated build**: 1-2 weeks (1 engineer — leverage existing flashcard app codebase)

---

## P8 — LATAM University AI Platform (End-to-End)

**Goal**: Full AI-augmented LMS deployment for a LATAM university with 20k+ students.

**Stack**:
- **LMS**: Open edX via Tutor (AGPL-3.0) — standard for LATAM national platforms
- **AI Layer**: openedx-ai-extensions (Apache-2.0) + custom XBlocks
- **Knowledge Tracing**: pyKT AKT model fine-tuned on local logs
- **Tutoring**: Multi-agent LangGraph tutor wired to course content via RAG
- **Retention**: Dropout prediction agent (P3 pattern) → counselor dashboard
- **LLM**: Hybrid — Claude API for connected users; Llama 3.1-8B local for offline/rural
- **Data Residency**: AWS LATAM regions (São Paulo, Santiago) or on-prem

**Architecture**:
```
[Open edX (Tutor)]
    ├─ AI Tutor XBlock → LangGraph multi-agent → Claude / Llama
    ├─ Assessment XBlock → auto-grading → formative feedback
    ├─ Retention Dashboard → pyKT mastery + dropout risk → counselor alerts  
    ├─ Instructor Copilot → quiz gen + rubric gen + Q&A routing
    └─ Analytics → xAPI → LRS (Learning Record Store) → BI dashboards
```

**Timeline**: 12-16 weeks (team of 5-6)
**Cost**: $150k-250k build + $30-50k/yr infra for 20k students

---

*Patterns reference real repos — verify licenses before commercial deployment.*
