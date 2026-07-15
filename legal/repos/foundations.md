# 🏗️ Foundational Repos — Legal

> Battle-tested open source bases to build legal AI on top of.
> Focus: permissive license, active community, real production use.
> Last updated: 2026-07-15

## Core Foundational Repos

| Repo | License | Stars | Description | AI Layer? |
|------|---------|-------|-------------|----------|
| [LexPredict/lexpredict-lexnlp](https://github.com/LexPredict/lexpredict-lexnlp) | Apache-2.0 | ~500 | Python library for NLP on legal text: entity extraction (parties, dates, money, citations, durations), document segmentation, unsupervised + supervised model building. Pre-LLM but embedded in most commercial legal AI platforms. | Yes — classic NLP pipeline, still valuable for structured extraction |
| [ICLRandD/Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | 691 | spaCy pipeline trained on UK and Commonwealth legal text. NER for cases, legislation, provisions, courts. Rare non-US legal NLP coverage. | Yes — use as feature extractor feeding LLM agents |
| [FudanDISC/DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | 937 | Full Chinese legal AI system: LLM backbone (ChatGLM), judicial reasoning, case retrieval, legal Q&A, document generation for PRC law. | Yes — end-to-end Chinese legal agent base |
| [jhpyle/docassemble](https://github.com/jhpyle/docassemble) | MIT | 900+ | Expert system for legal document automation. YAML + Python-powered guided interview flows that produce PDFs, DOCX, and RTF. Dominant in US legal aid and court self-help. Can be wrapped with LLM backends for conversational intake. | Yes — wrap with LLM for intelligent intake + drafting |
| [freelawproject/courtlistener](https://github.com/freelawproject/courtlistener) | Apache-2.0 | — | Full stack of Free Law Project: CourtListener (250M pages of US court opinions), RECAP (PACER public archive), eyecite (US legal citation parser), Juriscraper (Python scrapers for 100+ US courts). The data backbone of US legal AI. | Yes — data source for RAG, search, precedent agents |
| [freelawproject/eyecite](https://github.com/freelawproject/eyecite) | BSD-2-Clause | — | Fast, accurate US legal citation parser. Handles reporter abbreviations, volume numbers, page ranges, pinpoint citations. Best-in-class for US citation normalization. | Yes — citation normalization layer in legal research pipelines |
| [maastrichtlawtech/awesome-legal-nlp](https://github.com/maastrichtlawtech/awesome-legal-nlp) | MIT | 331 | Curated list of LegalNLP papers, datasets, models, benchmarks, tools from Maastricht University LawTech lab. Essential research map. | Yes — discovery tool for datasets and benchmarks |
| [Jeryi-Sun/LLM-and-Law](https://github.com/Jeryi-Sun/LLM-and-Law) | MIT | — | Comprehensive survey of LLM + law papers: legal NLP tasks, benchmarks, datasets, LegalBench, evaluation frameworks. Living document tracking the research frontier. | Yes — track state-of-the-art before building |
| [Equall/Saul-7B-Instruct-v1](https://huggingface.co/Equall/Saul-7B-Instruct-v1) | MIT | — | SaulLM-7B instruction-tuned on 30B legal tokens. Family also includes SaulLM-54B and SaulLM-141B, outperforming GPT-4 on LegalBench. Run locally with Ollama or vLLM. | Yes — drop-in LLM backend for any legal agent |
| [contract-understanding-atticus/cuad](https://huggingface.co/datasets/cuad) | CC-BY-4.0 | — | CUAD: Contract Understanding Atticus Dataset. 510 commercial contracts, 41 legal clause types (exclusivity, IP ownership, limitation of liability, etc.), 13,000+ expert annotations. Standard benchmark and training data for contract review. | Yes — training and evaluation data for contract agents |

## Supporting Ecosystem

| Repo | License | Notes |
|------|---------|-------|
| [NodineLegal/OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) | Apache-2.0 | Law office management: case management, billing, tasking. Rails app, AI-extensible. |
| [Liquid-Legal-Institute/Legal-LLMs-GPTs](https://github.com/Liquid-Legal-Institute/Legal-LLMs-GPTs) | MIT | Community registry tracking legal LLMs, GPTs, fine-tunes as they emerge |
| [Vaquill-AI/awesome-legaltech](https://github.com/Vaquill-AI/awesome-legaltech) | MIT | Curated index: platforms, AI models, MCP servers, companies, datasets — global legal ecosystem |
| [irlab-sdu/fuzi.mingcha](https://github.com/irlab-sdu/fuzi.mingcha) | Apache-2.0 | Chinese judicial LLM (Shandong Univ × Inspur × China University of Political Science) |

---
*See also: `verticals/solutions.md` for full vertical platforms.*
