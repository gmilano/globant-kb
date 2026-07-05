# Vertical Platforms — Financial Services

> Production-ready open-source platforms to customize with AI on top.
> Model: start from something functional, add an agentic layer above.
> Last updated: 2026-07-05

## Recommended Platforms

| Platform | License | URL | Stack | AI Use Case |
|----------|---------|-----|-------|-------------|
| **Apache Fineract** | Apache-2.0 | [github.com/apache/fineract](https://github.com/apache/fineract) | Java / Spring Boot / MySQL | Add LLM loan officer agent: AI reviews applications, surfaces risks, drafts decision memos |
| **ERPNext / Frappe** | GPL-3.0 | [github.com/frappe/erpnext](https://github.com/frappe/erpnext) | Python / JavaScript / MariaDB | Conversational ERP: AI agent answers CFO questions, automates AR/AP reconciliation, flags anomalies |
| **Hyperswitch** | Apache-2.0 | [github.com/juspay/hyperswitch](https://github.com/juspay/hyperswitch) | Rust / PostgreSQL | Agentic payment routing: AI dynamically selects optimal PSP per transaction by cost + success rate |
| **OpenBB Platform** | AGPL-3.0 | [github.com/OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | Python / FastAPI | Financial research copilot: MCP server connects AI agents to market data, earnings, SEC filings |
| **Kill Bill** | Apache-2.0 | [github.com/killbill/killbill](https://github.com/killbill/killbill) | Java / PostgreSQL / MySQL | Subscription AI: agent detects churn signals, triggers retention workflows, adjusts pricing |
| **LedgerSMB** | GPL-2.0 | [github.com/ledgersmb/LedgerSMB](https://github.com/ledgersmb/LedgerSMB) | Perl / PostgreSQL | SMB finance agent: natural-language ledger queries, automated bank reconciliation |
| **OpenSanctions** | CC-BY | [github.com/opensanctions/opensanctions](https://github.com/opensanctions/opensanctions) | Python / PostgreSQL | KYC/AML compliance agent: screen entities against global sanctions + PEP lists in real time |
| **Jube (AML/Fraud)** | AGPL-3.0 | [github.com/jube-home/aml-fraud-transaction-monitoring](https://github.com/jube-home/aml-fraud-transaction-monitoring) | C# / PostgreSQL | Real-time fraud + AML: supervised + unsupervised ML models, rule engine, case management |

## How to Add AI on Top

### Pattern A: Conversational Layer (2-3 weeks)
```
[Fineract / ERPNext base]
         ↓
[LangChain/LlamaIndex agent with tool access to base API]
         ↓
[Claude or Llama-3 as reasoning backbone]
         ↓
[Chat UI (Chainlit / Streamlit) for end user]
```

### Pattern B: Agentic Workflow (3-5 weeks)
```
[OpenBB data layer via MCP]
         ↓
[FinGPT sentiment + FinRL signals → multi-agent debate (TradingAgents pattern)]
         ↓
[Risk Manager agent reviews decision]
         ↓
[Hyperswitch executes payment / ccxt executes trade]
         ↓
[Audit log + explainability report for EU AI Act compliance]
```

### Pattern C: Embedded Compliance (4-6 weeks)
```
[Jube transaction monitoring (real-time scoring)]
         ↓
[LLM agent adds natural-language reasoning to flagged transactions]
         ↓
[OpenSanctions screening for entity KYC]
         ↓
[Case management workflow with human-in-the-loop approval]
         ↓
[Explainability report hashed + logged (EU AI Act requirement)]
```
