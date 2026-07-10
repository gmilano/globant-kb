# 🧩 Patrones de composición — Education

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-10

## Arquitectura base

```
[Plataforma vertical base (Moodle / Open edX / ClassroomIO)]
          ↓
[Plugin/Extension AI (openedx-ai-extensions / moodle-ai-assistant)]
          ↓
[Motor de tutoring (DeepTutor / Open TutorAI CE)]
          ↓
[Orquestador multi-agente (LangGraph / CrewAI)]
          ↓
[LLM Backend (Claude Sonnet 4.5 / Haiku 4.5 / Ollama local)]
          ↓
[Data pipeline (xAPI engagement events → alertas → analytics)]
```

---

## P1: Moodle AI Copilot (Quick Start)
**Tiempo**: 4–8 semanas | **Deal**: $80k–$250k | **Licencias**: MIT + GPL

### Stack
- **LMS base**: Moodle (GPL-3.0, 6.1k★)
- **AI plugin**: microsoft/moodle-ai-assistant (MIT)
- **LLM**: Claude Haiku 4.5 via Anthropic API (cost-efficient para volumen)
- **RAG**: PDFs del curso → pgvector o Qdrant

### Receta
```python
# 1. Deploy Moodle via Docker Compose
# 2. Install microsoft/moodle-ai-assistant plugin:
#    git clone https://github.com/microsoft/moodle-ai-assistant moodle/local/aiassistant

from anthropic import Anthropic
import qdrant_client

client = Anthropic()
qdrant = qdrant_client.QdrantClient(url="http://localhost:6333")

def index_course_materials(course_id: str, pdf_paths: list[str]) -> None:
    """Index Moodle course PDFs into Qdrant for RAG."""
    for pdf_path in pdf_paths:
        chunks = extract_and_chunk_pdf(pdf_path)
        vectors = embed_chunks(chunks)  # via Claude or local model
        qdrant.upsert(collection_name=f"course_{course_id}", points=vectors)

def answer_student_question(question: str, course_id: str) -> str:
    context = retrieve_top_k_chunks(question, course_id, k=5)
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        system="You are a helpful course assistant. Answer using only the course materials provided.",
        messages=[{
            "role": "user",
            "content": f"Course materials:\n{context}\n\nStudent question: {question}"
        }]
    )
    return response.content[0].text
```

### Cuándo usar
Cliente universidad LATAM con Moodle existente que quiere añadir AI sin migrar la plataforma. Deploy en 4 semanas sobre infraestructura existente.

---

## P2: Open edX Personalized Learning Engine
**Tiempo**: 10–16 semanas | **Deal**: $200k–$600k | **Licencias**: Apache-2.0

### Stack
- **LMS base**: Open edX platform (Apache-2.0, 9.6k★)
- **AI plugin**: openedx-ai-extensions (Apache-2.0)
- **Tutoring engine**: HKUDS/DeepTutor (Apache-2.0, 23.7k★) vía REST API
- **Orchestration**: LangGraph
- **LLM**: Claude Sonnet 4.5 (tutoring) + Claude Haiku 4.5 (tareas rutinarias)

