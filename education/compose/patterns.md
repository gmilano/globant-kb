# 🧩 Composition Patterns — Education AI

> Concrete recipes: named repos + agents + wiring code.
> Last updated: 2026-07-08

## Architecture Baseline

```
[LMS / ERP (Open edX / Moodle / Frappe)]
              ↓ LTI 1.3 / REST API / Webhook
[AI Orchestration Layer (LangGraph / CrewAI)]
              ↓
[Specialised Edu Agents]          [Knowledge Store]
  ├── Tutor Agent (DeepTutor)       ├── Vector DB (Qdrant/ChromaDB)
  ├── Quiz Agent (studyield)        ├── Knowledge Graph (NetworkX)
  ├── Evaluator Agent               └── Course Content (PDF/SCORM)
  └── Planner Agent
              ↓
[Student Interface: Chat / Voice / Dashboard]
```

---

## Pattern 1: AI Tutor XBlock for Open edX

**Goal**: Drop an AI tutor into any Open edX course as an interactive activity.
**Stack**: Open edX + XBlock SDK + DeepTutor API + LangChain
**Time**: 2–3 weeks

```python
# my_ai_tutor/my_ai_tutor/xblock.py
import pkg_resources
from xblock.core import XBlock
from xblock.fields import String, Scope
from xblock.fragment import Fragment
from langchain_anthropic import ChatAnthropic
from langchain.memory import ConversationBufferMemory

class AITutorXBlock(XBlock):
    """AI Tutor embedded in Open edX course."""
    
    course_context = String(
        default="", scope=Scope.content,
        help="System context: what subject/chapter this tutor covers"
    )
    student_history = String(
        default="", scope=Scope.user_state,
        help="Student conversation history (JSON)"
    )
    
    def student_view(self, context=None):
        html = self.resource_string("static/html/tutor.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/tutor.css"))
        frag.add_javascript(self.resource_string("static/js/tutor.js"))
        frag.initialize_js('AITutorXBlock')
        return frag
    
    @XBlock.json_handler
    def ask_tutor(self, data, suffix=''):
        """Handle student question."""
        question = data.get("question", "")
        llm = ChatAnthropic(model="claude-sonnet-5", max_tokens=1024)
        
        system = f"""You are a Socratic tutor for: {self.course_context}
        Rules:
        - Never give direct answers; guide with questions and hints
        - If student is stuck after 3 hints, provide the answer with explanation
        - Always relate back to the learning objective
        """
        messages = [
            {"role": "system", "content": system},
            {"role": "user", "content": question}
        ]
        response = llm.invoke(messages)
        return {"response": response.content, "hint_level": 1}
    
    @staticmethod
    def workbench_scenarios():
        return [("AI Tutor", "<my_ai_tutor/>")]
```

```bash
# Installation
pip install -e ./my_ai_tutor
# Add to Open edX INSTALLED_APPS in lms/envs/common.py:
# 'my_ai_tutor'
# Register in XBLOCK_MIXINS and XBLOCK_SELECT_FUNCTION
tutor config save --set OPENEDX_EXTRA_PIP_REQUIREMENTS='["my-ai-tutor"]'
```

---

## Pattern 2: Multi-Agent Quiz Generator (Moodle + LangGraph)

**Goal**: Automatically generate, validate, and import quizzes into Moodle from course material.
**Stack**: Moodle Web Services + LangGraph + Claude claude-sonnet-5 + python-moodleapi
**Time**: 1–2 weeks

