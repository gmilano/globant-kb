# Verticales de partida — Legal Services

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-13

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Docassemble** | MIT | [github.com/jhpyle/docassemble](https://github.com/jhpyle/docassemble) | Python, YAML, Markdown, Docker | Guided interviews + document assembly. Usado en portales de tribunales de EE.UU. Base perfecta para automatizar formularios legales con AI. |
| **OpenContracts** | MIT | [github.com/Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | Python, React, GraphQL, Docker | DMS agentico self-hosted. Citation graph, MCP server nativo, API REST. Para law firms y legal ops que necesitan inteligencia documental propia. |
| **OpenLawOffice** | MIT | [github.com/NodineLegal/OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) | .NET/ASP.NET | Law office management: case management, billing, tasking. Base para construir AI layer sobre gestión de casos. |
| **ArkCase CE** | Apache-2.0 | [arkcase.com/product/arkcase-open-source](https://www.arkcase.com/product/arkcase-open-source-case-management-platform/) | Java, Spring, Angular | Case management empresarial: FOIA, Complaint, Incident, Correspondence. Gov + enterprise. Modular con plugins. |
| **Lavern** | Apache-2.0 | [github.com/AnttiHero/lavern](https://github.com/AnttiHero/lavern) | TypeScript, Node.js | Agentic law firm completa: 67 agentes, debate protocol, human gates, audit bundle. Para law firms queriendo una plataforma AI propia. |
| **Nomos** (HAQQ) | Open (self-hostable) | [opensource.legal](https://opensource.legal/) | Python/TypeScript | "Cursor for legal" — agent-native legal interface. Legal AI Engine + abogado como usuarios de primera clase. |
| **Mike** | Open (BYOK) | [mikeoss.com](https://mikeoss.com/) | — | Clon OSS de Harvey/Legora. Bring-your-own API key, sin per-seat pricing. Para firms que necesitan capacidades premium sin los costos premium. |
| **open-agreements** | MIT | [github.com/open-agreements/open-agreements](https://github.com/open-agreements/open-agreements) | — | Fill standard legal agreement templates → DOCX firmables. Micro-herramienta para automatizar contratos estándar. |

## Ecosistema de datos legales

| Fuente | Licencia | Cobertura |
|--------|----------|-----------|
| [CourtListener](https://courtlistener.com) | Apache-2.0 | 250M+ páginas de datos de tribunales EE.UU. Búsqueda full-text, API REST. |
| [Harvard Caselaw Access Project](https://case.law) | Open | 6.9M casos, 360 años de case law estadounidense. Completamente abierto desde 2024. |
| [Justia](https://law.justia.com) | Free access | US federal + state law, codes, regulations. |

## Cómo customizar con AI

### Arquitectura recomendada para law firm / legal ops

```
[Plataforma vertical base — Docassemble / OpenContracts / ArkCase]
          ↓
[Capa MCP — legal-mcp servers (US statutes, patent, CanLII)]
          ↓
[Agentes especializados — lavern / claude-legal-skill / SaulLM]
          ↓
[Orchestration — LangGraph / CrewAI / lavern debate protocol]
          ↓
[Human gate — revisión abogado antes de output final]
          ↓
[UI conversacional / API para el cliente]
```

### Pasos de implementación

1. **Fork del repo base** — elegir según caso de uso (Docassemble para formularios, OpenContracts para DMS, ArkCase para case management)
2. **Conectar MCP servers** — agregar legal-mcp para datos jurisdiccionales relevantes
3. **Agregar capa de agentes** — lavern para multi-agent review o claude-legal-skill para contract review puntual
4. **Implementar human gates** — nunca output legal sin revisión humana (ver lavern's mandatory gates)
5. **Audit trail** — logging obligatorio para cumplimiento EU AI Act (desde agosto 2026)
6. **Fine-tuning opcional** — SaulLM-7B como base para dominio jurídico específico (LATAM, sector, etc.)
