# 🏭 Vertical Solutions — Healthcare (v6)

> Existing platforms customizable with AI. Strategy: start from something functional, add agentic layer on top.
> Last updated: 2026-07-14

## Recommended Platforms

| Platform | License | URL | Stack | AI Use Case |
|----------|---------|-----|-------|-------------|
| **OpenMRS** | MPL-2.0 | [openmrs.org](https://openmrs.org) / [github](https://github.com/openmrs/openmrs-core) | Java + REST + module system | World's largest OSS EHR. Add AI agents via REST API modules: diagnosis suggestion, drug interaction alerts, predictive risk scoring. Strong LATAM (Brazil, Colombia, Peru). |
| **Medplum** | Apache-2.0 | [medplum.com](https://medplum.com) / [github](https://github.com/medplum/medplum) | TypeScript + React + FHIR R4 | Modern FHIR-native platform. SMART on FHIR app ecosystem. Ideal for building AI-augmented clinical apps (care coordination, prior auth automation, patient engagement). |
| **Ottehr** | MIT-style | [ottehr.com](https://ottehr.com) / [github](https://github.com/masslight/ottehr) | TypeScript + FHIR + Photon | FHIR-native open EHR — reduces custom EHR dev time by 95%. Built-in telehealth, scheduling, e-prescribing. Add AI copilots on top of existing workflows. |
| **GNU Health** | GPL-3.0 | [gnuhealth.org](https://gnuhealth.org) | Python + Tryton ERP | Public health & hospital information system. Hospital management + epidemiology + genetics. Strong in Latin America and Africa. Add AI via Python modules. |
| **OpenHIM** | MPL-2.0 | [openhim.org](http://openhim.org) / [github](https://github.com/jembi/openhim-core-js) | Node.js + MongoDB | Health information mediator: routes FHIR messages between systems. AI integration point: intercept transactions, run inference, route results back. |
| **HAPI FHIR Server** | Apache-2.0 | [hapifhir.io](https://hapifhir.io) / [github](https://github.com/hapifhir/hapi-fhir) | Java + Spring Boot | Reference FHIR server. Deploy as AI data backbone. Subscriptions trigger AI agents on patient data changes (new lab result → risk agent). |
| **openmed** | Apache-2.0 | [github](https://github.com/maziyarpanahi/openmed) | Python + Apple MLX | Local-first AI healthcare runtime. HIPAA-compliant. No cloud. 1,000+ medical models. Deploy as on-premise AI layer above any EHR via FHIR export. |
| **Care FE (OHCNetwork)** | MIT | [github](https://github.com/ohcnetwork/care_fe) | React + REST | Digital public good for ICU + ward management. Used in India's COVID response. Add AI: triage automation, deterioration prediction, nursing copilot. |
| **Synthea** | Apache-2.0 | [github](https://github.com/synthetichealth/synthea) | Java | Synthetic patient generator. Not an EHR — generates training data. Use for AI model development without real patient data. |
| **DoliMed (Dolibarr fork)** | GPL-3.0 | [dolibarr.org](https://www.dolibarr.org) | PHP + MySQL | EMR built on Dolibarr ERP. Combines practice management + clinical notes. Small-clinic deployments. Add AI via Dolibarr module API. |

## LATAM-Specific Deployments

| Country | Platform | Notes |
|---------|----------|-------|
| Brazil | OpenMRS + custom | LGPD (Brazil GDPR) requires data residency; openmed on-premise fits |
| Colombia | OpenMRS | SISPRO national health registry integration |
| Mexico | OpenMRS / GNU Health | IMSS integration possible via FHIR gateway |
| Argentina | GNU Health | Hospital systems, public sector deployments |
| Peru | OpenMRS | Community health worker (CHW) mobile apps built on OpenMRS |

## How to Add AI to Any Platform

```
Step 1: FHIR Export Layer
  [EHR] → FHIR R4 API or export → [HAPI FHIR / Medplum] (normalized data store)

Step 2: AI Agent Hook
  [FHIR Subscription] → webhook → [AI Agent] (openmed / LangGraph / CrewAI)

Step 3: Agent Capabilities
  - Clinical NLP: medspacy (MIT) for concept extraction from notes
  - Risk scoring: custom ML model or LLM via openmed
  - Prior auth: openmed-agent (Apache-2.0) — 13 deterministic workflows
  - Imaging: torchio (Apache-2.0) + MedSAM-Agent for segmentation

Step 4: Structured Output → EHR Write-back
  [Agent output (FHIR Observation/DiagnosticReport)] → FHIR PUT → EHR
```

---
*v6 — 2026-07-14*
