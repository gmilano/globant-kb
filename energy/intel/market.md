# 🗺️ Mapa de Mercado — Energy AI

> Players, oportunidades, posicionamiento. Foco global + LATAM.
> Última actualización: 2026-07-10

## Mercado Global — Cifras Clave

| Segmento | 2026 | 2034/2035 | CAGR | Fuente |
|----------|------|-----------|------|--------|
| AI en Energía (amplio) | $42.26B | $183.79B | 20.17% | Fortune Business Insights |
| AI en Power Utilities | $21.82B | $89.64B | 19.31% | Fortune Business Insights |
| Agentic AI en Energía | $897M | $14.9B (2035) | 36.65% | Precedence Research |
| Agentic AI en Energía alt. | $480M (2024) | $10.7B (2034) | 36.40% | Market.us |
| AI Power Grid Management | — | — | 20%+ | GM Insights |
| AI Software de Gestión Energética | — | — | alta | Mordor Intelligence |

**Takeaway**: El segmento de Agentic AI especificamente crece al doble del ritmo (36%+) que el AI energético amplio (20%), señalando que los agentes autónomos son el vector de mayor tracción en 2026-2035.

---

## Players Globales

| Empresa | Tipo | Producto AI Clave | Fortaleza | Debilidad para Globant |
|---------|------|-------------------|-----------|------------------------|
| **Siemens AG** | OEM/Software | PGIM (grid AI, mayor despliegue AI de red en Europa jun 2026: 15,000 km) | Integración OT/IT profunda | Solución propietaria, lock-in |
| **GE Vernova** | OEM/Software | Grid Intelligence; Predix para activos industriales | Datos de equipos, 100+ años de datos | Cerrado, difícil de customizar |
| **Schneider Electric** | OEM/Software | EcoStruxure AI; Energy Access Bridge | Edificios + grid + industria | Ecosistema cerrado |
| **ABB** | OEM/Software | ABB Ability; Lumada (Hitachi Energy) | Automatización industrial profunda | Vertical muy específica |
| **Honeywell** | Software/OEM | Forge Energy Management (IoT + analytics); partnership TCS feb 2026 | BEMS comercial/industrial | Enfoque en grandes enterprises |
| **IBM** | Software/AI | Watsonx para energía; AssetOpsBench (MIT) | IA empresarial, AI governance | No especializado en OT |
| **Microsoft** | Cloud/AI | Azure OpenAI + Agentic Energy Platform; copiloto energético | Plataforma universal + LLMs | No specialist en dominio energético |
| **NVIDIA** | Hardware/AI | NIM para energía; Open Power AI Consortium | Hardware + modelos optimizados | No soluciones de dominio |
| **EPRI** | Research/Consortium | Open Power AI Consortium; benchmarks abiertos | Credibilidad industria + datos | No delivery comercial |
| **Energy Web** | Blockchain/OSS | EW Chain; RECs blockchain; EW D3A market | Certificados verdes estándar | Adopción lenta, nicho |

---

## Oportunidades por Segmento

### 1. Grid Edge Intelligence (MAYOR OPORTUNIDAD)
- Integración de DERs (distributed energy resources): solar distribuida, EVs, BESS residencial
- Problema: utilities no tienen software para gestionar millones de activos pequeños
- Solución Globant: agente de coordinación DER sobre OpenEMS/openremote + PowerMCP
- Deal size: $500k-$5M por utility

### 2. Predictive Maintenance de Activos de Generación
- Turbinas eólicas, paneles solares, transformadores: sensores + ML
- Mercado: utilities, IPPs (Independent Power Producers)
- Solución Globant: pipeline de sensores IoT + ML + LLM agent para órdenes de trabajo
- Referencia: Snowflake sfguide-ai-powered-predictive-grid-maintenance (Apache-2.0)

### 3. Interconnection Study Automation
- Estudios de interconexión toman 2-5 años; EPRI targets 5x reducción con AI
- Open Power AI Consortium abrió el dominio con modelos públicos
- Solución Globant: agente PowerMCP + PyPSA para automatizar estudios de flujo de potencia
- Deal size: $200k-$2M por consultoría energética / TSO

### 4. Energy Trading & Portfolio Optimization
- Mercados spot volátiles + renovables intermitentes = necesidad de IA
- P2P trading emergente (arXiv:2507.14995)
- Solución Globant: agente de trading sobre lemlab + APIs de mercado
- Deal size: $300k-$3M por comercializador de energía

### 5. Carbon & REC Management
- Reportes ESG + compra de energía verde = proceso manual costoso
- Energy Web Chain + agentes de compra automática
- Deal size: $100k-$800k por empresa mediana-grande

---

## Oportunidades en LATAM

| País | Señal | Oportunidad |
|------|-------|-------------|
| **Brasil** | Mayor mercado de energía renovable de LATAM; Itaipu + solar en NE | Predictive maintenance hidroeléctrica + solar AI optimization |
| **Chile** | Líder en solar y litio; mercado eléctrico más desregulado de LATAM | Energy trading agents; baterías + solar; BESS optimization |
| **Colombia** | Hidroeléctrica 70% + transición eólica costa caribe | Grid stability agents; wind forecasting; DER coordination |
| **México** | CFE + mercado privado; 6 GW de renovables esperados 2026 | SCADA AI para CFE; energy efficiency industrial (manufacturing) |
| **Argentina** | Vaca Muerta (gas) + renovables costeras; crisis energética crónica | Demand response agents; eficiencia industrial; smart metering AI |
| **Uruguay** | 95%+ renovables; lider regional en transición energética | Modelo de referencia para grid 100% renovable + AI control |

**Ventaja Globant LATAM**: Presencia en todos estos mercados; puede hablar con utilities (Enel, AES, Engie, locales) que ya son clientes o conocidos.

---

## Posicionamiento Globant

- **Fortaleza**: puente entre dominio energético OT (con socios como Siemens/Schneider) y AI moderno (MCP, Claude, LangGraph)
- **Gap de mercado**: ningún SI global especializado en energy AI open source; las big 4 no tienen depth en Python/ML para energía
- **Propuesta**: "Energy AI Studio" — equipos especializados con PowerMCP + OpenSTEF + Grid2Op que pueden entregar en 8-20 semanas lo que un OEM tarda 2 años
- **Entry**: talleres de proof-of-concept de 4 semanas con utility o IPP → expand