```python
# quiz_generator_agent.py
from langgraph.graph import StateGraph, END
from anthropic import Anthropic
from typing import TypedDict, List
import requests, json

client = Anthropic()

class QuizState(TypedDict):
    course_text: str
    raw_questions: List[dict]
    validated_questions: List[dict]
    moodle_import_xml: str

def generate_questions(state: QuizState) -> QuizState:
    """Agent 1: Generate draft questions from course content."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        messages=[{
            "role": "user",
            "content": f"""Generate 10 multiple-choice questions from this content.
Return JSON array: [{{"question": "...", "correct": "A", "options": {{"A": "...", "B": "...", "C": "...", "D": "..."}}}}]

CONTENT:
{state['course_text']}"""
        }]
    )
    questions = json.loads(response.content[0].text)
    return {**state, "raw_questions": questions}

def validate_questions(state: QuizState) -> QuizState:
    """Agent 2: Pedagogical validator — check difficulty, clarity, bias."""
    validation_prompt = f"""Review these quiz questions for:
1. Clarity (no ambiguous wording)
2. Bloom's taxonomy level distribution
3. No trick questions
4. Factual accuracy

Questions: {json.dumps(state['raw_questions'])}

Return only the validated questions (remove/fix problematic ones) as JSON array."""
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        messages=[{"role": "user", "content": validation_prompt}]
    )
    validated = json.loads(response.content[0].text)
    return {**state, "validated_questions": validated}

def export_to_moodle_xml(state: QuizState) -> QuizState:
    """Convert validated questions to Moodle XML Gift format."""
    xml_lines = ['<?xml version="1.0" encoding="UTF-8"?>\n<quiz>']
    for q in state['validated_questions']:
        xml_lines.append(f"""
  <question type="multichoice">
    <name><text>{q['question'][:50]}</text></name>
    <questiontext format="html"><text>{q['question']}</text></questiontext>
    <answer fraction="100"><text>{q['options'][q['correct']]}</text></answer>
    {''.join(f'<answer fraction="0"><text>{v}</text></answer>' for k, v in q['options'].items() if k != q['correct'])}
  </question>""")
    xml_lines.append('</quiz>')
    return {**state, "moodle_import_xml": '\n'.join(xml_lines)}

# Build LangGraph workflow
workflow = StateGraph(QuizState)
workflow.add_node("generate", generate_questions)
workflow.add_node("validate", validate_questions)
workflow.add_node("export", export_to_moodle_xml)
workflow.set_entry_point("generate")
workflow.add_edge("generate", "validate")
workflow.add_edge("validate", "export")
workflow.add_edge("export", END)
app = workflow.compile()

# Usage
result = app.invoke({
    "course_text": open("chapter3.txt").read(),
    "raw_questions": [], "validated_questions": [], "moodle_import_xml": ""
})
# Import result["moodle_import_xml"] via Moodle Admin → Import Questions
```

---

## Pattern 3: FSRS-Powered Adaptive Flashcard API

**Goal**: Add ML-based spaced repetition to any learning app using the FSRS algorithm.
**Stack**: fsrs4anki algorithm + FastAPI + SQLite/PostgreSQL
**Time**: 1 week

```python
# adaptive_review_api.py
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime, timedelta
import math

app = FastAPI(title="FSRS Adaptive Review API")

# Simplified FSRS-7 core parameters
FSRS_DEFAULTS = {"w": [0.40255, 1.18385, 3.1262, 15.4722, 7.2102, 0.56]}

def calculate_next_interval(stability: float, desired_retention: float = 0.9) -> int:
    """FSRS interval formula: I(r,S) = S/r * ln(r) ≈ S * 9 for 90% retention."""
    return max(1, round(stability * math.log(desired_retention) / math.log(0.9)))

def update_stability(old_s: float, difficulty: float, rating: int) -> float:
    """Update memory stability after review. Rating: 1=Again, 2=Hard, 3=Good, 4=Easy."""
    w = FSRS_DEFAULTS["w"]
    multipliers = {1: 0.4, 2: 0.65, 3: 1.0, 4: 1.3}
    return old_s * multipliers.get(rating, 1.0) * (1 + w[4] * (1 - difficulty))

class ReviewResult(BaseModel):
    card_id: str
    rating: int  # 1=Again, 2=Hard, 3=Good, 4=Easy
    current_stability: float = 1.0
    current_difficulty: float = 0.3

class ScheduleResponse(BaseModel):
    next_review: str
    interval_days: int
    new_stability: float
    retention_estimate: float

@app.post("/review", response_model=ScheduleResponse)
def schedule_next_review(result: ReviewResult):
    new_stability = update_stability(
        result.current_stability, result.current_difficulty, result.rating
    )
    interval = calculate_next_interval(new_stability)
    next_review = (datetime.utcnow() + timedelta(days=interval)).isoformat()
    return ScheduleResponse(
        next_review=next_review,
        interval_days=interval,
        new_stability=round(new_stability, 3),
        retention_estimate=round(0.9 ** (1 / max(interval, 1)), 3)
    )

@app.get("/due-cards/{student_id}")
def get_due_cards(student_id: str):
    """Return cards due for review today (implement DB lookup)."""
    # DB query: SELECT * FROM cards WHERE next_review <= NOW() AND student_id = ?
    return {"student_id": student_id, "due_count": 0, "cards": []}
```

---

## Pattern 4: AI Teaching Assistant for Corporate LMS (Frappe LMS)

**Goal**: AI assistant that answers HR/L&D questions, suggests courses, and generates learning paths.
**Stack**: Frappe LMS + CrewAI + RAG (Qdrant) + Anthropic
**Time**: 3–4 weeks

