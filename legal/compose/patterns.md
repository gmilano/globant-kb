# Patrones de composición — Legal Services

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-08 (v3)

## Arquitectura base

```
[Plataforma vertical base (open source)]      [MCP servers legales]
          ↓                                           ↓
[Capa de integración AI / LangGraph]  ←────  [CourtListener / Vaquill]
          ↓
[Agentes especializados: review, research, compliance]
          ↓
[Human-in-the-loop gates + trazabilidad EU AI Act]
          ↓
[UI conversacional / API REST para el cliente]
```

---

## Patrón 1: Agente de investigación legal (RAG multi-jurisdiccional)

**Caso de uso**: Associates de firma de abogados buscan precedentes relevantes en múltiples jurisdicciones vía chat.  
**Stack**: CourtListener MCP + Claude claude-sonnet-5 + LangGraph + LegalBench-RAG corpus

```python
from anthropic import Anthropic
from langgraph.graph import StateGraph, END
from typing import TypedDict

client = Anthropic()

class ResearchState(TypedDict):
    query: str
    jurisdiction: str
    precedents: list[dict]
    memo: str

def search_precedents(state: ResearchState) -> ResearchState:
    response = client.messages.create(
        model="claude-sonnet-5-20261001",
        max_tokens=4096,
        system="Asistente de investigación legal. Análisis IRAC. Verifica citas.",
        messages=[{"role": "user",
                   "content": f"Busca precedentes para: {state['query']}\nJurisdicción: {state['jurisdiction']}\nÚltimos 5 años."}]
    )
    state["precedents"] = [{"content": response.content[0].text}]
    return state

def analyze_precedents(state: ResearchState) -> ResearchState:
    response = client.messages.create(
        model="claude-sonnet-5-20261001",
        max_tokens=8192,
        messages=[{"role": "user",
                   "content": f"Analiza precedentes para: {state['query']}\n\n{state['precedents']}\n\nMemo legal: resumen ejecutivo, precedentes clave, tendencia, recomendación, riesgos."}]
    )
    state["memo"] = response.content[0].text
    return state

graph = StateGraph(ResearchState)
graph.add_node("search", search_precedents)
graph.add_node("analyze", analyze_precedents)
graph.add_edge("search", "analyze")
graph.add_edge("analyze", END)
graph.set_entry_point("search")
research_agent = graph.compile()

result = research_agent.invoke({
    "query": "responsabilidad civil por uso de AI en decisiones medicas",
    "jurisdiction": "Argentina", "precedents": [], "memo": ""
})
print(result["memo"])
```

**Tiempo estimado**: 2-3 semanas

---

## Patrón 2: Revisión automática de contratos con redlines

**Caso de uso**: Legal counsel corporativo detecta riesgos y genera redlines automáticos.  
**Stack**: claude-legal-skill + OpenContracts + CUAD dataset + Anthropic API

```python
import anthropic, json
from pathlib import Path

client = anthropic.Anthropic()
CUAD_RISK_CLAUSES = ["Non-Compete", "IP Ownership", "Limitation of Liability",
                     "Termination for Convenience", "Change of Control", "Audit Rights"]

def review_contract(contract_text: str, perspective: str = "buyer") -> dict:
    response = client.messages.create(
        model="claude-sonnet-5-20261001",
        max_tokens=8192,
        system=f"Abogado corporativo experto. Perspectiva: {perspective}. "
               f"Por cláusula: tipo CUAD, riesgo ALTO/MEDIO/BAJO, explicación, redline. "
               f"Prioriza: {', '.join(CUAD_RISK_CLAUSES)}",
        messages=[{"role": "user",
                   "content": f"Revisa:\n\n{contract_text}\n\nJSON: {{resumen_ejecutivo, nivel_riesgo_global, clausulas: [{{tipo, riesgo, explicacion, redline}}], recomendacion}}"}]
    )
    content = response.content[0].text
    try:
        return json.loads(content[content.find('{'):content.rfind('}')+1])
    except json.JSONDecodeError:
        return {"raw": content}

analysis = review_contract(Path("contrato.txt").read_text(encoding="utf-8"))
print(f"Riesgo global: {analysis.get('nivel_riesgo_global')}")
```

