# Trending AI Agents & Repos — Enterprise

> What's new and surging this week in enterprise AI. Refreshed 2026-07-12 (v5).

## Breaking This Week (July 2026)

### EU AI Act Timeline Correction: GPAI Enforcement August 2 — But Annex III High-Risk Pushed to December 2027

**Important update from v4:** The Digital Omnibus political agreement (May 2026) changed the enforcement timeline:

| Provision | Date | Status |
|-----------|------|--------|
| GPAI (General-Purpose AI) supervision live | **August 2, 2026** | Unchanged — European Commission becomes direct supervisor of GPAI providers |
| Article 50 (transparency, AI disclosure, deepfake labeling) | **August 2, 2026** | Unchanged — all chatbots/assistants must notify EU users they are AI |
| Annex III high-risk (HR, credit, biometrics, critical infra, medical, law enforcement) | ~~August 2, 2026~~ | **December 2, 2027** — 16-month extension via Digital Omnibus |

**What this means right now:**
- **August 2 still matters**: GPAI fines up to €35M or 7% global turnover; Article 50 AI disclosure is non-negotiable
- Any AI assistant visible to EU users must display AI interaction notices by August 2
- Annex III high-risk AI compliance planning should use December 2027 as the new hard date
- Correct any client proposals that cited August 2 as the Annex III deadline

**Action**: Still run the [Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit) (MIT) for Annex III systems — use the extension for preparation, not delay.

### MCP Enterprise-Managed Authorisation (EMA) Reaches Stable (July 2026)

MCP's EMA extension — which lets enterprises control agent-to-tool access via their existing SSO/IdP — was promoted to **stable status** in July 2026.

- SaaS vendors supporting EMA: Asana, Atlassian, Canva, Figma, Linear, Supabase; Slack in progress
- Gartner: 75% of API gateway vendors will support MCP features in 2026
- MCP donated to Linux Foundation AAIF (December 2025): now vendor-neutral; Anthropic, OpenAI, Block as co-founders; AWS, Google, Microsoft as platinum members
- Fortune 500 adoption: 28% in under 18 months — fastest enterprise protocol adoption since OAuth 2.0

**Pattern**: Wire enterprise IdP (Okta, Azure AD) → MCP EMA → MCP servers for each enterprise system → agents get automatic RBAC-governed access matching the user's role.

### SAP Autonomous Suite + ServiceNow Action Fabric (Q2 2026 Announcements)

**SAP (Sapphire 2026):** Deployed **224 AI agents + 51 AI assistants** across procurement, finance, HR, supply chain, and manufacturing. ERP-native governance means agents have full transactional context without hallucination risk.

**ServiceNow (Knowledge 2026):** Launched **Autonomous Workforce** across IT, CRM, employee services, and security/risk. **Action Fabric** lets external agents (Claude, Copilot) trigger governed ServiceNow actions — enabling multi-vendor agent interoperability under ServiceNow governance.

**Microsoft (BUILD 2026):** **Agent 365** provides cross-cloud agent identity management for agents running on AWS and Google Cloud, not just Azure — extending Microsoft governance to heterogeneous enterprise AI estates.

**Implication for Globant**: Clients with SAP/ServiceNow now get autonomous agents with existing licenses. Globant's value shifts to (a) customization + integration (b) governance across vendors (c) open-source stacks for clients outside these ecosystems.

### Google ADK 2.0 GA + Stars Surge to 20,100

Google ADK reached v2.0 GA with:
- Graph-based workflows, collaborative multi-agent, native Agent Runtime on Vertex AI
- Multi-language: Python, TypeScript, Go, Java, Kotlin (separate repos)
- Production deployments at Moody's, Dun & Bradstreet (Fortune 500 references)
- Stars grew to 20,100+ — described as fastest-growing agent framework at launch

---

## This Month's Fastest-Rising Enterprise Repos

| Repo | License | Signal | Why Trending |
|------|---------|--------|--------------|
| [strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk) | Apache-2.0 | 16.7M downloads/month | AWS production SDK at critical mass; renamed to harness-sdk; TS SDK + community providers added |
| [google/adk-python](https://github.com/google/adk-python) | Apache-2.0 | 20.1k ★; ADK 2.0 GA | Multi-language; Vertex AI Agent Runtime; Moody's + D&B as references |
| [agno-agi/agno](https://github.com/agno-agi/agno) | MIT | 39.8k ★ | Rebranded from Phidata; AgentOS control plane with RBAC; data sovereignty focus |
| [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | MIT | 25.6k ★ | Enterprise sandboxing added Apr 2026; provider-agnostic; TS companion |
| [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) | MIT | 18.4k ★ | Type-safe agents gaining traction in finance/legal; durable execution stable |
| [twentyhq/twenty](https://github.com/twentyhq/twenty) | AGPL-3.0 | 45.5k ★ | Native MCP server; CRM designed for agents; surpassed Salesforce/Hubspot clones |
| [microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) | MIT | EU AI Act + BYOM wave | GPAI/Article 50 August 2 enforcement; essential for BYOM endpoint AI governance |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Apache-2.0 | 73k+ ★ | 2,596% YoY; enterprise RAG standard for compliance-grounded answers |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 34.5M downloads/month | Production graph-orchestration default; steady at top |
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | ~144k ★ | #1 LLM platform by stars; visual + RAG + LLMOps in one |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Fair-code | ~182k ★ | Legacy-to-AI integration layer; MCP native; 500+ integrations |

---

## BYOM: The Security Blind Spot of 2026

**Bring Your Own Model (BYOM)** — employees running quantized LLMs locally on AI-PCs (NPU-equipped laptops from Dell/HP/Lenovo/Microsoft) — is the 2026 shadow AI vector that traditional security tools cannot detect.

- Network-based DLP and CASB tools are **completely blind** to local model inference
- **47%** of GenAI users already access tools via unmanaged personal accounts
- **$670,000** additional average breach cost when AI tools are involved (IBM 2025)
- Microsoft Edge RSAC 2026: browser-level shadow AI detection — but only covers browser-based tools, not local models

**Key open-source responses:**
- [Agno AgentOS](https://github.com/agno-agi/agno) — RBAC + self-hosted; data never leaves company infra
- [Mattermost Agents V2](https://github.com/mattermost/mattermost-plugin-agents) — sovereign AI with local LLM (Ollama/vLLM) + HITL
- [Nextcloud Assistant](https://github.com/nextcloud/assistant) — 100% on-prem AI with MCP; voice agents

**Implication for Globant**: Endpoint AI governance is a new consulting offer. The BYOM audit + sovereign AI deployment is a distinct sales motion from traditional shadow AI governance.

---

## Shadow AI Scale: Updated Numbers

| Metric | 2026 Data |
|--------|-----------|
| Enterprises with undiscovered AI agents | 82% (Cloud Security Alliance) |
| GenAI users on unmanaged personal accounts | 47% |
| AI data exposure incidents per enterprise per month | 200+ |
| Breaches involving AI tools | 1 in 5 data breaches |
| Breach cost premium from AI tools | +$670,000 per incident |
| Organizations with formal shadow AI governance policies | Only 37% |

**Globant positioning**: Shadow AI discovery + endpoint AI governance is now a board-level offer. Entry pitch: "We'll audit your AI estate in 2 weeks, classify by EU AI Act risk tier, and deploy a governance layer in 6 weeks."

---
*Auto-updated by ingest pipeline — v5 2026-07-12*
