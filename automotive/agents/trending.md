# 📈 Agentes trending esta semana — Automotive

> Última actualización: 2026-07-12 (v8)

## Novedades y movimientos destacados

### 🔥 LCDrive — CVPR 2026: Pensamiento Latente para AV Embebido
- **Repo**: [NVIDIA/LCDrive](https://github.com/NVIDIA/LCDrive) (Apache-2.0)
- **Por qué importa**: NVIDIA Research presentó LCDrive en CVPR 2026 (junto a GraspGen-X y NitroGen). El modelo reemplaza el chain-of-thought basado en texto con representaciones latentes compactas — el vehículo piensa en espacio latente espacial en lugar de generar tokens. Resultado: calidad de trayectoria comparable a Alpamayo a la mitad del costo computacional en hardware embebido (Jetson Orin, DRIVE AGX Thor). Crítico para despliegue en vehículos de bajo costo.
- **Acción**: Evaluar como alternativa a Alpamayo cuando hay restricciones de cómputo severas.

### 🌐 EMQX MCP-over-MQTT — Puente AI ↔ Vehículo Conectado
- **URL**: [emqx.com/blog/mcp-over-mqtt-for-intelligent-vehicle-data-insights](https://www.emqx.com/en/blog/mcp-over-mqtt-for-intelligent-vehicle-data-insights)
- **Repo**: [emqx/emqx](https://github.com/emqx/emqx) (Apache-2.0, ~15k stars)
- **Por qué importa**: EMQX (el broker MQTT open-source líder) pionereó la integración de MCP con MQTT para vehículos conectados. Resuelve el desafío fundamental: los vehículos hablan MQTT, los agentes AI hablan MCP. MCP-over-MQTT permite a agentes AI interactuar con vehículos en tiempo real sin cambiar el stack vehicular. Patrón adoptado por flotas y OEMs en H1 2026.
- **Acción**: Integrar en arquitecturas de fleet AI — patrón MCP-over-MQTT + LangGraph para análisis vehicular en tiempo real.

### 🚀 Metis — World-Action Model Generalizable (arXiv jul 2026)
- **Paper**: [arXiv:2606.15869](https://arxiv.org/abs/2606.15869)
- **Por qué importa**: Metis es un World-Action Model generalizable y eficiente para conducción autónoma y navegación urbana. A diferencia de modelos anteriores, unifica modelado del mundo + predicción de acciones en un único framework que generaliza a escenarios urbanos no vistos. Publicado en arXiv en junio 2026; código en proceso de liberación.
- **Acción**: Seguir para fine-tuning sobre escenarios urbanos LATAM.

### 🤖 Auto.dev MCP Server — Datos Automotrices para AI Agents
- **URL**: [auto.dev/mcp](https://www.auto.dev/mcp)
- **Por qué importa**: MCP server oficial de Auto.dev que da a agentes AI acceso directo a: VIN decode, listings de vehículos, recalls, calculadora de pagos, especificaciones técnicas. Claude y otros agentes pueden consultar datos de vehículos reales sin scraping. Acelerador para aplicaciones B2C de compra/venta y diagnóstico.
- **Acción**: Base para agentes de concesionario y comparador de vehículos.

### 📡 DriveX Workshop @ CVPR 2026 — Foundation Models para V2X
- **URL**: [drivex-workshop.github.io/cvpr2026](https://drivex-workshop.github.io/cvpr2026/)
- **Por qué importa**: 4ª edición del workshop DriveX (3 junio 2026, Denver). Foco en foundation models nativamente conscientes de percepción cooperativa y restricciones V2X reales: percepción multi-agente, predicción distribuida, planificación cooperativa para intersecciones inteligentes. Los papers de este workshop definen el estado del arte en V2X + AI para los próximos 12 meses.
- **Acción**: Leer papers para entender hacia dónde va la autonomía cooperativa.

### 🏎️ Qualcomm + Wayve — Snapdragon Agentic AI para SDVs
- **URL**: [qualcomm.com/news/onq/2026/01/from-software-defined-to-ai-defined-vehicle](https://www.qualcomm.com/news/onq/2026/01/from-software-defined-to-ai-defined-vehicle-snapdragon-chassis-agents)
- **Por qué importa**: CES 2026: Qualcomm introdujo "Snapdragon Chassis Agents" — AI agents nativos en el SoC del vehículo que actúan de forma independiente según contexto (agentic vehicle intelligence). Soporte L1 → L3. Marzo 2026: Qualcomm + Wayve (UK AV startup) anunciaron partnership para integrar el modelo end-to-end de Wayve en el Snapdragon Ride. Qualcomm + Google expandieron colaboración para llevar features AI al mercado más rápido.
- **Acción**: Investigar SDK de Snapdragon Chassis Agents para proyectos de OEM clients.

### 🛣️ Autoware VisionPilot — L2 ADAS Open Source con Pesos
- **Repo**: [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) (Apache-2.0)
- **Por qué importa**: Primer stack L2 ADAS completamente open-source con pesos del modelo incluidos. Modo mapless — sin necesidad de mapas 3D previos. OEMs en mercados emergentes pueden implementarlo sin licencias de Mobileye o Continental. CI activa jul 2026.
- **Acción**: Evaluar para proyectos de ADAS en LATAM con OEM local.

---
*Pipeline automático — se actualiza cada hora.*
