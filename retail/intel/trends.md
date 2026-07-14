# 📡 Tendencias — Retail & Consumer AI

> Señales de mercado, movimientos de protocolo, tecnología emergente.
> Última actualización: 2026-07-14 (v10)

## 15 Tendencias clave (julio 2026)

### T1 — Era dual-protocolo: ACP + UCP como requisito base
ACP (Stripe + OpenAI) maneja el checkout dentro de ChatGPT.
UCP (Google + Shopify + Walmart, lanzado en NRF 2026) cubre el journey completo desde discovery en Google AI Mode.
Los retailers que no implementen ambos quedan invisibles en los dos canales de AI más grandes del mundo.
**Para Globant**: UCP + ACP implementation es un servicio de corto plazo con ROI inmediato.

### T2 — Tráfico AI supera al orgánico en retailers líderes
+393% YoY en Q1 2026 para tráfico referido por IA. Conversión +42% vs búsqueda tradicional.
Black Friday 2025: +805% tráfico AI vs 2024. Los retailers que optimizan para AI discovery convierten mejor.
**Implicación**: El SEO clásico se complementa con "AEO" (Agent Engine Optimization): datos estructurados,
APIs limpias, UCP/ACP endpoints para que los agentes lean y actúen correctamente.

### T3 — Voice Commerce Agents: el segmento más veloz (36.25% CAGR)
Los agentes de voz superan a los de texto en adopción por usuarios mayores de 50 y contextos manos-libres
(cocina, manejo, ejercicio). Alexa shopping + Google Assistant + Claude voice son los canales.
**Para Globant**: Voice-first UI pattern para clientes con SKUs de consumo masivo (supermercados, farmacias).

### T4 — Agentic checkout reduce fricción y aumenta conversión 20-30%
Los agentes que completan la compra directamente (sin redirigir a web) eliminan el abandono de carrito.
ACP en ChatGPT: el usuario describe lo que quiere y el agente hace el checkout completo con PayPal/Worldpay.
**Patrón**: ACP checkout → reduce pasos de 5-7 clicks a 1 confirmación de lenguaje natural.

### T5 — Shelf AI reemplaza supervisores de tienda
Computer Vision + LLM edge (Cerebras 2,600 tok/s) permite auditoría de góndolas en tiempo real.
Cámaras IP estándar ($50-200) + modelo edge → alertas de OSA (Out-of-Stock Alerts) en <10 segundos.
**Proyección**: Las cadenas de supermercados medianas adoptarán esto en 2026-2027 para reducir el ~8%
de ventas perdidas por faltantes de productos.

### T6 — Hyper-personalización 1:1 via LLMs (fin de la segmentación masiva)
Los LLMs permiten personalizar para cada usuario individual en lugar de segmentos.
Pinterest (Feb 2026) y Netflix (Mar 2025) presentaron modelos de producción con two-tower + LLMs.
**Para Globant**: LLMSearchRecommender como base de investigación; pgvector + embeddings como stack.

### T7 — Autonomous replenishment — el inventario se gestiona solo
Agentes que monitorean stock en tiempo real, predicen demanda (LSTM/ARIMA) y envían órdenes de compra
automáticamente sin intervención humana. stockpyl es la base matemática; LangGraph para el flujo.
**Caso de éxito benchmark**: Retailers que adoptan reabastecimiento autónomo reportan 20-30% reducción
de stockouts y 15-20% reducción de exceso de inventario en primeros 3 meses.

### T8 — WhatsApp Commerce es el canal omnicanal de LATAM
Brasil: 120M+ usuarios WhatsApp. México: 88M. Colombia: 35M.
Meta lanzando WhatsApp Payments en LATAM — checkout nativo en chat sin salir de la app.
**Patrón dominante**: Agente en WhatsApp → catálogo nativo → Pix/OXXO/PSE → confirmación en chat.
Conversión 3-4x vs web para PYME.

### T9 — Multi-modal product search (imagen + texto + voz)
Los usuarios buscan productos con foto de lo que ya tienen, descripción vaga o comando de voz.
Google Lens + AI Mode permite "busca esto en tiendas cercanas" con imagen como input.
**Para Globant**: Integrar Google Lens API + retailer catalog para habilitar "compra lo que ves".

### T10 — Dynamic pricing agentico reemplaza pricing estático
Los agentes ajustan precios en tiempo real basándose en: competencia, demanda, inventario, segmento de usuario.
retail-pricing-agent-ai (Apache-2.0) es la base open-source.
**Impacto**: +3-8% de margen bruto documentado en pilotos con pricing dinámico activo.

### T11 — AI-native fulfillment y última milla
Agentes que optimizan rutas de entrega, asignan pedidos a almacenes más cercanos y predicen ventanas
de entrega con ±15 minutos de precisión. Stock distribuido + AI routing = promesa de 1h delivery.

### T12 — Trust gap: <40% confían en compras autónomas completas
La barrera principal de adopción masiva: los usuarios aceptan recomendaciones AI pero dudan en
dejar que el agente haga el checkout sin revisión. HITL (Human-in-the-Loop) es el puente.
**Patrón**: Agente propone → usuario confirma con 1 click → agente ejecuta. No skip HITL todavía.

### T13 — EU AI Act (2 agosto 2026) — compliance para sistemas de recomendación
Los sistemas de recomendación personalizada dirigidos a consumidores EU entran en categoría "alto riesgo"
si usan perfiles comportamentales. Obligación de explicabilidad y opt-out.
**Para Globant en clientes europeos**: Implementar explainability layer + consent management.

### T14 — First-party data como activo central
Con fin de cookies de terceros, los retailers compiten por datos propios: loyalty programs, apps, 
WhatsApp opted-in. Los agentes que usan first-party data tienen tasas de personalización 5-7x mejores.
**Para Globant**: Diseñar arquitecturas data-first desde el día 1 — no añadir como afterthought.

### T15 — Agentic commerce para B2B supera a B2C en ROI
El caso de uso más rentable no es consumidor final — es la compra B2B (retail ↔ distribuidor).
Órdenes más grandes, ciclos más predecibles, usuarios más tolerantes a UI funcional (vs bonita).
Magento B2B + LangGraph agent para reposición automática entre retailer y proveedor: ROI en <6 meses.

---

## Velocímetro de adopción (escala 1-5 en LATAM)

| Tecnología | Madurez Global | Adopción LATAM | Gap oportunidad |
|------------|---------------|----------------|------------------|
| WhatsApp Commerce | 5 | 4 | Medio |
| AI Chatbot de ventas | 4 | 2 | Alto |
| Dynamic pricing agentico | 3 | 1 | Muy alto |
| Shelf audit Computer Vision | 3 | 1 | Muy alto |
| Voice Commerce | 3 | 1 | Alto |
| ACP / UCP protocols | 2 | 0.5 | Muy alto (early mover) |
| Autonomous replenishment | 3 | 1 | Alto |
| Multi-modal product search | 3 | 1 | Alto |

---
*Fuentes: commercetools.com, eMarketer, Mordor Intelligence, Shopify Engineering, Google Developers Blog, MetaRouter.*
