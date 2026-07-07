# Foundational Repos — Enterprise AI

> Core open-source repositories to build on. Permissive licenses, active communities.
> Last updated: 2026-07-07

## Category 1: Agent Orchestration Frameworks

| Repo | License | Stars | What it gives you |
|------|---------|-------|------------------|
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~34k | Graph-based stateful multi-agent workflows; checkpointing; human-in-the-loop; streaming |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | ~31k | Role-based agent crews; task decomposition; async execution; tool use |
| [google/adk-python](https://github.com/google/adk-python) | Apache-2.0 | ~20k | Google Agent Dev Kit; A2A native; multi-agent routing; Vertex AI integration |
| [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | MIT | ~15k | Lightweight agents SDK; handoffs; guardrails; tracing; model-agnostic |
| [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | ~42k | Multi-agent conversations; GroupChat; Magentic-One patterns; MAF successor |

## Category 2: LLMOps & App Platforms

| Repo | License | Stars | What it gives you |
|------|---------|-------|------------------|
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | ~144k | Full LLMOps platform; RAG pipelines; visual workflow builder; multi-model; SSO |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Sustainable Use | ~182k | Visual automation with 400+ integrations; native AI nodes; self-hostable; fair-code |
| [mlflow/mlflow](https://github.com/mlflow/mlflow) | Apache-2.0 | ~19k | AI engineering platform; LLM tracing; agent evaluation; model registry; cost control |
| [PrefectHQ/prefect](https://github.com/PrefectHQ/prefect) | Apache-2.0 | ~17k | Workflow orchestration; retries; caching; built-in observability; agentic pipeline support |

## Category 3: Autonomous Agent Runtimes

| Repo | License | Stars | What it gives you |
|------|---------|-------|------------------|
| [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | Apache-2.0 | ~76k | Autonomous software engineer; 72.8% SWE-Bench; Docker/K8s sandboxing; RBAC/SAML |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Apache-2.0 | ~86k | Browser control for AI agents; headless + headed; form fill, navigation, extraction |
| [microsoft/playwright](https://github.com/microsoft/playwright) | Apache-2.0 | ~68k | Browser automation foundation; multi-browser; used under browser-use |

## Category 4: Infrastructure & Orchestration

| Repo | License | Stars | What it gives you |
|------|---------|-------|------------------|
| [temporalio/temporal](https://github.com/temporalio/temporal) | MIT | ~13k | Durable execution; automatic retry; state persistence; Multi-Region 99.99% SLA |
| [backstage/backstage](https://github.com/backstage/backstage) | Apache-2.0 | ~29k | Internal developer portal; service catalog; AI model registry; scaffolding |
| [zenml-io/zenml](https://github.com/zenml-io/zenml) | Apache-2.0 | ~4.2k | MLOps framework; pipeline versioning; model deployment; cloud-agnostic |

## Category 5: ERP / CRM Foundations

| Repo | License | Stars | What it gives you |
|------|---------|-------|------------------|
| [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | ~36k | Full ERP (manufacturing, supply chain, HR, finance); Python/JS; MCP server available |
| [frappe/frappe](https://github.com/frappe/frappe) | MIT | ~10k | Low-code web framework underlying ERPNext; REST API; role-based access; event hooks |
| [twentyhq/twenty](https://github.com/twentyhq/twenty) | MIT | ~45k | AI-native CRM (Salesforce alternative); native MCP server; TypeScript; self-hostable |
| [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | ~1.1k | Apache ERP for complex enterprise automation (order mgmt, e-commerce, accounting) |

---

## AI-Readiness Matrix

| Repo | REST API | Webhooks | MCP Server | LLM Hooks | License Risk |
|------|----------|----------|-----------|-----------|-------------|
| LangGraph | ✅ | ✅ | build it | Native | Low (MIT) |
| Dify | ✅ | ✅ | ✅ | Native | Low (Apache-2.0) |
| n8n | ✅ | ✅ | ✅ | Native AI nodes | Medium (Sustainable Use) |
| ERPNext / Frappe | ✅ | ✅ | ✅ community | Event hooks | Medium (GPL-3.0 — copyleft) |
| Twenty CRM | ✅ | ✅ | ✅ native | Planned | Low (MIT) |
| Apache OFBiz | ✅ | limited | no | Manual | Low (Apache-2.0) |
| Temporal | ✅ | ✅ | no | Workflow steps | Low (MIT) |
| MLflow | ✅ | ✅ | no | Evaluation hooks | Low (Apache-2.0) |
| Backstage | ✅ | ✅ | no | Plugin API | Low (Apache-2.0) |
| OpenHands | ✅ | ✅ | no | Sandboxed agents | Low (Apache-2.0) |

---

## License Risk Notes

- **MIT / Apache-2.0**: Green light — can build proprietary products on top
- **GPL-3.0 (ERPNext)**: Copyleft — modifications to ERPNext itself must be open-sourced; services built on top can be proprietary; get legal sign-off for client deliverables
- **Sustainable Use (n8n)**: Cannot offer n8n itself as a managed service; using n8n internally or wrapping it in a client solution is fine
- **LGPL-3.0 (Odoo community)**: Modifications to Odoo must be open-sourced; custom addons can be proprietary

---
*See also: `verticals/solutions.md` for complete platform evaluations.*
