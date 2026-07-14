# 🧩 Patrones de composición — Legal Services

> Recetas concretas: repos reales + código de ejemplo + tiempo de entrega.
> Última actualización: 2026-07-14 (v7)

## Arquitectura base

```
[Corpus legal (contratos, sentencias, normativa)]
          ↓ ingest
[OpenContracts DMS (MIT) — grafo de citas + MCP]
          ↓ MCP endpoint
[LLM Agent (Claude Sonnet 5 / claude-opus-4-8)]
          ↓ herramientas
[MCP Servers: courtlistener-mcp | canlii-mcp | uspto-mcp]
          ↓ output estructurado
[Revisión humana (HITL) en gates críticos]
          ↓
[Entregable: redlines, memos, risk reports, DD summaries]
```

---

## P1 — Contract Risk Triage con CUAD + Claude

**Objetivo**: Detectar 41 tipos de cláusulas de riesgo en contratos comerciales.
**Repos**: [cuad](https://github.com/TheAtticusProject/cuad) (CC-BY 4.0) + [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) (MIT) + Claude API

```python
import anthropic, json

client = anthropic.Anthropic()

CUAD_CLAUSE_TYPES = [
    "Change of Control", "Non-Compete", "IP Ownership", "Indemnification",
    "Limitation of Liability", "Termination for Convenience", "Governing Law",
    "Uncapped Liability", "Anti-Assignment", "Most Favored Nation"
    # ... 31 más según CUAD taxonomy
]

def triage_contract(contract_text: str) -> dict:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        messages=[{"role": "user", "content": f"""Analyze this contract and identify risk clauses from CUAD taxonomy.
For each clause: type, exact excerpt, risk (HIGH/MEDIUM/LOW), concern.
Clause types: {', '.join(CUAD_CLAUSE_TYPES)}

Contract: {contract_text[:50000]}

Return JSON: {{"clauses_found": [{{"type": "...", "excerpt": "...", "risk": "HIGH|MEDIUM|LOW", "concern": "..."}}], "overall_risk": "HIGH|MEDIUM|LOW", "summary": "..."}}"""}]
    )
    return json.loads(response.content[0].text)

result = triage_contract(open("contract.txt").read())
high_risk = [c for c in result["clauses_found"] if c["risk"] == "HIGH"]
print(f"Found {len(high_risk)} HIGH risk clauses")
```

**Tiempo**: 3-5 días | **Diferenciador**: CUAD gold standard (NeurIPS 2021), 41 clause types

---

## P2 — M&A Due Diligence Multi-Agente (13 dominios)

**Objetivo**: DD forense completa: Legal + Finance + Commercial + Tech + Cyber + HR + Tax + Regulatory + ESG.
**Repos**: [due-diligence-agents](https://github.com/zoharbabin/due-diligence-agents) (Apache-2.0) + Claude API

```python
from due_diligence import DDOrchestrator, QualityGate

orchestrator = DDOrchestrator(
    data_room_path="./data_room/",
    domains=["legal", "finance", "commercial", "tech", "cyber", "hr", "tax", "regulatory", "esg"],
    llm_backend="claude-opus-4-8",
    output_dir="./dd_output/"
)

result = orchestrator.run(
    quality_gates=[
        QualityGate("coverage", threshold=0.85),       # Gate 1: >=85% docs procesados
        QualityGate("cross_domain", threshold=0.75),   # Gate 2: cross-refs validadas
        QualityGate("citation", threshold=0.95),       # Gate 3: hallazgo -> cita exacta
        QualityGate("consistency", threshold=0.80),    # Gate 4: coherencia cross-domain
        QualityGate("human_review", required=True),    # Gate 5: HITL obligatorio
    ]
)

result.export_ic_memo("ic_memo_2026_07.docx")
result.export_risk_matrix("risk_matrix.xlsx")

# Cross-domain findings = el valor diferencial:
for f in result.cross_domain_findings:
    print(f"CROSS: {f.legal_ref} <-> {f.financial_ref} <-> {f.cyber_ref}")
    # Ej: "Indemnification uncapped -> $50M contingent liability -> CVE-2026-1234"
```

**Tiempo**: 2 semanas | **Diferenciador**: cross-domain reasoning que ningún revisor humano conecta

---

## P3 — Legal Research RAG con OLAW + CourtListener-MCP

**Objetivo**: Asistente de research con acceso a 250M+ páginas de tribunales US + corpus local.
**Repos**: [olaw](https://github.com/harvard-lil/olaw) (MIT) + [courtlistener-mcp](https://github.com/Vaquill-AI/courtlistener-mcp) (MIT)

```python
import anthropic
client = anthropic.Anthropic()

# Claude Desktop config (settings.json mcpServers):
# { "courtlistener": { "command": "npx", "args": ["courtlistener-mcp"], "env": {"CL_API_KEY": "KEY"} } }

def legal_research(question: str, jurisdiction: str = "US") -> str:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=8192,
        system="""Legal research assistant. Use courtlistener tool.
        Always cite: exact case name, date, court.
        Flag when precedent is unclear or jurisdiction-specific.""",
        messages=[{"role": "user", "content": f"Research: {question}\nJurisdiction: {jurisdiction}"}]
    )
    return response.content[0].text

# Para LATAM agregar MCP servers adicionales:
# Brasil: STF/STJ API | México: SCJN | Colombia: Corte Constitucional
```

**Tiempo**: 1 semana + 2 semanas por jurisdicción LATAM | **Diferenciador**: 250M+ docs reales, BYOK

---

## P4 — OpenContracts DMS + Anotación Agentica

**Objetivo**: DMS legal con AI que anota automáticamente y construye grafo de citas.
**Repos**: [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) (MIT)

```python
import anthropic
client = anthropic.Anthropic()

def annotate_corpus(corpus_name: str, annotation_instructions: str):
    response = client.beta.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        mcp_servers=[{"url": "https://your-opencontracts.company.com/mcp/", "authorization_token": "TOKEN"}],
        messages=[{"role": "user", "content": f"""Process corpus '{corpus_name}':
1. List all documents
2. Extract parties, dates, clause types, key obligations per doc
3. Identify cross-document citations -> build citation edges
4. Flag: {annotation_instructions}
Apply annotations, generate summary report."""}]
    )
    return response.content[0].text

annotate_corpus(
    corpus_name="AcquisitionTarget-2026",
    annotation_instructions="uncapped indemnification, IP assignment without carveouts, change of control"
)
```

**Tiempo**: 1 semana (Docker) + 3 días por corpus | **Diferenciador**: self-hosted BYOK + citation graph persistente

---

## P5 — Lavern: Agentic Law Firm Pattern (Debate con Evidence)

**Objetivo**: Revisión con 67 agentes especialistas que debaten y votan hallazgos.
**Repos**: [lavern](https://github.com/AnttiHero/lavern) (Apache-2.0)

```python
from typing import List, Dict

class AgenticLawFirm:
    """Pattern basado en lavern (Apache-2.0)."""
    
    def review_document(self, doc: str, specialists: List[str] = None) -> Dict:
        agents = specialists or ["contract_analyst", "risk_assessor", "compliance_checker",
                                  "negotiation_advisor", "precedent_researcher"][:10]
        findings = {}
        
        for pass_num in range(1, 11):  # 10-pass loop
            for agent in agents:
                agent_findings = self._run_agent(agent, doc, findings, pass_num)
                for other_agent, other_findings in findings.items():
                    if other_agent != agent:
                        refutation = self._refute(agent, other_findings)
                        if refutation["confidence"] > 0.8:
                            findings[other_agent]["challenged"] = True
            
            if pass_num in [3, 7, 10]:  # Human gates en passes clave
                findings = self._human_review_gate(findings, pass_num)
        
        return self._synthesize_findings(findings)
    
    def _human_review_gate(self, findings: Dict, pass_num: int) -> Dict:
        challenged = {k: v for k, v in findings.items() if v.get("challenged")}
        if challenged:
            approved = self._await_human_approval(challenged)  # Bloquea hasta aprobación
            for key in approved:
                findings[key]["human_validated"] = True
        return findings
```

**Tiempo**: 2-3 semanas | **Diferenciador**: 10-pass debate vs single-LLM review; HITL = liability coverage

---

## P6 — LATAM Compliance Bot: Reforma Tributária Brasil

**Objetivo**: Asistente para preguntas sobre impacto IBS/CBS/IS en contratos y operaciones.
**Stack**: OpenContracts (MIT) + Claude API + corpus LC 214/2025 + DOU API

```python
import anthropic
client = anthropic.Anthropic()

def consultor_reforma_tributaria(pergunta: str, contexto_empresa: str = "") -> str:
    """
    Asistente Reforma Tributária brasileña. Base: LC 214/2025 (IBS/CBS/IS), CARF.
    """
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        system="""Você é especialista em direito tributário brasileiro,
        especialmente Reforma Tributária LC 214/2025 (IBS, CBS, IS).
        Sempre cite dispositivos legais específicos.
        Indique dúvidas de interpretação ou normas pendentes de regulamentação.
        Destaque impactos em contratos de serviços, locação e importação.""",
        messages=[{"role": "user", "content": f"Empresa: {contexto_empresa}\nPergunta: {pergunta}"}]
    )
    return response.content[0].text

r = consultor_reforma_tributaria(
    pergunta="Como calcular CBS em contratos de TI com tomador no exterior?",
    contexto_empresa="SaaS brasileira com 40% de receita em exportações"
)
```

**Tiempo**: 2 semanas | **Mercado**: Todas las empresas BR deben adaptarse 2026-2033 — demanda masiva

---

## P7 — CLM Integration: OpenCLM + AI Contract Review

**Objetivo**: CLM completo con revisión AI automática en cada contrato ingresado.
**Stack**: [OpenCLM](https://openclm.ai/) (AGPL-3.0) + due-diligence-agents legal-only + Claude API

```python
import anthropic, json
client = anthropic.Anthropic()

def on_contract_uploaded(contract_id: str, contract_text: str, contract_type: str):
    """Auto-review triggered by OpenCLM webhook."""
    risk_report = triage_contract(contract_text)     # P1 pattern
    deviations = compare_to_playbook(contract_text, contract_type)
    redlines = generate_redlines(contract_text, deviations, risk_report)
    
    update_contract_in_clm(
        contract_id=contract_id,
        risk_level=risk_report["overall_risk"],
        risk_tags=[c["type"] for c in risk_report["clauses_found"] if c["risk"] == "HIGH"],
        ai_redlines_doc=redlines,
        requires_human_review=(risk_report["overall_risk"] == "HIGH")
    )
    if risk_report["overall_risk"] == "HIGH":
        notify_legal_reviewer(contract_id, risk_report)

def generate_redlines(original: str, deviations: list, risks: dict) -> bytes:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=8192,
        messages=[{"role": "user", "content": f"""Generate redlines JSON for deviations:
Deviations: {json.dumps(deviations)}
Risk flags: {json.dumps(risks['clauses_found'])}
For each: original_text, suggested_text, rationale (1 sentence), priority (HIGH/MEDIUM/LOW)
Return: {{"redlines": [...]}}"""}]
    )
    return apply_redlines_to_docx(original, json.loads(response.content[0].text)["redlines"])
```

**Tiempo**: 3 semanas | **ROI**: 60-80% reducción first review; abogados solo ven HIGH risk

---

## P8 — LRAGE Evaluation Pipeline para Legal RAG

**Objetivo**: Evaluación continua de calidad del sistema RAG legal en CI/CD.
**Repos**: [LRAGE](https://github.com/hoorangyee/LRAGE) (MIT)

```python
from lrage import LRAGEEvaluator, LegalBench, KBL, LawBench

def evaluate_legal_rag(rag_pipeline):
    evaluator = LRAGEEvaluator(
        retriever=rag_pipeline.retriever,
        reranker=rag_pipeline.reranker,
        generator=rag_pipeline.llm,
        llm_judge="claude-sonnet-5"
    )
    
    results = {
        "legalbench": evaluator.run(LegalBench()),  # 162 legal reasoning tasks
        "kbl": evaluator.run(KBL()),
        "lawbench": evaluator.run(LawBench()),
    }
    
    baseline = load_baseline_scores()
    for benchmark, score in results.items():
        if score < baseline[benchmark] * 0.95:  # Block if >5% regression
            raise ValueError(f"LRAGE regression: {benchmark} {score:.2%} < threshold")
    
    for benchmark, score in results.items():
        print(f"  {benchmark}: {score:.2%}")
    return results

# GitHub Actions: run on every PR touching RAG pipeline
# Block merge if score drops >5% vs baseline
# Track in MLflow/W&B for long-term trends
```

**Tiempo**: 2 días | **Valor**: Benchmarks reproducibles — diferenciador en RFPs vs soluciones caja negra
