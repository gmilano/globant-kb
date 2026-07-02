# Compose Patterns — Legal AI

> Concrete recipes using the repos and tools in this KB. Each pattern names specific components and explains how to wire them together.

---

## Pattern 1: Contract Review Pipeline

**Use case**: Automated first-pass review of commercial contracts with clause-level risk flagging.

**Stack**:
- **Ingestion**: [RAGFlow](https://github.com/infiniflow/ragflow) — layout-aware PDF parsing, table extraction, section-preserving chunking
- **Entity extraction**: [LexNLP](https://github.com/LexPredict/lexpredict-lexnlp) — pull parties, dates, amounts, governing law, termination clauses
- **Risk classification**: [CUAD](https://github.com/TheAtticusProject/cuad) — 41-type clause taxonomy; use DeBERTa-xlarge baseline or fine-tune on client's contracts
- **Agent orchestration**: [Lavern](https://github.com/AnttiHero/lavern) — debate protocol: senior lawyer agent + specialist agents per clause type → 10-pass verification → human gate before verdict
- **Output**: Structured JSON risk report + redline suggestions + lawyer-review queue

**Wire-up**:
```
PDF → RAGFlow (parse + chunk with layout preservation)
    → LexNLP (entity extraction → parties, dates, amounts, jurisdiction)
    → CUAD DeBERTa model (clause classification → 41-type risk labels)
    → Lavern orchestrator (debate + 10-pass verification → draft report)
    → Human gate (lawyer approval via Lavern dashboard)
    → Final risk report + redlines delivered
```

**Timeline**: 2–3 weeks MVP with CUAD defaults; 6–8 weeks production with client-specific fine-tuning.

---

## Pattern 2: Legal Research Agent

**Use case**: Answer complex legal questions with source-cited memos drawn from a document corpus (case law, statutes, regulations, precedents).

**Stack**:
- **Document store**: [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) — corpus management, annotation graph, vector search, built-in MCP server
- **Agent framework**: [smolagents](https://github.com/huggingface/smolagents) — tool-using agent that queries OpenContracts via MCP endpoint
- **LLM**: Claude via MCP (default) or Mistral via Ollama (on-premises EU deployment)
- **Output**: Citation-linked memo with source paragraph pointers stored back in the annotation graph

**Wire-up**:
```
Lawyer question → smolagents orchestrator
               → OpenContracts MCP server (vector search → candidate paragraphs with citation metadata)
               → smolagents + LLM (synthesize answer with inline citations)
               → OpenContracts (store memo as new annotation linked to sources)
               → Output: formatted memo with clickable source links
```

**Key advantage**: OpenContracts built-in MCP server means Claude can use it as a tool directly — zero custom integration code required.

---

## Pattern 3: Compliance Monitoring Agent

**Use case**: Continuously monitor regulatory changes (EU AI Act, SEC rules, GDPR updates) and flag new obligations in active contracts.

**Stack**:
- **Obligation extraction**: [LexNLP](https://github.com/LexPredict/lexpredict-lexnlp) — extract obligations, deadlines, and defined terms from contracts and regulations
- **Contract storage**: [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) — annotation store with obligation metadata per contract
- **Monitoring agent**: [smolagents](https://github.com/huggingface/smolagents) — scheduled agent that fetches new regulations, extracts obligations, cross-references active contracts
- **Alert delivery**: Lavern's notification system ([AnttiHero/lavern](https://github.com/AnttiHero/lavern)) — reuse Telegram/email alert infrastructure

**Wire-up**:
```
[Cron: daily]
→ Fetch new regulatory text (RSS feeds / EUR-Lex API / SEC EDGAR)
→ RAGFlow (parse regulation document)
→ LexNLP (extract new obligations, effective dates, affected entities)
→ smolagents (compare new obligations vs obligation graph in OpenContracts)
→ Flag deltas (new obligations not covered in active contracts)
→ Lavern notification system (Telegram/email alert to compliance team)
→ Lawyer review queue with pre-drafted impact analysis
```

---

## Pattern 4: Legal Intake & Matter Creation Agent

**Use case**: Client submits documents or a query → agent extracts relevant facts, classifies matter type, creates structured matter record in case management system.

**Stack**:
- **Document parsing**: RAGFlow
- **Entity/fact extraction**: LexNLP (parties, dates, jurisdiction, claim amounts, contract types)
- **Matter classification**: Fine-tuned [InLegalBERT](https://github.com/Law-AI/pretraining-bert) — classify matter type (employment, M&A, IP, litigation, real estate, etc.)
- **Case management integration**: ArkCase REST API or SuiteCRM API
- **Orchestration**: smolagents multi-step intake workflow

**Wire-up**:
```
Client email / portal submission
→ RAGFlow (parse attachments: PDF contracts, court filings, correspondence)
→ LexNLP (extract parties, dates, jurisdiction, claim amounts, contract type)
→ InLegalBERT (classify matter type with confidence score)
→ smolagents (compose structured matter record)
→ ArkCase / SuiteCRM API (create matter with all extracted metadata)
→ Auto-assign to practice group → notify attorney via webhook
→ Confirmation sent to client
```

---

## Pattern 5: EU Privacy-First On-Premises Deployment

**Use case**: European law firm requiring complete data sovereignty — no data leaves the EU, no cloud LLM calls.

**Stack**:
- **LLM**: Mistral 7B or Mixtral 8x7B via [Ollama](https://github.com/ollama/ollama) (MIT) — runs on firm's own EU servers
- **Agent orchestration**: Lavern (configure Ollama backend — built-in support via `--backend ollama`)
- **Document intelligence**: OpenContracts self-hosted (MIT)
- **Entity extraction**: LexNLP (Apache 2.0, pure Python, runs entirely in-process)
- **Vector DB**: [Qdrant](https://github.com/qdrant/qdrant) (Apache 2.0) self-hosted OR [Chroma](https://github.com/chroma-core/chroma) (Apache 2.0)
- **Deployment**: Docker Compose on EU-hosted bare metal or EU-region Kubernetes

**Privacy guarantees**: All data stays on-premises in the EU. Zero external API calls. GDPR-compliant by design. Attorney-client privilege preserved.

**Wire-up**:
```
All components self-hosted in EU data center:
  Lavern → Ollama (Mistral/Mixtral) [replaces Anthropic/OpenAI]
  OpenContracts → Qdrant (local vector DB) [replaces cloud vector service]
  LexNLP → runs in-process [no external calls]
  Mayan EDMS → document store [replaces cloud DMS]
  → Zero outbound data flow guaranteed
  → Audit logs retained on-premises for EU AI Act compliance
```

**Cost**: ~€500–2000/month in self-hosted GPU compute for Mixtral vs. $10k+/month in OpenAI API costs at scale.

---

## Anti-Patterns to Avoid

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Naive PDF-to-text chunking | Loses table structure, breaks cross-references, kills citation accuracy | Use RAGFlow layout-aware parsing |
| Single-agent contract review | No verification; hallucination risk is too high for legal | Use Lavern's debate + 10-pass verification loop |
| Generic LLM prompts for legal tasks | Misses jurisdiction-specific nuance, wrong risk taxonomy | Fine-tune on CUAD + client contracts; use LexNLP extractors |
| AGPL library in commercial SaaS | License contamination — ContraxSuite (AGPL), SuiteCRM (AGPL) | Use Apache 2.0 alternatives: LexNLP for NLP, OpenContracts for CLM |
| Cloud LLM for EU law firm | GDPR exposure, privilege risk, EU AI Act non-compliance | Deploy Ollama + Mistral locally; use OpenContracts self-hosted |
| Building from scratch | Reinventing CUAD's 41-type taxonomy, Lavern's agent patterns | Fork and customize existing open-source; time-to-demo in days not months |
