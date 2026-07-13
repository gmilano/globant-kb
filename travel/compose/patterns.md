# 🧩 Patrones de composición — Travel & Hospitality

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-13 (v11)

## Stack base

```
[Plataforma vertical base (QloApps / HAIP)]
          ↓
[Capa MCP travel (trvl / travel-mcp-server / Dida-hotel-MCP)]
          ↓
[Orquestación agéntica (LangGraph / CrewAI)]
          ↓
[LLM backend (Claude Haiku para ops / Sonnet para razonamiento)]
          ↓
[Canal (WhatsApp / Web chat / Admin dashboard)]
```

---

## P1 — Travel Search Universal sin API keys

**Objetivo**: demo de búsqueda de viajes funcional en 1 hora, sin credenciales.

**Stack**:
- [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) — MCP server local (Go binary)
- Claude Desktop o Claude Code como cliente MCP
- Instalación: `trvl mcp install --client claude`

**Cómo funciona**:
1. trvl arranca un MCP server local que agrega 21+ proveedores (Google Flights, Kiwi, Skiplagged, trenes europeos)
2. Claude recibe la herramienta `travel` — una sola tool que rota internamente
3. Usuario: "Busca vuelos Madrid-Buenos Aires para la semana del 20 julio con menos de $800"
4. Claude llama a `travel`, trvl retorna opciones reales con precios y alternativas de ahorro

**Tiempo estimado**: 30-60 minutos hasta demo funcionando.

**Nota comercial**: trvl es PolyForm Noncommercial — gratis para demos/POC; EUR 500/mes para producción comercial.

---

## P2 — Agentic Itinerary Builder con MCP (MIT end-to-end)

**Objetivo**: agente de planificación completa de viaje open source puro, produccionalizable.

