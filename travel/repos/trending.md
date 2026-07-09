# 📈 Repos Trending — Travel & Hospitality

> GitHub más activo esta semana. Señales tempranas de adopción.
> Última actualización: 2026-07-09 (v6 — trvl, fli, azure-ai-travel-agents, mcp_travelassistant)

## Top repos trending julio 2026

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) | MIT | ~800 | ⭐ NUEVO — MCP + CLI travel agent: Google Flights/Hotels + Airbnb + Booking + Hostelworld + Ferryhopper + trenes EU. 1 MCP tool = 65 capacidades. 98.9% ahorro de tokens. Sin API keys. Go binary. |
| [Azure-Samples/azure-ai-travel-agents](https://github.com/Azure-Samples/azure-ai-travel-agents) | MIT | ~600 | ⭐ NUEVO — Enterprise multi-agent: LangChain.js + LlamaIndex.TS + Microsoft Agent Framework + MCP. Deploy en Azure Container Apps. Microsoft oficial. |
| [punitarani/fli](https://github.com/punitarani/fli) | MIT | ~300 | ⭐ NUEVO — Google Flights MCP + CLI + Python library. Sin API key. La forma más directa de conectar Claude a vuelos reales. |
| [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) | MIT | ~200 | LangGraph + Amadeus + Hotelbeds + Twilio. Arquitectura producción. |
| [skarlekar/mcp_travelassistant](https://github.com/skarlekar/mcp_travelassistant) | MIT | ~150 | ⭐ NUEVO — Suite modular MCP: flight + hotel + events + weather + budget. Hub-and-spoke pattern. |
| [BjornMelin/openai-agents-travel-graph](https://github.com/BjornMelin/openai-agents-travel-graph) | MIT | ~150 | OpenAI Agents SDK + LangGraph + Playwright browser automation. |
| [naakaarafr/AI-Travel-Agent-Advanced](https://github.com/naakaarafr/AI-Travel-Agent-Advanced) | MIT | ~120 | CrewAI + Gemini real-time. Vuelos + hoteles + clima. 7-day itineraries. |
| [Haohao-end/Ctrip-Style-AI-Travel-Assistant](https://github.com/Haohao-end/Ctrip-Style-AI-Travel-Assistant) | MIT | ~90 | LangChain+LangGraph. Flights + hotels + car + tours. Human-in-loop. |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | ~80 | MCP server 2M+ hoteles DIDA B2B. Free, sin límite. Real-time precios. |
| [esakrissa/hotels_mcp_server](https://github.com/esakrissa/hotels_mcp_server) | MIT | ~60 | MCP server hotel search via Booking.com API. Claude-ready. |
| [Fieldy76/Agentic-Travel-Planner](https://github.com/Fieldy76/Agentic-Travel-Planner) | MIT | ~55 | MCP agentic workflow framework-free. Python puro. |

---

## Señal emergente: MCP Travel Stack 2026

El ecosistema de MCP servers de viaje maduro julio 2026. **trvl** es el punto de entrada más fácil — 1 tool, 65 capacidades, sin API keys. Para producción enterprise, el stack completo:

```
Claude / GPT-4 / Gemini
       ↓ MCP protocol
┌────────────────────────────────────────────────────────┐
│  trvl          (Google Flights + Hotels + Airbnb + ...) │
│  DIDA Hotel MCP (2M hoteles B2B, free)                 │
│  fli           (Google Flights, Python library)         │
│  mcp_travelassistant (events + weather + budget)        │
│  Sabre Mosaic MCP    (420+ airlines, enterprise)        │
└────────────────────────────────────────────────────────┘
```

**Filosofía**: composable, reemplazable por proveedor según cliente. El LLM no cambia — solo los MCP servers que conecta.

---

## Repos fundacionales con actividad sostenida

| Repo | Stars | Actividad reciente |
|------|-------|-------------------|
| [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | 5.0k+ | v2.9.0 marzo 2026, Java 25, activo |
| [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | 370+ | Updates frecuentes, NDC support |
| [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | 600+ | Dataset actualizado semanalmente |
| [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | 400+ | PMS + Booking Engine open source, actualizado abr 2026 |

---

## Nuevo en plataformas comerciales open-friendly (julio 2026)

| Plataforma | Tipo | Señal |
|------------|------|-------|
| Amadeus for Developers | Commercial SDK MIT | AI Commerce: hoteles bookables vía Claude/ChatGPT (HITEC jun 2026) |
| Sabre Mosaic MCP | Commercial + MCP | Live mayo 2026 con MindTrip + PayPal |
| amadeus-cli | MIT CLI | Tool oficial Amadeus para AI agents con JSON output estructurado |

---
*Pipeline automático — se actualiza cada hora.*
