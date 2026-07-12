# Trending Legal AI — Week of 2026-07-12

> What's new and gaining momentum in legal AI this week.
> Last updated: 2026-07-12 (v11)

## Breaking: Lavern Goes Viral (May–July 2026)

[AnttiHero/lavern](https://github.com/AnttiHero/lavern) — Apache 2.0 — **~2.1k stars** (was 267 on 2026-07-02, now 2.1k+).
The open-source agentic "law firm" exploded after coverage in Artificial Lawyer (May 20, 2026) and LawNext (June 2026). Key architecture: 67 specialist agents organized into 8 workflows with debate-style verification. LawNext described it as "powerful, fun, and free." Growing ~200 stars/week.

## New This Week

| Repo | License | Stars | What's New |
|------|---------|-------|------------|
| [agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) | MIT | ~3.2k | Microsoft released April 2, 2026 — full OWASP Agentic Top 10 coverage, EU AI Act checklist. Now trending as Aug 2026 deadline approaches. |
| [eu-ai-act-toolkit](https://github.com/abdelstark/eu-ai-act-toolkit) | Apache-2.0 | ~420 | Rapid growth as August 2, 2026 EU AI Act high-risk obligations become effective. Compliance deadline driving adoption. |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | ~1.4k | MCP server integration added — now exposes document corpus to any MCP-compatible agent (Claude, Copilot, Cursor). Growing with MCP ecosystem. |
| [awesome-legal-skills](https://github.com/lawve-ai/awesome-legal-skills) | MIT | ~180 | New agent skills added for LATAM tax compliance (IBS/CBS Brazil reform) and GDPR/EU AI Act auditing. |
| [LLM-and-Law](https://github.com/Jeryi-Sun/LLM-and-Law) | MIT | ~890 | 12 new papers added in June 2026 covering agentic legal reasoning benchmarks and multi-jurisdiction compliance. |

## Key Signals This Week

- **EU AI Act D-Day approaching**: August 2, 2026 obligations for high-risk AI are driving a rush of compliance tooling. The `agent-governance-toolkit` and `eu-ai-act-toolkit` are seeing 3x normal traffic.
- **MCP as legal infrastructure**: OpenContracts' MCP server is positioning document intelligence as a first-class MCP resource. Multiple agents can now "tool-call" into a legal document corpus.
- **Lavern architecture study**: Multiple teams forking Lavern to extract specific agents (contract analyst agent, regulatory checker agent) as standalone modules.
- **LATAM legal tech**: Brazil's Reforma Tributária (IBS/CBS transition) driving new specialized agents for regional compliance. `Consultor-Tributario-AI` and similar repos gaining traction in Brazil.
- **Corporate adoption**: Legal AI adoption doubled (23% → 52%) in 2025; 2026 pace suggests 75%+ by year-end.

## Active Discussion Topics

- Can Lavern's 67 agents be decomposed into a reusable skill library (→ `awesome-legal-skills`)?
- OpenContracts + MCP: using legal document graphs as tool-callable context for frontier models
- EU AI Act Article 14 (human oversight) — how to implement it in agentic legal workflows
- `agent-governance-toolkit`'s Agent OS as a compliance layer for any legal AI deployment

---
*Pipeline auto-update — refreshed each run.*