### Receta
```python
from langgraph.graph import StateGraph, END
from anthropic import Anthropic
from dataclasses import dataclass

client = Anthropic()

@dataclass
class StudentLearningState:
    student_id: str
    course_id: str
    current_topic: str
    knowledge_gaps: list[str]
    learning_style: str  # visual / reading / kinesthetic
    progress_score: float
    session_history: list[dict]

def assess_knowledge(state: StudentLearningState) -> StudentLearningState:
    """DeepTutor outer loop: assess current knowledge via adaptive questioning."""
    response = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1024,
        system="You are a Socratic AI tutor. Identify knowledge gaps through targeted questions. Never give direct answers.",
        messages=[{"role": "user", "content": f"Topic: {state.current_topic}. Quiz the student to find gaps."}]
    )
    state.knowledge_gaps = parse_gaps_from_response(response.content[0].text)
    return state

def generate_explanation(state: StudentLearningState) -> StudentLearningState:
    """DeepTutor inner loop: generate personalized explanation for identified gaps."""
    gaps_text = "\n".join(f"- {g}" for g in state.knowledge_gaps)
    response = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=2048,
        system=f"Learning style: {state.learning_style}. Adapt explanation format to this style. Use analogies and examples from the student's context.",
        messages=[{"role": "user", "content": f"Explain these gaps:\n{gaps_text}"}]
    )
    return state

def check_mastery(state: StudentLearningState) -> str:
    """Route: mastered → next topic; gap → re-assess."""
    return "mastered" if state.progress_score >= 0.8 else "gap_found"

# Build LangGraph workflow
workflow = StateGraph(StudentLearningState)
workflow.add_node("assess", assess_knowledge)
workflow.add_node("explain", generate_explanation)
workflow.add_node("quiz", generate_adaptive_quiz)
workflow.add_node("next_topic", advance_curriculum)
workflow.set_entry_point("assess")
workflow.add_edge("assess", "explain")
workflow.add_edge("explain", "quiz")
workflow.add_conditional_edges("quiz", check_mastery, {
    "mastered": "next_topic",
    "gap_found": "assess"
})
workflow.add_edge("next_topic", END)

tutor_app = workflow.compile()
```

### Cuándo usar
MOOC corporativo con 1k–50k empleados. AI adapta el camino de aprendizaje por persona. Deals grandes ($200k+) con universidad o empresa Fortune 500 LATAM.

---

## P3: LectūraAgents — AI Teacher Avatar para cursos asíncronos
**Tiempo**: 8–14 semanas | **Deal**: $150k–$600k | **Licencias**: Research (Apache pending)

### Stack
- **Framework**: LectūraAgents (arXiv:2606.16428) — implementar según paper
- **Agentes**: ProfessorAgent + ResearchAgent + PlanningAgent + ReviewAgent
- **Avatar rendering**: D-ID API o HeyGen (video avatar) o Three.js (avatar 2D web)
- **LLM**: Claude Sonnet 4.5 (ProfessorAgent) + Claude Haiku 4.5 (subagentes)
- **TASA**: Teaching Action-Speech Alignment algorithm (del paper)

### Receta
```python
from anthropic import Anthropic
import re

client = Anthropic()

class ResearchAgent:
    def gather_content(self, topic: str) -> str:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=2048,
            messages=[{"role": "user", "content": f"Research key concepts, definitions, and examples for: {topic}"}]
        )
        return response.content[0].text

class PlanningAgent:
    def create_lecture_plan(self, content: str, learner_profile: dict) -> str:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1024,
            system=f"Create a lecture plan adapted for: grade={learner_profile.get('grade')}, style={learner_profile.get('learning_style')}",
            messages=[{"role": "user", "content": f"Plan a 10-minute lecture on:\n{content}"}]
        )
        return response.content[0].text

class ProfessorAgent:
    """Orchestrator: generates embodied lecture with TASA teaching actions."""
    
    def __init__(self):
        self.research = ResearchAgent()
        self.planning = PlanningAgent()
    
    def generate_embodied_lecture(self, topic: str, learner_profile: dict) -> dict:
        # Phase 1: Research
        content = self.research.gather_content(topic)
        
        # Phase 2: Planning
        plan = self.planning.create_lecture_plan(content, learner_profile)
        
        # Phase 3: Embodied lecture generation with TASA markers
        response = client.messages.create(
            model="claude-sonnet-4-5",
            max_tokens=4096,
            system="""You are an embodied AI professor generating a lecture script.
            
Use TASA teaching action markers synchronized to speech:
- [WRITE:text] — write text on board at this moment
- [HIGHLIGHT:phrase] — highlight this phrase in the materials  
- [UNDERLINE:concept] — underline this key concept
- [PAUSE:seconds] — pause for student reflection

Learner profile: {profile}. Adapt language, examples, and pacing.""".format(profile=learner_profile),
            messages=[{"role": "user", "content": f"Topic: {topic}\nLecture plan:\n{plan}\n\nGenerate the full embodied lecture script."}]
        )
        
        script = response.content[0].text
        speech, actions = self._parse_tasa_markers(script)
        
        return {
            "speech": speech,
            "teaching_actions": actions,
            "estimated_duration_min": len(speech.split()) / 150,  # ~150 wpm
            "topic": topic
        }
    
    def _parse_tasa_markers(self, script: str) -> tuple[str, list]:
        """Extract teaching actions and generate timeline aligned to speech."""
        actions = []
        clean_speech = script
        
        for match in re.finditer(r'\[(WRITE|HIGHLIGHT|UNDERLINE|PAUSE):([^\]]+)\]', script):
            action_type = match.group(1)
            action_content = match.group(2)
            char_position = match.start()
            word_position = len(script[:char_position].split())
            timestamp_seconds = word_position / 2.5  # ~150 wpm = 2.5 words/sec
            actions.append({
                "type": action_type,
                "content": action_content,
                "timestamp": timestamp_seconds
            })
        
        clean_speech = re.sub(r'\[[^\]]+\]', '', script).strip()
        return clean_speech, actions
```

