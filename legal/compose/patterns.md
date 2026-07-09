# Patrones de composición — Legal Services

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-09 (v5)

## Arquitectura base

```
[Plataforma vertical base (open source: Mike / Suzie Law / Docassemble)]
          ↓
[MCP servers legales: CourtListener / Vaquill / claude-for-legal connectors]
          ↓
[Capa de integración AI / LangGraph]
          ↓
[Agentes especializados: review, research, compliance, drafting]
          ↓
[Human-in-the-loop gates + trazabilidad EU AI Act + audit trail]
          ↓
[UI conversacional / API REST para el cliente]
```

---

## Patrón 1: Agente de investigación legal (RAG multi-jurisdiccional)

**Caso de uso**: Associates de firma de abogados buscan precedentes relevantes en múltiples jurisdicciones vía chat.  
**Stack**: CourtListener MCP + Claude Sonnet 5 + LangGraph + LegalBench-RAG corpus  
**Tiempo estimado**: 2-3 semanas | **Deal size**: $80k-250k

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
        model="claude-sonnet-5",
        max_tokens=4096,
        system="Asistente de investigación legal. Análisis IRAC. Verifica citas.",
        messages=[{"role": "user",
                   "content": f"Busca precedentes para: {state['query']}\nJurisdicción: {state['jurisdiction']}\nÚltimos 5 años."}]
    )
    state["precedents"] = [{"content": response.content[0].text}]
    return state

