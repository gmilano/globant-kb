# Vertical Platforms — Enterprise

> Real platforms you can fork, customize, and add AI on top of.
> Model: start functional, add the agentic layer.
> Last updated: 2026-07-07

## Platform Map

| Platform | License | Repo | Stars | Stack | Primary Use Case |
|----------|---------|------|-------|-------|-----------------|
| [Odoo](https://github.com/odoo/odoo) | LGPL-3.0 | odoo/odoo | ~52k | Python/OWL | Full ERP+CRM suite — most deployed OSS ERP globally |
| [ERPNext](https://github.com/frappe/erpnext) | GPL-3.0 | frappe/erpnext | ~36k | Python/Vue (Frappe) | Manufacturing, supply chain, HR, finance, multi-company |
| [Twenty CRM](https://github.com/twentyhq/twenty) | MIT | twentyhq/twenty | ~45k | TypeScript/React | AI-native Salesforce alternative with native MCP server |
| [SuiteCRM](https://github.com/salesagility/SuiteCRM) | AGPL-3.0 | salesagility/SuiteCRM | ~4k | PHP/Vue | Feature-complete Salesforce alternative; 5M+ users |
| [Apache OFBiz](https://github.com/apache/ofbiz-framework) | Apache-2.0 | apache/ofbiz-framework | ~1.1k | Java/Groovy | Complex enterprise ERP with e-commerce, order mgmt |
| [NocoBase](https://github.com/nocobase/nocobase) | AGPL-3.0 | nocobase/nocobase | ~14k | TypeScript | No-code/low-code enterprise app builder; plugin-based |
| [Backstage](https://github.com/backstage/backstage) | Apache-2.0 | backstage/backstage | ~29k | TypeScript/React | Internal developer portal; AI model catalog; service mesh |

---

## Deep Dives

### 1. Twenty CRM — Best for AI-Native CRM Projects
**Why choose it**: The only major OSS CRM with a native MCP server — Claude, ChatGPT, and Cursor can query and mutate customer data directly via agent protocols. MIT license means no copyleft concerns.

**AI integration points**:
- MCP server: agents can read contacts, deals, tasks, timeline events
- Webhook system: trigger agent workflows on CRM events
- Custom objects API: extend data model for industry-specific AI features

**Integration code** (Twenty + Claude MCP pattern):
```python
import anthropic

# With Twenty's native MCP server running
client = anthropic.Anthropic()
response = client.beta.messages.create(
    model="claude-sonnet-5",
    max_tokens=2048,
    mcp_servers=[{
        "type": "url",
        "url": "http://localhost:3000/api/mcp",  # Twenty MCP endpoint
        "name": "twenty-crm",
    }],
    messages=[{
        "role": "user",
        "content": "Find all deals in negotiation stage with ARR > $50k and draft a follow-up strategy"
    }]
)
print(response.content[0].text)
```

**LATAM fit**: Self-hosted, $0 license cost, TypeScript stack familiar to LATAM dev teams; replaces $75-150/user/month Salesforce for mid-market.

---

### 2. ERPNext / Frappe — Best for Manufacturing & Complex Enterprise
**Why choose it**: Most feature-complete OSS ERP; Frappe framework provides REST APIs, webhooks, and event system that wires cleanly to LangGraph workflows.

**AI integration pattern** (ERPNext + LangGraph):
```python
import frappe
import anthropic
from langgraph.graph import StateGraph

# Frappe provides REST API at /api/resource/{doctype}
# Use LangGraph to build multi-step workflows over ERP data

client = anthropic.Anthropic()

def check_inventory_tool(item_code: str) -> dict:
    """Query ERPNext inventory via REST"""
    response = frappe.get_doc("Item", item_code)  # or use requests to REST API
    return {"qty": response.actual_qty, "reorder_level": response.reorder_level}

def create_purchase_order_tool(supplier: str, items: list) -> str:
    """Create PO in ERPNext"""
    po = frappe.new_doc("Purchase Order")
    po.supplier = supplier
    po.items = items
    po.insert()
    return po.name

# Build LangGraph workflow with these tools
tools = [check_inventory_tool, create_purchase_order_tool]
response = client.messages.create(
    model="claude-haiku-4-5-20251001",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "Check inventory for SKU-001 and reorder if below threshold"}]
)
```

**Cost per query**: ~$0.0002 (Claude Haiku + ~500 tokens)
**Build time**: 2-3 weeks for standard procurement automation

---

### 3. Odoo — Best for Broad Enterprise Coverage
**Why choose it**: 52k+ modules covering accounting, HR, inventory, manufacturing, CRM, e-commerce. Python + XML ecosystem; large LATAM implementation community.

**AI integration pattern** (Odoo + Claude Sonnet):
```python
import xmlrpc.client
import anthropic
import json

# Odoo XML-RPC API
url = "https://your-odoo-instance.com"
db, username, password = "your-db", "admin", "password"

common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
uid = common.authenticate(db, username, password, {})
models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")

def get_overdue_invoices():
    return models.execute_kw(db, uid, password, 'account.move', 'search_read',
        [[['invoice_date_due', '<', '2026-07-01'], ['state', '=', 'posted']]],
        {'fields': ['name', 'partner_id', 'amount_residual', 'invoice_date_due']})

client = anthropic.Anthropic()
invoices = get_overdue_invoices()
response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=2048,
    messages=[{
        "role": "user",
        "content": f"Analyze these overdue invoices and prioritize collection actions:\n{json.dumps(invoices, indent=2)}"
    }]
)
```

---

### 4. Apache OFBiz — Best for Apache-Licensed ERP (No Copyleft)
**Why choose it**: True Apache-2.0 license (no copyleft risk); Java/Groovy stack; strong in e-commerce, order management, financial accounting.

**AI readiness**: REST APIs available; integrate via LangGraph tool nodes calling OFBiz REST endpoints.

---

### 5. Backstage — Best for Internal AI Platform Portal
**Why choose it**: 3,400+ companies; Toyota achieved $10M ROI; CNCF incubating. Acts as the "front door" to enterprise AI capabilities — AI model catalog, agent registry, template scaffolding.

**AI catalog pattern**:
```typescript
// backstage-plugin-ai-catalog/src/components/ModelCatalog.tsx
import { catalogApiRef, useApi } from '@backstage/core-plugin-api';

// Register AI models as catalog entities
// catalog-info.yaml:
// apiVersion: backstage.io/v1alpha1
// kind: Component
// metadata:
//   name: customer-churn-agent
//   annotations:
//     ai.globant.com/model: claude-sonnet-5
//     ai.globant.com/framework: langgraph
//     ai.globant.com/cost-per-query: "0.002"
```

---

## LATAM Deployment Map

| Country | Top Platform Choice | Key Consideration |
|---------|-------------------|------------------|
| Brazil | Odoo + ERPNext | SPED fiscal compliance modules available for both |
| Mexico | Odoo + ERPNext | CFDI 4.0 invoicing modules; strong local partners |
| Argentina | ERPNext (lighter) | Inflationary accounting; multi-currency critical |
| Colombia | Odoo | DIAN electronic invoicing module available |
| Chile | Odoo | SII electronic documents; strong Odoo community |
| Peru | ERPNext | SUNAT compliance; growing Frappe partner network |

---

## Build vs Buy Matrix

| Scenario | Recommendation | Estimated Build Time |
|---------|---------------|---------------------|
| AI-native CRM from scratch | Twenty CRM + Claude MCP | 3-4 weeks |
| Manufacturing ERP + AI procurement | ERPNext + LangGraph | 4-6 weeks |
| Broad enterprise (HR+Finance+CRM) | Odoo + Claude | 4-8 weeks |
| No-code enterprise app + AI | NocoBase + Dify | 2-3 weeks |
| DevOps AI portal | Backstage + OpenHands | 4-6 weeks |
| Complex order management | OFBiz + LangGraph (Apache safe) | 6-8 weeks |

---
*See `compose/patterns.md` for complete wiring recipes.*