### Cuándo usar
Universidad o empresa que quiere cursos async de alta calidad con "profesor IA" que gesticula y adapta al estudiante. Reemplaza video production costosa ($50–$200/min → <$5/min con AI).

---

## P4: ClassroomIO + Claude — Corporate AI Training Platform
**Tiempo**: 6–10 semanas | **Deal**: $100k–$400k | **Licencias**: MIT

### Stack
- **LMS base**: classroomio/classroomio (MIT, 1.5k★) — Svelte + Supabase
- **AI layer**: Claude Sonnet 4.5 via Anthropic API (grading) + Claude Haiku 4.5 (quiz)
- **Quiz generation**: Claude Haiku sobre contenido de los cursos
- **Grading agent**: Claude Sonnet con tool use + XAI (explainable grading)

### Receta
```python
from anthropic import Anthropic

client = Anthropic()

# --- Explainable AI Grading Agent ---
grading_tool = {
    "name": "grade_submission",
    "description": "Grade a student submission with detailed, explainable feedback",
    "input_schema": {
        "type": "object",
        "properties": {
            "score": {"type": "number", "description": "Score 0-100"},
            "feedback": {"type": "string", "description": "Personalized feedback for the student"},
            "strengths": {"type": "array", "items": {"type": "string"}, "description": "What the student did well"},
            "improvements": {"type": "array", "items": {"type": "string"}, "description": "Areas to improve"},
            "explanation": {"type": "string", "description": "Why this score was given (XAI — required for audit)"}
        },
        "required": ["score", "feedback", "explanation"]
    }
}

def grade_assignment(submission: str, rubric: str) -> dict:
    """Grade with full explainability for audit compliance."""
    response = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=2048,
        tools=[grading_tool],
        tool_choice={"type": "auto"},
        messages=[{
            "role": "user",
            "content": f"Grade this submission according to the rubric.\n\nSubmission:\n{submission}\n\nRubric:\n{rubric}"
        }]
    )
    for block in response.content:
        if block.type == "tool_use" and block.name == "grade_submission":
            return block.input
    return {}

# --- Auto-quiz generation ---
def generate_quiz(lesson_content: str, num_questions: int = 5) -> list[dict]:
    """Auto-generate MCQ quiz from lesson content."""
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=2048,
        system="""Generate a JSON array of MCQ quiz questions from educational content.
Format: [{"question": "...", "options": ["A", "B", "C", "D"], "correct": "A", "explanation": "..."}]""",
        messages=[{
            "role": "user",
            "content": f"Generate {num_questions} questions from:\n{lesson_content}"
        }]
    )
    import json
    text = response.content[0].text
    start = text.find('[')
    end = text.rfind(']') + 1
    return json.loads(text[start:end]) if start != -1 else []
```

