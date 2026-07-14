# 🧩 Patrones de composición — Education (v6)

> Recetas concretas combinando repos + agentes + AI. 8 patrones con código Python.
> Última actualización: 2026-07-14

## Arquitectura base

```
[Plataforma LMS base (Moodle / Open edX / OpenEduCat)]
          ↓
[Capa de datos: activity logs, grades, attendance]
          ↓
[Knowledge Tracing (pyKT) + Analytics]
          ↓
[Agentes especializados (LangGraph / CrewAI)]
          ├── Tutoring Agent (DeepTutor / OATutor)
          ├── Content Generation Agent (Instructional Agents)
          ├── Dropout Prediction Agent
          └── Admin Agent (scheduling, alerts, enrollment)
          ↓
[UI conversacional / WhatsApp / Avatar / API para el cliente]
```

---

## P1 — Agentic Tutoring sobre Open edX (MVP corporativo)
**Tiempo**: 6-8 sem | **Licencias**: Apache-2.0 (Open edX + DeepTutor)

```python
# xblock_deeptutor/xblock_deeptutor.py
import requests
from xblock.core import XBlock
from xblock.fields import Scope, String, Dict

class DeepTutorXBlock(XBlock):
    student_model = Dict(scope=Scope.user_state, default={})
    deeptutor_url = String(scope=Scope.settings, default="http://deeptutor-service:8000")
    
    def student_view(self, context=None):
        student_id = self.runtime.anonymous_student_id
        profile = self._get_or_create_student_profile(student_id, str(self.course_id))
        frag = Fragment()
        frag.add_content(self.render_template('deeptutor_view.html', {
            'tutor_url': f"{self.deeptutor_url}/chat/{profile['session_id']}",
        }))
        return frag
    
    def _get_or_create_student_profile(self, student_id, course_id):
        return requests.post(
            f"{self.deeptutor_url}/api/students/profile",
            json={"student_id": student_id, "course_id": course_id,
                  "knowledge_state": self.student_model}
        ).json()
    
    @XBlock.json_handler
    def save_progress(self, data, suffix=''):
        self.student_model.update(data.get('knowledge_state', {}))
        return {"status": "saved"}
```

```yaml
# docker-compose.yml (fragmento)
services:
  deeptutor:
    image: hkuds/deeptutor:latest
    environment: [LLM_PROVIDER=anthropic, ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}, MEMORY_BACKEND=redis]
    ports: ["8001:8000"]
  pykt-service:
    image: pykt-team/pykt-api:latest
    environment: [MODEL=MoC-KT, DATASET=ednet]
    ports: ["8002:8000"]
```

---

## P2 — Knowledge Tracing + Dropout Prediction (Moodle)
**Tiempo**: 4-6 sem | **Licencias**: GPL-3.0 (Moodle) + MIT (pyKT)

```python
# moodle_kt_agent/dropout_predictor.py
from pykt.models import MoC_KT
from langchain_anthropic import ChatAnthropic
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain.tools import tool
import requests

@tool
def get_moodle_activity_logs(student_id: int, course_id: int, days: int = 30) -> dict:
    """Obtiene logs de actividad del estudiante en Moodle via REST API."""
    response = requests.get("https://moodle.institution.edu/webservice/rest/server.php", params={
        "wstoken": "MOODLE_API_TOKEN", "wsfunction": "core_user_get_users_by_field",
        "moodlewsrestformat": "json", "field": "id", "values[0]": student_id,
    })
    return {"student_id": student_id, "activity_count": 15, "last_login_days_ago": 7}

@tool
def predict_dropout_risk(activity_data: dict) -> dict:
    """Predice riesgo de abandono usando MoC-KT (pyKT)."""
    model = MoC_KT.from_pretrained("pykt-team/moc-kt-ednet")
    kt_result = model.predict({
        "questions": activity_data.get("exercise_ids", []),
        "responses": activity_data.get("correct_flags", []),
    })
    risk_score = (
        0.4 * (1 - kt_result["avg_knowledge"]) +
        0.3 * (1 if activity_data.get("last_login_days_ago", 0) > 7 else 0) +
        0.3 * (1 if activity_data.get("activity_count", 0) < 5 else 0)
    )
    return {"risk_score": risk_score,
            "risk_level": "HIGH" if risk_score > 0.7 else "MEDIUM" if risk_score > 0.4 else "LOW",
            "knowledge_gaps": kt_result.get("weak_skills", [])}

@tool
def send_intervention(student_id: int, risk_data: dict, channel: str = "email") -> dict:
    """Envía intervención personalizada al estudiante en riesgo."""
    llm = ChatAnthropic(model="claude-sonnet-5")
    message = llm.invoke(f"Genera mensaje motivación (150 palabras, español/portugués, empático) para estudiante en riesgo {risk_data['risk_level']}. Gaps: {risk_data['knowledge_gaps']}")
    return {"status": "sent", "channel": channel}

tools = [get_moodle_activity_logs, predict_dropout_risk, send_intervention]
llm = ChatAnthropic(model="claude-sonnet-5")
dropout_agent = AgentExecutor(agent=create_tool_calling_agent(llm, tools, prompt=...), tools=tools)

def run_daily_dropout_scan(course_ids: list):
    for course_id in course_ids:
        dropout_agent.invoke({"input": f"Analiza curso {course_id}, envía intervención a riesgo ALTO o MEDIO."})
```

