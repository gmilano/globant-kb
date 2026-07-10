# 🧩 Patrones de composición — Travel & Hospitality

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-10

## Arquitectura base

```
[Vertical base (HAIP / PHPTRAVELS / Odoo CE)]
          ↓
[Capa de datos (OpenTravelData + DIDA MCP + Amadeus SDK)]
          ↓
[Orquestación de agentes (OTAIP / CrewAI / LangGraph)]
          ↓
[UI conversacional / API cliente (Dify / Claude / GPT-4o)]
```

---

## P1 — Full-stack Flight Booking Agent

**Objetivo:** Agente que busca, compara y reserva vuelos autónomamente con human-in-the-loop para confirmación.

**Componentes:**
- [TelivityAI/otaip](https://github.com/TelivityAI/otaip) — orquestación: Search → Price → Book → Ticket
- [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) — multi-fuente flight search (200+ aerolíneas + GDS)
- [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) — acceso a tarifas GDS y NDC
- [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) — datos maestros (aeropuertos, aerolíneas)

**Flujo:**
```
usuario: "vuelo Buenos Aires → Madrid para el 15 de agosto, ida y vuelta"
  → LetsFG busca en 200+ aerolíneas simultáneamente
  → OTAIP normaliza resultados (ATPCO fare rules, fee breakdown)
  → Agente presenta top 3 opciones con comparativa de precio + emisiones CO2
  → Usuario confirma
  → OTAIP ejecuta booking + ticketing via Amadeus NDC
  → Confirmación por email / WhatsApp
```

**Tiempo estimado:** 6-10 semanas (MVP funcional)
**Costo estimado:** USD 80k-240k (engagement completo)
**Nota de compliance:** OTAIP incluye void window enforcement y ADM prevention — crítico para producción.

---

## P2 — Hotel Discovery + Booking Agent

**Objetivo:** Agente conversacional para búsqueda y reserva hotelera con personalización y disponibilidad real.

**Componentes:**
- [TelivityAI/haip](https://github.com/TelivityAI/haip) — PMS base (si el cliente es un hotel)
- [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) — inventario B2B: 2M+ hoteles en tiempo real
- [esakrissa/hotels_mcp_server](https://github.com/esakrissa/hotels_mcp_server) — complemento retail vía Booking.com
- LangGraph / CrewAI — orquestación de búsqueda multi-fuente

**Flujo:**
```
usuario: "hotel boutique en Lisboa, cerca del Alfama, con terraza, máximo €180/noche"
  → Agente parsea preferencias (ubicación semántica, amenidades, precio tope)
  → DIDA MCP consulta inventario B2B (precios netos, disponibilidad real)
  → hotels_mcp_server complementa con opciones retail Booking.com
  → Agente rankea por fit semántico (rating + preferencias históricas del usuario)
  → Presenta top 5 con fotos, mapa, cancelación policy
  → Booking directo vía HAIP (si el hotel usa HAIP) o deep-link a OTA
```

**Tiempo estimado:** 4-8 semanas
**Costo estimado:** USD 60k-180k
**Diferenciador:** DIDA MCP da precios wholesale B2B, no retail — margen adicional para el operador.

---

## P3 — Agente de Trip Completo (Multimodal)

**Objetivo:** Planificación end-to-end de viaje: vuelos + hoteles + transporte local + actividades.

**Componentes:**
- [TelivityAI/otaip](https://github.com/TelivityAI/otaip) — vuelos y GDS
- [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) — hoteles
- [malkreide/swiss-transport-mcp](https://github.com/malkreide/swiss-transport-mcp) — transporte local (Europa)
- [shaheennabi/Production-Ready-TripPlanner-Multi-AI-Agents-Project](https://github.com/shaheennabi/Production-Ready-TripPlanner-Multi-AI-Agents-Project) — arquitectura de referencia multi-agente
- CrewAI — coordinación de agentes especializados

**Agentes especializados:**
```
CrewAI Crew:
  - FlightAgent: busca vuelos con OTAIP + LetsFG
  - HotelAgent: busca hoteles con DIDA MCP
  - TransportAgent: planifica conexiones locales con swiss-transport-mcp
  - ItineraryAgent: genera itinerario coherente con todos los inputs
  - BudgetAgent: valida que el total esté dentro del presupuesto del usuario
```

**Tiempo estimado:** 10-16 semanas
**Costo estimado:** USD 120k-350k
**Nota:** Para LATAM, reemplazar swiss-transport-mcp por adaptador Redbus/OmniLineas (oportunidad de IP propio).

---

## P4 — Corporate Travel Approval Workflow

**Objetivo:** Automatizar el ciclo aprobación-booking-reporting de viajes corporativos con policy enforcement.

**Componentes:**
- [jongalloway/travel-booking-agents](https://github.com/jongalloway/travel-booking-agents) — workflow base de aprobaciones
- [amadeus4dev/amadeus-node](https://github.com/amadeus4dev/amadeus-node) — tarifas negociadas corporativas
- Odoo CE — ERP/CRM para gestión de viajeros y centros de costo
- Claude / GPT-4o — análisis de policy y recomendaciones

**Flujo:**
```
empleado: "viaje a São Paulo del 20-22 agosto por reunión con cliente XYZ"
  → Agente valida contra travel policy de la empresa (clase permitida, hotel máximo, etc.)
  → Busca opciones dentro de política (Amadeus corporate fares)
  → Pre-aprueba automáticamente si está dentro de umbrales
  → Escala a manager si excede política (con justificación resumida por AI)
  → Post-trip: reconcilación automática de gastos contra booking
  → Reporting mensual de viajes por departamento / proyecto
```

**Tiempo estimado:** 8-12 semanas
**Costo estimado:** USD 90k-250k
**Mercado objetivo:** TMCs y empresas con 200+ empleados viajando regularmente.

---

## P5 — IRROPS Automation Agent (Aerolíneas)

**Objetivo:** Automatizar el manejo de cancelaciones y delays con rebooking proactivo y compliance EU261/US DOT.

**Componentes:**
- [TelivityAI/otaip](https://github.com/TelivityAI/otaip) — IRROPS module + EU261 compliance engine
- [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) — acceso a disponibilidad en tiempo real para rebooking

**Flujo:**
```
sistema aerolínea: vuelo IB6835 cancelado (30 min antes de salida)
  → OTAIP detecta evento IRROPS
  → Clasifica pasajeros por prioridad (conexión urgente, pasajeros vulnerables, FF status)
  → Calcula opciones de rebooking (mismo día, día siguiente) con seat availability real
  → Verifica elegibilidad EU261 (compensación €250-600 según ruta)
  → Envía opciones proactivamente al pasajero (WhatsApp/SMS/app)
  → Pasajero confirma en 15 min o agente humano escala
  → Genera automáticamente el voucher de compensación EU261
```

**ROI estimado:** Reducción 40-60% en cost per IRROPS event
**Tiempo estimado:** 8-14 semanas
**Costo estimado:** USD 100k-280k

---

## P6 — Travel Agency AI CRM + Sales Copilot

**Objetivo:** Agente de ventas para agencias que gestiona leads, propone itinerarios y hace follow-up automático.

**Componentes:**
- [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) — CRM travel base
- [UjjwalSaini07/Wander-Desk](https://github.com/UjjwalSaini07/Wander-Desk) — Sales Copilot + Traveler Intelligence
- Dify o n8n — automatización de workflows de seguimiento
- OTAIP o LetsFG — generación de cotizaciones en tiempo real

**Flujo:**
```
lead entra por WhatsApp: "quiero un viaje a Europa para 2 personas en septiembre"
  → Agente de intake recoge: fechas, presupuesto, intereses, restricciones
  → Genera 3 opciones de itinerario con precios estimados (OTAIP/LetsFG)
  → CRM registra lead y perfil (ExcursioX)
  → Sales Copilot prioriza leads calientes y programa follow-ups
  → Agente hace seguimiento a los 2 días si no hay respuesta
  → Revenue forecasting basado en pipeline de conversión histórico
```

**Tiempo estimado:** 6-10 semanas
**Costo estimado:** USD 70k-200k

---

## P7 — Open Source PMS para Hoteles LATAM

**Objetivo:** Deploy de HAIP para un hotel boutique con AI de pricing y concierge.

**Componentes:**
- [TelivityAI/haip](https://github.com/TelivityAI/haip) — PMS core
- [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) — conectividad con canales de distribución
- Claude AI — concierge conversacional para huéspedes
- Modelo de ML propio — yield management (precio óptimo por fecha/ocupación)

**Flujo:**
```
huésped (vía WhatsApp/web): "quiero reservar para el 10-14 agosto, 2 adultos"
  → Agente concierge verifica disponibilidad en HAIP (inventario propio)
  → Modelo ML calcula precio dinámico óptimo basado en ocupación y fechas
  → Ofrece upgrades contextuales (suite vs. estándar, desayuno incluido)
  → Booking confirmado y registrado en HAIP
  → Pre-arrival: agente envía tips locales, confirma hora de check-in
  → Post-stay: solicita review, ofrece descuento para próxima estadía
```

**Tiempo estimado:** 10-14 semanas
**Costo estimado:** USD 80k-220k
**Diferenciador LATAM:** No existe en el mercado LATAM una solución PMS open source de calidad. HAIP + Globant = first mover.

---
*Actualizado automáticamente por el pipeline de ingest.*
