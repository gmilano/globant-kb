# Vertical Platforms — Healthcare

> Existing open-source platforms to customize with AI.
> Model: start from something working, add agentic layer on top.
> Version: v5 — Updated: 2026-07-14

## Recommended Platforms

| Platform | License | URL | Stack | Use Case | AI Customization |
|----------|---------|-----|-------|----------|-----------------|
| **OpenMRS** | MPL-2.0 | [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | Java / React | EMR for low-resource settings (42 countries, WHO-endorsed) | REST API + OpenMRS SDK → wrap flows with agents |
| **OpenEMR** | GPL-3.0 | [openemr/openemr](https://github.com/openemr/openemr) | PHP / JS | Full EHR + Practice Mgmt, ONC-certified (~100k installs) | FHIR R4 API + OpenAI/Anthropic webhook integrations |
| **Medplum** | Apache-2.0 | [medplum/medplum](https://github.com/medplum/medplum) | TypeScript / React | FHIR-native developer platform, HIPAA + SOC2 | Serverless Bots = native agent execution environment |
| **Care (OHC Network)** | MIT | [ohcnetwork/care_fe](https://github.com/ohcnetwork/care_fe) | React / Python | ICU + hospital mgmt, Digital Public Good (WHO) | REST API; community adding AI agents for triage |
| **HAPI FHIR** | Apache-2.0 | [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Java | Reference FHIR R2→R5 server | MCP-FHIR layer (xSoVx/fhir-mcp) on top |
| **MONAI** | Apache-2.0 | [Project-MONAI/MONAI](https://github.com/Project-MONAI/MONAI) | Python / PyTorch | Medical imaging AI platform | Native — Auto3DSeg, federated learning, Triton deployment |
| **OpenMed** | Apache-2.0 | [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) | Python / MLX | Local medical models (NER + de-id) | Drop-in NLP layer for any EHR pipeline |
| **openFHIR** | Apache-2.0 | [medblocks openFHIR](https://medblocks.com/blog/announcing-medblocks-openfhir-an-open-source-engine-that-bridges-openehr-and-fhir) | Node.js | openEHR ↔ FHIR bidirectional mapping | Bridge legacy openEHR systems to FHIR-based AI |
| **OpenAPS** | MIT | [openaps/openaps](https://github.com/openaps/openaps) | Python | Artificial pancreas (T1D), 2,500+ patients | Closed-loop agent for glucose management |
| **GNU Health** | GPL-3.0 | [gnuhealth/gnuhealth](https://github.com/gnuhealth/gnuhealth) | Python / Tryton | Hospital IS + EHR + epidemiology (100+ countries) | REST API for AI layer; strong LATAM Spanish community |

## How to Add AI to Any Platform

```
1. Fork the base repo
2. Expose FHIR R4/R5 API (or use existing FHIR endpoint)
3. Add FHIR-MCP server (xSoVx/fhir-mcp) for LLM access
4. Wire clinical workflow events → Claude/LLM agent via MCP
5. Add MedGuards safety layer for error detection on outputs
6. Evaluate with PhysicianBench or CHI-Bench harness
7. Add OpenMed for on-device NLP/de-id (no PHI to cloud)
```

## LATAM Platform Notes

| Region | Preferred Platform | Reason |
|--------|------------------|--------|
| Brazil | OpenEMR + GNU Health | Portuguese-locale modules, large community |
| Argentina | GNU Health | Strong LATAM Spanish support, hospital IS |
| Mexico | OpenMRS | WHO endorsement, low-resource facility fit |
| Colombia | Medplum | FHIR-native for modern health startups |
| General | OpenMed | On-device Spanish/Portuguese medical NLP |

---
*Auto-updated by ingest pipeline — v5.*