def analyze_precedents(state: ResearchState) -> ResearchState:
    response = client.messages.create(
        model="claude-sonnet-5",
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

---

## Patrón 2: Revisión automática de contratos con redlines

**Caso de uso**: Legal counsel corporativo detecta riesgos y genera redlines automáticos.  
**Stack**: claude-legal-skill + OpenContracts + CUAD dataset + Anthropic API  
**Tiempo estimado**: 1-2 semanas | **Deal size**: $50k-200k

```python
import anthropic, json
from pathlib import Path

client = anthropic.Anthropic()
CUAD_RISK_CLAUSES = ["Non-Compete", "IP Ownership", "Limitation of Liability",
                     "Termination for Convenience", "Change of Control", "Audit Rights"]

def review_contract(contract_text: str, perspective: str = "buyer") -> dict:
    response = client.messages.create(
        model="claude-sonnet-5",
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

---

## Patrón 3: Entrevista legal guiada con Docassemble + AI

**Caso de uso**: Ciudadanos de bajos recursos acceden a asistencia legal gratuita via chat que genera formularios judiciales.  
**Stack**: Docassemble (MIT) + Claude Haiku + DocuSign  
**Tiempo estimado**: 3-4 semanas | **Deal size**: $80k-250k

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

---

## Patrón 4: Plataforma de litigios masivos (patrón Enter)

**Caso de uso**: Firma escala de 100 a 10,000 demandas/mes (consumidor/laboral) con el mismo equipo.  
**Stack**: FastAPI + LangGraph + PostgreSQL + pgvector + API judicial  
**Tiempo estimado**: 6-8 semanas (MVP con integración judicial básica) | **Deal size**: $200k-800k

```python
from fastapi import FastAPI, BackgroundTasks
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph
from typing import TypedDict

app = FastAPI()
llm = ChatAnthropic(model="claude-sonnet-5")

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

---

## Patrón 5: EU AI Act Compliance Auditor para sistemas legales

**Caso de uso**: Firma europea audita sus sistemas AI antes del deadline 2 agosto 2026.  
**Stack**: Anthropic API + LangGraph + OpenMetadata + OPA  
**Tiempo estimado**: 2-3 semanas | **Deal size**: $80k-300k | **URGENTE: 25 días**

```python
import anthropic
from datetime import date

client = anthropic.Anthropic()
DEADLINE = date(2026, 8, 2)

def audit_ai_system(system_info: dict) -> dict:
    days_left = (DEADLINE - date.today()).days
    r = client.messages.create(
        model="claude-sonnet-5",
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

---

## Patrón 6: Multi-jurisdicción Legal RAG con Vaquill MCP

**Caso de uso**: Firma con clientes en EE.UU., India y Canadá necesita investigación jurisdiccional paralela.  
**Stack**: Claude + Vaquill MCP (US + India + CanLII) + asyncio  
**Tiempo estimado**: 1-2 semanas | **Deal size**: $50k-200k

```python
import anthropic, asyncio

client = anthropic.Anthropic()

SYSTEM = "Experto en derecho comparado. Por jurisdicción: regla aplicable, precedentes clave, tiempo de resolución."

def research_jurisdiction(question: str, jurisdiction: str) -> str:
    r = client.messages.create(
        model="claude-sonnet-5", max_tokens=2048, system=SYSTEM,
        messages=[{"role": "user", "content": f"Investiga en {jurisdiction}: {question}"}]
    )
    return r.content[0].text

async def research_multi(question: str, jurisdictions: list[str]) -> dict:
    loop = asyncio.get_event_loop()
    tasks = [loop.run_in_executor(None, research_jurisdiction, question, j) for j in jurisdictions]
    results = await asyncio.gather(*tasks)
    by_j = dict(zip(jurisdictions, results))

    memo = client.messages.create(
        model="claude-sonnet-5", max_tokens=4096,
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

---

## Patrón 7: Asistente LegalOps para despacho (OpenLawOffice + AI)

**Caso de uso**: Despacho LATAM moderniza su ERP con alertas de vencimientos, transcripción y resumen de audiencias.  
**Stack**: OpenLawOffice (fork Apache-2.0) + Whisper (MIT) + Claude Haiku + FastAPI  
**Tiempo estimado**: 4-5 semanas | **Deal size**: $100k-400k

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

---

## Patrón 8: Benchmark de agentes legales con Harvey LAB

**Caso de uso**: Globant evalúa LLMs en tareas legales reales (Harvey LAB) antes de comprometer con un cliente.  
**Stack**: Harvey LAB + Claude Opus 4.8 + evaluador automatizado  
**Tiempo estimado**: 1 semana (setup + 50-100 tareas por modelo) | **Deal size**: incluido en propuesta

```python
import anthropic, json

client = anthropic.Anthropic()
# Harvey LAB: https://www.harvey.ai/blog/introducing-harveys-legal-agent-benchmark
# 1,200+ tasks, 24 practice areas, 75k+ rubric criteria

def run_lab_task(task: dict, model: str = "claude-opus-4-8") -> dict:
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
        model="claude-sonnet-5", max_tokens=512,
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

---

## Patrón 9: Claude for Legal — Integración con stack enterprise existente

**Caso de uso**: Cliente corporativo ya usa iManage + Ironclad + DocuSign; quiere añadir AI legal sin reemplazar plataformas.  
**Stack**: anthropics/claude-for-legal (Apache 2.0) + MCP connectors + Managed Agents API  
**Tiempo estimado**: 2-3 semanas | **Deal size**: $80k-300k

```python
# anthropics/claude-for-legal — Apache 2.0
# https://github.com/anthropics/claude-for-legal
# 12 plugins, 80+ agents, 20+ MCP connectors

import anthropic
import json

client = anthropic.Anthropic()

# Ejemplo: Usar plugin /review-contract sobre contrato en iManage
def review_contract_with_plugin(matter_id: str, document_ref: str) -> dict:
    """
    Usa el plugin Commercial Legal del claude-for-legal suite.
    Requiere: ANTHROPIC_API_KEY + MCP connector iManage configurado.
    """
    r = client.messages.create(
        model="claude-opus-4-8",
        max_tokens=8192,
        system="""You are a legal AI assistant with access to the claude-for-legal plugin suite.
        Use /review-contract for clause-by-clause analysis with CUAD risk detection.
        Use /triage-nda for rapid NDA pre-screening.
        Always flag: IP Assignment, Limitation of Liability, Non-Compete, Change of Control.
        Include hallucination risk: cite sources, flag uncertainty.""",
        messages=[{
            "role": "user",
            "content": f"/review-contract --matter {matter_id} --doc {document_ref} --perspective buyer --jurisdiction Argentina"
        }]
    )
    return {"matter": matter_id, "review": r.content[0].text}

# Ejemplo: Managed Agent para renewal watcher (background, sin intervención humana)
def setup_renewal_watcher(contracts: list[dict], alert_days: int = 60) -> dict:
    """
    Configura un Managed Agent que monitorea vencimientos de contratos.
    Corre en background en Anthropic servers — no requiere infraestructura propia.
    """
    schedule = {
        "agent_type": "renewal_watcher",
        "contracts": contracts,
        "alert_threshold_days": alert_days,
        "actions": ["email_counsel", "create_ironclad_task", "slack_notify"],
        "mcp_connectors": ["ironclad", "slack", "google_calendar"]
    }
    # En producción: usar Managed Agents API de Anthropic
    r = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        system="Contrato renewal watcher. Identifica vencimientos próximos y genera alertas.",
        messages=[{"role": "user", "content": f"Analiza vencimientos: {json.dumps(contracts[:5])}\n\nAlerta si < {alert_days} días."}]
    )
    return {"schedule": schedule, "preview": r.content[0].text}

# Demo de integración completa
contracts_sample = [
    {"id": "CLO-2024-001", "vendor": "AWS", "renewal_date": "2026-09-15", "value": 250000},
    {"id": "CLO-2024-042", "vendor": "Salesforce", "renewal_date": "2026-08-01", "value": 180000},
]

review = review_contract_with_plugin("M-2026-438", "NDA-ACME-v3.docx")
watcher = setup_renewal_watcher(contracts_sample, alert_days=60)

print("Review:", review["review"][:200])
print("Watcher preview:", watcher["preview"][:200])
```

---

## Patrón 10: Self-hosted Legal AI Platform (Suzie Law / Mike fork para cliente)

**Caso de uso**: Firma de abogados quiere plataforma legal AI propia, sin depender de Harvey/LexisNexis, con datos on-premise.  
**Stack**: Suzie Law (Apache-2.0) fork + Claude API + PostgreSQL + jurisdicción LATAM  
**Tiempo estimado**: 4-6 semanas (MVP + 2 jurisdicciones) | **Deal size**: $150k-600k

```bash
# Paso 1: Fork y setup de Suzie Law
git clone https://github.com/firelex/suzielaw.git client-legal-platform
cd client-legal-platform

# Paso 2: Configurar para jurisdicción LATAM (Argentina/Brasil/México)
cp config/jurisdictions/example.json config/jurisdictions/argentina.json
# Editar: nombre, sistema judicial, tipos de documentos, cláusulas de riesgo locales

# Paso 3: Configurar API key y base de datos
cp .env.example .env
# ANTHROPIC_API_KEY=sk-ant-...
# DATABASE_URL=postgresql://...
# JURISDICTION=argentina
# DEFAULT_LANGUAGE=es

# Paso 4: Agregar workflows LATAM específicos
# src/workflows/latam/
#   demanda-laboral.ts
#   contrato-suministro.ts
#   reforma-tributaria-brasil.ts
```

```typescript
// src/personas/latam-laboral.ts
// Persona especializada en derecho laboral LATAM para Suzie Law

export const LATAMLaboral = {
  name: "Asistente Laboral LATAM",
  systemPrompt: `Eres un abogado laboralista experto en:
    - Argentina: LCT (Ley 20.744), Ley 24.013, convenios colectivos
    - Brasil: CLT (Decreto-Lei 5.452/1943), reforma laboral 2017, IBS/CBS 2026
    - México: LFT (DOF 2021), NOM-035 STPS, subcontratación
    Siempre indica: jurisdicción aplicable, plazo de prescripción, probabilidad de éxito,
    documentos necesarios, y si hay reforma reciente relevante.
    IMPORTANTE: Eres un asistente AI — las decisiones finales requieren supervisión de abogado habilitado.`,
  tools: ["draft-demand", "calculate-compensation", "check-precedents", "generate-timeline"],
  jurisdictions: ["Argentina", "Brasil", "México", "Colombia", "Chile"],
  language: "es"
};
```

```python
# Evaluación de calidad con LRAGE antes de ir a producción
# github.com/hoorangyee/LRAGE — MIT

from lrage import LRAGEEvaluator

evaluator = LRAGEEvaluator(
    benchmark="legalbench",        # También: lawbench, kbl
    retriever="bm25",              # O: faiss, hybrid
    corpus="pile_of_law_latam",    # Corpus legal español
    agent_framework="smolagents"   # Para agentes multi-step
)

# Evaluar el sistema antes de entregarlo al cliente
results = evaluator.run(
    system_under_test="http://localhost:3000/api/legal-query",
    n_samples=100,
    language="es",
    jurisdiction="argentina"
)

print(f"RAG Score: {results['retrieval_f1']:.2%}")
print(f"Answer Accuracy: {results['answer_accuracy']:.2%}")
print(f"Hallucination Rate: {results['hallucination_rate']:.2%}")
# Target: hallucination_rate < 10% antes de producción (HAQQ-LAB benchmark: 24% industria)
```

---

## Patrón 11: GLAW — Despacho virtual AI completo (patrón legal skills)

**Caso de uso**: Firma quiere un despacho virtual operativo desde día 1, con 10 departamentos, pipeline de matters y human gates — sin construir desde cero.  
**Stack**: GLAW (MIT) + Claude Code + CourtListener MCP + APIs locales LATAM  
**Tiempo estimado**: 1-2 semanas (setup + localización LATAM) | **Deal size**: $60k-250k

```bash
# Paso 1: Instalar GLAW como skill en Claude Code
# github.com/lawve-ai/glaw — MIT
git clone https://github.com/lawve-ai/glaw .claude/skills/glaw

# GLAW incluye 10 departamentos:
# 1. Intake & Conflicts    2. Corporate & M&A      3. Litigation & Disputes
# 4. Employment & Labor    5. Regulatory & Compliance  6. IP & Tech
# 7. Real Estate           8. Finance & Tax         9. Privacy & Data
# 10. Management & Billing
```

```python
# Paso 2: Iniciar un matter con el pipeline hard-gated de GLAW
import anthropic

client = anthropic.Anthropic()

def open_matter(client_name: str, matter_type: str, jurisdiction: str) -> dict:
    """
    GLAW hard-gated matter pipeline:
    intake → conflicts check → assignment → work product → human gate → delivery
    """
    r = client.messages.create(
        model="claude-opus-4-8",
        max_tokens=4096,
        system="""You are GLAW, a virtual law firm with 10 specialized departments.
        Follow the hard-gated matter pipeline:
        1. INTAKE: Capture matter details, client info, deadline
        2. CONFLICTS: Check for conflicts of interest (flag if found → STOP for human review)
        3. ASSIGN: Route to appropriate department based on matter_type
        4. WORK PRODUCT: Draft deliverable (memo, contract, analysis)
        5. HUMAN GATE: Flag for attorney review before delivery
        Generate attorney work-product, not legal advice.
        Always cite jurisdiction and applicable law.""",
        messages=[{"role": "user",
                   "content": f"Open matter: Client={client_name}, Type={matter_type}, Jurisdiction={jurisdiction}\n"
                              f"Follow GLAW pipeline. Flag conflicts immediately. Generate work product."}]
    )
    return {"matter": f"GLAW-{client_name[:4].upper()}-001", "pipeline": r.content[0].text}

# Paso 3: Extender GLAW con departamento LATAM específico
latam_department_skill = """
# LATAM-Laboral Department — GLAW Extension
## Jurisdiction Coverage
- Argentina: LCT Ley 20.744, Ley 24.013, paritarias sectoriales
- Brasil: CLT, Reforma Trabalhista 2017, NR-1 atualizada 2025
- México: LFT DOF 2021, NOM-035 STPS, reforma subcontratación
- Colombia: CST, Decreto 2011/2017, normas de teletrabajo

## Matter Types
- wrongful-termination: calcular liquidación + probabilidad éxito + demanda draft
- workplace-harassment: protocolo NOM-035 + denuncia + medidas cautelares
- collective-bargaining: análisis paritarias + benchmarks sectoriales

## Human Gates
- Compensaciones > $50k USD → revisión senior obligatoria
- Acciones colectivas (>20 trabajadores) → partner approval
- Jurisdicción múltiple → specialist review en cada jurisdicción
"""

# Guardar como extensión de GLAW
with open(".claude/skills/glaw/departments/latam-laboral.md", "w") as f:
    f.write(latam_department_skill)
```

```python
# Paso 4: Fraud dossier automático (feature nativa de GLAW)
def generate_fraud_dossier(entity: str, transaction_data: dict) -> dict:
    """GLAW incluye fraud dossier generation integrado."""
    r = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=6144,
        system="""GLAW Fraud & Compliance Department.
        Generate structured fraud dossier: entity profile, red flags, transaction analysis,
        regulatory exposure (FCPA, UK Bribery Act, ley anti-corrupción AR/BR/MX),
        recommended actions, evidence preservation checklist.
        Source-first bookkeeping: cite all data sources.""",
        messages=[{"role": "user",
                   "content": f"Fraud dossier: {entity}\nTransactions: {transaction_data}"}]
    )
    return {"entity": entity, "dossier": r.content[0].text, "status": "HUMAN_GATE_REQUIRED"}

