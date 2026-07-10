# Patrones de composición — Legal Services

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-10 (v7)

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

## Patrón 5: EU AI Act Compliance Auditor — Clasificación HRAIS (v7 updated)

**Caso de uso**: Firma audita sus sistemas AI para clasificar si son "Anexo III built-in" (deadline 2 ago 2026) o "Anexo III por uso" (deadline 2 dic 2027) — distinción crítica tras el Digital AI Omnibus (Consejo 29 jun 2026).  
**Stack**: Anthropic API + LangGraph + OpenMetadata + OPA  
**Tiempo estimado**: 2-3 semanas | **Deal size**: $80k-300k

```python
import anthropic
from datetime import date

client = anthropic.Anthropic()

DEADLINES = {
    "built_in": date(2026, 8, 2),       # Anexo III por diseño — sin cambio
    "per_use": date(2027, 12, 2),        # Anexo III por uso — Digital Omnibus +16 meses
    "watermarking": date(2026, 12, 2),   # Transparencia IA generativa — adelantado 3 meses
}

def classify_and_audit_ai_system(system_info: dict) -> dict:
    today = date.today()
    
    # Paso 1: Clasificar categoría HRAIS del sistema
    classification = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system="""Experto EU AI Act (UE 2024/1689) y Digital AI Omnibus (Consejo 29-jun-2026).
        
        CLASIFICACIÓN HRAIS (Artículo 6):
        - "built_in": el sistema tiene propósito de alto riesgo POR DISEÑO (ej: sistema de scoring judicial)
        - "per_use": el sistema de propósito general se usa en contexto de alto riesgo (ej: abogado usa LLM general)
        
        DEADLINE built_in = 2 agosto 2026 (INMEDIATO)
        DEADLINE per_use = 2 diciembre 2027 (+16 meses, Digital Omnibus aprobado)
        
        Clasifica el sistema y genera checklist de cumplimiento para su categoría.
        JSON: {categoria, deadline, checklist_art, gaps_criticos, plan_priorizado}""",
        messages=[{"role": "user", "content":
            f"Clasifica y audita:\n{system_info}\n\n"
            f"Fecha actual: {today.isoformat()}. Responde en JSON."}]
    )
    
    import json
    result = json.loads(classification.content[0].text)
    deadline = DEADLINES.get(result.get("categoria", "per_use"), DEADLINES["per_use"])
    result["days_to_deadline"] = (deadline - today).days
    return result

audit = classify_and_audit_ai_system({
    "nombre": "Legal Research Assistant v2",
    "descripcion": "LLM de propósito general que los abogados usan para investigar precedentes",
    "modelo": "claude-sonnet-5", "nivel_autonomia": "recomendaciones (requiere revisión abogado)",
    "usuarios": "abogados de la firma", "jurisdiccion": "España, Italia, Francia",
    "proposito_original": "asistente AI general — no diseñado específicamente para uso judicial"
})
print(f"Categoría: {audit.get('categoria')} | Deadline: {audit.get('deadline')} | Días: {audit.get('days_to_deadline')}")
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

---

## Patrón 15: Legal Data Hunter — Investigación global en 108 países (v7)

**Caso de uso**: Firma con presencia multinacional necesita investigar precedentes en múltiples jurisdicciones simultáneamente, incluyendo LATAM.  
**Stack**: Legal Data Hunter MCP + Claude Sonnet 5 + LangGraph + FOLIO MCP  
**Tiempo estimado**: 1-2 semanas | **Deal size**: $50k-150k

```python
import anthropic
import asyncio

client = anthropic.Anthropic()

# Legal Data Hunter: 18.6M+ docs, 108 countries — legaldatahunter.com
# FOLIO MCP: 18,000+ conceptos legales, etiquetas ES/FR/JA — github.com/alea-institute/folio-mcp

