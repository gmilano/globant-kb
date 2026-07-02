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

## Clinical NLP Infrastructure

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | 667+ | Clinical NLP library on spaCy. Section detection (HPI/Assessment/Plan), negation (NegEx), temporality, UMLS concept normalization. Required preprocessing step before any clinical text reaches an LLM. |
| [apache/ctakes](https://github.com/apache/ctakes) | Apache-2.0 | 131+ | Apache cTAKES from Mayo Clinic. Extracts medications, diagnoses, procedures, anatomy from clinical text. UMLS-backed, production-hardened. Use for structured extraction at scale. |
| [TorchIO-project/torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | 2.4k+ | Medical image preprocessing for deep learning (MRI, CT, PET). Data augmentation, patch-based sampling, lazy loading of large 3D volumes. PyTorch standard for medical imaging AI. |
| [microsoft/hi-ml](https://github.com/microsoft/hi-ml) | MIT | 308+ | Microsoft Health Intelligence ML toolkit. Azure ML integration, radiology and ophthalmology evaluation harnesses, MLOps utilities for healthcare. Enterprise-grade. |

## Local-First AI & HIPAA-Compliant Infrastructure (New 2025–2026)

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | 4.0k+ | Local-first clinical AI: NER, PII de-identification, 1,000+ medical models, 12 languages, 100% on-device. The answer to "we can't send PHI to the cloud." |
| [healthchainai/HealthChain](https://github.com/healthchainai/HealthChain) | Apache-2.0 | 210+ | Python SDK for connecting AI models to live EHR systems. FHIR R4, CDS Hooks, SMART on FHIR OAuth2. Skip the EHR integration tax. |
| [the-momentum/open-wearables](https://github.com/the-momentum/open-wearables) | MIT | 2.0k+ | Self-hosted wearable data API — Garmin, Oura, Whoop, Apple HealthKit, Samsung all unified. AI Health Assistant coming Q3 2026. |
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | 1.5k+ | Modern FHIR-native developer platform. SMART on FHIR, subscriptions, CDS Hooks, serverless bot functions on FHIR events. The "Supabase for healthcare" — best starting point for new builds. |

## Curated Ecosystems

| Repo | License | Description |
|------|---------|-------------|
| [kakoni/awesome-healthcare](https://github.com/kakoni/awesome-healthcare) | MIT | Master index of open source healthcare software: EMR, imaging, standards, AI/ML, wearables, APIs. Start here for any new vertical. |
| [AI-in-Health/MedLLMsPracticalGuide](https://github.com/AI-in-Health/MedLLMsPracticalGuide) | MIT | Practical patterns for applying LLMs to medicine. Agent frameworks, benchmarks, evaluation. Nature Reviews Bioengineering publication. |
| [AgenticHealthAI/Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) | CC BY 4.0 | Curated index of the latest healthcare agent research: diagnostic agents, clinical dialogue, radiology, benchmarks, drug discovery. |
