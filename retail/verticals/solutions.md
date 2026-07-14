# 🏭 Verticales de partida — Retail & Consumer

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica encima.
> Última actualización: 2026-07-14 (v10)

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso principal | Stars |
|------------|----------|------------|-------|-----------------------|-------|
| [Medusa](https://github.com/medusajs/medusa) | MIT | github.com/medusajs/medusa | Node.js, TypeScript, React | Tienda headless AI-first, marketplace, B2B — diseñada para agentes desde el día 1 | 32k |
| [WooCommerce](https://github.com/woocommerce/woocommerce) | GPL-2.0 | github.com/woocommerce/woocommerce | PHP, WordPress, React | PYME retail LATAM — 6M+ tiendas activas, mayor base instalada | 10.4k |
| [Bagisto](https://github.com/bagisto/bagisto) | MIT | github.com/bagisto/bagisto | Laravel, Vue.js | Greenfield retail con PHP stack, multi-currency, multi-language, AI plugins nativos | 15k |
| [PrestaShop](https://github.com/PrestaShop/PrestaShop) | OSL-3.0 | github.com/PrestaShop/PrestaShop | PHP, Symfony | Retail Europa + Brasil + México — módulos AI en marketplace oficial | 8.7k |
| [Shopware](https://github.com/shopware/shopware) | MIT | github.com/shopware/shopware | PHP, Symfony, Vue.js | Retail con roadmap AI-first: Shopware Copilot (Apr 2026) + Agentic Commerce channel | 3.2k |
| [Odoo](https://github.com/odoo/odoo) | LGPL-3.0 | github.com/odoo/odoo | Python, JavaScript | ERP completo con módulo retail/POS/e-commerce — AI features en Enterprise tier | 38k |
| [ERPNext](https://github.com/frappe/erpnext) | GPL-3.0 | github.com/frappe/erpnext | Python, Frappe Framework | ERP open-source con POS y retail — muy usado en LATAM y Asia, marketplace de AI apps | 22k |
| [Mall4j](https://github.com/gz-yami/mall4j) | AGPL-3.0 | github.com/gz-yami/mall4j | Java, Spring Boot | Marketplace multi-canal (PC, H5, app, WeChat/Alipay miniprogram) — referencia multi-canal | 5.1k |

---

## Cómo customizar con AI — Guía práctica

### Modelo A: Medusa + LangGraph + MCP (greenfield)

```
Medusa (backend commerce) → medusa-mcp → LLM (Claude/GPT)
         ↓                                      ↓
   PostgreSQL + pgvector              LangGraph workflows
         ↓                                      ↓
   Next.js storefront ←——— Agentes A2A (MAF pattern) ←———
```

**Pasos**:
1. Deploy Medusa 2.0 (Docker Compose, 15 min)
2. Instalar medusa-mcp para exponer operaciones como herramientas MCP
3. Construir agentes LangGraph que usen las herramientas MCP
4. Opcional: implementar UCP endpoint para aparecer en Google AI Mode

**Tiempo estimado**: 4-6 sprints para MVP completo con 3 agentes

---

### Modelo B: WooCommerce + Plugin AI (clientes existentes LATAM)

```
WooCommerce existente (cliente ya lo tiene)
         ↓
REST API WooCommerce (nativa)
         ↓
Capa Python/FastAPI (middleware Globant)
         ↓
LangChain Agent ← Catálogo de productos (RAG sobre WooCommerce DB)
         ↓
Interfaces: WhatsApp Business API / Chat web / MCP server
```

**Pasos**:
1. Habilitar WooCommerce REST API (5 min)
2. Construir RAG sobre catálogo: pgvector + embeddings
3. LangChain agent con tools: buscar_producto, ver_orden, generar_recomendacion
4. Exponer via WhatsApp Business API (patrón clave LATAM)

**Tiempo estimado**: 2-3 sprints para chatbot de ventas funcional

---

### Modelo C: Bagisto + LLM directo (greenfield PHP)

```
Bagisto (Laravel) → AI Plugin integrado
         ↓
Soporte nativo: GPT-5, Gemini 3, Mistral, LLaMA 4, Qwen, Deepseek
         ↓
Casos de uso: chatbot, descripciones producto, soporte, búsqueda, recomendaciones
```

**Ventaja**: No requiere capa intermedia — los plugins AI son ciudadanos de primera clase.
**Restricción**: AGPL en plugins comunitarios — revisar licencia antes de incluir en producto cliente.

---

## Decisión rápida: ¿qué plataforma para qué cliente?

| Situación | Recomendación |
|-----------|---------------|
| Cliente nuevo, sin stack previo | Medusa (MIT, AI-native, headless) |
| Cliente ya tiene WooCommerce/WordPress | No migrar — añadir capa AI encima via REST API |
| Cliente con PHP/Laravel | Bagisto (MIT puro, AI plugins nativos) |
| Cliente LATAM PYME, presupuesto limitado | WooCommerce + LangChain REST middleware |
| Cliente con ERP existente (Odoo/ERPNext) | Añadir POS AI o agente de inventario — no reemplazar ERP |
| Marketplace multi-vendedor | Medusa (marketplaces built-in) o Mall4j (multi-canal asiático) |
| Retailer con presencia en Europa | Shopware (AI-first roadmap, GDPR nativo) o PrestaShop |

---
*Ver también: `repos/foundations.md` para frameworks AI base.*
