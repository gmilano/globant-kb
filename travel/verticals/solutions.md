# 🏭 Verticales de partida — Travel & Hospitality

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-13 (v11)

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **QloApps** | OSL-3.0 | [github.com/Qloapps/QloApps](https://github.com/Qloapps/QloApps) | PHP, MySQL | PMS hotelero completo + booking engine + website. Hoteles boutique, hostales, B&B. Base para añadir chatbot de reservas y revenue AI. |
| **HAIP Hotel AI Platform** | Apache-2.0 | [github.com/TelivityAI/haip](https://github.com/TelivityAI/haip) | TypeScript/NestJS/React | PMS API-first con 12 AI agents nativos: pricing dinámico, demanda, cancelaciones, housekeeping, comms. Ideal para hoteles que quieren AI desde el día 1. |
| **OpenHotelFR** | MIT | [github.com/nicolv23/OpenHotelFR](https://github.com/nicolv23/OpenHotelFR) | Python/Flask | App web básica de gestión hotelera. Ligera, rápida de desplegar, buena para MVPs y demos en LATAM. |
| **Mews Fiscalizations** | MIT | [github.com/MewsSystems/fiscalizations](https://github.com/MewsSystems/fiscalizations) | .NET | Librería para reporting fiscal en múltiples países. Complemento para PMS en LATAM (Brasil, Argentina, México). |
| **opentraveldata** | Apache-2.0 | [github.com/opentraveldata](https://github.com/opentraveldata) | Python/CSV | Datos abiertos de aeropuertos, aerolíneas, rutas, schedules. Base para agentes que razonan sobre conectividad aérea. |
| **Duffel** *(API comercial)* | Commercial | [duffel.com](https://duffel.com) | REST API | Reemplazante de Amadeus Self-Service post-sunset. $3/orden, NDC nativo, sandbox gratuito. La alternativa más limpia para startups. |
| **Apaleo** *(PMS comercial)* | Commercial + MCP | [apaleo.com](https://apaleo.com) | SaaS/API | Primer PMS con MCP nativo + Agent Hub marketplace. Para clientes enterprise que no quieren open source. |

## Cómo customizar con AI

### Patrón QloApps + AI
1. Fork de [Qloapps/QloApps](https://github.com/Qloapps/QloApps)
2. Exponer API REST interna del motor de reservas
3. Añadir agente de reservas conversacional (LangGraph + Claude Haiku)
4. UI: chat widget en la web del hotel

### Patrón HAIP + AI extendida
1. Deployar [TelivityAI/haip](https://github.com/TelivityAI/haip) con Docker
2. Sus 12 agentes ya cubren revenue + operaciones
3. Extender con: agente de marketing (campañas), agente de reputación (reviews), agente de upselling (room upgrade)
4. Conectar vía MCP con Claude para interfaz conversacional

### Patrón opentraveldata + LangGraph
1. Ingestar datos de aeropuertos/rutas de opentraveldata
2. Construir grafo de conectividad como tool de LangGraph
3. Agente que razona sobre opciones de vuelo sin APIs de pago
4. Complementar con Duffel para precios reales

## Ecosistema de distribución hotelera

```
Canal directo (web del hotel)
    ↓ HAIP/QloApps + AI chat widget
Motor de reservas directo (0% comisión)

Canal OTA (Booking.com, Expedia)
    ↓ HAIP channel manager (SiteMinder adapter)
450+ OTAs sincronizadas

Canal GDS (Agencias, Corporativo)
    ↓ Amadeus Enterprise / Sabre
Inventario corporativo y TMC
```

## LATAM: consideraciones

- **Brasil**: fiscalización obligatoria → usar Mews Fiscalizations o similar
- **México/Colombia/Argentina**: hoteles boutique abundantes → QloApps fit natural
- **Idioma**: QloApps es multilingual, HAIP en inglés (requiere localización)
- **WhatsApp**: canal dominante → conectar motor de reservas vía WhatsApp Business API
- **Pagos**: Mercado Pago / PayU / ePayco más relevantes que Stripe en muchos mercados
