# 🗺️ Mapa de Mercado — Automotive AI

> Players, oportunidades y posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-14 (v11)

## Tamaño de Mercado — 2026

| Segmento | Valor 2026 | Proyección | CAGR | Fuente |
|----------|-----------|-----------|------|--------|
| AI en Automotive (global) | $14.99B | $51.68B (2034) | 16.7% | Fortune Business Insights |
| AI en Automotive — alto rango | $27.33B | $78.09B (2030) | 23.37% | Knowledge-Sourcing |
| AI en Automotive — Acumen | $5.80B | $58.99B (2035) | 28.76% | Precedence Research |
| AI en Automotive — MarketsandMarkets | $18.83B (2025) | $38.45B (2030) | 15.3% | MarketsandMarkets |
| Software-Defined Vehicle (SDV) | $171.92B | $946.82B (2033) | 27.6% | Coherent Market Insights |
| SDV hardware (central compute) | — | $755B (2029) | — | IDTechEx |
| Vehicle Telematics AI | — | CAGR 33.8% | 33.8% | MarketsandMarkets segment |
| Qualcomm automotive revenue | $1.1B (Q1 FY2026) | $45B design-win pipeline | +15% YoY | Qualcomm Q1 FY2026 |

> **Nota de contexto**: Los rangos amplios de mercado reflejan distintas definiciones del segmento. El consenso es CAGR 15-29% con un mercado de $15-27B en 2026, convirtiéndose en $38-78B hacia 2030.

## Players Globales Clave

| Empresa | Tipo | Rol en Automotive AI | Open Source |
|---------|------|---------------------|-------------|
| **NVIDIA** | Tech | DRIVE AGX, DriveOS 7, NIM microservices (BEVFormer, SparseDrive); JLR 2026+ | Parcialmente |
| **Qualcomm** | Tech | Snapdragon Chassis Agents; $45B pipeline; Google Gemini integration; AIDV concept | No |
| **Waymo** | OEM/Tech | Líder robottaxi EE.UU.; autonomous ride-hailing; 6th gen Waymo Driver | No |
| **comma.ai** | Startup | openpilot (MIT, 60.6k★); World Model training paradigm v0.11 | MIT |
| **Autoware Foundation** | OSS | autoware L4 + vision_pilot L2; 11.8k★; Toyota, Tier IV, Apex.AI | Apache-2.0 |
| **Eclipse Foundation** | OSS Consorcio | Eclipse SDV: 32 OEMs; S-CORE v1.0 2026; Kuksa, Velocitas, uProtocol | Apache-2.0 |
| **Toyota / Lexus** | OEM | Autoware en producción; partner Tier IV; Woven City deployment | Contribuyente |
| **Volkswagen Group** | OEM | Snapdragon Chassis (CES 2026); EMQX telemática; TRATON en Eclipse SDV | Contribuyente |
| **BMW** | OEM | Snapdragon Chassis; ADAS expansion 2026-2027 | No |
| **Mercedes-Benz** | OEM | Snapdragon Chassis; Google Automotive AI Agent en MBUX | No |
| **BYD** | OEM | Líder EV mundial; NVIDIA DRIVE Hyperion L4; V2X con EMQX | No |
| **JLR** | OEM | Plataforma NVIDIA DRIVE AI desde vehículos 2026 | No |
| **Hyundai Mobis** | Tier-1 | Miembro Eclipse SDV (mayo 2026); ADAS integration | Contribuyente |
| **Mobileye** | Tier-1 | Computer vision ADAS; EyeQ chips; SuperVision expansion | No |

## Oportunidades AI en LATAM

### Flotas y Logística
- Brasil, México, Colombia, Chile tienen **flotas comerciales no digitalizadas** masivas (camiones, buses, taxis).
- La combinación Fleetbase + EMQX + Claude es aplicable hoy, con ROI en < 6 meses.
- Operadores de transporte de carga en Brasil (~500k vehículos) todavía sin telemetría AI.
- **México**: ~280k unidades de transporte de carga pesada; sector de logística $35B+ anual.

### Manufactura Automotriz
- **México** es el 6to mayor productor de vehículos del mundo (3.5M unidades/año).
- Plantas de GM, Ford, Stellantis, Toyota en Guanajuato, Puebla, Monterrey, Aguascalientes.
- Mantenimiento predictivo con AI tiene ROI demostrado: -30% downtime, -40% costos.
- Stack open-source (ERPNext + LangGraph + sensores IoT) sin licencias millonarias de IBM/SAP.
- **Post-nearshoring**: más inversión automotriz en México 2025-2027 por tarifas EE.UU.-China.

### Concesionarias (Dealerships)
- 40,000+ concesionarias en LATAM sin DMS digitales modernos.
- Odoo Fleet / Frappe Dealership como base; agente de calificación de leads encima.
- WhatsApp es el canal dominante: agente conversacional para test drives y servicio.
- Tasa de conversión de leads online < 10%; agente puede llevarla a 25-35%.

### Vehículos Eléctricos (EV)
- Chile: líder de carga EV en Sudamérica; infraestructura en expansión acelerada.
- Brasil: programa federal de EV 2026; subsidios a fabricantes nacionales y extranjeros.
- Agente de planificación de carga EV con OpenEMS + EMQX + LangGraph.
- Colombia: incentivos fiscales para EV; flota de buses eléctricos Bogotá, Medellín.

### Conducción Autónoma / ADAS
- Startups de robottaxi en São Paulo, Ciudad de México buscando validación de software.
- **Oportunidad**: Globant como partner de validación usando CARLA + nuReasoning para escenarios LATAM.
- Universidades en Brasil (USP, UNICAMP), México (ITESM, UNAM) con labs de AV sin stack completo.

## Posicionamiento Globant

**Fortalezas para aportar:**
- Integración de sistemas legacy (ERP, telemática) con capas AI modernas
- Experiencia en arquitecturas multi-agent (LangGraph, CrewAI)
- Presencia en México, Brasil, Colombia, Chile: mercados clave automotive LATAM
- Capacidad nearshore para OEMs que necesitan software SDV (Mexico City, Guadalajara)

**Propuesta de valor:**
1. **Fleet Intelligence**: Fleetbase + EMQX + agente predictivo → ROI en 90 días
2. **Dealer Copilot**: Odoo/Frappe + Claude → conversión de leads +25-40%
3. **ADAS Validation Lab**: Autoware + CARLA + nuReasoning → validación CI de agentes AV
4. **SDV Middleware**: Eclipse S-CORE + Kuksa → advisory a OEMs sobre arquitectura SDV
5. **VLA Fine-Tuning**: OpenDriveVLA + datos propietarios → custom AD agent para cliente

**Competencia directa:**
- Accenture / Capgemini: legacy SI; no mobile-first, no AI-native, no VLA expertise
- GlobalLogic / EPAM: fuerte en embedded; débiles en AI agéntica y LATAM
- Globant diferenciador: velocidad, open-source, AI-first (VLA + LangGraph), LATAM expertise

---
*Fuentes: IDTechEx SDV Report 2026, Qualcomm Q1 FY2026 earnings, Fortune Business Insights, MarketsandMarkets, Knowledge-Sourcing, Precedence Research, Coherent Market Insights, Eclipse SDV newsroom.*
