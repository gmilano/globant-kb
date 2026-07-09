# 🧩 Composition Patterns — Education AI

> Concrete recipes: named repos + agents + wiring code.
> Last updated: 2026-07-09 (v3)

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

## Pattern 9: Google Classroom MCP AI Tutor Agent (2026)

**Goal**: Build an AI tutoring agent that reads Google Classroom context (roster, assignments, grades) via MCP and delivers personalised help to students.
**Stack**: Google Classroom MCP server + LangGraph + Anthropic Claude + FastAPI
**Time**: 2–4 weeks
**Why now**: Google launched Classroom MCP at ISTE 2026 — first-mover opportunity before every vendor builds this.

```python
# classroom_mcp_tutor.py
# Uses MCP client to connect to Google Classroom MCP server (Google, 2026)
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent
from langchain_anthropic import ChatAnthropic
from typing import Any

# MCP client configuration for Google Classroom
MCP_CONFIG = {
    "classroom": {
        "url": "https://classroom.googleapis.com/mcp",  # Google Classroom MCP endpoint
        "transport": "streamable-http",
        "headers": {"Authorization": f"Bearer {GOOGLE_ACCESS_TOKEN}"}
    }
}

async def build_classroom_agent(student_id: str, course_id: str):
    """Build a LangGraph agent with Classroom context via MCP."""
    async with MultiServerMCPClient(MCP_CONFIG) as mcp_client:
        tools = mcp_client.get_tools()
        
        llm = ChatAnthropic(model="claude-haiku-4-5-20251001", max_tokens=1024)
        
        # React agent with Classroom MCP tools
        agent = create_react_agent(
            llm,
            tools,
            state_modifier=f"""You are a helpful AI tutor for student {student_id} in course {course_id}.
            
            Use the Google Classroom tools to:
            1. Check what assignments the student has due
            2. Look at their recent grades to identify weak areas
            3. Access course materials for context
            4. Provide targeted, personalised help
            
            Teaching style:
            - Socratic: guide with questions, don't give direct answers
            - Reference specific assignments/materials from their Classroom
            - Keep responses concise (this is embedded in a chat widget)
            """
        )
        
        return agent

async def tutor_chat(student_id: str, course_id: str, question: str) -> str:
    """Handle a student tutoring session with Classroom context."""
    agent = await build_classroom_agent(student_id, course_id)
    
    result = await agent.ainvoke({
        "messages": [{"role": "user", "content": question}]
    })
    
    return result["messages"][-1].content

# FastAPI endpoint for embedding in school portal
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Classroom MCP AI Tutor")

class TutorRequest(BaseModel):
    student_id: str
    course_id: str
    question: str
    google_token: str  # OAuth2 token from Google SSO

@app.post("/tutor/ask")
async def ask_tutor(req: TutorRequest):
    global GOOGLE_ACCESS_TOKEN
    GOOGLE_ACCESS_TOKEN = req.google_token
    
    response = await tutor_chat(req.student_id, req.course_id, req.question)
    return {"response": response, "student_id": req.student_id}
```

```bash
# Quick deploy — requires Google Workspace for Education account
pip install langchain-mcp-adapters langgraph langchain-anthropic fastapi uvicorn

# Environment variables
export ANTHROPIC_API_KEY=sk-...
export GOOGLE_OAUTH_CLIENT_ID=...

# Run
uvicorn classroom_mcp_tutor:app --host 0.0.0.0 --port 8080

# Integrate into any web portal with 3 lines of JS:
# const resp = await fetch('/tutor/ask', {method:'POST', body: JSON.stringify({
#   student_id: userId, course_id: courseId, question: userInput, google_token: gToken
# })})
```

**Effort**: 2–4 weeks. **Revenue**: $50k–$200k POC → $200k–$500k production  
**Who buys**: K-12 districts, universities using Google Workspace for Education  
**Differentiator**: First-mover on Google Classroom MCP; no vendor has this in LATAM yet.

---

## Pattern 10: Offline SLM Campus Tutor (No Cloud, LGPD/FERPA-Compliant)

**Goal**: Full AI tutoring system running entirely on-premises using small language models — for schools with LGPD/FERPA restrictions or no reliable internet.
**Stack**: Ollama + Phi-4 (14B) or Gemma 3 (12B) + Open-TutorAI CE + FastAPI + Qdrant (local vector DB)
**Time**: 2–3 weeks (software) + hardware procurement
**Inspired by**: Khan Academy + Microsoft Phi-3 SLM partnership for offline school deployment

