# Foundational Repos — Healthcare

> Bases to build on. Open license, active community.
> Version: v5 — Updated: 2026-07-14

## Platforms & Frameworks

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [Project-MONAI/MONAI](https://github.com/Project-MONAI/MONAI) | Apache-2.0 | 6.2k | Medical imaging AI toolkit (PyTorch). Auto3DSeg, federated learning, NVIDIA Triton integration. Powers 15k+ clinical devices (Mayo, Siemens, NIH). | ✅ Native |
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | 1.6k | TypeScript FHIR R4 developer platform. Serverless Bots, React UI kit, HIPAA+SOC2. Greenfield choice for AI-native clinical apps. | ✅ Native |
| [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL-2.0 | 1.2k | WHO-endorsed EMR for low-resource settings. 42-country deployments. Modular, FHIR-capable. AI layer via REST API or OpenMRS SDK. | ✅ Via API |
| [openemr/openemr](https://github.com/openemr/openemr) | GPL-3.0 | 2.8k | ONC-certified EHR + practice management. FHIR R4, HL7v2, telehealth. Largest open-source EHR globally (~100k installations). | ✅ Via API |
| [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | 2.1k | Reference Java FHIR server (R2→R5). Used by HL7, NIH, major health systems as FHIR backbone. Persistent JPA store, REST + subscription. | ✅ Backend |
| [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | 3.4k | 1,500+ local medical models for NER + HIPAA PII de-id. 340M downloads. On-device inference: iOS, Android, Apple Silicon, GPU, browser. | ✅ Native |
| [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | 700 | Clinical NLP: negation, assertion, section detection, temporal. Drop-in for EHR text. Built on spaCy. | ✅ Pipeline |
| [Project-MONAI/MONAI-deploy](https://github.com/Project-MONAI/monai-deploy) | Apache-2.0 | 450 | Clinical AI deployment SDK + DICOM integration. Packaging inference workflows for clinical environments. | ✅ Native |
| [xSoVx/fhir-mcp](https://github.com/xSoVx/fhir-mcp) | Apache-2.0 | — | MCP server for LLM ↔ FHIR bridge. PHI protection, audit logging, HL7 terminology. CMS-0057-F compliant. | ✅ Native |
| [apache/ctakes](https://github.com/apache/ctakes) | Apache-2.0 | 131 | Clinical NLP: named entity recognition from unstructured notes. UIMA pipeline, NCI/NLM vocab. 15-year production track record. | ✅ Pipeline |

## Benchmark Harnesses (use for agent evaluation)

| Repo | License | Purpose |
|------|---------|---------|
| [HealthRex/PhysicianBench](https://github.com/HealthRex/PhysicianBench) | MIT | Evaluate agents on 100 long-horizon EHR tasks, 21 specialties |
| [actava-ai/chi-bench](https://github.com/actava-ai/chi-bench) | MIT | 75 policy-rich healthcare workflow tasks, 87 MCP tools |
| [AgenticHealthAI/Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) | MIT | Curated list: 103 (2026) + 244 (2025) + 51 (2024) healthcare agent projects |

## Interoperability Standards Stack

```
HL7 FHIR R4/R5  ←── primary data format
DICOM            ←── medical imaging
openEHR          ←── clinical archetypes (EU preferred)
HL7v2            ←── legacy hospital messaging (still ~70% of exchanges)
ICD-10/SNOMED CT ←── medical terminologies
```

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
*Auto-updated by ingest pipeline — v5.*
