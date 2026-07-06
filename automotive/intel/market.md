# 🗺️ Market Map — Automotive AI

> Key players, market sizing, LATAM opportunities, Globant positioning.
> Last updated: 2026-07-06

---

## Global Market Size

| Metric | Value | Source |
|--------|-------|--------|
| Global Automotive AI market 2026 | **$5.80B → $14.99B** (different analyst scopes) | Fortune BI / MarketsAndMarkets |
| Projected 2034/2035 | **$51.68B – $58.99B** | Multiple analysts |
| CAGR 2026–2035 | **28.76%** | Fortune Business Insights |
| SDV hardware revenue by 2029 | **~$755B** (central compute + quasi-zonal) | IDTechEx |
| SDV feature revenue CAGR to 2035 | **30–34%** | IDTechEx |
| Generative AI in Automotive market 2026–2035 | High double-digit CAGR | GM Insights |

---

## Global Key Players

| Company | Type | Strength | Weakness |
|---------|------|----------|----------|
| **NVIDIA** | Semiconductor / Platform | Alpamayo ecosystem, DRIVE AGX compute, OEM partnerships (JLR, Lucid, Uber) | Non-commercial model license limits direct productization |
| **Waymo** | Robotaxi OEM | Most mature Level 4 deployment (SF, Phoenix, LA) | Closed stack, limited OS contribution |
| **Tesla** | OEM + AI lab | Massive fleet data advantage, FSD v12 E2E model, Dojo supercomputer | Fully proprietary, no open source |
| **comma.ai** | OSS ADAS | openpilot MIT, world-model training breakthrough, 300+ car support | Focused on aftermarket ADAS, not full L4 |
| **Autoware Foundation** | Open-source consortium | World's largest open AV stack, 100+ companies, used in production | Fragmented contributions, slow safety certification |
| **BYD** | EV OEM | Largest EV manufacturer, own SDV platform, aggressive LATAM expansion | Proprietary stack, geopolitical headwinds in some markets |
| **Qualcomm** | Semiconductor | Snapdragon Cockpit Elite for on-device GenAI, massive OEM licensing | No OSS AV stack |
| **Eclipse Foundation** | Open-source consortium | SDV middleware (KUKSA, Leda, Velocitas), 50+ member companies | Pre-production; S-CORE still reaching v1.0 |
| **Bosch** | Tier-1 supplier | KUKSA contributor, SDV middleware, ADAS components | Legacy stack; transforming slowly |

---

## LATAM Automotive AI Market

| Region | 2023 Market | 2030 Projection | Key Driver |
|--------|------------|----------------|------------|
| Latin America total | **$193.5M** | **$1,260.9M** | Connected vehicles, fleet AI, ADAS adoption |
| Brazil | Largest LATAM share | Strong growth | Fleet modernization, Uber/Lyft ride-hail AI, logistics |
| Mexico | Second | Growing | Manufacturing hub (GM, Ford, BMW plants), export-oriented |
| Chile + Colombia | Smaller but active | Growing | Mining fleets, urban mobility platforms |
| Argentina | Nascent | Growing | Economic recovery; EV policy uncertainty |

**Key LATAM verticals for Globant engagements:**
- **Commercial fleet management** — Brazil has one of the world's largest truck fleets; AI predictive maintenance and routing are immediate ROI
- **Ride-hail platforms** — Uber/99/InDriver use AI dispatch and routing across LATAM
- **Mining & agricultural fleets** — Chile, Peru, Brazil; autonomous haul trucks (Komatsu, Caterpillar) + AI monitoring
- **Urban mobility** — Connected public transit in São Paulo, Mexico City, Bogotá
- **Dealership networks** — AI-powered CRM + inventory for multi-brand dealer groups

---

## Competitive Landscape by Solution Area

### Autonomous Driving Stack
```
Open-source:   Autoware (Apache-2.0) > openpilot (MIT) > AlpaSim (Apache-2.0)
Proprietary:   Waymo Driver > Tesla FSD > Mobileye SuperVision
NVIDIA bridge: Alpamayo (non-commercial research) + AlpaSim (Apache-2.0 simulator)
```

### Fleet Management
```
Open-source:   Traccar (Apache-2.0) > Fleetbase (AGPL-3.0) > OpenRemote (Apache-2.0)
SaaS:          Samsara > Geotab > Verizon Connect
LATAM players: Cobli (Brazil), Rastrear (Brazil), Qualcomm FleetEdge
```

### SDV / In-Vehicle AI
```
Open-source:   Eclipse KUKSA (Apache-2.0) > Eclipse Leda > Velocitas
Proprietary:   AUTOSAR AP > Android Automotive OS > BlackBerry QNX
Chipsets:      Qualcomm Snapdragon Cockpit Elite, NVIDIA DRIVE AGX Orin
```

### Dealer Management Systems
```
Open-source:   Odoo Community (LGPL) > ERPNext (GPL) > Apache OFBiz (Apache-2.0)
Proprietary:   CDK Global > Reynolds & Reynolds > Dealertrack
LATAM ERP:     Odoo is dominant in SME automotive shops across LATAM
```

---

## Globant Positioning

**Where Globant can win:**

1. **Fleet AI for LATAM logistics companies** — Wrap Traccar/Fleetbase + Claude API into a branded predictive maintenance + route intelligence product. Fast time-to-market; open-source base reduces cost.

2. **SDV cockpit AI for OEMs** — Integrate Eclipse KUKSA + on-device LLM (Phi-3/Llama 3.2) into a privacy-preserving, offline-capable cockpit AI. Target Tier-1 suppliers (Bosch, Continental, Visteon) and emerging EV OEMs.

3. **ADAS simulation services** — Use CARLA + Autoware + AlpaSim as Globant's simulation lab for clients wanting to test ADAS features before hardware deployment.

4. **Dealership AI transformation** — Odoo + Claude API for AI-powered lead handling, service scheduling, parts forecasting. High ROI, fast deployment for dealer groups.

5. **Mining / agricultural autonomous fleet** — LATAM mining companies (Anglo American, Codelco, Vale) actively AI-piloting autonomous haul monitoring. Wrap Traccar + ML + LangGraph.
