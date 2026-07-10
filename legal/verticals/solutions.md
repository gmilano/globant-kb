# Verticales de partida — Legal Services

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-10 (v8)

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso principal |
|------------|----------|------------|-------|----------------------|
| **OpenLawOffice** | Apache-2.0 | [NodineLegal/OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) | .NET + SQL Server | Case management, billing, tasking para firmas medianas; base sólida para AI copilot |
| **Docassemble** | MIT | [jhpyle/docassemble](https://github.com/jhpyle/docassemble) | Python + YAML | Automatización de entrevistas legales guiadas → contratos/formularios; Python 100% customizable con LLMs |
| **Odoo Community (módulo legal)** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) + [legal_case_management en Odoo Apps](https://apps.odoo.com/apps/modules/16.0/legal_case_management) | Python + PostgreSQL | ERP completo para despachos: CRM, facturación, contratos, timesheets; módulo legal en Odoo Apps |
| **CourtListener** | Apache-2.0 | [freelawproject/courtlistener](https://github.com/freelawproject/courtlistener) | Django + PostgreSQL + Elasticsearch | Investigación legal US: 250M+ páginas, PACER, citas, argumentos; MCP nativo (May 2026) |
| **Aleph** | MIT | [aleph-data/aleph](https://github.com/aleph-data/aleph) | Python + TypeScript + Elasticsearch | Plataforma investigativa documental: indexa fugas, registros corporativos, leaks; usado por ~250 periodistas y ONG legales |
| **OpenContracts** | Apache-2.0 | [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | Django + React | DMS agéntico: anotación semántica, análisis de contratos, API REST; base para contract intelligence |
| **Mike** | AGPL-3.0 | [willchen96/mike](https://github.com/willchen96/mike) | Next.js + Express + Supabase | Plataforma legal AI auto-hospedada: chat con docs, redlines .docx, 12 personas; alternativa Harvey |
| **Lavern** | Apache-2.0 | [AnttiHero/lavern](https://github.com/AnttiHero/lavern) | TypeScript | Firma legal agéntica completa: 67 agentes, 8 workflows, human gates; base para servicios legales AI B2B |

## Cómo customizar con AI

### Stack recomendado Globant (LATAM)

```
[OpenLawOffice / Odoo]          ← gestión casos + billing
        ↓
[Docassemble]                   ← intake + formularios automáticos
        ↓
[Claude API + Managed Agents]   ← review contratos, investigación, redacción
        ↓
[CourtListener MCP]             ← jurisprudencia US
[FOLIO MCP]                     ← ontología legal multilingüe
        ↓
[Vaara]                         ← audit logs EU AI Act / LGPD
        ↓
[UI conversacional (Next.js)]   ← interfaz abogado / cliente
```

### Pasos de implementación

1. Fork OpenLawOffice o Odoo según tamaño de firma
2. Integrar Docassemble para intake digital
3. Conectar Claude API para redacción y revisión
4. Añadir CourtListener MCP + FOLIO MCP como herramientas del agente
5. Envolver con Vaara para compliance EU AI Act / LGPD
6. UI conversacional en Next.js sobre todo el stack

### Licencias a verificar

- **LGPL-3.0** (Odoo): puede linking con código propietario OK
- **AGPL-3.0** (Mike, Vaara, legal-mcp): requiere open source si se distribuye
- **Apache-2.0** (Lavern, OpenLawOffice, CourtListener): más permisiva, compatible con SaaS
- **MIT** (Docassemble, FOLIO MCP): máxima permisividad

---
*Ver también: `agents/top.md` para agentes AI disponibles y `compose/patterns.md` para recetas.*
