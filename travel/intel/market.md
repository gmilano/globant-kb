# 🗺️ Mapa de mercado — Travel & Hospitality AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-10

## Tamaño de mercado 2026

| Segmento | 2024-2026 | 2030 | CAGR | Fuente |
|----------|-----------|------|------|--------|
| AI en Turismo (global) | USD 2.95B (2024) | USD 13.38B | 28.7% | MarketsAndMarkets |
| GenAI en Travel | USD 1.27B (2026) | USD 5.79B (2035) | 18.64% | Precedence Research |
| Agentic AI Travel Booking | USD 2.1B (2025) | USD 12.1B (2034) | 22.5% | Market Intelo |
| AI en Travel (mercado amplio) | USD 222.4B (2026) | USD 710.57B (2030) | 33.7% | ResearchAndMarkets |

**Señal clave:** Pese a la adopción masiva en backend, solo 2% de consumidores US confía en agentes autónomos de booking. El gap adopción-oferta es la oportunidad de integración asistida.

---

## Players globales clave

| Empresa | Tipo | Fortaleza | Debilidad | Amenaza AI |
|---------|------|-----------|-----------|------------|
| **Amadeus** | GDS / SaaS travel tech | Mayor GDS global (500+ aerolíneas, NDC Level 3), SDKs open source | Sistemas legacy EDIFACT, pricing opaco | OTAIP + LetsFG democratizan acceso |
| **Sabre** | GDS / PSS | PSS (passenger service system) de muchas aerolíneas, SabreDevStudio SDKs | Deuda técnica enorme, migración cloud lenta | NDC reduciendo dependencia |
| **Travelport** | GDS | Especializado en agencias, fuerte en UK/Europa | El más pequeño de los 3 GDS | Consolidación con OTAIP posible |
| **Booking.com** | OTA | 28M listings, dominante en hoteles Europa | Modelo comisión alto (15-20%), agentes AI pueden bypassear | AI agents buscando directo |
| **Expedia** | OTA | Diversificación (Hotels.com, Vrbo, VRBO) | Compite con proveedores en AI | Google AI search erosiona tráfico |
| **Airbnb** | OTA alternativo | 7M+ listings, brand fuerte | Sin vuelos, pricing complejo | Agentes multimodal los incluyen |
| **Google Travel** | Search / Meta | Dominante en intent-based search | No hace booking directo (aún) | Modo agente en desarrollo |
| **TelivityAI** | OSS startup | OTAIP + HAIP: primer stack travel AI open source completo | Nuevo, sin prueba de escala | Potencial disruptor open core |
| **Duffel** | API aggregator | NDC moderno, onboarding fácil, SDK MIT | Cobertura aérea menor que GDS | Competencia de LetsFG |
| **DIDA Travel** | B2B hotel | 3er B2B hoteles del mundo, 2M+ propiedades, MCP open source | Marca desconocida en Occidente | Primer mover en hotel MCP |

---

## Oportunidades AI en LATAM

### Gaps identificados (primera vez que se mapearon en julio 2026):

1. **Payment integration LATAM:** No existe adaptador open source para ACP + PIX (Brasil) + OXXO (México) + PSE (Colombia). El gap identificado en el análisis de retail también aplica en travel — aerolíneas como LATAM Airlines, Gol, Viva Aerobus usan pagos locales.

2. **GDS alternatives para aerolíneas regionales:** Avianca, LATAM, Volaris, JetSMART no tienen el mismo nivel de NDC adoption que los carriers europeos. Oportunidad para wrappers open source.

3. **Tour operators de aventura:** Patagonia, Galápagos, Amazonas — operadores boutique sin acceso a booking engines modernos. Stack HAIP + agentes de itinerary generation = producto viable.

4. **Agencias de viajes corporativas LATAM:** El mercado TMC corporativo LATAM está dominado por CWT/AmexGBT con muy poca competencia local. Stack Odoo + OTAIP + aprobación corporativa es una oportunidad de mercado.

5. **Transporte terrestre inter-ciudad:** No hay equivalente al swiss-transport-mcp para buses y trenes en LATAM (Flixbus, Redbus, etc.). MCP server para Redbus/OmniLineas sería un diferenciador.

---

## Posicionamiento Globant AI Studios

| Capability | Estado actual | Propuesta con este KB |
|------------|---------------|----------------------|
| OTA Development | Proyectos ad-hoc | Stack OTAIP + HAIP como acelerador replicable |
| Airline AI | Manual | OTAIP para IRROPS automation, compliance EU261 |
| Hotel Tech | Baja presencia | HAIP como base para proyectos PMS |
| Corporate Travel | Nulo | Odoo CE + agentes aprobación como IP propio |
| LATAM Payments Travel | Gap | First-mover en adaptador ACP + pagos locales |

---
*Actualizado automáticamente por el pipeline de ingest.*
