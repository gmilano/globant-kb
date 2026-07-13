# Vertical Solutions — Retail & Consumer

> Existing platforms customizable with AI. Start with a working system, add the agentic layer on top.
> Last updated: 2026-07-13

## Commerce Platforms (AI-Customizable)

| Platform | License | Repo | Stack | Primary Use Case | AI Entry Point |
|----------|---------|------|-------|-----------------|----------------|
| **Medusa** | MIT | [medusajs/medusa](https://github.com/medusajs/medusa) | Node.js / TypeScript | Headless commerce; D2C, B2B, marketplace | MCP server + agent skills; Claude Code integration native |
| **Bagisto** | OSL-3.0 | [bagisto/bagisto](https://github.com/bagisto/bagisto) | Laravel / PHP | Multi-channel, multi-currency ecommerce | REST/GraphQL APIs; AI plugins via Bagisto marketplace |
| **WooCommerce** | GPL-3.0 | [woocommerce/woocommerce](https://github.com/woocommerce/woocommerce) | WordPress / PHP | SMB to mid-market online stores (6M+ active) | Plugin ecosystem; Jetpack AI; WooCommerce Blocks |
| **Mercur** | MIT | [mercurjs/mercur](https://github.com/mercurjs/mercur) | Node.js (on Medusa v2) | Multi-vendor marketplace B2B + B2C | Inherits Medusa MCP + agent skills |

## ERP & Omnichannel Suites

| Platform | License | Repo | Stack | Primary Use Case | AI Entry Point |
|----------|---------|------|-------|-----------------|----------------|
| **Odoo** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python / JavaScript | Full ERP: POS, inventory, CRM, ecommerce, accounting | Python APIs; Odoo.sh; Odoo AI Copilot (v17+); MCP servers emerging |
| **ERPNext** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | Frappe / Python | Retail, distribution, manufacturing ERP | Frappe Cloud AI extensions; REST API; webhook-driven agents |
| **Apache OFBiz** | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java | Enterprise ecommerce + ERP; highly customizable | Java APIs; used as backend for AI-augmented enterprise retail |

## Specialized Retail Infrastructure

| Platform | License | Repo | Stack | Primary Use Case | AI Entry Point |
|----------|---------|------|-------|-----------------|----------------|
| **OpenBB** | AGPLv3 | [OpenBB-finance/OpenBBTerminal](https://github.com/OpenBB-finance/OpenBBTerminal) | Python | Financial analytics (pricing, margins, demand) | MCP v4; agent-native; LLM integrations built-in |
| **Dolibarr** | GPL-3.0 | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | PHP | SMB ERP+CRM (inventory, invoices, suppliers) | REST API; webhook; Claude agents via HTTP tools |
| **SuiteCRM** | LGPL | [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | PHP | CRM for retail: customer 360, campaigns, service | REST API v8; AI-driven lead scoring via webhooks |

## Retail AI Middleware

| Platform | License | Repo | Stack | Primary Use Case | AI Entry Point |
|----------|---------|------|-------|-----------------|----------------|
| **Agentic Commerce Protocol** | Apache-2.0 | [agentic-commerce-protocol/agentic-commerce-protocol](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) | Open spec | Agent ↔ merchant transaction standard | Native protocol for AI agents to discover + purchase |
| **LightFM** | Apache-2.0 | [lyst/lightfm](https://github.com/lyst/lightfm) | Python / Cython | Hybrid recommendations (collab + content) | Add as recommendation microservice to any platform |
| **Mastra** | Apache-2.0 | [mastra-ai/mastra](https://github.com/mastra-ai/mastra) | TypeScript | Agent orchestration for retail workflows | Workflow engine over any platform's API |

## How to Customize with AI (Recommended Pattern)

```
1. Choose platform (Medusa for composable; Odoo for all-in-one; ERPNext for LATAM SMB)
2. Stand up MCP server (medusa-mcp / odoo-mcp / custom) for agent access
3. Add recommendation layer: LightFM or NVIDIA blueprint
4. Wire Mastra (TypeScript) or LangGraph (Python) for workflow orchestration
5. Integrate ACP for multi-agent checkout if Stripe-enabled
6. Expose conversational UI: WhatsApp (LATAM), web chat, or voice
```

## LATAM-Specific Recommendations

| Market | Recommended Stack | Rationale |
|--------|------------------|----------|
| Brazil | Medusa + PIX (via Stripe/Efi) + WhatsApp Business | PIX dominates payments; WhatsApp 97% smartphone penetration |
| Mexico | ERPNext + OXXO/SPEI + MercadoPago | SMB-friendly ERP; SPEI instant transfers; ML marketplace dominance |
| Argentina | Dolibarr + MercadoPago + custom AI | Currency complexity; offline-first needed; SMB scale |
| Colombia | Odoo Community + PSE/Wompi | Growing D2C; Odoo widely deployed by SIs |

---
*See also: `repos/foundations.md` for core repos, `compose/patterns.md` for integration recipes.*
