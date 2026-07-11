# 🏭 Verticales de partida — Legal Services

> Plataformas verticales existentes, customizables con AI. Modelo: partir de algo funcional, añadir capa agéntica encima.
> Última actualización: 2026-07-11 (v10)

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| [OpenContracts / cite](https://github.com/Open-Source-Legal/OpenContracts) | MIT | opensource.legal | Django + React + Celery + Postgres + MCP | Document intelligence: annotation graph, structured extraction, agent-native DMS. 1.4k ★ |
| [Docassemble](https://github.com/jhpyle/docassemble) | MIT | docassemble.org | Python + YAML + Markdown + Docker | Document automation, guided interviews, intake forms, pro-se portals. 1.2k ★ |
| [CourtListener](https://github.com/freelawproject/courtlistener) | Apache-2.0 | courtlistener.com | Django + Elasticsearch + PostgreSQL | Legal research: case law search, citation graphs, 7M+ US opinions. 967 ★ |
| [Odoo (Legal/CRM)](https://github.com/odoo/odoo) | LGPL-3 | odoo.com | Python + PostgreSQL + JS | Matter management, CRM, billing, time-tracking — AI customizable with 35,000+ stars |
| [lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | github.com/AnttiHero | Python + LangGraph + multi-agent | Agentic law firm template: 67 roles, debate review, human gates. Production-grade. |
| [LegalMD / cite](https://github.com/Open-Source-Legal/cite) | MIT | cite.opensource.legal | TypeScript + VS Code Extension | Markdown dialect for legal docs: @party, @cite, @clause, @deadline primitives |
| [LQ.AI](https://github.com/LegalQuants/lq-ai) | MIT | github.com/LegalQuants | FastAPI + Qdrant + SKILL.md | Self-hosted legal AI: chat + verifiable citations + anonymization |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | github.com/FudanDISC | Python + ChatGLM + retrieval | Chinese legal domain LLM — fine-tunable for Latin/civil law jurisdictions |

## Plataformas comerciales con integración open-source relevante

| Plataforma | Tipo | Integración open source | Nota 2026 |
|------------|------|------------------------|----------|
| Ironclad | CLM (Contract Lifecycle Management) | Harvey AI via partnership | Lanzó suite agéntica Mar 2026: archive agent, intake agent, redlining agent, conversational search |
| Harvey | AI-native legal platform | Agent Builder + 500+ prebuilt agents (jul 2026) | $190M ARR, $11B val. No open source pero referencia de mercado |
| Clio | Practice management (SMB) | vLex (adquirido $1B, 2025) | 150k+ usuarios; 66+ bar associations |
| Relativity / Everlaw | eDiscovery | GenAI review gratuito (2026 pricing reset) | Integrar con CourtListener para enrichment |
| Legora | Agentic legal platform (EU/global) | SKILL.md compatible | Fastest-growing legal AI outside US; custom workflow agents |

## Cómo customizar con AI

1. **Fork del repo base** (OpenContracts para doc intelligence, Docassemble para intake, Odoo para matter management)
2. **Añadir endpoint AI** (Claude via Anthropic SDK / Ollama local / OpenAI)
3. **Conectar via MCP** si la plataforma tiene MCP server (OpenContracts v3 lo trae nativo; construir adapter para otras)
4. **Wrappear flujos existentes** con skills de `AgentCounsel` o `claude-legal-skill`
5. **UI conversacional** sobre el sistema base vía Chainlit / Streamlit / custom React
6. **Para multi-agente**: usar `lavern` como template de orquestación con 67 roles preconstruidos

## Comparativa para engagement rápido

| Escenario cliente | Plataforma base | Tiempo setup | Dificultad |
|-------------------|-----------------|-------------|------------|
| Contract review MVP | ContractGuard + claude-legal-skill | 1-2 días | Baja |
| Document intelligence enterprise | OpenContracts (cite) + Claude MCP | 1-2 semanas | Media |
| Law firm intake automation | Docassemble + LLM endpoint | 2-4 semanas | Media |
| Legal research RAG | CourtListener + RAGFlow + LegalBench | 1-2 semanas | Media |
| Full matter management + AI | Odoo + AgentCounsel skills | 4-8 semanas | Alta |
| Agentic law firm (multi-agent) | lavern + custom agents | 4-8 semanas | Alta |
| CLM agéntico (CLM pattern) | OpenContracts + lavern + claude-legal-skill | 3-6 semanas | Alta |
| Jurisdicción LATAM (español) | Docassemble + AgentCounsel + Claude (es) | 2-4 semanas | Media |
