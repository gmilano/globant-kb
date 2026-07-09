# 🏗️ Repos Fundacionales — Travel & Hospitality

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-09 (v5)

## Plataformas y frameworks base

| Repo | Licencia | Stars | Stack | ¿Base para AI? |
|------|----------|-------|-------|----------------|
| [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | LGPL-2.1 | 5.0k+ | Java, GraphQL, GTFS | Sí — router multimodal, expone GraphQL para LLM tool calls |
| [OpenTravel/OpenTravel2-Model](https://github.com/OpenTravel/OpenTravel2-Model) | Apache-2.0 | ~200 | OpenAPI, JSON, XML | Sí — estándar de datos de viaje, schemas para validar responses de AI |
| [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | Apache-2.0 | 600+ | Python, CSV, JSON | Sí — datos abiertos de aeropuertos, aerolíneas, países, rutas |
| [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | 370+ | Python | Sí — SDK oficial Amadeus: flights, hotels, activities. Auth gratis dev tier |
| [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) | MIT | ~200 | Python, LangGraph | Sí — arquitectura de referencia para producción con Amadeus + Hotelbeds |
| [MewsSystems/fiscalizations](https://github.com/MewsSystems/fiscalizations) | MIT | 62 | .NET | Parcial — fiscalización hotelera, útil para LATAM compliance |
| [MozartofCode/travel-agent](https://github.com/MozartofCode/travel-agent) | MIT | ~50 | Python, CrewAI | Sí — CrewAI multi-agent: transporte + alojamiento + actividades + clima |
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

## Arquitectura de referencia

```
┌─────────────────────────────────────────────────┐
│              AI Travel Agent Stack               │
├─────────────────────────────────────────────────┤
│  LLM Layer: Claude Sonnet 5 / Haiku 4.5         │
├─────────────────────────────────────────────────┤
│  Orchestration: LangGraph / CrewAI              │
├──────────────┬──────────────┬───────────────────┤
│  Flights     │  Hotels      │  Routing           │
│  Amadeus API │  DIDA MCP    │  OpenTripPlanner   │
│  (SDK MIT)   │  (MIT free)  │  (LGPL-2.1)        │
├──────────────┴──────────────┴───────────────────┤
│  Data: OpenTravelData + GTFS + OpenStreetMap    │
└─────────────────────────────────────────────────┘
```

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
