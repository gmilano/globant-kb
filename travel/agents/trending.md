# 📈 Agentes trending — Travel (semana de 2026-07-14)

> Señales frescas esta semana. Foco en lo que está en movimiento ahora.

## Señales calientes (Jul 2026)

### 1. Dida Hotel MCP — lanzamiento oficial (9 Jul 2026)
- **Repo**: [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) (MIT)
- **Señal**: Dida Holdings (3er mayor B2B de hoteles global) lanzó MCP nativo con 2M+ propiedades.
- **Impacto**: cualquier Claude Desktop / Cursor / ChatGPT puede reservar hoteles en minutos vía OAuth.
- **Globant angle**: base lista para productos white-label de hotelería para clientes TMC/OTA.

### 2. Travelport TripServices — primera despliegue masivo (1 Jul 2026)
- **Señal**: Travelport + Travelsoft conectaron TripServices a 400+ agencias europeas vía Orchestra.
- **Arquitectura clave**: MCP como capa de ejecución; el LLM nunca "adivina" disponibilidad — llama la herramienta.
- **Paper**: [techtimes.com — AI Booking Agents Cannot Confirm a Ticket: Travelport Tests a Fix](https://www.techtimes.com/articles/319558/20260702/ai-travel-booking-agents-cannot-confirm-ticket-travelport-tripservices-tests-fix.htm)
- **Problema que resuelve**: estados de "confirmado" falsos en agentes anteriores — ahora la confirmación viene del GDS en tiempo real.

### 3. MCP RC 2026-07-28 — protocolo stateless (impacta TODO el stack travel)
- **Señal**: MCP elimina `Mcp-Session-Id`, el handshake `initialize`, y sticky routing.
- **Impacto travel**: todos los MCP servers de viaje (Sabre, Amadeus, Expedia, Dida) deberán migrar.
- **Referencia**: [byteiota.com — MCP Goes Stateless July 2026](https://byteiota.com/mcp-goes-stateless-july-2026-breaking-changes/)
- **Action**: al construir MCP travel servers, diseñar stateless desde el inicio.

### 4. GroupTravelBench (arXiv:2605.25200, May 2026)
- **Señal**: primer benchmark para planificación multi-persona y multi-turn.
- **650 tareas** × 22 arquetipos de grupo × 3 niveles de dificultad; 3,718 perfiles reales + 338K POIs.
- **Hallazgo clave**: todos los LLMs frontier fallan en fairness y cobertura de preferencias.
- **Ref**: [arxiv.org/abs/2605.25200](https://arxiv.org/abs/2605.25200)
- **Globant angle**: benchmark para validar agentes de viajes grupales / MICE.

### 5. TravelEval (arXiv:2606.01046, Jun 2026)
- **Señal**: framework comprehensivo para evaluar agentes LLM en viajes.
- **Bottlenecks identificados**: multi-constraint optimization y preference aggregation.
- **Ref**: [arxiv.org/abs/2606.01046](https://arxiv.org/abs/2606.01046)
- **Globant angle**: usar para QA antes de go-live con cliente.

### 6. Expedia MCP + Inventario Abierto (May 2026)
- **Señal**: Expedia lanzó conector MCP para Claude el 6 May 2026. Acceso directo a inventario: hoteles, vuelos, actividades, autos.
- **Ref**: [Expedia en Claude](https://www.expedia.com/newsroom/plan-your-next-trip-with-expedia-in-claude/)
- **Dev**: [developers.expediagroup.com](https://developers.expediagroup.com/docs/ai-solutions)

### 7. LATAM Airlines AI Agent expandido (Q2 2026)
- **Señal**: agente IA LATAM (Google Vertex AI) ahora live en Chile, Colombia, Perú, Ecuador → Brasil.
- **Conversational + booking**: recomendaciones basadas en historial, presupuesto, disponibilidad real.
- **Globant angle**: modelo de go-live regional por etapas que replicar para otros carriers LATAM.

---
*Pipeline automático — se actualiza cada hora.*
