# Repos de base — Healthcare AI

> Plataformas, toolkits y datasets open source para healthcare AI.
> Última actualización: 2026-07-07

## Imaging médico (computer vision clínica)

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [MONAI](https://github.com/Project-MONAI/MONAI) | Apache-2.0 | 8.4k | PyTorch framework para deep learning en healthcare imaging. Transforms, pre-trained models, métricas clínicas. v1.6.0 junio 2026. Estándar de la industria. |
| [OHIF Viewers](https://github.com/OHIF/Viewers) | MIT | 4.5k | Zero-footprint DICOM viewer web-based con lesion tracking, measurements, segmentation overlay. Usado en hospitales de investigación. |
| [Cornerstone.js](https://github.com/cornerstonejs/cornerstone) | MIT | 3.2k | Plataforma de medical imaging web completa: DICOM parsing, rendering, tools annotation. Base de OHIF. |
| [OpenMEDLab](https://github.com/openmedlab) | Apache-2.0 | org | Shanghai AI Lab: SAM-Med2D/3D (segment anything para medicina), RETFound (retina), PULSE (LLM médico), MedLSAM (localización 3D). 15+ repos especializados. |
| [MedSAM](https://github.com/bowang-lab/MedSAM) | Apache-2.0 | 2.8k | Segment Anything adaptado para imágenes médicas: 1.5M+ masks en 10+ imaging modalities. Fine-tuned para CT, MRI, histología. |

---

## EHR / sistemas clínicos

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [OpenMRS](https://github.com/openmrs/openmrs-core) | MPL-2.0 | 1.9k | EMR empresarial: concept dictionary, REST + FHIR APIs, módulos clínicos. Usado en 42+ países, estándar en salud pública LATAM/África. |
| [OpenEMR](https://github.com/openemr/openemr) | GPL-3.0 | 2.4k | EHR + práctica médica más popular open source: scheduling, billing, prescribing, FHIR R4 API. 100k+ instalaciones activas, 30+ idiomas. |
| [Medplum](https://github.com/medplum/medplum) | Apache-2.0 | 2.5k | Plataforma de desarrollo healthcare FHIR-native: SDK, bots (funciones serverless), workflows. Base para construir aplicaciones clínicas modernas. |
| [HAPI FHIR](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | 2.1k | Implementación Java de referencia para clientes y servidores HL7 FHIR. El servidor FHIR open source más adoptado. |
| [GNU Health](https://salsa.debian.org/gnu-health-team/gnuhealth) | GPL-3.0 | — | Sistema EMR + gestión hospitalaria + información de salud pública. Usado en hospitales públicos LATAM. |
| [Bahmni](https://github.com/Bahmni/bahmni-core) | AGPL-3.0 | 300+ | EHR + sistema hospitalario para settings de recursos limitados. Basado en OpenMRS. Ampliamente usado en Asia y LATAM. |

---

## Clinical NLP / procesamiento de texto médico

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [cTAKES](https://github.com/apache/ctakes) | Apache-2.0 | 400+ | Apache Clinical Text Analysis and Knowledge Extraction System. NLP para texto libre clínico en inglés: named entity recognition, temporal relations, assertion detection. Estándar en investigación clínica. |
| [medspacy](https://github.com/medspacy/medspacy) | MIT | 600+ | spaCy pipeline para clinical NLP: sección detection, negation, temporality, UMLS entity linking. Excelente para notas de EHR en PT/ES. |
| [scispacy](https://github.com/allenai/scispacy) | MIT | 1.6k | spaCy para biomedical/scientific text: modelos pre-entrenados en PubMed, UMLS linker. Allen AI. |
| [PyHealth](https://github.com/sunlabuiuc/PyHealth) | MIT | 1.6k | Deep learning toolkit para predictive modeling clínico: readmisión, mortalidad, drug recommendation, length of stay. 33+ modelos, datasets: MIMIC-III/IV, eICU, OMOP. |
| [HealthChain](https://github.com/healthchainai/healthchain) | MIT | 211 | SDK Python para conectar modelos AI directamente a EHRs en vivo. "Skip the integration tax." Soporte FHIR R4 nativo. |

---

## Medical LLMs / Foundation Models

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [MedLLMsPracticalGuide](https://github.com/AI-in-Health/MedLLMsPracticalGuide) | MIT | 2k | Guía práctica Nature Reviews Bioengineering: árbol de LLMs médicos, tablas, papers 2021-2026. Referencia de referencia del campo. |
| [MEDITRON](https://github.com/epfLLM/meditron) | Apache-2.0 | 1.2k | Llama-2 fine-tuned por EPFL en guidelines médicas: PubMed, clinical guidelines, medical papers. MEDITRON-70B disponible en HuggingFace. |
| [BioMistral](https://github.com/BioMistral/BioMistral) | Apache-2.0 | 800+ | Mistral fine-tuned en PubMed. Multilingual: inglés, francés, español, portugués. Ideal para clínica LATAM. |
| [Med42](https://github.com/m42-health/med42) | Apache-2.0 | 600+ | Llama-3 70B fine-tuned por M42 Health: USMLE, clinical reasoning, patient communication. Med42-v2 supera MedPaLM2 en varios benchmarks. |
| [OpenBioLLM](https://huggingface.co/aaditya/Llama3-OpenBioLLM-70B) | Apache-2.0 | — | Llama-3 70B fine-tuned en corpus biomédico curado: PubMed, clinical notes, textbooks médicos. Avanzado en razonamiento clínico en ES/PT. |
| [ClinicalBERT](https://github.com/kexinhuang12345/clinicalBERT) | MIT | 800+ | BERT fine-tuned en notas clínicas MIMIC-III. Embeddings para clasificación de diagnósticos, NER clínica, readmisión prediction. |

---

## Datasets y benchmarks

| Dataset | Licencia | Descripción |
|---------|----------|-------------|
| MIMIC-III/IV | PhysioNet | ICU records: 60k+ admissions, notas, labs, vitales, diagnósticos. Gold standard para investigación clínica. Acceso via credenciales. |
| PubMed (35M+ papers) | Public Domain | Literatura biomédica completa accesible via API y MCP. Indexado con MeSH headings. |
| MedQA (USMLE) | MIT | 12,723 preguntas de examen médico para evaluación de LLMs. Gold standard para medical QA. |
| ClinicalTrials.gov | Public Domain | 500k+ ensayos clínicos: condición, criterios, sitios, fases, outcomes. API REST pública. |
| OpenFDA | Public Domain | Adverse events (FAERS), drug labels, device clearances, recall notices. 15M+ registros, API pública. |
| SA-Med2D-20M | Apache-2.0 | 20 millones de máscaras de segmentación médica (OpenMEDLab/Shanghai AI Lab). El mayor dataset público para medical imaging segmentation. |
| HealthBench | Apache-2.0 | OpenAI benchmark 2026: 5k+ conversaciones médicas evaluadas por médicos. Evalúa seguridad + precisión de LLMs en contexto clínico. |
| FLARE 2026 | Apache-2.0 | Foundation model fine-tuning benchmark para CT segmentation: 4k+ casos multi-órgano. |
