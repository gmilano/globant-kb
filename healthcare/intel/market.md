# 🗺️ Market Map — Healthcare AI

> Key players, market sizing, positioning. Focus: LATAM + global.
> Last updated: 2026-07-11

## Market Sizing

| Segment | 2026 Value | 2030-2035 Forecast | CAGR | Source |
|---------|------------|-------------------|------|--------|
| AI Healthcare (total) | ~$50–100B | $505.6B (2033) | 38.9% | Multiple analysts |
| Agentic AI in Healthcare | $1.14B | $33.66B (2035) | 45.6% | Towards Healthcare 2026 |
| Agentic AI alt. forecast | $1.03B | $5.78B (2031) | 42.0% | Research & Markets |
| Ambient Clinical Intelligence | $37.2B | $91B+ (2030) | ~20% | Industry analysts |

## Adoption Metrics (2026)

- **80%** of healthcare executives expect agentic AI to deliver moderate-to-significant value in 2026 (Deloitte)
- **61%** already building/implementing agentic AI or have secured budget
- **43%** currently piloting or testing — only **3%** deployed in live clinical workflows
- **85%** plan to increase AI investment over next 2-3 years
- **98%** expect at least 10% cost savings from agentic AI
- **68%** of healthcare organizations already use some AI agents
- **600+** health systems using Microsoft DAX Copilot ambient AI scribe
- **60+ min/day** saved per physician using ambient AI scribes
- **$150B/year** in potential US healthcare savings from AI
- **$1.5T/year** in US administrative waste — the primary AI opportunity

## Key Players

### Big Tech

| Player | Product/Initiative | Key Move (2026) |
|--------|-------------------|-----------------|
| Google | Med-Gemini, MedGemma (open-weight), Health AI Developer Foundations | HIMSS 2026: "moving beyond static records to agentic healthcare era." Highmark Health $27.9M ROI across 74 AI use cases. |
| Microsoft | Nuance DAX Copilot, Azure Health Data Services | 600+ health systems on DAX Copilot. Epic native integration GA. Healthcare cloud with HIPAA data residency. |
| Amazon | AWS HealthLake, Bedrock for healthcare | HealthLake as FHIR data layer for AI pipelines. |
| Oracle | Oracle Health (Cerner) | AI-native EHR roadmap; competing with Epic on agentic documentation. |
| Anthropic | Claude for healthcare (via partners) | BCG + Hippocratic AI partnership announced. Clinical AI agent deployment at scale. |

### Enterprise Healthcare AI

| Player | Focus | Note |
|--------|-------|------|
| Hippocratic AI | Enterprise patient voice agents | 180M+ clinical interactions, 60+ enterprise partners, 1,000+ use cases. Non-diagnostic patient-facing tasks. |
| Epic | AI Assistant in EHR | Ambient AI scribe + clinical decision support natively in Epic. Partnership with Nuance/Microsoft. |
| Nuance (Microsoft) | DAX Copilot (ambient scribe) | Market leader in ambient clinical intelligence. Integrated with Epic + Oracle Health. |
| Tempus AI | Oncology research + clinical decision support | AI-powered cancer genomics + clinical trial matching. |
| Abridge | Ambient documentation | Competing with Nuance DAX. Used at large academic medical centers. |

### Open Source Ecosystem Leaders

| Project | Organization | Focus |
|---------|-------------|-------|
| OpenMRS | OpenMRS Community (NGO) | Medical records, 40+ countries, ~36M patients |
| Medplum | Medplum Inc. (Apache) | FHIR-native developer platform |
| OpenEMR | OpenEMR Project | Clinic EHR, 100+ countries |
| HAPI FHIR | Smile Digital Health (Apache) | Java FHIR standard implementation |
| TxAgent | Harvard MIMS (MIT) | Drug safety & therapeutic reasoning |

## ROI Evidence

| Organization | Use Case | Result |
|--------------|----------|--------|
| Highmark Health | 74 AI use cases (Google Cloud) | $27.9M estimated ROI |
| Mass General Brigham | DAX Copilot ambient scribe | 60+ min/day saved per physician |
| Mount Sinai | Agentic AI workflows | Streamlined workflows, reduced burnout |
| Mayo Clinic | AI diagnostics + workflow automation | Personalized care, earlier disease detection |
| Prior Auth use case (industry avg) | Agentic PA automation | 2-3 day wait → same-day completion |

## Globant Positioning

### Strengths
- Strong LATAM presence where OpenMRS/Bahmni/GNU Health are widely deployed — AI-augmentation opportunity without EHR replacement
- Full-stack development capability to build FHIR-native AI layers on top of existing systems
- Experience with LangGraph, CrewAI, AutoGen — applicable to healthcare multi-agent architectures
- Can build HIPAA-compliant systems using MedGemma (on-prem) or Claude via AWS HealthLake

### Recommended Entry Points
1. **Ambient AI Scribe** — build a DAX Copilot alternative on open stack (Whisper + medspacy + Claude) for mid-market health systems not on Epic
2. **LATAM OpenMRS AI** — add AI triage, drug safety, and clinical decision support to existing OpenMRS deployments (Bolivia, Peru, Nicaragua clients)
3. **Prior Authorization Agent** — highest near-term ROI, underserved by open source, pure integration play on Medplum + LLM
4. **Radiology AI Pipeline** — MedRAX + Orthanc + HAPI FHIR for hospitals with radiology departments

### Competitive Moat
Globant's position is differentiated vs. Accenture/Deloitte by: (1) open source foundation reduces cost/vendor lock-in for clients, (2) LATAM expertise where big SI firms have less depth, (3) ability to build rapidly on top of MIT/Apache stacks.

---
*Updated by ingest pipeline.*