---

## P3 — Instructional Agents: Automatización Docente
**Tiempo**: 3-4 sem | **Licencias**: Apache-2.0 (instructional_agents)

```python
# course_generator/crew.py
from crewai import Agent, Task, Crew, Process
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model="claude-sonnet-5", temperature=0.3)

teaching_faculty = Agent(role="Teaching Faculty",
    goal="Definir objetivos y aprobar materiales del curso",
    backstory="Experto 10+ años docencia LATAM.", llm=llm, allow_delegation=True)
instructional_designer = Agent(role="Instructional Designer",
    goal="Diseñar estructura pedagógica ADDIE",
    backstory="Especialista taxonomía Bloom.", llm=llm)
teaching_assistant = Agent(role="Teaching Assistant",
    goal="Generar ejercicios y evaluaciones",
    backstory="Crea contenido evaluación alineado a objetivos.", llm=llm)
content_writer = Agent(role="Content Writer",
    goal="Escribir scripts y slides LaTeX/Markdown",
    backstory="Redactor técnico educativo en español.", llm=llm)

def generate_course(topic: str, level: str, duration_weeks: int, language: str = "es"):
    task_syllabus = Task(
        description=f"Syllabus {duration_weeks} sem sobre {topic}. Nivel: {level}. Idioma: {language}. Bloom + cronograma + bibliografía LATAM.",
        agent=instructional_designer, expected_output="Syllabus Markdown")
    task_slides = Task(
        description="Slides Markdown (Marp/Reveal.js) por unidad: 3-5 puntos, 1 ejercicio, 1 ejemplo LATAM.",
        agent=content_writer, expected_output="Slides Markdown", context=[task_syllabus])
    task_assessments = Task(
        description="1 quiz/unidad (10 preguntas), 1 proyecto + rúbrica, banco 50 ítems. Exportar Moodle XML.",
        agent=teaching_assistant, expected_output="Evaluaciones Moodle XML", context=[task_syllabus])
    task_review = Task(
        description=f"Verificar alineación, corrección factual, nivel {level}, ejemplos LATAM.",
        agent=teaching_faculty, expected_output="Aprobación o cambios",
        context=[task_syllabus, task_slides, task_assessments])
    crew = Crew(
        agents=[instructional_designer, content_writer, teaching_assistant, teaching_faculty],
        tasks=[task_syllabus, task_slides, task_assessments, task_review],
        process=Process.sequential, verbose=True)
    return crew.kickoff()

# result = generate_course("Introducción a ML con Python", "universitario primer año", 8, "es")
```

---

## P4 — WhatsApp LATAM Education Bot (Chamilo/Moodle)
**Tiempo**: 2-3 sem | **Licencias**: MIT/Apache (n8n fair-code)

