# Composition Patterns — Legal AI

> Concrete recipes combining specific repos + agents + wiring. Production-ready starting points.
> Last updated: 2026-07-12 (v11)

## Base Architecture

```
[Legal Platform (OpenContracts / ArkCase)]
          |
    [MCP Server Layer]          ← OpenContracts native MCP
          |
[Agent Orchestration Layer]     ← LangGraph / Lavern workflows
          |
[Specialized Legal Agents]      ← contract-review, compliance, due diligence
          |
[Governance Middleware]         ← agent-governance-toolkit (Agent OS)
          |
[Conversational UI / API]       ← React streaming + human approval gates
```

---

## Pattern 1: Rapid CLM — Contract Lifecycle Management

**Use case**: Enterprise contract creation, review, negotiation, storage, renewal alerts.

**Stack**:
- `OpenContracts` (MIT) — document store, citation graph, annotation, MCP server
- `claude-legal-skill` (MIT) — CUAD-based clause extraction + risk detection + redlines
- `LangGraph` (Apache-2.0) — orchestration of review → negotiate → approve → store workflow
- `Claude Sonnet` — main reasoning engine for clause interpretation and draft generation
- `agent-governance-toolkit` (MIT) — EU AI Act compliant audit trail

**Wiring**:
```python
# 1. Ingest contract to OpenContracts via API
POST /api/documents/  {"file": contract.pdf, "corpus_id": "client-contracts"}

# 2. MCP tool call: retrieve clauses for review
mcp_client.call("opencontracts", "get_annotations", {"doc_id": doc_id, "label": "LIABILITY"})

# 3. claude-legal-skill: run CUAD risk detection
result = await claude_legal_skill.analyze(contract_text, risk_categories=CUAD_CATEGORIES)

# 4. LangGraph: orchestrate review → human gate → store
graph = StateGraph(CLMState)
graph.add_node("review", run_clause_review)      # claude-legal-skill
graph.add_node("human_gate", require_approval)   # EU AI Act Art. 14
graph.add_node("store", save_to_opencontracts)   # OpenContracts API
graph.add_edge("review", "human_gate")
graph.add_conditional_edges("human_gate", route_by_risk)
```

**Estimated delivery**: 3-4 weeks with 2 engineers.
**Where Globant adds value**: Client-specific clause templates, integration with existing ERP (SAP/Oracle), Spanish/Portuguese language support.

---

## Pattern 2: Multi-Agent Due Diligence (M&A)

**Use case**: M&A data room review — Legal, Finance, HR, Regulatory domains in parallel.

**Stack**:
- `Lavern` (Apache-2.0) — 67-agent framework; extract contract analyst + regulatory checker + HR review agents
- `OpenContracts` (MIT) — data room document corpus with MCP server
- `agent-governance-toolkit` (MIT) — audit log, human oversight gates, risk scoring
- `Claude Sonnet` — domain reasoning per agent
- `LangGraph` (Apache-2.0) — parallel agent coordination + consolidation

**Wiring**:
```python
# Lavern agent extraction pattern
from lavern import AgentFactory, WorkflowEngine

# Instantiate 3 agents from Lavern's agent library
contract_agent = AgentFactory.get("contract-analyst")
regulatory_agent = AgentFactory.get("regulatory-checker") 
hr_agent = AgentFactory.get("employment-law")

# Run in parallel via LangGraph
async def due_diligence_workflow(data_room_corpus_id):
    # Fetch documents via OpenContracts MCP
    docs = await mcp_call("opencontracts", "list_documents", {"corpus": data_room_corpus_id})
    
    # Run agents in parallel
    results = await asyncio.gather(
        contract_agent.review(docs["contracts"]),
        regulatory_agent.review(docs["regulatory"]),
        hr_agent.review(docs["employment"])
    )
    
    # Consolidate with human gate (EU AI Act Art. 14)
    return await consolidate_with_human_approval(results)
```

**Estimated delivery**: 5-6 weeks with 3 engineers.
**Output**: Structured due diligence report with risk flags, clause extracts, and recommended actions per domain.

---

## Pattern 3: EU AI Act Compliance Monitor

**Use case**: Continuously monitor AI systems for EU AI Act compliance. Required for any legal AI deployment in EU after August 2, 2026.

