# 📈 Agentes Trending — Travel & Hospitality

> Lo nuevo esta semana. Foco en señales emergentes y repos recientes.
> Última actualización: 2026-07-09 (v6 — trvl, LATAM Airlines, Despegar SOFIA, Google AI Mode live)

## Señales clave esta semana (julio 2026)

### 🔥 S1 — trvl: El MCP de viajes más completo — Free, sin API keys
- **Repo**: [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) — MIT, Go binary
- **Por qué importa**: Un solo MCP tool ("travel router") expone 65 capacidades: Google Flights, Google Hotels, Trivago, Airbnb, Booking.com, Hostelworld, Ferryhopper, trenes europeos, airport lounges, travel hacks, price alerts, award sweet spots, baggage rules, weather, destination intel. Ahorro de tokens: 98.9% (378 tokens en tools/list vs 33,500 con 65 tools individuales). Perfil de preferencias del usuario (`~/.trvl/preferences.json`) que Claude auto-construye y usa para filtrar resultados (estrellas, barrio, hora de vuelo, presupuesto). Go binary = instalación instantánea, sin Docker, sin Python, sin API keys.
- **Caso Globant**: Integrar trvl como base de cualquier travel agent POC. Setup < 5 min.

### 🔥 S2 — Google AI Mode Travel Booking: partners confirmados, launch inminent
- **Estado**: Anunciado Google I/O 2025, partners confirmados junio 2026, launch en curso
- **Partners**: Booking.com, Choice Hotels, Expedia, IHG Hotels & Resorts, Marriott International, Wyndham Hotels & Resorts
- **Modelo**: Conversación → comparación → booking via partner (Google no procesa pagos)
- **Source**: [Google Blog](https://blog.google/products-and-platforms/products/search/agentic-plans-booking-travel-canvas-ai-mode/)
- **Por qué importa**: El mayor disruptor del SEO de viajes. Cualquier hotel/OTA que no sea AI-legible quedará invisible. AEO = acción urgente para todos los clientes de travel.

### 🔥 S3 — LATAM Airlines AI Virtual Agent + Disruption Management en Producción
- **Lanzamiento**: Beta Chile abr 2025 → Colombia/Perú/Ecuador jun 2025 → expansión 2026
- **Plataforma**: Google Vertex AI + Generative AI (Google Cloud)
- **Capacidades**: Recomendaciones personalizadas de destino, planificación de actividades, booking de vuelos en lenguaje natural. Jun 2026: integración con ML + cloud-native para disruption management en todas las Américas.
- **Source**: [TravelAndTourWorld](https://www.travelandtourworld.com/news/article/latam-introduces-groundbreaking-ai-virtual-agent-for-personalized-travel-planning-heres-more-you-should-know/)
- **Caso Globant**: LATAM Airlines ya lo hizo. Avianca, Copa, GOL, Azul son el siguiente paso.

### 🔥 S4 — Despegar SOFIA — Primera GenAI Travel Assistant de LATAM
- **Lanzamiento**: Marzo 2024 (primera región), rollout LATAM completo 2025-2026
- **Capacidades**: Multimodal — texto, voz, imagen. Cubre desde inspiración hasta post-viaje.
- **Grupo**: Despegar, Decolar (Brasil), Best Day (México), Viajes Falabella (Chile), Viajanet.
- **Modelo de AI**: GenAI. Stack no revelado públicamente.
- **Source**: [BusinessWire](https://www.businesswire.com/news/home/20240304920931/en/Despegar-revolutionizes-the-tourism-industry-introducing-the-regions-first-Generative-AI-Travel-Assistant)
- **Por qué importa**: Las OTAs LATAM ya están en producción con GenAI. Los clientes más pequeños (agencias independientes, cadenas hoteleras regionales) son el mercado no atendido.

### 🔥 S5 — Amadeus AI Commerce + Amadeus Max — Hoteles en canales AI (HITEC jun 2026)
- **Lanzamiento**: Anunciado HITEC, junio 2026
- **AI Commerce**: Hace hoteles "bookables" directamente desde Claude, ChatGPT, Google AI Mode. Structured data + AI-legible inventory.
- **Amadeus Max**: Revenue management por lenguaje natural. Hotel staff pregunta "¿cuándo debo subir el precio para agosto?" y recibe datos + recomendación.
- **Source**: [Skift Exclusive](https://skift.com/2026/06/16/amadeus-ai-hotel-tools-strategy-hitec-exclusive/)
- **Caso Globant**: Implementar AI Commerce para cadenas hoteleras LATAM que ya usan Amadeus.

### 🔥 S6 — Navan Edge: Corporate Travel AI para viajeros no-gestionados
- **Lanzamiento**: 2026. "Book with AI" + "Admin Companion" + Navan Edge para freelancers/SME.
- **Vibe-based booking**: El usuario describe el "vibe" del viaje (ej. "quiero algo tranquilo cerca del agua, budget $2000 para el fin de semana") y el AI propone opciones reales.
- **Competidores emergentes**: Travel Code, Perk (ex-TravelPerk), ITILITE, Otto the Agent
- **Oportunidad Globant**: Build Navan-like para empresas LATAM medianas (500-5000 empleados) con stack open source.

### 🔥 S7 — Sabre + MindTrip + PayPal — Primer pipeline agentic E2E (mayo 2026)
- **Stack**: MindTrip (conversational AI) + Sabre Mosaic APIs (420+ aerolíneas, 2M hoteles) + PayPal agentic commerce
- **Estado**: Vuelos live; hoteles en rollout
- **Source**: [HotelManagement.net](https://www.hotelmanagement.net/tech/sabre-paypal-and-mindtrip-partner-launch-agentic-ai-travel-booking-platform)
- **Por qué importa**: Primera demo pública de booking completo via chat sin intervención humana. El template para cualquier OTA que quiera ir agéntico.

### 🔥 S8 — mcp_travelassistant: Suite MCP modular
- **Repo**: [skarlekar/mcp_travelassistant](https://github.com/skarlekar/mcp_travelassistant) — MIT
- **Módulos**: flight-mcp, hotel-mcp, events-mcp, weather-mcp, budget-mcp, itinerary-mcp
- **Por qué importa**: Patrón hub-and-spoke para orquestar múltiples MCP servers en un solo agente. Cada módulo reemplazable por proveedor diferente.

---

## Señales de mercado (julio 2026)

| Señal | Fuente | Implicación |
|-------|--------|-------------|
| Agentic travel booking market: $2.1B (2025) → $12.1B (2034) CAGR 22.5% | MarketIntelo | Ventana de 3-5 años para posicionarse |
| 61% millennials/Gen Z dispuestos a delegar trip planning a AI | Agentic AI Travel Market Report | Segmento de mayor adopción: viajeros < 40 |
| 38% mayor tasa de booking completion en OTAs con AI vs funnel tradicional | Agentic AI Travel Market Report | ROI tangible para clientes OTA |
| Google AI Mode partners: 6 cadenas/OTAs confirmadas | Google Blog jun 2026 | AEO urgente para todos los clientes travel |
| LATAM: <10% de compañías escalaron AI agents en 2025; 40% hoteles planean implementar 2026 | IDC 2026 | La demanda supera la oferta de implementadores |
| Corporate travel market: $1.5T global 2026 | PhocusWire 2026 | Mayor deal size para Globant enterprise travel |
| Marzo 2026 = "el mes en que el viaje agéntico se hizo real" (OAG) | OAG Mar 2026 | Punto de inflexión de la industria documentado |

---
*Pipeline automático — se actualiza cada hora.*
