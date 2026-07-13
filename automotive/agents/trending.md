# Agentes Trending — Automotive

> Lo nuevo esta semana. Repos en ascenso, proyectos recientes, señales tempranas.
> Última actualización: 2026-07-13

## Novedades destacadas (julio 2026)

### NVIDIA Alpamayo — CES 2026 (enero) → producción Q1 2026
- **Repo**: [NVlabs/alpamayo](https://github.com/NVlabs/alpamayo)
- **Qué es**: Familia de modelos open-weights de NVIDIA para AVs. 10B params, razonamiento basado en video, genera trayectorias con cadena de pensamiento. Primer envío en Mercedes-Benz CLA (Q1 2026).
- **Por qué importa**: Primera vez que NVIDIA publica modelos de peso abierto para conducción autónoma. Compite directamente con Tesla FSD (propietario) y Waymo (propietario). AlpaSim (simulación) también open-source.
- **Dataset**: 1.727 horas de datos de conducción de 25 países, 2.500+ ciudades, multi-cámara/LiDAR/radar.

### predictive-maintenance-mcp — MCP nativo para industria
- **Repo**: [LGDiMaggio/predictive-maintenance-mcp](https://github.com/LGDiMaggio/predictive-maintenance-mcp)
- **Qué es**: Servidor MCP que conecta LLMs con análisis de vibraciones industriales y diagnóstico de fallas. Compatible con Claude, GPT, Ollama.
- **Por qué importa**: Primer framework MCP para mantenimiento predictivo con validación científica (Politecnico di Torino). Publicado en Zenodo con DOI. Casos de uso inmediatos para flotas y manufactura automotriz.

### autoware_vision_pilot — ADAS L2 totalmente open-source
- **Repo**: [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot)
- **Qué es**: Stack ADAS L2 gratuito y completamente open-source impulsado por AI End-to-End. Conducción autónoma para vehículos privados.
- **Por qué importa**: Autoware Foundation expande su portafolio más allá de L4 hacia el mercado masivo. Integración con hardware de bajo costo.

### Eclipse S-CORE v0.5 — SDV foundation alcanza primer milestone
- **Org**: [eclipse-score](https://github.com/eclipse-score)
- **Qué es**: Core de software seguro, modular y open-source para vehículos definidos por software. Primera versión pública (nov 2025). Release completa planificada 2026.
- **Por qué importa**: 76 repos, respaldo de la industria (Bosch, Continental, BMW). Base para proyectos SDV sin lock-in de vendor.

### LCDrive — razonamiento latente para AV (CVPR 2026)
- **Paper**: CVPR 2026 (NVIDIA Research)
- **Qué es**: Reemplaza el razonamiento textual (chain-of-thought) en AVs por representaciones latentes compactas. Calidad de trayectoria comparable a la mitad del costo de tokens en hardware embebido.
- **Por qué importa**: Eficiencia 2x en inferencia on-vehicle. Clave para despliegues edge.

### cockpit-agent — Multi-Agent para cabina inteligente
- **Repo**: [SuperdeMan/cockpit-agent](https://github.com/SuperdeMan/cockpit-agent)
- **Qué es**: Arquitectura cloud-edge multi-agent para cabinas inteligentes. Intención local rápida, planificación LLM en nube, control vehicular seguro (VAL).
- **Señal temprana**: Patrón de arquitectura que se está popularizando en proyectos de in-cabin AI.

## Sectores en ascenso

| Área | Señal | Oportunidad |
|------|-------|-------------|
| Mantenimiento predictivo MCP | 2+ repos activos, publicaciones académicas | Integración inmediata con Claude para flotas |
| SDV / Eclipse S-CORE | 76 repos, release 2026 | Base para proyectos SDV en OEMs europeos |
| Reasoning AVs (Alpamayo) | Open weights, CES momentum | Alternativa a modelos propietarios para clientes |
| In-cabin AI (VLMs) | Qualcomm, Mercedes, BMW | Proyectos de experiencia digital en vehículo |
| Robotaxis (Waymo, Zoox) | Expansión comercial 2026 | Oportunidades en backend / ops / safety AI |

---
*Pipeline automático — se actualiza cada hora.*
