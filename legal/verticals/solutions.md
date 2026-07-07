# Verticales de partida — Legal

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-07

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| [Docassemble](https://github.com/jhpyle/docassemble) | MIT | docassemble.org | Python/YAML/Markdown | Document automation, guided interviews, court forms — el Odoo del legal doc assembly |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | opensource.legal | Django, React, PostgreSQL, pgvector | DMS agéntico con MCP server, annotation, vector search, AI agents integrados |
| [OpenSign](https://github.com/OpenSignLabs/OpenSign) | AGPL-3.0 | opensignlabs.com | Parse Server, React | E-signature completo: alternativa self-hosted a DocuSign. 6.3k+ estrellas |
| [ArkCase](https://www.arkcase.com) | Apache-2.0 | arkcase.com | Java/Spring, Angular | Case management adaptativo: FOIA, complaint management, legal aid. FedRAMP ready |
| [CourtListener](https://github.com/freelawproject/courtlistener) | Apache-2.0 | courtlistener.com | Django, Elasticsearch | Archivo court data: 9M+ opiniones, RECAP/PACER, oral arguments, API REST |
| [FreeEed](https://freeeed.org) | Apache-2.0 | freeeed.org | Java, Lucene | AI-enabled e-discovery con OCR y metadata extraction. Alternativa a Relativity |
| [ClinicCases](https://github.com/judsonmitchell/ClinicCases) | GPL-3.0 | clinicases.com | PHP | Case management para law school clinics y legal aid orgs. Probado en producción |
| [Wraft](https://github.com/wraft/wraft) | Apache-2.0 | wraft.co | Elixir/Phoenix, React | Document lifecycle management con version control y workflows legales |
| [Suzie Law](https://github.com/firelex/suzielaw) | Apache-2.0 | — | Next.js, Python | Alternativa self-hostable a Harvey: 12 personas legales, 160+ workflows, multi-jurisdicción |
| [J-Lawyer](https://www.j-lawyer.org) | AGPL-3.0 | j-lawyer.org | Java/Swing | Practice management completo para firmas alemanas — adaptable a LATAM |
| [Juriscraper](https://github.com/freelawproject/juriscraper) | Apache-2.0 | free.law | Python | Scraper para 400+ cortes US + PACER. Base para cualquier pipeline de datos legales |
| [CommonAccord](https://github.com/CommonAccord/Cmacc-Org) | Apache-2.0 | commonaccord.org | JavaScript/Markdown | Smart contracts como datos linkables. Accord Project ecosystem |

---

## Plataformas de gestión para firmas — mapa

### Para firmas pequeñas/medianas
```
ClinicCases (GPL)     → Case tracking básico + AI layer encima
    ↓ integrar con
Docassemble (MIT)     → Document automation (forms, contratos)
    ↓ integrar con
OpenSign (AGPL)       → E-signature de documentos generados
    ↓ resultado
Firma full-stack open source por < $5k setup
```

### Para e-discovery / litigación
```
FreeEed (Apache-2.0)  → Ingesta y procesamiento de documentos
    ↓
OpenContracts (MIT)   → Annotation + AI analysis + MCP interface
    ↓
CourtListener MCP     → Research de precedentes y case law
    ↓ resultado
E-discovery pipeline completo sin Relativity ni Kira
```

### Para contratos corporativos / in-house
```
OpenContracts (MIT)   → DMS agéntico + annotation
    ↓
claude-legal-skill    → CUAD risk detection + redlines
    ↓
adeu (MIT)            → Track Changes en Word via MCP
    ↓
OpenSign (AGPL)       → E-signature final
    ↓ resultado
Contract lifecycle completo: draft → review → sign → archive
```

---

## Cómo customizar con AI

1. **Fork del repo base** — Docassemble, ArkCase o OpenContracts según el caso
2. **Añadir MCP layer** — vaquill-mcp + courtlistener-mcp para datos jurisdiccionales
3. **Integrar LLM** — SaulLM-7B (MIT) para legal-domain fine-tuning, o Claude API vía MCP
4. **Wrappear flujos con agentes** — LangGraph o lavern para orquestación multi-step
5. **UI conversacional** — Dify (Apache) o custom React sobre el sistema base
6. **Compliance audit trail** — Logging de todas las decisiones AI con human-in-the-loop gates

---

## Plataformas relevantes para LATAM

| País | Plataforma | Contexto |
|------|-----------|----------|
| Brasil | Docassemble + módulos portugués | Tribunais usam guided interviews para formularios. Hay adaptaciones brasileñas activas. |
| Brasil | [direito-familiar-imobiliario](https://github.com/maiconfuhr/direito-familiar-imobiliario) | MIT, mayo 2026 — civil law BR actual (inmuebles, divorcios, herencias) |
| México | ArkCase Community | Para organizaciones de legal aid y servicios de defensa pública |
| Argentina | CommonAccord | Adaptaciones de civil law. Smart contracts en contratos inmobiliarios |
| Colombia/Chile | OpenSign | e-signature que reemplaza DocuSign sin costo de licencia por firma |
| LATAM general | Suzie Law | Multi-jurisdicción por diseño. Instrucciones en español disponibles |
