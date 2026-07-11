# 📡 Agentes trending — Travel & Hospitality

> Novedades esta semana / mes. Foco en lo que está ganando tracción ahora.
> Última actualización: 2026-07-11

## Lo más nuevo (julio 2026)

### 🚀 Dida-hotel-MCP-CN — Primer MCP Gateway B2B del mundo (lanzado 9 jul 2026)
- **Repo**: [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) · MIT
- Dida Holdings (3er mayor B2B travel del mundo) abrió acceso a 2M+ hoteles vía MCP.
- OAuth-based auth; inventario y precios en tiempo real sin límite de llamadas.
- El journey permanece dentro del producto del partner — no handoff al sitio de Dida.
- **Señal**: primera infraestructura B2B de viajes con MCP gateway nativo.

### 🌟 azure-ai-travel-agents — Flagship enterprise MCP sample (Microsoft, jun 2026)
- **Repo**: [Azure-Samples/azure-ai-travel-agents](https://github.com/Azure-Samples/azure-ai-travel-agents) · MIT
- Múltiples MCP servers (Python/Node.js/Java/.NET) + 3 orquestadores (LangChain.js, LlamaIndex.TS, Microsoft Agent Framework).
- Deployed en Azure Container Apps. AGENTS.md documenta cada agente.
- **Relevancia Globant**: referencia enterprise lista para clientes Azure.

### ✈️ langgraph-travel-agent (HarimxChoi) — Booking end-to-end async paralelo
- **Repo**: [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) · MIT
- Orquestación paralela async sobre Amadeus (vuelos), Hotelbeds (hoteles), Twilio (notificaciones), HubSpot (CRM).
- Production-ready: manejo de errores, reintentos, logging.

### 🏨 Wander-Desk — Travel ops platform completa
- **Repo**: [UjjwalSaini07/Wander-Desk](https://github.com/UjjwalSaini07/Wander-Desk) · MIT
- CRM + Trip Management + Sales Copilot + Traveler Intelligence + Revenue Forecasting + Analytics.
- Plataforma ops completa para agencias (proyecto Nomichi).

## Repos activos esta semana

| Repo | Licencia | Actividad reciente | Stars |
|------|----------|--------------------|-------|
| [azure-ai-travel-agents](https://github.com/Azure-Samples/azure-ai-travel-agents) | MIT | Nuevo orchestrator MAF, docs AGENTS.md | ~450 |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | Lanzamiento público 9 jul 2026 | — |
| [wanderlog-mcp](https://github.com/shaikhspeare/wanderlog-mcp) | MIT | v0.2.0 en npm — OAuth mejorado | ~33 |
| [Wander-Desk](https://github.com/UjjwalSaini07/Wander-Desk) | MIT | Módulo Revenue Forecasting añadido | ~1 |
| [mcp_travelassistant](https://github.com/skarlekar/mcp_travelassistant) | MIT | Nuevo MCP server para eventos locales | ~35 |
| [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) | MIT | Integración HubSpot CRM añadida | ~18 |
| [voyant-travel/voyant](https://github.com/voyant-travel/voyant) | Apache-2.0 | Commits recientes | ~5 |

## Señal de mercado: MCP como protocolo de viajes

El ecosistema MCP para viajes se está consolidando rápidamente en julio 2026:

- **Dida MCP** = infraestructura B2B, 2M+ hoteles
- **azure-ai-travel-agents** = referencia enterprise multi-orquestador
- **wanderlog-mcp** = gestión conversacional de itinerarios
- **mcp_travelassistant** = orquestación de servicios (vuelos + hoteles + eventos + clima)
- **mcp-travel-assistant** (Atlan) = Google Travel + Amadeus via MCP

**Patrón emergente**: los agentes de viajes están convergiendo en MCP como protocolo de composición, igual que retail está convergiendo en ACP/UCP. El stack ganador será: LLM → MCP Client → MCP Servers especializados (vuelos, hoteles, eventos, pagos).

---
*Pipeline automático — se actualiza cada hora.*