# Paso 5: OCR orchestration (GLAW integra OCR con Claude)
def process_legal_document(pdf_path: str) -> dict:
    """GLAW pipeline: OCR → extract → classify → route."""
    import base64
    with open(pdf_path, "rb") as f:
        pdf_data = base64.standard_b64encode(f.read()).decode("utf-8")
    
    r = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        messages=[{"role": "user",
                   "content": [
                       {"type": "document", "source": {"type": "base64", "media_type": "application/pdf", "data": pdf_data}},
                       {"type": "text", "text": "GLAW document intake: extract key data, classify document type, identify parties, extract deadlines, route to department."}
                   ]}]
    )
    return {"document": pdf_path, "extraction": r.content[0].text}

# Demo completo
matter = open_matter("ACME Corp", "employment-dispute", "Argentina")
print(f"Matter ID: {matter['matter']}")
print(matter['pipeline'][:500])
```

---

## Patrón 12: MCP Jurisdiccional LATAM (patrón Korean Law MCP)

**Caso de uso**: Globant construye MCPs propios para sistemas judiciales LATAM — el primer paso para un moat de datos jurisdicional.  
**Stack**: FastAPI + Claude + APIs judiciales locales + MCP SDK  
**Tiempo estimado**: 2-3 semanas por jurisdicción | **Deal size**: $40k-150k (+ IP propio reutilizable)

```python
# Modelo: chrisryugj/korean-law-mcp (2.1k★) adaptado a LATAM
# Misma arquitectura, distintas fuentes de datos

