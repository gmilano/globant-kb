# 🏗️ Foundational Repos — Healthcare

> Bases to build on. Open license, active community, production-proven.
> Last updated: 2026-07-13 (v12)

## Core Platforms & Frameworks

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [hapiproject/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | ~2.1k | Java implementation of the HL7 FHIR standard. The de-facto FHIR server for open-source healthcare. Powers OpenEMR, Medplum, and most modern EHR integrations. REST APIs consumed by EHRAgent, PhysicianBench, and every FHIR-native AI tool. | ✅ FHIR API = AI gateway |
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | ~2.5k | Full-stack FHIR-native healthcare platform. HIPAA + SOC2 out-of-the-box, OWASP-verified. React + Node.js. Best open-source platform to build compliant AI healthcare apps. Includes Bots (serverless AI functions), subscriptions, and a React component library. | ✅ AI-native via Bots + FHIR |
| [openemr/openemr](https://github.com/openemr/openemr) | GPL-2.0 | ~4.7k | Most popular open-source EHR and medical practice management solution. FHIR R4, REST APIs, 15,000+ installations worldwide. ONC-certified (v8.0.0, March 2026). Foundation for adding AI layers in primary care settings. | ✅ via FHIR + REST APIs |
| [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL-2.0 | ~1.9k | Community health EHR used in 40+ countries. Concept dictionary for clinical data standardization. Strong FHIR module. Bahmni (built on OpenMRS) runs in low-resource/rural environments across Africa, Asia, LATAM. | ✅ FHIR module + REST |
| [ottehr/ottehr](https://github.com/ottehr/ottehr) | Apache-2.0 | ~600 | FHIR-native, fully open-source EHR spun out of Oystehr. Modern TypeScript/React stack. Designed for rapid clinical deployment with AI-first architecture. Telehealth + in-person workflows. | ✅ Built for AI from day 1 |
| [kakoni/awesome-healthcare](https://github.com/kakoni/awesome-healthcare) | CC-BY | ~2.0k | Curated master list of open-source healthcare software, libraries, tools, and resources. Essential first-stop for any new healthcare engagement. | ✅ Discovery resource |
| [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | ~4k | Local-first healthcare AI — clinical NER, HIPAA PII de-identification. 1,000+ medical models, 12 languages, Apple MLX + Python. No cloud dependency. Use to add AI to any existing EHR stack without HIPAA exposure. | ✅ Drop-in AI module |
| [wshi83/EhrAgent](https://github.com/wshi83/EhrAgent) | MIT | ~550 | Code-empowered LLM for complex tabular reasoning on EHRs (EMNLP 2024). Generates Python/SQL to answer clinical queries directly on EHR data structures. Reference implementation for EHR-native agents. | ✅ AI-native |
| [mitmedialab/MDAgents](https://github.com/mitmedialab/MDAgents) | MIT | ~900 | MIT Media Lab — adaptive multi-LLM collaboration for medical decision-making (NeurIPS 2024). Reference implementation for multi-agent clinical workflows. Deloitte-endorsed for production. | ✅ AI-native |
| [stanfordmlgroup/MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) | MIT | ~400 | Stanford/NEJM AI — virtual EHR environment for evaluating medical LLM agents. Use as the evaluation harness for any healthcare AI agent you build. | ✅ Eval infrastructure |

## Supporting Libraries

| Repo | License | Stars | Purpose |
|------|---------|-------|---------|
| [TorchIO-project/torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | 2.4k | Medical imaging transforms, augmentation, 3D preprocessing for AI pipelines |
| [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | 667 | Clinical NLP: section detection, negation, context for physician notes |
| [apache/ctakes](https://github.com/apache/ctakes) | Apache-2.0 | ~131 | Apache cTAKES — clinical NLP pipeline for EHR text |
| [HealthRex/PhysicianBench](https://github.com/HealthRex/PhysicianBench) | MIT | ~180 | Eval harness: 100 clinical tasks, 21 specialties, FHIR APIs |
| [nyuolab/clinical-llm-benchmarks](https://github.com/nyuolab/clinical-llm-benchmarks) | MIT | ~150 | NYU benchmark suite comparing general vs. specialized clinical LLMs |

## Key Standards & Protocols

| Standard | Org | Why it Matters |
|----------|-----|----------------|
| **HL7 FHIR R4/R5** | HL7 | Universal API for EHR data exchange. Every AI agent reading patient data goes through FHIR. |
| **ICD-10 / SNOMED CT** | WHO / SNOMED | Clinical coding standards AI must understand for billing, diagnosis, and population health |
| **HIPAA** (US) / **LGPD** (BR) | US / Brazil | Privacy regulations dictating data handling — drives on-device AI adoption |
| **DICOM** | NEMA | Medical imaging standard — radiology AI pipelines depend on DICOM parsers |
| **ONC 21st Century Cures** | US ONC | Mandates open FHIR APIs for EHR vendors — creates the data layer for AI |

## Recommended Stack for New Healthcare AI Engagement

```
[OpenEMR or Medplum]   ← EHR / data foundation (FHIR R4)
       ↓
[HAPI FHIR]            ← FHIR server / interop layer
       ↓
[openmed]              ← On-device clinical NLP + PII-safe AI
       ↓
[MDAgents / EHRAgent]  ← Multi-agent clinical reasoning
       ↓
[MedAgentBench / PhysicianBench] ← Evaluation harness
```

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
