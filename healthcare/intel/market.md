# 🗺️ Market Map — Healthcare AI

> Players, opportunities, positioning. Focus LATAM + global.
> Last updated: 2026-07-12 (v11)

## Market Size — AI in Healthcare

| Segment | 2026 | 2031/2035 | CAGR |
|---------|------|-----------|------|
| AI in Healthcare (global) | $36.67B | $194.79B (2031) | **39.7%** |
| Agentic AI in Healthcare | $1.14B | $33.66B (2035) | **45.6%** |
| Agentic AI (alt. estimate) | $1.03B | $5.78B (2031) | **42.03%** |
| Clinical Applications segment | — | — | **41.4%** CAGR |
| North America share | — | — | **55%** of agentic AI |

*Sources: MarketsandMarkets, Fortune Business Insights, Towards Healthcare (2026)*

## Global Players

| Company | Type | Strength | Relevant for Globant |
|---------|------|----------|---------------------|
| **Epic Systems** | Proprietary EHR vendor | Dominates US/EU EMR market. Launching AI ambient scribing + Aura AI platform. | Opportunity: AI integration over Epic via SMART on FHIR |
| **Microsoft / Nuance** | Cloud + AI | Azure Health Data Services, Dragon Ambient eXperience (DAX). Reference: healthcare-agent-orchestrator. | Natural partner for Azure-based deployments |
| **Google / DeepMind** | AI Research + Cloud | MedGemma/TxGemma (Apache-2.0), Vertex AI, Project AMIE (clinical conversations). | MedGemma local in LATAM: clinical AI without cloud |
| **Amazon AWS** | Cloud | AWS HealthLake (FHIR native), Comprehend Medical (NLP), HealthScribe. | Enterprise deployments in LATAM |
| **Philips** | Medtech + AI | Clinical decision support, imaging AI, patient monitoring. Philips OnCare Agent 2026. | AI integration over Philips equipment |
| **Tempus AI** | Clinical Data + Oncology | Clinical + genomic data platform. AI for precision oncology. | Healthcare data partnerships |
| **Veeva Systems** | Life Sciences + Health | CRM + data for pharma. Veeva AI Agent platform 2026. | Pharma + clinical trials |
| **Kore.ai** | Enterprise AI | Agentic AI platform for healthcare: scheduling, billing, prior auth. | RCM automation for LATAM hospitals |

## LATAM Opportunities

| Opportunity | Key countries | Recommended stack |
|-------------|--------------|-------------------|
| **Telemedicine + AI triage** | Brazil, Mexico, Colombia, Argentina | OpenMRS + CARE + CHA + MedGemma local |
| **AI scribing in Spanish/Portuguese** | All LATAM | openmed (ES/PT NER) + Whisper + Claude |
| **Regulatory pharmacovigilance** | Brazil (ANVISA), Mexico (COFEPRIS) | MALADE + OpenEMR + FHIR |
| **Rural health + indigenous communities** | Peru, Bolivia, Guatemala | IMAS + OpenMRS + multilingual local models |
| **ICU resource management** | Brazil, Mexico | CARE + MDAgents + proactive alerts |
| **Revenue Cycle Management (RCM)** | Mexico, Brazil, Colombia | Agents over OpenEMR + FHIR + LLM |
| **Medical image analysis** | Argentina, Chile, Brazil | OHIF + MedRAX + torchio + HAPI FHIR |
| **Clinical trial matching** | Brazil (Mayo Clinic trials) | FHIR-AgentBench + MedAgentBench + OpenMRS |

## Globant AI Studios Positioning

**Differentiated value proposition:**

1. **HIPAA + LGPD compliance by design**: openmed on-device eliminates cloud PHI risk. Key for LATAM hospital contracts.
2. **Open-source enterprise stack**: OpenEMR/OpenMRS + HAPI FHIR + MDAgents → 60-80% lower TCO vs proprietary solutions.
3. **Multilingual for LATAM**: openmed (12 languages), MedGemma, Whisper → clinical AI in Spanish/Portuguese.
4. **Time to impact**: Start from existing vertical platforms (OpenMRS, OpenEMR) = MVP in 8-12 weeks vs 18 months from scratch.

## Direct Competitors in LATAM

| Competitor | Type | Weakness vs Globant |
|------------|------|--------------------|
| Softtek | Regional SI | No AI Studios specialized in healthcare |
| Stefanini | Regional SI | AI portfolio limited to chatbots, no clinical agents |
| Local startups | Point product | No scale or regulatory expertise |
| Global consultants (Accenture, Deloitte) | Advisory | Expensive, slow, no agile product execution |
