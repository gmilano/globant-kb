# 🏗️ Foundational Repos — Healthcare (v6)

> Build-on-top bases: open license, active community, production-ready.
> Last updated: 2026-07-14

## Core Infrastructure Platforms

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL-2.0 | 1.3k | World's leading open-source medical record system. 42+ countries, 6,000+ implementations in LMICs. Java backend + REST API + modular plugin system. Strong LATAM deployment history. | Yes — REST hooks + module system |
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | 3.2k | FHIR R4/R4B-native healthcare developer platform. Includes auth (OAuth2 + SMART on FHIR), subscription webhooks, TypeScript SDK, React component library. The go-to modern FHIR stack. | Yes — native webhooks + subscriptions |
| [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | 2.1k | Reference Java implementation of FHIR. Powers thousands of EHR integrations worldwide. FHIR R4/R5 support. Used as the persistence layer under many platforms. | Yes — FHIR as AI data layer |
| [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | 4.0k | Local-first healthcare AI runtime: 1,000+ medical models, clinical NER, HIPAA de-identification, 12 languages, Apple MLX backend. Zero external calls — runs on laptop/edge. | Yes — AI-native from day 1 |
| [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | 667 | Clinical NLP pipeline built on spaCy. Named entity recognition, section detection, negation, assertion. Standard tool for extracting structured data from clinical notes. | Yes — NLP preprocessing layer |
| [TorchIO-project/torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | 2.4k | Medical image preprocessing and augmentation for deep learning (MRI, CT, PET). Integrates with PyTorch Lightning. Used in radiology and surgical AI pipelines. | Yes — imaging AI foundation |
| [apache/ctakes](https://github.com/apache/ctakes) | Apache-2.0 | 131 | Apache clinical NLP: extracts medical concepts (diseases, drugs, procedures) from free-text clinical notes. UIMA-based, integrates with OMOP CDM. Production-proven in VA/DoD health systems. | Yes — clinical text mining |
| [microsoft/hi-ml](https://github.com/microsoft/hi-ml) | MIT | 308 | Azure-integrated HI-ML toolbox for deep learning in medical imaging. Handles data versioning, distributed training, model deployment. DICOM + Azure Health Data Services integration. | Yes — Azure cloud AI pipeline |
| [jembi/openhim-core-js](https://github.com/jembi/openhim-core-js) | MPL-2.0 | 220 | OpenHIM health information mediator: routes, transforms, and audits health data flows. Acts as the interoperability engine connecting EHRs, labs, insurance, and AI services via FHIR. | Yes — integration middleware |
| [ohcnetwork/care_fe](https://github.com/ohcnetwork/care_fe) | MIT | 611 | Care is a Digital Public Good enabling accelerated healthcare delivery. React frontend for ICU/ward management. Deployed across India's COVID response. REST API + extensible. | Yes — UI + REST base |

## Key Data Standards Repos

| Repo | License | Purpose |
|------|---------|---------|
| [HL7/fhir](https://github.com/HL7/fhir) | Creative Commons | FHIR specification source — the universal healthcare data standard |
| [smart-on-fhir/client-js](https://github.com/smart-on-fhir/client-js) | Apache-2.0 | SMART on FHIR JavaScript client for EHR-embedded apps |
| [LinuxForHealth/FHIR](https://github.com/LinuxForHealth/FHIR) | Apache-2.0 | IBM's FHIR server — high-performance, cloud-native |
| [synthetichealth/synthea](https://github.com/synthetichealth/synthea) | Apache-2.0 | Synthetic patient data generator — 1M+ realistic patients for AI training |

## Selection Rationale for Globant Engagements

1. **FHIR-first**: Always start with Medplum or HAPI FHIR — interoperability is non-negotiable in healthcare
2. **Local AI**: For HIPAA-strict clients, openmed (Apache-2.0) provides on-premise AI without data leaving the facility
3. **LATAM deployments**: OpenMRS has the deepest LATAM penetration (Brazil, Colombia, Mexico deployments)
4. **Synthetic data**: Synthea enables AI training without touching real patient data — compliance accelerator

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
*v6 — 2026-07-14*