**Tiempo estimado**: 1-2 semanas

---

## Patrón 3: Entrevista legal guiada con Docassemble + AI

**Caso de uso**: Ciudadanos de bajos recursos acceden a asistencia legal gratuita via chat que genera formularios judiciales.  
**Stack**: Docassemble (MIT) + Claude Haiku + DocuSign

```yaml
# entrevista_demanda_laboral.yml
metadata:
  title: Demanda Laboral — Asistente AI
---
modules:
  - .ai_helper
---
question: |
  Bienvenido. ¿Cuál es tu problema laboral?
fields:
  - Descripción: problema_descripcion
    datatype: area
---
code: |
  clasificacion = ai_classify_legal_issue(problema_descripcion)
  tipo_demanda = clasificacion["tipo"]
  documentos_necesarios = clasificacion["documentos"]
```

```python
# ai_helper.py
import anthropic, json
client = anthropic.Anthropic()

def ai_classify_legal_issue(descripcion: str) -> dict:
    r = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        system="Clasifica problema laboral. JSON: {tipo, urgencia, documentos, plazo_prescripcion_dias}",
        messages=[{"role": "user", "content": descripcion}]
    )
    return json.loads(r.content[0].text)
```

**Tiempo estimado**: 3-4 semanas

---

## Patrón 4: Plataforma de litigios masivos (patrón Enter)

**Caso de uso**: Firma escala de 100 a 10,000 demandas/mes (consumidor/laboral) con el mismo equipo.  
**Stack**: FastAPI + LangGraph + PostgreSQL + pgvector + API judicial

```python
from fastapi import FastAPI, BackgroundTasks
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph
from typing import TypedDict

app = FastAPI()
llm = ChatAnthropic(model="claude-sonnet-5-20261001")

class LitigioState(TypedDict):
    cliente_id: str
    tipo_demanda: str
    hechos: str
    monto_reclamado: float
    demanda_draft: str
    probabilidad_exito: float

async def extraer_hechos(state):
    await llm.ainvoke(f"Estructura hechos {state['tipo_demanda']}: {state['hechos']}")
    return state

async def evaluar_viabilidad(state):
    await llm.ainvoke(f"Evalúa viabilidad {state['tipo_demanda']} jurisprudencia argentina. Probabilidad 0-1.")
    state["probabilidad_exito"] = 0.75
    return state

async def redactar_demanda(state):
    r = await llm.ainvoke(
        f"Demanda formal {state['tipo_demanda']} Poder Judicial Argentina.\n"
        f"Hechos: {state['hechos']}\nMonto: ${state['monto_reclamado']}\n"
        f"Incluye: encabezado, hechos, derecho, petitorio, firma."
    )
    state["demanda_draft"] = r.content
    return state

graph = StateGraph(LitigioState)
for name, fn in [("extraer_hechos", extraer_hechos), ("evaluar_viabilidad", evaluar_viabilidad), ("redactar_demanda", redactar_demanda)]:
    graph.add_node(name, fn)
graph.add_edge("extraer_hechos", "evaluar_viabilidad")
graph.add_edge("evaluar_viabilidad", "redactar_demanda")
graph.set_entry_point("extraer_hechos")
pipeline = graph.compile()

@app.post("/litigio/iniciar")
async def iniciar(cliente_id: str, tipo: str, hechos: str, monto: float, bg: BackgroundTasks):
    state = LitigioState(cliente_id=cliente_id, tipo_demanda=tipo, hechos=hechos,
                         monto_reclamado=monto, demanda_draft="", probabilidad_exito=0.0)
    bg.add_task(pipeline.ainvoke, state)
    return {"status": "procesando", "id": f"LIT-{cliente_id}"}
```

