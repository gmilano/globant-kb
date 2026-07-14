# 🗺️ Market Map — Healthcare AI (v6)

> Key players, market data, LATAM opportunities. Last updated: 2026-07-14.

## Market Size & Growth

| Segment | 2026 | 2030/2031/2033 | CAGR | Source |
|---------|------|----------------|------|--------|
| AI in Healthcare (global) | $50.7B | $505.6B (2033) | 38.9% | Fortune Business Insights |
| Agentic AI in Healthcare | $1.03B | $5.78B (2031) | 42.03% | Mordor Intelligence |
| LLM in Healthcare | $1.8B | $12.5B (2033) | 32.3% | Grand View Research |
| Clinical Decision Support AI | ~$4.5B | $15B+ (2030) | ~22% | Various |
| Healthcare Automation (RCM + prior auth) | ~$8B | $25B (2030) | ~18% | Various |

## Key Performance Benchmarks (2026)

| Benchmark | Best Result | Implication |
|-----------|-------------|-------------|
| CHI-Bench (arXiv:2605.16679) | Best agents fail **72%** of real clinical workflows | Agents not yet autonomous — HITL required |
| PhysicianBench (arXiv:2605.02240) | Best agents: **46% complete / 28% reliable** | Large reliability gap vs human physicians |
| Clinical diagnosis accuracy | GPT-4 **outperforms** many physicians in structured tests | Strong in benchmark, weak in real workflow |
| Documentation automation | **41%** reduction in physician clerical time | Highest ROI AI application today |
| Prior auth processing | **10x faster** with AI agents vs manual | $40B/yr waste target |

## Adoption Statistics (2026)

- **68%** of healthcare organizations already using AI agents
- **41%** reduction in physician clerical time from documentation agents
- **LLM agents on 47.2% CAGR** through 2030 in healthcare
- Care management teams deploying AI agents 24/7 for population health
- Big tech (Microsoft/Google/Amazon) concentrating on platform + foundation model layer

## Global Players — Market Map

| Company | Type | Strength | Weakness |
|---------|------|----------|----------|
| Epic Systems | Incumbent EHR | 35% US hospital share; AI copilot embedded | Closed ecosystem; expensive; US-centric |
| Oracle Health (Cerner) | Incumbent EHR | VA/DoD contracts; strong government | Migration friction; slower AI iteration |
| Microsoft (Azure AI Health) | Cloud + AI | Azure Health Data Services + OpenAI + Nuance Dragon | Licensing cost; cloud-only |
| Google Health AI (DeepMind) | Research + Cloud | MedPaLM 2, radiology AI, Vertex AI | Limited commercial EHR traction |
| Amazon AWS HealthLake | Cloud | FHIR-native lake; Connect for hospitals | Less clinical workflow depth |
| Nuance (DAX Copilot) | Ambient documentation | >$2B revenue; 300M+ ambient AI notes | Microsoft-owned; expensive |
| Waystar / Availity | RCM + prior auth | AI-driven claims automation | US-only focus |
| OpenMRS Community | OSS EHR | 42+ countries; LATAM strength | Needs AI layer built on top |
| Medplum | FHIR platform | Modern stack; developer-friendly; Apache-2.0 | Early-stage commercial support |
| openmed | Local AI | Privacy-first; 1,000+ models; Apache-2.0 | Early-stage; no enterprise SLA |

## LATAM Opportunities (Globant Focus)

| Country | Healthcare AI Maturity | Key Opportunity | Open Source Base |
|---------|----------------------|-----------------|-----------------|
| **Brazil** | Medium-High | AI-augmented UBS (primary care); LGPD-compliant local AI; telehealth for Amazon region | OpenMRS + openmed (on-premise) |
| **Colombia** | Medium | SISPRO national registry AI enrichment; rural diagnostic agents | OpenMRS + Care FE |
| **Mexico** | Medium | IMSS AI modernization; IMSS has 50M+ patient records | GNU Health + FHIR layer |
| **Argentina** | Medium | Hospital Garrahan AI pilots; public hospital modernization | GNU Health + medspacy |
| **Peru** | Low-Medium | CHW (community health worker) AI tools; Amazonian telemedicine | OpenMRS + CHA agent |
| **Chile** | Medium-High | FONASA digital transformation; mining sector occupational health | Medplum + custom AI |

## Globant Positioning

**Tier 1 (Build & Sell):**
- Clinical documentation automation (biggest ROI, lowest clinical risk)
- Prior authorization AI agents (openmed-agent base)
- FHIR integration & interoperability layer

**Tier 2 (Pilot → Scale):**
- Population health AI (risk stratification, care gap closure)
- Radiology AI workflow integration (torchio + MedSAM-Agent)
- Patient-facing conversational agents (CHA framework)

**Tier 3 (Research → Commercial):**
- Multi-disciplinary diagnostic agents (MDTeamGPT pattern)
- Surgical AI copilots (SurgBox pattern)
- Drug discovery acceleration (STELLA)

**Competitive Advantage:**
- LATAM presence + regulatory knowledge (LGPD/HIPAA)
- Open-source-first reduces client licensing costs
- Privacy-preserving AI: openmed (Apache-2.0) enables on-premise deployment

---
*v6 — 2026-07-14*
