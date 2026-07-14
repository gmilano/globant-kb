# Mapa de mercado — Automotive AI

> Key players, oportunidades de mercado, posicionamiento. Foco global + LATAM.
> Última actualización: 2026-07-14 (v12)

## Tamaño de mercado

| Segmento | 2026 | 2030 | CAGR | Fuente |
|----------|------|------|------|--------|
| Automotive AI (amplio) | $27.33B | $78.09B | 23.37% | Knowledge Sourcing |
| Automotive AI (MarketsandMarkets) | $18.83B | $38.45B | 15.3% | MarketsandMarkets |
| AI in Automotive (Research&Markets) | $7.14B | $24.35B | 35.9% | R&M |
| Autonomous Vehicles total | $364B | — | 34.84% CAGR→2035 | Precedence Research |
| AI Automotive Agents | $1.62B (2025) | $13.98B (2032) | 42.5% | Fuentes diversas |
| ADAS AI Software | — | $216B (2030) | 23.4% | GM Research |

## Players globales — Plataformas & Software

| Empresa | Tipo | Fortaleza AI | Posición OSS |
|---------|------|-------------|--------------|
| **NVIDIA** | Hardware + SW | Alpamayo VLA, DRIVE platform, Omniverse AV | Alto — NVlabs modelos abiertos (gated) |
| **Waymo** | Robotaxi | Mayor flota comercial robotaxi. 50k+ viajes/semana San Francisco | Cerrado — algunos datasets públicos |
| **Comma.ai** | ADAS consumer | openpilot MIT, 61k★, 325+ cars | Muy alto — MIT total |
| **Autoware Foundation** | AD stack | Autoware Universe, Vision Pilot, 70+ miembros | Muy alto — Apache-2.0 |
| **Qualcomm** | Semiconductor | Snapdragon Ride: $45B design-win pipeline | Drivers abiertos |
| **Mobileye** | ADAS chips | REM mapping, EyeQ chips — lider en Tier-1 OEM | Cerrado |
| **Tesla** | OEM + AI | FSD v13, Dojo supercomputer, data flywheel | Cerrado |
| **BYD** | OEM EV | DiLink OS, God's Eye ADAS (12 cámaras, sin LiDAR) | Cerrado pero agresivo en precio |
| **Toyota/WOVEN** | OEM + AD | Woven Planet (ex Lyft Level 5), partner Autoware | Mixto |
| **Eclipse SDV** | Middleware | Kuksa, S-Core (32 OEMs), estándar SDV | Muy alto — Apache-2.0 |

## Players globales — OEM con AI fuerte (2026)

| OEM | AI Signal 2026 | Plataforma |
|-----|---------------|------------|
| **Mercedes-Benz** | MBUX Virtual Assistant con Google Automotive AI Agent — multi-turn, real-time Maps | Google collab |
| **BMW** | BMW Intelligent Personal Assistant — integración con AgentSDK 2025 | Propietario + partners |
| **Volkswagen/CARIAD** | Contribuyente Eclipse SDV, CARIAD AI stack | Eclipse SDV |
| **Hyundai/Kia** | LLM in-car 2025, robótica (Boston Dynamics) | Propietario |
| **GM/Cruise** | Robotaxi reboot post-accidente. AI en onStar 2026 | Propietario |
| **Stellantis** | STLA Brain + STLA SmartCockpit (Amazon Alexa) | Amazon collab |
| **Honda** | AI asistente LLM para in-car queries, mantenimiento, energía | Google/Propietario |
| **Li Auto / NIO / XPENG** | Agentes cognitivos en cabina full — Auto China 2026 SOTA en cockpit AI | Propietario (China) |

## Cadena de valor — dónde aplica AI

```
[Diseño & Ingeniería] → AI para simulación, CAE, PLM, generative design
         ↓
[Manufactura & Planta] → AI para quality control, predictive maintenance, MES
         ↓
[Logística & Supply Chain] → AI para demand forecasting, fleet routing, inventory
         ↓
[Ventas & Concesionarios] → AI chatbot, configurador, precios dinámicos
         ↓
[Posventa & Servicio] → AI diagnóstico OBD, mantenimiento predictivo, agentes remotos
         ↓
[In-Vehicle / Cockpit] → AI agentes cognitivos: voz, conducción, energía
         ↓
[Conducción Autónoma] → VLA models, ADAS, Robotaxi
```

---

## Mapa LATAM — Automotive AI

| País | Mercado Automotriz | Señal AI 2026 | Oportunidad Globant |
|------|-------------------|---------------|---------------------|
| **Brasil** | 2.4M veh/año, Volkswagen+GM+Stellantis, BYD | LGPD compliance, BYD Brasil DiLink AI, EV fleet São Paulo | Fleet AI agent WhatsApp+Pix, MES para plantas |
| **México** | 3.2M veh/año exportados, Audi+BMW+KIA+GMC | Nearshoring AI a EE.UU., T-MEC digital trade | AD simulation services, ADAS integration para Tier-1 MX |
| **Argentina** | 500k veh/año, Volkswagen+Renault+Toyota | Mercado local AI automotriz limitado por economía | Diagnóstico vehicular AI, concesionario chatbot |
| **Colombia** | Importador neto, flota comercial fuerte | Flotas de transporte masivo (Transmilenio) AI | Fleet management AI, telemática para transportadores |
| **Chile** | Importador, EV adoptando rápido (ENEL/movilidad) | Eficiencia flota EV, carga inteligente | EV fleet optimization agent |

### LATAM — Señales específicas 2026
- **BYD Brasil**: 5 plantas anunciadas, DiLink OS con AI cockpit — Globant puede integrar AI LATAM-localizada
- **China EVs en LATAM**: GWM, JAC, Chery, BYD compitiendo agresivamente — necesitan localización AI
- **WhatsApp-first fleet**: 65%+ conductores LATAM usan WhatsApp como canal principal — bots de flota en WhatsApp son quick win
- **LGPD (Brasil) + Ley 1581 (Colombia)**: datos de conducción = datos sensibles, requieren procesamiento local (on-vehicle o edge cloud Brazil/Colombia)
- **Nearshoring MX**: plantas de Audi (Puebla), BMW (SLP), KIA (NL) necesitan AI para manufactura lean

---

## Posicionamiento Globant

| Capacidad | Aplicación Automotive | Repos base |
|-----------|----------------------|------------|
| CrewAI / LangGraph multi-agent | Cockpit agents, fleet intelligence, diagnóstico | cockpit-agent, openpilot |
| RAG sobre datos técnicos | Mantenimiento predictivo, manual técnico agent | ERPNext, OpenVehicleDiag |
| MCP servers | Integración con fleet platforms, telemática | Fleetbase API, OpenRemote |
| Fine-tuning VLA | Adaptación de OpenDriveVLA/Alpamayo para OEM | CARLA, nuReasoning benchmark |
| WhatsApp-first | Bot de flota para LATAM (conductores, alertas) | Fleetbase webhooks + Twilio |
| Edge AI | Cockpit agent on-device (BLUE adapter, Snapdragon) | Eclipse Kuksa + cockpit-agent |
| EU AI Act compliance | AD = high-risk, requiere audit + explainability | Alpamayo reasoning traces |
