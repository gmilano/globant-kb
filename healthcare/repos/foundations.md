# 🏗️ Foundational Repos — Healthcare

> Bases to build on. Open license, active community.
> Last updated: 2026-07-12 (v11)

## Core Platforms & Frameworks

| Repo | License | Description | AI-ready? |
|------|---------|-------------|----------|
| [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | Complete Java implementation of HL7 FHIR R4/R5. Clients, servers, validation. 1,481★. De-facto standard for clinical interoperability. | ✅ FHIR API layer to connect agents to any EHR |
| [openemr/openemr](https://github.com/openemr/openemr) | GPL-3.0 | World's most popular open-source EHR. v8.0.0 (Mar 2026): ONC Ambulatory certified, US Core 8.0, USCDI v5, SMART on FHIR v2.2. 15,000+ global installs. | ✅ EMR base to add agentic layer on top |
| [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL-2.0 | Modular EHR with flexible concept dictionary. REST + FHIR APIs. Used in 40+ countries for HIV/TB/maternal health. Excellent for LATAM/Africa. | ✅ Customizable EHR for low-resource contexts |
| [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | 1,500+ Apache-2.0 medical models, clinical NER, HIPAA de-identification. On-device: iOS, Android, GPU, CPU. ~4k★. | ✅ NLP/privacy layer over any EHR |
| [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | Clinical NLP with spaCy: medical NER, negation, temporality, clinical sections. Spanish + English. 667★. | ✅ Text processing for clinical history notes |
| [TorchIO-project/torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | 3D medical image processing (MRI, CT, PET) for PyTorch. Augmentation, sampling, transforms. 2.4k★. | ✅ Preprocessing pipeline for medical imaging AI |
| [apache/ctakes](https://github.com/apache/ctakes) | Apache-2.0 | cTAKES: clinical NLP over Apache UIMA. Extraction of biomedical entities, relations, temporality from free-text clinical notes. 131★. | ✅ NLP pipeline for unstructured EHR notes |
| [OHIF/Viewers](https://github.com/OHIF/Viewers) | MIT | Open Health Imaging Foundation: web-based DICOM radiology viewer. Extensible with AI plugins. Used in hospitals globally. 4.2k★. | ✅ UI for integrating imaging AI with radiologists |
| [smart-on-fhir/client-js](https://github.com/smart-on-fhir/client-js) | Apache-2.0 | SMART on FHIR JavaScript client: OAuth2 + FHIR access for clinical apps embedded in EHRs. 580★. | ✅ Auth layer for agents connected to EHRs |
| [ohcnetwork/care_fe](https://github.com/ohcnetwork/care_fe) | MIT | CARE: Digital Public Good for health delivery. Triage, ICU, teleconsult, bed management. 611★. Active in India, Sri Lanka. | ✅ Health delivery platform to add AI on top |

## Open-Weight Foundation Models

| Model | License | Organization | Description |
|-------|---------|-------------|-------------|
| MedGemma-4B/27B | Apache-2.0 | Google | Multimodal medical model (text + images). Available HuggingFace + Ollama local. |
| TxGemma | Apache-2.0 | Google | Specialized in therapeutics and pharmacology. Drug interaction, dosing AI. |
| BioMistral-7B | Apache-2.0 | Community | Medical fine-tune of Mistral over PubMed/MedC. |
| ClinicalBERT | MIT | Emily Alsentzer (MIT) | BERT fine-tuned on MIMIC-III clinical notes. NER, classification tasks. |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
