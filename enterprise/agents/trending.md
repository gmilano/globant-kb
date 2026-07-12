# Trending AI Agents & Repos — Enterprise

> What's new and surging this week in enterprise AI. Refreshed 2026-07-12 (v4).

## Breaking This Week (July 2026)

### EU AI Act High-Risk Enforcement: August 2, 2026 (21 days away)

The EU AI Act binding enforcement deadline for high-risk AI systems is **August 2, 2026**. Penalties reach **€35M or 7% of global annual turnover** — whichever is higher. Scope for enterprise agentic AI:

- Agents used for recruiting, credit, critical infrastructure, medical, or law enforcement → **high-risk classification under Annex III**
- Every agent that invokes APIs (including MCP servers) is in scope for cybersecurity and logging mandates
- In multi-agent chains, **every agent performing a high-risk function** is subject to requirements — not just the orchestrator
- 82% of enterprises have AI agents or workflows their security teams did **not** know existed (Cloud Security Alliance research)

**Action**: Run the [Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit) (MIT) as a compliance check on any agent touching high-risk domains before August 2.

### Google ADK July 7, 2026 Update (Breaking Changes)

Google released an ADK update on July 7, 2026 with breaking changes to:
- Agent API
- Event model
- Session schema

If using Google ADK in production, pin to a specific version before upgrading. The update improves Vertex AI integration and eval framework.

### Strands Agents Hits 16.7M Downloads/Month

AWS's open-source Strands Agents SDK has surpassed 16.7M monthly downloads as of June 2026 — putting it firmly in the "infrastructure-grade" category alongside LangGraph. Key context:
- Backed by Accenture, Anthropic, Langfuse, Mem0, Meta, PwC, Ragas.io, Tavily
- Production deployments: Amazon Q Developer, AWS Glue, VPC Reachability Analyzer
- Deploys to Lambda, Fargate, EKS, Bedrock AgentCore, Docker, Kubernetes, Terraform

### Anthropic Captures 40% Enterprise LLM Spend

Anthropic now accounts for **40% of enterprise LLM spend** — up from 12% two years ago. OpenAI has dropped from ~50% to ~25% market share. Claude models are the default choice for compliance-sensitive enterprise workloads.

### A2A Protocol: 150+ Orgs in Production

Google's Agent-to-Agent (A2A) protocol is live in production at 150+ organizations as of April 2026. It's now embedded natively in Google Cloud, Microsoft Azure AI Foundry, and AWS Bedrock AgentCore Runtime.

- **MCP**: 10,000+ enterprise servers; 97M+ SDK downloads — the standard for agent-to-tool connectivity
- **A2A**: Agent-to-agent delegation and coordination — complements MCP

Together: MCP (vertical, tool access) + A2A (horizontal, agent coordination) = complete protocol stack for distributed agent systems.

---

## This Month's Fastest-Rising Enterprise Repos

| Repo | License | Signal | Why Trending |
|------|---------|--------|--------------|
| [strands-agents/sdk-python](https://github.com/strands-agents/sdk-python) | Apache-2.0 | 16.7M downloads/month | AWS production SDK reaching critical mass; Accenture+PwC as contributors signals GSI adoption |
| [google/adk-python](https://github.com/google/adk-python) | Apache-2.0 | July 7 breaking-changes release | Active development; multi-language; Gemini Enterprise Agent Platform backend |
| [microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) | MIT | EU AI Act countdown | 21 days to Aug 2 enforcement; only open-source tool covering all 10 OWASP Agentic AI risks |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Apache-2.0 | 73k+ ★ | 2,596% YoY; enterprise RAG standard for compliance-grounded answers |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 34.5M downloads/month | Still the production graph-orchestration default; steady climb |
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | ~148k ★ | #1 LLM platform by stars; visual + RAG + LLMOps in one |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Fair-code | ~189k ★ | Legacy-to-AI integration layer; MCP native; growing enterprise adoption |

---

## Shadow AI: The Emerging Enterprise Risk

Research from the Cloud Security Alliance (2026) reveals that **82% of enterprises already have AI agents or workflows their security teams did not know existed**. This "shadow AI" phenomenon is accelerating because:

1. Business units are deploying agents with n8n, Dify, or no-code tools without IT review
2. Developers are using personal API keys to run agents against production data
3. MCP servers connect agents to enterprise systems without formal change control

**Implication for Globant**: When entering an enterprise engagement, audit for shadow AI before designing the governance architecture. Use the Agent Governance Toolkit to enforce visibility.

---
*Auto-updated by ingest pipeline — v4 2026-07-12*
