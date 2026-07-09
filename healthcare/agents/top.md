# 🎯 Agentes AI — Healthcare

> Agentes y herramientas AI open source para la industria de salud. Foco: MIT / Apache 2.0 / BSD.
> Última actualización: 2026-07-09 (v5 — CHI-Bench 72% failure, ARPA-H ADVOCATE, FDA CDS 2026, 81% physician adoption, MedAgentBench, HealthFlow, ColaCare)

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [OpenClaw-Medical-Skills](https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills) | Apache-2.0 | La mayor librería de skills médicos open source: 869 módulos cubriendo clínica, genómica, descubrimiento de fármacos, bioinformática y dispositivos médicos. Transforma cualquier agente general en asistente médico especializado (OpenClaw/NanoClaw). | 2.8k |
| [openmed-agent](https://github.com/openmed-labs/openmed-agent) | MIT | Asistente médico de terminal, privado y sandboxed: prior authorization, apelaciones, codificación ICD-10/CPT/SNOMED, coordinación de cuidados y flujos FHIR con artifacts auditables antes de cada acción. | ~800 |
| [openmed (local-first)](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | Healthcare AI 100% on-device: NER clínica + de-identificación HIPAA PII sin enviar datos al cloud. 1,000+ modelos médicos, 12 idiomas, Apple MLX + Python. No cloud, no patient data leaving your network. | 4.0k |
| [BioChatter](https://github.com/biocypher/biochatter) | MIT | Framework open source para LLMs en biomedicina: integración de knowledge graphs, RAG, model chaining, benchmarking. Soporta LLMs locales (Ollama, Xinference) para privacidad total y compliance HIPAA/LGPD. | ~600 |
| [Multi-Agent-Medical-Assistant](https://github.com/souvikmajumder26/Multi-Agent-Medical-Assistant) | MIT | Chatbot multi-agente para diagnóstico y asistencia de investigación médica: recupera evidencia de literatura médica, analiza chest X-rays/MRI/lesiones cutáneas, responde preguntas clínicas con RAG + LangGraph. | ~400 |
| [AI-Agents-for-Medical-Diagnostics](https://github.com/ahmadvh/AI-Agents-for-Medical-Diagnostics) | MIT | Sistema de agentes LLM especializados para análisis de casos médicos complejos. Integra perspectivas de múltiples especialidades (cardiólogo, radiólogo, internista) para evaluaciones comprensivas. | ~300 |
| [medspaCy](https://github.com/medspacy/medspacy) | MIT | Librería de referencia para NLP clínico sobre spaCy: segmentación de oraciones clínicas, análisis contextual (negation/hedging/temporalidad), detección de secciones EHR, assertion. Desarrollada con Mayo Clinic. | 667 |
| [Apache cTAKES](https://github.com/apache/ctakes) | Apache-2.0 | Plataforma NLP clínica madura de Apache: extracción de entidades clínicas, mapeo a UMLS/SNOMED/ICD-10, pipeline modular UIMA. Estándar de facto en investigación clínica y hospitales académicos. | 131 |
| [torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | Transforms y augmentación para imágenes médicas 3D (MRI, CT, PET) con PyTorch. Interfaz tipo torchvision para radiología e IA médica. Utilizado en más de 500 publicaciones científicas. | 2.4k |
| [hi-ml](https://github.com/microsoft/hi-ml) | MIT | Toolbox de Microsoft para deep learning en imágenes médicas e integración Azure: preprocesamiento, entrenamiento distribuido, métricas clínicas validadas, MLflow tracking para experimentos radiológicos. | 308 |
| [Healthcare-AI-CDSS-LangGraph](https://github.com/SayamAlt/Healthcare-AI-Clinical-Decision-Support-System-using-LangGraph) | MIT | CDSS con LangGraph + GPT-4o-mini + PubMed: estratificación de riesgo en tiempo real, recomendaciones basadas en evidencia, roadmaps clínicos personalizados, validación de interacciones medicamentosas. | ~100 |
| [MedLLMsPracticalGuide](https://github.com/AI-in-Health/MedLLMsPracticalGuide) | Apache-2.0 | Guía práctica curada (publicada en Nature Reviews Bioengineering) de aplicación de LLMs en medicina: árbol de modelos, tablas comparativas, papers. Referencia esencial para proyectos médicos con AI. | ~2k |
| [MedRAX](https://github.com/bowang-lab/MedRAX) | Apache-2.0 | Medical Reasoning Agent for Chest X-ray (ICML 2025). Primer agente AI versátil que integra herramientas de análisis CXR y LLMs multimodales en un framework unificado. Incluye ChestAgentBench: 2,500 consultas médicas complejas en 7 categorías. | ~1.2k |
| [awesome-medical-ai](https://github.com/JuneYaooo/awesome-medical-ai) | MIT | Lista curada de proyectos AI médicos y de salud: LLMs, imágenes médicas, sistemas multi-agente, software clínico. Referencia integral del ecosistema 2025-2026. | ~400 |
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | Plataforma healthcare developer full-stack TypeScript. FHIR-native, HIPAA+SOC2 out-of-box, "Bots" para server-side logic sin infraestructura propia, UI components. El "Vercel for healthcare" — ideal para construir apps AI clínicas sobre FHIR sin partir de cero. | 1.5k+ |
| [OpenAPS/oref0](https://github.com/openaps/oref0) | MIT | OpenAPS — artificial pancreas system open source. El primer sistema de closed-loop insulin delivery patient-liderado. CGM → algoritmo de ajuste de dosis basal → pump. 2,500+ pacientes T1D globalmente. Referencia de FDA AID (Automated Insulin Delivery) pathway. | ~2k |

---

## 🆕 v5 — Nuevos Agentes y Frameworks (Jul 2026)

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) | Apache-2.0 | **Stanford** — Benchmark de agentes LLM en entorno EHR virtual realista: 300 tareas de physicans reales, 100 pacientes virtuales, 700k+ data elements. Claude 3.5 Sonnet v2 lidera con **69.67% success rate**. Publicado en NEJM AI. Estándar de evaluación para proyectos AI clínicos. | ~500 |
| [MedAgentBoard](https://github.com/yhzhu99/MedAgentBoard) | MIT | Plataforma para benchmarking de colaboración multi-agente vs. métodos convencionales en tareas médicas diversas. Cubre datos multimodales, texto, imágenes. Datasets + code + resultados experimentales todos open-sourced. Referencia para evaluar diseños multi-agente en producción. | ~200 |
| [HealthFlow](https://github.com/yhzhu99/HealthFlow) | MIT | **HealthFlow: Automating EHR analysis via a strategically self-evolving multi-agent framework.** Agentes especializados que se adaptan automáticamente a la complejidad de cada caso clínico. Evita el problema de agentes rígidos que fallan en casos complejos no vistos. | ~150 |
| [ColaCare](https://github.com/yuliaaa31/ColaCare) | MIT | **ColaCare (WWW 2025)** — Mejora el modelado de EHR mediante colaboración multi-agente LLM: DoctorAgents + MetaAgent coordinados con RAG. Mejora generación de reportes EHR y planificación de tratamiento vs. baselines solo-LLM. | ~100 |
| [chi-bench](https://github.com/actava-ai/chi-bench) | Apache-2.0 | **Χ-Bench (arXiv:2605.16679)** — El benchmark más exigente para agentes healthcare: 75 flujos de trabajo end-to-end, 20 apps hospitalarias reales, 87 MCP tools, manual de operaciones de 1,279 documentos. Coalición de 20+ instituciones (Johns Hopkins, Wellstar, Yale, Stanford, CMU, Oxford). **Mejor agente falla 72% de los casos reales.** Señal de hasta dónde faltan llegar los agentes. | ~300 |
| [Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) | CC-BY-4.0 | Curación activa de los últimos avances en Agentic AI para salud: papers AAAI 2026, SynthAgent (simulación de pacientes), MedCoG (densidad de inferencia médica), whole-slide VLMs para patología, ColaCare, DynamiCare, SEMA-RAG. Referencia de investigación más citada del área. | ~1.2k |
| [Meditron](https://github.com/epfLLM/meditron) | Apache-2.0 | **EPFL** — Suite de LLMs médicos open source. Meditron-7B y 70B adaptados de Llama-2 con pretraining continuo en 48B tokens médicos (PubMed papers, guías clínicas, datos generales). Referencia como LLM médico open source de clase mundial en benchmarks MedQA, MedMCQA, PubMedQA. | ~900 |

---

## MCP Servers para Healthcare AI

| MCP Server | Licencia | Descripción |
|------------|----------|-------------|
| [fhir-mcp-server (Momentum)](https://github.com/the-momentum/fhir-mcp-server) | MIT | FHIR MCP Server: interfaz lenguaje natural para datos médicos. Elimina semanas de aprendizaje FHIR, previene alucinaciones de códigos médicos. Compatible con Claude, Cursor y cualquier cliente MCP. |
| [wso2/fhir-mcp-server](https://github.com/wso2/fhir-mcp-server) | Apache-2.0 | FHIR MCP Server de WSO2: expone cualquier servidor o API FHIR como MCP Server. Puente entre herramientas AI/LLM y datos de salud empresariales. |
| [xSoVx/fhir-mcp](https://github.com/xSoVx/fhir-mcp) | MIT | FHIR-MCP con PHI protection integrado, audit logging y operaciones token-eficientes. Interopera con HL7 terminology services y validación LOINC automática. |
| [AWS HealthLake MCP](https://awslabs.github.io/mcp/servers/healthlake-mcp-server) | Apache-2.0 | MCP server open source de AWS para HealthLake FHIR resources. Interfaz lenguaje natural a datos de salud estructurados en AWS HealthLake. |
| NemoClaw (NVIDIA) | Apache-2.0 | Enterprise security layer para OpenClaw (GTC 2026). PHI routing a modelos Nemotron locales + razonamiento complejo a Claude/cloud. Kernel-level sandbox, RBAC, audit logging. La solución HIPAA-by-design para agentes OpenClaw en healthcare. |

---

## Guía de selección de agentes

| Caso de uso | Agente recomendado |
|-------------|-------------------|
| Prior auth / revenue cycle automation | openmed-agent |
| NLP sobre notas clínicas / EHR text | medspaCy + cTAKES |
| Diagnóstico multi-especialidad | Multi-Agent-Medical-Assistant + OpenClaw-Medical-Skills |
| Radiología chest X-ray (ICML 2025) | MedRAX (bowang-lab) |
| Imágenes médicas 3D (MRI, CT, PET) | torchio + hi-ml |
| Knowledge graph biomédico + LLM | BioChatter + BioCypher |
| CDSS con evidencia PubMed en tiempo real | Healthcare-AI-CDSS-LangGraph |
| On-device / HIPAA / LGPD privacidad total | openmed (local-first) |
| Skills especializados por dominio médico | OpenClaw-Medical-Skills (869 módulos) |
| Pathway FDA-cleared clinical LLM (SaMD) | openmed-agent + FHIR MCP + validación clínica |
| Plataforma AI healthcare greenfield (TypeScript) | medplum/medplum + fhir-mcp-server |
| Agentes OpenClaw con HIPAA compliance (enterprise) | NemoClaw (NVIDIA) + OpenClaw-Medical-Skills |
| Artificial Pancreas / diabetes closed-loop | OpenAPS + CGM integration + FHIR write |
| EHR multi-agente modeling y treatment planning | ColaCare + HealthFlow |
| Evaluación rigurosa pre-producción de agentes | MedAgentBench + MedAgentBoard + CHI-Bench |
| LLM médico open source base (fine-tuning) | Meditron (7B o 70B, Apache-2.0) |

---
*Actualizado automáticamente por el pipeline de ingest.*