```yaml
# docker-compose.yml — Complete offline AI tutor stack
# ALL data stays on school servers. Zero cloud dependency.
version: '3.8'

services:
  # Small Language Model server (Ollama)
  ollama:
    image: ollama/ollama:latest
    volumes:
      - ollama_models:/root/.ollama
    ports:
      - "11434:11434"
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]  # Optional: 4x faster with GPU
    restart: unless-stopped

  # Local vector database for RAG
  qdrant:
    image: qdrant/qdrant:latest
    volumes:
      - qdrant_data:/qdrant/storage
    ports:
      - "6333:6333"
    restart: unless-stopped

  # Tutor backend API
  tutor_api:
    build: ./tutor_api
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
      - QDRANT_URL=http://qdrant:6333
      - TUTOR_MODEL=phi4:latest        # 14B — best STEM reasoning in SLM range
      - EMBED_MODEL=nomic-embed-text    # 768-dim embeddings for RAG
      - STUDENT_DATA_DIR=/data/students # All data stays local
    volumes:
      - student_data:/data/students
      - course_content:/data/courses
    ports:
      - "8080:8080"
    depends_on: [ollama, qdrant]
    restart: unless-stopped

  # Open-TutorAI CE frontend (forked, configured for local Ollama)
  tutor_frontend:
    build: ./open-tutor-ai-CE  # Fork of github.com/Open-TutorAi/open-tutor-ai-CE
    environment:
      - NEXT_PUBLIC_API_URL=http://tutor_api:8080
      - NEXT_PUBLIC_OLLAMA_URL=http://ollama:11434
      - NEXT_PUBLIC_INSTITUTION_NAME="Escuela Nacional"
      - NEXT_PUBLIC_SUPPORTED_LANGUAGES=es,pt,en
    ports:
      - "3000:3000"
    depends_on: [tutor_api]
    restart: unless-stopped

volumes:
  ollama_models:
  qdrant_data:
  student_data:      # LGPD/FERPA: all student data in local volume
  course_content:
```

```python
# tutor_api/app/main.py — Socratic tutor using local Phi-4
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_qdrant import QdrantVectorStore
from langchain.chains import RetrievalQA
from langchain.prompts import ChatPromptTemplate
import os

app = FastAPI(title="Offline Campus AI Tutor")

OLLAMA_URL = os.getenv("OLLAMA_BASE_URL", "http://ollama:11434")
QDRANT_URL = os.getenv("QDRANT_URL", "http://qdrant:6333")
MODEL = os.getenv("TUTOR_MODEL", "phi4:latest")

llm = ChatOllama(base_url=OLLAMA_URL, model=MODEL, temperature=0.1)
embeddings = OllamaEmbeddings(base_url=OLLAMA_URL, model="nomic-embed-text")

SOCRATIC_PROMPT = ChatPromptTemplate.from_messages([
    ("system", """Eres un tutor socrático experto en {subject}.
    
    Reglas estrictas:
    1. NUNCA des la respuesta directa — guía con preguntas
    2. Si el estudiante está bloqueado (3+ intentos fallidos), da UNA pista específica
    3. Cita el material del curso cuando sea relevante: {context}
    4. Responde en el mismo idioma que el estudiante (español/portugués/inglés)
    5. Respuestas cortas: máximo 4 oraciones
    
    Historial: {history}
    """),
    ("human", "{question}")
])

class TutorRequest(BaseModel):
    student_id: str
    subject: str
    question: str
    course_id: str
    history: list = []

@app.post("/tutor/ask")
async def ask_tutor(req: TutorRequest):
    """Socratic tutoring with local RAG — fully offline."""
    vectorstore = QdrantVectorStore.from_existing_collection(
        embedding=embeddings,
        url=QDRANT_URL,
        collection_name=f"course_{req.course_id}"
    )
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
    docs = retriever.invoke(req.question)
    context = "\n".join([d.page_content for d in docs])
    
    chain = SOCRATIC_PROMPT | llm
    response = chain.invoke({
        "subject": req.subject,
        "context": context,
        "history": req.history[-6:],
        "question": req.question
    })
    
    return {
        "response": response.content,
        "student_id": req.student_id,
        "model": MODEL,
        "cloud_used": False  # Compliance proof
    }

@app.post("/ingest/course")
async def ingest_course_material(course_id: str, pdf_path: str):
    """Load course PDFs into local Qdrant vector store."""
    from langchain_community.document_loaders import PyPDFLoader
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    
    loader = PyPDFLoader(pdf_path)
    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents(docs)
    
    QdrantVectorStore.from_documents(
        documents=chunks,
        embedding=embeddings,
        url=QDRANT_URL,
        collection_name=f"course_{course_id}"
    )
    return {"ingested": len(chunks), "course_id": course_id, "stored": "local_only"}
```

