# 🏗️ Repos fundacionales — Legal Services

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-12

## Plataformas de document intelligence y analytics

| Repo | Licencia | Descripción | Base para AI |
|------|----------|-------------|--------------|
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | Open document intelligence platform: citation graph programable sobre corpus de contratos. MCP nativo, GraphQL+REST, React UI, anotación humana + agentes. Self-hosted. | **Sí** — 1.4k ★ |
| [ContraxSuite](https://github.com/LexPredict/lexpredict-contraxsuite) | AGPLv3 | Contract analytics platform de LexPredict. Extrae 20+ tipos de información, cientos de tipos de cláusulas, clustering y clasificación pre-entrenados. Adoptado por Baker McKenzie. | **Sí** — 600+ ★ |
| [Docassemble](https://github.com/jhpyle/docassemble) | MIT | Expert system para entrevistas guiadas y document assembly (Python/YAML/Markdown). Estándar de facto en access-to-justice. Usado por cortes, clínicas legales y organizaciones de aid. | **Sí** — 2.9k ★ |

## NLP y extracción de entidades legales

| Repo | Licencia | Descripción | Base para AI |
|------|----------|-------------|--------------|
| [LexNLP](https://github.com/LexPredict/lexpredict-lexnlp) | AGPLv3 | Python library para extraer 18+ tipos de entidades de texto legal: fechas, dinero, partes, citaciones, regulaciones, duraciones. Vendored en la mayoría de herramientas comerciales. | **Sí** — 790 ★ |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | spaCy pipeline para texto legal inglés — NER especializada (LEGISLATION, CASE, COURT, JUDGE, PROVISION), segmentación de oraciones adaptada a estilo legal. | **Sí** — 691 ★ |
| [awesome-legal-nlp](https://github.com/maastrichtlawtech/awesome-legal-nlp) | MIT | Lista curada de recursos de Legal NLP: datasets, modelos, papers, herramientas. Maastricht Law + Tech. Referencia de entrada al espacio. | **Sí** (survey) — 331 ★ |

## Modelos de lenguaje legal

| Repo | Licencia | Descripción | Base para AI |
|------|----------|-------------|--------------|
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | LLM legal chino de Fudan University: consulta legal, razonamiento judicial, predicción de fallos, recuperación de estatutos. Entrenado en corpus judicial masivo sobre ChatGLM. | **Sí** — 937 ★ |
| [fuzi.mingcha](https://github.com/irlab-sdu/fuzi.mingcha) | Apache-2.0 | Modelo judicial chino de Shandong University + Inspur: análisis de sentencias, razonamiento sobre hechos, evaluación de evidencias. Joint con China University of Political Science and Law. | **Sí** — 385 ★ |

## Datasets y benchmarks

| Repo | Licencia | Descripción | Uso |
|------|----------|-------------|-----|
| [CUAD](https://github.com/TheAtticusProject/cuad) | CC BY 4.0 | 510 contratos, 13k+ anotaciones de expertos para 41 tipos de cláusulas. Gold standard para evaluar AI de contratos. Usado en claude-legal-skill y otros. | Fine-tuning / eval |
| [LegalBench](https://github.com/HazyResearch/legalbench) | CC BY 4.0 | 162 tareas para evaluar LLMs en razonamiento legal (Stanford/HAZy Research). Statutory interpretation, rule application, issue spotting, contract Q&A. | Benchmark — estándar industria |
| [LexGLUE](https://github.com/coastalcph/lex-glue) | Apache-2.0 | Legal NLP benchmark: 7 datasets (ECHR, EU legislation, US court opinions, contract clauses). Comparativa para papers académicos. | NLP benchmark |

## Datos abiertos de jurisprudencia

| Fuente | Licencia | Descripción | Cobertura |
|--------|----------|-------------|----------|
| [CourtListener](https://www.courtlistener.com/) | Free/CC | Free Law Project: 250M+ páginas de opiniones judiciales US, dockets, argumentos orales. API REST + bulk download. | USA — federal + state |
| [Caselaw Access Project](https://case.law/) | CC BY 4.0 | Harvard Law: 6.9M casos, 360 años de jurisprudencia US (1636-2019). Fully open desde 2024. | USA — histórico |
| [EUR-Lex](https://eur-lex.europa.eu/) | Free/CC | Legislación, reglamentos y jurisprudencia de la UE. API disponible. Base para compliance EU. | Unión Europea |

---

## Notas de licencias

- **MIT / Apache 2.0 / CC BY** → Globant puede usar sin restricciones comerciales
- **AGPLv3** (LexNLP, ContraxSuite) → requiere que el código modificado también sea open source; evaluar dual-license o acuerdo comercial con LexPredict antes de usar en cliente
- **CC BY 4.0** (CUAD, LegalBench) → datasets libres para uso comercial con atribución

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
