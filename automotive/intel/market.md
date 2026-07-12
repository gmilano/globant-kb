# 🗺️ Mapa de mercado — Automotive AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-12 (v8)

## Tamaño de mercado

| Segmento | 2025-2026 | 2030-2035 | CAGR | Fuente |
|----------|-----------|-----------|------|--------|
| Automotive AI (global) | $18.83B (2025) | $38.45B (2030) | 15.3% | MarketsandMarkets 2026 |
| Automotive AI Agents | $4.01B (2026) | $10.31B (2035) | 11.06% | Precedence Research / FMI 2026 |
| Autonomous Vehicles | $177.20B (2025) → $220.58B (2026) | $656.37B (2031) | 24.37% | Coherent Market Insights 2026 |
| In-Cabin AI | $3.39B (2025) | $4.22B (2033) | 2.78% | SkyQuestt 2026 |
| AI Chatbot automotriz | — | $25B (2033) | 25% | Mihup 2026 |
| Gen AI in Automotive | Emergente 2026 | Aún proyectándose | >30% | IDTechEx 2026 |

**Distribución por tipo de agente (2026):**
- Autonomous Driving Agents: **45% del mercado** ($4.2B en ventas 2026)
- Conversational AI Agents: Mayor share en 2025, cediendo terreno a AV agents
- Segmento L3: **El de mayor crecimiento proyectado** 2025-2030
- Segmento transporte/logística: **76% del mercado AV** en 2026 (logistics, ride-hailing, delivery, automatización industrial)

## Players globales

| Empresa | Tipo | Fortaleza AI | Apuesta 2026 |
|---------|------|-------------|--------------|
| **NVIDIA** | Plataforma / chips | DRIVE AGX Thor + Alpamayo VLA 10B + LCDrive (CVPR) | Ecosistema AV completo: chip + modelo + simulación |
| **Qualcomm** | Chips / plataforma | Snapdragon Digital Chassis + Chassis Agents + vSoC en Google Cloud | Agentic AI en el SoC para SDV — L1 a L3 |
| **Wayve** (UK) | Startup AV | End-to-end AV model, NVIDIA-independent | Partnership Qualcomm (mar 2026): Snapdragon Ride + Wayve model |
| **Autoware Foundation** | OSS / consorcio | Stack AV Apache-2.0 más adoptado del mundo | VisionPilot L2 ADAS para OEMs sin licencias |
| **comma.ai** | Producto + OSS | openpilot en 300+ vehículos en producción | Monetizar dataset + hardware comma 3X |
| **OpenDriveLab (HKU)** | Research | UniAD CVPR Best Paper, DriveLM | Referencia académica global AV |
| **BYD** | OEM | Mejor relación AI/precio en EVs | DiLink AI, arquitectura SDV propia; expansión LATAM |
| **Mercedes-Benz** | OEM premium | MB.OS — LLM voice agent on-device con Liquid AI | Cabina 100% AI-nativa H2 2026 |
| **Honda / VW** | OEM | Embeddings LLMs para in-car queries, mantenimiento, gestión de energía | Domain-specific automotive LMs |
| **Lucid** | EV premium | Robotaxi Gravity con Uber (target late 2026); SoundHound AI offline | Primer robotaxi premium eléctrico |
| **LG Electronics** | Tier-1 / proveedor | AI Cabin Platform — GenAI on-device (cámara interna + externa) | Detección de somnolencia, contexto de manejo |
| **KPIT Technologies** | Consultoría | Agentic AI Suite sobre Azure AI Foundry | Orchestration + policy controls para OEMs |
| **Microsoft / AWS** | Cloud | BMW 2026 Neue Klasse en AWS; Azure KPIT; Qualcomm vSoC en Google Cloud | Cloud backbone para AV y cabina AI |
| **Google** | Cloud / OS | Expansion con Qualcomm Snapdragon Digital Chassis (2026) | Features AI al mercado más rápido para SDV |

## Oportunidades AI en LATAM

| Oportunidad | Contexto | Potencial Globant |
|-------------|----------|------------------|
| **Fleet management AI** | Brasil, México y Argentina tienen flotas enormes de transporte (camiones, taxis, delivery). Fleetbase + Traccar + LLM es la puerta de entrada. | Alto — integrar Fleetbase/Traccar + Claude para análisis de flota |
| **Taller automotriz inteligente** | Mayoría de talleres LATAM son PyMEs sin ERP. ERPNext + Car Repair Management + agente conversacional es accesible. | Alto — democratización de diagnóstico y presupuestación |
| **ADAS para mercados emergentes** | OEMs buscan soluciones ADAS baratas. VisionPilot (Apache-2.0) + hardware local (Jetson Orin). | Medio — requiere socio OEM local |
| **In-cabin voice agent** | Mercados de habla hispana y portuguesa sub-atendidos por asistentes de voz. Honda, VW, Mercedes aún sin producto EN/ES/PT para LATAM. | Alto — multilingüe nativo con Claude |
| **Diagnóstico OBD-II por AI** | Creciente parque de vehículos conectados. API OBD + Auto.dev MCP + LLM asequible. | Alto — app B2C/B2B directa |
| **EV charging optimization** | Expansión de EVs en LATAM, infraestructura aún escasa. Flota de delivery + optimización de carga. | Medio — optimización de rutas de carga |
| **MCP-over-MQTT integrations** | Flotas conectadas via MQTT (protocolo estándar vehicular). EMQX bridge + agente AI = fleet intelligence inmediata. | Alto — patrón nuevo sin adopción masiva aún en LATAM |

## Posicionamiento Globant

- **Diferenciador**: experiencia en integración de LLMs con sistemas heredados (ERPNext, Traccar) + desarrollo de soluciones multilingüe para LATAM
- **Entrada rápida**: Fleet AI (Fleetbase/Traccar + EMQX MCP + LangGraph + Claude) — 4-6 semanas a MVP
- **Apuesta 2026**: In-cabin AI agent (español/portugués) + MCP-over-MQTT para conectividad vehicular real-time
- **Oportunidad de investigación**: Fine-tuning de LCDrive / DriveAgent-R1 sobre datasets de conducción LATAM
- **Diferenciador técnico 2026**: dominar patrón MCP-over-MQTT — aún sin adopción masiva en LATAM