SYSTEM_GLOBAL_RESEARCH = """Eres un investigador legal global con acceso a:
- Legal Data Hunter: 18.6M+ documentos en 108 países (decisiones judiciales, leyes, regulaciones)
- FOLIO Ontología: 18,000+ conceptos legales en EN/ES/FR/JA/ZH/HI
- CourtListener: 8M+ opiniones EE.UU.

Para cada jurisdicción consultada:
1. Clasifica la pregunta legal usando FOLIO (identifica el área + tipo documental)
2. Busca en Legal Data Hunter con filtros por país y tribunal
3. Sintetiza con análisis comparativo
4. Verifica citas antes de incluir (anti-hallucination)"""

def research_global(query: str, countries: list[str], language: str = "es") -> dict:
    country_filter = ", ".join(countries)
    r = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=8192,
        system=SYSTEM_GLOBAL_RESEARCH,
        messages=[{"role": "user",
                   "content": f"Query: {query}\nPaíses: {country_filter}\nIdioma de respuesta: {language}\n\n"
                              f"1. Clasifica la consulta con FOLIO ontología\n"
                              f"2. Busca en Legal Data Hunter filtrando por: {country_filter}\n"
                              f"3. Sintetiza hallazgos comparativos\n"
                              f"4. Identifica similitudes y divergencias entre jurisdicciones"}]
    )
    return {"query": query, "countries": countries, "synthesis": r.content[0].text}

def research_latam_employment(query: str) -> dict:
    """Investigación laboral LATAM: AR + BR + MX + CO + CL en español."""
    return research_global(
        query=query,
        countries=["Argentina", "Brazil", "Mexico", "Colombia", "Chile"],
        language="es"
    )

# Ejemplo: investigación de regulación de trabajo remoto en LATAM
result = research_latam_employment(
    "¿Cuáles son las obligaciones del empleador en trabajo remoto/teletrabajo? "
    "Incluye plazos de notificación, cobertura de gastos y derecho a la desconexión."
)
print(result["synthesis"][:1000])
```

```python
# Integración con FOLIO MCP para clasificación automática
# Requiere: folio-mcp server corriendo (github.com/alea-institute/folio-mcp)

def classify_and_route_legal_query(query: str, jurisdiction: str) -> dict:
    """
    Usa FOLIO MCP para clasificar la query y determinar qué tipo de búsqueda realizar.
    Las etiquetas en español hacen de FOLIO ideal para LATAM.
    """
    classification = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        system="""Usa la ontología FOLIO para clasificar esta consulta legal.
        Identifica: area_de_practica, tipo_documental (sentencia/ley/reglamento/contrato),
        especialidad_jurisdiccional.
        JSON: {folio_concept_id, area_practica, tipo_documental, mcp_search_strategy}""",
        messages=[{"role": "user",
                   "content": f"Clasifica con FOLIO: '{query}' en jurisdicción {jurisdiction}"}]
    )
    
    import json
    folio_class = json.loads(classification.content[0].text)
    
    # Usar clasificación FOLIO para routing inteligente
    strategy = folio_class.get("mcp_search_strategy", "legal_data_hunter")
    
    if strategy == "courtlistener":
        mcp_note = "→ Route a CourtListener MCP (8M+ opiniones EE.UU.)"
    elif strategy == "legal_data_hunter":
        mcp_note = f"→ Route a Legal Data Hunter MCP (buscar: {jurisdiction})"
    else:
        mcp_note = "→ Route a FOLIO + búsqueda general"
    
    return {**folio_class, "routing": mcp_note, "jurisdiction": jurisdiction}

# Demo
classification = classify_and_route_legal_query(
    "responsabilidad civil del empleador por accidentes de teletrabajo",
    "Argentina"
)
print(f"FOLIO concept: {classification.get('folio_concept_id')}")
print(f"Área: {classification.get('area_practica')}")
print(f"Routing: {classification.get('routing')}")
```

---

## Patrón 16: FOLIO MCP Ontology — Clasificación legal automática en español (v7)

**Caso de uso**: Pipeline de intake de documentos legales que clasifica automáticamente contratos, sentencias y regulaciones usando la ontología FOLIO — sin entrenamiento propio y con etiquetas en español para LATAM.  
**Stack**: FOLIO MCP (MIT) + Claude Haiku + OpenContracts + LangGraph  
**Tiempo estimado**: 1-2 semanas | **Deal size**: $30k-100k (incluido en proyectos mayores)

```python
import anthropic
import json
from pathlib import Path