```python
# whatsapp_edu_bot/bot.py
from langchain_anthropic import ChatAnthropic
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import ConversationChain
import requests

class WhatsAppEduBot:
    def __init__(self, student_phone: str, lms_token: str, lms_url: str):
        self.phone = student_phone
        self.lms_token = lms_token
        self.lms_url = lms_url
        self.llm = ChatAnthropic(model="claude-haiku-4-5-20251001")  # Haiku = bajo costo
        self.memory = ConversationBufferWindowMemory(k=10)
    
    def handle_message(self, message: str) -> str:
        r = requests.get(f"{self.lms_url}/webservice/rest/server.php", params={
            "wstoken": self.lms_token, "wsfunction": "core_enrol_get_users_courses",
            "moodlewsrestformat": "json", "userid": self._get_user_id()})
        courses = [c['fullname'] for c in r.json() if c.get('progress', 0) < 100]
        system = f"Eres tutor AI. Cursos activos: {', '.join(courses[:3])}. Respuestas cortas, ejemplos LATAM, español."
        chain = ConversationChain(llm=self.llm, memory=self.memory)
        return chain.predict(input=f"[{system}]\n\nEstudiante: {message}")
    
    def send_daily_reminder(self):
        pending = self._get_pending_activities()
        if pending:
            self._send_whatsapp(self.phone, f"Tienes {len(pending)} actividad(es) pendiente(s): {pending[0]['name']}. Necesitas ayuda?")
    
    def _get_user_id(self): return 12345
    def _get_pending_activities(self): return []
    def _send_whatsapp(self, phone, message):
        requests.post("https://graph.facebook.com/v19.0/PHONE_ID/messages",
            headers={"Authorization": f"Bearer {WHATSAPP_TOKEN}"},
            json={"messaging_product": "whatsapp", "to": phone, "type": "text", "text": {"body": message}})
```
**n8n**: WhatsApp Webhook → Lookup Moodle → `bot.handle_message()` → send reply. Cron 6am: `send_daily_reminder()` todos los estudiantes.

---

## P5 — Adaptive Learning Engine (Open edX + pyKT + LangGraph)
**Tiempo**: 8-12 sem | **Licencias**: Apache-2.0 (Open edX + LangGraph) + MIT (pyKT)

```python
# adaptive_engine/graph.py
from langgraph.graph import StateGraph, END
from typing import TypedDict, List
from pykt.models import MoC_KT
from langchain_anthropic import ChatAnthropic

class LearningState(TypedDict):
    student_id: str; current_unit: str; knowledge_state: dict
    recent_responses: List[dict]; recommended_content: str; intervention_needed: bool

def assess_knowledge(state):
    if not state["recent_responses"]: return state
    model = MoC_KT.from_pretrained("pykt-team/moc-kt-ednet")
    kt = model.predict({"questions": [r["question_id"] for r in state["recent_responses"]],
                        "responses": [r["correct"] for r in state["recent_responses"]]})
    state["knowledge_state"] = kt["skill_mastery"]
    return state

def recommend_content(state):
    weak = [s for s, m in state["knowledge_state"].items() if m < 0.6]
    if not weak:
        state["recommended_content"] = "advanced_challenge"
        return state
    llm = ChatAnthropic(model="claude-sonnet-5")
    resp = llm.invoke(f"Estudiante con gaps en: {weak[:3]}. Recomienda: video 5min, ejercicio, tip. JSON.")
    state["recommended_content"] = resp.content
    return state

def check_intervention(state):
    critical = sum(1 for m in state["knowledge_state"].values() if m < 0.4)
    state["intervention_needed"] = critical > len(state["knowledge_state"]) * 0.6
    return state

def route(state):
    avg = sum(state["knowledge_state"].values()) / max(len(state["knowledge_state"]), 1)
    return "advance_to_next_unit" if avg > 0.8 else "recommend_content"

wf = StateGraph(LearningState)
wf.add_node("assess_knowledge", assess_knowledge)
wf.add_node("recommend_content", recommend_content)
wf.add_node("check_intervention", check_intervention)
wf.add_node("advance_to_next_unit", lambda s: {**s, "current_unit": "next"})
wf.set_entry_point("assess_knowledge")
wf.add_conditional_edges("assess_knowledge", route,
    {"recommend_content": "recommend_content", "advance_to_next_unit": "advance_to_next_unit"})
wf.add_edge("recommend_content", "check_intervention")
wf.add_edge("check_intervention", END)
wf.add_edge("advance_to_next_unit", END)
adaptive_engine = wf.compile()
```

---

## P6 — Open TutorAI CE: Tutoring con Avatares para LATAM
**Tiempo**: 2-3 sem | **Licencias**: BSD-3-Clause (Open TutorAI CE)

```bash
git clone https://github.com/Open-TutorAi/open-tutor-ai-CE
cd open-tutor-ai-CE
cat > .env << EOF
LLM_PROVIDER=anthropic
ANTHROPIC_API_KEY=your_key_here
LANGUAGE=es
VOICE_PROVIDER=elevenlabs  # o Coqui TTS local para compliance
TTS_LANGUAGE=es-419         # español latinoamericano
EOF
docker-compose up -d
# Integrar en Moodle:
# <iframe src="https://tutor.institution.edu/session/{student_id}" width="800" height="600"></iframe>
```

