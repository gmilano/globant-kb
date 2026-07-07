# Patrones de composición — Legal AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-07

## Arquitectura base

```
[Plataforma vertical base (open source)]     [Legal data layer — MCP servers]
  Docassemble / OpenContracts / ArkCase        CourtListener / Vaquill / EU-Compliance
          ↓                                              ↓
   [Capa de integración AI]  ←────────────────────────────
     LangGraph / lavern / CrewAI
          ↓
   [Agentes especializados legales]
     Contract Reviewer · Due Diligence · Compliance Monitor · Research Agent
          ↓
   [UI + outputs legales]
     DOCX redlines (adeu) · PDF reports · OpenSign e-signature · Human review gate
```

---

## Receta 1: AI Contract Review System
**Tiempo estimado: 4-6 semanas | Complejidad: Media**

**Stack:**
```
OpenContracts (MIT)      → DMS: upload, versioning, annotation
claude-legal-skill (MIT) → CUAD 41-category risk detection + redlines
adeu (MIT)               → MCP: inyecta Track Changes en Word
LangGraph (MIT)          → Orchestration + human-in-the-loop gate
OpenSign (AGPL)          → E-signature final del contrato aprobado
```

```python
from langgraph.graph import StateGraph, END
from anthropic import Anthropic

client = Anthropic()

def cuad_risk_detection(state):
    risks = []
    for clause in state["clauses"]:
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=2000,
            messages=[{
                "role": "user",
                "content": f"CUAD risk analysis for clause: {clause['text']}\n"
                           f"Identify: termination, IP ownership, liability caps, "
                           f"non-compete, governing law, dispute resolution, "
                           f"auto-renewal, change of control. Flag risks."
            }]
        )
        risks.append({"clause": clause, "analysis": response.content[0].text})
    return {"risks": risks}

def human_review_gate(state):
    return {"status": "awaiting_human_review"}

def esign_finalization(state):
    if state["human_approved"]:
        opensign.send_for_signature(
            doc_path=state["approved_path"],
            signers=state["signers"]
        )
    return {"status": "sent_for_signature"}

graph = StateGraph(dict)
graph.add_node("ingest", lambda s: {"clauses": opencontracts.extract_clauses(opencontracts.upload(s["file_path"]))})
graph.add_node("cuad_analysis", cuad_risk_detection)
graph.add_node("redlines", lambda s: {"redlines_path": adeu_mcp.generate_redlines(s["doc_id"], s["risks"])})
graph.add_node("human_gate", human_review_gate)
graph.add_node("esign", esign_finalization)
graph.set_entry_point("ingest")
graph.add_edge("ingest", "cuad_analysis")
graph.add_edge("cuad_analysis", "redlines")
graph.add_edge("redlines", "human_gate")
graph.add_conditional_edges("human_gate", lambda s: "esign" if s.get("human_approved") else END)
graph.add_edge("esign", END)
app = graph.compile()
```

**Diferenciador vs Harvey:** Self-hosted, 0 vendor lock-in, datos nunca salen del cliente.

---

## Receta 2: Legal Research Assistant Multi-Jurisdiccional
**Tiempo estimado: 3-5 semanas | Complejidad: Media**

**Stack:**
```
CourtListener MCP (MIT)  → 9M+ US opinions, semantic search
EU-Compliance-MCP (MIT)  → 61 EU regs, 4,095 artículos
Vaquill MCP              → 8M+ US federal/state opinions, US Code, CFR
[MCP jurisdiccional]     → BR: direito-familiar / EU: legifrance-mcp
LangGraph agent          → Routing + multi-source synthesis
Claude API               → Synthesis con citations verificadas
```

```python
from anthropic import Anthropic
client = Anthropic()

async def legal_research_agent(question, jurisdictions):
    tools = []
    if "us" in jurisdictions:
        tools.extend(await mcp_client.load("courtlistener-mcp"))
        tools.extend(await mcp_client.load("vaquill-mcp"))
    if "eu" in jurisdictions:
        tools.extend(await mcp_client.load("eu-compliance-mcp"))
    if "br" in jurisdictions:
        tools.extend(await mcp_client.load("direito-familiar-mcp"))

    messages = [{"role": "user", "content": question}]
    while True:
        response = client.messages.create(
            model="claude-sonnet-5", max_tokens=4096, tools=tools, messages=messages,
            system="Always cite specific cases, statutes, regulations with exact references. Search multiple sources."
        )
        if response.stop_reason == "end_turn":
            return response.content[0].text
        tool_results = await process_tool_calls(response.content, mcp_client)
        messages.extend([{"role": "assistant", "content": response.content},
                         {"role": "user", "content": tool_results}])
```

---

## Receta 3: Agentic Law Firm Core (lavern pattern)
**Tiempo estimado: 6-10 semanas | Complejidad: Alta**

**Stack:** lavern (Apache-2.0) + SaulLM-7B (MIT) + CrewAI + OpenContracts + OpenSign

