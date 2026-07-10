# 📈 Agentes Healthcare trending — Julio 2026

> Qué está ganando tracción esta semana en el ecosistema AI de salud.
> Última actualización: 2026-07-10 (v6 — Trase $107M seed regulado, xCures $46M, UHG PreCheck PA 8h→30s, IQVIA.ai 150+ agentes, NHS TrustX, MARCH ACL 2026, open source scribes)

## 🆕 v6 — Señales críticas nuevas (Jul 10, 2026)

---

### Señal v6-1: Trase $107M seed — AI agents para back-office regulado (Jun 25, 2026)

**Trase** ([MobiHealthNews](https://www.mobihealthnews.com/news/trase-lands-107m-scale-ai-agents-healthcare-and-high-stakes-industries)):
- **$107M seed** liderado por ARCH Venture Partners + Red Cell Partners (total: $117.5M con pre-seed de $10.5M)
- Producto: **Trase Origin** — plataforma de AI agents para industrias reguladas (HIPAA+SOC2)
- Caso de uso en producción: **Duke University Health System** — cardiology procesa 5,000+ faxes mensuales automáticamente
- Foco: healthcare + defense; áreas donde las empresas adoptan AI más lento por privacidad y seguridad

**Para Globant**: Trase demuestra que el mercado paga $100M+ para back-office healthcare AI con compliance. Duke cardiology fax automation = prior auth + referral routing agéntico. Deal pattern replicable: ingresar por un flujo de back-office regulado, escalar a workflows clínicos.

---

### Señal v6-2: xCures $46M Series B — Clinical clarity engine (Jun 24, 2026)

**xCures** ([Fierce Healthcare](https://www.fiercehealthcare.com/health-tech/fierce-healthcare-fundraising-tracker-26)):
- **$46M Series B** liderado por Innovius Capital + iGrow + Spring Mountain Capital
- Producto: **Clinical Clarity Engine** — transforma registros fragmentados de pacientes → datos decision-ready en minutos
- El problema: información del paciente dispersa en múltiples sistemas → el agente clínico no puede razonar sin consolidación
- xCures resuelve la capa de "datos listos para el agente" que es el bloqueador #1 de AI clínica en producción

**Para Globant**: Clinical clarity engine es la capa de preprocesamiento antes de cualquier agente clínico. Patrón: fragmentos de EHR/faxes/labs dispersos → normalización → FHIR → agente. Globant puede construir esta capa con Medplum + Claude + FHIR MCP.

---

### Señal v6-3: UnitedHealth PreCheck PA — 8 horas → 30 segundos (2026)

**UnitedHealth Group** ([PiTech](https://pitechsol.com/podcast/fdas-new-ai-rules-billion-dollar-ai-savings-ambient-documentation-and-cyber-resilience/)):
- **$1.5B inversión AI en 2026** (conservador 2:1 ROI proyectado en 2-3 años)
- **PreCheck Prior Authorization** (Optum Rx): reduce tiempo de aprobación de prescripciones de **8+ horas → menos de 30 segundos**
- AI agents calling doctors' offices: automatización de scheduling de citas para pacientes (producción activa)
- HCA Healthcare: **$400M en ahorros proyectados** — Generative AI Nurse Handoff tool reduce carga cognitiva en cambios de turno

**Para Globant**: PA de 8h → 30s es el ROI más tangible de healthcare AI para cualquier cliente. UHG validó el patrón en escala nacional. Proyectos de prior authorization automation tienen benchmarks externos reales ahora.

---

### Señal v6-4: IQVIA.ai — 150+ agentes especializados en trials clínicos (Mar 2026)

**IQVIA.ai** ([IQVIA](https://www.iqvia.com/newsroom/2026/03/iqvia-unveils-iqvia-ai-a-unified-agentic-ai-platform)):
- Plataforma agentica unificada lanzada en **NVIDIA GTC Mar 2026**
- **150+ agentes AI internos** + 100+ patentes AI filing
- **19 de las 20 top pharma companies** incorporando agentes IQVIA en sus workflows
- Tecnología: NVIDIA Nemotron + NeMo Agent Toolkit + Dynamo + LangChain
- Caso de uso estrella: **clinical trial site selection** — proceso de 200 días → automatizado via agentes sub-especializados
- Áreas: clinical, commercial, real-world data

**Para Globant**: IQVIA.ai es el prototipo de plataforma agentica CRO/pharma. El patrón de sub-agentes especializados (protocolo → criterios → site feasibility → patient matching) es replicable para clientes biotech/CRO de menor escala que no tienen budget para IQVIA.

---

### Señal v6-5: NHS TrustX — Infraestructura de certificación para AI agéntico en UK (2026)

**TrustX Initiative** ([Responsible AI Institute](https://www.responsible.ai/news/trustx-press-release/)):
- UK: Responsible AI Institute + Health Innovation KSS
- **"Trusted AI Technology" badge** — sello visible de evaluación y despliegue seguro de agentic AI en NHS
- Alineado con NHS 10-Year Plan ("Fit for the Future") que llama a transformación digital masiva
- Modelo: primero non-clinical use cases, diseñado para escalar a clinical decisions
- Framework: evaluación rigurosa → certificación → despliegue

**Para Globant**: NHS TrustX es el equivalente UK del FDA Non-Device CDS pathway. Para proyectos UK: obtener el TrustX badge es el camino más rápido hacia despliegue agéntico en NHS. Oportunidad similar a EU AI Act compliance como servicio.

---

### Señal v6-6: MARCH (ACL 2026) — Jerarquía médica real en agentes radiológicos

**MARCH (arXiv:2604.16175)** — _"Multi-Agent Radiology Clinical Hierarchy for CT Report Generation"_:
- Publicado en **ACL 2026**
- Supera modelos monolíticos que son "cajas negras" en radiología 3D
- **Arquitectura**: replica la jerarquía real de departamentos de radiología:
  - **Resident Agent**: draft inicial con extracción multi-escala de features de CT
  - **Fellow Agents**: revisión con retrieval-augmented generation
  - **Attending Agent**: orquesta discourse iterativo basado en stance (consenso médico)
- **Resultado**: supera SOTA en RadGenome-ChestCT en fidelidad clínica + precisión lingüística

**Para Globant**: MARCH define el nuevo estándar arquitectónico para radiología AI. Los agentes radiológicos monolíticos (incluyendo MedRAX en ciertos casos) serán reemplazados por arquitecturas jerárquicas que emulan la supervisión real de departamentos de radiología.

---

### Señal v6-7: Ecosistema open source de ambient scribes explota (Jul 2026)

**Nuevos repos de scribes open source**:
- **scribeHC** ([trevorpfiz/scribeHC](https://github.com/trevorpfiz/scribeHC), MIT) — Expo mobile + Next.js + FastAPI; records consultas → SOAP notes
- **OpenScribe** ([Open-scribe/OpenScribe](https://github.com/Open-scribe/OpenScribe), MIT) — full control datos, sin vendor lock-in
- **AI-Medical-Scribe** ([hutchpd](https://github.com/hutchpd/AI-Medical-Scribe)) — local-first, browser-based, Chrome AI built-in, sin backend
- **FlowMemo** ([aouabfeddali/FlowMemo](https://github.com/aouabfeddali/FlowMemo)) — open source AI ambient scribe

**Señal**: El mercado de ambient scribes propietarios (Nuance DAX $150M ARR, Abridge, Nabla, Suki) enfrenta presión de alternativas open source reales que cualquier hospital puede desplegar. Los costos de licencia de $500-3,000/médico/mes se vuelven cuestionables.

**Para Globant**: Opportunity clara — tomar scribeHC como base, customizar para LATAM (español/portugués + idiomas médicos locales), integrar con OpenMRS/OpenEMR via FHIR. Deal size: $50k-$200k para deployment + soporte. Mucho más rápido que construir desde cero.

---

## 🔥 Repos con mayor momentum (actualización v6)

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [masslight/ottehr](https://github.com/masslight/ottehr) | MIT | EHR AI-native + FHIR-native + ambient scribe incluido. Greenfield healthcare in a box. | ~189 |
| [trevorpfiz/scribeHC](https://github.com/trevorpfiz/scribeHC) | MIT | Open source AI ambient scribe: Expo + Next.js + FastAPI → SOAP notes automáticas. | ~200 |
| [Open-scribe/OpenScribe](https://github.com/Open-scribe/OpenScribe) | MIT | AI scribe open source full-stack. Sin vendor lock-in, datos del paciente bajo control. | ~150 |

---

## 📰 Señales de mercado esta semana (Jul 10, 2026)

- **Trase $107M seed (Jun 25, 2026)**: ARCH Venture. Regulados back-office AI agents. Duke cardiology: 5k+ faxes/mes automatizados (HIPAA+SOC2).
- **xCures $46M Series B (Jun 24, 2026)**: Clinical clarity engine — datos fragmentados → decision-ready en minutos.
- **UnitedHealth PreCheck PA**: prior auth de prescripciones 8h → 30s. $1.5B inversión AI 2026.
- **HCA Healthcare $400M AI savings**: Nurse Handoff generative AI, revenue cycle automation.
- **IQVIA.ai (Mar 2026)**: 150+ agentes especializados. 19/20 top pharma adoptando. Site selection automation (200-day process).
- **NHS TrustX Initiative (2026)**: "Trusted AI Technology" badge para agentic AI en NHS. Aligned con 10-Year Plan.
- **MARCH (ACL 2026, arXiv:2604.16175)**: CT report multi-agent hierarchy (Resident→Fellow→Attending). SOTA en RadGenome-ChestCT.
- **Open source scribe explosion (Jul 2026)**: scribeHC, OpenScribe, AI-Medical-Scribe, FlowMemo — 4 proyectos open en semanas. Alternativas a Nuance DAX aparecen.
- **Ottehr (masslight/ottehr)**: primer EHR AI-native open source con scribe integrado. EHR development 95% más rápido.

---

## 🚨 Señal crítica v4: primer LLM aprobado como dispositivo médico (FDA, Jun 2026)

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
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | Plataforma healthcare full-stack TypeScript (React + Node.js). FHIR-native, HIPAA+SOC2 out-of-box, "Bots" para logic server-side sin infraestructura propia, UI components library. Ganando traction como alternativa moderna a legacy EHR integrations. | 1.5k+ |
| [yboulaamane/awesome-drug-discovery](https://github.com/yboulaamane/awesome-drug-discovery) | MIT | Lista curada de recursos computacionales para drug discovery: ML, molecular modeling, DL, proteínas. Referencia del ecosistema post-AlphaFold. | ~500 |

---

## 🚨 Señal crítica v4: NVIDIA NemoClaw — OpenClaw con seguridad enterprise (GTC 2026, Mar 16)

**NemoClaw** es la versión enterprise de OpenClaw anunciada por NVIDIA en GTC 2026:
- **Kernel-level sandbox**: deny-by-default; los agentes no pueden sobrepasar el policy engine
- **Privacy router**: datos PHI se quedan en modelos Nemotron locales; razonamiento complejo → cloud (Claude/GPT-5)
- **Role-based access controls + audit logging** completos para compliance HIPAA
- **Aplicación**: healthcare orgs pueden usar agentes OpenClaw con PHI sin violar HIPAA
- **Patrón clave**: PHI → Nemotron local / reasoning complejo → Claude (ningún dato sensible sale)

**Para Globant**: NemoClaw resuelve el mayor bloqueador de venta en healthcare: "no podemos enviar datos de pacientes a la nube." Habilita propuestas con OpenClaw para hospitales US y LATAM con regulación estricta.

---

## 🚨 Señal crítica v4: TEFCA supera 1 BILLÓN de intercambios (HHS, Jul 2026)

**TEFCA** (Trusted Exchange Framework and Common Agreement) cruzó el hito de **1 billón de registros de salud intercambiados**:
- De 10M a 1B de intercambios **en menos de 1 año** — aceleración sin precedentes
- HHS compromete $1.3M para reforzar supervisión de la red
- **SSA se une a TEFCA** (spring 2026): procesamiento de reclamos de discapacidad reducido >50%
- Implicación para AI agents: "la liquidez de datos será la necesidad definitoria cuando AI se aplique a salud" (Thomas Keane, HHS)

**Para Globant**: TEFCA es ahora la plataforma de facto para flujos de trabajo agénticos a nivel nacional en EEUU. Proyectos que requieran interoperabilidad AI↔EHR deben planificarse sobre TEFCA desde 2026.

---

## 🚨 Señal crítica v4: NVIDIA Survey — 70% de organizaciones healthcare usan AI (2026)

**Resultados del NVIDIA Annual Survey 2026** (600+ profesionales):
- **70%** de organizaciones healthcare usan AI activamente (↑ de 63% en 2025)
- **69%** dice que el workload principal es GenAI + LLMs
- **85%** de management reporta mayor revenue con AI; **80%** reporta reducción de costos
- **Agentic AI** (nuevo en 2026): **47%** evaluando o usando agentes — 4to lugar en adopción
- En pharma/biotech: **55%** usan agentic AI para revisión de literatura; **~50%** en drug discovery
- **85%** prevé aumentar presupuesto de AI en 2026; casi la mitad anticipa crecimiento >10%

---

## 🆕 Señal crítica v5: CHI-Bench — El benchmark más exigente para agentes healthcare (Jun 2026)

**χ-Bench (arXiv:2605.16679)** — _"Can AI Agents Automate End-to-End, Long-Horizon, Policy-Rich Healthcare Workflows?"_

- **Diseño**: 75 flujos de trabajo clínicos end-to-end en 3 dominios: prior authorization, utilization management, care management
- **Entorno**: cada tarea usa un simulador de alta fidelidad de **20 apps hospitalarias reales** expuestas via **87 MCP tools**
- **Guía de operaciones**: manual de **1,279 documentos** (reglas médicas + seguros + operacionales)
- **Coalición**: 20+ instituciones (Johns Hopkins, Wellstar, Yale, Stanford, CMU, Oxford, USC, UCSD)
- **Modelos evaluados**: 30 agentes frontier de Anthropic, OpenAI, Google, xAI, DeepSeek, Z.ai
- **Resultado**: **el mejor agente falla aproximadamente 72% de los casos clínicos reales**

**Tres capacidades no cubiertas por benchmarks actuales**:
1. **Policy density**: decisiones deben basarse en biblioteca de 1,279 reglas médicas/de seguros
2. **Multi-role composition**: una sola tarea requiere que el agente juegue múltiples roles con handoffs
3. **Multilateral interaction**: pasos intermedios incluyen diálogos multi-turno (peer-to-peer review, patient outreach)

**Repo**: [actava-ai/chi-bench](https://github.com/actava-ai/chi-bench) (Apache-2.0)

**Para Globant**: CHI-Bench define el listón real. Los agentes que funcionan en demos fallan en producción clínica porque carecen de policy density + multi-role + MCP tool orchestration. Proyectos de prior auth automation que Globant cotice deben superar CHI-Bench o acotarse a los workflows en los que los modelos ya son confiables.

---

## 🆕 Señal crítica v5: ARPA-H ADVOCATE — Primer agente AI cardiovascular con funding FDA-track (Jun 2026)

**ADVOCATE** (Agentic AI-Enabled Cardiovascular Care Transformation):
- **Objetivo**: primer agente AI **autorizado por la FDA** que proporcione cuidado de especialidad 24/7 para enfermedad cardiovascular (la más mortal en EEUU)
- **Estructura**: dos componentes de AI — (1) agente clínico orientado al paciente; (2) agente supervisorio que garantiza seguridad y efectividad continua
- **Timeline**: ARPA-H selecciona equipos innovadores en 6 meses (junio 2026); "down select" tras 1 año; autorización FDA proyectada en ~3 años
- **Diseño regulatorio**: no es aprobación convencional — es establecer un nuevo precedente regulatorio con FDA para GenAI de alto riesgo
- **Integración**: despliegue directo en sistemas de salud reales (no sandboxes académicos)

**Programa técnico**:
1. Desarrollo de agente clínico patient-facing (cardiovascular)
2. Agente supervisorio para garantizar consistencia de seguridad y efectividad
3. Plan de integración escalable en organizaciones de salud reales

**Para Globant**: ADVOCATE es el blueprint para el siguiente nivel de proyectos healthcare AI. Clientes que necesiten un "agente clínico supervisado por AI" tienen ahora el modelo regulatorio y técnico. Globant puede posicionarse como implementador del patrón: agente-primario + agente-supervisor + audit trail FHIR.

---

## 🆕 Señal crítica v5: FDA CDS Guidance 2026 — Expansión del espacio non-device para AI

**FDA actualizó la guía de Clinical Decision Support Software (enero 2026)**:
- Expansión de enforcement discretion: AI/GenAI que provee recomendación única clínicamente apropiada Y permite al médico verificar la lógica → **clasificado como Non-Device CDS** (sin regulación FDA)
- **Condición clave**: el clínico puede revisar independientemente la base de la recomendación
- **Frontera regulatoria**: agentes autónomos y GenAI altamente influyente SÍ caen bajo regulación FDA
- **Validez**: aplica a AI, incluyendo GenAI, siempre que la lógica y los datos sean transparentes al clínico

**Implicación práctica**:
- CDSS transparente + revisable → Non-Device → despliegue rápido sin 510(k)
- CDSS autónomo + black-box → Device → requiere evaluación FDA
- **Patrón seguro**: siempre incluir "clinician review step" y "explainability layer" — bastan para mantener clasificación Non-Device

**Para Globant**: La mayoría de proyectos de CDSS que Globant construiría caen en Non-Device si se diseñan correctamente. Incluir audit trail + justificación accesible al médico como requisito de diseño desde el sprint 1.

---

## 🆕 Señal crítica v5: 81% de médicos usan AI — Adopción 2× en 3 años

**Estadísticas de adopción clínica (2026)**:
- **81%** de médicos US reportan usar AI profesionalmente en 2026 — más del doble del **38%** en 2023
- **75%** de sistemas de salud US usan al menos una app de AI (vs. 59% en 2024)
- Médicos usando AI en: documentación clínica (48%), búsqueda de información (44%), soporte a diagnóstico (32%), revisión de imágenes (21%)
- **26 líderes de salud** citan como tendencias 2026: agentes para operaciones, AI ambient scribes, AI para SDOH, AI en triage

**Implicación**: El "clinical AI fatigue" de 2023-24 terminó. El médico promedio ya usa AI y busca soluciones más robustas. El bloqueador ha pasado de "¿usaremos AI?" a "¿qué herramienta AI es confiable?".

---

## 📰 Señales de mercado esta semana

- **FDA K253281 (Jun 25, 2026)**: UpDoc — primer LLM patient-facing clearado como SaMD. Pathway 510(k) con predicado calculadora de dosis. Deployed en Cleveland Clinic, AHN, UCSF.
- **ARPA-H ADVOCATE (Jun 2026)**: Programa para primer agente cardiovascular AI con FDA track. Equipos seleccionados, desarrollo en curso. 3-year FDA authorization horizon.
- **FDA CDS Guidance (Jan 2026)**: Expansión de Non-Device AI para CDS con revisión médica. Autonomous AI agents → sí regulados. CDS revisable + transparente → Non-Device pathway.
- **CHI-Bench (arXiv:2605.16679, Jun 2026)**: 72% failure rate para mejores agentes en workflows healthcare reales. Benchmark estándar para prior auth, utilization management, care management.
- **MedAgentBench en NEJM AI (Stanford)**: 300 tareas FHIR reales, Claude 3.5 Sonnet v2 lidera 69.67% success rate. Published in New England Journal of Medicine AI.
- **TEFCA 1B exchanges (Jul 2026)**: HHS reporta 1 billón de intercambios. Infraestructura nacional para AI agéntico a escala real.
- **NVIDIA Survey 2026**: 70% healthcare orgs usan AI (↑63%). 85% aumentó revenue. Agentic AI: 47% assessing. 85% planea aumentar presupuesto AI.
- **NVIDIA NemoClaw (GTC 2026, Mar)**: Capa enterprise para OpenClaw. PHI en Nemotron local + razonamiento en Claude/cloud. HIPAA-by-design. Early adopters: healthcare + finserv.
- **NVIDIA BioNeMo + Proteina-Complexa**: 1M+ binders diseñados validados. Drug discovery AI entra en era clínica.
- **Brazil Lula AI Plan**: $4 billion en 4 años para adopción de AI en sector público, incluyendo salud. Acelerador clave para LATAM.
- **NVIDIA + Foxconn + Taiwan "Healthy Taiwan" (Jun 2026)**: Inversión en AI-native infrastructure hospitalaria. Modelo para adopción de AI en sistemas nacionales de salud.
- **GenAI Healthcare Market (GlobeNewswire, Jul 8, 2026)**: $0.95B (2025) → $5.77B (2030) CAGR 43.4%.
- **Agentic AI Healthcare Market (Fortune BI 2026)**: $1.83B (2026) → $19.71B (2034) CAGR 34.61%.
- **Overall AI Healthcare Market (MarketsandMarkets 2026)**: $36.67B (2026) → $194.79B (2031) CAGR 39.7%.
- **Physician adoption 2026**: 81% de médicos US usan AI (vs 38% en 2023). 75% health systems usan AI app (vs 59% en 2024).

---

## 🆕 Papers recientes (Mar–Jul 2026)

| Paper | Arxiv / Fuente | Descripción |
|-------|---------------|-------------|
| χ-Bench (CHI-Bench) | arXiv:2605.16679 | 75 workflows healthcare end-to-end; 87 MCP tools; 72% failure rate. Benchmark estándar para prior auth + utilization management |
| SEMA-RAG | AgenticHealthAI list | Self-Evolving Multi-Agent RAG para razonamiento médico |
| DermAgent | AgenticHealthAI list | Agente multimodal para análisis dermatológico |
| MedMemoryBench | AgenticHealthAI list | Benchmark de memoria de agentes en atención médica personalizada |
| COTCAgent | AgenticHealthAI list | Consulta preventiva via chain-of-thought clínico |
| PhysicianBench | arXiv:2605.02240 | Evaluación de agentes LLM en EHR de mundo real (nivel physician) |
| FHIR-AgentBench | arXiv:2509.19319 | 2,931 preguntas clínicas reales FHIR para benchmark de agentes EHR |
| MedBeads | arXiv:2602.01086 | Substrate inmutable para medical AI trustworthy — trazabilidad de datos |
| ClinSeekAgent | arXiv:2605.20176 | Automatización de búsqueda de evidencia multimodal para razonamiento clínico |
| No Black Boxes | arXiv:2505.16288 | AI predictiva en salud con causalidad + interoperabilidad interpretable |
| Vibe Medicine | arXiv:2604.23674 | Redefining Biomedical Research Through Human-AI Co-Work |
| AutoResearch AI | arXiv:2605.23204 | AI-Powered Research Automation for Scientific Discovery |
| ABRA | AgenticHealthAI list | Benchmark de agentes AI para aplicaciones de radiología |
| AgentRx | AgenticHealthAI list | Multi-agente para predicción clínica multimodal |
| Clinician's Veto | arXiv:2606.25108 | Trust, Liability y Uncertainty en AI Prescribing autónomo — marco ético regulatorio |
| Medmarks | arXiv:2605.01417 | Comprehensive open-source LLM benchmark suite for medical tasks |

---

## 🆕 Repos en el radar (nuevos esta semana)

| Nombre | Licencia | Stars | Por qué importa |
|--------|----------|-------|----------------|
| [actava-ai/chi-bench](https://github.com/actava-ai/chi-bench) | Apache-2.0 | ~300 | El benchmark más exigente: 87 MCP tools, 20 apps hospitalarias, 72% failure rate en mejores agentes. |
| [MedAgentBench (Stanford)](https://github.com/stanfordmlgroup/MedAgentBench) | Apache-2.0 | ~500 | 300 tareas physician-derived en entorno EHR virtual, 700k+ data elements. Publicado en NEJM AI. |
| [HealthFlow](https://github.com/yhzhu99/HealthFlow) | MIT | ~150 | EHR analysis via self-evolving multi-agent framework. Agentes que se adaptan a complejidad clínica. |
| [ColaCare](https://github.com/yuliaaa31/ColaCare) | MIT | ~100 | WWW 2025 — Multi-agente LLM para EHR modeling: DoctorAgents + MetaAgent coordinados. |
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | 1.5k+ | FHIR-native TypeScript platform, HIPAA+SOC2, Bots serverless. El "Vercel para healthcare apps". |
| NemoClaw (NVIDIA) | Apache-2.0 | — | Enterprise security layer para OpenClaw con PHI routing local. Habilita HIPAA en agentic workflows. |
| NVIDIA Proteina-Complexa | Apache-2.0 | — | 1M protein binders diseñados y validados. Drug discovery AI entra en era experimental validada. |

---
*Pipeline automático — se actualiza cada hora.*
