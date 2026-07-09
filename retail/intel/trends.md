# 📡 Tendencias — Retail & E-Commerce AI

> Última actualización: 2026-07-09 (v8 — AEO, Social Commerce AI, Dify, consumer stats)

## 10 tendencias clave (2026)

### 1. Agentic Commerce — el nuevo paradigma del retail
- Los agentes AI actúan como proxies de compradores: ejecutan el ciclo completo de compra (discovery → autorización → pago → fulfillment) desde un objetivo en lenguaje natural.
- Protocolos en producción: **UCP** (Google + Shopify + Target + Walmart, ene-2026), **ACP** (OpenAI + Stripe), **A2A** (Google → Linux Foundation).
- Dato: retailers con AI agent integration mostraron **~7x mejor crecimiento de ventas** en Cyber Week 2025 vs los sin AI (Salesforce).
- Acción Globant: proponer "Agentic Commerce Accelerator" basado en NVIDIA-AI-Blueprints/Retail-Agentic-Commerce.

### 2. Zero-Click Commerce — compras sin abrir el sitio web
- Los consumidores (y agentes AI en su nombre) compran sin visitar el sitio del retailer.
- Los merchants deben optimizar para AEO (Answer Engine Optimization), feeds estructurados y MCP servers.
- ~33% de consumidores ya están dispuestos a dejar que un AI compre por ellos (Morgan Stanley).
- Impacto: SEO tradicional muere, los feeds de datos + esquemas de producto = nuevo SEO.

### 3. MCP como infraestructura de e-commerce (2026)
- WooCommerce (10.3, oct-2025): primer MCP nativo — cualquier agente Claude/Cursor puede leer/escribir datos.
- Shopify: 4 MCP servers oficiales. Stripe: mcp.stripe.com. PayPal: 2025. Medusa: comunidad.
- Pattern emergente: **"store-as-context"** — todo el catálogo, pedidos e inventario disponible para LLMs.

### 4. Personalización predictiva — del reactivo al proactivo
- Transición de personalización reactiva a motores predictivos que analizan datos en tiempo real (clima, eventos locales, inventario) para anticipar intención del cliente.
- Incremento en AOV (Average Order Value): **+10% a +15%** con AI recommendations (NVIDIA State of AI Retail 2026).
- LightFM + Gorse + RecBole como stack open source para cold-start + producción.

### 5. LLM Rankers en sistemas de recomendación
- Gorse v0.5+ integra LLM rankers + multimodal embeddings (texto+imagen+video).
- Microsoft Recommenders: best practices actualizadas para LLM-enhanced rec systems.
- Abandono del filtering clásico hacia retrieval+reranking con embeddings semánticos.

### 6. AI para enriquecimiento de catálogo
- Retailers con catálogos "sparse" (imágenes incompletas, descripciones inconsistentes) usan GenAI para completarlos automáticamente.
- NVIDIA Retail Catalog Enrichment (Apache-2.0): pipeline de referencia con imágenes → contenido rico, estructurado, localizado.
- Acelerador directo para clientes con catálogos de miles de SKUs (moda, electrónica, hogar).

### 7. LATAM — window de 12-18 meses en agentic commerce
- Mercado LATAM ecommerce: **>$215B en 2026**, liderado por MercadoLibre. CAGR AI en LATAM: 37.07%.
- Adopción de protocolos agentic (UCP/ACP) casi nula en LATAM — ventana de first-mover.
- WhatsApp como canal principal: Brasil y México son mobile-first, WhatsApp >95% de penetración.
- MercadoLibre, Rappi, Falabella, Liverpool: primeras en mover ficha en AI retail LATAM.

### 8. AI en supply chain y warehouse — el ROI más rápido
- NVIDIA Multi-Agent Intelligent Warehouse: blueprint open source para WMS/ERP/Robotics.
- Casos de uso: forecasting de demanda, optimización de rutas, compliance de seguridad, procesamiento de documentos.
- ROI típico: 15-25% reducción de costos operativos en warehouse en 6-9 meses.

### 9. Visual Search + AI Shopping — convergencia
- NVIDIA Retail Shopping Assistant: búsqueda visual + conversacional integrada (LangGraph multi-agente).
- Alibaba/Pinterest/Google Lens como referencia; open source: CLIP + pgvector + Gorse.
- El 57% de los consumidores (Gen Z) prefiere buscar productos por imagen antes que por texto (Insider One 2026).

### 11. Guerra de Plataformas AI Shopping — y por qué gana el on-site agent 🔴 NUEVO
- ChatGPT Instant Checkout: solo 30 merchants en 6 meses → **retirado** (mar-2026). OpenAI pivotó a visual search + comparison.
- Perplexity Shopping: AOV **57% más alto** que otras plataformas (dato Shopify). PayPal one-click.
- Amazon "Buy for Me" + Rufus: dominante en productos físicos, fuerte en recompra.
- **Bain 2026**: Consumidores confían **3x más** en agentes de la propia tienda vs ChatGPT/Perplexity.
- **Conclusión estratégica para Globant**: No integrar ChatGPT checkout como primero paso. Construir el agente embedded en el propio brand del retailer. El valor diferencial está en la confianza de marca + datos propios.
- **Tráfico AI +393% YoY** (Q1 2026) — el canal AI supera a social en volumen de referencia.

