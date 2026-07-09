# 🏗️ Repos Fundacionales — Travel & Hospitality

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-09 (v6 — QloApps, fli, trvl añadidos)

## Plataformas y frameworks base

| Repo | Licencia | Stars | Stack | ¿Base para AI? |
|------|----------|-------|-------|----------------|
| [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | LGPL-2.1 | 5.0k+ | Java, GraphQL, GTFS | Sí — router multimodal, expone GraphQL para LLM tool calls |
| [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | 400+ | PHP, MySQL | Sí — PMS + Booking Engine + hotel website completo. Integra Booking.com/Airbnb/Expedia vía Channel Manager. AI content generator built-in 2026. ⭐ NUEVO v6 |
| [OpenTravel/OpenTravel2-Model](https://github.com/OpenTravel/OpenTravel2-Model) | Apache-2.0 | ~200 | OpenAPI, JSON, XML | Sí — estándar de datos de viaje, schemas para validar responses de AI |
| [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | Apache-2.0 | 600+ | Python, CSV, JSON | Sí — datos abiertos de aeropuertos, aerolíneas, países, rutas |
| [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | 370+ | Python | Sí — SDK oficial Amadeus: flights, hotels, activities. Auth gratis dev tier |
| [punitarani/fli](https://github.com/punitarani/fli) | MIT | ~300 | Python, MCP | Sí — Google Flights MCP + CLI + Python library. Sin API key. Integrable directo en Claude. ⭐ NUEVO v6 |
| [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) | MIT | ~800 | Go, MCP | Sí — El MCP de viajes más completo: 1 tool = 65 capacidades multiproveedor. Sin API key. ⭐ NUEVO v6 |
| [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) | MIT | ~200 | Python, LangGraph | Sí — arquitectura de referencia para producción con Amadeus + Hotelbeds |
| [MewsSystems/fiscalizations](https://github.com/MewsSystems/fiscalizations) | MIT | 62 | .NET | Parcial — fiscalización hotelera, útil para LATAM compliance |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | ~80 | TypeScript, MCP | Sí — MCP server 2M+ hoteles, integración directa con Claude |

---

## Datos y estándares abiertos esenciales

| Estándar | Tipo | URL | Uso en AI |
|----------|------|-----|-----------|
| GTFS (General Transit Feed Specification) | Spec | https://gtfs.org/ | Training data para routing agents; ingestión en OpenTripPlanner |
| GTFS-Realtime | Spec | https://gtfs.org/realtime/ | Alertas de transporte en tiempo real para disruption agents |
| OpenTravel 2.0 | Schema | https://opentravel.org/ | Schemas JSON/XML para validar responses de booking agents |
| NDC (IATA New Distribution Capability) | Spec | https://www.iata.org/ndc | API estándar de distribución aérea; Amadeus ya soporta NDC |
| OpenStreetMap | Data | https://www.openstreetmap.org/ | Base geográfica para routing; libre de uso con ODbL |

---

## trvl — instalación y uso básico

```bash
# Instalar trvl como MCP server para Claude
brew install trvl  # macOS
# o descarga binary desde GitHub releases

# Configurar en Claude Desktop (~/.claude/claude_desktop_config.json)
{
  "mcpServers": {
    "travel": {
      "command": "trvl",
      "args": ["mcp"]
    }
  }
}
# Claude ahora puede: buscar vuelos, comparar hoteles, revisar lounges,
# buscar trenes EU, ferries, etc. — todo sin API keys
```

## Amadeus SDK (MIT) — código de arranque

```python
from amadeus import Client
amadeus = Client(client_id='...', client_secret='...')

# Tool function para LangGraph
def search_flights(origin: str, destination: str, date: str) -> dict:
    response = amadeus.shopping.flight_offers_search.get(
        originLocationCode=origin,
        destinationLocationCode=destination,
        departureDate=date,
        adults=1
    )
    return response.data[:5]  # top 5 offers
```

## fli — Google Flights para Python agents

```python
from fli import FlightSearch

searcher = FlightSearch()
# Sin API keys — scraping seguro
results = searcher.search(
    origin="EZE",  # Buenos Aires Ezeiza
    destination="LIM",  # Lima
    departure="2026-08-15",
    adults=2
)
for flight in results[:3]:
    print(f"{flight.airline}: ${flight.price} | {flight.duration}")
```

## OpenTripPlanner GraphQL

```graphql
{
  plan(
    from: {lat: -34.603, lon: -58.381}
    to: {lat: -34.617, lon: -58.368}
    numItineraries: 3
  ) {
    itineraries {
      duration
      legs { mode distance agency { name } }
    }
  }
}
```

---

## Arquitectura de referencia v6

```
┌─────────────────────────────────────────────────────────┐
│               AI Travel Agent Stack v6                   │
├─────────────────────────────────────────────────────────┤
│  LLM Layer: Claude Haiku 4.5 / Sonnet 5                 │
├─────────────────────────────────────────────────────────┤
│  Orchestration: LangGraph / CrewAI / MAF                │
├────────────────────────────────────┬────────────────────┤
│  MCP Layer (sin API key)           │  SDK Layer (API key)|
│  trvl → Flights + Hotels multiOTA  │  Amadeus SDK (MIT)  │
│  fli  → Google Flights (Python)    │  Hotelbeds API      │
│  DIDA → 2M hoteles B2B            │  Sabre Mosaic MCP   │
├────────────────────────────────────┴────────────────────┤
│  Routing: OpenTripPlanner v2.9 (GTFS + GraphQL)         │
├─────────────────────────────────────────────────────────┤
│  PMS: QloApps (PHP, OSL-3.0) — para hotelería propia   │
├─────────────────────────────────────────────────────────┤
│  Data: OpenTravelData + GTFS + OpenStreetMap            │
└─────────────────────────────────────────────────────────┘
```

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
