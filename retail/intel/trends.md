# 📡 Tendencias — Retail & E-Commerce AI

> Última actualización: 2026-07-08 (v6)

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

### 10. Confianza y privacidad — el freno principal
- Solo el 40% de usuarios confían plenamente en AI para transacciones autónomas (Retailer Customer Experience 2026).
- LATAM: LGPD (Brasil) + leyes similares en AR, MX, CO — datos locales son requisito.
- Stack defensivo: Ollama local + Medusa self-hosted + LightFM on-premise para clientes con datos sensibles.

## Tabla de monitoreo de señales

| Señal | Fuente | Impacto | Urgencia |
|-------|--------|---------|----------|
| UCP + ACP en producción (20+ retailers) | NRF 2026 / NVIDIA | Muy alto | Inmediata |
| WooCommerce MCP nativo (28% de tiendas) | WooCommerce Blog | Alto | Q3 2026 |
| Cyber Week AI 7x ROI | Salesforce 2025 | Alto | Caso de venta |
| LATAM ecommerce >$215B | MercadoLibre / Mordor | Muy alto | Pipeline |
| 33% consumidores → AI compras autónomas | Morgan Stanley 2026 | Muy alto | Propuesta estratégica |

---
*Pipeline automático — se actualiza cada hora.*
