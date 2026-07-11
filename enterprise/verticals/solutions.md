# Vertical Platforms — Enterprise

> Real platforms enterprises run today — customizable with an AI agent layer on top.
> Model: start from a working system, add agentic intelligence, deliver 10x productivity.
> Last updated: 2026-07-11

## ERP Platforms

### Odoo Community
| Attribute | Value |
|-----------|-------|
| License | LGPL-3.0 (Community) / Proprietary (Enterprise) |
| GitHub | [odoo/odoo](https://github.com/odoo/odoo) — ~52.8k stars |
| Users | 7M+ worldwide; most-recognized open-source ERP brand |
| Stack | Python (OWL), PostgreSQL, nginx |
| Modules | Accounting, CRM, Inventory, HR, Manufacturing, E-commerce, POS, Projects (50+ total) |
| AI Layer | Enterprise only ($24.90/user/month): smart invoice OCR, AI lead scoring, predictive inventory |
| LATAM | Very high adoption; Spanish community; strong partner ecosystem in Argentina, Brazil, Colombia, Mexico |
| Globant Opportunity | AI layer on Community edition: build LangGraph agents that call Odoo REST APIs for automation without needing Enterprise license |

### ERPNext (Frappe)
| Attribute | Value |
|-----------|-------|
| License | GPL-3.0 (ERPNext) / MIT (Frappe framework) |
| GitHub | [frappe/erpnext](https://github.com/frappe/erpnext) — ~36.4k stars |
| Users | 200k+ businesses globally; strong in India, Southeast Asia, LATAM |
| Stack | Python + Frappe framework, MariaDB, Redis, Socket.IO |
| Modules | Accounting, HR+Payroll, Inventory, Manufacturing, CRM, Projects, Healthcare, Education |
| AI Layer | No built-in AI — but Frappe REST API + Python hooks make it easy to wire in LangGraph/CrewAI |
| Key advantage | MIT Frappe underneath = build custom apps without GPL restrictions; ERPNext acts as data layer |
| Globant Opportunity | Build AI copilots on Frappe REST API; `erpnext-mcp-server` (MIT, 104 stars) gives instant MCP access |

### Apache OFBiz
| Attribute | Value |
|-----------|-------|
| License | Apache-2.0 |
| GitHub | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) — ~1.1k stars |
| Stack | Java, Groovy, PostgreSQL/MySQL |
| Modules | Order Management, Inventory, Accounting, HR, E-commerce, CRM |
| AI Layer | Custom only — Java Groovy hooks; pair with Spring AI (Apache-2.0) |
| Globant Opportunity | Enterprise Java shops; most permissive license; can embed Microsoft Agent Framework natively |

---

## Collaboration & Communication

### Mattermost
| Attribute | Value |
|-----------|-------|
| License | Apache-2.0 (Team Edition) |
| GitHub | [mattermost/mattermost](https://github.com/mattermost/mattermost) — ~10k stars |
| Users | Governments, militaries, regulated enterprises; on-prem and air-gapped deployments |
| AI Features | mattermost-plugin-ai: thread summarization, message rewriting, auto-translation, custom AI agents via bridge API |
| Globant Opportunity | Regulated clients (banking, defense, healthcare) needing on-prem AI; build custom AI bots on Mattermost Bot API |

### Nextcloud
| Attribute | Value |
|-----------|-------|
| License | AGPL-3.0 |
| GitHub | [nextcloud/server](https://github.com/nextcloud/server) — ~26k stars |
| Users | Thousands of enterprises, educational institutions, government agencies |
| AI Features | Nextcloud AI (assistant): summarize, rewrite, translate; smart search; Talk bot integration |
| Globant Opportunity | Data sovereignty clients in Europe/LATAM; integrate AI workflows into Nextcloud Files using Flows |

---

## Project Management

### Plane
| Attribute | Value |
|-----------|-------|
| License | AGPL-3.0 |
| GitHub | [makeplane/plane](https://github.com/makeplane/plane) — ~28k stars |
| Users | Sony, Accenture, and 30k+ teams |
| Stack | Next.js, Django, PostgreSQL |
| AI Features | AI issue triage, sprint planning suggestions via plugin |
| Globant Opportunity | Replace Jira in cost-conscious clients; add LangGraph-powered sprint retrospective agents |

---

## Internal Developer Portal

### Backstage (Spotify)
| Attribute | Value |
|-----------|-------|
| License | Apache-2.0 |
| GitHub | [backstage/backstage](https://github.com/backstage/backstage) — ~30k stars |
| Users | Spotify, Netflix, Airbnb, American Airlines, Expedia |
| Stack | React, Node.js, TypeScript, PostgreSQL |
| AI Features | Growing plugin ecosystem: AI catalog, agent discovery, docs summarization |
| Globant Opportunity | Enterprise DevOps transformation; build AI agent catalog plugin; integrate OpenHands for automated PR reviews |

---

## Workflow & Integration

### n8n
| Attribute | Value |
|-----------|-------|
| License | Fair-code (free for internal/self-hosted, commercial for client-facing products) |
| GitHub | [n8n-io/n8n](https://github.com/n8n-io/n8n) — ~189k stars |
| Stack | Node.js, Vue.js, TypeScript, SQLite/PostgreSQL |
| AI Features | Native AI Agent nodes; MCP Client + Server Trigger; Self-Hosted AI Kit (Ollama + Qdrant) |
| Globant Opportunity | Integration glue between AI agents and legacy enterprise systems; build custom AI workflows; note: client-facing use needs n8n license |

---

## How to Add an AI Layer to Any of These Platforms

```
Step 1: Expose MCP Server
  → Use platform's REST API or install MCP server plugin (e.g., erpnext-mcp-server)
  → Any Claude/agent can now drive the platform via structured tool calls

Step 2: Build the Agent Logic
  → LangGraph for stateful multi-step workflows (approval chains, loops)
  → CrewAI for multi-specialist collaboration (research + draft + review)
  → n8n for visual workflow + legacy system connectivity

Step 3: Add RAG Knowledge Layer
  → RAGFlow ingests platform documentation, company policies, historical data
  → Grounded answers with citations, not hallucinations

Step 4: Deploy & Observe
  → Dify or LangGraph Cloud for visual monitoring + LLMOps
  → Mem0 for persistent cross-session agent memory
  → Prometheus + Grafana for infrastructure metrics
```

---
*Updated 2026-07-11 by ingest pipeline.*