```python
# edu_crew.py
from crewai import Agent, Task, Crew
from crewai_tools import RagTool
from anthropic import Anthropic

# Initialize RAG tool with course catalog
course_rag = RagTool(
    config={"llm": {"provider": "anthropic", "config": {"model": "claude-sonnet-5"}},
            "embedder": {"provider": "openai", "config": {"model": "text-embedding-3-small"}}},
    description="Search the corporate course catalog and learning resources"
)

# Agent 1: Skills Gap Analyser
skills_analyser = Agent(
    role="Skills Gap Analyser",
    goal="Identify skill gaps between employee current skills and role requirements",
    backstory="Expert in competency frameworks and L&D strategy. You map job descriptions to skill taxonomies.",
    tools=[course_rag],
    llm="claude-sonnet-5",
    verbose=True
)

# Agent 2: Learning Path Designer
path_designer = Agent(
    role="Learning Path Designer",
    goal="Design a personalised 30/60/90-day learning path to close identified skill gaps",
    backstory="Instructional designer with expertise in adult learning theory, microlearning, and ADDIE model.",
    tools=[course_rag],
    llm="claude-sonnet-5",
    verbose=True
)

# Agent 3: Progress Coach
progress_coach = Agent(
    role="Learning Progress Coach",
    goal="Check in on learner progress and adjust the learning path based on completion and assessment scores",
    backstory="Supportive coach who motivates learners and adapts plans based on real progress data.",
    tools=[course_rag],
    llm="claude-haiku-4-5-20251001",  # cheaper for frequent check-ins
    verbose=True
)

def create_learning_plan(employee_profile: dict) -> str:
    gap_analysis_task = Task(
        description=f"""Analyse skill gaps for:
        Role: {employee_profile['role']}
        Current skills: {employee_profile['current_skills']}
        Career goal: {employee_profile['career_goal']}
        
        Identify top 5 skill gaps with priority ranking.""",
        agent=skills_analyser,
        expected_output="Prioritised list of 5 skill gaps with rationale"
    )
    
    path_task = Task(
        description="""Design a 90-day learning plan with:
        - Week-by-week course recommendations from our catalog
        - Mix of video (60%), practice (30%), assessment (10%)
        - Estimated time commitment per week
        - Success metrics""",
        agent=path_designer,
        expected_output="Structured 90-day learning plan with course links and weekly schedule",
        context=[gap_analysis_task]
    )
    
    crew = Crew(
        agents=[skills_analyser, path_designer],
        tasks=[gap_analysis_task, path_task],
        verbose=True
    )
    return crew.kickoff()

# Example usage
plan = create_learning_plan({
    "role": "Senior Data Engineer → ML Engineer",
    "current_skills": ["Python", "SQL", "Spark", "dbt"],
    "career_goal": "ML Engineer with LLMOps specialisation"
})
```

---

## Pattern 5: LTI 1.3 AI Assessment Tool (Works with Any LMS)

**Goal**: AI-powered essay grader + teach-back assessor as a plug-and-play LTI tool.
**Stack**: FastAPI + PyLTI1p3 + Anthropic + any LMS (Moodle/Canvas/Open edX)
**Time**: 2 weeks

```python
# lti_assessor.py — FastAPI LTI 1.3 Provider
from fastapi import FastAPI, Request
from pylti1p3.contrib.fastapi import FastApiOIDCLogin, FastApiMessageLaunch
from anthropic import Anthropic
from pydantic import BaseModel

app = FastAPI(title="AI Assessment LTI Tool")
client = Anthropic()

class AssessmentRequest(BaseModel):
    student_answer: str
    rubric: str
    learning_objective: str
    mode: str = "essay"  # "essay" | "teach_back" | "code"

@app.post("/assess")
async def assess_student_work(req: AssessmentRequest):
    """Multi-mode AI assessment: essay, teach-back, or code."""
    
    if req.mode == "teach_back":
        prompt = f"""You are an educational assessor using teach-back evaluation.
The student was asked to explain: {req.learning_objective}

Student explanation: {req.student_answer}

Assess:
1. Conceptual accuracy (0-10)
2. Completeness (0-10)  
3. Use of examples (0-10)
4. Identify misconceptions
5. Provide specific, constructive feedback (3-5 sentences)
6. Follow-up question to deepen understanding

Return JSON: {{"accuracy": N, "completeness": N, "examples": N, "misconceptions": [], "feedback": "...", "follow_up": "..."}}"""
    else:  # essay mode
        prompt = f"""Grade this student essay according to the rubric.

LEARNING OBJECTIVE: {req.learning_objective}
RUBRIC: {req.rubric}

STUDENT ANSWER: {req.student_answer}

Return JSON: {{"score": N, "max_score": 10, "strengths": [], "improvements": [], "feedback": "...", "grade": "A/B/C/D/F"}}"""
    
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # fast + cheap for high-volume grading
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    import json
    return json.loads(response.content[0].text)

# LTI Launch endpoint (connects to Moodle/Canvas grade passback)
@app.get("/lti/launch")
async def lti_launch(request: Request):
    """Handle LTI 1.3 launch from LMS."""
    # PyLTI1p3 handles OIDC flow, grade passback (AGS), deep linking
    # Full implementation: https://github.com/dmitry-viskov/pylti1.3
    pass
```

