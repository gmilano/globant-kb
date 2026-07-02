# Foundational Open Source Repos for Healthcare AI

> These are the battle-tested, widely-adopted repos that form the substrate of any healthcare AI project.

## Electronic Health Records & Hospital Management

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [openemr/openemr](https://github.com/openemr/openemr) | GPL v3 | 3k+ | Most popular open source EMR + medical practice management. PHP/MySQL. Strong US billing + compliance. Used by thousands of outpatient clinics. |
| [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL 2.0 | 1k+ | Modular Java EMR platform powering 8,000+ facilities in 70+ countries. Concept dictionary model, FHIR R4 API, robust REST layer. Ideal base for AI integration. |
| [bahmni/bahmni-core](https://github.com/bahmni/bahmni-core) | AGPL v3 | 500+ | Full-stack hospital management (OpenMRS + Odoo + OpenELIS) for low-resource environments. Used in 50+ countries, 20+ Indian government hospitals. |
| [gnu-health/gnuhealth](https://github.com/gnu-health/gnuhealth) | GPL v3 | 300+ | GNU Health EMR + Hospital and Health Information System. Python/Tryton backend. Strong in Latin America + Africa deployments. |

## Medical Imaging

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [Project-MONAI/MONAI](https://github.com/Project-MONAI/MONAI) | Apache 2.0 | 6k+ | De-facto standard for medical imaging AI. PyTorch-based. CT/MRI segmentation, classification, detection. Model Zoo, Deploy SDK, Label tool. |
| [pydicom/pydicom](https://github.com/pydicom/pydicom) | MIT | 2.5k+ | Python library for reading, modifying, and writing DICOM files. Foundation for any imaging pipeline. |
| [OHIF/Viewers](https://github.com/OHIF/Viewers) | MIT | 4k+ | Web-based DICOM viewer (cornerstone.js). Extensible with AI overlays. Standard for browser-based medical image review. |
| [cornerstonejs/cornerstone3D](https://github.com/cornerstonejs/cornerstone3D) | MIT | 1k+ | High-performance 3D medical image rendering in the browser. Powers OHIF. Foundation for custom clinical review UIs. |

## Biomedical AI / LLMs

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [microsoft/BioGPT](https://github.com/microsoft/BioGPT) | MIT | 4k+ | Microsoft biomedical LLM. Trained on 15M PubMed abstracts. Strong for relation extraction, QA, text generation. |
| [epfLLM/meditron](https://github.com/epfLLM/meditron) | Apache 2.0 | 5k+ | EPFL medical LLM suite (7B/70B). Best open-source model for clinical reasoning, USMLE Q&A, medical guidelines. |
| [stanford-crfm/BioMedLM](https://github.com/stanford-crfm/BioMedLM) | Apache 2.0 | 2k+ | Stanford 2.7B LLM trained purely on PubMed. Lightweight, deployable on-prem for data-residency clients. |

## Interoperability & Standards

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache 2.0 | 2.5k+ | Most widely used open source FHIR server (Java). Standard for healthcare data interoperability. Required for any US healthcare integration. |
| [samply/blaze](https://github.com/samply/blaze) | Apache 2.0 | 300+ | High-performance FHIR server built in Clojure. Strong for analytics workloads over large patient populations. |

## Curated Ecosystems

| Repo | License | Description |
|------|---------|-------------|
| [kakoni/awesome-healthcare](https://github.com/kakoni/awesome-healthcare) | MIT | Master index of open source healthcare software: EMR, imaging, standards, AI/ML, wearables, APIs. Start here for any new vertical. |
| [AI-in-Health/MedLLMsPracticalGuide](https://github.com/AI-in-Health/MedLLMsPracticalGuide) | MIT | Practical patterns for applying LLMs to medicine. Agent frameworks, benchmarks, evaluation. Nature Reviews Bioengineering publication. |