**Personalización LATAM**: Coqui TTS (Apache-2.0) para compliance; curriculum BNCC/SEP/MEN como contexto; Ollama local si datos de menores.

---

## P7 — Multi-Agent Assessment Pipeline (Evaluación Automática)
**Tiempo**: 4-6 sem | **Licencias**: MIT (OATutor) + Apache-2.0 (CrewAI)

```python
# assessment_pipeline/crew.py
from crewai import Agent, Task, Crew, Process
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model="claude-sonnet-5", temperature=0.1)
q_gen = Agent(role="Question Generator", goal="Generar preguntas calibradas Bloom", backstory="Experto psychometrics.", llm=llm)
rubric = Agent(role="Rubric Designer", goal="Rúbricas detalladas para respuestas abiertas", backstory="Evaluación formativa.", llm=llm)
grader = Agent(role="Auto Grader", goal="Evaluar respuestas con feedback constructivo", backstory="Evaluador empático.", llm=llm)

def run_assessment_cycle(topic, student_responses, level):
    t1 = Task(description=f"10 preguntas {topic}/{level}. Bloom: 4 conocimiento, 3 comprensión, 2 aplicación, 1 análisis. JSON.",
              agent=q_gen, expected_output="JSON 10 preguntas")
    t2 = Task(description="Rúbricas: 4-5 criterios, niveles 0-4pts, ejemplos, errores comunes.",
              agent=rubric, expected_output="Rúbricas Markdown", context=[t1])
    t3 = Task(description=f"Evalúa {student_responses[:5]}. Puntaje + feedback 2-3 oraciones + sugerencias.",
              agent=grader, expected_output="Feedback por respuesta", context=[t1, t2])
    return Crew(agents=[q_gen, rubric, grader], tasks=[t1, t2, t3], process=Process.sequential).kickoff()
```

---

## P8 — LATAM Dropout Prevention Stack (Gobierno/Universidad Pública)
**Tiempo**: 8-10 sem | **Licencias**: GPL-3.0 (Moodle) + MIT (pyKT) | **100% self-hosted**

```python
# dropout_prevention/self_hosted_stack.py
"""
Arquitectura 100% self-hosted (LGPD/Ley 1581 compliant):
[Moodle LMS] → [ETL] → [pyKT local] → [Risk Scores] → [Intervention Engine]
                                                ↓
                             [Ollama Llama 3 70B local] → mensaje personalizado
                             [WhatsApp Business API*]   → *solo metadata, no datos edu
"""
from pykt.models import MoC_KT
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate

local_llm = Ollama(model="llama3:70b", base_url="http://ollama-server:11434")

def generate_intervention_message(student_name, risk_level, weak_skills, language="es"):
    """LLM 100% local — datos nunca salen del país."""
    prompt = PromptTemplate.from_template("""
    Genera mensaje de apoyo para estudiante universitario/a.
    Nombre: {name} | Riesgo: {risk} | Dificultades: {skills} | Idioma: {lang}
    Requisitos: empático, no alarmante, recursos concretos, max 4 oraciones, pregunta check-in.
    Solo el mensaje.
    """)
    return local_llm.invoke(prompt.format(
        name=student_name, risk=risk_level,
        skills=", ".join(weak_skills[:3]), lang=language))

# Cron job semanal:
# python run_weekly_scan.py --course-id 42 --send-interventions
```

---

## Resumen de patrones

| Patrón | Tiempo | Presupuesto | Mejor para |
|--------|--------|-------------|----------|
| P1 — DeepTutor + Open edX | 6-8 sem | Medio | Corporativo L&D, universidades modernas |
| P2 — Dropout Prediction (Moodle) | 4-6 sem | Bajo-Medio | Universidades con Moodle existente |
| P3 — Instructional Agents | 3-4 sem | Bajo | Instituciones con escasez de docentes |
| P4 — WhatsApp LATAM Bot | 2-3 sem | Bajo | Colegios, bachillerato, acceso móvil |
| P5 — Adaptive Engine (LangGraph) | 8-12 sem | Alto | Plataforma MOOC propia |
| P6 — Open TutorAI Avatares | 2-3 sem | Bajo | Demo/piloto, diferenciador visual |
| P7 — Assessment Pipeline | 4-6 sem | Medio | HE, certificaciones, formación profesional |
| P8 — LATAM Dropout self-hosted | 8-10 sem | Medio | Gobierno, universidades públicas, LGPD |

---
*v6 — actualizado automáticamente por el pipeline de ingest.*
