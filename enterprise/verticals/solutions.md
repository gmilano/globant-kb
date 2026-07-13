# 🏭 Verticales de partida — Enterprise

> Plataformas enterprise existentes, customizables con AI encima.
> Modelo: partir de algo funcional → añadir capa agéntica → entregar al cliente.
> Última actualización: 2026-07-13 (v6)

## Plataformas recomendadas

| Plataforma | Licencia | Repo | Stack | Caso de uso enterprise |
|------------|----------|------|-------|----------------------|
| **Odoo** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) (~52k★) | Python, PostgreSQL | ERP completo: ventas, compras, manufactura, RRHH, contabilidad, POS, marketing. Módulo AI disponible. |
| **ERPNext** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) (~36k★) | Python/Frappe, MariaDB | ERP manufactura y logística fuerte; popular en India, Brasil, México. erpnext-mcp-server MIT. |
| **Twenty CRM** | AGPL-3.0 | [twentyhq/twenty](https://github.com/twentyhq/twenty) (~45k★) | TypeScript, React, GraphQL | CRM moderna, alternativa Salesforce; MCP Server nativo (cloud + self-hosted). AI en lenguaje natural. |
| **iTop** | AGPL-3.0 | [Combodo/iTop](https://github.com/Combodo/iTop) (~1k★) | PHP, MySQL | ITSM completo: CMDB, incidentes, cambios, SLA; ideal para departamentos TI. Personalizable XML. |
| **GLPI** | GPL-2.0 | [glpi-project/glpi](https://github.com/glpi-project/glpi) (~4.5k★) | PHP, MySQL | Gestión activos IT + helpdesk; enorme adopción LATAM (gobierno, educación, empresa). |
| **Nextcloud Hub** | AGPL-3.0 | [nextcloud/server](https://github.com/nextcloud/server) (~27k★) | PHP, Vue.js | Colaboración enterprise: docs, archivos, videollamadas, email; self-hosted GDPR-compliant. |
| **Mattermost** | AGPL-3.0 | [mattermost/mattermost](https://github.com/mattermost/mattermost) (~30k★) | Go, React | Mensajería team enterprise; Mattermost Agents v2 integra bots AI. Alternativa Slack self-hosted. |
| **OpenProject** | GPL-3.0 | [opf/openproject](https://github.com/opf/openproject) (~9k★) | Ruby on Rails | Gestión proyectos: Gantt, sprints, presupuestos, Wiki; ideal para PMOs y desarrollo SW. |
| **Apache OFBiz** | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) (~1.1k★) | Java | Suite enterprise Apache: ERP, CRM, eCommerce, HRMS; 100% Apache-2.0 sin restricciones. |
| **NocoBase** | AGPL-3.0 | [nocobase/nocobase](https://github.com/nocobase/nocobase) (~15k★) | TypeScript, Node.js | Builder no-code extensible: ERP/CRM/ops internos con plugins; AI-driven data model. |
| **Dolibarr** | GPL-3.0 | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) (~5k★) | PHP | ERP/CRM para pymes: facturas, clientes, inventario, contabilidad; modular y ligero. |

## Cómo customizar con AI

### Patrón estándar Globant

```
1. Deploy plataforma base (Docker / bare metal)
2. Conectar MCP Server (Twenty, ERPNext, iTop tienen servidores ya)
3. Añadir agente de orquestación (n8n / Dify / CrewAI)
4. Configurar LLM backend (Claude / local Ollama para on-prem)
5. Exponer UI conversacional (chatbot embebido o Slack/Teams bot)
```

### MCP Servers disponibles por plataforma

| Plataforma | MCP Server | Notas |
|------------|------------|-------|
| Twenty CRM | Nativo en Cloud; self-hosted en roadmap | Leer/escribir CRM en lenguaje natural |
| ERPNext | [erpnext-mcp-server](https://github.com/rakeshgangwar/erpnext-mcp-server) MIT | 51 herramientas vía Frappe API |
| 1C:Enterprise | [MCP35](https://github.com/infaton/MCP35) MIT | 51 tools para ERP ruso 1C |
| Odoo | API REST + Python ORM | MCP wrapper a construir |
| GLPI | REST API | MCP wrapper a construir |

## Sectores LATAM con mayor adopción

- **Brasil**: Reforma Tributaria + IA → Odoo/ERPNext con módulos fiscales actualizados
- **México**: manufactura maquiladora → ERPNext + agentes predictive maintenance
- **Colombia**: servicios financieros → Odoo + agentes KYC/AML
- **Argentina**: PyMEs → Dolibarr + agentes de cotización automática
- **Chile**: Energía/Minería → automatización operacional → agentes de planning y reportes ERP
