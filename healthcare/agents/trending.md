# 📈 Agentes Healthcare trending — Julio 2026

> Qué está ganando tracción esta semana en el ecosistema AI de salud.
> Última actualización: 2026-07-10 (v7 — Assort Health $120M@$1.2B agentic OS, Q2 2026 $4.1B record, HeartAgent/DermAgent/EchoAgent specialization wave, Sovereign AI trend, MA-RAG ICML 2026, PhysicianBench, EHR-Complex)

## 🆕 v7 — Señales críticas nuevas (Jul 10, 2026)

---

### Señal v7-1: Assort Health $120M Series C @ $1.2B — Voice AI → Agentic OS para patient journey

**Assort Health** ([assorthealth.com](https://www.assorthealth.com/blog/assort-health-raises-120-million-series-c-to-scale-largest-deployment-of-ai-agents-for-the-patient-journey)):
- **$120M Series C** liderado por **Menlo Ventures** @ **$1.2B valuation** (total recaudado: $222M+)
- Lo que comenzó como voice AI para scheduling especialidad → **"agentic operating system for the patient journey"**
- Abarca: scheduling, intake forms, referrals, document processing, medication refills, eligibility en tiempo real, lab requests, payments
- **Synapse**: modelo AI propietario que aprende los patrones de specialty workflows
- **190M+ patient interactions** | 62,000+ care protocols | 1.6M+ decision pathways
- **Métricas en producción**: 5% lift en appointment volume, **115% aumento en labor capacity**, 4.3/5 patient satisfaction
- **20x crecimiento en revenue** en 15 meses

**Para Globant**: Stack abierto replicable: LangGraph + Claude + FHIR MCP + Medplum. Comenzar con 1 workflow (scheduling o referrals) → demostrar 5-10% mejora → escalar. Deal size: $80k-$300k para implementación de agentic patient access OS en hospital privado LATAM.

---

### Señal v7-2: Q2 2026 — Record histórico de $4.1B en healthcare AI (120+ deals)

**Rock Health / CB Insights** ([oatmealhealth.com](https://oatmealhealth.com/healthcare-ai-startups-raise-4-1b-in-q2-2026/)):
- **$4.1B en Q2 2026** — el mayor trimestre de financiamiento en historia de healthcare AI
- **120+ deals** — 6+ rondas superiores a $100M solo en Q2 2026
- **Top 3 categorías**: clinical decision support + ambient documentation + revenue cycle automation
- Health systems firmando **multi-year enterprise contracts** — señal de madurez del mercado

**Para Globant**: El mercado está en peak de aceleración. Los clientes no experimentan — firman contratos. Pitch: "implementador de producción con metodología de evaluación rigurosa (PhysicianBench + CHI-Bench), no demos."

---

### Señal v7-3: Ola de especialización por órgano/especialidad (Mar-May 2026)

Los agentes médicos generalistas están siendo complementados por agentes hiper-especializados:

**Cardiología**:
- **HeartAgent** (arXiv:2603.10764, Mar 2026): diagnóstico diferencial explicable. Sub-agentes especializados + datos cardiológicos curados. **>36% mejora en top-3 accuracy** (MIMIC-IV). Transparent reasoning trajectories + verifiable references.
- **BAAI Cardiac Agent** (arXiv:2604.04078, Apr 2026): cardiac MRI multimodal reasoning. Beijing AI Institute.
- **EchoAgent** (arXiv:2604.05541): echocardiography con Eyes + Hands + Minds.

**Dermatología**:
- **DermAgent** (arXiv:2605.14403, MICCAI 2026 early accept, GitHub: YizeezLiu/DermAgent): Plan-Execute-Reflect con Case RAG + Guideline RAG. Supera SOTA MLLMs en 5 benchmarks de diagnóstico, concept annotation y captioning.

**Para Globant**: Oportunidad en centros de especialidad donde la escasez de especialistas es aguda en LATAM. Deal: "Implementamos el agente de cardiología con 36% mejora en accuracy. 8-16 semanas."

---

### Señal v7-4: MA-RAG (ICML 2026) — Consenso médico desde evidencia contradictoria

**MA-RAG** ([NJU-RL/MA-RAG](https://github.com/NJU-RL/MA-RAG), ICML 2026):
- Transforma el conflicto entre múltiples recuperaciones en **consenso médico robusto**
- Múltiples rondas de RAG + debate entre agentes especialistas + resolución consensual
- Publicado en **ICML 2026** — la conferencia más selectiva en ML

**Para Globant**: Arquitectura correcta para CDSS donde la evidencia contradictoria es una realidad clínica (guías conflictivas, estudios divergentes). Implementar en proyectos de diagnóstico diferencial o drug-drug interaction checking.

---

### Señal v7-5: Sovereign AI — CIO pitch: "PHI nunca sale de nuestro hospital"

**Tendencia 2026** ([Drug & Device World](https://druganddeviceworld.com/2026/01/26/hospital-of-2026-local-llms-and-ai-are-redefining-healthcare/), [HealthVerity](https://blog.healthverity.com/ai-trends-shaping-healthcare-in-2026-agentic-physical-sovereign-ai)):
- Hospital con sus propios LLMs on-premise = Sovereign AI
- **CIO pitch**: sin Business Associate Agreement para la capa de AI + menor superficie de breach + control total de datos, modelos y governance
- **Stack**: NVIDIA IGX + Clara + NIM + Ollama/vLLM + Meditron + FHIR MCP local
- **TEE**: Trusted Execution Environment para federated learning entre hospitales sin exponer PHI
- **Driver LATAM**: LGPD Brasil + México (datos no salen del gobierno) + Argentina AI soberana

**Para Globant**: Deal pattern: $200k-$800k para sovereign AI deployment. La respuesta a "no podemos enviar datos a la nube" se convierte en una propuesta de valor, no un bloqueador.

---

### Señal v7-6: PhysicianBench — El benchmark más realista para agentes a nivel médico

**PhysicianBench** ([HealthRex/PhysicianBench](https://github.com/HealthRex/PhysicianBench), arXiv:2605.02240, Stanford):
- **100 tareas long-horizon** (670 sub-checkpoints) de consultas reales médico-especialista
- **21 especialidades clínicas**; datos reales de pacientes vía **FHIR APIs estándar**
- Tarea = flujo complejo de toma de decisiones multi-step, no simple Q&A médica

**Para Globant**: PhysicianBench + MedAgentBench + CHI-Bench = tríada de evaluación para cualquier agente clínico. El resultado en PhysicianBench es el número que convence al CIO.

---

### Señal v7-7: EHR-Complex — La dificultad real del SQL clínico (Jun 22, 2026)

**EHR-Complex** (arXiv:2606.23301):
- MIMIC-IV: 365K pacientes, 31 tablas, 500M+ registros. 52K tareas. SQL promedio: 31.93 componentes.
- **Top model: solo 62.3% exact-match accuracy**. 3,800 trayectorias fallidas analizadas.

**Para Globant**: Los analytics sobre datos clínicos son mucho más difíciles de lo que los demos sugieren. Posicionarse con metodología: human-in-the-loop para SQL validation + medical-code dictionaries + semantic validation layer.

---

## 🔥 Repos con mayor momentum (actualización v7)

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [YizeezLiu/DermAgent](https://github.com/YizeezLiu/DermAgent) | Research | MICCAI 2026 early accept. Plan-Execute-Reflect para dermatología. 5 benchmarks, supera SOTA MLLMs. | — |
| [NJU-RL/MA-RAG](https://github.com/NJU-RL/MA-RAG) | MIT | ICML 2026. Multi-Round Agentic RAG médico: conflict → consensus. Codebase oficial NJU. | — |
| [HealthRex/PhysicianBench](https://github.com/HealthRex/PhysicianBench) | Apache-2.0 | Stanford. 100 long-horizon tasks, 670 sub-checkpoints, 21 especialidades, FHIR real. | — |
| [masslight/ottehr](https://github.com/masslight/ottehr) | MIT | EHR AI-native + FHIR-native + ambient scribe incluido. Greenfield healthcare in a box. | ~189 |
| [trevorpfiz/scribeHC](https://github.com/trevorpfiz/scribeHC) | MIT | Open source AI ambient scribe: Expo + Next.js + FastAPI → SOAP notes automáticas. | ~200 |
| [Open-scribe/OpenScribe](https://github.com/Open-scribe/OpenScribe) | MIT | AI scribe open source full-stack. Sin vendor lock-in, datos del paciente bajo control. | ~150 |

---

## 📰 Señales de mercado esta semana (Jul 10, 2026)

- **Assort Health $120M @$1.2B (Jun 24, 2026)**: Menlo Ventures. Voice AI → agentic OS patient journey. 190M+ interactions. 20x revenue. 115% labor capacity.
- **Q2 2026 Healthcare AI $4.1B record**: 120+ deals. 6+ rondas >$100M. Enterprise contracts firmados.
- **HeartAgent (Mar 2026, arXiv:2603.10764)**: explainable cardiology differential diagnosis. >36% mejora MIMIC-IV.
- **BAAI Cardiac Agent (Apr 2026, arXiv:2604.04078)**: cardiac MRI multimodal. Beijing AI Institute.
- **EchoAgent (arXiv:2604.05541)**: echocardiography Eyes+Hands+Minds.
- **DermAgent (MICCAI 2026, arXiv:2605.14403)**: dermatología Plan-Execute-Reflect. Supera SOTA en 5 benchmarks.
- **MA-RAG (ICML 2026, NJU-RL/MA-RAG)**: multi-round agentic RAG: conflict → consensus.
- **PhysicianBench (Stanford HealthRex, arXiv:2605.02240)**: 100 tasks, 670 sub-checkpoints, 21 specialties.
- **EHR-Complex (arXiv:2606.23301, Jun 22)**: 52K tasks MIMIC-IV. Top model 62.3% accuracy.
- **Sovereign AI**: hospital-owned LLMs. CIO pitch sin BAA. NVIDIA IGX + Clara + Meditron. LATAM driver: LGPD.
- **Bessemer 2026**: RadNet AI mammography — 36% de 747k+ mujeres eligieron; 43% mayor detección.
- **npj Digital Medicine scoping review (Jul 2026)**: primera revisión sistemática de agentic AI healthcare. 7 estudios.
- **Amigo AI $11M Series A (Mar 2026)**: Madrona + Optum Ventures. "Train clinical AI agents like doctors."
- **Trase $107M seed (Jun 25, 2026)**: ARCH Venture. Back-office AI agents. Duke Health: 5k+ faxes/mes.
- **xCures $46M Series B (Jun 24, 2026)**: Clinical clarity engine. Datos fragmentados → decision-ready.
- **UHG PreCheck PA**: prior auth 8h → 30s. $1.5B AI investment.
- **FDA K253281**: UpDoc — primer LLM patient-facing clearado como SaMD.
- **ARPA-H ADVOCATE**: primer agente cardiovascular AI con FDA track.
- **TEFCA 1B exchanges**: infraestructura nacional para AI agéntico a escala.

---
*Pipeline automático — se actualiza cada hora.*
