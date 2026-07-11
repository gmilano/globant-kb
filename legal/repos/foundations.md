# 🏗️ Repos fundacionales — Legal Services

> Bases sobre las cuales construir soluciones legales con AI. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-11 (v10)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [OpenContracts / cite](https://github.com/Open-Source-Legal/OpenContracts) | MIT | Open document intelligence platform. Programmable citation graph, human annotation ground truth, built-in MCP server, GraphQL + REST API. v3 "cite" release Jun 2026. | Sí — 1.4k ★ |
| [Docassemble](https://github.com/jhpyle/docassemble) | MIT | Expert system for guided interviews and document assembly. Python/YAML/Markdown. Auto-question-flow. Industry standard for legal document automation since 2016. 100s of legal aid implementations worldwide. | Sí — 1.2k ★ |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | Chinese legal LLM system: ChatGLM base + massive judicial corpus + supervised fine-tuning. Full pipeline: query → retrieval → generation. 9+ legal NLP datasets. Model for civil law jurisdictions. | Sí — 937 ★ |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | spaCy pipeline and model for NLP on unstructured legal text. NER, sentence boundary detection, legislation detection. Trained on UK case law corpus. Common law foundation. | Sí — 691 ★ |
| [LegalBench](https://github.com/HazyResearch/legalbench) | Apache-2.0 | 162 legal reasoning tasks designed by lawyers (Stanford/Hazy Research). Benchmark for evaluating LLM legal capabilities. Replacing LexGLUE in practice. Essential for vendor evaluation. | Sí — 520 ★ |
| [CourtListener](https://github.com/freelawproject/courtlistener) | Apache-2.0 | Free Law Project: 7M+ US court opinions, searchable + API + bulk download. Foundation for US legal research AI. Django + Elasticsearch + PostgreSQL. | Sí — 967 ★ |
| [awesome-legal-nlp](https://github.com/maastrichtlawtech/awesome-legal-nlp) | MIT | Curated list of LegalNLP resources: datasets, pretrained models, papers, tools. Maastricht Law Tech. Foundation reading for any legal NLP project. | Sí — 331 ★ |
| [awesome-legaltech](https://github.com/Vaquill-AI/awesome-legaltech) | MIT | Curated list of LegalTech resources: open source platforms, AI models, MCP servers, companies, datasets, tools for global legal ecosystem. 2026-current. Includes international coverage. | Sí — 210 ★ |
| [LegalBench-RAG](https://github.com/ZeroEntropy-AI/legalbenchrag) | Apache-2.0 | First open-source retrieval benchmark for the legal domain. Tests RAG pipelines on legal documents: 2,400+ QA pairs, 6 legal domains. Paper: arXiv 2408.10343. | Sí — 140 ★ |
| [Nomos](https://github.com/nomos-legal/nomos) | Apache-2.0 | Programming language for legal reasoning: typed rules with jurisdiction + validity dates, LLM fact extraction, defeasible logic, proof trees citing statutes. Novel formal approach. | Sí — ~90 ★ |

## Datasets fundacionales

| Dataset | Licencia | Descripción | Tamaño |
|---------|----------|-------------|--------|
| [CUAD](https://github.com/atticuslawtech/CUAD) | CC-BY-4.0 | 13,000 expert-labeled clauses, 510 contracts, 41 categories. Foundation dataset for contract AI. Almost every contract-AI product trains/evaluates on CUAD. | 510 contratos |
| [ContractNLI](https://stanfordnlp.github.io/contract-nli/) | MIT | Natural Language Inference for contracts: classify hypotheses as entailed/contradicted/unaddressed by contract text. Includes evidence span identification. | 607 contratos |
| [CourtListener Bulk Data](https://www.courtlistener.com/help/api/bulk-data/) | Apache-2.0 | Free Law Project: 7M+ US court opinions + oral arguments + judges + financial records + federal filings. PACER integration via RECAP browser extension. | 7M+ opiniones |
| [SCALES-OKN NLP](https://github.com/scales-okn/scales-nlp) | MIT | AI toolkit for legal research: deep learning models + utilities to download dockets from PACER, parse contents, classify docket entries with 70+ labels. NSF-funded. | 100k+ dockets |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas. v10.*