**Stack**:
- [Fieldy76/Agentic-Travel-Planner](https://github.com/Fieldy76/Agentic-Travel-Planner) — MIT, Python, framework-free
- Amadeus Enterprise API (post-sunset Jul 17) o Duffel para vuelos
- Open-Meteo (gratis) para clima
- Aviasales affiliate para reservas reales
- Claude o Gemini como backend

**Arquitectura**:
```
Usuario → Agentic-Travel-Planner → MCP orchestrator
                                        ↓         ↓         ↓
                                   Amadeus    Open-Meteo   Maps MCP
                                   (vuelos)    (clima)    (geocoding)
                                        ↓
                             Booking URLs (Aviasales/Hotellook/RentalCars)
```

**Flujo**:
1. Usuario especifica origen, destino, fechas, presupuesto, preferencias
2. Agente busca vuelos, verifica clima, geolocaliza puntos de interés
3. Genera itinerario estructurado con opciones de reserva
4. Genera URLs de reserva sin intermediarios propios (modelo affiliate)

**Tiempo estimado**: 1-2 semanas para adaptación a cliente.

---

## P3 — Hotel Revenue Management AI (sin PMS enterprise)

**Objetivo**: dar a un hotel independiente revenue management inteligente por el costo de infraestructura cloud.

**Stack**:
- [TelivityAI/haip](https://github.com/TelivityAI/haip) — Apache-2.0, TypeScript/NestJS
- HAIP agentes nativos: Demand Forecasting + Dynamic Pricing + Cancellation Prediction
- Claude Haiku como backbone de comunicaciones con huésped
- PostgreSQL para histórico de reservas

**Setup**:
```bash
git clone https://github.com/TelivityAI/haip
docker-compose up -d  # PMS + API + React dashboard
# Configurar propiedad, habitaciones, tarifas
# 12 agentes AI activos inmediatamente
```

**Agentes AI incluidos en HAIP**:
| Agente | Función | ROI típico |
|--------|---------|----------|
| Demand Forecasting | Predice ocupación futura | -15% over/understocking |
| Dynamic Pricing | Ajusta tarifas en tiempo real | +8-12% RevPAR |
| Cancellation Prediction | Overbooking inteligente | -5% habitaciones vacías |
| Night Audit Anomaly Detection | Control financiero | Reduce errores contables |
| Guest Communication | Mensajería personalizada | +20% guest satisfaction |

**Tiempo estimado**: 4-8 semanas para hotel en producción.

---

## P4 — WhatsApp Booking Agent para hoteles boutique LATAM

**Objetivo**: el hotel recibe reservas directas por WhatsApp con confirmación automática.

**Stack**:
- [TelivityAI/haip](https://github.com/TelivityAI/haip) o [Qloapps/QloApps](https://github.com/Qloapps/QloApps) como PMS
- WhatsApp Business API (Meta)
- Claude Haiku como agente conversacional (bajo costo, rápido)
- LangGraph para manejo de estado de conversación

**Flujo**:
```
Cliente → WhatsApp → Webhook → LangGraph state machine
                                    ↓
                         Claude Haiku (comprensión intent)
                                    ↓
                         HAIP/QloApps API (disponibilidad)
                                    ↓
                         Confirma reserva + envía PDF voucher
                                    ↓
                         Cliente ← WhatsApp ← Confirmación
```

**Idiomas**: Español + Portugués (ES: México, Colombia, Argentina; PT: Brasil)

**Pagos**: Mercado Pago (LATAM) / PayU (Colombia) / Stripe (internacional)

**Tiempo estimado**: 6-10 semanas (MVP funcional en 3 semanas).

**ROI estimado**: hotel con 20 hab, 40% reservas directas → ahorro de ~15-20% en comisiones OTA.

---

## P5 — Disruption Rebooking Agent (Flight Cancellation Handler)

**Objetivo**: cuando un vuelo se cancela, el agente rebook automáticamente vuelo + hotel + transporte y notifica al viajero.

**Stack**:
- AviationStack API (flight status, real-time)
- [lev-corrupted/travel-mcp-server](https://github.com/lev-corrupted/travel-mcp-server) — MIT, vuelos + hoteles MCP
- Duffel API para rebooking real de vuelos
- LangGraph con nodo de "disruption recovery"
- Claude Sonnet (razonamiento complejo sobre alternativas)
- Push notifications (Firebase / OneSignal)

**Arquitectura LangGraph**:
```python
# Nodos
monitor_flight → detect_disruption → analyze_options → select_best_alternative
     ↓                                                          ↓
   sleep(5min)                                    rebook_flight + rebook_hotel
                                                          ↓
                                                  notify_traveler (WhatsApp/email)
```

**Lógica de decisión del agente**:
1. AviationStack detecta cancelación/delay > 2h
2. LangGraph entra en estado `disruption_detected`
3. Claude analiza opciones: vuelos alternativos (Duffel), check policy (corporate travel)
4. Selecciona mejor alternativa según: tiempo, costo, política de empresa
5. Rebook automático si dentro de política; solicita aprobación si fuera de rango
6. Notifica viajero con nuevo itinerario completo

**Tiempo estimado**: 8-12 semanas para integración producción.

---

## P6 — MCP Travel Concierge Completo (Claude Code + múltiples MCPs)

**Objetivo**: asistente de viajes completo para Claude que combina múltiples fuentes de datos.

**Stack MCPs a instalar**:
```json
{
  "mcpServers": {
    "trvl": {
      "command": "trvl",
      "args": ["mcp", "serve"]
    },
    "travel-assistant": {
      "command": "npx",
      "args": ["-y", "mcp-travel-assistant"]
    },
    "tripadvisor": {
      "command": "npx",
      "args": ["-y", "tripadvisor-mcp"]
    },
    "dida-hotels": {
      "command": "python",
      "args": ["-m", "dida_hotel_mcp"]
    }
  }
}
```

**Capacidades resultantes**:
- **trvl**: vuelos + trenes + ferries (21+ proveedores)
- **travel-assistant**: Google Travel + Amadeus Enterprise
- **tripadvisor**: reviews + fotos + rankings
- **dida-hotels**: 2M+ hoteles con precios B2B en tiempo real

**Tiempo estimado**: 1-2 días para setup; 2-4 semanas para customización cliente.

---

## P7 — Post-Amadeus Migration Stack (julio 2026)

**Objetivo**: migrar proyectos que dependían de Amadeus Self-Service antes del sunset del 17 julio 2026.

**Escenario**: proyecto usa `amadeus-python` con claves self-service.

**Migration path**:

```
ANTES (pre-Jul 17):
amadeus-python + self-service keys → Amadeus Self-Service API

DESPUÉS (opción A — startups):
duffel-python → Duffel API ($3/orden, NDC nativo, sandbox gratis)

DESPUÉS (opción B — enterprise):
amadeus-python + enterprise keys → Amadeus Enterprise Portal
(requiere contrato directo con Amadeus)

DESPUÉS (opción C — zero-cost demo):
travel-mcp-server → agrega múltiples fuentes sin llaves propietarias
```

**Duffel migration (opción A) en código**:
```python
# Antes
from amadeus import Client
amadeus = Client(client_id='...', client_secret='...')  # self-service key
flights = amadeus.shopping.flight_offers_search.get(...)

# Después
import duffel
client = duffel.Duffel(access_token='...')  # duffel.com, sandbox gratis
offers_request = client.offer_requests.create({
    "slices": [{"origin": "MAD", "destination": "EZE", "departure_date": "2026-08-01"}],
    "passengers": [{"type": "adult"}]
})
```

**Tiempo estimado**: 1-2 semanas para migración completa si el código está limpio.

---

## P8 — Corporate Travel Policy Agent

**Objetivo**: agente que gestiona viajes corporativos respetando políticas de empresa y maximizando ahorros.

**Stack**:
- Multi-Agent-AI-Travel-Advisor (LangGraph + 7 agentes especializados)
- Amadeus Enterprise o Duffel para inventario
- Base de datos de políticas corporativas (JSON/DB)
- Integration con ERP/HRMS (SAP Concur / TravelPerk / custom)
- Claude Sonnet (razonamiento de política compleja)

**Agentes especializados**:
| Agente | Rol |
|--------|-----|
| Policy Checker | Valida cada opción contra política de empresa |
| Flight Optimizer | Mejor tarifa dentro de política |
| Hotel Selector | Hoteles aprobados + mejor precio |
| Budget Monitor | Tracking en tiempo real vs presupuesto |
| Approval Router | Escala para aprobación cuando fuera de política |
| Expense Integrator | Pre-genera expense report |
| Reporting Agent | Analytics de ahorro y compliance |

**KPIs objetivo**:
- 67% reducción en tiempo de gestión de viajes
- 31% enforcement automático de política
- 74% ahorro en gestión de gastos

**Tiempo estimado**: 10-16 semanas para deployment enterprise.
