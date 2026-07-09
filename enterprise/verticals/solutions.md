# 🏭 Verticales de partida — Enterprise

> Plataformas enterprise open source customizables con AI.
> Modelo: partir de algo funcional y probado, añadir capa agéntica arriba.
> Última actualización: 2026-07-09

---

## 1. ERP (Enterprise Resource Planning)

| Plataforma | Licencia | Stars | Stack | Caso de uso AI |
|------------|----------|-------|-------|----------------|
| [Odoo](https://github.com/odoo/odoo) | LGPL-3.0 | 52.8k | Python + OWL/JS | AI sobre ERP: chat con datos financieros, automatización compras, demand forecasting |
| [ERPNext](https://github.com/frappe/erpnext) | GPL-3.0 | 36.4k | Python + Frappe framework | MCP server via erpnext-mcp-server; PYME LATAM con Claude |
| [Apache OFBiz](https://github.com/apache/ofbiz-framework) | Apache-2.0 | 1.1k | Java | Único ERP Apache-2.0 enterprise. AI agents sobre SCM, CRM, eCommerce |
| [Dolibarr](https://github.com/Dolibarr/dolibarr) | GPL-3.0 | 5.3k | PHP | PYME Europa + LATAM. REST API para agentes AI. 600+ módulos. |
| [iDempiere](https://github.com/idempiere/idempiere) | GPL-2.0 | 430 | Java OSGi | ERP en LATAM (Argentina, Colombia, Ecuador). Plugin-based. |

### Setup rápido Odoo + AI Agent
```python
# Odoo 18 + Claude Agent via XML-RPC
import xmlrpc.client
import anthropic

# Conectar a Odoo
url = "http://localhost:8069"
db, username, password = "mydb", "admin", "admin"
uid = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common").authenticate(db, username, password, {})
models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")

# Agente Claude con tool call para Odoo
client = anthropic.Anthropic()
tools = [{
    "name": "query_odoo",
    "description": "Query Odoo ERP for business data",
    "input_schema": {
        "type": "object",
        "properties": {
            "model": {"type": "string", "description": "Odoo model e.g. sale.order"},
            "domain": {"type": "array", "description": "Search domain e.g. [['state','=','sale']]"},
            "fields": {"type": "array", "description": "Fields to return"}
        }
    }
}]
```

---

## 2. CRM (Customer Relationship Management)

| Plataforma | Licencia | Stars | Stack | Caso de uso AI |
|------------|----------|-------|-------|----------------|
| [SuiteCRM](https://github.com/suitecrmio/suitecrm-core) | AGPL-3.0 | 4.2k | PHP | CRM feature-parity Salesforce. AI sobre pipeline de ventas, email scoring |
| [EspoCRM](https://github.com/espocrm/espocrm) | GPL-3.0 | 2.5k | PHP + React | API REST nativa. Webhooks. Más liviano. AI sobre customer 360. |
| [Twenty](https://github.com/twentyhq/twenty) | AGPL-3.0 | 45.5k | TypeScript | CRM moderno open-source. Alternativa Salesforce. **MCP server nativo en Cloud (2026)** — Claude/ChatGPT/Cursor acceden a CRM data directamente. [twenty-crm-mcp-server](https://github.com/mhenry3164/twenty-crm-mcp-server) para self-hosted. |
| [Monica](https://github.com/monicahq/monica) | AGPL-3.0 | 22k | PHP + Laravel | Personal CRM. Relaciones + contexto = base para AI relationship manager. |

---

## 3. ITSM / Helpdesk

| Plataforma | Licencia | Stars | Stack | Caso de uso AI |
|------------|----------|-------|-------|----------------|
| [Zammad](https://github.com/zammad/zammad) | GPL-3.0 | 4.5k | Ruby on Rails | Helpdesk multi-canal. AI triage de tickets, clasificación auto, sugerencia respuestas. |
| [Chatwoot](https://github.com/chatwoot/chatwoot) | MIT | 23k | Ruby + Vue | Customer support + live chat. MIT = ideal Globant. AI sobre conversaciones. |
| [FreeScout](https://github.com/freescout-help-desk/freescout) | AGPL-3.0 | 3.1k | PHP + Laravel | Alternativa HelpScout. Email support. AI draft replies. |
| [osTicket](https://github.com/osTicket/osTicket) | GPL-2.0 | 3.2k | PHP | Helpdesk clásico. Amplia base instalada LATAM. AI sobre base de conocimiento. |

---

## 4. Project Management / Colaboración

| Plataforma | Licencia | Stars | Stack | Caso de uso AI |
|------------|----------|-------|-------|----------------|
| [OpenProject](https://github.com/opf/openproject) | GPL-3.0 | 10k | Ruby on Rails | PM enterprise completo. AI sobre planificación, risk assessment, retrospectivas. |
| [Plane](https://github.com/makeplane/plane) | AGPL-3.0 | 34k | Python + React | Alternativa Linear/Jira. MCP server en roadmap. AI sobre issues + sprints. |
| [Taiga](https://github.com/kaleidos-ventures/taiga-back) | AGPL-3.0 | 3.4k | Python + Django | Agile PM. REST API completa. AI sobre velocity + burndown. |

---

## 5. HR (Human Resources)

| Plataforma | Licencia | Stars | Stack | Caso de uso AI |
|------------|----------|-------|-------|----------------|
| [OrangeHRM](https://github.com/orangehrm/orangehrm) | GPL-2.0 | 914 | PHP | HRMS global. 5M+ usuarios. AI sobre employee lifecycle, performance reviews. |
| [iHRIS](https://github.com/iHRIS/iHRIS) | GPL-3.0 | 160 | PHP | HR para sector salud. ONG + gobierno. LATAM adopción. |

---

## 6. Visual AI Builders (No-Code/Low-Code)

| Plataforma | Licencia | Stars | Stack | Caso de uso enterprise |
|------------|----------|-------|-------|------------------------|
| [Dify](https://github.com/langgenius/dify) | Apache-2.0 | 138k | Python + Next.js | RAG + agents + HITL + multi-tenant. Mejor para enterprise no-devs. |
| [Flowise](https://github.com/FlowiseAI/Flowise) | Apache-2.0 | 40k | Node.js | Visual canvas LangChain. Prototipos en horas. HITL 2026. |
| [Langflow](https://github.com/langflow-ai/langflow) | MIT | 60k | Python + React | IBM/DataStax. MCP nativo. Visual + Python API. |
| [n8n](https://github.com/n8n-io/n8n) | Sustainable Use | 56k | Node.js | Workflow automation enterprise. 1500+ integraciones. MCP nativo 2.0. |

---

## 7. Data Catalog / AI Governance

| Plataforma | Licencia | Stars | Stack | Caso de uso AI |
|------------|----------|-------|-------|----------------|
| [OpenMetadata](https://github.com/open-metadata/OpenMetadata) | Apache-2.0 | 6k | Java + React | Data catalog + MCP server. EU AI Act compliance. 3000+ enterprise deploys. |
| [DataHub](https://github.com/datahub-project/datahub) | Apache-2.0 | 10k | Python + React | LinkedIn-origin. Data lineage + governance. Agentic workflows 2026. |

---

## 8. Observabilidad LLM

| Plataforma | Licencia | Stars | Stack | Caso de uso |
|------------|----------|-------|-------|-------------|
| [Langfuse](https://github.com/langfuse/langfuse) | MIT | 28k | TypeScript | LLM traces + evals + cost tracking. Self-hosted Docker. EU AI Act audit. |
| [Opik](https://github.com/comet-ml/opik) | Apache-2.0 | 8.5k | Python | LLM evaluation + tracing. Alternativa OSS. |

---

## Estrategia de AI-ificación de Verticales

### Estrategia 1: MCP over existing ERP
```bash
# 1. Deploy ERPNext (self-hosted)
docker-compose up -d frappe

# 2. Instalar erpnext-mcp-server
pip install erpnext-mcp-server
# Configura ERPNEXT_URL, ERPNEXT_API_KEY

# 3. Claude desktop o LangGraph usa el MCP server
# Claude puede ahora: crear facturas, consultar inventario, generar reportes
```

### Estrategia 2: Dify over existing business tools
```yaml
# docker-compose.dify.yml
services:
  dify:
    image: langgenius/dify:latest
    environment:
      SECRET_KEY: your-secret-key
      OPENAI_API_KEY: ${OPENAI_API_KEY}  # o ANTHROPIC_API_KEY
    ports:
      - "3000:3000"
  # + PostgreSQL, Redis, Weaviate (vector store)
```

### Estrategia 3: Langfuse para compliance EU AI Act
```python
from langfuse import Langfuse
from anthropic import Anthropic

langfuse = Langfuse()  # self-hosted
client = Anthropic()

# Todo intercambio con LLM queda traced
with langfuse.trace(name="eu-ai-act-high-risk-decision") as trace:
    trace.metadata = {"risk_level": "high", "system": "HR-screening"}
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": "Evaluate candidate CV..."}]
    )
    trace.output = response.content[0].text
# Audit trail completo para compliance EU AI Act Annex III
```

---

## Landscape LATAM por País

| País | ERP más usado | CRM líder | Regulación AI | Oportunidad Globant |
|------|--------------|-----------|---------------|---------------------|
| Brasil | Totvs/SAP + ERPNext | Salesforce/SuiteCRM | Marco legal AI 2024 (LGPD+) | AI sobre Totvs con Claude; LGPD compliance |
| México | SAP/Odoo | Salesforce/Zoho | Sin ley AI (2026) | Odoo AI; sector manufactura y maquila |
| Argentina | Tango/ERPNext/iDempiere | SuiteCRM/Zoho | En desarrollo | iDempiere AI; sector financiero y agro |
| Colombia | World Office/ERPNext | HubSpot OSS | Marco sectorial | ERPNext AI; sector retail y servicios |
| Chile | EasyFact/Bsale/ERPNext | Salesforce | Política AI 2023 | AI sobre ERPs locales; minería y energía |

---
*Ver también: `agents/top.md` para frameworks de agentes y `compose/patterns.md` para recetas concretas.*
