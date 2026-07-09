# 📈 Agentes Healthcare trending — Julio 2026

> Qué está ganando tracción esta semana en el ecosistema AI de salud.
> Última actualización: 2026-07-09 (v4 — NemoClaw enterprise, TEFCA 1B exchanges, NVIDIA 70% adoption survey, Medplum FHIR)

## 🚨 Señal crítica: primer LLM aprobado como dispositivo médico (FDA, Jun 2026)

**UpDoc FDA 510(k) K253281** (aprobado dic 2025, anunciado 25 jun 2026):
- **Primer SaMD (Software as Medical Device) con LLM patient-facing aprobado por la FDA**
- Aplicación: titulación de insulina para adultos con diabetes tipo 2
- Modalidad: voz o texto → orientación de dosis → EHR-integrado
- Evidencia: ensayo Stanford de titulación de insulina
- Despliegues iniciales: Cleveland Clinic, AHN, UCSF
- Predicado: calculadora de dosis (510k pathway)
- Implicación regulatoria: abre **pathway claro** para futuros clinical LLM agents

**¿Qué significa para Globant?** Cualquier proyecto de AI clínica con pacientes en EEUU ahora tiene un precedente regulatorio concreto. El patrón de sandboxing, evidencia clínica y predicado 510(k) es el modelo a seguir.

---

