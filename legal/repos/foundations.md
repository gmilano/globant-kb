# Repos fundacionales — Legal AI

> Bases sobre las cuales construir soluciones para la industria legal.
> Licencia abierta, comunidad activa. Última actualización: 2026-07-07

## Plataformas y frameworks base

| Repo | Licencia | Descripción | Base para AI |
|------|----------|-------------|---------------|
| [docassemble](https://github.com/jhpyle/docassemble) | MIT | Gold-standard para guided legal interviews y document assembly. Python/YAML. Usado por courts, legal aid orgs y law firms en US. | Sí — ~1.8k ★ |
| [courtlistener](https://github.com/freelawproject/courtlistener) | Apache-2.0 | Django: mayor archivo open US de court data. 9M+ opiniones, oral arguments, jueces, PACER/RECAP filings. API REST + semantic search. | Sí — ~1.2k ★ |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | Document intelligence platform: annotation, AI agents, MCP server, vector search, citation graph. Self-hostable. Construido desde 2019. | Sí — ~400 ★ |
| [OpenSign](https://github.com/OpenSignLabs/OpenSign) | AGPL-3.0 | Alternativa open source a DocuSign: Parse Server + React. e-signature completo con audit trails. Alternativa real para clientes. | Sí — ~6.3k ★ |
| [juriscraper](https://github.com/freelawproject/juriscraper) | Apache-2.0 | Python library para scraping de 400+ cortes US + PACER. Componente core del Free Law Project. Para ingesta de datos legales. | Sí — ~700 ★ |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | Pipeline spaCy para NLP en texto legal UK no estructurado: NER (parties, judges, cites), clasificación de oraciones. ICLR&D. | Sí — ~691 ★ |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | LLM legal chino de Fudan: statute retrieval, syllogistic reasoning, diálogo legal. Mejor LLM legal open source para mercados de habla china. | Sí — ~937 ★ |
| [CUAD](https://github.com/TheAtticusProject/cuad) | CC-BY-4.0 | Dataset benchmark: 13,000+ labels en 510 contratos comerciales, 41 categorías de cláusulas. NeurIPS 2021. Estándar para eval de contract review. | Dataset — ~800 ★ |
| [Opennyai](https://github.com/OpenNyAI/Opennyai) | MIT | NLP pipeline para documentos legales indios: NER, rhetorical roles, summarization. Corte Suprema India. Escalable a otras jurisdicciones. | Sí — ~350 ★ |
| [CommonAccord](https://github.com/CommonAccord/Cmacc-Org) | Apache-2.0 | Documentos legales como datos linkables y versionados (Git for law). Base para smart contracts legibles por humanos y máquinas. | Sí — ~280 ★ |

---

## LLMs legales fundacionales

| Modelo | Licencia | Descripción | Params |
|--------|----------|-------------|--------|
| [SaulLM-7B](https://huggingface.co/Equall/Saul-7B-Instruct-v1) | MIT | Mistral 7B pre-entrenado en 30B+ tokens legales inglés. Base para fine-tuning legal en producción. Equall AI. | 7B |
| [SaulLM-141B](https://huggingface.co/Equall) | MIT | Variante large. Mejor benchmark legal de LLMs open source a noviembre 2024. | 141B |
| [Legal-BERT](https://huggingface.co/nlpaueb/legal-bert-base-uncased) | MIT | BERT pre-entrenado en legislación EU/US + casos. Base estándar para clasificación/NER legal. | 110M |
| [Kanon-2-Embedder](https://huggingface.co/isaacus/kanon-2) | Apache-2.0 | #1 en MLEB benchmark para legal semantic search. Contexto 16K tokens. Para RAG sobre corpus legales. | ~350M |
| [Aalap-Mistral-7B](https://huggingface.co/opennyaiorg/Aalap-Mistral-7B-v0.1-bf16) | Apache-2.0 | 32K contexto para tareas paralegal indias. OpenNyAI. Adaptable a otras jurisdicciones del sur global. | 7B |

---

## Datasets y benchmarks legales

| Dataset | Licencia | Descripción | Tamaño |
|---------|----------|-------------|--------|
| [CUAD](https://github.com/TheAtticusProject/cuad) | CC-BY-4.0 | 510 contratos, 41 cláusulas, 13k+ labels. Gold standard para contract review. | 510 contratos |
| [LegalBench](https://github.com/HazyResearch/legalbench) | Apache-2.0 | 162 tareas de razonamiento legal en inglés. Leaderboard vivo en vals.ai. | 162 tareas |
| [Pile of Law](https://huggingface.co/datasets/pile-of-law/pile-of-law) | CC-BY-4.0 | 256GB de texto legal: case law, statutes, reglamentos, contratos. Corpus de pre-training. | 256GB |
| [legal-ml-datasets](https://github.com/neelguha/legal-ml-datasets) | MIT | Colección curada de datasets y tareas para legal ML. | Multi |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