---

## Pattern 6: Local-First Privacy AI Tutor (FERPA/LGPD-Compliant)

**Goal**: Fully offline AI tutor for schools that cannot use cloud AI due to privacy regulations.
**Stack**: Ollama + Phi-4 or Gemma 3 + Open-TutorAI CE + FastAPI
**Time**: 1–2 weeks (hardware + software setup)

```yaml
# docker-compose.yml — Local AI Tutor Stack
version: '3.8'
services:
  ollama:
    image: ollama/ollama:latest
    volumes:
      - ollama_data:/root/.ollama
    ports:
      - "11434:11434"
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]  # Optional: GPU acceleration

  tutor_api:
    image: python:3.12-slim
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
      - MODEL_NAME=phi4:latest  # 14B params, strong at reasoning
      - DATA_DIR=/data/student_data  # All data stays local
    volumes:
      - ./tutor:/app
      - student_data:/data/student_data
    command: uvicorn app.main:app --host 0.0.0.0 --port 8080

  open_tutor_frontend:
    # Open-TutorAI CE — fork and point to local Ollama
    build: ./open-tutor-ai-CE
    environment:
      - NEXT_PUBLIC_API_URL=http://tutor_api:8080
      - OLLAMA_ENDPOINT=http://ollama:11434
    ports:
      - "3000:3000"

volumes:
  ollama_data:
  student_data:
```

```bash
# Setup (run once)
docker compose up -d
docker exec ollama ollama pull phi4:latest        # 8GB download
docker exec ollama ollama pull nomic-embed-text   # embeddings for RAG

# Load course materials into local RAG
curl -X POST http://localhost:8080/ingest \
  -F "file=@course_materials.pdf" \
  -F "course_id=math101"

# Student access: http://localhost:3000
# All data stays on premises — FERPA/LGPD compliant
```

---

## Pattern 7: Student Performance Dashboard (Multi-Agent Analytics)

**Goal**: Multi-agent system that reads LMS data and generates personalised intervention recommendations for teachers.
**Stack**: Moodle Web Services + LangGraph + Google ADK / CrewAI + Anthropic
**Time**: 3–4 weeks

```python
# performance_dashboard_agents.py
from langgraph.graph import StateGraph, END
from anthropic import Anthropic
import requests
from typing import TypedDict, List

client = Anthropic()
MOODLE_URL = "https://your-moodle.edu"
MOODLE_TOKEN = "your_moodle_token"

class StudentAnalyticsState(TypedDict):
    course_id: int
    students: List[dict]
    grade_data: List[dict]
    activity_data: List[dict]
    at_risk_students: List[dict]
    interventions: List[dict]

def fetch_grade_data(state: StudentAnalyticsState) -> StudentAnalyticsState:
    """Fetch grades from Moodle Web Services API."""
    resp = requests.get(
        f"{MOODLE_URL}/webservice/rest/server.php",
        params={
            "wstoken": MOODLE_TOKEN,
            "wsfunction": "gradereport_user_get_grade_items",
            "moodlewsrestformat": "json",
            "courseid": state["course_id"]
        }
    )
    return {**state, "grade_data": resp.json().get("usergrades", [])}

def identify_at_risk(state: StudentAnalyticsState) -> StudentAnalyticsState:
    """AI agent identifies at-risk students from grade patterns."""
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=2048,
        messages=[{
            "role": "user",
            "content": f"""Identify at-risk students from this grade data.
At-risk criteria: grade < 60%, declining trend, missing 2+ assignments.

Grade data: {state['grade_data'][:20]}  # limit context

Return JSON: [{{"student_id": "...", "name": "...", "risk_level": "high/medium", "reason": "...", "grade_trend": "..."}}]"""
        }]
    )
    import json
    at_risk = json.loads(response.content[0].text)
    return {**state, "at_risk_students": at_risk}

def generate_interventions(state: StudentAnalyticsState) -> StudentAnalyticsState:
    """Generate personalised intervention recommendations per student."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=3000,
        messages=[{
            "role": "user",
            "content": f"""Generate specific, actionable interventions for each at-risk student.
For each student provide:
1. Immediate action (this week)
2. Medium-term support (this month)  
3. Resource recommendations (specific materials/activities)
4. Parent/guardian communication script

At-risk students: {state['at_risk_students']}

Return JSON array with detailed intervention plans."""
        }]
    )
    import json
    interventions = json.loads(response.content[0].text)
    return {**state, "interventions": interventions}

# Build workflow
workflow = StateGraph(StudentAnalyticsState)
workflow.add_node("fetch_grades", fetch_grade_data)
workflow.add_node("identify_risk", identify_at_risk)
workflow.add_node("generate_interventions", generate_interventions)
workflow.set_entry_point("fetch_grades")
workflow.add_edge("fetch_grades", "identify_risk")
workflow.add_edge("identify_risk", "generate_interventions")
workflow.add_edge("generate_interventions", END)

analytics_app = workflow.compile()

# Run weekly (cron)
result = analytics_app.invoke({"course_id": 123, "students": [], "grade_data": [],
                                "activity_data": [], "at_risk_students": [], "interventions": []})
```

