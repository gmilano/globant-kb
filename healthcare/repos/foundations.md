# 🏗️ Foundational Repos — Healthcare

> Battle-tested bases to build on. Open licenses, active communities, production deployments.
> Last updated: 2026-07-06

## Core Infrastructure

| Repo | License | Description | AI-Ready? | Stars |
|------|---------|-------------|-----------|-------|
| [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | Complete Java implementation of HL7 FHIR R4/R5. The reference FHIR server used by Epic, Cerner, and 1,000s of health systems. REST API for patient data, observations, medications. | Yes — FHIR API as LLM tool | 2.3k |
| [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL-2.0 | OpenMRS API and web application. Powers 8,000+ facilities in 70+ countries. Modular Java platform; REST API available. Foundation for Bahmni. | Yes — REST + module system | 1.9k |
| [microsoft/BioGPT](https://github.com/microsoft/BioGPT) | MIT | Generative pre-trained transformer for biomedical text. Pre-trained on 15M+ PubMed articles. Fine-tune for any clinical NLP task. Best open biomedical LLM before GPT-4. | Yes — fine-tune base | 4.5k |
| [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | Clinical NLP library built on spaCy. Sentence splitting, concept detection, section detection, negation. Works on Epic Clarity, Cerner reports, VA notes. | Yes — extraction pipeline | 667 |
| [apache/ctakes](https://github.com/apache/ctakes) | Apache-2.0 | Production clinical NLP from Mayo Clinic. Extracts diseases, medications, symptoms, temporal info from unstructured notes. Java + UIMA pipeline. Integrates with HAPI FHIR. | Yes — extraction + FHIR | 131 |
| [TorchIO-project/torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | Medical image processing for deep learning. MRI/CT preprocessing, augmentation, patch sampling. Used in radiology AI models. Works with any PyTorch model. | Yes — imaging pipeline | 2.4k |
| [stanford-crfm/BioMedLM](https://github.com/stanford-crfm/BioMedLM) | Apache-2.0 | Stanford 2.7B parameter LLM trained on PubMed. Smaller than GPT-4 but fully open and domain-specific. Good base for HIPAA-compliant on-premise deployments. | Yes — on-prem LLM base | 635 |
| [kakoni/awesome-healthcare](https://github.com/kakoni/awesome-healthcare) | MIT | Curated list of awesome open source healthcare software, libraries, tools and resources. Starting point for any healthcare tech stack. | Yes — discovery | ~1k |

## Clinical NLP Stack

| Repo | License | Description | Use Case |
|------|---------|-------------|----------|
| [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | Clinical NLP with spaCy | Named entity recognition, negation, section detection |
| [aphp/edsnlp](https://github.com/aphp/edsnlp) | BSD-3-Clause | Fast modular clinical NLP (AP-HP Paris) | French + English EHR notes, entity qualification |
| [uf-hobi-informatics-lab/ClinicalTransformerNER](https://github.com/uf-hobi-informatics-lab/ClinicalTransformerNER) | MIT | Transformer-based clinical NER (UF HOBI Lab) | Clinical named entity recognition, i2b2 compatible |
| [OHNLP/MedTagger](https://github.com/OHNLP/MedTagger) | Apache-2.0 | Light-weight clinical NLP on Apache UIMA | Dictionary-based tagging, rules engine |
| [ClarityNLP/ClarityNLP](https://github.com/ClarityNLP/ClarityNLP) | MPL-2.0 | Clinical phenotyping NLP framework | Phenotype definition, cohort identification |

## Interoperability & Standards

| Repo | License | Description | Use Case |
|------|---------|-------------|----------|
| [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | HL7 FHIR R4/R5 server | Patient records, observations, medications API |
| [smart-on-fhir/client-js](https://github.com/smart-on-fhir/client-js) | Apache-2.0 | SMART on FHIR JavaScript client | EHR-embedded apps, OAuth2 FHIR auth |
| [DBCG/org-opencds-cqf-cds](https://github.com/DBCG/org-opencds-cqf-cds) | Apache-2.0 | CDS Hooks implementation on FHIR | Clinical decision support triggers in EHR workflow |

## Medical Imaging

| Repo | License | Description | Use Case |
|------|---------|-------------|----------|
| [TorchIO-project/torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | Medical image processing for DL | Preprocessing MRI/CT for AI models |
| [microsoft/hi-ml](https://github.com/microsoft/hi-ml) | MIT | Health Intelligence ML toolbox | Medical imaging DL, Azure MLOps for health |
| [mdai/ml-lessons](https://github.com/mdai/ml-lessons) | Apache-2.0 | Deep learning for medical imaging lessons | Radiologist-grade AI training starter |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