client = anthropic.Anthropic()

# FOLIO MCP: github.com/alea-institute/folio-mcp (MIT)
# 18,000+ conceptos, etiquetas EN/ES/FR/JA/ZH/HI
# 12 tools: search_concepts, browse_taxonomy, get_concept_details, find_semantic_connections
# 11 prompt templates para clasificación legal

FOLIO_CLASSIFICATION_PROMPT = """Usando la ontología FOLIO (Federated Open Legal Information Ontology) con sus 18,000+ conceptos legales:

1. IDENTIFICA el tipo documental FOLIO más preciso para este texto legal
2. DETERMINA el área de práctica principal y sub-áreas relacionadas
3. EXTRAE las partes principales y sus roles legales según FOLIO
4. LISTA conceptos FOLIO relevantes para indexación (máx 5, en español)
5. ASIGNA nivel de riesgo para revisión humana: BAJO/MEDIO/ALTO

Responde en JSON con etiquetas en español (FOLIO soporta etiquetas ES):
{
  "folio_tipo_documental": "string",
  "area_practica_principal": "string", 
  "sub_areas": ["string"],
  "partes_identificadas": [{"rol": "string", "nombre": "string si visible"}],
  "conceptos_folio_es": ["string"],
  "nivel_riesgo": "BAJO|MEDIO|ALTO",
  "requiere_revision_humana": bool,
  "routing_departamento": "string"
}"""

def classify_legal_document(text: str, jurisdiction: str = "Argentina") -> dict:
    """
    Clasifica un documento legal usando FOLIO ontología.
    Útil como primer paso en cualquier pipeline de intake documental.
    """
    r = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        system=f"Eres un clasificador legal especializado en jurisdicción {jurisdiction}. " + FOLIO_CLASSIFICATION_PROMPT,
        messages=[{"role": "user",
                   "content": f"Clasifica este documento legal:\n\n{text[:4000]}"}]
    )
    
    try:
        return json.loads(r.content[0].text)
    except json.JSONDecodeError:
        raw = r.content[0].text
        return {"raw": raw, "folio_tipo_documental": "PENDIENTE", "nivel_riesgo": "ALTO"}

def batch_classify_intake(documents: list[dict], jurisdiction: str = "Argentina") -> list[dict]:
    """
    Clasifica un batch de documentos entrantes y los enruta.
    FOLIO classification es el primer paso del pipeline de intake.
    """
    results = []
    for doc in documents:
        classification = classify_legal_document(doc["content"], jurisdiction)
        
        routing = {
            "id": doc["id"],
            "filename": doc.get("filename", "unknown"),
            "classification": classification,
            "action": "HUMAN_REVIEW" if classification.get("requiere_revision_humana") else "AUTO_PROCESS",
            "department": classification.get("routing_departamento", "GENERAL")
        }
        results.append(routing)
        
        print(f"[{doc['id']}] {doc.get('filename')} → {classification.get('folio_tipo_documental')} "
              f"| {classification.get('area_practica_principal')} | Riesgo: {classification.get('nivel_riesgo')}")
    
    return results

# Demo de pipeline de intake con FOLIO classification
sample_docs = [
    {
        "id": "DOC-001",
        "filename": "NDA_ACME_2026.pdf",
        "content": """ACUERDO DE CONFIDENCIALIDAD Y NO DIVULGACIÓN
        Entre ACME S.A. (Divulgante) y XYZ Corp (Receptor).
        El Receptor se obliga a mantener confidencialidad sobre toda información...
        Plazo: 5 años. Penalidad por incumplimiento: USD 500,000."""
    },
    {
        "id": "DOC-002",
        "filename": "sentencia_laboral_camara.pdf",
        "content": """CÁMARA NACIONAL DE APELACIONES DEL TRABAJO - SALA III
        Causa: González, María c/ Empresa SA s/ despido
        La actora reclama indemnización por despido sin causa...
        Resuelve: Confirmar la sentencia de primera instancia..."""
    }
]