### Cuándo usar
Empresa tech LATAM con 100–5000 empleados que quiere plataforma de AI training interna. MIT license → sin restricciones comerciales. Globant puede resellarlo como producto.

---

## P5: Agente Proactivo de Alerta Temprana (At-Risk Student Detection)
**Tiempo**: 8–14 semanas | **Deal**: $120k–$450k | **Licencias**: Apache-2.0 + MIT

### Stack
- **LMS**: Open edX (Apache-2.0) con xAPI events habilitados
- **Data**: xAPI events → ClickHouse o PostgreSQL (engagement analytics)
- **Agent**: Claude Haiku 4.5 (cost-efficient para volumen alto) + LangGraph scheduler
- **Notifications**: Email / WhatsApp Business API / Moodle/edX notification system

### Receta
```python
from anthropic import Anthropic
import pandas as pd
from datetime import datetime

client = Anthropic()

def calculate_risk_score(student_row: pd.Series) -> float:
    """Simple risk score: 0.0 (no risk) to 1.0 (high risk)."""
    score = 0.0
    if student_row['days_since_login'] > 7:
        score += 0.4
    elif student_row['days_since_login'] > 3:
        score += 0.2
    if student_row['quiz_avg'] < 50:
        score += 0.4
    elif student_row['quiz_avg'] < 70:
        score += 0.2
    if student_row['video_completion'] < 0.25:
        score += 0.2
    return min(score, 1.0)

def generate_personalized_nudge(student: pd.Series) -> str:
    """Generate warm, personalized message for at-risk student."""
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=256,
        system="You are a caring, encouraging student success advisor. Write a warm, brief personalized message (2-3 sentences). Do not mention 'risk' or 'failing'. Be positive and specific.",
        messages=[{
            "role": "user",
            "content": f"""Student: {student['first_name']}
Last login: {student['days_since_login']} days ago
Current topic: {student['current_topic']}
Quiz average: {student['quiz_avg']}%
Course: {student['course_name']}

Write an encouraging message to bring them back."""
        }]
    )
    return response.content[0].text

def daily_at_risk_sweep(engagement_df: pd.DataFrame) -> list[dict]:
    """Run daily. Detect and nudge at-risk students proactively."""
    alerts = []
    
    for _, student in engagement_df.iterrows():
        risk = calculate_risk_score(student)
        
        if risk >= 0.4:  # Threshold: medium+ risk
            nudge = generate_personalized_nudge(student)
            alerts.append({
                "student_id": student['id'],
                "email": student['email'],
                "risk_score": risk,
                "nudge_message": nudge,
                "recommended_action": "schedule_tutoring" if risk >= 0.7 else "send_reminder",
                "generated_at": datetime.utcnow().isoformat()
            })
    
    return alerts

# Run via cron / Open edX Celery task
if __name__ == "__main__":
    data = fetch_engagement_data(days_back=7)  # from xAPI events
    alerts = daily_at_risk_sweep(data)
    
    for alert in alerts:
        send_notification(alert['student_id'], alert['nudge_message'])
        log_intervention_to_db(alert)
    
    print(f"[{datetime.utcnow().isoformat()}] Sent {len(alerts)} proactive nudges")
```

### Cuándo usar
Universidad LATAM con 5k–50k estudiantes online. Reducir deserción 15–30% con intervención proactiva personalizada. ROI medible → deals grandes.

---

## P6: LATAM AI Tutor en Español/Portugués (K-12)
**Tiempo**: 10–16 semanas | **Deal**: $80k–$400k | **Licencias**: Apache-2.0

