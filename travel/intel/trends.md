# 📡 Tendencias — Travel & Hospitality

> Última actualización: 2026-07-14 (v7)

## T1 — MCP se convierte en el protocolo estándar del stack de viajes

Sabre, Amadeus, Travelport, Expedia y Dida Holdings tienen MCP servers en producción o beta en 2026. El MCP RC 2026-07-28 elimina `Mcp-Session-Id` y hace el protocolo stateless. Cualquier agente de viajes construido sobre MCP hereda acceso inmediato a GDS + hoteles + actividades sin integración bespoke.

**Signal strength**: Alta — adoption confirmada por 5 proveedores tier-1.

## T2 — Agentic booking va a producción; la confirmación real es el cuello de botella

Travelport TripServices lanzó en Jun 11, 2026 con arquitectura MCP-first: el LLM no adivina disponibilidad, llama la herramienta. Primera despliegue masivo: 400+ agencias europeas (1 Jul 2026). El problema de confirmaciones falsas se resuelve a nivel de protocolo.

**Signal strength**: Alta — caso real en producción con 400+ agencias.

## T3 — Business travel lidera; leisure wary por trust

Solo el 2% de consumidores US están dispuestos a usar AI booking autónomo; el 80% de ejecutivos planean desplegarlo. Business travel adopta más rápido por safeguards corporativos (policy, budget, approval).

**Signal strength**: Alta — data Skift + IDC 2026.

## T4 — Hoteles abriendo inventario vía MCP (Dida 2M+ propiedades, Jul 2026)

Dida Holdings lanzó MCP nativo con 2M+ propiedades el 9 Jul 2026. OAuth auth, inventory real-time, sin límite de llamadas. Marriott e IHG también preparando integración directa.

**Signal strength**: Alta — lanzamiento producción semana pasada.

## T5 — LATAM Airlines referencia el modelo de go-live regional escalonado

Agente AI de LATAM (Google Vertex AI): beta Chile abr 2025 → Colombia, Perú, Ecuador jun 2025 → Brasil H2 2026. Modelo replicable para otros carriers y OTAs en LATAM.

**Signal strength**: Alta — caso real LATAM con datos públicos.

## T6 — WhatsApp es el canal de booking de facto en LATAM

WhatsApp Pay live en Brasil; proyectado en 6+ países LATAM fin 2026. Al 2027: 65% transacciones WhatsApp en LATAM = asistidas/gestionadas por AI. Pipeline WhatsApp → agente → Pix/OXXO/PSE es el MVP de mínima fricción.

**Signal strength**: Alta — datos eyeleven.com + scala-technologies.com 2026.

## T7 — GroupTravelBench revela que los LLMs aún fallan en viajes grupales

650 tareas, 22 arquetipos, 3 niveles de dificultad. Hallazgo: todos los modelos frontier tienen gaps sustanciales en fairness y cobertura de preferencias para grupos. Requiere orchestration adicional para MICE/incentivos.

**Signal strength**: Media — arXiv:2605.25200, May 2026.

## T8 — TravelEval identifica los cuellos de botella reales del LLM de viajes

Multi-constraint optimization y preference aggregation son los dos principales puntos de falla. Los agentes necesitan herramientas de search + constraint-checking explícitas.

**Signal strength**: Media — arXiv:2606.01046, Jun 2026.

## T9 — Guardrails para itinerarios incoherentes (Iti-Validator)

LLMs generan planes con inconsistencias temporales y espaciales. Iti-Validator valida contra datos reales de duración de vuelo y corrige automáticamente. Patrón: genera → valida → corrige → entrega.

**Signal strength**: Media — arXiv:2510.24719; aplicable directamente en producción.

## T10 — Consumer trust gap es el riesgo principal del lado go-to-market

80% execs vs 2% consumers. Early adopters: viajeros business frecuentes, millennials tech-savvy, viajeros internacionales. Leisure mass market requiere transparency + HITL para los próximos 18-24 meses.

**Signal strength**: Alta — data Skift + OAG Mar 2026.

## T11 — MindTrip marca el modelo AI-native OTA con Sabre + PayPal

Partnership Sabre + PayPal + MindTrip (anunciado Feb 12, 2026; live May 2026): primer sistema end-to-end agentic. MindTrip accede a 420+ aerolíneas via Sabre Mosaic + pago via PayPal.

**Signal strength**: Alta — lanzamiento público mayo 2026.

## T12 — WebMCP habilita cualquier sitio de viajes para ser "agent-ready"

WebMCP traduce datos de sitios web en herramientas MCP consumibles por LLMs, sin que el proveedor construya un MCP server propio. Agencias pequeñas y operadores regionales accesibles para agentes AI sin inversión técnica.

**Signal strength**: Media — phocuswire.com 2026.

## T13 — NDC + LCC convergencia en GDS agénticos

Travelport TripServices y Sabre Mosaic incluyen NDC e LCC en el mismo endpoint. El agente puede comparar legacy + NDC + LCC en una sola llamada MCP. Elimina la complejidad histórica de multi-fuente.

**Signal strength**: Alta — en producción Travelport TripServices.

## T14 — Open data + AI: OPTD como foundation del RAG de viajes

OpenTravelData (20K+ POR con código IATA, aeropuertos, rutas, frecuencias) es el data layer gratuito para RAG de viajes. Combinado con Geonames + Wikipedia = knowledge base aérea/geográfica completa.

**Signal strength**: Media — proyecto activo, licencia LGPL.

## T15 — Evaluación sistemática como diferenciador de calidad del SI

En 2026 existen benchmarks serios para agentes de viajes LLM: TripCraft (spatio-temporal, ACL 2025), GroupTravelBench (grupos/MICE, May 2026), TravelEval (multi-constraint, Jun 2026). Globant puede usarlos como suite QA diferenciadora pre-entrega.

**Signal strength**: Alta — tres papers recientes + datasets públicos.

---
*Pipeline automático — se actualiza cada hora.*