## 🔥 Repos con mayor momentum

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [MedRAX](https://github.com/bowang-lab/MedRAX) | Apache-2.0 | Medical Reasoning Agent for Chest X-ray — ICML 2025. Framework que integra LLMs multimodales con herramientas de análisis radiológico. ChestAgentBench: 2,500 consultas diagnósticas CXR en 7 categorías. Gana tracción en workflows de radiología hospitalaria. | ~1.2k |
| [OpenClaw-Medical-Skills](https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills) | Apache-2.0 | 869 skills médicos curados para OpenClaw. El repo padre OpenClaw pasó de 9k a 188k★ en 60 días, el mayor crecimiento en historia GitHub. Medical Skills una de las librerías más descargadas en healthcare AI. | 2.8k |
| [Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) | CC-BY-4.0 | Lista curada de avances en Agentic AI para salud: papers Mar 2026 sobre SEMA-RAG, CHI-Bench, DermAgent, MedMemoryBench. Referencia de investigación más citada del área. | ~1.2k |
| [openmed-agent](https://github.com/openmed-labs/openmed-agent) | MIT | Asistente médico terminal privado. Tracción acelerada desde que los costos de prior authorization (PA) automation dominan el debate en revenue cycle management en EEUU. | ~800 |
| [fhir-mcp-server (Momentum)](https://github.com/the-momentum/fhir-mcp-server) | MIT | Lanzamiento oficial Momentum FHIR MCP: "eliminar semanas de aprendizaje FHIR". Se volvió el estándar de integración AI↔EHR en semanas de su lanzamiento. | ~500 |
| [xSoVx/fhir-mcp](https://github.com/xSoVx/fhir-mcp) | MIT | FHIR-MCP con PHI protection y audit logging. Ganó tracción en hospitales que necesitan compliance vs. la opción de Momentum sin audit logs empresariales. | ~300 |
| [Multi-Agent-Medical-Assistant](https://github.com/souvikmajumder26/Multi-Agent-Medical-Assistant) | MIT | Demo multi-agente para diagnóstico y research. Muy citado en Reddit/HackerNews como punto de partida para proyectos de diagnóstico asistido. | ~400 |
| [AI-Healthcare-System (pavanbadempet)](https://github.com/pavanbadempet/AI-Healthcare-System) | MIT | Stack completo: React 19, FastAPI, LangGraph RAG, Ollama local, XGBoost diagnóstico (Diabetes/Corazón/Hígado), HL7 FHIR R4, AWS EKS. Arquitectura de referencia para plataformas clínicas privadas. | ~200 |
| [Healthcare-AI-CDSS-LangGraph](https://github.com/SayamAlt/Healthcare-AI-Clinical-Decision-Support-System-using-LangGraph) | MIT | CDSS con StateGraph no-lineal, PubMed RAG, validación de drug interactions. Destaca en la comunidad LangGraph como caso de uso médico canónico. | ~100 |
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | Plataforma healthcare full-stack TypeScript (React + Node.js). FHIR-native, HIPAA+SOC2 out-of-box, "Bots" para logic server-side sin infraestructura propia, UI components library. Ganando traction como alternativa moderna a beda-software/fhir-emr. | 1.5k+ |
| [yboulaamane/awesome-drug-discovery](https://github.com/yboulaamane/awesome-drug-discovery) | MIT | Lista curada de recursos computacionales para drug discovery: ML, molecular modeling, DL, proteínas. Referencia del ecosistema post-AlphaFold. | ~500 |

---

## 🚨 Señal crítica nueva: NVIDIA NemoClaw — OpenClaw con seguridad enterprise (GTC 2026, Mar 16)

**NemoClaw** es la versión enterprise de OpenClaw anunciada por NVIDIA en GTC 2026:
- **Kernel-level sandbox**: deny-by-default; los agentes no pueden sobrepasar el policy engine
- **Privacy router**: datos PHI se quedan en modelos Nemotron locales; razonamiento complejo → cloud (Claude/GPT-5)
- **Role-based access controls + audit logging** completos para compliance HIPAA
- **Aplicación**: healthcare orgs pueden usar agentes OpenClaw con PHI sin violar HIPAA
- **Patrón clave**: PHI → Nemotron local / reasoning complejo → Claude (ningún dato sensible sale)

**Para Globant**: NemoClaw resuelve el mayor bloqueador de venta en healthcare: "no podemos enviar datos de pacientes a la nube." Habilita propuestas con OpenClaw para hospitales US y LATAM con regulación estricta.

---

## 🚨 Señal crítica nueva: TEFCA supera 1 BILLÓN de intercambios (HHS, Jul 2026)

**TEFCA** (Trusted Exchange Framework and Common Agreement) cruzó el hito de **1 billón de registros de salud intercambiados**:
- De 10M a 1B de intercambios **en menos de 1 año** — aceleración sin precedentes
- HHS compromete $1.3M para reforzar supervisión de la red
- **SSA se une a TEFCA** (spring 2026): procesamiento de reclamos de discapacidad reducido >50%
- Implicación para AI agents: "la liquidez de datos será la necesidad definitoria cuando AI se aplique a salud" (Thomas Keane, HHS)

**Para Globant**: TEFCA es ahora la plataforma de facto para flujos de trabajo agénticos a nivel nacional en EEUU. Proyectos que requieran interoperabilidad AI↔EHR deben planificarse sobre TEFCA desde 2026.

---

## 🚨 Señal crítica nueva: NVIDIA Survey — 70% de organizaciones healthcare usan AI (2026)

**Resultados del NVIDIA Annual Survey 2026** (600+ profesionales):
- **70%** de organizaciones healthcare usan AI activamente (↑ de 63% en 2025)
- **69%** dice que el workload principal es GenAI + LLMs
- **85%** de management reporta mayor revenue con AI; **80%** reporta reducción de costos
- **Agentic AI** (nuevo en 2026): **47%** evaluando o usando agentes — 4to lugar en adopción
- En pharma/biotech: **55%** usan agentic AI para revisión de literatura; **~50%** en drug discovery
- **85%** prevé aumentar presupuesto de AI en 2026; casi la mitad anticipa crecimiento >10%

---

## 📰 Señales de mercado esta semana

- **FDA K253281 (Jun 25, 2026)**: UpDoc — primer LLM patient-facing clearado como SaMD. Pathway 510(k) con predicado calculadora de dosis. Deployed en Cleveland Clinic, AHN, UCSF.
- **TEFCA 1B exchanges (Jul 2026)**: HHS reporta 1 billón de intercambios en TEFCA. +$1.3M para supervisión. SSA se une → discapacidad procesada 50%+ más rápido. Infraestructura clave para AI agentes a escala nacional.
- **NVIDIA Survey 2026**: 70% healthcare orgs usan AI (↑63%). 85% aumentó revenue. Agentic AI: 47% assessing. 85% planea aumentar presupuesto AI.
- **NVIDIA NemoClaw (GTC 2026, Mar)**: Capa enterprise para OpenClaw. PHI en Nemotron local + razonamiento en Claude/cloud. HIPAA-by-design. Early adopters: healthcare + finserv.
- **NVIDIA BioNeMo + Proteina-Complexa**: Modelo de razonamiento para diseño de proteínas. 1M+ binders diseñados validados contra 130+ targets. Drug discovery AI entra en era clínica.
- **Deloitte (2026)**: "Agentic AI Health Care Operating Model Change" — 80% de ejecutivos healthcare esperan valor significativo; hybrid workforce AI+clinician inminente.
- **BCG (Ene 2026)**: "AI Agents Will Transform Health Care in 2026" — 61% ya tiene budget aprobado; solo 3% en producción → ventana masiva.
- **Mayo Clinic**: Desplegó AI Nurse Virtual Assistant a 9,600+ enfermeras en unidades de hospitalización y emergencias (sep 2025). Caso de referencia para adopción a escala hospitalaria.
- **MedAgentBench publicado en NEJM AI** (Stanford): benchmark con 300 tareas FHIR reales, Claude 3.5 Sonnet v2 lidera con 69.67% success rate.
- **FHIR-AgentBench** (arXiv:2509.19319): 2,931 preguntas clínicas reales para evaluar agentes EHR interoperables.
- **OpenEMR 8.0.0** (Mar 2026): ONC Ambulatory EHR Certification, US Core 8.0, USCDI v5, SMART on FHIR v2.2.0.
- **Brazil Lula AI Plan**: $4 billion en 4 años para adopción de AI en sector público, incluyendo salud. Acelerador clave para LATAM.
- **NVIDIA + Foxconn + Taiwan "Healthy Taiwan"**: Inversión $1.5B en AI-native infrastructure hospitalaria (Jun 2026).
- **GenAI Healthcare Market (GlobeNewswire, Jul 8, 2026)**: $0.95B (2025) → $5.77B (2030) CAGR 43.4%. Drivers: AI-assisted drug discovery, virtual nursing assistants, AI treatment planning.

---

## 🆕 Papers recientes (Mar–Jul 2026)

| Paper | Arxiv / Fuente | Descripción |
|-------|---------------|-------------|
| SEMA-RAG | AgenticHealthAI list | Self-Evolving Multi-Agent RAG para razonamiento médico |
| CHI-Bench | AgenticHealthAI list | Benchmark de agentes AI para flujos de trabajo en healthcare |
| DermAgent | AgenticHealthAI list | Agente multimodal para análisis dermatológico |
| MedMemoryBench | AgenticHealthAI list | Benchmark de memoria de agentes en atención médica personalizada |
| COTCAgent | AgenticHealthAI list | Consulta preventiva via chain-of-thought clínico |
| PhysicianBench | arXiv:2605.02240 | Evaluación de agentes LLM en EHR de mundo real (nivel physician) |
| FHIR-AgentBench | arXiv:2509.19319 | 2,931 preguntas clínicas reales FHIR para benchmark de agentes EHR |
| MedBeads | arXiv:2602.01086 | Substrate inmutable para medical AI trustworthy — trazabilidad de datos |
| ClinSeekAgent | arXiv:2605.20176 | Automatización de búsqueda de evidencia multimodal para razonamiento clínico |
| No Black Boxes | arXiv:2505.16288 | AI predictiva en salud con causalidad + interoperabilidad interpretable |
| When OpenClaw Meets Hospital | AgenticHealthAI list | Agentic Operating System para flujos dinámicos clínicos |
| Vibe Medicine | arXiv:2604.23674 | Redefining Biomedical Research Through Human-AI Co-Work — collab agent+investigador como nuevo paradigma |
| AutoResearch AI | arXiv:2605.23204 | AI-Powered Research Automation for Scientific Discovery |
| ABRA | AgenticHealthAI list | Benchmark de agentes AI para aplicaciones de radiología |
| AgentRx | AgenticHealthAI list | Multi-agente para predicción clínica multimodal |

---

## 🆕 Repos en el radar (nuevos esta semana)

| Nombre | Licencia | Stars | Por qué importa |
|--------|----------|-------|----------------|
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | 1.5k+ | FHIR-native TypeScript platform, HIPAA+SOC2, Bots serverless. El "Vercel for healthcare apps". |
| NemoClaw (NVIDIA) | Apache-2.0 | — | Enterprise security layer para OpenClaw con PHI routing local. Habilita HIPAA en agentic workflows. |
| NVIDIA Proteina-Complexa | Apache-2.0 | — | 1M protein binders diseñados y validados. Drug discovery AI entra en era experimental validada. |

---
*Pipeline automático — se actualiza cada hora.*