**Tiempo estimado**: 6-8 semanas (MVP con integración judicial básica)

---

## Patrón 5: EU AI Act Compliance Auditor para sistemas legales

**Caso de uso**: Firma europea audita sus sistemas AI antes del deadline 2 agosto 2026.  
**Stack**: Anthropic API + LangGraph + OpenMetadata + OPA

```python
import anthropic
from datetime import date

client = anthropic.Anthropic()
DEADLINE = date(2026, 8, 2)

def audit_ai_system(system_info: dict) -> dict:
    days_left = (DEADLINE - date.today()).days
    r = client.messages.create(
        model="claude-sonnet-5-20261001",
        max_tokens=4096,
        system="""Experto EU AI Act (UE 2024/1689). Sistemas legales = Anexo III alto riesgo.
        Checklist: registro EU, doc técnica (Art.11), supervisión humana (Art.14),
        transparencia (Art.13), riesgos (Art.9), datos (Art.10), logs (Art.12), conformidad (Art.43).
        Penalidad: €35M o 7% ingresos globales.""",
        messages=[{"role": "user", "content":
            f"Audita: {system_info}\n\nGenera: clasificación riesgo, checklist, "
            f"gaps críticos ({days_left} días al deadline), plan de acción priorizado."}]
    )
    return {"report": r.content[0].text, "days_to_deadline": days_left}

audit = audit_ai_system({
    "nombre": "Legal Research Assistant v2",
    "descripcion": "Asiste a jueces en análisis de precedentes",
    "modelo": "claude-sonnet-5", "nivel_autonomia": "recomendaciones",
    "usuarios": "jueces", "jurisdiccion": "España, Italia, Francia"
})
print(f"{audit['days_to_deadline']} días al deadline EU AI Act")
```

**Tiempo estimado**: 2-3 semanas

---

## Patrón 6: Multi-jurisdicción Legal RAG con Vaquill MCP

**Caso de uso**: Firma con clientes en EE.UU., India y Canadá necesita investigación jurisdiccional paralela.  
**Stack**: Claude + Vaquill MCP (US + India + CanLII) + asyncio

```python
import anthropic, asyncio

client = anthropic.Anthropic()

SYSTEM = "Experto en derecho comparado. Por jurisdicción: regla aplicable, precedentes clave, tiempo de resolución."

def research_jurisdiction(question: str, jurisdiction: str) -> str:
    r = client.messages.create(
        model="claude-sonnet-5-20261001", max_tokens=2048, system=SYSTEM,
        messages=[{"role": "user", "content": f"Investiga en {jurisdiction}: {question}"}]
    )
    return r.content[0].text

async def research_multi(question: str, jurisdictions: list[str]) -> dict:
    loop = asyncio.get_event_loop()
    tasks = [loop.run_in_executor(None, research_jurisdiction, question, j) for j in jurisdictions]
    results = await asyncio.gather(*tasks)
    by_j = dict(zip(jurisdictions, results))

    memo = client.messages.create(
        model="claude-sonnet-5-20261001", max_tokens=4096,
        messages=[{"role": "user",
                   "content": f"Síntesis comparativa:\n{by_j}\n\nTabla comparativa + jurisdicción recomendada."}]
    )
    return {"by_jurisdiction": by_j, "comparative_memo": memo.content[0].text}

result = asyncio.run(research_multi(
    "patent infringement liability for AI-generated prior art",
    ["United States", "India", "Canada"]
))
print(result["comparative_memo"])
```

**Tiempo estimado**: 1-2 semanas

---

## Patrón 7: Asistente LegalOps para despacho (OpenLawOffice + AI)

**Caso de uso**: Despacho LATAM moderniza su ERP con alertas de vencimientos, transcripción y resumen de audiencias.  
**Stack**: OpenLawOffice (fork Apache-2.0) + Whisper (MIT) + Claude Haiku + FastAPI

