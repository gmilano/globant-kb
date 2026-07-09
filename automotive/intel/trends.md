# Tendencias — Automotive AI

> Tendencias que dan forma al mercado en 2026.
> Última actualización: 2026-07-08

## Tendencias principales

### Trend 1: LLM en Vehículos — De General a Dominio-Específico
Fabricantes como Honda, Mercedes-Benz y Volkswagen están abandonando los LLMs genéricos e integrando modelos dominio-específicos entrenados con datos de navegación, controles de vehículo y reglas de seguridad. La fiabilidad supera al modelo general-purpose.

- **Signal**: Honda + Mercedes + VW embedding domain-LLMs 2026 (netguru.com)
- **Oportunidad Globant**: Fine-tuning de LLMs verticales automotrices para clientes OEM

### Trend 2: Cockpit Agentico — De UI a Agente Autónomo
El cockpit automotriz está pasando de interfaces rule-based a sistemas agénticos multimodales capaces de razonar, planificar y actuar. Qualcomm Snapdragon posicionado como base de esta revolución (L1→L3 escalable).

- **Signal**: Qualcomm "automotive agentic AI" announcement (abr 2026, iptechblog.com)
- **Paradigma**: Voz + visión + contexto → el cockpit responde al estado del conductor, tráfico, destino

### Trend 3: Software-Defined Vehicles (SDV) — El Auto como Plataforma
Los vehículos modernos tienen 100M+ líneas de código. La industria pivota a arquitecturas SDV donde el software define funcionalidades OTA. BYD es el líder en LATAM con este approach.

- **Signal**: BYD SDV architecture deconstructed community analysis (trending GitHub jul 2026)
- **Implicación**: Los autos necesitan CI/CD, testing de agentes, governance de modelos AI

### Trend 4: Edge AI para AV — Inferencia sin Nube
NVIDIA TensorRT Edge-LLM permite ejecutar LLMs y VLMs directamente en hardware automotriz embebido. Bosch, ThunderSoft, MediaTek ya tienen productos basados en esto (CES 2026).

- **Signal**: NVIDIA TensorRT Edge-LLM GA para automotive (developer.nvidia.com, jul 2026)
- **Implicación**: Los agentes AI en vehículo no necesitan latencia de nube → ADAS más seguros

### Trend 5: LLM-Powered Autonomous Driving — El reboot del AV
Tras una década de fracasos, la industria AV se reinventa con técnicas LLM/VLM. DriveVLM, DriveLM, DriveMLM son la nueva generación. Promesa de "world model" que entiende semántica del tráfico.

- **Signal**: Survey ScienceDirect 2026 "LLM-Powered Autonomous Driving" (sciencedirect.com 2026)
- **Referencia**: Awesome-LLM4AD tiene 300+ repos curados. Campo explota en 2025-2026.

### Trend 6: EV Fleet Management AI — BYD LATAM como Catalizador
BYD superó 100k órdenes en Brasil+México+Argentina. Los concesionarios y operadores de flota necesitan urgentemente software de gestión que entienda las particularidades del EV (range anxiety, charging, battery health).

- **Signal**: BYD Americas 100k orders (latamobility.com, jul 2026)
- **Oportunidad**: Traccar + AI layer para EV metrics: SOC, degradación batería, rutas de carga óptimas

### Trend 7: EU AI Act — Vehículos como Sistemas de Alto Riesgo
El Annex I del EU AI Act clasifica los sistemas AI que interactúan con funciones de seguridad vehicular como "alto riesgo". Auditores, evidencia de conformidad y certificación requeridos. Deadline agosto 2026.

- **Signal**: "Under Annex I of EU AI Act, in-vehicle AI = high-risk" (tandfonline.com 2026)
- **Urgencia**: OEMs europeos (VW, Mercedes, BMW) en validación cycles — oportunidad para compliance consulting

### Trend 8: Cooperative Driving (V2X) — La Red de Vehículos Conectados
V2X (Vehicle-to-Everything) permite que vehículos cooperen con infraestructura, otros vehículos y peatones. CARMA Platform del USDOT es la implementación open source de referencia para US.

- **Signal**: CARMA Platform 4.0 → ROS2 + V2X (usdot-fhwa-stol, 2025)
- **Implicación**: Nueva capa de datos (tráfico en tiempo real, emergencias) disponible para agentes AI

### Trend 9: Predictive Maintenance via AI + OBD-II
Los sensores OBD-II en vehículos modernos generan terabytes de datos. Los LLMs pueden analizar patrones para predecir fallos antes de que ocurran. Mercado: talleres + flotas corporativas.

- **Signal**: agentic-factory-hack (Microsoft MIT) — predictive maintenance orchestration
- **Stack**: python-OBD + Claude API + time series (darts o Prophet) → alertas proactivas

### Trend 10: Conducción Autónoma con Explicabilidad (XAI)
El EU AI Act requiere explicabilidad (Art. 13) para sistemas AI de alto riesgo. El approach de Graph VQA (DriveLM) permite que el vehículo responda "¿por qué tomaste esa decisión?" — clave para certificación.

- **Signal**: DriveLM Graph VQA — ECCV 2024 Oral, integración en CARLA 2026
- **Referencia**: "Agent2Agent Threats Safety-Critical LLM Assistants" taxonomy (arXiv 2026)

### Trend 11: LATAM Electromovilidad — La Ventana de 18 Meses
Brasil, México, Argentina, Chile y Colombia están en el punto de inflexión para EVs. El software aún va muy atrás. La ventana para soluciones locales (en español, con LGPD/PDPA compliance) es ahora.

- **Signal**: Argentina +874% EV (ene-abr 2026), México VEMO $1.5B, Brasil BYD lider
- **Ventana**: 12-18 meses antes que players globales localicen soluciones LATAM-específicas

---

## Señales a monitorear

| Señal | Por qué importa | Frecuencia |
|-------|-----------------|------------|
| openpilot releases | Primera ADAS open source en producción masiva | Mensual |
| Apollo versioning | Baidu AV stack = standard industry China | Mensual |
| Autoware Foundation announcements | Stack AV open source más adoptado | Semanal |
| BYD LATAM sales data | Catalizador del mercado EV LATAM | Mensual |
| EU AI Act guidance updates | Compliance vehicular = nuevo negocio | Quincenal |
| NVIDIA DRIVE OS releases | Determina capacidades edge AI en autos | Trimestral |
| CARLA Leaderboard 2.0 | Benchmark de estado del arte en AV | Semanal |
