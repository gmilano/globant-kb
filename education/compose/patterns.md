# Compose Patterns — Education AI

> Concrete recipes: specific repos + agents + wiring instructions for education client engagements

---

## Pattern 1: AI Teaching Assistant on Open edX

**Use case**: A university running Open edX wants an AI teaching assistant that answers student questions 24/7, generates quiz questions from lecture slides, and provides per-student learning summaries to instructors.

**Components:**
- **[openedx/openedx-platform](https://github.com/openedx/openedx-platform)** (AGPLv3) — LMS backbone
- **[openedx/openedx-ai-extensions](https://github.com/openedx/openedx-ai-extensions)** (Apache 2.0) — official AI plugin
- **[mintplex-labs/anything-llm](https://github.com/mintplex-labs/anything-llm)** (MIT) — course material RAG backend
- **[langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)** (MIT) — agent orchestration
- **[mudler/LocalAI](https://github.com/mudler/LocalAI)** (MIT) — self-hosted LLM inference (FERPA-safe)

**Architecture:**
```
Student question
      │
      ▼
Open edX Discussion Forum Webhook
      │
      ▼
LangGraph Agent Router
      ├── Course FAQ? → AnythingLLM RAG (course materials)
      ├── Concept explanation? → LocalAI (Claude/Llama via openai-compat API)
      └── Quiz request? → Quiz Generation Agent (LangGraph)
      │
      ▼
Response posted back to edX forum thread
      +
Instructor dashboard (weekly digest via email)
```

**Wiring:**
```python
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
import httpx

# LocalAI provides OpenAI-compatible API — swap base_url to self-hosted endpoint
llm = ChatOpenAI(
    model="llama-3.1-8b",  # or phi-3-medium for lighter hardware
    base_url="http://localai:8080/v1",
    api_key="not-needed"
)

def route_question(state: dict) -> str:
    """Route to the right sub-agent based on question type."""
    question = state["question"]
    if any(word in question.lower() for word in ["quiz", "test", "practice"]):
        return "quiz_agent"
    return "rag_agent"

def rag_agent(state: dict) -> dict:
    """Query AnythingLLM workspace for course material answers."""
    resp = httpx.post(
        "http://anythingllm:3001/api/v1/workspace/course-materials/chat",
        json={"message": state["question"], "mode": "query"},
        headers={"Authorization": f"Bearer {ANYTHINGLLM_KEY}"}
    )
    return {**state, "answer": resp.json()["textResponse"]}

def quiz_agent(state: dict) -> dict:
    """Generate quiz questions from course context."""
    prompt = f"""You are a university professor. Generate 3 multiple-choice questions 
    on the topic: {state['question']}. 
    Format: Q: ... A) ... B) ... C) ... D) ... Answer: ...
    Base questions on course learning objectives."""
    result = llm.invoke(prompt)
    return {**state, "answer": result.content}

def post_to_forum(state: dict) -> dict:
    """Post answer back to Open edX discussion forum."""
    httpx.post(
        f"{OPENEDX_BASE}/api/discussion/v1/comments/",
        json={"thread_id": state["thread_id"], "raw_body": state["answer"]},
        headers={"Authorization": f"JWT {OPENEDX_JWT}"}
    )
    return state

workflow = StateGraph(dict)
workflow.add_node("rag_agent", rag_agent)
workflow.add_node("quiz_agent", quiz_agent)
workflow.add_node("post", post_to_forum)
workflow.set_conditional_entry_point(route_question, {
    "rag_agent": "rag_agent",
    "quiz_agent": "quiz_agent"
})
workflow.add_edge("rag_agent", "post")
workflow.add_edge("quiz_agent", "post")
workflow.add_edge("post", END)
ta_agent = workflow.compile()
```

**Estimated impact**: 70% reduction in TA office hours; 24/7 student support; instructors report higher forum engagement.

---

## Pattern 2: Personalized AI Tutor (DeepTutor + Moodle Integration)

**Use case**: A school deploys a personalized AI tutor that tracks each student's knowledge state, adapts lesson difficulty, and generates targeted practice problems — integrated into existing Moodle courses.

**Components:**
- **[moodle/moodle](https://github.com/moodle/moodle)** (GPL-3.0) — existing LMS
- **[HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor)** (Apache 2.0) — agent-native tutoring engine
- **[CAHLR/OATutor](https://github.com/CAHLR/OATutor)** (MIT) — BKT mastery model for skill tracking
- **[mudler/LocalAI](https://github.com/mudler/LocalAI)** (MIT) — local LLM inference
- **[qdrant/qdrant](https://github.com/qdrant/qdrant)** (Apache 2.0) — student knowledge state vector store

**docker-compose.yml:**
```yaml
version: "3.8"
services:
  localai:
    image: localai/localai:latest
    ports: ["8080:8080"]
    volumes: [./models:/models]
    environment:
      - MODELS_PATH=/models
      - PRELOAD_MODELS=phi-3-medium  # Math-strong, runs on CPU

  qdrant:
    image: qdrant/qdrant:latest
    ports: ["6333:6333"]
    volumes: [qdrant_data:/qdrant/storage]

  deeptutor:
    image: hkuds/deeptutor:latest
    ports: ["3000:3000"]
    environment:
      - LLM_PROVIDER=localai
      - LLM_BASE_URL=http://localai:8080/v1
      - VECTOR_DB_URL=http://qdrant:6333
    depends_on: [localai, qdrant]

  moodle-ai-bridge:
    build: ./moodle-bridge  # Custom FastAPI service
    ports: ["8000:8000"]
    environment:
      - MOODLE_URL=http://moodle
      - DEEPTUTOR_URL=http://deeptutor:3000
      - MOODLE_TOKEN=${MOODLE_WEBSERVICE_TOKEN}

volumes:
  qdrant_data:
```

**Moodle → DeepTutor bridge (moodle-bridge/main.py):**
```python
from fastapi import FastAPI
import httpx

app = FastAPI()

@app.post("/student-session")
async def start_tutor_session(student_id: str, course_id: str, topic: str):
    # Fetch student's Moodle activity logs to prime knowledge state
    moodle_resp = httpx.get(
        f"{MOODLE_URL}/webservice/rest/server.php",
        params={
            "wsfunction": "core_completion_get_activities_completion_status",
            "courseid": course_id,
            "userid": student_id,
            "wstoken": MOODLE_TOKEN,
            "moodlewsrestformat": "json"
        }
    )
    completion_data = moodle_resp.json()
    
    # Start DeepTutor session with pre-loaded knowledge context
    tutor_resp = httpx.post(
        f"{DEEPTUTOR_URL}/api/sessions",
        json={
            "student_id": student_id,
            "topic": topic,
            "prior_knowledge": completion_data,
            "mode": "adaptive_tutoring"
        }
    )
    return {"session_url": tutor_resp.json()["session_url"]}
```

**Result**: Each student gets a tutor that knows their Moodle history and adapts in real time. BKT tracks mastery per skill. Sessions persist across logins.

---

## Pattern 3: Offline AI Tutor Device (Kolibri + LocalAI)

**Use case**: Deploy AI tutoring to schools with no reliable internet in rural/emerging-market settings. Each school gets a Raspberry Pi 5 cluster acting as a local AI education server.

**Components:**
- **[learningequality/kolibri](https://github.com/learningequality/kolibri)** (MIT) — offline LMS + Khan Academy content
- **[mudler/LocalAI](https://github.com/mudler/LocalAI)** (MIT) — runs Phi-3-mini on CPU
- **[Khan/perseus](https://github.com/Khan/perseus)** (MIT) — interactive exercise rendering

**Hardware**: Raspberry Pi 5 (8GB RAM) cluster, 1 per 30 students; ~$150/device

**Setup script:**
```bash
#!/bin/bash
# Install Kolibri
pip install kolibri
kolibri start

# Install LocalAI with Phi-3-mini (3.8B, runs on 4GB RAM)
docker run -d \
  --name localai \
  -p 8080:8080 \
  -v ./models:/models \
  localai/localai:latest \
  phi-3-mini-4k-instruct.gguf

# Configure Kolibri to proxy AI requests
# Kolibri plugin: kolibri_ai_tutor (custom)
kolibri plugin enable kolibri_ai_tutor

# Pre-download content channels
kolibri manage importchannel --channel-id=513f5c4d11ea4d3b87c51ff6e0dfbce8  # Khan Academy Math
kolibri manage importchannel --channel-id=7db8b43a2e5a4f7fb60c3f8b26b53d9e  # Khan Academy Science
```

**Custom Kolibri AI plugin (exercises/ai_hint.py):**
```python
from kolibri.core.content.api import ContentNodeViewset
import httpx

class AIHintViewset(ContentNodeViewset):
    def get_ai_hint(self, request, pk=None):
        node = self.get_object()
        student_attempt = request.data.get("attempt", "")
        
        # Call LocalAI (Phi-3 is strong at math step-by-step explanation)
        resp = httpx.post(
            "http://localhost:8080/v1/chat/completions",
            json={
                "model": "phi-3-mini",
                "messages": [
                    {"role": "system", "content": "You are a patient math tutor. Give a hint, not the answer. Be encouraging."},
                    {"role": "user", "content": f"Exercise: {node.description}\nMy attempt: {student_attempt}\nGive me a hint."}
                ]
            }
        )
        return Response({"hint": resp.json()["choices"][0]["message"]["content"]})
```

**Impact**: Offline AI tutoring at $150/device; no internet required; math hints + explanations in local language (Phi-3 supports 50+ languages).

---

## Pattern 4: AI Curriculum Generation Crew (CrewAI)

**Use case**: A corporate L&D team needs to create a training curriculum for a new product launch. Currently takes 3 weeks and $50k with instructional designers. AI crew generates a draft in 4 hours.

**Components:**
- **[crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)** (MIT) — multi-agent curriculum design crew
- **[frappe/lms](https://github.com/frappe/lms)** (MIT) — publishes the generated curriculum
- **[mintplex-labs/anything-llm](https://github.com/mintplex-labs/anything-llm)** (MIT) — ingests product documentation as source material

**Wiring:**
```python
from crewai import Agent, Task, Crew, Process
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model="claude-sonnet-5")

# Define the instructional design crew
learning_designer = Agent(
    role="Instructional Designer",
    goal="Design a complete, pedagogically sound curriculum outline",
    backstory="Expert in adult learning principles (ADDIE, Bloom's Taxonomy). Creates curricula that drive measurable behavior change.",
    llm=llm
)

content_writer = Agent(
    role="Content Writer",
    goal="Write engaging, clear lesson content for each module",
    backstory="Technical writer who excels at making complex topics accessible. Writes for adult learners in corporate settings.",
    llm=llm
)

assessment_designer = Agent(
    role="Assessment Designer",
    goal="Create valid, reliable assessments that measure learning objectives",
    backstory="Assessment expert who designs scenario-based questions that test application, not just recall.",
    llm=llm
)

quality_reviewer = Agent(
    role="Quality Reviewer",
    goal="Review curriculum for accuracy, completeness, and pedagogical soundness",
    backstory="Senior L&D professional who spots gaps, inconsistencies, and content that won't transfer to the job.",
    llm=llm
)

# Define tasks with source material context
design_task = Task(
    description="""Analyze the product documentation provided and design a 5-module curriculum.
    Each module should have: learning objectives (Bloom's levels), content outline, 
    estimated duration, and delivery method (video/reading/activity).
    Source material: {product_docs}""",
    agent=learning_designer,
    expected_output="Structured 5-module curriculum outline in JSON"
)

write_task = Task(
    description="Write full lesson content for each of the 5 modules. Include examples, scenarios, and summaries.",
    agent=content_writer,
    expected_output="Complete lesson text for all 5 modules"
)

assess_task = Task(
    description="Create 5 quiz questions per module (25 total) that test the learning objectives at application level.",
    agent=assessment_designer,
    expected_output="Quiz bank in QTI-compatible JSON format"
)

review_task = Task(
    description="Review the complete curriculum for gaps, accuracy, and L&D best practices. Flag issues and suggest improvements.",
    agent=quality_reviewer,
    expected_output="Quality review report with specific recommendations"
)

curriculum_crew = Crew(
    agents=[learning_designer, content_writer, assessment_designer, quality_reviewer],
    tasks=[design_task, write_task, assess_task, review_task],
    process=Process.sequential
)

# Run the crew with product documentation
result = curriculum_crew.kickoff(inputs={"product_docs": open("product_docs.txt").read()})

# Push to Frappe LMS via REST API
import httpx
httpx.post(
    "https://lms.company.com/api/resource/Course",
    json={"course_name": "Product Training", "content": result},
    headers={"Authorization": f"token {FRAPPE_API_KEY}:{FRAPPE_API_SECRET}"}
)
```

**Timeline**: 4 hours end-to-end vs. 3 weeks manual. Human review + refinement takes another 2 hours. **Total: 6 hours vs. 3 weeks.**
**Cost**: ~$12 in LLM API calls vs. $50k instructional designer fees.

---

## Pattern 5: Student At-Risk Early Warning System

**Use case**: A university wants to identify at-risk students before they fail — using AI to analyze engagement patterns, grade trajectories, and forum activity, then automatically alert advisors.

**Components:**
- **[openedx/openedx-platform](https://github.com/openedx/openedx-platform)** (AGPLv3) — source of learning analytics data
- **[langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)** (MIT) — monitoring agent graph
- **[langfuse/langfuse](https://github.com/langfuse/langfuse)** (MIT) — audit trail for all AI recommendations

**Wiring:**
```python
from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
from langfuse.callback import CallbackHandler
import httpx, json
from datetime import datetime, timedelta

llm = ChatAnthropic(model="claude-haiku-4-5-20251001")  # cheap model for batch analysis
langfuse_handler = CallbackHandler()

def fetch_student_data(state: dict) -> dict:
    """Pull last 14 days of activity from Open edX Analytics API."""
    resp = httpx.get(
        f"{OPENEDX_BASE}/api/analytics/v0/users/{state['student_id']}/engagement/",
        headers={"Authorization": f"JWT {OPENEDX_JWT}"},
        params={"start_date": (datetime.now() - timedelta(days=14)).isoformat()}
    )
    data = resp.json()
    return {**state, "engagement": data}

def analyze_risk(state: dict) -> dict:
    """LLM analyzes engagement pattern and assigns risk score."""
    prompt = f"""Analyze this student's 14-day engagement data and assess dropout risk.
    
    Data: {json.dumps(state['engagement'], indent=2)}
    
    Consider:
    - Login frequency trend (decreasing = risk signal)
    - Assignment submission rate and timing (late = risk signal)
    - Video completion rate (dropping = risk signal)
    - Forum participation (zero = isolation risk)
    - Grade trajectory (declining = academic risk)
    
    Return JSON: {{"risk_score": 0-10, "risk_factors": [...], "recommended_action": "..."}}"""
    
    result = llm.invoke(prompt, config={"callbacks": [langfuse_handler]})
    risk_data = json.loads(result.content)
    return {**state, "risk": risk_data}

def alert_advisor(state: dict) -> dict:
    """Send alert if risk score >= 7."""
    if state["risk"]["risk_score"] >= 7:
        httpx.post(
            f"{ADVISOR_WEBHOOK_URL}",
            json={
                "student_id": state["student_id"],
                "risk_score": state["risk"]["risk_score"],
                "risk_factors": state["risk"]["risk_factors"],
                "recommended_action": state["risk"]["recommended_action"],
                "timestamp": datetime.now().isoformat()
            }
        )
        # Also send personalized outreach to student
        httpx.post(
            f"{OPENEDX_BASE}/api/user/v1/users/{state['student_id']}/messages/",
            json={"subject": "Checking in on your progress", 
                  "body": f"Hi! We noticed you might benefit from some support. {state['risk']['recommended_action']}"},
            headers={"Authorization": f"JWT {OPENEDX_JWT}"}
        )
    return state

# Build monitoring pipeline
workflow = StateGraph(dict)
workflow.add_node("fetch", fetch_student_data)
workflow.add_node("analyze", analyze_risk)
workflow.add_node("alert", alert_advisor)
workflow.set_entry_point("fetch")
workflow.add_edge("fetch", "analyze")
workflow.add_edge("analyze", "alert")
workflow.add_edge("alert", END)
risk_agent = workflow.compile()

# Run nightly via cron for all enrolled students
# cron: 0 2 * * * python run_risk_monitor.py
def run_for_all_students(course_id: str):
    students = get_enrolled_students(course_id)  # edX API
    for student_id in students:
        risk_agent.invoke({"student_id": student_id})
```

**Impact**: Early identification of at-risk students. Universities using similar systems report 15–20% reduction in dropout rates. Langfuse audit trail satisfies FERPA accountability requirements.
