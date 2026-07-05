# 📈 Agentes AI trending — Energy

> Qué está ganando tracción esta semana en el espacio energético.
> Última actualización: 2026-07-05

## Tendencias clave esta semana

### 1. MCP + LLMs para gestión de edificios
Un paper de Tandfonline (2026) documenta flujos de trabajo agénticos con MCP para modelado energético de edificios. Permite que LLMs controlen simulaciones EnergyPlus/OpenStudio vía llamadas de herramientas, generando automáticamente variantes de diseño y recomendaciones de retrofit. Globant puede construir sobre sinergym + MCP tools + Claude API.

### 2. Eletrobras × C3 AI — Smart Grid a escala en Brasil
Eletrobras desplegó C3 AI en su red de transmisión completa (agosto 2025), incluyendo zonas remotas. La plataforma detecta fallas, agrupa alarmas y alerta operadores en <10 segundos. Punto de entrada: ofrecer equivalente open source para utilities medianas usando GridAPPS-D + LangGraph.

### 3. Virtual Power Plants (VPP) con multi-agente
smartEMS-MultiAgent-Demo gana atención como demostrador de VPP con framework multi-agente. Combina BESS, solar distribuido y cargas flexibles. Patrón replicable con OpenEMS + LangGraph para clientes LATAM.

### 4. PyPSA-Eur cruzó modelos de Europa → LATAM
pypsa-meets-earth/pypsa-earth extiende PyPSA-Eur a cualquier región del mundo, incluyendo América Latina. Permite modelar sistemas energéticos nacionales completos con restricciones de red reales. Alta relevancia para utilities en Chile, Brasil, México.

### 5. Pronóstico probabilístico de renovables
proloaf (SOGNO platform) usa RNNs para producir intervalos de confianza en pronósticos de carga. Con la integración en redes de alta penetración solar (Chile/Brasil), es crítico para operaciones de mercado. Combina bien con pvlib + LangGraph.

## Repos con actividad reciente

| Repo | Actividad | Por qué importa |
|------|-----------|-----------------|
| [pypsa-meets-earth/pypsa-earth](https://github.com/pypsa-meets-earth/pypsa-earth) | commits activos 2026 | Modelos energéticos LATAM open source |
| [openremote/openremote](https://github.com/openremote/openremote) | 1.8k★, releases regulares | IoT + EMS con mercados eléctricos integrados |
| [MyEMS/myems](https://github.com/MyEMS/myems) | releases v4.x en 2025 | EMS MIT con VPP, microgrid, IA nativa |
| [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | papers 2025-2026 | RL estándar para optimización de edificios |
| [GRIDAPPSD/GOSS-GridAPPS-D](https://github.com/GRIDAPPSD/GOSS-GridAPPS-D) | financiado DOE | DERMS aplicaciones avanzadas de distribución |

---
*Pipeline automático — se actualiza cada hora.*
