# 📡 Agentes trending — Travel & Hospitality

> Novedades esta semana / mes. Foco en lo que está ganando tracción ahora.
> Última actualización: 2026-07-13 (v10)

## Lo más nuevo (13 jul 2026)

### 🚀 trvl — Travel MCP server en Go, sin API keys (MikkoParkkola, MIT)
- **Repo**: [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) · MIT
- Binario único en Go: instala con un comando, funciona con Claude/Cursor/Codex/VS Code/Zed/Gemini/Amazon Q/LM Studio.
- 21 proveedores en paralelo: Google Flights, Google Hotels, Trivago, Airbnb, ferries, trenes europeos, alquiler de autos.
- 1 herramienta MCP "inteligente" + 66 aliases → 98.9% menos tokens que competidores.
- Maneja multi-leg, hidden city ticketing, comparación de puntos de loyalty.
- **Señal**: el MCP server de travel más liviano y extenso en existencia — zero-config, funciona desde el primer minuto.

### ✈️ Agentic-Travel-Planner — Framework-free con Amadeus (Fieldy76, MIT)
- **Repo**: [Fieldy76/Agentic-Travel-Planner](https://github.com/Fieldy76/Agentic-Travel-Planner) · MIT
- Workflow agentico puro en Python sin LangChain/CrewAI — demuestra que se puede construir con stdlib + MCP.
- LLM intercambiable: OpenAI / Anthropic Claude / Google Gemini via parámetro de configuración.
- APIs reales: Amadeus (vuelos+hoteles), OpenMeteo+geocoding (clima), Aviasales/Hotellook/RentalCars (bookings).
- MCP server in-process: custom, liviano, sin dependencias externas.
- **Señal**: referencia de arquitectura "from scratch" para entender cómo funciona un agente de viajes sin abstracción.

### 🏨 Apaleo Agent Hub — Primer marketplace de agentes AI para hospitalidad
- **URL**: [apaleo.com](https://apaleo.com/) · Comercial (PMS con API abierta)
- Apaleo lanzó el primer MCP server para un PMS comercial de hoteles — posicionado como "el estándar abierto para AI en hospitalidad".
- El MCP server expone operaciones del PMS (reservas, folio, housekeeping, revenue) como herramientas para agentes AI.
- Apaleo Agent Hub: marketplace de agentes AI específicos para hoteles — primero de su tipo en la industria.
- Arquitectura: un protocolo → n agentes → n sistemas de hotel.
- **Señal de mercado**: modelo de comercialización del futuro — PMS como plataforma de agentes, no software monolítico.

### 🌐 skedgo/tripgo-mcp-server — Multi-modal routing MCP
- **Repo**: [skedgo/tripgo-mcp-server](https://github.com/skedgo/tripgo-mcp-server)
- MCP server para TripGo: routing multi-modal (tren + bus + rideshare + bicicleta + vuelo + ferry) en un solo agente.
- Integra horarios reales, precios, opciones de movilidad combinada para destino + tránsito local.
- **Señal**: "last mile" de travel — los agentes ahora planifican no solo el viaje sino cómo moverse al llegar.

### 📍 pab1it0/tripadvisor-mcp — TripAdvisor via MCP
- **Repo**: [pab1it0/tripadvisor-mcp](https://github.com/pab1it0/tripadvisor-mcp) · MIT
- MCP server para TripAdvisor Content API: búsqueda de destinos, reseñas, fotos, atracciones, restaurantes.
- AI agents acceden a datos de review de viajeros reales sin scraping.
- **Señal**: datos de opinión = capa de calidad para cualquier agente de recomendación.

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

## Repos activos esta semana (jul 2026)

| Repo | Licencia | Actividad reciente | Stars |
|------|----------|--------------------|-------|
| [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) | MIT | Nuevo — Go binary, 21 providers, 10 AI clients | ~120 |
| [Fieldy76/Agentic-Travel-Planner](https://github.com/Fieldy76/Agentic-Travel-Planner) | MIT | Actualizado mayo 2026 — Amadeus + multi-model | ~80 |
| [TelivityAI/haip](https://github.com/TelivityAI/haip) | Apache-2.0 | Lanzamiento público jul 2026 — 12 agentes AI nativos | ~40 |
| [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) | MIT | Trending GitHub jul 2026 — MCP Server publicado | ~500 |
| [telivity-otaip/otaip](https://github.com/telivity-otaip/otaip) | Apache-2.0 | 75 agentes en 12 etapas, integraciones supplier | ~25 |
| [azure-ai-travel-agents](https://github.com/Azure-Samples/azure-ai-travel-agents) | MIT | Nuevo orchestrator MAF, docs AGENTS.md | ~450 |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | Lanzamiento público 9 jul 2026 | ~50 |
| [skedgo/tripgo-mcp-server](https://github.com/skedgo/tripgo-mcp-server) | MIT | MCP multi-modal routing (tren+bus+ferry+bici) | ~30 |
| [pab1it0/tripadvisor-mcp](https://github.com/pab1it0/tripadvisor-mcp) | MIT | TripAdvisor reviews+fotos via MCP | ~25 |
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

**Nuevo MCP ecosystem (jul 2026)**:
- **trvl** = búsqueda multi-proveedor sin API keys (21 providers, Go binary)
- **tripgo-mcp** = movilidad multi-modal "last mile"
- **tripadvisor-mcp** = reviews + reputación de destinos
- **mcp-amadeus** = Amadeus APIs via MCP estandarizado
- **Apaleo MCP + Agent Hub** = PMS comercial con agentes marketplace

**Señal de HITEC 2026**: 44.7% de visitantes AI-driven llegan al booking engine vs 25.9% del search orgánico — el tráfico de agentes convierte mejor que el orgánico.

---
*Pipeline automático — se actualiza cada hora.*