```bash
# One-time setup (on school server)
docker compose up -d

# Download models (8–14GB, run once)
docker exec ollama ollama pull phi4:latest
docker exec ollama ollama pull nomic-embed-text

# Ingest course materials
curl -X POST "http://localhost:8080/ingest/course?course_id=mat101&pdf_path=/data/cursos/matematica1.pdf"

# Student access via browser: http://school-server:3000
# Teacher dashboard: http://school-server:3000/teacher

# Hardware requirements:
# Minimum: 8-core CPU, 32GB RAM, 100GB SSD → phi4 works (slower)
# Recommended: 8-core CPU, 32GB RAM, NVIDIA RTX 3080/4080 → 5-10x faster
# Cost: ~$1,500 (CPU) or ~$3,500 (GPU server) per school
```

**Effort**: 2–3 weeks. **Revenue**: $80k–$300k per school deployment  
**Who buys**: Schools with LGPD/FERPA constraints, rural schools, government education departments  
**LATAM fit**: Brazil (LGPD mandates), government-run schools, remote/rural areas without reliable internet

---

---

## Pattern 11: EduAgent Active Recall Pipeline

**Goal**: Ingest course materials and proactively surface quizzes, flashcards, and mind maps to students during tutoring sessions — proven by the "42% outcomes" signal.
**Stack**: edu-agent (StudentTraineeCenter) + LangGraph ReAct + Qdrant RAG + Anthropic + FastAPI
**Time**: 1–2 weeks
**Why now**: Active recall (force learner to retrieve, not just read) is the evidence-backed pedagogy behind the 42% learning improvement stat. OSS baseline: `github.com/StudentTraineeCenter/edu-agent`.

```python
# active_recall_pipeline.py
# Based on: github.com/StudentTraineeCenter/edu-agent architecture
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langchain_anthropic import ChatAnthropic
from langchain_qdrant import QdrantVectorStore
from langchain_ollama import OllamaEmbeddings
from langchain_core.tools import tool
from typing import TypedDict, List, Annotated
import operator, json

# ---- State definition ----
class RecallState(TypedDict):
    student_id: str
    course_id: str
    session_turns: int
    question: str
    context_docs: List[str]
    response: str
    generated_cards: List[dict]  # flashcards generated this session
    recall_triggered: bool       # True when proactive card generation fires

# ---- Tools the ReAct agent can call ----
@tool
def search_course_material(query: str, course_id: str) -> str:
    """Search course material for relevant passages."""
    vectorstore = QdrantVectorStore.from_existing_collection(
        embedding=OllamaEmbeddings(model="nomic-embed-text"),
        url="http://qdrant:6333",
        collection_name=f"course_{course_id}"
    )
    docs = vectorstore.similarity_search(query, k=4)
    return "\n\n".join([d.page_content for d in docs])

@tool
def generate_flashcard(concept: str, course_id: str) -> dict:
    """Generate a Leitner-style flashcard for a concept."""
    from anthropic import Anthropic
    client = Anthropic()
    resp = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=256,
        messages=[{"role": "user", "content": f"""Create a flashcard for:
CONCEPT: {concept}
Return JSON: {{"front": "question", "back": "answer", "difficulty": "easy|medium|hard"}}"""}]
    )
    card = json.loads(resp.content[0].text)
    card["concept"] = concept
    card["course_id"] = course_id
    return card

@tool
def generate_quiz(topic: str, num_questions: int = 3) -> List[dict]:
    """Generate active recall quiz questions on a topic."""
    from anthropic import Anthropic
    client = Anthropic()
    resp = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        messages=[{"role": "user", "content": f"""Generate {num_questions} active recall questions on: {topic}
Return JSON array: [{{"q": "...", "a": "...", "type": "recall"}}]"""}]
    )
    return json.loads(resp.content[0].text)

# ---- LangGraph workflow ----
def tutor_node(state: RecallState) -> RecallState:
    """Main tutoring turn — Socratic response + proactive recall trigger."""
    llm = ChatAnthropic(model="claude-haiku-4-5-20251001")
    tools = [search_course_material, generate_flashcard, generate_quiz]
    agent = llm.bind_tools(tools)
    
    # Proactive recall: every 3 turns, generate review cards
    trigger_recall = (state["session_turns"] % 3 == 0 and state["session_turns"] > 0)
    
    system_msg = f"""You are a Socratic tutor for course {state['course_id']}.
    
    ALWAYS:
    1. Use search_course_material to ground your answer in course content
    2. Guide with questions — don't give direct answers
    3. {"ALSO call generate_flashcard and generate_quiz on the topic of this question — it's time for active recall review!" if trigger_recall else ""}
    
    Student asks: {state['question']}"""
    
    result = agent.invoke([{"role": "user", "content": system_msg}])
    
    return {
        **state,
        "response": result.content,
        "session_turns": state["session_turns"] + 1,
        "recall_triggered": trigger_recall
    }

workflow = StateGraph(RecallState)
workflow.add_node("tutor", tutor_node)
workflow.add_node("tools", ToolNode([search_course_material, generate_flashcard, generate_quiz]))

def should_use_tools(state: RecallState) -> str:
    if hasattr(state.get("response", ""), "tool_calls"):
        return "tools"
    return END

workflow.set_entry_point("tutor")
workflow.add_conditional_edges("tutor", should_use_tools)
workflow.add_edge("tools", "tutor")

active_recall_app = workflow.compile()

# FastAPI endpoint
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Active Recall AI Tutor")

class TutorRequest(BaseModel):
    student_id: str
    course_id: str
    question: str
    session_turns: int = 0

@app.post("/tutor/ask")
async def ask_with_recall(req: TutorRequest):
    result = active_recall_app.invoke({
        "student_id": req.student_id,
        "course_id": req.course_id,
        "question": req.question,
        "session_turns": req.session_turns,
        "context_docs": [], "response": "", "generated_cards": [], "recall_triggered": False
    })
    return {
        "response": result["response"],
        "recall_triggered": result["recall_triggered"],
        "cards_generated": result["generated_cards"],
        "session_turns": result["session_turns"]
    }
```

