# Composition Patterns — Technology

> Concrete recipes combining specific repos + agents + infrastructure for technology industry solutions.
> Last updated: 2026-07-11 (v8)

```
[Open source platform (Gitea / Backstage / Dify / OpenTofu)]
          ↓
[MCP Server layer (Context7 + GitHub MCP + custom MCP)]
          ↓
[Agent orchestration (OpenHands / LangGraph / CrewAI)]
          ↓
[Delivery layer (VS Code Cline / Claude Code / Goose)]
          ↓
[Client: faster code, fewer incidents, autonomous DevOps]
```

---

## Pattern P1 — Autonomous Code Review Pipeline

**Use case**: Replace manual PR code review with AI agents; reduce review latency from 24h to <15 min.

**Stack**:
- **Gitea** (MIT) — self-hosted Git forge emitting PR webhooks
- **Claude Code Security Review** (MIT, Anthropic) — GitHub Action / Gitea runner
- **LangGraph** (MIT) — stateful review graph: [Fetch PR] → [Security Scan] → [Logic Review] → [Style Check] → [Human Gate for fails]
- **Context7 MCP** (MIT) — inject current library docs into reviewer context
- **Mattermost** (Apache-2.0) — post review findings to team channel

**Architecture**:
```
PR opened in Gitea
  → Webhook triggers LangGraph review pipeline
  → LangGraph calls Claude with Context7 MCP (up-to-date docs)
  → Security agent: claude-code-security-review patterns
  → Logic agent: check business logic correctness
  → Style agent: enforce coding standards from DESIGN.md
  → If critical findings: block PR + alert Mattermost
  → If pass: auto-approve + post summary comment
```

**Estimated effort**: 3-4 weeks | **Target price range**: $40k-120k | **Repeatable template**: Yes

---

## Pattern P2 — Self-Hosted AI Coding Suite (On-Prem)

**Use case**: Enterprise with data residency requirements (LATAM LGPD, EU GDPR) that cannot use cloud AI services. Deploy full AI coding stack on-prem.

**Stack**:
- **Ollama** (MIT) — local LLM runtime; run DeepSeek-Coder-V2, CodeLlama-34B
- **Tabby** (Apache-2.0) — self-hosted AI coding server; OpenAPI compatible, serves VS Code extension
- **OpenHands** (MIT) — autonomous agent platform; connects to local Ollama models via OpenAI-compatible API
- **Dify** (MIT) — workflow orchestration; visual builder for non-technical managers
- **Continue** (Apache-2.0) — VS Code extension connecting to Tabby + OpenHands

**Architecture**:
```
Developer in VS Code
  → Continue extension → Tabby (autocomplete) via local Ollama model
  → Complex tasks → OpenHands agent (sandboxed Docker)
  → OpenHands → Ollama (DeepSeek/CodeLlama) for inference
  → Dify workflows for automated tasks (release notes, PR summaries)
  → All traffic stays within enterprise network
```

**Estimated effort**: 4-6 weeks | **Target price range**: $60k-200k | **Value prop**: GDPR/LGPD compliance + no vendor LLM costs at scale

---

## Pattern P3 — Internal Developer Portal with AI Layer

**Use case**: Replace manual service catalog + documentation with an AI-powered IDP that developers can query conversationally.

**Stack**:
- **Backstage** (Apache-2.0) — developer portal framework; software catalog, TechDocs, scaffolder
- **Dify** (MIT) — RAG pipeline over TechDocs + Backstage catalog data
- **LangGraph** (MIT) — multi-turn conversation agent with memory
- **Context7 MCP** (MIT) — up-to-date dependency docs in responses
- **GitHub MCP** (MIT) — real-time repo + PR context

**Architecture**:
```
Developer queries: "How do I integrate service X with service Y?"
  → Backstage AI plugin → Dify RAG pipeline
  → Dify: embed TechDocs + catalog → vector search → retrieve relevant docs
  → LangGraph: multi-turn conversation with retrieved context
  → Context7 MCP: inject current library API docs
  → GitHub MCP: pull current code examples from related repos
  → Response: step-by-step guide with real code + links to services
```

**Estimated effort**: 6-8 weeks | **Target price range**: $80k-250k | **Repeatable**: Yes — template per Backstage installation

---

## Pattern P4 — AI-Powered IaC Generator

**Use case**: Enable developers to generate, validate, and deploy infrastructure from natural language descriptions. Reduce IaC authoring time by 70%.

**Stack**:
- **OpenTofu** (MPL-2.0) — Terraform-compatible IaC execution engine
- **OpenHands** (MIT) — autonomous agent that writes, validates, and plans OpenTofu code
- **Prometheus** (Apache-2.0) — cost and resource monitoring post-deployment
- **Dify** (MIT) — user-facing natural language interface
- **Woodpecker CI** (Apache-2.0) — pipeline execution for plan → review → apply

**Architecture**:
```
User: "Create a multi-region AWS setup for a Node.js API with RDS"
  → Dify captures intent + extracts parameters
  → OpenHands agent: writes OpenTofu .tf files in sandbox
  → OpenTofu: plan (dry-run) → output shown to user for approval
  → Human approval gate (LangGraph interrupt node)
  → Woodpecker CI: apply + state management
  → Prometheus: post-deploy cost monitoring alert if over budget
```

