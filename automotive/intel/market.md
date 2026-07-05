# 🗺️ Mapa de mercado — Automotive AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-05

## Tamaño de mercado

| Segmento | 2026 | Proyección | CAGR | Fuente |
|----------|------|-----------|------|--------|
| Automotive AI global | $14.99B | $51.68B (2034) | 16.7% | Fortune Business Insights |
| Autonomous Vehicles market | ~$80.49B | — | — | Industry estimates 2025 |
| AI Dealership adoption | 75% familiaridad con AI | 27% planean adoptar next year | — | Cox Automotive 2026 |

## Players globales por segmento

### Conducción autónoma / AV
| Empresa | Posición | Stack | Modelo de negocio |
|---------|----------|-------|-------------------|
| **Waymo** (Alphabet) | Líder L4, robotaxis en operación | Propietary + Waymo Open Dataset | B2C robotaxi, B2B licencias |
| **Baidu Apollo** | Líder en China, L4 en Beijing/Wuhan | Apollo open source + servicios cloud | Open core + cloud services |
| **NVIDIA** | Proveedor de silicon + software (DRIVE platform, Alpamayo model) | Propietary + curated OSS | B2B to OEMs |
| **comma.ai** | ADAS L2 consumer/prosumer | OpenPilot open source | Hardware (comma 3X) + data |
| **Autoware Foundation** | Stack AV open source para industria | Autoware Universe (Apache-2.0) | Consorcio OSS |

### Software-Defined Vehicles (SDV)
| Empresa | Posición | Diferenciador |
|---------|----------|--------------|
| **BYD** | Líder mundial en SDV + EV integration | Deep vertical integration, SW-HW co-design |
| **Tesla** | Over-the-Air, Autopilot/FSD, Dojo supercomputer | Datos de flota masivos (>3B km) |
| **Volkswagen Group** | CarIAd subsidiary, CARIAD OS | Plataforma para todo el grupo (VW, Audi, Porsche) |
| **Stellantis** | STLA platform con Amazon AWS partnership | Multi-brand SDV cloud partnership |

### IA en manufactura automotriz
| Empresa | Solución | ROI documentado |
|---------|----------|----------------|
| **BMW Group** | CV quality inspection en línea de producción | -40% defectos de pintura |
| **Volkswagen** | IA en robótica de ensamblaje + predictive maintenance | -50% tiempo de inactividad no planificado |
| **Toyota** | Kaizen AI — RL para optimización de secuencia de ensamblaje | +8% throughput en plantas |

## Oportunidades AI en LATAM

### Concesionarios y flotas (mercado más accesible)
- **75% de concesionarios** están familiarizados con AI pero solo adoptan herramientas básicas (chatbots de lead gen)
- **Brecha de servicio**: redes de concesionarios LATAM (México, Brasil, Colombia, Argentina) usan ERP fragmentados o planillas Excel para gestión de taller
- **Oportunidad Globant**: implementar ERPNext/Odoo + capa agéntica LLM para gestión de OT, presupuestos y seguimiento al cliente — diferenciador frente a SAP/DMS propietarios costosos

### Inspección de daños (aseguradoras)
- Las aseguradoras LATAM procesan siniestros manualmente con ajustadores en campo
- **A.I.-AutoInspector pattern**: fotos del vehículo → estimación de daño → presupuesto en minutos
- Regulación favorable en Brasil y México para peritaje digital desde 2025

### Flotas de transporte urbano
- Municipios LATAM con flotas de buses eléctricos (Santiago, Bogotá, CDMX) sin plataforma de mantenimiento predictivo
- **Oportunidad**: Fleetbase + predictive-maintenance-mcp + Ollama local en edge

## Posicionamiento Globant

| Capacidad | Ventaja competitiva | Caso de uso flagship |
|-----------|--------------------|--------------------|
| AI Engineering | Integración de LLMs con stacks legacy automotive (OBD-II, AUTOSAR, CAN bus) | DMS inteligente para grupo concesionario |
| Data & Analytics | Pipelines de sensor data para predictive maintenance a escala de flota | Flota de logística B2B con 500+ vehículos |
| Computer Vision | Inspección visual en línea de manufactura (YOLOv8 + custom models) | Planta de ensamblaje tier-1 en México/Brasil |
| Platform Engineering | Despliegue de Autoware/Apollo en hardware de cliente OEM | Prototipo AV para cliente mobility LATAM |
