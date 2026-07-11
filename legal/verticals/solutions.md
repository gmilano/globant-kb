# 🏭 Verticales de partida — Legal Services

> Plataformas verticales existentes, customizables con AI. Modelo: partir de algo funcional, añadir capa agéntica encima.
> Última actualización: 2026-07-11

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| [OpenContracts / cite](https://github.com/Open-Source-Legal/OpenContracts) | MIT | opensource.legal | Django + React + Celery + Postgres + MCP | Document intelligence: annotation graph, structured extraction, agent-native DMS |
| [Docassemble](https://github.com/jhpyle/docassemble) | MIT | docassemble.org | Python + YAML + Markdown + Docker | Document automation, guided interviews, intake forms, pro-se portals |
| [CourtListener](https://github.com/freelawproject/courtlistener) | Apache-2.0 | courtlistener.com | Django + Elasticsearch + PostgreSQL | Legal research: case law search, citation graphs, 7M+ US opinions |
| [Odoo (Legal/CRM)](https://github.com/odoo/odoo) | LGPL-3 | odoo.com | Python + PostgreSQL + JS | Matter management, CRM, billing, time-tracking — AI customizable |
| [LegalMD](https://github.com/Open-Source-Legal/cite) | MIT | cite.opensource.legal | TypeScript + VS Code Extension | Markdown dialect for legal docs: @party, @cite, @clause, @deadline primitives |
| [LQ.AI](https://github.com/LegalQuants/lq-ai) | MIT | github.com/LegalQuants | FastAPI + Qdrant + SKILL.md | Self-hosted legal AI: chat + verifiable citations + anonymization |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | github.com/FudanDISC | Python + ChatGLM + retrieval | Chinese legal domain LLM platform — fine-tunable for Latin/civil law |
| [lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | github.com/AnttiHero | Python + LangGraph + multi-agent | Agentic law firm template: 67 roles, debate review, human gates |

## Cómo customizar con AI

1. **Fork del repo base** (OpenContracts para doc intelligence, Docassemble para intake, Odoo para matter management)
2. **Añadir endpoint AI** (Claude via Anthropic SDK / Ollama local / OpenAI)
3. **Conectar via MCP** si la plataforma tiene MCP server (OpenContracts v3 lo trae nativo)
4. **Wrappear flujos existentes** con skills de `AgentCounsel` o `claude-legal-skill`
5. **UI conversacional** sobre el sistema base vía Chainlit / Streamlit / custom React

## Comparativa para engagement rápido

| Escenario cliente | Plataforma base | Tiempo setup | Dificultad |
|-------------------|-----------------|-------------|------------|
| Contract review MVP | ContractGuard + claude-legal-skill | 1-2 días | Baja |
| Document intelligence enterprise | OpenContracts (cite) + Claude MCP | 1-2 semanas | Media |
| Law firm intake automation | Docassemble + LLM endpoint | 2-4 semanas | Media |
| Full matter management + AI | Odoo + AgentCounsel skills | 4-8 semanas | Alta |
| Agentic law firm (multi-agent) | lavern + custom agents | 4-8 semanas | Alta |
