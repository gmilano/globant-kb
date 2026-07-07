# 🏭 Verticales de partida — Retail & Consumer

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-07

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stars | Stack | Caso de uso principal |
|------------|----------|-----|-------|-------|----------------------|
| **Medusa.js** | MIT | [medusajs/medusa](https://github.com/medusajs/medusa) | 31k | Node.js / TypeScript | Commerce platform "for agents & developers"; API-first, módulos desacoplados, MCP server disponible; mejor opción para proyectos AI-native |
| **Saleor** | BSD-3-Clause | [saleor/saleor](https://github.com/saleor/saleor) | 23k | Python / Django / GraphQL | Multi-channel, MACH architecture; GraphQL-first ideal para integraciones AI; fuerte en enterprise LATAM |
| **Vendure** | MIT | [vendure-ecommerce/vendure](https://github.com/vendure-ecommerce/vendure) | 6.9k | TypeScript / NestJS | Plugin architecture robusta; TypeScript end-to-end; ideal para equipos que vienen de NestJS |
| **WooCommerce** | GPL-2.0 | [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | 10.1k | PHP / WordPress | 28% del ecommerce mundial; enorme ecosistema; ideal para retailers PYME existentes que quieren añadir AI |
| **PrestaShop** | OSL-3.0 | [PrestaShop/PrestaShop](https://github.com/PrestaShop/PrestaShop) | 8.7k | PHP | Dominante en Europa + LATAM (Brasil, Argentina, Colombia); v9 lanzada 2025 con mejoras de performance |
| **OpenCart** | MIT | [opencart/opencart](https://github.com/opencart/opencart) | 7.9k | PHP | Ligero, fácil install; licencia MIT máxima flexibilidad; bueno para retailers PYME; multistore out-of-the-box |
| **Odoo** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | 40k | Python | ERP completo: ecommerce + POS + CRM + inventario + contabilidad; Community Edition libre; mayor ERP open source |
| **Bagisto** | MIT | [bagisto/bagisto](https://github.com/bagisto/bagisto) | 15k | Laravel / PHP | Ecommerce multi-vendor; Laravel ecosystem; bueno para marketplaces; soporte nativo multi-canal |
| **Apache OFBiz** | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | 700 | Java | ERP enterprise completo: inventario, CRM, contabilidad, ecommerce, POS; ideal para retailers grandes con equipos Java |

---

## Análisis de decisión: ¿cuál plataforma elegir?

### Por tipo de cliente

```
Retailer PYME (~$1M-$10M GMV):
  ├─ Nuevo proyecto: Medusa.js (MIT, headless, AI-native)
  ├─ Ya en WordPress: WooCommerce + WP AI plugins
  └─ LATAM / Europa: PrestaShop (comunidad local fuerte)

Retailer Mid-market (~$10M-$100M GMV):
  ├─ Multi-channel / omnichannel: Saleor (GraphQL MACH)
  ├─ Team TypeScript: Vendure
  └─ Necesita ERP integrado: Odoo Community

Enterprise (~$100M+ GMV):
  ├─ Best-of-breed / composable: Saleor + Gorse + LangGraph
  └─ Suite completa: Odoo Enterprise o Apache OFBiz + AI layer
```

### Por objetivo AI

```
AI Shopping Assistant:
  └─ Medusa.js + NVIDIA Retail Shopping Assistant blueprint

AI Recommendations:
  └─ Cualquier plataforma + Gorse (REST API) o Microsoft Recommenders

AI Customer Support:
  └─ Cualquier plataforma + retailGPT + multi-agent-rag

Dynamic Pricing AI:
  └─ Cualquier plataforma + tensor-house DQN pricing notebooks

Visual Search:
  └─ Medusa.js o Saleor + modelo CLIP/ViT + endpoint REST
```

---

## Cómo customizar con AI

### Paso a paso genérico

1. **Elige la plataforma base** según el análisis de arriba
2. **Expón APIs necesarias**: catálogo, búsqueda, inventario, órdenes
3. **Conecta un sistema de recomendación**: Gorse para producción, RecBole para research
4. **Añade AI conversacional**: retailGPT o LangGraph-based multi-agent
5. **Implementa UCP** (Universal Commerce Protocol de Google) para compatibilidad con agentes AI externos (ChatGPT, Perplexity, etc.)
6. **Monitorea con ML**: tensor-house para pricing, forecasting, LTV

### Medusa.js + AI: quick start

```bash
# 1. Instalar Medusa
npx create-medusa-app@latest my-retail-store

# 2. Añadir MCP server (para integración con Claude/AI agents)
cd my-retail-store/backend
npm install medusa-mcp  # github.com/SGFGOV/medusa-mcp

# 3. Iniciar Gorse (recomendaciones)
docker run -p 8087:8087 zhenghaoz/gorse-in-one

# 4. Conectar NVIDIA Shopping Assistant blueprint
git clone https://github.com/NVIDIA-AI-Blueprints/retail-shopping-assistant
# Configurar CATALOG_API_URL → Medusa API
```