results = batch_classify_intake(sample_docs, jurisdiction="Argentina")

# Estadísticas del batch
total = len(results)
requires_human = sum(1 for r in results if r["action"] == "HUMAN_REVIEW")
print(f"\nBatch: {total} docs | Revisión humana: {requires_human} | Auto-proceso: {total - requires_human}")
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
| Cliente UE, clasificar sistemas HRAIS (built-in vs por uso) | $80k-300k | P5 EU AI Act auditor v7 | Anthropic API + HRAIS classification |
| Multi-jurisdicción internacional | $50k-200k | P6 Vaquill MCP | Vaquill US+India+CanLII |
| Pre-venta: evaluar LLMs legales | Incluido | P8 Harvey LAB benchmark | Harvey LAB + Claude Opus 4.8 |
| Firma pequeña/media quiere despacho virtual desde día 1 | $60k-250k | **P11 GLAW virtual law firm** | GLAW + Claude Code + MCP |
| Globant quiere construir moat de datos LATAM | $40k-150k/jurisdicción | **P12 MCP jurisdiccional LATAM** | FastAPI + APIs judiciales + MCP SDK |
| Firma quiere workspace donde abogado + AI sean co-usuarios | $50k-200k | **P13 Nomos self-hosted workspace** | Nomos + GLAW + Master Claude for Legal |
| Antes de go-live: calidad gate para cualquier agente legal | $20k-80k | **P14 Harvey LAB quality gate** | harvey-labs + Claude Fable 5 + HAQQ-LAB |
| Investigación multinacional (108 países) incluido LATAM | $50k-150k | **P15 Legal Data Hunter global** | Legal Data Hunter MCP + FOLIO MCP |
| Intake documental masivo, clasificación automática en español | $30k-100k | **P16 FOLIO MCP ontology** | folio-mcp (MIT) + Claude Haiku + OpenContracts |

---

## Patrón 13: Nomos Self-Hosted Workspace (v6)

**Caso de uso**: Despacho o corporate legal quiere un workspace self-hosted donde el abogado y el AI engine son igualmente ciudadanos de primera clase (vs. un chatbot genérico).  
**Stack**: Nomos (MIT) + GLAW skills + Master Claude for Legal + Anthropic API  
**Tiempo estimado**: 2-3 semanas | **Deal size**: $50k-200k

```bash
# 1. Self-host Nomos (MIT)
git clone https://github.com/haqq-ai/nomos.git my-legal-workspace
cd my-legal-workspace
cp .env.example .env
# Editar: ANTHROPIC_API_KEY, POSTGRES_URL, S3_BUCKET

# 2. Instalar skill pack de GLAW (179 skills en 10 departamentos)
git submodule add https://github.com/lawve-ai/glaw ./skills/glaw
# Adaptar: skills/glaw/departments/latam-laboral/ con legislación local

# 3. Añadir starter skills de Master Claude for Legal
git submodule add https://github.com/haqq-ai/master-claude-for-legal ./skills/master-claude
# Incluye: NDA triage, citation verifier, status synthesis, meeting brief

# 4. Levantar workspace
docker-compose up -d
# Nomos sirve el workspace en localhost:3000
# El abogado accede como usuario; Claude opera como co-usuario con acceso a todas las skills
```

