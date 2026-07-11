# Market Map — Energy AI

> Key players, market sizing, LATAM opportunities, Globant positioning.
> Last updated: 2026-07-11 (v3)

## Market Size (2026)

| Segment | 2025 Value | 2026 Value | 2030 Target | CAGR | Source |
|---------|-----------|-----------|------------|------|--------|
| AI in Energy (broad) | $22.82B | ~$27B | $60.6B | 21.4% | GlobeNewswire / StartUs Insights |
| AI in Power Grid Management | $8.4B | ~$9.7B | $46.7B (2035) | 17.7% | GM Insights |
| AI-Powered Smart Grid | $6.62B | $7.54B | $12.79B | 14.1% | Research and Markets |
| Generative AI in Utilities | $1.4B | $1.92B | — | 36.6% | GlobeNewswire Jul 2026 |
| Agentic AI in Energy | $0.64B | $0.90B | $14.9B (2035) | 36.65% | Precedence Research |
| AI in Renewable Energy | — | Growing | Large (2035) | ~28%+ | InsightAce Analytic / DataMintelligence |

**Key takeaway**: AI in energy is a multi-layered market. Agentic AI is the fastest growing segment (36.65% CAGR) but from a small base — this is where early movers like Globant can capture premium value.

## Global Players

| Company | Segment | AI Application | Open Source Angle |
|---------|---------|---------------|-------------------|
| NextEra Energy | Renewable utility | TimesFM 2.5 + WeatherNext 2 for asset planning; security-constrained power flow AI | Consumer of open tools (PyPSA-compatible) |
| AES | Renewable utility | Digital twins for lifecycle; Vertex AI predictive maintenance | Publishing open datasets |
| Fluence | Storage / grid services | Gemini agents across engineering knowledge bases (Jira, SharePoint, Salesforce); 30-50% engineering efficiency gain | Commercial AI on top of open storage models |
| Siemens Energy | Utility OEM | Enhanced AI-based energy management and renewable forecasting (April 2026) | Contributes to LF Energy projects |
| Schneider Electric | Utility OEM + EMS | AI-based grid balancing and demand-response efficiency (April 2026) | EcoStruxure platform; partial open APIs |
| Westinghouse | Nuclear | "Bertha" GenAI for nuclear construction; WNEXUS 3D digital twin | Internal tools |
| Adani | Multi-utility (APAC) | "Asset Operating System" — live operational data + enterprise IT AI | Regional leader |
| RTE France | TSO | Grid2Op creator; L2RPN challenge host; RL agents for TSO operations | Heavy LF Energy contributor |
| Alliander | DSO (Netherlands) | OpenSTEF production forecasting; s4casting foundation models | Major open source contributor — model to emulate |
| PNNL / DOE | Research | VOLTTRON platform; GridLAB-D; multiple DOE ARPA-E funded AI tools | Nearly all open source — foundational research |
| IBM / Hydro-Quebec | Utility + tech | GridFM (donated to LF Energy); power grid foundation models | Apache 2.0 donation — major open source contribution |
| **Argonne National Lab** | **DOE national lab** | **GridMind: multi-agent AI for grid control room (announced Mar 2026)** | **Research code; DOE open-access** |
| **Harvard SEAS** | **Academia** | **Power and AI Initiative: PowerAgent community; 14-project portfolio spanning AI for Power + Power for AI** | **All MIT open source (PowerMCP, PowerSkills, PowerWF, PowerFM)** |

## Key Research + Community Organizations

| Organization | Role | Key Output |
|-------------|------|------------|
| **LF Energy** (Linux Foundation) | Open source governance | EVerest, OpenSTEF, Grid2Op, OperatorFabric, GridFM, VOLTTRON (v10) |
| **Harvard SEAS — Power and AI Initiative** | Academic leadership | PowerAgent community; 5th GridFM Workshop (Mar 2026) |
| **Argonne National Laboratory** | DOE research | GridMind (Mar 2026); multi-agent grid control room |
| **TU Berlin (PyPSA group)** | Academic | PyPSA, PyPSA-Eur — de facto open energy planning standard |
| **Alliander** | Dutch DSO | OpenSTEF, s4casting — production-grade open source from a live DSO |
| **RTE France** | French TSO | Grid2Op, OperatorFabric — production tools open-sourced |
| **Fraunhofer IEE** | German research | pandapower — widely used in European distribution grid AI |

## LATAM Opportunity Map

| Country | Opportunity | Status | Ideal Product |
|---------|------------|--------|---------------|
| **Brazil** | ANEEL smart grid AI guidelines (May 2026) creating consulting demand; Petrobras AI pilots | Active RFP market | Grid AI consulting + OpenSTEF deployment |
| **Colombia** | XM (national grid operator) piloting ML-based congestion forecasting | Active pilot | Grid2Op + pandapower analysis service |
| **Chile** | CNE renewable curtailment reduction RFPs; PyPSA cited as standard | Active RFP | PyPSA scenario modeling + LLM reporting |
| **Mexico** | CFE announced AI pilot for transmission asset predictive maintenance | Pre-RFP | VOLTTRON + predictive maintenance agent |
| **Argentina** | ENRE grid modernization program; high renewable penetration planning | Emerging | PyPSA-LATAM + demand forecasting |
| **Peru** | OSINERGMIN digitization mandate 2026 | Emerging | Data pipeline + EMS modernization |

### LATAM First-Mover Gaps (No Incumbent as of July 2026)

1. **Spanish-language grid operator chatbot** — OperatorFabric + Claude for Spanish-speaking TSO/DSO operators. Zero competition.
2. **PIX/PSE-integrated demand response** — Link BESS dispatch decisions to local energy market settlements. No open solution exists.
3. **PyPSA LATAM Reference Models** — PyPSA-Eur is the gold standard for Europe; no equivalent for LATAM. First mover wins mindshare.
4. **EV Charging AI for LATAM fleet operators** — EVerest + PowerMCP smart charging agent; fleet operators (Rappi, LATAM Airlines, bus operators) are EV-transitioning with no charging AI available.
5. **Open DSO Forecasting** — OpenSTEF deployed for a LATAM DSO. Would be the first public reference case outside Netherlands.
6. **NEW: PowerMCP rapid PoC for LATAM utilities** — Utilities with OpenDSS (standard in LATAM distribution planning) can have an LLM-driven grid analysis PoC in 2-3 weeks using PowerMCP + PowerSkills. Globant can be the delivery partner.

## Globant Positioning

**Strengths to leverage:**
- LATAM presence + Spanish-language capability (critical for utility operator interfaces)
- AI Studios with LLM agent expertise (LangGraph, Claude API, CrewAI)
- System integration experience with industrial systems (SCADA, ERP, MES)
- Nearshore delivery for North American and European utility clients

**Recommended entry points:**
1. **PowerMCP PoC** — Fastest path: 2-3 week PoC for any utility with OpenDSS/PSS/E already deployed
2. **Predictive maintenance** — Lowest regulatory risk, high utility ROI; VOLTTRON + PyBaMM stack
3. **Load forecasting augmentation** — OpenSTEF as base; add Claude-based alert and report agent
4. **EV fleet charging optimization** — EVerest + smart charging; growing demand in LATAM and US
5. **Grid planning consulting** — PyPSA-based scenario modeling for renewable integration RFPs

---
*See also: `intel/trends.md` for detailed technical trend analysis.*