### Stack
- **Tutoring engine**: HKUDS/DeepTutor fork (Apache-2.0, 23.7k★)
- **LMS**: Open edX (Apache-2.0) o Moodle (GPL)
- **LLM**: Claude Sonnet 4.5 (español/portugués nativo, multilingüe)
- **Curriculum**: SEP (México), BNCC (Brasil), NAP (Argentina), MEN (Colombia)

### Receta
```python
from anthropic import Anthropic

client = Anthropic()

COUNTRY_CONFIGS = {
    "MX": {"language": "español mexicano", "curriculum": "SEP", "grade_system": "primaria/secundaria/preparatoria"},
    "BR": {"language": "português brasileiro", "curriculum": "BNCC", "grade_system": "ensino fundamental/médio"},
    "AR": {"language": "español rioplatense", "curriculum": "NAP", "grade_system": "primaria/secundaria"},
    "CO": {"language": "español colombiano", "curriculum": "MEN", "grade_system": "básica/media"},
    "CL": {"language": "español chileno", "curriculum": "MINEDUC", "grade_system": "básica/media"},
    "PE": {"language": "español peruano", "curriculum": "MINEDU", "grade_system": "primaria/secundaria"},
}

SOCRATIC_TUTOR_SYSTEM = """Eres un tutor de IA para estudiantes de {country}.
Idioma: {language}
Currículo oficial: {curriculum}
Nivel educativo: {grade_level}

Reglas pedagógicas:
1. Usa el método socrático — guía, nunca des respuestas directas
2. Adapta el lenguaje a la edad (nunca condescendiente)
3. Usa ejemplos y contextos culturales de {country}
4. Si el estudiante está frustrado, cambia de estrategia pedagógica
5. Termina cada respuesta con una pregunta que invite a reflexionar
6. Si hay error, explica POR QUÉ está mal antes de la respuesta correcta

Alineamiento curricular: Sigue los estándares de aprendizaje del {curriculum}."""

def tutor_session(
    student: dict,
    topic: str,
    student_question: str,
    conversation_history: list[dict]
) -> str:
    country = student.get('country', 'MX')
    config = COUNTRY_CONFIGS.get(country, COUNTRY_CONFIGS['MX'])
    
    system_prompt = SOCRATIC_TUTOR_SYSTEM.format(
        country=country,
        language=config['language'],
        curriculum=config['curriculum'],
        grade_level=student.get('grade', 'secundaria')
    )
    
    messages = conversation_history + [
        {"role": "user", "content": f"Estoy estudiando: {topic}.\n{student_question}"}
    ]
    
    response = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1024,
        system=system_prompt,
        messages=messages
    )
    
    return response.content[0].text
```

### Cuándo usar
Ministerio de Educación, edtech LATAM, o sistema escolar privado que quiere AI tutor culturalmente adaptado en español/portugués. Diferenciador frente a soluciones en inglés. Alineado al currículo local.

---

## Quick-Start Matrix — Elegir el patrón correcto

| Situación del cliente | Tiempo disponible | Budget | Patrón recomendado |
|-----------------------|-------------------|--------|---------------------|
| Ya tiene Moodle, quiere AI rápido | 4–8 sem | $80k–$250k | **P1: Moodle AI Copilot** |
| MOOC corporativo >1k learners | 10–16 sem | $200k–$600k | **P2: Open edX Personalized Engine** |
| Cursos async, reemplazar video | 8–14 sem | $150k–$600k | **P3: LectūraAgents Avatar** |
| Corporate training greenfield | 6–10 sem | $100k–$400k | **P4: ClassroomIO + Claude** |
| Universidad, retención estudiantes | 8–14 sem | $120k–$450k | **P5: At-Risk Alert Agent** |
| K-12 / EdTech LATAM en español | 10–16 sem | $80k–$400k | **P6: LATAM AI Tutor** |

---
*Patrones actualizados por el pipeline de ingest. Última actualización: 2026-07-10.*
