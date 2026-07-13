# 📈 Trending Agents — Healthcare

> What's new and gaining momentum this week.
> Last updated: 2026-07-13 (v12)

## Breaking This Week

### HealthBench Professional Launch (OpenAI, July 2026)
OpenAI launched **ChatGPT for Clinicians** alongside **HealthBench Professional** — a benchmark evaluating AI on authentic clinician tasks (diagnosis, treatment recommendation, patient communication). This has become the de-facto evaluation standard for clinical AI deployments. Health systems and vendors now compare hallucination rates, safety margins, and clinical guideline adherence before deployment.

### PhysicianBench + PhysAssistBench Wave (June–July 2026)
Two new benchmarks from Stanford HealthRex and collaborators are setting the 2026 standard:
- **PhysicianBench** (arXiv 2605.02240): 100 long-horizon tasks in real EHR via FHIR APIs, 21 specialties, 670 sub-checkpoints. Shows current agents struggle with multi-step clinical reasoning.
- **PhysAssistBench** (arXiv 2606.18613): The only benchmark covering implicit queries, patient interaction, FHIR tool use, and multi-turn evaluation simultaneously.

### Agentic AI Adoption Surge (Q2 2026)
- 68% of healthcare organizations now using AI agents (up from ~40% in 2025)
- Mount Sinai and Mayo Clinic leading enterprise deployments of multi-agent clinical systems
- 42% reduction in documentation time reported with ambient AI scribes + agentic summarization

## Top Repos by Momentum (July 2026)

| Repo | License | Why Trending | Stars |
|------|---------|-------------|-------|
| [openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | On-device clinical AI — HIPAA compliance without cloud risk. Growing with EU AI Act enforcement. | ~4k |
| [MDAgents](https://github.com/mitmedialab/MDAgents) | MIT | Deloitte cited as production-ready in 2026 healthcare AI report. Enterprise validation wave. | ~900 |
| [MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) | MIT | Published in NEJM AI — clinical credibility drives adoption as eval harness | ~400 |
| [PhysicianBench](https://github.com/HealthRex/PhysicianBench) | MIT | New June 2026 paper, immediate traction in academic + enterprise eval circles | ~180 |
| [EHRAgent](https://github.com/wshi83/EhrAgent) | MIT | Renewed interest as EHR integration becomes the #1 enterprise AI priority | ~550 |
| [Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) | CC-BY | Go-to index for healthcare AI teams starting new projects | ~1.2k |
| [openmed-agent](https://github.com/openmed-labs/openmed-agent) | MIT | Terminal-first clinical AI workspace filling gap between chatbots and full EHR integration | ~200 |
| [care_fe](https://github.com/ohcnetwork/care_fe) | MIT | Digital Public Good for healthcare delivery — LATAM + India deployments accelerating | 611 |

## Emerging Papers to Watch (June–July 2026)

| Paper | Key Contribution |
|-------|-----------------|
| [ClinEnv](https://arxiv.org/pdf/2606.02568) | Interactive Multi-Stage Long Horizon EHR Environment for Agents — new simulation testbed |
| [EHR-Complex](https://arxiv.org/pdf/2606.23301) | Benchmarking Medical Agents for Complex Clinical Reasoning — shows 35-50% agent accuracy vs 85% clinician |
| [MedBeads](https://arxiv.org/pdf/2602.01086) | Agent-Native, Immutable Data Substrate for Trustworthy Medical AI — auditability + provenance layer |
| [HealthAdminBench](https://arxiv.org/pdf/2604.09937) | Computer-Use Agents on Healthcare Administration Tasks — 70%+ automation rate for scheduling/billing |
| [AgentRx](https://chil2026.org) | Benchmark of LLM agents for multimodal clinical prediction tasks — presented at CHIL 2026 |

## Strategic Signals for Globant

1. **EHR integration is the moat**: Clients want AI that reads/writes Epic/Oracle via FHIR — `EHRAgent` + HAPI FHIR is the stack.
2. **Evaluation-first sales cycle**: No health system buys without HealthBench / PhysicianBench scores — build eval harnesses early.
3. **On-device is a wedge**: `openmed` (Apache-2.0) enables HIPAA-compliant AI demos without any cloud data exposure — perfect for pilot engagements.
4. **Multi-agent orchestration**: Single-LLM calls won't pass clinical muster; MDAgents pattern (adaptive collaboration) is becoming the standard.

---
*Auto-updated by the ingest pipeline.*