**Estimated effort**: 5-7 weeks | **Target price range**: $70k-200k | **LATAM relevance**: Adapts to AWS sa-east-1 and Azure Brazil South

---

## Pattern P5 — Multi-Agent Software Delivery Crew

**Use case**: Automate an entire feature delivery cycle from ticket to merged PR using a team of specialized AI agents.

**Stack**:
- **CrewAI** (MIT) — multi-agent orchestration; role-based agent crew
- **OpenHands** (MIT) — implementation agent (writes actual code)
- **Aider** (Apache-2.0) — git-integrated refinement agent
- **Cline** (Apache-2.0) — VS Code verification + browsing agent
- **Gitea** (MIT) — target repository + PR management
- **Plane** (AGPL-3.0) — ticket source (Jira alternative)

**Architecture**:
```
Plane ticket: "Add OAuth2 login to user service"
  → CrewAI crew initiates:
    ├─ Architect Agent: designs solution, creates ADR
    ├─ Implementer (OpenHands): writes code in Docker sandbox
    ├─ Test Agent (Aider): writes unit + integration tests
    ├─ Reviewer Agent: runs claude-code-security-review
    └─ PR Agent: creates PR in Gitea with full description
  → Human gate: engineer reviews + approves
  → Cline: verifies in browser if feature has UI component
  → Merge on approval
```

**Estimated effort**: 8-12 weeks | **Target price range**: $100k-350k | **Biggest win**: Reduces feature cycle from days to hours

---

## Pattern P6 — AIOps Incident Response Agent

**Use case**: Automate incident detection, root cause analysis, and first-response actions to reduce MTTR by 60%.

**Stack**:
- **Prometheus** (Apache-2.0) — metrics + alerting
- **Mattermost** (Apache-2.0) — incident channel + notifications
- **LangGraph** (MIT) — stateful incident workflow with human escalation
- **OpenHands** (MIT) — remediation actions (restart service, scale, rollback)
- **Goose** (Apache-2.0) — secondary agent for log analysis + context gathering
- **Argo CD** (Apache-2.0) — GitOps rollback execution

**Architecture**:
```
Prometheus alert: "Error rate >5% on payment-service"
  → LangGraph incident graph starts:
    ├─ Goose: pull logs from last 30min, correlate with recent deploys
    ├─ LangGraph: classify incident (regression vs. spike vs. infra)
    ├─ If regression: OpenHands → Argo CD GitOps rollback to last good deploy
    ├─ If spike: OpenHands → scale out service replicas
    ├─ If unknown: page on-call via Mattermost with full RCA context
  → All actions logged to audit trail
  → Post-incident: auto-generate incident report in TechDocs
```

**Estimated effort**: 4-6 weeks | **Target price range**: $50k-150k | **ROI**: Each hour MTTR reduction = $50k-500k saved (depends on client revenue)

---

## Pattern P7 — Spec-Driven AI Development Workflow

**Use case**: Improve reliability of AI-generated code by anchoring to formal specs before generation. Addresses correctness and security in agentic code.

**Stack**:
- **Spec-kit** (MIT, GitHub) — spec authoring toolkit
- **LangGraph** (MIT) — spec → code → validate cycle management
- **OpenHands** (MIT) — code generation agent
- **Continue** (Apache-2.0) — developer feedback loop inside VS Code
- **claude-code-security-review** (MIT) — security gate post-generation

**Architecture**:
```
1. Spec phase: developer writes OpenAPI/JSON Schema/ADR spec using Spec-kit templates
2. Generation: LangGraph pipeline → OpenHands generates code matching spec
3. Validation: auto-run spec conformance tests (schema validation, contract tests)
4. Security gate: claude-code-security-review scans generated code
5. Feedback: Continue extension shows diff + spec match score in VS Code
6. Iteration: if score < threshold, re-generate with refined spec
7. Merge: only code passing spec + security gates advances
```

**Estimated effort**: 6-8 weeks | **Target price range**: $80k-220k | **Key differentiator**: Spec-first AI development is a defensible methodology IP for Globant

---

## Pattern P8 — LATAM Compliance-Ready AI Dev Platform

**Use case**: Packaged solution for LATAM enterprises (Brazil, Argentina, Colombia) requiring LGPD/local data residency + Spanish-language tooling.

**Stack**:
- **Ollama** (MIT) — on-prem LLM inference (no data leaves datacenter)
- **Tabby** (Apache-2.0) — self-hosted coding server
- **Dify** (MIT) — Spanish-language interface + local knowledge base
- **OpenHands** (MIT) — autonomous agent with Ollama backend
- **Context7 MCP** (MIT) — adapted for Spanish docs and LATAM frameworks

**LATAM additions**:
- Custom MCP server exposing Spanish Stack Overflow, MVPs Brasil, Mercado Pago/PIX APIs
- OpenTofu modules pre-configured for AWS sa-east-1 + Azure Brazil South
- Compliance audit trail adapter for Brazilian ANPD reporting

**Estimated effort**: 10-14 weeks | **Target price range**: $120k-350k | **LATAM first-mover advantage**: No comparable OSS offering exists as of Jul 2026

---
*See also: `verticals/solutions.md` for platform options and `agents/top.md` for agent details.*
