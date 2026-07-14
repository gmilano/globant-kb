# 📈 Agentes trending — Retail & Consumer

> Señales nuevas esta semana. Repos con actividad reciente o breakout en julio 2026.
> Última actualización: 2026-07-14 (v10)

## Señales calientes esta semana

### 1. nitin27may/e-commerce-agents — Multi-Agent A2A Reference Architecture
**Por qué ahora**: Primer ejemplo completo de producción con Microsoft Agent Framework (MAF) + protocolo A2A para e-commerce.
6 agentes especializados + orquestador + auth + telemetría + frontend Next.js completo.
Tutorial step-by-step cubre todos los conceptos MAF: agents, tools, memory, middleware, HITL, checkpoints, visualización.
- Repo: https://github.com/nitin27may/e-commerce-agents
- Stack: MAF Python SDK + A2A + FastAPI + Next.js + PostgreSQL + pgvector
- Puerto .NET/C# incluido con 9 proyectos de test (~191 tests)
- Patrón: 6 agentes especialistas (discovery / orders / pricing / reviews / inventory / support) + orquestador

### 2. shelfops — Cerebras Gemma 4 vs Local Gemma Shelf Audit
**Por qué ahora**: Demo que benchmarkea inferencia edge (Cerebras, 2,600 tok/s) vs local para auditoría de góndolas.
Patrón emergente: cámaras IP en tienda → inferencia edge ultra-rápida → alertas de OSA (On-Shelf Availability) en tiempo real.
- Repo: https://github.com/IFAKA/shelfops
- Stack: Cerebras Gemma 4, Gemma local, YOLOv8, Python
- Caso de uso: Compliance de planograma sin supervisores humanos

### 3. retail-pricing-agent-ai — Agentic Pricing con Amazon Bedrock
**Por qué ahora**: ROI más claro en retail AI — protección de margen + clearance automatizado.
Workflow: ingestión market data → demand forecasting → generación estrategia promocional → sincronización de precios.
- Repo: https://github.com/samhaldia/retail-pricing-agent-ai
- Stack: Python + Amazon Bedrock LLMs + FastAPI
- Diferencial: Genera campañas promocionales específicas por segmento de cliente via LLM

### 4. yifeizhangcs/awesome-agentic-commerce — Survey de protocolos 2026
**Por qué ahora**: Mapa definitivo del protocol landscape: ACP (OpenAI+Stripe) vs UCP (Google+Shopify+Walmart) vs MCP.
Los retailers necesitan al menos 2 protocolos para aparecer en ChatGPT (ACP) y Google AI Mode (UCP).
- Repo: https://github.com/yifeizhangcs/awesome-agentic-commerce
- Contenido: Comparativa protocolos, casos producción, benchmarks de conversión

### 5. retail-ai-store-level-intelligence — AI en Punto de Venta
**Por qué ahora**: El argumento central: la oportunidad AI no está en HQ — está en la tienda.
Agentes que analizan ventas locales hora a hora, detectan anomalías, sugieren acción al gerente de tienda.
- Repo: https://github.com/Svyatoslavpech/retail-ai-store-level-intelligence
- Stack: Apache-2.0, Python, LLMs edge
- Patrón: Inteligencia distribuida — cada tienda tiene su agente local

## Protocolo landscape (julio 2026)

| Protocolo | Backer | Canal AI principal | Status producción |
|-----------|--------|--------------------|-------------------|
| ACP (Agentic Commerce Protocol) | Stripe + OpenAI | ChatGPT shopping | Producción desde Q4 2025 (PayPal + Worldpay) |
| UCP (Universal Commerce Protocol) | Google + Shopify + Walmart | Google AI Mode / Gemini | Lanzado NRF 2026, open-source spec en ucp.dev |
| MCP (Model Context Protocol) | Anthropic + LF | Claude / todos los LLMs | 97M downloads/mes, estándar de facto dev |

**Recomendación Globant**: Implementar UCP + ACP + exponer MCP server propio del cliente.
Los 3 cubren el 90% del tráfico agentico global. Tiempo estimado de implementación: 3-4 sprints.

## Señal LATAM: WhatsApp Commerce

Patrón dominante en Brasil, México, Colombia, Argentina, Chile:
- WhatsApp Business API + catálogo nativo → checkout conversacional → pago Pix/OXXO/PSE/Webpay
- Sin necesidad de app nativa del cliente. El agente vive en WhatsApp.
- +120M usuarios WhatsApp en Brasil. Tasa de conversión 3-4x vs web tradicional.
- Meta está lanzando WhatsApp Payments en LATAM — habilita checkout in-chat nativo.

## Señal: AI-driven traffic supera search orgánico

- Tráfico retail referido por IA: +393% YoY en Q1 2026
- Conversión de tráfico AI: +42% vs búsqueda tradicional
- Black Friday 2025: +805% tráfico AI vs Black Friday 2024
- AI platforms: $20.57B en gasto retail ecommerce US (2026) — casi 4x el año anterior

---
*Pipeline automático — se actualiza cada hora.*
