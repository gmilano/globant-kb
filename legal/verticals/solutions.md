# Verticales de partida — Legal Services

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-06

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso |
|------------|----------|------------|-------|-------------|
| [OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) | Apache-2.0 | NodineLegal/OpenLawOffice | .NET / C# / SQL Server | Gestión de despacho: cases, tareas, billing, contactos. Base sólida para añadir AI sobre workflows. |
| [ArkCase Community Edition](https://www.arkcase.com/product/arkcase-open-source-case-management-platform/) | Apache-2.0 | arkcase.com/open-source | Java / Spring / Angular | Case management completo: FOIA, complaint management, documentos, tiempo y gastos, colaboración. Usado en sector público. |
| [SuiteCRM](https://github.com/salesagility/SuiteCRM) | AGPL-3.0 | salesagility/SuiteCRM | PHP / MySQL | CRM extensible para despachos: gestión de clientes, casos, documentos, facturación. Extensiones legales disponibles (Fynsis). |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | Open-Source-Legal/OpenContracts | Python / Django / React / GraphQL | DMS agéntico + contract intelligence. MCP server integrado. La opción más avanzada AI-natively. |
| [ERPNext / Frappe](https://github.com/frappe/erpnext) | GPL-3.0 | frappe/erpnext | Python / JS / MariaDB | ERP general con módulos para firmas de servicios profesionales: proyectos, billing, RRHH, CRM. Base para despachos medianos. |
| [Odoo Community](https://github.com/odoo/odoo) | LGPL-3.0 | odoo/odoo | Python / PostgreSQL | ERP modular con módulos de project management, timesheet, invoicing, HR. Extensible para servicios legales. |
| [Mike OSS](https://github.com/willchen96/mike) | AGPL-3.0 | willchen96/mike | Python / React | Plataforma legal AI completa: research, drafting, review. Se auto-hospeda y usa API key propia. |

---

## Detalle de plataformas clave

### OpenLawOffice
- **Funcionalidades**: gestión de casos, billing por horas, tareas/subtareas, notas, contactos clientes
- **Integración AI**: añadir endpoint Claude/Ollama para summarize case, draft briefs, time entry auto-fill
- **LATAM fit**: UI en inglés, pero stack estándar, fácil localización
- **Tiempo de onboarding**: 1-2 semanas para MVP con AI layer

### ArkCase Community Edition
- **Funcionalidades**: case management, document management, workflow engine, time tracking
- **Integración AI**: API REST sobre casos + ingesta de documentos → agentes de categorización, extracción, notificaciones
- **LATAM fit**: usado en sector público, alineado con procesos gubernamentales
- **Tiempo de onboarding**: 2-4 semanas (Java, configuración más compleja)

### SuiteCRM + extensión legal
- **Funcionalidades**: CRM completo con módulo Cases, Documents, Tasks, Invoices, Reports
- **Integración AI**: Zapier/n8n → Claude para draft emails, summarize case history, flag upcoming deadlines
- **LATAM fit**: gran comunidad, hosting local disponible
- **Tiempo de onboarding**: 1 semana para setup, 2-3 semanas para AI layer

### OpenContracts (opción recomendada para proyectos AI-first)
- **Funcionalidades**: DMS agéntico, annotation, semantic search, MCP server nativo, GraphQL API
- **Integración AI**: ya viene con MCP + agentes. Sólo necesitás conectar Claude + definir corpus.
- **LATAM fit**: self-hosted, datos soberanos, API key propia
- **Tiempo de onboarding**: 1 semana para levantar + 2 semanas para customizar agentes

---

## Cómo customizar con AI

### Stack recomendado (2026)

```
[Plataforma base: OpenContracts / OpenLawOffice / SuiteCRM]
          ↓
[Ingesta de documentos: PDF, DOCX, emails]
          ↓
[Vector DB: Qdrant / pgvector / Chroma]
          ↓
[Agentes: Claude API + MCP server (OpenContracts) / lavern]
          ↓
[UI: chat interface sobre plataforma base ó nueva React app]
```

### Pasos generales

1. **Fork** del repo base elegido
2. **Ingesta**: pipeline de documentos → vectores (usar LexNLP para extracción previa, mejorar chunks)
3. **Agente RAG**: Claude + tool_use → queries sobre vector DB + citation graph de OpenContracts
4. **Verificación**: integrar LegalBench tasks como test suite para validar calidad de respuestas
5. **UI conversacional**: chat en sidebar o standalone sobre el sistema base

---
*Ver también: `agents/top.md` para agentes a componer sobre estas plataformas.*
