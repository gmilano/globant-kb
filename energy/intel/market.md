# 🗺️ Mapa de mercado — Energy

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-05

## Tamaño de mercado

| Segmento | 2025 | 2026 | 2033/2034 | CAGR |
|----------|------|------|-----------|------|
| AI in Energy (global) | USD 5.1B | USD 6.0B | USD 22.2B (2033) | 20.4% |
| AI Smart Grid | USD 6.62B | USD 7.54B | USD 12.79B (2030) | 13.9% |
| AI in Renewable Energy | — | — | USD 75.6B (2034) | 17.2% |
| LATAM Smart Grid | — | — | ~USD 14B (2032) | — |

## Players globales

| Empresa | Tipo | Fortaleza | Debilidad |
|---------|------|-----------|-----------|
| **GE Vernova** | OEM + Software | Digital twins para plantas de energía; renovables + nuclear + gas | Lock-in propietario; costoso para medianas utilities |
| **Siemens AG** | OEM + Automation | MindSphere IoT; gestión de redes; SCADA Simatic | Integración compleja; ciclos largos de implementación |
| **Schneider Electric** | OEM + Software | EcoStruxure; microgrid; building management | Modelo SaaS caro; menos flexible que open source |
| **ABB Ltd.** | Robotics + Grid | Automation de subestaciones; robótica + AI para eficiencia industrial | Caro; orientado a grandes utilities y la industria |
| **Google DeepMind** | AI puro | AlphaEnergi: reducción 30% costos de refrigeración en data centers; partnership UK gov en fusión nuclear | No ofrece producto empaquetado para utilities externas |
| **IBM** | Cloud + AI | Watsonx para predictive maintenance de activos energéticos | Requiere ecosistema IBM; pricing complejo |
| **Honeywell** | OEM + Software | Building automation; Forge (plataforma IoT industrial) | Menos agilidad que startups; ecosistema semi-cerrado |
| **C3.ai** | SaaS AI | Plataforma enterprise AI; asociación Eletrobras Brasil 2025 | Pricing SaaS no accesible para utilities medianas LATAM |

## Startups y players emergentes

| Empresa | Foco | Relevancia Globant |
|---------|------|-------------------|
| **Nnaisense** | AI para redes eléctricas autónomas | Tecnología replicable con PyPSA + RL |
| **AutoGrid** | DERMS + VPP con ML | Competidor directo; oportunidad con open source |
| **Upvest** | Mercados de energía API-first | Integrable en soluciones Globant |
| **Opus One Solutions** | Grid intelligence platform | Modelo de negocio para propuesta DERMS |

## Oportunidades AI en LATAM

### Brasil 🇧🇷
- **Eletrobras × C3 AI**: desplegaron AI en red de transmisión completa (2025). Oportunidad: solución equivalente para distribuidoras medianas (CEMIG, COPEL, Energisa) con stack open source
- **Demanda data centers**: data centers consumen ya 1/3 de PPAs bilaterales en Brasil 2024. Oportunidad: demand response agent para gestión de cargas flexibles en grandes consumidores
- **Solar nordeste**: alta penetración solar en Ceará, PI, BA con curtailment. Oportunidad: pronóstico + despacho optimizado

### Chile 🇨🇱
- **Curtailment renovable**: 6,084 GWh cortados en 2025 (Atacama/Patagonia). Oportunidad crítica: agente de optimización de despacho + almacenamiento BESS
- **Coordinador Eléctrico Nacional**: digitalización de operaciones de red. Oportunidad: dashboards + agentes de análisis con PyPSA-Earth

### México 🇲🇽
- **CFE modernización**: grid aging; oportunidad en mantenimiento predictivo de subestaciones
- **Energías limpias IPPC**: desarrolladores solares/eólicos requieren forecasting preciso para ofertas de mercado

### Colombia 🇨🇴 / Argentina 🇦🇷
- **Microgrids rurales**: áreas sin acceso a red; oportunidad con OpenEMS + BESS + solar
- **EV fleet charging**: Bogotá, Buenos Aires expandiendo flota EV; optimización de carga

## Posicionamiento Globant

**Ventaja diferencial**: Globant puede entregar lo que C3 AI ofrece a Eletrobras, pero para utilities medianas a fracción del costo, usando PyPSA + LangGraph + Claude API + MyEMS como base.

**Propuesta de valor**:
1. Stack 100% open source (MIT/Apache) = sin licencias en producción
2. Modelos de optimización (PyPSA, pandapower) validados académicamente
3. Integración ágil con sistemas legacy (SAP, SCADA, PI Historian) vía APIs
4. Capacidad de construir en 8-12 semanas lo que tarda 18 meses en proyectos tradicionales

**Sectores de entrada prioritarios**: distribuidoras eléctricas LATAM medianas, desarrolladores de parques solares/eólicos, operadores de flotas EV, administradores de edificios corporativos.