**Stack**:
- `agent-governance-toolkit` (MIT) — Agent OS policy engine, audit logging, EU AI Act checklist
- `eu-ai-act-toolkit` (Apache-2.0) — system classification, obligation tracking, deadline monitoring
- `Nomos` (Apache-2.0) — legal rules engine encoding AI Act requirements as typed rules with validity dates
- `Claude Haiku` — fast risk scoring for each agent action
- `PostgreSQL` — hash-chained audit log (EU AI Act Art. 12)

**Wiring**:
```python
# agent-governance-toolkit: intercept all agent actions
from agent_governance_toolkit import AgentOS, PolicyEngine

# Load EU AI Act policy set
policy = PolicyEngine.load("eu-ai-act-legal")

# Wrap any legal AI agent with compliance middleware
@policy.enforce
async def legal_agent_action(action: AgentAction) -> ActionResult:
    # Policy engine checks: Is this high-risk? Is human oversight possible?
    # Logs to hash-chained audit trail (Art. 12)
    # Requires human approval if risk > threshold (Art. 14)
    return await execute_action(action)

# Nomos: encode specific legal rules
nomos_rule = """
rule high_risk_ai_oversight {
  jurisdiction: EU
  valid_from: 2026-08-02
  when: ai_system.risk_level == "high" AND ai_system.domain == "legal"
  then: human_oversight.required == true
}
"""
```

**Estimated delivery**: 2-3 weeks with 1 engineer.
**Key deliverable**: Automated compliance report + real-time dashboard showing AI Act obligation status.

---

## Pattern 4: Legal RAG — Case Law + Statute Search

**Use case**: Lawyers query case law, statutes, and internal precedents in natural language.

**Stack**:
- `Blackstone` (Apache-2.0) — legal NLP preprocessing: NER, segmentation, citation extraction
- `OpenContracts` (MIT) — document corpus + pgvector + MCP server
- `LightRAG` or `pgvector` — semantic retrieval with graph-aware search
- `CUAD` (CC BY 4.0) — clause classification annotations for training/eval
- `Claude Sonnet` — answer synthesis with citations
- `Nomos` (Apache-2.0) — rule-aware retrieval (jurisdiction + validity date filtering)

**Wiring**:
```python
# Step 1: Preprocess legal documents with Blackstone
from blackstone.pipeline import BlackstonePipeline
nlp = BlackstonePipeline()
doc = nlp(statute_text)
entities = [(ent.text, ent.label_) for ent in doc.ents]  # CASENAME, CITATION, etc.

# Step 2: Store in OpenContracts with annotations
POST /api/documents/ {"text": statute_text, "annotations": entities}

# Step 3: Query via MCP + Claude
user_query = "What are the liability limits for software defects under EU law?"
context = mcp_call("opencontracts", "semantic_search", {"query": user_query, "top_k": 10})

# Step 4: Synthesize with citations
response = claude.messages.create(
    model="claude-sonnet-5",
    messages=[{"role": "user", "content": f"Query: {user_query}\nContext: {context}"}],
    system="You are a legal research assistant. Always cite sources using the document IDs provided."
)
```

**Estimated delivery**: 4 weeks with 2 engineers.
**Accuracy target**: Cite accuracy > 90% (validate against CUAD annotations).

---

## Pattern 5: LATAM Tax Compliance Agent (Brazil Reforma Tributária)

**Use case**: Analyze contracts and business processes for Brazil's IBS/CBS/IS tax reform impact. Estimate costs, flag non-compliant clauses.

**Stack**:
- `OpenContracts` (MIT) — contract document store
- `LangGraph` (Apache-2.0) — multi-step analysis workflow
- `Claude Sonnet` — Portuguese-language reasoning on Brazilian tax law
- `Nomos` (Apache-2.0) — encode IBS/CBS rules with effective dates (2027-2033 transition)
- Custom tax rules dataset — IBS/CBS rates + exemptions per industry