```bash
# Setup
pip install langgraph langchain-anthropic langchain-qdrant langchain-ollama fastapi uvicorn
# Or clone and extend: git clone https://github.com/StudentTraineeCenter/edu-agent

# Start Qdrant + Ollama (for local embeddings)
docker run -d -p 6333:6333 qdrant/qdrant
docker run -d -p 11434:11434 ollama/ollama
docker exec <ollama-id> ollama pull nomic-embed-text

# Ingest course material
curl -X POST "http://localhost:8080/ingest?course_id=bio101" -F "file=@biology_chapter1.pdf"

# Run tutor
uvicorn active_recall_pipeline:app --host 0.0.0.0 --port 8080
```

**Effort**: 1–2 weeks. **Revenue**: $20k–80k standalone; $50k–200k as LMS plugin  
**Why it works**: Active recall (forcing retrieval) produces 42% better outcomes vs. passive reading. Every 3 tutoring turns → auto-generate review cards = evidence-based pedagogy baked into the product.  
**Differentiator vs. Pattern 1/2**: This is proactive — the AI surfaces learning moments without the teacher setting up quizzes manually.

---

## Pattern Selection Matrix

| Pattern | Use Case | LMS | Time | Budget | LATAM Fit |
|---------|----------|-----|------|--------|-----------|
| P1: XBlock AI Tutor | Cloud university | Open edX | 2–3w | $30k–100k | Medium |
| P2: Quiz Generator | Any LMS | Moodle | 1–2w | $15k–50k | High |
| P3: FSRS API | Flashcard app | None | 1w | $10k–30k | High |
| P4: L&D AI Agent | Corporate | Frappe LMS | 3–4w | $50k–150k | High |
| P5: LTI Assessment | Any LMS | Any | 2w | $20k–60k | High |
| P6: Local-First Tutor | Privacy schools | None | 1–2w | $30k–80k | Very High |
| P7: Analytics Dashboard | Teacher tool | Moodle | 3–4w | $40k–120k | High |
| P8: WhatsApp Tutor | Mobile-first | None | 2–3w | $25k–80k | Very High |
| P9: Classroom MCP Agent | Google Workspace | Google Classroom | 2–4w | $50k–200k | High (new) |
| P10: Offline SLM Campus | LGPD/no-cloud | None (on-prem) | 2–3w | $80k–300k | Very High |
| P11: Active Recall Agent | Outcomes-driven | Any | 1–2w | $20k–80k | High |

---

*See `verticals/solutions.md` for platform setup guides.*
