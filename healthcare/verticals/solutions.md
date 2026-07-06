# 🏭 Vertical Platforms — Healthcare

> Existing platforms customizable with AI. Strategy: start with functional system, add agentic layer on top.
> Last updated: 2026-07-06

## Recommended Platforms

| Platform | License | URL | Stack | Use Case | AI Opportunity |
|----------|---------|-----|-------|----------|---------------|
| OpenMRS | MPL-2.0 | [openmrs.org](https://openmrs.org) | Java / Spring / REST | EMR/EHR for 8,000+ facilities in 70+ countries. HIV/TB care in LMIC. | AI layer: clinical NLP on notes, FHIR output to LLM agents, triage automation |
| Bahmni | AGPL-3.0 | [bahmni.org](https://www.bahmni.org) | OpenMRS + Odoo + OpenELIS | Complete hospital management: EMR + pharmacy + lab + billing. WHO pre-qualified. | AI layer: MedAgents for clinical decisions, LLM for prescription verification |
| OpenEMR | GPL-3.0 | [open-emr.org](https://www.open-emr.org) | PHP / MySQL | Full-featured ambulatory EHR/PM. Used by 200k+ providers globally. FHIR R4 API. | AI layer: SOAP note generation, ICD-10 coding, prior auth automation |
| HospitalRun | MIT | [hospitalrun.io](https://hospitalrun.io) | React / Electron / PouchDB | Modern hospital management system for offline-first environments. MIT license. | AI layer: LLM scheduling assistant, supply chain prediction, patient triage |
| HAPI FHIR | Apache-2.0 | [hapifhir.io](https://hapifhir.io) | Java / Spring Boot | Reference FHIR R4/R5 server. The interoperability backbone for healthcare AI. | MCP server: expose patient data to LLM agents via FHIR REST endpoints |
| LibreHealth EHR | GPL-3.0 | [librehealth.io](https://librehealth.io) | PHP / MySQL | Modern EHR forked from OpenEMR. Active international community. REST API. | AI layer: clinical documentation assistant, referral management agent |
| GNU Health | GPL-3.0 | [health.gnu.org](https://health.gnu.org) | Python / Tryton | Health and hospital management system. Genetics module, epidemiology tools. | AI layer: epidemiology trend analysis, genetics-aware clinical agents |
| Care (ohcnetwork) | MIT | [github.com/ohcnetwork/care](https://github.com/ohcnetwork/care_fe) | React / FastAPI / PostgreSQL | WHO-recognized Digital Public Good. India's COVID-19 hospital management system. FHIR-compatible. | AI layer: ICU bed prediction, resource allocation, patient deterioration alerts |

## How to Customize with AI

### Pattern A: Clinical Documentation Agent on OpenMRS
```
OpenMRS FHIR REST API
    ↓ Patient data, encounter context
LangChain / LangGraph
    ↓ Route to specialist agents
medspaCy (NLP extraction) + openmed (on-device NER)
    ↓ Structured clinical entities
BioGPT or Claude (SOAP note generation, ICD coding)
    ↓ Structured output
Write back to OpenMRS via FHIR API
```

### Pattern B: MCP-Enabled FHIR Data Access
```
HAPI FHIR Server (Apache 2.0) — standard REST FHIR endpoint
    ↓ FHIR MCP server wrapper (e.g., fhir-mcp)
Claude / GPT-4 via MCP
    ↓ Natural language queries → FHIR API calls
"Show me all patients with HbA1c > 9 in the last 6 months"
    → FHIR Observation query → structured results → LLM synthesis
```

### Pattern C: Prior Authorization Automation on OpenEMR
```
OpenEMR (GPL) — clinical data source
    ↓ FHIR R4 API
CDS Hooks trigger on order entry
    ↓
LangGraph multi-agent:
  - Evidence Agent: retrieves clinical guidelines (RAG on UpToDate, AHA)
  - Payer Rules Agent: checks payer formulary rules
  - Documentation Agent: drafts prior auth letter
    ↓
Return CDS Card to clinician in OpenEMR UI
```

## Platform Selection Matrix

| Constraint | Best Choice |
|-----------|-------------|
| LMIC / low-resource setting | OpenMRS or Care (ohcnetwork) |
| Full hospital management (LATAM) | Bahmni (EMR + Pharmacy + Lab + Billing) |
| US ambulatory / primary care | OpenEMR (FHIR R4, Meaningful Use) |
| Resource-limited offline deployment | HospitalRun (Electron, PouchDB sync) |
| Pure FHIR interoperability layer | HAPI FHIR as middleware |
| Research / epidemiology | GNU Health |
| Modern cloud-native (greenfield) | Care (ohcnetwork) + HAPI FHIR |
