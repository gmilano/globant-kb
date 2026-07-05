# 🏭 Verticales de partida — Enterprise

> Plataformas enterprise open source customizables con AI.
> Modelo: partir de algo funcional + añadir capa agéntica encima.
> Última actualización: 2026-07-05

## ERP — Enterprise Resource Planning

| Plataforma | Licencia | Repo | Stars | Stack | Mejor para |
|------------|----------|------|-------|-------|------------|
| **Odoo** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | 52.8k | Python, PostgreSQL | El ERP más completo. 30+ módulos: ventas, inventario, contabilidad, manufactura, e-commerce, RRHH. Módulo Odoo AI (copilot) ya incluido en v17+. |
| **ERPNext** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | 36.4k | Python (Frappe), MariaDB | ERP completo sobre Frappe. API REST auto-generada para toda entidad. Ideal para manufactura, distribución y servicios. |
| **Apache OFBiz** | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | 1.1k | Java, PostgreSQL | ERP enterprise Apache con SCM+CRM integrado. Para stacks Java legacy. Muy customizable. |
| **Dolibarr** | GPL-3.0 | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | 5.9k | PHP, MySQL | ERP/CRM ligero para PyMEs. 20 años de estabilidad. Fácil de instalar. |

## CRM — Customer Relationship Management

| Plataforma | Licencia | Repo | Stars | Stack | Mejor para |
|------------|----------|------|-------|-------|------------|
| **SuiteCRM** | AGPL-3.0 | [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | 4.5k | PHP | CRM con 5M+ usuarios. Feature parity con Salesforce. API REST completa lista para AI. Alternativa open source #1. |
| **EspoCRM** | GPL-3.0 | [espocrm/espocrm](https://github.com/espocrm/espocrm) | 2.1k | PHP, JS | CRM moderno con interfaz responsive. Muy extensible via metadata. Popular en LATAM. |
| **Twenty** | AGPL-3.0 | [twentyhq/twenty](https://github.com/twentyhq/twenty) | 28k | TypeScript, React, PostgreSQL | CRM moderno estilo Notion. Crecimiento explosivo. Alternativa a HubSpot con UX moderna. |
| **Krayin CRM** | MIT | [krayin/laravel-crm](https://github.com/krayin/laravel-crm) | 1.1k | Laravel, PHP | CRM Laravel open source. Licencia MIT — ideal para customización sin restricciones. |

## Low-code / No-code Interno

| Plataforma | Licencia | Repo | Stars | Stack | Mejor para |
|------------|----------|------|-------|-------|------------|
| **Appsmith** | Apache 2.0 | [appsmithorg/appsmith](https://github.com/appsmithorg/appsmith) | 35k | Java, TypeScript | Builder de apps internas con drag-drop. Conecta a cualquier API/DB. Ideal para dashboards AI. |
| **Tooljet** | AGPL-3.0 | [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet) | 33k | Ruby, JavaScript | Plataforma low-code con 50+ conectores. Apps internas con widgets de AI. |
| **Budibase** | GPL-3.0 | [Budibase/budibase](https://github.com/Budibase/budibase) | 23k | Svelte, Node.js | Self-hosted app builder. APIs auto-generadas, SSO, RBAC. |
| **NocoDB** | AGPL-3.0 | [nocodb/nocodb](https://github.com/nocodb/nocodb) | 52k | Node.js | Airtable open source. Convierte cualquier BD en spreadsheet API. Base perfecta para agentes. |

## Gobernanza de datos (enterprise AI-ready)

| Plataforma | Licencia | Repo | Stars | Stack | Mejor para |
|------------|----------|------|-------|-------|------------|
| **DataHub** | Apache 2.0 | [datahub-project/datahub](https://github.com/datahub-project/datahub) | 11k | Java, Python, React | Catálogo de datos event-driven (Kafka). Linaje, gobernanza, data mesh. Desarrollado por LinkedIn. |
| **OpenMetadata** | Apache 2.0 | [open-metadata/OpenMetadata](https://github.com/open-metadata/OpenMetadata) | 8k | Java, Python | Plataforma unificada: discovery, quality, linaje, profiling. 3000+ deployments. Más simple que DataHub. |
| **Apache Atlas** | Apache 2.0 | [apache/atlas](https://github.com/apache/atlas) | 1.9k | Java | Gobernanza para ecosistemas Hadoop/Hive. Maduro, estable para stacks legacy. |

## Automatización de flujos enterprise

| Plataforma | Licencia | Repo | Stars | Stack | Mejor para |
|------------|----------|------|-------|-------|------------|
| **n8n** | Sustainable Use | [n8n-io/n8n](https://github.com/n8n-io/n8n) | 50k | TypeScript, Node.js | 400+ conectores + AI nativo. El iPaaS open source. Alternativa a Zapier/Make con self-hosting. |
| **Prefect** | Apache 2.0 | [PrefectHQ/prefect](https://github.com/PrefectHQ/prefect) | 18k | Python | Orquestación de data pipelines con AI. Ideal para ETL+ML pipelines enterprise. |
| **Airflow** | Apache 2.0 | [apache/airflow](https://github.com/apache/airflow) | 38k | Python | Orquestador de workflows más maduro. Estándar en data engineering enterprise. |

## Cómo añadir AI sobre estas plataformas

```
Paso 1: Levantar la plataforma base (Docker Compose / Helm chart)
         ↓
Paso 2: Exponer APIs REST/GraphQL (la mayoría ya las tienen)
         ↓
Paso 3: Conectar via MCP Server o LangChain Tools
         ↓
Paso 4: Añadir capa de agentes (LangGraph / CrewAI / Dify)
         ↓
Paso 5: UI conversacional (chatbot en la plataforma o separado)
```

### Patrón específico para Odoo + AI
```python
# Conectar LangChain a Odoo via XML-RPC o REST
from langchain_community.tools import StructuredTool
import xmlrpc.client

odoo = xmlrpc.client.ServerProxy('{ODOO_URL}/xmlrpc/2/object')

def get_sales_orders(partner_id: int) -> list:
    """Buscar órdenes de venta de un cliente en Odoo"""
    return odoo.execute_kw('sale.order', 'search_read',
        [[['partner_id', '=', partner_id]]], {'fields': ['name', 'amount_total']})

sales_tool = StructuredTool.from_function(get_sales_orders)
# Wrapear en LangGraph agent para consultas naturales
```

### Patrón específico para ERPNext + MCP
```bash
# Usar erpnext-mcp-server para conectar Claude/cualquier LLM
git clone https://github.com/rakeshgangwar/erpnext-mcp-server
# Configurar en claude_desktop_config.json o API MCP
# El agente puede consultar y crear documentos en ERPNext directamente
```