# Paso 1: Estructura MCP servidor para Argentina (CEJAT)
# Inspirado en korean-law-mcp: empezar con muchas tools y simplificar

from mcp import Server
from mcp.types import Tool, TextContent
import httpx

app = Server("cejat-argentina-mcp")

@app.list_tools()
async def list_tools():
    return [
        Tool(name="search_jurisprudencia", description="Busca jurisprudencia en CEJAT Argentina",
             inputSchema={"type": "object", "properties": {
                 "query": {"type": "string"}, "tribunal": {"type": "string"},
                 "fecha_desde": {"type": "string"}, "fecha_hasta": {"type": "string"}}}),
        Tool(name="get_expediente", description="Obtiene estado de expediente judicial",
             inputSchema={"type": "object", "properties": {
                 "numero_expediente": {"type": "string"}, "jurisdiccion": {"type": "string"}}}),
        Tool(name="verify_cita", description="Verifica si una cita legal existe y es correcta (anti-hallucination)",
             inputSchema={"type": "object", "properties": {
                 "cita": {"type": "string"}, "tipo": {"type": "string"}}}),
        Tool(name="get_plazo_procesal", description="Calcula plazos procesales con días hábiles",
             inputSchema={"type": "object", "properties": {
                 "fecha_inicio": {"type": "string"}, "tipo_proceso": {"type": "string"}}}),
    ]

