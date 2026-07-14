# Market Map — Healthcare AI

> Key players, market sizing, opportunities. Focus: LATAM + global.
> Version: v5 — Updated: 2026-07-14

## Market Sizing (2026)

| Segment | 2026 Size | Forecast | CAGR | Source |
|---------|-----------|---------|------|--------|
| AI in Healthcare (overall) | $36.67B | $194.79B (2031) | 39.7% | MarketsandMarkets |
| Agentic AI in Healthcare | $1.83B | $19.71B (2034) | 34.61% | Fortune Business Insights |
| AI in Revenue Cycle Mgmt | $21.49B | $71.27B (2031) | 27.1% | Mordor Intelligence |
| Clinical Doc & Workflow Automation | — | — | 38.54% | Grand View Research |
| Generative AI in Healthcare | $0.95B → $5.77B (prev) | — | 43.4% | GlobeNewswire (Jul 2026) |
| Medical Imaging AI | $5.2B+ | — | 35%+ | NVIDIA/MONAI ecosystem |

## Global Key Players

| Company | Type | Open Source? | Strength |
|---------|------|-------------|----------|
| NVIDIA (MONAI, NemoClaw) | Platform + Tools | ✅ Apache-2.0 | Medical imaging, PHI-safe enterprise deployment |
| Medplum | Platform | ✅ Apache-2.0 | FHIR-native developer platform for AI health apps |
| Oracle Health | Enterprise | ❌ Proprietary | Clinical AI Agent: ~30% doc time reduction for physicians |
| Microsoft (Azure Health) | Cloud | Partial | HIPAA cloud, health data services |
| AWS HealthLake | Cloud | ❌ Proprietary | FHIR-native data lake, PHI-safe ML workflows |
| Google Health | Cloud | ❌ Proprietary | MedPaLM 2, research-grade clinical LLMs |
| Waystar | RCM | ❌ Proprietary | Agentic AI for autonomous revenue cycle (Jan 2026) |
| Epic Systems | EHR | ❌ Proprietary | Dominant US EHR, adding AI features + FHIR APIs |
| Athenahealth | EHR | ❌ Proprietary | Cloud EHR + RCM, AI documentation |
| Mayo Clinic / Mount Sinai / Johns Hopkins | Health Systems | Collaborative | CHI-Bench coalition, benchmark leadership |

## Agentic AI Platform Landscape (2026)

| Vendor | Product | Focus |
|--------|---------|-------|
| Kore.ai | Healthcare Agentic AI | Patient access, clinical ops |
| Sutherland | Agentic AI for providers | Revenue cycle, back-office |
| Nuance (Microsoft) | DAX Express | Ambient clinical documentation |
| Suki | AI assistant | Physician voice documentation |
| Nabla | Copilot for clinicians | Ambient note-taking, EU market |

## Performance Reality Check (CHI-Bench, May 2026)

> Best frontier agents (GPT-4o, Claude, Gemini) fail **72%** of real end-to-end clinical workflows when tested against 87 MCP tools + 1,290-page policy handbook.

| Agent Tier | CHI-Bench Success Rate |
|-----------|----------------------|
| Best frontier model | ~28% |
| Average frontier model | ~15% |
| Specialized clinical agent (fine-tuned) | TBD (benchmark too new) |

**Implication**: Raw LLM → clinical workflow does not work. Orchestration + domain fine-tuning + safety layers are mandatory. This is Globant's value.

## LATAM Opportunities

| Opportunity | Country Focus | Entry Point |
|-------------|--------------|-------------|
| Hospital digitalization (underpenetrated EHR) | BR, MX, CO, AR | OpenMRS / OpenEMR + AI layer |
| Revenue cycle automation | BR (SUS), MX (IMSS) | Agentic RCM on open stack |
| Clinical documentation (physician burden) | All LATAM | On-device NLP (OpenMed) + Claude |
| Telemedicine AI triage | BR, CO, PE | Care.ohcnetwork + LLM agent |
| HIPAA-analog compliance (LGPD Brazil) | Brazil | OpenMed local inference; Medplum HIPAA/LGPD |
| Drug discovery AI | BR (Fiocruz partnerships) | MONAI + molecular models |

## Globant Positioning

- **Entry**: Open-source platform (OpenMRS / Medplum / OpenEMR) as base
- **Differentiation**: CHI-Bench-validated orchestration + MedGuards safety layer
- **HIPAA strategy**: OpenMed for on-device PHI processing; NemoClaw for enterprise
- **Pricing edge**: Avoid $3k/seat proprietary tools; build on Apache/MIT stack
- **LATAM anchor**: Spanish/Portuguese OpenMed models; GNU Health LATAM community

---
*Auto-updated by ingest pipeline — v5.*
