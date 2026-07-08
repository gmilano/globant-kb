# 🎯 Agentes AI — Healthcare

> Agentes y herramientas AI open source para la industria de salud. Foco: MIT / Apache 2.0 / BSD.
> Última actualización: 2026-07-08 (v3 — FDA clearance, MedRAX, FHIR-AgentBench)

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [OpenClaw-Medical-Skills](https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills) | Apache-2.0 | La mayor librería de skills médicos open source: 869 módulos cubriendo clínica, genómica, descubrimiento de fármacos, bioinformática y dispositivos médicos. Transforma cualquier agente general en asistente médico especializado (OpenClaw/NanoClaw). | 2.8k |
| [openmed-agent](https://github.com/openmed-labs/openmed-agent) | MIT | Asistente médico de terminal, privado y sandboxed: prior authorization, apelaciones, codificación ICD-10/CPT/SNOMED, coordinación de cuidados y flujos FHIR con artifacts auditables antes de cada acción. | ~800 |
| [openmed (local-first)](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | Healthcare AI 100% on-device: NER clínica + de-identificación HIPAA PII sin enviar datos al cloud. 1,000+ modelos médicos, 12 idiomas, Apple MLX + Python. | 4.0k |
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

---

## MCP Servers para Healthcare AI

| MCP Server | Licencia | Descripción |
|------------|----------|-------------|
| [fhir-mcp-server (Momentum)](https://github.com/the-momentum/fhir-mcp-server) | MIT | FHIR MCP Server: interfaz lenguaje natural para datos médicos. Elimina semanas de aprendizaje FHIR, previene alucinaciones de códigos médicos. Compatible con Claude, Cursor y cualquier cliente MCP. |
| [wso2/fhir-mcp-server](https://github.com/wso2/fhir-mcp-server) | Apache-2.0 | FHIR MCP Server de WSO2: expone cualquier servidor o API FHIR como MCP Server. Puente entre herramientas AI/LLM y datos de salud empresariales. |
| [xSoVx/fhir-mcp](https://github.com/xSoVx/fhir-mcp) | MIT | FHIR-MCP con PHI protection integrado, audit logging y operaciones token-eficientes. Interopera con HL7 terminology services y validación LOINC automática. |
| [AWS HealthLake MCP](https://awslabs.github.io/mcp/servers/healthlake-mcp-server) | Apache-2.0 | MCP server open source de AWS para HealthLake FHIR resources. Interfaz lenguaje natural a datos de salud estructurados en AWS HealthLake. |

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

---

## Benchmarks de referencia (2025–2026)

| Benchmark | Arxiv / Fuente | Qué mide | Mejor modelo |
|-----------|---------------|----------|-------------|
| MedAgentBench | NEJM AI / Stanford | 300 tareas FHIR en EHR virtual, 100 pacientes, 700k+ elementos | Claude 3.5 Sonnet v2 — 69.67% |
| FHIR-AgentBench | arXiv:2509.19319 | 2,931 preguntas clínicas reales en HL7 FHIR; razonamiento multi-step | Varios — métricas por estrategia |
| PhysicianBench | arXiv:2605.02240 | Agentes LLM en EHR de mundo real (nivel médico) | Claude — SOTA reportado |
| ChestAgentBench | bowang-lab/MedRAX | 2,500 consultas diagnósticas CXR en 7 categorías | MedRAX (Apache-2.0) |
| CHI-Bench | AgenticHealthAI | Flujos de trabajo healthcare end-to-end | OpenClaw-based agents |

---
*Actualizado por el pipeline de ingest — v2 investigación profunda 2026-07-07.*