```python
import anthropic, json
from datetime import datetime

client = anthropic.Anthropic()

def transcribe_audiencia(audio_path: str) -> str:
    import whisper
    return whisper.load_model("medium").transcribe(audio_path, language="es")["text"]

def resumir_audiencia(transcripcion: str, caso_id: str) -> dict:
    r = client.messages.create(
        model="claude-haiku-4-5-20251001", max_tokens=1024,
        messages=[{"role": "user",
                   "content": f"Resumen audiencia {caso_id}:\n{transcripcion[:8000]}\n\n"
                              f"JSON: {{tipo_audiencia, partes_presentes, resoluciones, proxima_fecha, tareas_pendientes}}"}]
    )
    return json.loads(r.content[0].text)

def alertas_vencimientos(casos: list[dict]) -> list[dict]:
    alertas = []
    for c in casos:
        dias = (datetime.fromisoformat(c["proximo_vencimiento"]) - datetime.now()).days
        nivel = "CRITICO" if dias <= 5 else "URGENTE" if dias <= 15 else "PREVENTIVO" if dias <= 30 else None
        if nivel:
            alertas.append({"caso_id": c["id"], "nivel": nivel, "dias": dias, "accion": c["tipo_vencimiento"]})
    return sorted(alertas, key=lambda x: x["dias"])

from fastapi import FastAPI
app = FastAPI()

@app.post("/audiencia/procesar")
async def procesar(audio_path: str, caso_id: str):
    return {"caso_id": caso_id, "resumen": resumir_audiencia(transcribe_audiencia(audio_path), caso_id)}
```

**Tiempo estimado**: 4-5 semanas

---

## Patrón 8: Benchmark de agentes legales con Harvey LAB

**Caso de uso**: Globant evalúa LLMs en tareas legales reales (Harvey LAB) antes de comprometer con un cliente.  
**Stack**: Harvey LAB + Claude Sonnet 5 + evaluador automatizado

```python
import anthropic, json

client = anthropic.Anthropic()
# Harvey LAB: https://www.harvey.ai/blog/introducing-harveys-legal-agent-benchmark
# 1,200+ tasks, 24 practice areas, 75k+ rubric criteria

def run_lab_task(task: dict, model: str = "claude-sonnet-5-20261001") -> dict:
    r = client.messages.create(
        model=model, max_tokens=8192,
        system=f"Agente legal experto en {task['practice_area']}. Razona paso a paso.",
        messages=[{"role": "user",
                   "content": f"LAB #{task['id']} — {task['practice_area']}\n{task.get('context','')}\n{task['instruction']}"}]
    )
    return {"task_id": task["id"], "model": model, "response": r.content[0].text,
            "tokens": r.usage.input_tokens + r.usage.output_tokens}

def evaluate_with_rubric(result: dict, rubric: list[str]) -> float:
    r = client.messages.create(
        model="claude-sonnet-5-20261001", max_tokens=512,
        system="Evalúa agente legal. JSON: {scores: [0|1,...], total: int}",
        messages=[{"role": "user",
                   "content": f"Output: {result['response'][:4000]}\n\nCriterios: {json.dumps(rubric)}"}]
    )
    data = json.loads(r.content[0].text)
    return data["total"] / len(rubric)

task = {
    "id": "LAB-CONTRACT-042", "practice_area": "Contract Law",
    "instruction": "Review this NDA and identify the 5 highest-risk clauses for a startup target",
    "context": "Target is a Series A startup; acquirer is Fortune 500",
    "rubric_criteria": [
        "Identifies IP assignment clause as high risk",
        "Flags non-compete scope and duration",
        "Notes absence of survival clause for confidentiality",
        "Highlights data processing obligations under GDPR",
        "Identifies indemnification asymmetry"
    ]
}
result = run_lab_task(task)
score = evaluate_with_rubric(result, task["rubric_criteria"])
print(f"Puntuación LAB: {score:.2%} — {result['model']}")
```

**Tiempo estimado**: 1 semana (setup + 50-100 tareas por modelo)
