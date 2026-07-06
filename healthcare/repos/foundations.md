# Foundational Repos — Healthcare

> Build-on-top foundations: open license, active community, production deployments.
> Last updated: 2026-07-06

## Core Infrastructure

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | ~2.4k | FHIR-native healthcare platform. TypeScript/React frontend + Node.js backend. HIPAA + SOC2 out of the box. SMART on FHIR v2.2. MCP server emerging. | Yes — REST + FHIR APIs, bot system for agent integration |
| [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | ~1.0k | The reference Java implementation of the HL7 FHIR standard. Powers enterprise EHR data exchange. FHIR R4/R5. Community MCP server available. | Yes — standard FHIR server to connect AI agents to clinical data |
| [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL-2.0 | ~1.3k | OpenMRS core: open-source medical record system powering 8,000+ facilities in 70+ countries. REST and FHIR R4 APIs. Java/Spring backend. Concept dictionary architecture. | Yes — REST API + FHIR module for agent connectivity |
| [openemr/openemr](https://github.com/openemr/openemr) | GPL-3.0 | ~2.9k | OpenEMR v8.0.0 (Mar 2026): ONC-certified ambulatory EHR. Supports US Core 8.0, USCDI v5, SMART on FHIR v2.2.0. PHP + MySQL. Extensive module ecosystem. | Yes — FHIR R4 API, AI module hooks available |
| [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | ~4.2k | Local-first medical AI: 1,500+ models for clinical NER, HIPAA PII de-identification. Runs 100% on-device. Python + Apple MLX. | Yes — directly embed in any Python healthcare pipeline |
| [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | ~680 | Clinical NLP toolkit on spaCy. Sentence segmentation, negation detection, section detection, temporal reasoning for clinical notes. Production-proven at VA, Mayo Clinic. | Yes — NLP preprocessing for clinical text before feeding to LLMs |
| [allenai/scispacy](https://github.com/allenai/scispacy) | MIT | ~3.9k | Allen AI spaCy models for biomedical text. Entity linking to UMLS, MeSH, GO, HPO, RxNorm. 7 pretrained NER models. | Yes — standard biomedical NLP layer for any pipeline |
| [TorchIO-project/torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | ~2.4k | Medical image processing for deep learning. Augmentation, preprocessing, and loading for 3D MRI/CT/PET data. PyTorch-native. | Yes — imaging preprocessing before vision model inference |
| [apache/ctakes](https://github.com/apache/ctakes) | Apache-2.0 | ~135 | Apache cTAKES: production clinical NLP at scale. Identifies diseases, symptoms, medications, anatomical sites, lab values from unstructured notes. UMLS-based. | Yes — batch NLP pipeline for EHR note mining |
| [smart-on-fhir/client-py](https://github.com/smart-on-fhir/client-py) | Apache-2.0 | ~620 | Python SMART on FHIR client library. Handles OAuth2 + FHIR resource retrieval from any SMART-compliant EHR (Epic, Cerner, Meditech). | Yes — Python SDK for agent FHIR data access |

## Supporting Libraries

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [aphp/edsnlp](https://github.com/aphp/edsnlp) | BSD-3-Clause | ~200 | Fast clinical NLP from Paris public hospitals. Multilingual (French/English). OMOP CDM output. Faster than spaCy for large-scale EHR processing. |
| [microsoft/hi-ml](https://github.com/microsoft/hi-ml) | MIT | ~315 | Deep learning toolbox for medical imaging. Azure ML integration, InnerEye compatibility, DICOM support. |
| [ohcnetwork/care_fe](https://github.com/ohcnetwork/care_fe) | MIT | ~650 | CARE: Digital Public Good for care coordination. React frontend, FHIR-compatible. Deployed across 5+ countries. AI layer being added. |
| [fhir-fuel/awesome-FHIR](https://github.com/fhir-fuel/awesome-FHIR) | MIT | ~700 | Curated list of FHIR tools, libraries, and resources. Reference for finding FHIR tooling across all languages. |

## Architecture Notes

**FHIR is the integration backbone**: Any AI agent that needs to read or write patient data should go through a FHIR R4 server. Standard pattern:

```
Clinical System (Epic/OpenMRS/OpenEMR)
    → FHIR R4 API (medplum or hapi-fhir)
    → SMART on FHIR auth (client-py)
    → AI Agent (LangGraph / Claude / GPT)
    → Response logged as FHIR DocumentReference
```

**On-device vs cloud trade-off**: For PHI, use `openmed` (on-device) or ensure BAA + HIPAA-compliant cloud. Never send raw PHI to unpermissioned APIs.

---
*See also: `verticals/solutions.md` for full vertical platforms.*