```python
from crewai import Agent, Task, Crew

contract_reviewer = Agent(
    role="Contract Review Specialist",
    goal="Identify all risks and non-standard clauses in the contract",
    backstory="Expert in M&A contract review with 15+ years experience",
    llm="claude-sonnet-5"
)
devils_advocate = Agent(
    role="Devil's Advocate",
    goal="Challenge every finding by the contract reviewer, find counterarguments",
    backstory="Senior partner who questions all assumptions",
    llm="claude-sonnet-5"
)
synthesis_judge = Agent(
    role="Senior Partner Judge",
    goal="Synthesize debate between agents into final recommendation",
    backstory="Managing partner who makes final calls based on risk/reward",
    llm="claude-sonnet-5"
)

review_task = Task(
    description="Review contract: {contract_text}. Identify risks using CUAD framework.",
    agent=contract_reviewer
)
challenge_task = Task(
    description="Challenge the findings. Find overstatements or missing context.",
    agent=devils_advocate, context=[review_task]
)
final_synthesis = Task(
    description="Synthesize review and challenge into final recommendation with confidence score.",
    agent=synthesis_judge, context=[review_task, challenge_task], human_input=True
)

crew = Crew(agents=[contract_reviewer, devils_advocate, synthesis_judge],
            tasks=[review_task, challenge_task, final_synthesis], verbose=True)
```

---

## Receta 4: M&A Due Diligence Pipeline (dd-agents pattern)
**Tiempo estimado: 8-14 semanas | Complejidad: Muy alta**

**Stack:** dd-agents (Apache-2.0) + OpenContracts (MIT) + ContextGem (Apache-2.0) + CourtListener MCP + SEC EDGAR MCP + LangGraph + Claude API (200K context)

**Pipeline de 38 pasos (5 fases):**
```python
DD_PIPELINE = [
    # Phase 1: Document Collection (1-5)
    "ingest_data_room", "classify_documents", "extract_entities",
    "build_citation_graph", "identify_gaps",
    # Phase 2: Legal Analysis (6-15)
    "analyze_material_contracts",  # CUAD on top 20 contracts
    "review_IP_portfolio", "check_litigation_history",  # CourtListener
    "employment_law_review", "regulatory_compliance",   # EU-Compliance-MCP
    # ... 5 more legal steps
    # Phase 3: Financial Legal Review (16-25)
    "review_financial_contracts", "sec_filing_analysis",  # SEC EDGAR MCP
    "tax_structure_review",  # ... 7 more steps
    # Phase 4: Risk Synthesis (26-35)
    "identify_deal_breakers", "quantify_risk_exposure", "benchmark_against_market",
    # Phase 5: Report Generation (36-38)
    "generate_executive_summary", "generate_detailed_report", "human_review_and_approval"
]
```

---

## Receta 5: EU AI Act Compliance Monitor
**Tiempo estimado: 3-5 semanas | Complejidad: Media**

**Stack:** EU-Compliance-MCP (MIT) + LangGraph + Blackstone (Apache-2.0) + OpenContracts + Claude API

```python
from anthropic import Anthropic
client = Anthropic()

def assess_ai_system(state):
    eu_tools = eu_compliance_mcp.get_tools()
    response = client.messages.create(
        model="claude-sonnet-5", max_tokens=8000, tools=eu_tools,
        messages=[{"role": "user", "content": f"""Assess AI system against EU AI Act:
            System: {state['ai_system_description']}
            Check: 1) Risk category, 2) Conformity assessment, 3) Documentation (Art 11),
            4) Data governance (Art 10), 5) Transparency (Art 13), 6) Human oversight (Art 14)
            Cite specific articles."""}],
        system="You are an EU AI Act compliance specialist. Always cite specific articles."
    )
    return {"compliance_report": response.content}

def weekly_compliance_check(client_systems):
    for system in client_systems:
        result = assess_ai_system({"ai_system_description": system})
        store_in_opencontracts(result)
        if result.get("critical_gaps"):
            send_alert(system["owner"], result["critical_gaps"])
```

---

## Receta 6: LATAM Legal Aid Automation
**Tiempo estimado: 5-8 semanas | Complejidad: Media**

**Stack:** Docassemble (MIT) + SaulLM-7B (MIT) fine-tuned en LATAM jurisprudence + direito-familiar-imobiliario + LangGraph + Opennyai (MIT) + OpenSign (AGPL) + WhatsApp/Telegram bot

**Flujo:**
```
Usuario: "Quiero divorciarme pero no sé por dónde empezar"
    ↓
LangGraph clarification agent
    → "¿Tienen hijos menores?" → "¿Bienes en común?" → "¿Acuerdo mutuo?"
    ↓
Docassemble interview generator
    → Genera formulario guiado para jurisdicción
    ↓
SaulLM-7B → Explica cada paso, revisa consistencia
    ↓
Output: Documentos listos para tribunal + OpenSign para firma
```

**Jurisdicciones priorizadas:** Brasil (PT, divorcios/herencias/laborales), México (ES, STPS), Colombia (ES, laboral), Argentina (ES, divorcios express ley 26.994)

**Impacto:** ~400M personas en LATAM sin acceso a servicios legales. 10k+ casos/mes con 2 abogados supervisores.

---

## Tabla resumen de patrones

| Patrón | Repos core | Semanas | Segmento |
|--------|-----------|---------|----------|
| AI Contract Review | OpenContracts + claude-legal-skill + adeu + LangGraph | 4-6 | In-house counsel, M&A |
| Legal Research | CourtListener MCP + Vaquill MCP + LangGraph | 3-5 | Firmas de litigación |
| Agentic Law Firm | lavern + CrewAI + SaulLM + OpenContracts | 6-10 | Firmas medianas |
| M&A Due Diligence | dd-agents + OpenContracts + ContextGem + EDGAR MCP | 8-14 | PE, M&A boutiques |
| EU AI Act Compliance | EU-Compliance-MCP + LangGraph + Blackstone | 3-5 | Empresas con ops en EU |
| LATAM Legal Aid | Docassemble + SaulLM + Opennyai + OpenSign | 5-8 | NGOs, gobiernos |
