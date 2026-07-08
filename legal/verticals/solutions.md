# Verticales de partida — Legal Services

> Plataformas verticales existentes, customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-08 (v3)

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| [Docassemble](https://github.com/jhpyle/docassemble) | MIT | jhpyle/docassemble | Python + YAML + Django | Entrevistas guiadas, formularios legales, ensamblado de documentos PDF/DOCX; base de Suffolk LIT Lab y juzgados de Massachusetts |
| [CourtListener](https://github.com/freelawproject/courtlistener) | Apache-2.0 | freelawproject/courtlistener | Django + Elasticsearch + PostgreSQL | Archivo judicial EE.UU.: 8M+ opiniones, PACER, citas, jueces; API REST + MCP connector para Claude (mayo 2026) |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | Apache-2.0 | Open-Source-Legal/OpenContracts | Python + React + GraphQL | DMS para inteligencia documental: anotación de contratos, análisis semántico colaborativo, exportación JSON/CSV |
| [OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) | Apache-2.0 | NodineLegal/OpenLawOffice | ASP.NET + SQL Server | Gestión de despacho legal: casos, facturación, tareas, clientes; base ERP para despachos pequeños y medianos |
| [ArkCase](https://www.arkcase.com/product/arkcase-open-source-case-management-platform/) | LGPL | ArkCase Community Edition | Java + Spring + Angular | Gestión de casos FedRAMP + HIPAA; OCR integrado, gestión de tiempo/gastos, localización, API; enfocado en gobierno y compliance |
| [RECAP Archive](https://github.com/freelawproject/recap) | BSD-3 | freelawproject/recap | Python + Django | Extensión browser para liberar documentos PACER (tribunales EE.UU.) al dominio público; archivo de millones de expedientes federales |
| [OpenNyAI](https://github.com/OpenNyAI/Opennyai) | MIT | OpenNyAI/Opennyai | Python + spaCy + Transformers | NLP end-to-end para documentos legales indios: NER, etiquetado retórico, sumarización; base para asistentes legales en India y LATAM civil law |
| [Bots.law](https://github.com/freelawproject/bots.law) | Apache-2.0 | freelawproject/bots.law | Python + Playwright | Automatización de acceso a datos judiciales; scrapers para múltiples sistemas judiciales estatales |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | ICLRandD/Blackstone | Python + spaCy | NLP especializado para texto legal inglés; modelo preentrenado ICLR & D para análisis de sentencias y contratos |
| [legalbenchrag](https://github.com/zeroentropy-ai/legalbenchrag) | MIT | zeroentropy-ai/legalbenchrag | Python + FAISS + Qdrant | Benchmark + corpus RAG legal (NDAs, M&A, contratos); base para construir y evaluar sistemas de recuperación legal |

---

## Cómo customizar con AI — Guía rápida

### Patrón 1: Docassemble + LLM (entrevistas legales inteligentes)
```
1. Fork jhpyle/docassemble
2. Añadir API call al LLM en cada paso de la entrevista (validación, sugerencia de respuesta)
3. Auto-rellenar campos del formulario con datos extraídos de documentos subidos (RAG)
4. Generar PDF final con firma digital integrada
Stack: Docassemble + Anthropic API + Tesseract OCR + weasyprint
```

### Patrón 2: CourtListener + Claude MCP (investigación legal)
```
1. Conectar CourtListener MCP a Claude Desktop o Claude Code
2. Agente consulta 8M+ opiniones + citas en lenguaje natural
3. Síntesis de precedentes con análisis IRAC automatizado
4. Output: memo legal con citas verificadas
Stack: CourtListener MCP + Claude claude-sonnet-5 + LangGraph
```

### Patrón 3: OpenLawOffice + AI (ERP despacho)
```
1. Fork NodineLegal/OpenLawOffice
2. Añadir módulo AI: transcripción de llamadas (Whisper), resumen de casos (LLM)
3. Alertas proactivas: vencimientos de plazos procesales via agente calendario
4. Dashboard de rentabilidad por cliente/caso con predicción de facturación
Stack: OpenLawOffice + Whisper + Anthropic API + React dashboard
```

---

## Plataformas comerciales de referencia (para benchmarking)

| Plataforma | Tipo | Referencia |
|------------|------|------------|
| Harvey | Agentic legal research | Referencia de mercado; LAB benchmark mayo 2026 |
| Thomson Reuters CoCounsel | Document review + Deep Research agéntico | Q1 2026, integrado en Westlaw |
| LexisNexis Protégé Work | Agentic layer + Shepard's Verify | Mayo 2026 |
| Enter (Brasil) | Mass litigation agent platform | Unicornio LATAM $100M mayo 2026 |
| RivoLegal (Argentina) | LegalTech integrado al sistema judicial argentino | Referencia local LATAM |