---

## Pattern 8: WhatsApp AI Tutor for LATAM

**Goal**: AI tutor accessible via WhatsApp — critical for LATAM markets where WhatsApp is dominant.
**Stack**: WhatsApp Business API (Meta) + FastAPI + Anthropic + Qdrant RAG
**Time**: 2–3 weeks

```python
# whatsapp_tutor.py
from fastapi import FastAPI, Request
from anthropic import Anthropic
import httpx, json, os

app = FastAPI(title="WhatsApp AI Tutor")
client = Anthropic()

WHATSAPP_TOKEN = os.getenv("WHATSAPP_ACCESS_TOKEN")
PHONE_ID = os.getenv("WHATSAPP_PHONE_ID")

# Simple in-memory session (use Redis in production)
sessions = {}

async def send_whatsapp_message(to: str, text: str):
    async with httpx.AsyncClient() as http:
        await http.post(
            f"https://graph.facebook.com/v20.0/{PHONE_ID}/messages",
            headers={"Authorization": f"Bearer {WHATSAPP_TOKEN}"},
            json={
                "messaging_product": "whatsapp",
                "to": to,
                "type": "text",
                "text": {"body": text[:4000]}  # WhatsApp message limit
            }
        )

@app.post("/webhook")
async def whatsapp_webhook(request: Request):
    data = await request.json()
    
    # Parse incoming message
    entry = data.get("entry", [{}])[0]
    change = entry.get("changes", [{}])[0]
    message = change.get("value", {}).get("messages", [{}])[0]
    
    if not message:
        return {"status": "no_message"}
    
    phone = message["from"]
    text = message.get("text", {}).get("body", "")
    
    # Maintain conversation history per student
    if phone not in sessions:
        sessions[phone] = []
    
    sessions[phone].append({"role": "user", "content": text})
    
    # AI tutor response (in Spanish/Portuguese based on locale)
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # fast responses for chat
        max_tokens=512,
        system="""Eres un tutor de IA amigable y paciente. Responde en el mismo idioma que el estudiante (español o portugués).
        Reglas:
        - Usa el método socrático: guía con preguntas, no des respuestas directas
        - Respuestas cortas (máximo 3 párrafos) — esto es WhatsApp
        - Si el estudiante está muy perdido, ofrece 3 pistas graduales
        - Celebra el progreso con emojis apropiados 🎉
        """,
        messages=sessions[phone][-10:]  # last 10 turns
    )
    
    reply = response.content[0].text
    sessions[phone].append({"role": "assistant", "content": reply})
    
    await send_whatsapp_message(phone, reply)
    return {"status": "sent"}

@app.get("/webhook")
async def verify_webhook(request: Request):
    """WhatsApp webhook verification."""
    params = dict(request.query_params)
    if params.get("hub.verify_token") == os.getenv("VERIFY_TOKEN"):
        return int(params["hub.challenge"])
    return 403
```

```bash
# Quick deploy to Render/Railway (both free tier)
# Environment vars needed:
# WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_ID, VERIFY_TOKEN, ANTHROPIC_API_KEY

# Test locally with ngrok:
ngrok http 8000
# Set webhook URL in Meta Business Manager: https://<ngrok-url>/webhook
```

---

*See `verticals/solutions.md` for platform setup guides.*
