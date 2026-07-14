# Trending This Week — Healthcare AI

> Version: v5 — Updated: 2026-07-14
> New signals since v4 (2026-07-09)

## New Benchmarks & Research (June–July 2026)

### CHI-Bench — "72% Failure Rate" Signal (May 2026)
**arXiv:2605.16679 | github.com/actava-ai/chi-bench | MIT**

The most important healthcare AI benchmark of 2026. Built by a 20+ institution coalition (Johns Hopkins, Wellstar, Yale, Stanford, CMU, Oxford, USC):
- 75 end-to-end workflows: prior authorization, utilization management, care management
- 87 MCP tools exposing a full simulated healthcare application stack
- 1,290+ document managed-care operations handbook as agent skill
- **Best frontier agent (across 30 from Anthropic, OpenAI, Google, xAI, DeepSeek) fails 7/10 tasks**

Why it matters: clients deploying GPT/Claude directly to clinical workflows will see ~28% success. Custom orchestration = the differentiator.

### PhysicianBench — Real EHR Clinical Agent Evaluation (May 2026)
**arXiv:2605.02240 | github.com/HealthRex/PhysicianBench | MIT**

Stanford HealthRex benchmark grounded in real patient records via FHIR APIs:
- 100 tasks, 670 sub-checkpoints, 21 clinical specialties
- 12 LLM agents evaluated; best = 46% task completion, 28% reliable
- Reviewed by independent physician panels

### ClinSeekAgent — Multimodal Evidence Seeking (May 2026)
**arXiv:2605.20176 | UC Santa Cruz VLAA | Apache-2.0**

Agentic framework for dynamic multimodal clinical reasoning:
- Queries medical KBs, navigates EHRs, invokes imaging tools
- Claude Opus: 47.5 → 62.6 F1 on CXR tasks (+15.1 pts)
- Also trains compact open-source models via trajectory distillation

### MedGuards — Multi-Agent Error Guardrails (June 2026)
**arXiv:2606.25651 | github.com/congboma/MedGuards | MIT**

Specialized agents detect, localize, and correct medical errors in LLM outputs:
- Confidence-guided arbitration resolves agent disagreements
- New eval metric: KPCS (Keyword-Prioritized Correction Score)
- Multilingual, 4 clinical note datasets, no base LLM retraining required

### OpenMed — Local-First 1,500+ Medical Models (June 2026)
**github.com/maziyarpanahi/openmed | Apache-2.0 | 3.4k★**

Launched publicly June 2026. 340M model downloads milestone:
- 1,500+ open medical models (55+ PHI types de-identified)
- iOS/iPadOS/Android via OpenMedKit, React Native, plain CPU, Apple Silicon, GPU
- 12 languages — LATAM coverage for Spanish/Portuguese clinical text

### FHIR-MCP Ecosystem — MCP Servers for Clinical Interop
**github.com/xSoVx/fhir-mcp | Apache-2.0**
**github.com/rdmgator12/awesome-healthcare-mcp-servers | curated list**

Healthcare MCP servers proliferating ahead of CMS-0057-F interoperability mandate (effective 2026-2027):
- FHIR-MCP: secure LLM↔FHIR server bridge with PHI protection + audit logging
- Academic paper: arXiv:2506.13800 — MCP-FHIR framework for clinical decision support + EHR insights

## Market Signals This Week

| Signal | Detail |
|--------|--------|
| Deloitte survey | 80%+ health executives expect agentic AI to deliver value in 2026 |
| Oracle Health | Clinical AI Agent reduces physician documentation time ~30% |
| Waystar (Jan 2026) | Launched agentic AI for autonomous revenue cycle management |
| Agentic AI Healthcare market | $1.83B (2026) → $19.71B (2034), CAGR 34.61% |
| AI Healthcare overall | $36.67B (2026) → $194.79B (2031), CAGR 39.7% |
| AI RCM segment | $21.49B (2026) → $71.27B (2031), CAGR 27.1% |

---
*Auto-updated by ingest pipeline — v5.*
