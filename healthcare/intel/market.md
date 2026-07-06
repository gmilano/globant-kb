# 🗺️ Market Map — Healthcare AI

> Players, opportunities, positioning. LATAM + global focus.
> Last updated: 2026-07-06

## Market Size 2026

| Metric | Value | Source |
|--------|-------|--------|
| Global AI in Healthcare market (2026) | USD $36–56B | GrandView, MarketsAndMarkets, Fortune BI |
| Projected market (2033) | USD $505B | GrandView Research |
| CAGR (2026–2033) | 38.9% | GrandView Research |
| Alt projection (2034) | USD $614B at 44% CAGR | Precedence Research |
| Healthcare execs expecting agentic AI moderate-to-significant value (2026) | >80% | BCG / Deloitte |
| "Healthy Taiwan" NVIDIA+Foxconn agentic AI investment (Jun 2026) | USD $1.5B | NVIDIA press release |
| Clinical AI VC investment (Q1 2026 est.) | ~$3B | CB Insights |

## Global Players

| Company | Type | AI Strength | Weakness |
|---------|------|------------|----------|
| Epic Systems | EHR vendor | AI-powered ambient documentation (Nuance/DAX), AI governance | Proprietary, costly |
| Oracle Health (Cerner) | EHR vendor | Oracle AI integrated, cloud-first, FHIR R4 | Integration complexity, migration pain |
| Microsoft / Nuance | AI layer | DAX Copilot for ambient documentation; Azure Health Data Services; FHIR APIs | Tied to Azure, privacy concerns |
| Google Health | AI platform | Med-PaLM 2 (expert-level USMLE), imaging AI (dermatology, radiology) | Closed models, trust concerns |
| AWS HealthAI | Infrastructure | HealthLake FHIR store, Bedrock for medical AI, Comprehend Medical | Vendor lock-in |
| Tempus AI | Oncology AI | LLM on pathology + genomics + imaging. Listed NYSE 2024. | Oncology-specific, proprietary |
| Philips | Medical devices | Diagnostic imaging AI, patient monitoring, radiology workflow | Hardware-tied |
| Veeva Systems | Life sciences | Clinical data management, drug trial AI, regulatory submissions | Life sciences niche |
| Cohere (enterprise) | AI models | Command R+ for healthcare RAG, on-prem deployment | Less clinical validation |

## Open Source Ecosystem Players

| Player | Role | Key Repos |
|--------|------|----------|
| OpenMRS Community | Global open EMR | openmrs/openmrs-core, bahmni |
| Microsoft (OSS arm) | Clinical AI tools | BioGPT, hi-ml, Healthcare APIs |
| Apache Foundation | Clinical NLP | apache/ctakes |
| HAPI FHIR / Smile Digital Health | FHIR standard | hapifhir/hapi-fhir |
| ohcnetwork (India) | Digital Public Good | ohcnetwork/care, care_fe |
| WHO / PATH / Partners in Health | OpenMRS governance | Global health deployments |
| Stanford CRFM | Biomedical LLMs | BioMedLM, HELM eval |
| Mayo Clinic / University of Utah | Clinical NLP | medspaCy, ctakes contributions |

## LATAM Opportunities

### High-Priority Verticals
1. **Hospital digitization** — 60–70% of Latin American hospitals lack modern EMR/EHR systems. OpenMRS + Bahmni + AI layer is a competitive offer for public health systems (Brazil SUS, Mexico IMSS, Colombia SGSSS).
2. **Telemedicine + AI triage** — High mobile penetration, low physician density. AI-powered symptom checkers + virtual triage agents reduce emergency overload.
3. **Chronic disease management** — Diabetes, hypertension prevalence high. AI-powered care coordination agents (medication adherence, labs tracking) have large TAM.
4. **Medical imaging in under-resourced settings** — Radiology AI (chest X-ray TB detection, diabetic retinopathy screening) where specialists are scarce. torchio + hi-ml + local models.
5. **Clinical documentation in Spanish** — All major clinical NLP tools are English-first. edsnlp has multilingual support. Huge gap for Spanish clinical NLP.
6. **Regulatory compliance** — ANVISA (Brazil), INVIMA (Colombia), COFEPRIS (Mexico) are tightening AI medical device rules. Compliance tooling opportunity.

### Key LATAM Markets
- **Brazil**: SUS (200M patients), ANVISA oversight, strong tech ecosystem in São Paulo
- **Mexico**: IMSS 50M beneficiaries, COFEPRIS oversight, digital health law 2024
- **Colombia**: Mandatory EHR adoption underway, SGSSS reform
- **Argentina**: Post-devaluation, cost-sensitive, high medical education quality → local AI talent

## Globant Positioning

- **Strength**: Healthcare software delivery expertise + AI Studios capability + LATAM presence
- **Play 1**: OpenMRS/Bahmni + agentic AI layer for public health ministries in LATAM
- **Play 2**: FHIR MCP server + LangGraph agentic workflows for US/EU private hospital groups
- **Play 3**: On-device clinical AI (openmed pattern) for HIPAA/LGPD/GDPR-constrained clients
- **Play 4**: Spanish-language clinical NLP — adapt edsnlp + medspaCy for Ibero-American health systems
- **Play 5**: Radiology AI pipelines (torchio + hi-ml) for diagnostic centers in LATAM

---
*Updated by the automated intelligence pipeline.*
