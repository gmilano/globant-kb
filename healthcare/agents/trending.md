# 📈 Trending AI Agents — Healthcare

> What's new and gaining traction this week in healthcare AI. Updated: 2026-07-11

## Hot This Week

### 1. TxAgent v2 — Therapeutic Reasoning at Scale
- **Repo**: [mims-harvard/TxAgent](https://github.com/mims-harvard/TxAgent) — MIT
- **Why now**: NeurIPS CURE-Bench competition winner. 92.1% accuracy on open-ended drug reasoning. ToolUniverse companion repo crossed 1.2k stars this month.
- **Signal**: Harvard MIMS + Microsoft Health partnership announced. Being integrated by major EHR vendors for real-time drug safety checking.
- **Globant angle**: Build a FHIR-integrated drug safety layer on top of TxAgent — plug into OpenEMR or Medplum for a production-ready safety agent.

### 2. MedRAX — ICML 2025 Radiology Agent
- **Repo**: [bowang-lab/MedRAX](https://github.com/bowang-lab/MedRAX) — Apache-2.0
- **Why now**: Published at ICML 2025, fast-growing since. First agent that unifies chest X-ray analysis (CheXagent, MedSAM, LLaVA-Med, Maira-2, DenseNet-121) under a single reasoning agent.
- **Signal**: MedRAX.org launched; hospital radiology dept pilots underway.
- **Globant angle**: Drop-in radiology AI layer on top of Orthanc DICOM + HAPI FHIR for hospital clients in LATAM.

### 3. Ambient AI Scribes Crossing the Adoption Tipping Point
- **What**: Microsoft DAX Copilot (Nuance) deployed in 600+ health systems. Physicians save 60+ minutes/day. Open source alternatives like Whisper + LLM pipelines gaining traction.
- **Signal**: Healthcare Brew reports ambient AI scribe is "becoming table stakes." Mass General Brigham, Mount Sinai, Vanderbilt all on DAX Copilot.
- **Open source stack**: OpenAI Whisper → medspacy NER → Claude/Haiku SOAP generation → FHIR write. Buildable in 4-6 weeks.
- **Globant angle**: White-label ambient scribe built on open stack — competitive vs DAX Copilot for mid-market health systems.

### 4. Agentic Prior Authorization
- **What**: Prior auth that took 2-3 days can now be completed same-day with LLM agents.
- **Signal**: BCG report (Dec 2025) highlights this as the highest-ROI near-term healthcare AI use case. $1.5T/year US admin waste opportunity.
- **Stack**: Medplum FHIR + coverage rules + LLM agent + payer API → auto PA workflow.

### 5. Google MedGemma Open-Weight Models (Health AI Developer Foundations)
- **URL**: [developers.google.com/health-ai-developer-foundations/medgemma](https://developers.google.com/health-ai-developer-foundations/medgemma)
- **Why now**: Google released MedGemma as open-weight models for health AI development — enables on-premise clinical AI without cloud dependency.
- **Signal**: Featured at HIMSS 2026 — "moving beyond static digital records into the agentic healthcare era."
- **Globant angle**: Use MedGemma as the base LLM for HIPAA-compliant on-prem deployments in hospitals that can't use cloud APIs.

### 6. FHIR-Native Platforms Taking Over from Legacy EHRs
- **What**: Medplum (Apache-2.0), Ottehr (Apache-2.0) growing fast as FHIR-native alternatives to Epic/Cerner.
- **Signal**: Medplum at 2.5k+ stars; used by digital health startups as their EHR backbone.
- **Why matters**: FHIR-native = AI-ready by default. No expensive integration work needed.

## Benchmark Watch

| Benchmark | Repo | What It Tests |
|-----------|------|---------------|
| MedAgentBench | [stanfordmlgroup/MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) | LLM agents in realistic virtual EHR environments |
| MedMemoryBench | arXiv 2026 | Agent memory in personalized healthcare longitudinal tasks |
| ABRA | arXiv 2026 | AI agents for radiology applications |
| AgentRx | arXiv 2026 | Multimodal clinical prediction tasks |
| CURE-Bench (NeurIPS) | NeurIPS 2025 | Drug interaction & therapeutic reasoning agents |

## Regulatory Pulse (2026)

- **Jan 2026**: FDA published new guidance reducing oversight for certain digital health products (including AI-enabled software and wearables) — lowers compliance barrier for AI agents.
- **Jan 2026**: EMA + FDA jointly published 10 Key Guiding Principles for Good AI Practice — international convergence.
- **Aug 2026**: EU AI Act enforcement — AI used in clinical decision support classified as "high-risk." Full AI governance required.

---
*Pipeline auto-updated every hour.*
