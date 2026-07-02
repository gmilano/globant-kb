# Top AI Agents & Tools — Legal Industry

> Last updated: 2026-07-02 | Focus: MIT / Apache 2.0 licenses Globant can build on

## AI Agents Table

| # | Name | GitHub | License | Stars | Description |
|---|------|--------|---------|-------|-------------|
| 1 | Lavern | [AnttiHero/lavern](https://github.com/AnttiHero/lavern) | Apache 2.0 | 241+ | Agentic law firm: 67 specialist AI agents that review documents via evidence-backed debate with 10-pass verification and mandatory human gates; supports Anthropic, Mistral (EU), or fully local Ollama |
| 2 | OpenContracts | [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | 500+ | Open document intelligence platform: annotation, corpus management, AI agents, MCP server, vector search, GraphQL/REST API — built by a Latham & Watkins attorney, production since 2019 |
| 3 | LexNLP | [LexPredict/lexpredict-lexnlp](https://github.com/LexPredict/lexpredict-lexnlp) | Apache 2.0 | 1.2k+ | Extract structured facts (dates, parties, amounts, citations, definitions, geopolitical entities) from legal text; 100+ pattern-matching extractors for contracts and case law |
| 4 | ContraxSuite | [LexPredict/lexpredict-contraxsuite](https://github.com/LexPredict/lexpredict-contraxsuite) | AGPL-3.0* | 500+ | Contract analytics platform built on LexNLP: clause classification, contract comparison, compliance monitoring; *commercial license available for SaaS deployments |
| 5 | ai-legal-claude | [zubair-trabzada/ai-legal-claude](https://github.com/zubair-trabzada/ai-legal-claude) | MIT | 100+ | 14-skill Claude Code plugin: contract review with CUAD risk detection, NDA generation, compliance audit, negotiation strategy scoring, parallel 5-agent analysis, PDF report output |
| 6 | RAGFlow | [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Apache 2.0 | 30k+ | Deep-document RAG with native understanding of tables, figures, and complex layouts — the de facto ingestion engine for large legal document repositories requiring citation accuracy |
| 7 | CUAD | [TheAtticusProject/cuad](https://github.com/TheAtticusProject/cuad) | MIT | 1.2k+ | 510 commercial contracts with 13k+ expert labels across 41 clause types (NeurIPS 2021); includes RoBERTa and DeBERTa baseline models; gold-standard benchmark for contract review |
| 8 | InLegalBERT | [Law-AI/pretraining-bert](https://github.com/Law-AI/pretraining-bert) | MIT | 300+ | BERT pre-trained on curated legal corpus via dynamic MLM + NSP; extensible pattern for building jurisdiction-specific legal language models; weights at huggingface.co/law-ai/InLegalBERT |
| 9 | smolagents | [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache 2.0 | 27k+ | Hugging Face's minimal agent framework; used for legal research automation, multi-document summarization, and compliance monitoring pipelines |
| 10 | Legal-AI_Project | [OssamaLouati/Legal-AI_Project](https://github.com/OssamaLouati/Legal-AI_Project) | MIT | 100+ | Full-stack web app (Next.js + NLP + ML) for automated legal document analysis and risk identification; reference architecture for client-facing legal AI tools |

## Notes

- **Lavern is the most complete agentic solution**: 67 agents, debate protocol, precedent board, Telegram/email notifications — deploy as-is or fork for a client.
- **OpenContracts + MCP**: Built-in MCP server makes OpenContracts a natural backend for Claude-powered legal agents with zero custom integration code.
- **CUAD risk taxonomy**: The 41 clause types (termination, indemnification, non-compete, change of control, etc.) are the industry-standard risk vocabulary for contract review conversations.
- **RAGFlow before RAG**: Always run documents through RAGFlow's layout parser before any RAG pipeline — raw text extraction misses critical table and section structure in legal docs.
- **Avoid AGPL for SaaS**: ContraxSuite (AGPL-3.0) requires service-layer licensing for commercial deployments; use LexNLP (Apache 2.0) directly if building a proprietary product on top.
