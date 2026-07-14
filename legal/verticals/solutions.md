# 🏭 Verticales de partida — Legal Services

> Plataformas verticales open source customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica encima.
> Última actualización: 2026-07-14 (v7)

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| [OpenCLM](https://openclm.ai/) | AGPL-3.0 | github.com/openclm | Python/Django | Contract Lifecycle Management: repository, clause library, approvals, e-signatures, tracking, analytics |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | github.com/Open-Source-Legal/OpenContracts | Python/React/GraphQL | DMS agentico: citation graph, MCP server, semantic search, AI annotation |
| [CourtListener](https://www.courtlistener.com/) | CC BY-SA + Apache-2.0 | github.com/freelawproject/courtlistener | Django/Elasticsearch | 250M+ páginas tribunales US; API pública; base para legal research AI |
| [Odoo Legal Module](https://www.odoo.com/app/legal) | LGPL-3.0 (CE) | github.com/odoo/odoo | Python/JS | ERP con contratos, firma electrónica, honorarios; Community Edition libre |
| [ERPNext / Frappe](https://github.com/frappe/erpnext) | GPL-3.0 | github.com/frappe/erpnext | Python/JS | ERP con contratos, billing, HR legal; marketplace AI apps |
| [Harvard Caselaw Access](https://case.law/) | CC BY 4.0 | github.com/harvard-lil/capstone | Python | 6.9M casos, 360 años de derecho US; bulk data + API REST; abierto desde 2024 |
| [OLAW](https://github.com/harvard-lil/olaw) | MIT | github.com/harvard-lil/olaw | Python/FastAPI | Workbench RAG legal + CourtListener; extensible a cualquier API legal |
| [SuiteCRM](https://suitecrm.com/) | AGPL-3.0 | github.com/salesagility/SuiteCRM | PHP | CRM con contratos, casos, contactos; integrable con AI para gestión de clientes |
| [lawglance](https://github.com/lawglance/lawglance) | MIT | github.com/lawglance/lawglance | Python | Legal assistant RAG multi-jurisdicción; voz; expandible a corpus legal local |

---

## Cómo customizar con AI

### Patrón 1: OpenContracts como centro de inteligencia legal
```
Corpus legales -> OpenContracts DMS (MIT) -> MCP endpoint -> Claude/Cursor agent
  - list_corpora, search_documents, follow_citation_edges, propose_annotations
  -> Output: insights, redlines, summaries, risk flags
```

### Patrón 2: OpenCLM + AI contract review
```
OpenCLM (AGPL-3.0) -> webhook on upload -> AI Review Agent (Claude + CUAD)
  - Detecta 41 tipos de cláusulas CUAD
  - Genera redlines en tracked-changes Word
  -> Contrato con tags de riesgo -> aprobación humana en flujo CLM
```

### Patrón 3: CourtListener + OLAW para legal research
```
Abogado pregunta -> OLAW (Harvard LIL, MIT) -> CourtListener API (250M+ docs)
  -> Claude genera memorandum con citas -> courtlistener-mcp verifica cada cita
```

### Para LATAM
- Brasil: Reforma Tributária (IBS/CBS) — corpus TCF/Senado + OLAW
- México: SAT APIs + LegalBench español
- Colombia: rama judicial open data + lawglance base
- Argentina: InfoLEG database + OpenContracts ingest
