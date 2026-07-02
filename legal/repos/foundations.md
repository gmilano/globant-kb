# Foundational Repositories — Legal

> The open-source bedrock that Globant legal AI engagements should be built on or integrate with.

## Document Intelligence & NLP

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | 500+ | Full document intelligence platform: annotation, corpus management, AI agents, MCP server, vector search, GraphQL/REST API. Built for legal + agentic world. Production since 2019. |
| [LexPredict/lexpredict-lexnlp](https://github.com/LexPredict/lexpredict-lexnlp) | Apache 2.0 | 1.2k+ | LexNLP: extract dates, parties, amounts, citations, definitions, geopolitical entities from legal text. 100+ extractors for English contracts + case law. Most practical library for production legal NLP. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Apache 2.0 | 30k+ | RAGFlow: deep-document parsing with layout, table, figure understanding. Required pre-processing for any legal document RAG system requiring citation accuracy and source attribution. |
| [LexPredict/lexpredict-contraxsuite](https://github.com/LexPredict/lexpredict-contraxsuite) | AGPL-3.0 | 500+ | ContraxSuite: contract analytics platform built on LexNLP — clause classification, contract comparison, compliance monitoring. Commercial license available for SaaS use. |

## Benchmarks & Datasets

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [TheAtticusProject/cuad](https://github.com/TheAtticusProject/cuad) | MIT | 1.2k+ | CUAD: 510 commercial contracts, 13k+ expert labels, 41 clause types (NeurIPS 2021). Includes RoBERTa/DeBERTa baselines. Gold standard for contract review evaluation. Use the 41 types as your risk taxonomy. |
| [openlegaldata/awesome-legal-data](https://github.com/openlegaldata/awesome-legal-data) | MIT | 400+ | Curated collection of legal datasets: court opinions, legislation, contracts, regulatory filings across US, EU, and other jurisdictions. Starting point for building training data. |
| [maastrichtlawtech/awesome-legal-nlp](https://github.com/maastrichtlawtech/awesome-legal-nlp) | MIT | 400+ | 300+ curated legal NLP resources: models, datasets, papers, tools. Maastricht Law Tech covers EU/international law. Exhaustive map of the legal NLP landscape. |

## AI Agent Infrastructure

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [AnttiHero/lavern](https://github.com/AnttiHero/lavern) | Apache 2.0 | 241+ | Lavern: reference implementation of a multi-agent law firm. 67 agents, debate protocol, 10-pass verification, human gates, precedent board, notification system. Apache 2.0 — fork-ready for client engagements. |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache 2.0 | 27k+ | Smolagents: minimal HuggingFace agent framework. Used for legal research bots, document summarization pipelines, multi-step compliance checks. Low overhead, easy to extend. |
| [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | MIT | 50k+ | OpenHands: autonomous AI engineer. Useful for building and maintaining legal workflow automations, contract parsing scripts, compliance monitoring dashboards. |

## Pre-trained Models

| Repo / Model | License | Stars | Description |
|-------------|---------|-------|-------------|
| [Law-AI/pretraining-bert](https://github.com/Law-AI/pretraining-bert) | MIT | 300+ | InLegalBERT code: BERT pre-trained on legal corpus via dynamic MLM + NSP. Extensible to any jurisdiction. Model weights at huggingface.co/law-ai/InLegalBERT. |
| [felipemaiapolo/legalnlp](https://github.com/felipemaiapolo/legalnlp) | MIT | 300+ | LegalNLP: Brazilian legal NLP — tokenizer, POS tagging, NER, embeddings trained on Brazilian court decisions. Reference implementation for non-English / jurisdiction-specific legal NLP. |
| [Vaquill-AI/awesome-legaltech](https://github.com/Vaquill-AI/awesome-legaltech) | MIT | 500+ | Most comprehensive curated list of legaltech AI resources: MCP servers, open-source platforms, AI models, datasets, companies. Use as research starting point for any legal engagement. |