### 12. WooCommerce 10.9 → Tiendas como MCP Endpoints Nativos 🔴 NUEVO
- **Jun-23-2026**: WooCommerce 10.9 lanza 7 canonical abilities en core (products CRUD + orders management).
- **Transport-neutral**: misma ability funciona vía MCP, REST API, WP-CLI, admin tooling.
- **Arquitectura emergente**: "store-as-context" — todo el catálogo, pedidos e inventario disponible para LLMs sin code adicional.
- **Roadmap Q3 2026**: Checkout ability en preview → primera tienda WooCommerce con checkout AI-nativo completo.
- **Superficie LATAM**: ~40% de tiendas LATAM usan WooCommerce → enorme base para propuestas de AI retail sin migración de plataforma.
- **Acción Globant**: Paquete "WooCommerce AI Upgrade" — instalar 10.9 + configurar Claude Code + Gorse + Superset en 2-3 semanas ($30-80k).

### 13. AEO (Answer Engine Optimization) — El Nuevo SEO del E-Commerce 🔴 NUEVO
- La infraestructura del merchant fue construida para humanos, no para agentes. **Resultado**: 39% de adopción AI shopping pero conversión **86% peor que afiliados** porque los agentes no pueden leer datos inconsistentes.
- AEO = optimizar tiendas para que agentes AI encuentren, entiendan y recomienden productos: structured data JSON-LD, schema.org flawless, catálogos "agent-ready", feeds en tiempo real.
- **31.3%** de americanos usan generative AI para búsqueda en 2026. ChatGPT e-commerce traffic convierte **31% más alto** que búsqueda orgánica tradicional (ChatForest / Magebit 2026).
- **Agentforce 2030**: proyecciones indican que agentic shoppers generarán **$385B en ecommerce US** — los merchants que no estén AEO-listos quedarán invisibles para esos agentes.
- **Stack open source para AEO**: Medusa (MIT, JSON-LD nativo), [spatie/schema-org](https://github.com/spatie/schema-org) (MIT), Claude Vision para generar y validar structured data, Qdrant para embeddings semánticos.
- **Servicio Globant**: "AEO Audit + Remediation" — auditar catálogos, corregir structured data, implementar agent-ready feeds. Deal size: $40k-$120k. Alta demanda H2 2026-2027.

### 14. Social Commerce AI — TikTok Shop como canal principal 🔴 NUEVO
- **TikTok Ads MCP** (mayo 2026): TikTok es la primera gran plataforma social en adoptar MCP. Agentes AI pueden planificar, lanzar y optimizar campañas de TikTok Ads de forma autónoma.
- **TikTok Shop AI Tools**: Seller Assistant chatbot 24/7 (performance analytics, personalized recs), live stream 24/7 automation con AI hosts que muestran productos y responden comentarios en tiempo real.
- **LATAM**: TikTok Shop activo en Brasil y México — Gen Z (mobile-first) + impulse buying = canal de alta conversión para moda, electrónica, cosméticos.
- **nexscope-ai/eCommerce-Skills**: 157 SKILL.md skills incluyen expertise específico para TikTok Shop (listing optimization, PPC, creator matching, viral content).
- **Patrón emergente**: "Omnichannel AI Agent" — un único agente orquestador (LangGraph + Claude) gestiona simultáneamente WooCommerce MCP + TikTok Ads MCP + MercadoLibre API + WhatsApp Business.
- **Relevancia Globant**: Proponer "Social Commerce AI Bundle" — TikTok Shop + Shopify + WhatsApp + Claude orquestador. Deal size: $80k-$200k. Diferencial vs agencias digitales tradicionales.

### 10. Confianza y privacidad — el freno principal
- Solo el 40% de usuarios confían plenamente en AI para transacciones autónomas (Retailer Customer Experience 2026).
- LATAM: LGPD (Brasil) + leyes similares en AR, MX, CO — datos locales son requisito.
- Stack defensivo: Ollama local + Medusa self-hosted + LightFM on-premise para clientes con datos sensibles.

## Tabla de monitoreo de señales

| Señal | Fuente | Impacto | Urgencia |
|-------|--------|---------|----------|
| UCP + ACP en producción (20+ retailers) | NRF 2026 / NVIDIA | Muy alto | Inmediata |
| WooCommerce 10.9 — 7 MCP abilities nativas (jun-2026) | WooCommerce Dev Blog | Muy alto | **Inmediata** |
| Cyber Week AI 7x ROI | Salesforce 2025 | Alto | Caso de venta |
| AI tráfico retail +393% YoY Q1 2026, convierte 42% mejor | Adobe / Salesforce | Muy alto | Caso de venta |
| ChatGPT Checkout retirado — on-site agent 3x más confiado | Bain 2026 | Alto | Estrategia |
| Perplexity shoppers: AOV 57% mayor | Shopify Analytics | Alto | Caso de venta |
| McKinsey: $1T US agentic revenue 2030, $3-5T global | McKinsey 2026 | Muy alto | Visión CEO |
| LATAM ecommerce >$215B | MercadoLibre / Mordor | Muy alto | Pipeline |
| LATAM conversational commerce $18.2B (2025) CAGR 35% | Scala Technologies | Alto | Pipeline |
| **AEO**: 31.3% US usa AI search, ChatGPT convierte 31% más | Magebit / ChatForest 2026 | Muy alto | **Nuevo servicio** |
| **51%** de shoppers dejaría AI completar compra entera | Adyen 2026 | Muy alto | Agentic checkout urgente |
| TikTok Ads MCP (may-2026) — agentes autónomos en social | TikTok / PYMNTS 2026 | Alto | Social Commerce AI |
| Dify 131k★ Apache-2.0 — orquestación agentic sin ML | langgenius/dify | Alto | Accelerator base |
| 97% retailers aumentarán gasto AI next FY | ringly.io 2026 | Alto | Pipeline expansión |

---
*Pipeline automático — se actualiza cada hora.*
