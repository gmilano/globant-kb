# 🧩 Composition Patterns — Legal AI

> Concrete recipes combining specific repos, agents, and data sources into deployable legal AI solutions.
> Last updated: 2026-07-15

---

## Pattern 1: AI Contract Review Pipeline

**Goal**: Automated first-pass review of commercial contracts with clause-level risk scoring.

**Stack**:
```
PDF/DOCX upload
     ↓
LexNLP (Apache-2.0) — extract parties, dates, obligations, citations
     ↓
CUAD clause classifier (CC-BY-4.0) — tag 41 clause types (IP, indemnity, limitation of liability, etc.)
     ↓
SaulLM-7B-Instruct (MIT) via Ollama — risk-rate each clause, draft redline suggestions
     ↓
OpenCLM (AGPL-3.0) — store contract, track obligations, route for approval
     ↓
Structured risk report (JSON → PDF)
```

**Repos**:
- [LexPredict/lexpredict-lexnlp](https://github.com/LexPredict/lexpredict-lexnlp) — entity extraction
- [HuggingFace cuad](https://huggingface.co/datasets/cuad) — CUAD clause training data
- [Equall/Saul-7B-Instruct-v1](https://huggingface.co/Equall/Saul-7B-Instruct-v1) — legal LLM backend
- [openclm.ai](https://openclm.ai/) — CLM platform for storage and tracking
- Reference impl: [lowtidebuild/contract-review-agent](https://github.com/lowtidebuild/contract-review-agent)

**Estimated build**: 2–3 weeks for MVP. Use contract-review-agent as skeleton, replace backend LLM with SaulLM, pipe output into OpenCLM.

---

## Pattern 2: Agentic Law Firm (67-Agent Orchestration)

**Goal**: Full multi-agent legal workflow — intake → research → drafting → review → approval.

**Stack**:
```
Client intake (conversational)
     ↓
Docassemble (MIT) — guided interview, gather facts
     ↓
Agent Orchestrator (Lavern pattern, Apache-2.0)
     ├─ Research Agent: CourtListener API + RAG (Qdrant) + SaulLM-54B
     ├─ Drafting Agent: SaulLM-7B + Docassemble templates
     ├─ Review Agent: CUAD clause scanner + risk rater
     ├─ Compliance Agent: EUR-Lex / CFR lookup + gap analysis
     └─ Approval Gate: human-in-the-loop via OpenLawOffice task queue
          ↓
Final document → OpenCLM storage + obligation tracking
```

**Repos**:
- [jhpyle/docassemble](https://github.com/jhpyle/docassemble) — intake and document generation
- [AnttiHero/lavern](https://github.com/AnttiHero/lavern) — 67-agent orchestration reference
- [freelawproject/courtlistener](https://github.com/freelawproject/courtlistener) — legal precedent data
- [Equall/Saul-7B-Instruct-v1](https://huggingface.co/Equall/Saul-7B-Instruct-v1) — LLM backbone
- [NodineLegal/OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) — task queue + matter management

**Estimated build**: 6–10 weeks for production-grade. Start with lavern as orchestration skeleton, specialize 5–10 core agents before scaling to 67.

---

## Pattern 3: Legal Research Assistant (RAG + Precedent Retrieval)

**Goal**: Ask a legal question, get a cited answer with case law references.

**Stack**:
```
User question (natural language)
     ↓
Query expansion + jurisdiction detection (SaulLM-7B)
     ↓
Qdrant vector search over corpus:
     ├─ Harvard CAP (6.9M cases, CC0) — case law
     ├─ CourtListener opinions — US federal/state courts
     └─ EUR-Lex (EU law text) — for European matters
          ↓
Reranker (BGE-reranker or Cohere Reranker)
          ↓
SaulLM-54B — synthesize answer + cite sources
          ↓
Response with: answer, cited cases (with CourtListener links), confidence rating
```

**Repos**:
- [Equall/Saul-7B-Instruct-v1](https://huggingface.co/Equall/Saul-7B-Instruct-v1) — query expansion + answer synthesis
- [freelawproject/eyecite](https://github.com/freelawproject/eyecite) — citation normalization
- [case.law](https://case.law/) — bulk case law corpus
- [kjgdgch65g/nl-rag-qdrant-legal](https://github.com/kjgdgch65g/nl-rag-qdrant-legal) — RAG reference implementation
- Qdrant (Apache-2.0) — vector store

**Key decision**: Use 512-token chunks with 128-token overlap for case law; clause-boundary chunking for contracts.

---

## Pattern 4: Legal Document Automation (Self-Service Access to Justice)

**Goal**: Allow non-lawyers to generate basic legal documents through a guided interface.

**Stack**:
```
User interaction (web browser, mobile)
     ↓
Docassemble interview (YAML + Python) — ask plain-language questions
     ↓
LLM (SaulLM-7B via Ollama) — interpret ambiguous answers, suggest appropriate form
     ↓
Template engine — fill in appropriate jurisdiction-specific document template
     ↓
PDF generation + delivery
     ↓
(Optional) OpenLawOffice — assign to supervising attorney for review gate
```

**Repos**:
- [jhpyle/docassemble](https://github.com/jhpyle/docassemble) — the core platform (MIT)
- [SuffolkLITLab/docassemble-ALDocument](https://github.com/SuffolkLITLab/docassemble-ALDocument) — Assembly Line toolkit (MIT)
- [Equall/Saul-7B-Instruct-v1](https://huggingface.co/Equall/Saul-7B-Instruct-v1) — interpret user answers, recommend document type

**LATAM adaptation**: Replace court form templates with LATAM jurisdiction equivalents (Brazilian CLT forms, Argentine civil code documents, Mexican NOM compliance forms). The Docassemble engine is jurisdiction-agnostic.

---

## Pattern 5: Compliance Monitoring Agent (Regulatory Change Detection)

**Goal**: Monitor regulatory sources, detect changes relevant to a client's industry, generate compliance gap reports.

**Stack**:
```
Scheduled agent (daily/weekly)
     ↓
Scrapers: EUR-Lex API + Federal Register API + Brazil DOF scraper + Mexico DOF scraper
     ↓
LexNLP — extract entities, dates, obligations from new documents
     ↓
Change detection: compare against last known state (Qdrant semantic diff)
     ↓
Relevance filter: SaulLM-7B — "does this regulatory change affect {client industry}?"
     ↓
Gap analysis: compare new requirement against client's existing policies (RAG over policy docs)
     ↓
Alert report → email / Slack / OpenLawOffice task creation
```

**Repos**:
- [LexPredict/lexpredict-lexnlp](https://github.com/LexPredict/lexpredict-lexnlp) — regulatory text extraction
- [Equall/Saul-7B-Instruct-v1](https://huggingface.co/Equall/Saul-7B-Instruct-v1) — relevance classification
- [NodineLegal/OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) — task creation for attorneys
- Qdrant (Apache-2.0) — semantic state tracking

**LATAM priority**: Brazil's IBS/CBS tax reform, Mexico's labor law updates, and Argentina's frequent regulatory changes make this pattern extremely high-value in the region.

---

## Pattern 6: Patent Intelligence Agent (USPTO + MCP)

**Goal**: Automated patent landscape analysis and freedom-to-operate assessment.

**Stack**:
```
Technology description (natural language)
     ↓
SaulLM-7B — extract technical claims and patent claim language
     ↓
USPTO MCP Server [Tam1379/uspto_fpd_mcp (MIT)] — query USPTO Final Patent Decisions
     ↓
Prior art search: Google Patents API + USPTO PEDS API
     ↓
Claim mapping agent — compare client technology against prior art claims
     ↓
FTO report: risk rating per claim element, recommended modifications
```

**Repos**:
- [Tam1379/uspto_fpd_mcp](https://github.com/Tam1379/uspto_fpd_mcp) — USPTO MCP server
- [Equall/Saul-7B-Instruct-v1](https://huggingface.co/Equall/Saul-7B-Instruct-v1) — claim language understanding

**Status**: Early-stage (MCP server at 2 stars). High potential — patent analysis is a $1B+ professional services category with very little open source tooling.

---

## Wiring Reference

```python
# Minimal contract review pipeline sketch
from lexnlp.extract.en import entities, dates, money
import ollama
import qdrant_client

def review_contract(pdf_path: str) -> dict:
    text = extract_text(pdf_path)  # pdfminer or pypdf2
    
    # LexNLP structured extraction
    parties = list(entities.get_companies(text))
    effective_date = list(dates.get_dates(text))
    financial_terms = list(money.get_money(text))
    
    # SaulLM risk analysis via Ollama
    risk_prompt = f"""You are a contract review expert. 
    Analyze this contract for key risks in these clause categories: 
    limitation of liability, indemnification, IP ownership, exclusivity, termination.
    
    Contract text: {text[:8000]}
    
    Return JSON with clause_risks array, each item having: clause_type, risk_level (low/medium/high), 
    summary, recommended_action."""
    
    response = ollama.chat(
        model='saullm-7b-instruct',
        messages=[{'role': 'user', 'content': risk_prompt}],
        format='json'
    )
    
    return {
        'parties': parties,
        'effective_date': effective_date,
        'financial_terms': financial_terms,
        'clause_risks': response['message']['content']
    }
```

---
*Patterns validated against real repos and current open source ecosystem state — July 2026.*
