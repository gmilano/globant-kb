# 🗺️ Mapa de mercado — Enterprise AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-10

## Tamaño de mercado

| Métrica | Valor | Fuente |
|---------|-------|--------|
| AI Agents market 2026 | $10.9–12.1B | Gartner, jul-2026 |
| Agentic AI spending total 2026 | $201.9B (incluye software empresarial habilitado) | Gartner |
| Agentic AI CAGR 2026–2030 | 44–46% | Múltiples analistas |
| AI Agents market 2030 proyectado | $52–62B | Gartner / MarketsAndMarkets |
| Open-source ERP market 2026 | $5.31B, CAGR 9.66% hasta 2031 | Mordor Intelligence |
| Enterprise apps con AI agents por fin 2026 | 40% (era <5% en 2025) | Gartner |
| Empresas con ≥1 agente en producción | 31% | McKinsey / S&P Global |
| Proyectos agentic a cancelarse en 2027 | >40% | Gartner |

## Players globales — Frameworks y Plataformas

| Empresa | Producto | Licencia | Fortaleza | Debilidad |
|---------|----------|----------|-----------|-----------|
| LangChain / LangGraph | LangGraph Platform | MIT (OSS) + Paid (Platform) | Default de facto para producción stateful; 400+ enterprises; mayor ecosistema verificado | Vendor lock-in en LangSmith para observabilidad |
| Microsoft | Agent Framework 1.0 / SK / AGT | MIT | C#/.NET first-class; governance toolkit; Copilot Studio enterprise | Más verboso que LangGraph para Python |
| CrewAI | CrewAI OSS + Enterprise | MIT (OSS) | 60% Fortune 500; 5.2M downloads/mes; role-based = más intuitivo | Enterprise features requieren plan pagado |
| Anthropic | Claude + MCP | Comercial | Claude 5 / Opus 4.8 = modelos más capaces; MCP RC jul-2026 = protocolo ganador | Sin framework propio open-source |
| HuggingFace | Smolagents + Inference | Apache-2.0 | Sin abstracciones; open weights models; código limpio | Menos enterprise features que LangGraph |
| SAP | Joule / Business AI Platform | Comercial (Propietario) | ERP context nativo; Claude-powered; integración con BTP+BDC | Solo funciona con SAP estate; precio elevado |
| Oracle | Fusion Agentic Apps | Comercial (Propietario) | Embedded en Fusion ERP/HCM; procurement/finance focus | Closed ecosystem |

## Players globales — ERP / CRM Open Source

| Plataforma | Licencia | Market Position | Oportunidad AI |
|------------|----------|-----------------|----------------|
| Odoo | LGPL-3.0 | 12M+ usuarios, open-source ERP líder global | Python nativo, API REST, módulos AI comunidad |
| ERPNext (Frappe) | GPL-3.0 | Dominante en India/LATAM/África/MENA | MCP server, Python, DocType model |
| Apache OFBiz | Apache-2.0 | Reference ERP para extensiones Java | Licencia permisiva = más fácil para Globant |
| Twenty | MIT | CRM challenger a Salesforce | MCP server nativo = más AI-ready que Salesforce |
| SuiteCRM | AGPL-3.0 | 5M+ usuarios Salesforce alternative | Módulos AI comunidad creciendo |

## Oportunidades AI en LATAM

### Contexto regional
- **SAP estate masivo**: Brasil, México, Argentina, Colombia y Chile tienen grandes instalaciones SAP (muchas en ECC 6.0) que no han migrado a S/4HANA — costo de migración propietaria = driver para alternativas open.
- **Costo de licencias**: SAP/Oracle licenses are prohibitive para muchas empresas medianas en LATAM → ERPNext + Odoo + AI-layer = propuesta de valor 10x más económica.
- **Talento Python abundante**: LATAM tiene un pool creciente de devs Python → LangGraph + Frappe = stack accesible.
- **Regulaciones locales**: Brasil (LGPD), Argentina (PDPA), México (LFPDPPP) requieren datos on-prem o en región — self-hosted ERP + RAGFlow + n8n es el stack ideal.

### Casos de uso principales en LATAM

| Use Case | Stack Recomendado | Tamaño estimado |
|----------|-------------------|-----------------|
| Modernización SAP → Open ERP + AI | ERPNext + LangGraph + Agent Governance | $200k–$2M |
| CRM AI copilot para medianas empresas | Twenty CRM + LangGraph + Claude | $80k–$400k |
| Enterprise knowledge base / RAG | RAGFlow + LangGraph + Dify | $100k–$500k |
| Automatización de workflows financieros | n8n + LangGraph + ERPNext API | $60k–$200k |
| AI agents para RRHH / onboarding | CrewAI + Frappe HRM + Claude | $80k–$300k |
| Compliance EU AI Act / LGPD | Agent Governance Toolkit + LangGraph | $50k–$200k |

## Posicionamiento Globant

**Ventajas competitivas de Globant en este espacio:**
1. **Presencia LATAM** + conocimiento de SAP estates en la región = ideal para modernization sprints.
2. **Stack open source** (ERPNext + LangGraph + n8n) vs propietario (SAP Joule) = 60-80% menos costo de licencias para el cliente.
3. **AI Studios** con expertise en Claude + MCP = stack más moderno que integradores SAP tradicionales.
4. **Agent Governance Toolkit** (MIT, Microsoft) = argumento de compliance para clientes regulados (banca, salud, gobierno).

**Competidores directos en LATAM enterprise AI:**
- Accenture / Capgemini (más grandes, más caros, principalmente propietario)
- Deloitte (fuerte en SAP, menos en open-source AI)
- Consultoras locales (sin AI Studios capability)

**Diferenciador clave:** Globant puede ofrecer la misma funcionalidad que SAP Joule (Claude + enterprise data + workflows) sobre ERPNext/Odoo open source, eliminando $500k-$2M/año en licencias SAP para clientes medianos.

---
*Ver también: `intel/trends.md` para tendencias actuales y `compose/patterns.md` para patrones de implementación.*
