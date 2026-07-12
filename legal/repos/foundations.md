# Foundational Repos — Legal Industry

> Base repositories to build on. Open licenses, active communities.
> Last updated: 2026-07-12 (v11)

## Core Platforms & Frameworks

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | ~1.4k | Self-hosted document intelligence platform. Programmable citation graph, human annotation, AI agents, built-in MCP server, GraphQL+REST API, React UI. Since 2019. | Yes — MCP server + agent APIs built-in |
| [Lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | ~2.1k | Complete agentic law firm framework. 67 specialist agents, 8 workflows, institutional memory. 155k+ LOC — most complete open legal agent system available. | Yes — designed agent-first |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | 691 | spaCy pipeline + model for NLP on unstructured legal text. Legal NER, sentence segmentation, reference detection. ICLR / Durham Law School. | Yes — foundation NLP layer for any legal RAG |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | 937 | Chinese legal LLM system. Judicial corpus, LLM fine-tuning, legal Q&A, judgment generation. Fudan University + Inspur. | Yes — base model for Chinese legal AI |
| [LLM-and-Law](https://github.com/Jeryi-Sun/LLM-and-Law) | MIT | ~890 | Comprehensive paper survey of LLMs for law: reasoning, compliance, RAG evaluation, judgment generation. Essential research foundation. | Yes — benchmark and research guide |
| [awesome-legal-nlp](https://github.com/maastrichtlawtech/awesome-legal-nlp) | MIT | 331 | Curated list of LegalNLP resources: datasets, models, tools, papers. Maastricht Law Tech. | Yes — dataset and model discovery |
| [agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) | MIT | ~3.2k | Microsoft runtime governance for AI agents. EU AI Act / NIST AI RMF / HIPAA / SOC 2 mappings. OWASP Agentic Top 10 coverage. Agent OS policy engine. | Yes — required compliance layer |
| [mythril](https://github.com/ConsenSysDiligence/mythril) | MIT | 4.3k | Symbolic-execution security analysis for EVM smart contracts. ConsenSys Diligence. | Yes — smart contract legal audit |
| [heimdall-rs](https://github.com/Jon-Becker/heimdall-rs) | MIT | 1.6k | Advanced EVM smart contract toolkit: bytecode analysis, decompilation, disassembly. Rust-based. | Yes — smart contract forensics |
| [fuzi.mingcha](https://github.com/irlab-sdu/fuzi.mingcha) | Apache-2.0 | 385 | Chinese judicial LLM: Shandong University + CUPL. Unsupervised judicial corpus + supervised fine-tuning on ChatGLM. Case retrieval, judicial reasoning. | Yes — Chinese judicial AI base |

---

## Key Datasets

| Dataset | License | Description |
|---------|---------|-------------|
| [CUAD](https://github.com/TheAtticusProject/cuad) | CC BY 4.0 | Contract Understanding Atticus Dataset — 13k+ expert annotations across 510 contracts, 41 clause types. The standard benchmark for contract AI. |
| [MultiLegalPile](https://github.com/JoelNiklaus/MultiLegalPile) | CC BY 4.0 | 689GB multilingual legal corpus across 24 languages and multiple jurisdictions. LLM pre-training foundation. |
| [EURLEX](https://eur-lex.europa.eu/statistics/legislative-acts-statistics.html) | Public | Complete EU legislation corpus. Critical for EU AI Act compliance tooling. |

---

## Architecture Dependency Graph

```
Legal RAG / Agent System
├── OpenContracts          (document store + MCP + annotation)
├── Blackstone             (NLP preprocessing — NER, segmentation)
├── LLM-and-Law            (benchmark: measure quality)
├── CUAD dataset           (training + evaluation)
└── agent-governance-toolkit  (compliance + oversight)

Smart Contract Legal
├── mythril                (security analysis)
├── heimdall-rs            (bytecode forensics)
└── Blackstone             (legal text interpretation)

Chinese Legal AI
├── DISC-LawLLM            (base LLM)
├── fuzi.mingcha           (judicial fine-tuning)
└── OpenContracts          (document platform)
```

---
*See also: `verticals/solutions.md` for full vertical platforms.*
