# 🏭 Verticales de partida — Retail & E-Commerce

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-08 (v7)

## Plataformas E-Commerce headless (punto de partida preferido)

| Plataforma | Repo | Licencia | Stars | Stack | Por qué usarla |
|------------|------|----------|-------|-------|----------------|
| **Medusa.js** | [medusajs/medusa](https://github.com/medusajs/medusa) | MIT | 31k★ | Node.js/TypeScript | Headless modular, MCP server, ideal para D2C y marketplaces. Base para aceleradores Globant. |
| **Saleor** | [saleor/saleor](https://github.com/saleor/saleor) | Apache-2.0 | 23k★ | Python/Django + GraphQL | GraphQL-first, multi-canal, multi-warehouse. Ecosystem de apps activo. |
| **Vendure** | [vendure-ecommerce/vendure](https://github.com/vendure-ecommerce/vendure) | MIT | 6k★ | TypeScript/NestJS | TypeScript-native, plugin architecture. Para equipos TS puros. |
| **WooCommerce** | [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | GPL-2.0 | 10.5k★ | PHP/WordPress | 28% del ecommerce mundial. **v10.9 (jun-2026): 7 MCP abilities nativas** (products CRUD + orders). Checkout en preview Q3 2026. Mercado LATAM enorme. |
| **Bagisto** | [bagisto/bagisto](https://github.com/bagisto/bagisto) | OSL-3.0 | 15k★ | PHP/Laravel | Multi-inventory, multi-currency, multi-canal. Para equipos PHP Laravel. |

## ERP con módulo E-Commerce

| Plataforma | Repo | Licencia | Stars | Descripción | Cuándo usarlo |
|------------|------|----------|-------|-------------|---------------|
| **Odoo** | [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | 40k★ | ERP+CRM+ecommerce todo-en-uno. AI integrado. | Cliente quiere todo integrado: ventas, inventario, contabilidad + tienda online |
| **Apache OFBiz** | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | 1.2k★ | ERP enterprise Java completo: accounting, manufacturing, HR, inventory, CRM, catalog, ecommerce | Enterprise grande con procesos complejos |
| **ERPNext** | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 22k★ | ERP open source completo basado en Python/Frappe. Popular en PyMEs de retail LATAM | PyME retail con presupuesto limitado |
| **Dolibarr** | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | GPL-3.0 | 5.3k★ | ERP+CRM simple para pequeños negocios: facturas, inventario, proyectos, clientes | Pequeño retailer que necesita ERP + CRM básico |

## Motores de búsqueda y catálogo

| Plataforma | Repo | Licencia | Stars | Descripción |
|------------|------|----------|-------|-------------|
| **Meilisearch** | [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | MIT | 50k★ | Motor de búsqueda Rust ultra-rápido. Typo-tolerance, facets, filtros. Reemplazo de Elasticsearch para retail. |
| **Typesense** | [typesense/typesense](https://github.com/typesense/typesense) | GPL-3.0 | 21k★ | Motor de búsqueda open source. AI search + reranking. Self-hosted alternativa a Algolia. |
| **Weaviate** | [weaviate/weaviate](https://github.com/weaviate/weaviate) | BSD-3 | 12k★ | Vector DB + semantic search. Para búsqueda visual/semántica de productos. |
| **Qdrant** | [qdrant/qdrant](https://github.com/qdrant/qdrant) | Apache-2.0 | 22k★ | Vector search engine. Para recomendaciones basadas en embeddings de imágenes y texto. |

## Analytics y BI

| Plataforma | Repo | Licencia | Stars | Descripción |
|------------|------|----------|-------|-------------|
| **Apache Superset** | [apache/superset](https://github.com/apache/superset) | Apache-2.0 | 63k★ | BI moderno. Dashboards de ventas, inventario, comportamiento de usuario para retail. |
| **Metabase** | [metabase/metabase](https://github.com/metabase/metabase) | AGPL-3.0 | 39k★ | Analytics self-hosted con AI query. Fácil para equipos no-técnicos de retail. |

## Cómo añadir capa AI a cada plataforma

### Medusa.js + AI (recomendado para nuevos proyectos)

```bash
# 1. Setup Medusa base
npx create-medusa-app@latest my-store

# 2. Instalar MCP server
npm install @sgfgov/medusa-mcp

# 3. Añadir Gorse para recomendaciones
docker run -d -p 8088:8088 zhenghaoz/gorse-in-one

# 4. Conectar Claude como agente de soporte
# Ver compose/patterns.md Patrón 1
```

### WooCommerce + AI (para clientes WordPress existentes)

```bash
# 1. Actualizar a WooCommerce 10.9+ (jun-2026)
wp plugin update woocommerce

# 2. 7 MCP abilities disponibles nativamente:
#    products-query, product-create, product-update, product-delete
#    orders-query, order-update-status, order-add-note

# 3. Configurar Claude Desktop o cualquier cliente MCP
# 4. Conectar al endpoint MCP del store (vía WordPress MCP Adapter)
# 5. Q3 2026: Checkout ability en preview → agentic checkout completo

# Requisitos: WooCommerce 10.7+, WordPress 6.9+, Node.js 22+
```

### Odoo + AI (para clientes enterprise)

```python
# Odoo expone un RPC API completo
import xmlrpc.client
url = 'https://myodoo.com'
db = 'mydb'

# Wrappear con agente LangGraph
# Ver compose/patterns.md Patrón 6
```

---
*Ver también: `repos/foundations.md` para repos de infraestructura AI.*