@app.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "verify_cita":
        # Anti-hallucination: verificar que la cita legal existe
        async with httpx.AsyncClient() as http:
            r = await http.get(
                f"https://www.saij.gob.ar/busqueda?tipo-documento=jurisprudencia&texto={arguments['cita']}"
            )
        return [TextContent(type="text", text=f"Verificación SAIJ: {'ENCONTRADA' if r.status_code == 200 else 'NO ENCONTRADA'}\n{arguments['cita']}")]
    # ... otras tools
    return [TextContent(type="text", text=f"Tool {name} called")]

# Ejecutar servidor MCP
if __name__ == "__main__":
    import asyncio
    from mcp.server.stdio import stdio_server
    asyncio.run(stdio_server(app))
```

```bash
# Configurar en Claude Code / Claude Desktop
# ~/.claude/claude_desktop_config.json
{
  "mcpServers": {
    "cejat-argentina": {
      "command": "python",
      "args": ["/path/to/cejat_mcp_server.py"],
      "env": {"CEJAT_API_KEY": "..."}
    }
  }
}

# Una vez configurado, Claude tiene acceso nativo a jurisprudencia argentina:
# "Busca precedentes sobre responsabilidad civil por IA en los últimos 3 años en la CSJN"
```

---

## Matriz de selección de patrón

| Situación del cliente | Deal size | Patrón recomendado | Stack clave |
|----------------------|-----------|-------------------|-------------|
| Firma enterprise, stack iManage/Ironclad/DocuSign | $80k-300k | P9 claude-for-legal integration | anthropics/claude-for-legal + MCP |
| Firma quiere plataforma propia sin datos en cloud externo | $150k-600k | P10 Suzie Law fork | firelex/suzielaw + Anthropic API |
| Firma LATAM con 10k+ litigios/mes | $200k-800k | P4 Mass litigation platform | LangGraph + pgvector + API judicial |
| Legal counsel corporativo, revisión contractual | $50k-200k | P2 Contract review | claude-legal-skill + CUAD |
| Investigación legal multi-jurisdicción | $50k-200k | P1 RAG multi-jurisdiction | CourtListener MCP + LangGraph |
| Acceso a justicia / pro-bono | $80k-250k | P3 Docassemble + AI | Docassemble + Claude Haiku |
| Despacho LATAM, modernizar ERP | $100k-400k | P7 LegalOps ERP | OpenLawOffice + Whisper |
| Cliente UE, deadline EU AI Act (**24 días**) | $80k-300k | P5 EU AI Act auditor | Anthropic API + audit pipeline |
| Multi-jurisdicción internacional | $50k-200k | P6 Vaquill MCP | Vaquill US+India+CanLII |
| Pre-venta: evaluar LLMs legales | Incluido | P8 Harvey LAB benchmark | Harvey LAB + Claude Opus 4.8 |
| Firma pequeña/media quiere despacho virtual desde día 1 | $60k-250k | **P11 GLAW virtual law firm** | GLAW + Claude Code + MCP |
| Globant quiere construir moat de datos LATAM | $40k-150k/jurisdicción | **P12 MCP jurisdiccional LATAM** | FastAPI + APIs judiciales + MCP SDK |