**Wiring**:
```python
# Nomos: encode IBS/CBS tax rule
nomos_rule = """
rule ibs_service_contract {
  jurisdiction: BR
  valid_from: 2027-01-01  # IBS transition start
  when: contract.type == "service" AND contract.value_brl > 0
  then: tax.ibs_rate = lookup_ibs_rate(contract.service_category, contract.state)
       tax.cbs_rate = 0.088  # federal CBS rate
}
"""

# LangGraph: full compliance analysis workflow
graph = StateGraph(TaxComplianceState)
graph.add_node("extract_clauses", extract_with_claude)     # Portuguese NLP
graph.add_node("apply_nomos_rules", run_nomos_engine)      # Rule evaluation
graph.add_node("calculate_impact", compute_tax_delta)      # Cost analysis
graph.add_node("flag_clauses", identify_noncompliant)      # Risk flagging
graph.add_node("generate_report", format_pt_report)        # Portuguese output
```

**Estimated delivery**: 4-5 weeks with 2 engineers + 1 Brazilian tax law domain expert.
**Key differentiator**: Time-sensitive — Brazil transition starts 2027. Build now, be first-mover.

---

## Pattern 6: Agentic Law Firm (White-Label Lavern)

**Use case**: Deploy a Lavern-based multi-agent legal platform as a white-label product for law firm clients.

**Stack**:
- `Lavern` (Apache-2.0) — full 67-agent framework, 8 workflows, institutional memory
- `OpenContracts` (MIT) — document management layer
- `agent-governance-toolkit` (MIT) — EU AI Act / GDPR compliant governance
- `Claude Sonnet` or `Opus` — reasoning for complex legal tasks
- `Ollama` (MIT) — local model option for data sovereignty

**Configuration approach**:
```yaml
# lavern.config.yml — white-label configuration
firm_name: "Cliente Firma Legal"
jurisdiction: ["MX", "CO", "AR"]
language: "es"

agents:
  enabled:
    - contract-analyst
    - regulatory-checker
    - negotiation-advisor
    - due-diligence-coordinator
  disabled:
    - litigation-strategy  # out of scope for this client
    
workflows:
  contract_review:
    min_passes: 3     # reduce from Lavern default of 10 for speed
    human_gate: after_pass_1  # EU AI Act Art. 14 compliance
    
models:
  primary: claude-sonnet-5
  fallback: ollama/llama3-legal  # local for sensitive docs

governance:
  audit_log: postgresql://...
  framework: eu-ai-act + gdpr
  human_oversight: required_for_high_risk
```

**Estimated delivery**: 6-8 weeks with 3 engineers for full deployment.
**Revenue model**: SaaS per-seat license on top of OSS platform.

---

## Pattern 7: Document Intelligence MCP Server (Plug into Any Agent)

**Use case**: Expose a client's legal document corpus as an MCP server so any AI agent (Claude, Copilot, Cursor, internal tools) can tool-call into it.

**Stack**:
- `OpenContracts` (MIT) — document platform with native MCP server
- `Blackstone` (Apache-2.0) — preprocessing pipeline (NER, segmentation)
- `pgvector` — semantic search backend
- MCP server exposes: search_documents, get_clause, get_annotations, add_annotation

**Value**: Client's existing 10,000 contracts become a "legal knowledge tool" available to every AI agent in the organization. No more hallucination about contract terms — agents query ground truth.

**Estimated delivery**: 2 weeks with 1 engineer (OpenContracts does the heavy lifting).

---

## Pattern Summary

| Pattern | Effort | Value | Key Repos |
|---------|--------|-------|-----------|
| P1: Rapid CLM | 3-4 wks | High — every enterprise has contracts | OpenContracts + claude-legal-skill + LangGraph |
| P2: M&A Due Diligence | 5-6 wks | Very High — high-margin M&A work | Lavern + OpenContracts + agent-governance |
| P3: EU AI Act Compliance | 2-3 wks | Urgent — Aug 2026 deadline | agent-governance-toolkit + eu-ai-act-toolkit |
| P4: Legal RAG | 4 wks | High — replaces expensive legal research | Blackstone + OpenContracts + Claude |
| P5: LATAM Tax (Brazil) | 4-5 wks | High — first-mover opportunity | OpenContracts + Nomos + Claude |
| P6: White-Label Law Firm | 6-8 wks | Very High — recurring SaaS | Lavern + OpenContracts + governance |
| P7: MCP Document Server | 2 wks | Medium — enabler for other patterns | OpenContracts (native MCP) |
