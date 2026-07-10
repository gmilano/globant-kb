# 🏢 Soluciones verticales — Enterprise

> Plataformas enterprise open source para customizar con AI. Foco: licencias MIT / Apache / GPL que Globant puede usar.
> Última actualización: 2026-07-10

## ERP — Enterprise Resource Planning

| Plataforma | Repo | Licencia | Descripción | AI-readiness |
|------------|------|----------|-------------|--------------|
| **Odoo** | [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | ERP + CRM + eCommerce + RRHH + Manufactura; 12M+ usuarios; 52k★; Python-native = fácil integración con AI stack; módulos community + enterprise. | Alta — Python, API REST, módulos de terceros para AI/ML |
| **ERPNext** | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | ERP 100% open source sobre Frappe; contabilidad, inventario, manufactura, CRM, RRHH; GST/e-invoicing nativo; 36k★; muy usado en LATAM/India/África. | Alta — API REST, DocType schema, MCP server disponible |
| **Apache OFBiz** | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | ERP/CRM/eCommerce/SCM/MRP Java completo; ASF desde 2001; enterprise-grade; arquitectura extensible para AI agents; licencia más permisiva del grupo. | Media — Java, extensible vía plugins, arquitectura MVC |
| **Axelor** | [axelor/axelor-open-suite](https://github.com/axelor/axelor-open-suite) | AGPL-3.0 | ERP + BPM + CRM Java/Python; low-code app studio; 1.7k★; orientado a medianas empresas; REST API + Gradle build. | Media — REST API, BPM extensible |
| **Dolibarr** | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | GPL-3.0 | ERP + CRM modular PHP; habilita solo los módulos que necesita; 10.2k★; popular en PYMES LATAM; REST API completa. | Media — API REST, PHP, módulos AI de comunidad |

## CRM — Customer Relationship Management

| Plataforma | Repo | Licencia | Descripción | AI-readiness |
|------------|------|----------|-------------|--------------|
| **Twenty** | [twentyhq/twenty](https://github.com/twentyhq/twenty) | MIT | Alternativa open a Salesforce; 45k★; API-first + objetos custom; MCP server nativo en Cloud workspaces → Claude/GPT/Cursor operan el CRM en lenguaje natural; design moderno React. | Muy alta — MCP nativo, GraphQL, webhooks, objetos custom |
| **SuiteCRM** | [SalesAgility/SuiteCRM](https://github.com/SalesAgility/SuiteCRM) | AGPL-3.0 | Fork de SugarCRM con feature parity Salesforce; 5M+ usuarios; PHP; módulos de AI de comunidad; amplia adopción corporativa. | Media — API REST/SOAP, módulos extensibles |
| **EspoCRM** | [espocrm/espocrm](https://github.com/espocrm/espocrm) | GPL-3.0 | CRM PHP ligero para equipos medianos; 1.9k★; layout manager, REST API, webhooks; integra bien con n8n / Make. | Media — REST API, webhooks, n8n native |

## Plataformas de Colaboración y Knowledge

| Plataforma | Repo | Licencia | Descripción | AI-readiness |
|------------|------|----------|-------------|--------------|
| **Mattermost** | [mattermost/mattermost](https://github.com/mattermost/mattermost) | MIT/EE | Slack alternativa self-hosted; 30k★; Mattermost AI Copilot integrado; plugin ecosystem; compliance y auditoría enterprise. | Alta — plugins AI, API bot, RAG integration |
| **Outline** | [outline/outline](https://github.com/outline/outline) | BSL 1.1 | Wiki/knowledge base tipo Notion; 28k★; AI search integrado; self-hosted; ideal como base de RAGFlow ingestion. | Alta — MCP server disponible, AI search, API completa |
| **AppFlowy** | [AppFlowy-IO/AppFlowy](https://github.com/AppFlowy-IO/AppFlowy) | AGPL-3.0 | Alternativa Notion/Airtable en Rust+Flutter; 62k★; AI writing + AI document editor nativos; self-hosted. | Alta — AI integrado, Rust performant, extensible |

## Low-Code / No-Code Enterprise

| Plataforma | Repo | Licencia | Descripción | AI-readiness |
|------------|------|----------|-------------|--------------|
| **Frappe** | [frappe/frappe](https://github.com/frappe/frappe) | MIT | Low-code Python framework base de ERPNext; 10k★; DocType model, REST API, Webhooks, Scheduler; Python = AI-native. | Muy alta — Python ecosystem, REST, DocType schema |
| **NocoBase** | [nocobase/nocobase](https://github.com/nocobase/nocobase) | AGPL-3.0 | Low-code/no-code platform orientada a devs; 15k★; plugin architecture; REST API; extensible con AI workflows. | Alta — plugin system, REST API, node-based |

## Workflow / BPM / Automatización

| Plataforma | Repo | Licencia | Descripción | AI-readiness |
|------------|------|----------|-------------|--------------|
| **n8n** | [n8n-io/n8n](https://github.com/n8n-io/n8n) | Sustainable Use | Workflow automation con AI nodes + MCP bidireccional; 500+ integraciones; nodo MCP = Claude puede ser orchestrator; 189k★. | Muy alta — MCP nativo, AI nodes, 500+ integraciones |
| **Camunda** | [camunda/camunda](https://github.com/camunda/camunda) | Apache-2.0 | BPMN + DMN process engine enterprise; 3k★; Java/REST; ideal para workflows de compliance con HITL AI. | Alta — REST API, BPMN extensible, Java AI integration |

## Cómo customizar con AI

1. **Elegir plataforma base** según vertical (ERP, CRM, workflow) y licencia requerida
2. **Identificar MCP server** disponible o desarrollar wrapper MCP sobre la API REST existente
3. **Instalar capa de agentes** (LangGraph para stateful; CrewAI para multi-role) conectada via MCP
4. **Añadir RAGFlow** para knowledge base (documentos, manuales, normativas del cliente)
5. **Envolver con Agent Governance Toolkit** para compliance (EU AI Act, LGPD, SOC2)
6. **UI conversacional** via Slack bot / Teams bot / web chat sobre el stack
7. **Observabilidad** con LangSmith o Arize Phoenix antes de ir a producción

---
*Ver también: `repos/foundations.md` para los frameworks de agentes que se sientan encima de estas plataformas.*
