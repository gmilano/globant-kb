# Trends — Healthcare AI

> Current signals and emerging patterns. Version: v5 — Updated: 2026-07-14

## Key Trends (2026)

### T1 — Agentic AI for Revenue Cycle (RCM Automation)
The $21.49B AI-in-RCM segment is the fastest-moving. Waystar (Jan 2026) launched agentic AI targeting a fully autonomous revenue cycle. Oracle Health Clinical AI Agent delivering ~30% reduction in physician documentation time. 20.8% market share for RCM in the agentic AI healthcare segment. Globant entry: build on OpenEMR + agentic RCM layer.

### T2 — FHIR-MCP: MCP Protocol Replacing Custom Integrations
CMS-0057-F interoperability mandate (effective 2026-2027) requires FHIR APIs at all payers + providers. MCP servers for FHIR (xSoVx/fhir-mcp) now let any LLM query clinical records with PHI protection + audit logs. The awesome-healthcare-mcp-servers curated list is growing weekly. Standard pattern: FHIR-MCP server → Claude → clinical workflow automation.

### T3 — Local-First Medical AI (HIPAA by Design)
OpenMed (Apache-2.0, Jun 2026): 1,500+ medical models, 340M downloads, runs on-device. The "no PHI to cloud" architecture is becoming a procurement requirement. NVIDIA NemoClaw wraps enterprise models with PHI-stays-local guarantee (GTC 2026). Pattern: on-device NER/de-id → sanitized data → cloud LLM reasoning.

### T4 — Benchmark Gap: Agents Still Fail 72% of Clinical Tasks
CHI-Bench (arXiv:2605.16679, May 2026): Best frontier agent fails 7 out of 10 real healthcare workflows. PhysicianBench: best agents complete only 28% reliably on real FHIR EHRs. This 72% failure rate is a Globant opportunity: custom orchestration + domain fine-tuning + clinical safety layers overcome the gap.

### T5 — Multi-Agent Safety Layers for Clinical Outputs
MedGuards (arXiv:2606.25651, Jun 2026): Multi-agent error detection and correction without base LLM retraining. Confidence-guided arbitration between detect/localize/correct agents. ClinSeekAgent improves Claude on chest X-ray tasks by +15.1 F1. The trend: agents wrapping agents for clinical safety (detect → correct → verify pattern).

### T6 — TEFCA at 1 Billion Exchanges (HHS Jul 2026)
From 10M to 1B FHIR exchanges in <1 year. HHS $1.3M TEFCA oversight. SSA joined TEFCA → disability claim processing 50%+ faster. The interoperability plumbing is now in place; agentic workflows can leverage TEFCA-routed data nationwide (US) → opens enterprise-scale clinical data access for AI.

### T7 — Drug Discovery AI: 46% Top ROI (NVIDIA Survey)
NVIDIA 2026 survey (600+ professionals): 46% identify drug discovery as top AI ROI area. 85% report higher revenue, 80% lower costs from AI. MONAI + NVIDIA Proteina-Complexa validate 1M+ protein binders. Fiocruz LATAM context for drug discovery partnerships.

### T8 — Federated Learning Across Hospital Sites
MONAI federated learning: multiple hospital sites train shared model without sharing patient data. Critical for HIPAA compliance in multi-site deployments. NVIDIA NemoClaw integrates federated patterns at enterprise scale.

### T9 — OpenMed: 12-Language Medical NLP for LATAM
Spanish + Portuguese clinical NLP models available on-device. 1,500+ open models. LATAM clinical text processing without PHI leaving local infrastructure. Key differentiator for Brazil LGPD compliance and LATAM hospital engagements.

### T10 — Agentic AI for Clinical Documentation (30% Time Savings)
Oracle Health Clinical AI Agent: ~30% reduction in daily documentation. Nuance DAX Express, Suki, Nabla doing ambient documentation. Open-source path: Medplum + OpenMed + Claude (via FHIR-MCP) replicates commercial doc AI at fraction of cost.

### T11 — MedBeads: Agent-Native Data Infrastructure (Feb 2026)
arXiv:2602.01086. Proposes replacing FHIR-for-humans with immutable Merkle DAG "Beads" designed for AI agents. Solves context mismatch (RAG hallucinations from fragmented EMR data). Go Core + Python/LLM middleware. Early-stage research but points to long-term EHR re-architecture.

### T12 — Multimodal Clinical Agents: EHR + Imaging + Voice
ClinSeekAgent (arXiv:2605.20176): queries medical KBs + navigates EHRs + invokes imaging tools in one agent loop. Growing pattern: multimodal clinical agents vs single-modality tools. AgentClinic benchmark validates multimodal tool-use agents. MONAI provides the imaging inference layer.

### T13 — 80%+ Executives Expect Agentic Value in 2026
Deloitte: over 80% of health executives expect both agentic and gen AI to deliver moderate-to-significant value in 2026 across clinical, business, and back-office. Mount Sinai and Mayo Clinic cited as early adopters of agentic AI in clinical workflows.

### T14 — HIPAA-Analog Compliance Pressure in LATAM
Brazil LGPD (Lei Geral de Proteção de Dados) + LGPDS (health data) requirements mirror HIPAA for patient data. OpenMed on-device inference pattern addresses LGPD by design. Medplum has HIPAA compliance that maps to LGPD. Globant positioning: LGPD-by-design healthcare AI for Brazil market.

### T15 — NemoClaw Enterprise HIPAA (prev v4 signal, still active)
NVIDIA NemoClaw (GTC 2026, Apache-2.0): enterprise wrapper for OpenClaw, PHI stays on Nemotron local, reasoning to Claude. HIPAA-by-design. Unblocks US large hospital deals for enterprise AI vendors.

---
*Auto-updated by ingest pipeline — v5.*
