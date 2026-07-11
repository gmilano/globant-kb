# 🏗️ Foundational Repos — Healthcare

> The bases to build on. Open licenses, active communities. These are what you fork, extend, and add AI on top of.
> Last updated: 2026-07-11

## EHR / Clinical Systems

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [openemr/openemr](https://github.com/openemr/openemr) | GPL-2.0 | 3.2k | Most popular open source EHR: scheduling, billing, patient records, FHIR API. Used in 100+ countries. | ✅ FHIR API + REST hooks |
| [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL-2.0 | 1.8k | Open medical record system, ~36M patient records, 40+ countries. Key in LATAM (Bolivia, Haiti, Peru). | ✅ REST API + event system |
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | 2.5k | FHIR-native cloud healthcare platform. React + TypeScript + Node. Best for building new AI-enabled apps. | ✅ Native FHIR R4, subscriptions, bots |
| [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | 2.1k | Most used Java FHIR server implementation. Powers many hospital integrations. | ✅ Full FHIR R4/R5 server |
| [ohcnetwork/care](https://github.com/ohcnetwork/care) | MIT | 500+ | Digital Public Good EHR (India/international). ICU management, telehealth, COVID response tested. | ✅ REST API |
| [Bahmni/openmrs-distro-bahmni](https://github.com/Bahmni/openmrs-distro-bahmni) | GPL-3.0 | ~400 | Full hospital system for resource-constrained settings. Built on OpenMRS + OpenERP. Used in Nepal, India, LATAM. | ✅ via OpenMRS APIs |

## Clinical NLP

| Repo | License | Stars | Description | Use Case |
|------|---------|-------|-------------|----------|
| [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | 667 | Clinical NLP with spaCy: section detection, NER, negation, temporal reasoning. | Parsing clinical notes |
| [apache/ctakes](https://github.com/apache/ctakes) | Apache-2.0 | 131 | Mayo Clinic NLP for clinical free text. Mature Apache TLP. NER, relation extraction, coreference. | EHR text mining |
| [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | 4.0k | Local-first healthcare AI: clinical NER, HIPAA PII de-identification, medical coding. | HIPAA-safe pipelines |

## Medical Imaging

| Repo | License | Stars | Description | Use Case |
|------|---------|-------|-------------|----------|
| [TorchIO-project/torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | 2.4k | Medical imaging data augmentation, preprocessing for AI. Supports MRI, CT, PET. | Imaging data pipelines |
| [microsoft/hi-ml](https://github.com/microsoft/hi-ml) | MIT | 308 | HI-ML: deep learning toolbox for medical imaging. Azure integration. | Medical imaging ML |
| [bowang-lab/MedRAX](https://github.com/bowang-lab/MedRAX) | Apache-2.0 | ~500 | Medical Reasoning Agent for Chest X-ray (ICML 2025). Orchestrates 7 specialized models. | Radiology AI agents |
| [Stanford-AIMI/CheXagent](https://github.com/Stanford-AIMI/CheXagent) | Apache-2.0 | ~1.2k | Chest X-ray foundation model from Stanford AIMI. Multi-task: classification, findings generation. | Radiology foundation model |

## AI Agents & Drug Discovery

| Repo | License | Stars | Description | Use Case |
|------|---------|-------|-------------|----------|
| [urban-health-labs/MedAgents](https://github.com/urban-health-labs/MedAgents) | Apache-2.0 | ~2.9k | Multi-agent medical reasoning system for complex clinical QA via LLM collaboration. | Clinical decision support |
| [mims-harvard/TxAgent](https://github.com/mims-harvard/TxAgent) | MIT | 612 | Therapeutic reasoning agent with 211 FDA tools. Drug safety, interactions, treatment strategies. | Drug safety automation |
| [mims-harvard/ToolUniverse](https://github.com/mims-harvard/ToolUniverse) | MIT | 1.2k | 211-tool biomedical toolkit: all FDA drugs since 1939 + Open Targets. Powers TxAgent. | Drug knowledge base |

## Standards & Ontologies

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [openehr/openehr-sdk-python](https://github.com/openehr/openehr-sdk-python) | Apache-2.0 | ~100 | Python SDK for openEHR standard — vendor-neutral clinical data archetype models. |
| [MDDS/medcodes](https://github.com/MDDS/medcodes) | MIT | ~150 | ICD-10, SNOMED CT, LOINC, RxNorm code lookup utilities for Python. |

---
*See also: `verticals/solutions.md` for full vertical platforms.*
