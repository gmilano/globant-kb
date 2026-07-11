# 📡 Agentes trending — Travel & Hospitality

> Novedades esta semana / mes. Foco en lo que está ganando tracción ahora.
> Última actualización: 2026-07-11 (v9)

## Lo más nuevo (julio 2026)

### 🚀 HAIP — Hotel PMS con 12 agentes AI nativos (TelivityAI, Apache-2.0)
- **Repo**: [TelivityAI/haip](https://github.com/TelivityAI/haip) · Apache-2.0
- PMS open-source API-first en TypeScript/NestJS donde los agentes AI son ciudadanos de primera clase desde el día 1.
- 12 agentes integrados: optimización de precios, predicción de cancelaciones, detección de anomalías en auditoría, comunicación con huéspedes, respuestas a reseñas, gestión de housekeeping, forecast de grupos, recaudación de cuentas por cobrar.
- Channel distribution nativa a 450+ OTAs + motor de booking directo sin comisiones + Stripe.
- ChatGPT gateway: los huéspedes buscan y reservan habitaciones por chat.
- **Señal**: primer PMS open-source con AI first-class en arquitectura (no bolt-on).

### ✈️ LetsFG — Agent-native flight search (MIT, viral 2026)
- **Repo**: [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) · MIT
- 200+ conectores NDC/GDS ejecutados en paralelo en la máquina del cliente.
- 400+ aerolíneas; sin markup de OTA: $20-50 más barato que Booking.com/Kayak.
- Ofrece CLI, SDK Python y MCP Server — compatible con cualquier agente AI.
- Verificado: $116 de ahorro en 5 rutas vs Google Flights.
- **Señal**: modelo "agent-native" de transporte — los agentes AI acceden a precios de aerolínea directamente.

### 🌐 OTAIP — Open Travel AI Platform (TelivityAI, Apache-2.0)
- **Repo**: [telivity-otaip/otaip](https://github.com/telivity-otaip/otaip) · Apache-2.0
- 75 agentes especializados en 12 etapas: search → pricing → booking → ticketing → settlement → hotel ops.
- Integraciones con APIs de proveedores reales (no mocks).
- Diseñado como framework domain-specific para el sector turístico (no adaptación de framework genérico).
- **Señal**: stack completo de orquestación de viajes con agentes especializados por etapa del funnel.

### 🏨 Dida-hotel-MCP-CN — Primer MCP Gateway B2B del mundo (lanzado 9 jul 2026)
- **Repo**: [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) · MIT
- Dida Holdings (3er mayor B2B travel del mundo) abrió acceso a 2M+ hoteles vía MCP.
- OAuth-based auth; inventario y precios en tiempo real sin límite de llamadas (plan free).
- El journey permanece dentro del producto del partner — no handoff al sitio de Dida.
- **Señal**: primera infraestructura B2B de viajes con MCP gateway nativo.

### 🌟 azure-ai-travel-agents — Flagship enterprise MCP sample (Microsoft, jun 2026)
- **Repo**: [Azure-Samples/azure-ai-travel-agents](https://github.com/Azure-Samples/azure-ai-travel-agents) · MIT
- Múltiples MCP servers (Python/Node.js/Java/.NET) + 3 orquestadores (LangChain.js, LlamaIndex.TS, Microsoft Agent Framework).
- Deployed en Azure Container Apps. AGENTS.md documenta cada agente.
- **Relevancia Globant**: referencia enterprise lista para clientes Azure.

## Repos activos esta semana

| Repo | Licencia | Actividad reciente | Stars |
|------|----------|--------------------|-------|
| [TelivityAI/haip](https://github.com/TelivityAI/haip) | Apache-2.0 | Lanzamiento público jul 2026 — 12 agentes AI nativos | ~40 |
| [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) | MIT | Trending GitHub jul 2026 — MCP Server publicado | ~500 |
| [telivity-otaip/otaip](https://github.com/telivity-otaip/otaip) | Apache-2.0 | 75 agentes en 12 etapas, integraciones supplier | ~25 |
| [azure-ai-travel-agents](https://github.com/Azure-Samples/azure-ai-travel-agents) | MIT | Nuevo orchestrator MAF, docs AGENTS.md | ~450 |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | Lanzamiento público 9 jul 2026 | ~50 |
| [wanderlog-mcp](https://github.com/shaikhspeare/wanderlog-mcp) | MIT | v0.2.0 en npm — OAuth mejorado | ~33 |
| [mcp_travelassistant](https://github.com/skarlekar/mcp_travelassistant) | MIT | Nuevo MCP server para eventos locales | ~35 |
| [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) | MIT | Integración HubSpot CRM añadida | ~18 |

## Señal de mercado: MCP + AI-native PMS como nuevo estándar

El ecosistema travel tech está experimentando una doble convergencia en julio 2026:

**MCP como protocolo de viajes**:
- **Dida MCP** = infraestructura B2B, 2M+ hoteles
- **azure-ai-travel-agents** = referencia enterprise multi-orquestador
- **wanderlog-mcp** = gestión conversacional de itinerarios
- **mcp_travelassistant** = orquestación de servicios (vuelos + hoteles + eventos + clima)
- **Expedia B2B MCP** = anunciado (coming 2026), partners conectarán AI agents al inventario de Expedia

**AI-native como diferenciador arquitectural**:
- **HAIP**: primer PMS con agentes AI de serie (no añadidos después)
- **OTAIP**: orquestación viajes con agentes por etapa del funnel
- **LetsFG**: búsqueda de vuelos agent-native (sin UI, API-first)

**Patrón ganador emergente**: LLM → MCP Client → MCP Servers especializados → Proveedores B2B (Dida/Amadeus/Expedia) → Booking sin fricción.

---
*Pipeline automático — se actualiza cada hora.*