```python
# Ejemplo: citation verifier skill (de Master Claude for Legal)
import anthropic, httpx, json

client = anthropic.Anthropic()

def verify_legal_citation(citation: str, jurisdiction: str = "AR") -> dict:
    """Verifica que una cita legal exista y sea correcta antes de incluirla en un documento."""
    
    # 1. Buscar en fuente oficial
    endpoints = {
        "AR": f"https://www.saij.gob.ar/busqueda?texto={citation}",
        "BR": f"https://www.jusbrasil.com.br/busca?q={citation}",
        "MX": f"https://sjf.scjn.gob.mx/sjfsist/Paginas/Resultados.aspx?q={citation}"
    }
    
    try:
        r = httpx.get(endpoints.get(jurisdiction, endpoints["AR"]), timeout=10.0)
        found = r.status_code == 200 and len(r.text) > 1000
    except Exception:
        found = False
    
    # 2. Claude valida la cita en contexto
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        system="Eres un verificador de citas legales. Analiza si la cita parece válida basándote en el formato y contexto jurídico.",
        messages=[{"role": "user", 
                   "content": f"Jurisdicción: {jurisdiction}\nCita: {citation}\nEncontrada en fuente oficial: {found}\n\nJSON: {{es_valida, confianza_0_1, advertencias, formato_correcto}}"}]
    )
    
    result = json.loads(response.content[0].text)
    result["source_found"] = found
    return result

# Uso en workflow de Nomos:
citation = "CSJN, Fallos 344:120, 2021"
verification = verify_legal_citation(citation, "AR")
print(f"Válida: {verification['es_valida']} | Confianza: {verification['confianza_0_1']:.0%}")
```

---

## Patrón 14: Harvey LAB Quality Gate (v6)

**Caso de uso**: Antes de llevar un agente legal a producción con un cliente, evaluar su desempeño contra el benchmark de la industria y establecer un baseline documentado.  
**Stack**: harvey-labs (MIT) + Claude Fable 5 / Opus 4.8 + HAQQ-LAB + LRAGE  
**Tiempo estimado**: 1 semana | **Deal size**: $20k-80k (incluido en proyectos mayores)

```python
import subprocess, json, anthropic
from pathlib import Path

client = anthropic.Anthropic()

def run_harvey_lab_eval(agent_func, task_sample_size: int = 50) -> dict:
    """
    Evalúa un agente legal contra una muestra del Harvey LAB benchmark.
    Usa harvey-labs como referencia: github.com/harveyai/harvey-labs
    """
    
    # Cargar tareas del benchmark (clonar harvey-labs previamente)
    tasks_path = Path("./harvey-labs/tasks/")
    tasks = []
    for f in list(tasks_path.glob("**/*.json"))[:task_sample_size]:
        tasks.append(json.loads(f.read_text()))
    
    results = {"passed": 0, "failed": 0, "scores": [], "task_details": []}
    
    for task in tasks:
        # Ejecutar agente en la tarea
        agent_response = agent_func(task["prompt"])
        
        # Evaluar con Claude como juez (all-pass standard)
        judge_response = client.messages.create(
            model="claude-fable-5",  # El mejor modelo para evaluación legal
            max_tokens=1024,
            system="Eres un juez de calidad legal. Evalúa si la respuesta cumple TODOS los criterios del Harvey LAB. "
                   "Responde con JSON: {all_pass: bool, criteria_met: [str], criteria_failed: [str], score_0_10: float}",
            messages=[{"role": "user", "content": 
                       f"Tarea: {task['prompt']}\n\nRespuesta del agente: {agent_response}\n\n"
                       f"Criterios a evaluar: {task.get('rubric', 'Ver taxonomía Harvey LAB')}"}]
        )
        
        eval_result = json.loads(judge_response.content[0].text)
        
        if eval_result["all_pass"]:
            results["passed"] += 1
        else:
            results["failed"] += 1
        
        results["scores"].append(eval_result["score_0_10"])
        results["task_details"].append({
            "task_id": task.get("id", "unknown"),
            **eval_result
        })
    
    total = results["passed"] + results["failed"]
    results["all_pass_rate"] = results["passed"] / total if total > 0 else 0
    results["avg_score"] = sum(results["scores"]) / len(results["scores"])
    
    # Comparar con benchmarks de referencia
    print(f"\n=== Harvey LAB Quality Gate ===")
    print(f"All-pass rate: {results['all_pass_rate']:.1%} (industria: <10%; Fable 5: 14.2%)")
    print(f"Score promedio: {results['avg_score']:.1f}/10")
    print(f"Tareas evaluadas: {total}")
    
    return results

# Uso típico en due diligence pre-producción:
# eval_results = run_harvey_lab_eval(my_legal_agent.run, task_sample_size=100)
# if eval_results["all_pass_rate"] < 0.05:
#     print("BLOQUEADO: calidad insuficiente para producción")
```
