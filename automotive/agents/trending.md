# Trending esta semana — Automotive AI

> Señales de lo que está ganando tracción en julio 2026.
> Última actualización: 2026-07-10 (v3 — BMW OS X + Alexa+ CES 2026, Eclipse SDV momentum, AI-Defined Vehicles shift, Stellantis STLA Brain, Deloitte 6%→24% agentic manufacturing)

## Señales principales

### S0. NVIDIA Alpamayo-1 — El Primer Modelo VLA Razonador para AVs (CES 2026) ⭐ DESTACADO
NVIDIA lanzó **Alpamayo** en CES 2026 como el primer modelo open source de razonamiento VLA (Vision-Language-Action) para vehículos autónomos. Representa un cambio de paradigma: el vehículo *razona* el escenario antes de actuar (chain-of-thought), produciendo salidas explicables que satisfacen EU AI Act Art. 13.

- **Modelo**: [nvidia/alpamayo-1](https://huggingface.co/nvidia/alpamayo-1) | Apache-2.0 | 10B parámetros
- **Simulación**: [NVlabs/alpasim](https://github.com/NVlabs/alpasim) | Apache-2.0 | +1.700h datos reales
- **Adoptantes**: Mercedes-Benz, Jaguar Land Rover, Lucid Motors, Uber
- **Por qué importa**: Primer modelo open que permite al AV explicar sus decisiones → EU AI Act compliant

### S1. BMW iX3 Neue Klasse — OS X + Alexa+ + L2+ 130km/h (CES 2026) ⭐ NUEVO v3
BMW presentó en CES 2026 el primer vehículo de la plataforma **Neue Klasse** con tres novedades que marcan la pauta para el sector:

1. **BMW Operating System X (OS X)**: Plataforma cloud-native desarrollada in-house para OTA updates rápidos, integra BMW Panoramic iDrive con proyección en parabrisas.
2. **AI-powered BMW Intelligent Personal Assistant + Alexa+**: Amazon Alexa+ integrada directamente en el vehículo. Primer OEM en hacerlo. Comprende lenguaje natural + contexto de conducción.
3. **BMW Highway/Motorway Assistant**: L2+ hands-free hasta 130km/h (85mph). Primera solución de este tipo certificada en Alemania para autobahn.
4. **BMW Symbiotic Drive**: Computer central que unifica ADAS + parking con 20× la potencia de procesamiento del anterior.

- **Fuente**: [BMW Press Group iX3](https://www.press.bmwgroup.com/global/article/detail/T0454649EN/the-bmw-ix3-ushers-in-next-generation-innovations-at-ces-2026)
- **Implicación Globant**: Patrón BMW OS X + Alexa+ = template para cockpits agénticos OEM. Claude como alternativa open a Alexa+ para OEMs LATAM.

### S2. AI-Defined Vehicles — Shift Narrativo (CES 2026, Frost & Sullivan) ⭐ NUEVO v3
La narrativa de la industria se desplaza de "Software-Defined Vehicles" (SDV) a **"AI-Defined Vehicles"** (ADV). Los OEMs se enfrentan a competir no en hardware sino en la capacidad de desplegar, validar, monitorear, actualizar y monetizar AI de forma segura en todo el ciclo de vida del vehículo.

- **Signal CES 2026**: Automakers used CES 2026 to emphasize AI rather than electrification — physical and context-aware AI as competitive differentiator.
- **Frost & Sullivan**: "From Software to AI-Defined on Wheels" (frost.com, ene 2026)
- **Implicación**: Los deals con OEMs deben posicionarse como "AI integration stack" no solo "software services"

### S3. Autoware Vision Pilot — L2 ADAS End-to-End AI (abr 2026)
La Autoware Foundation lanzó `autoware_vision_pilot`, un stack ADAS L2 completamente open source y production-ready basado en IA End-to-End. Primera alternativa OSS seria a Tesla FSD para OEMs.

- **Repo**: [autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0

### S4. Eclipse SDV Ecosystem — Momentum OEM (2026) ⭐ NUEVO v3
El ecosistema **Eclipse SDV** (Software Defined Vehicle) gana tracción real con OEMs en 2026. KUKSA + Velocitas + Leda forman el stack de middleware open source que permite crear Vehicle Apps containerizadas con AI in-vehicle.

- **Eclipse KUKSA**: Data Broker VSS — el "gRPC de las señales del vehículo"
- **Eclipse Velocitas**: Toolchain para apps — SDK Python/C++, templates, CI/CD
- **Eclipse Leda**: Linux distro SDV mínima con container orchestration
- **Adopción**: Tier 1 automotrices y startups SDV usan Eclipse SDV como base de interoperabilidad
- **Por qué importa para Globant**: Stack 100% Apache-2.0 → construir sobre él sin royalties. Base para ofrecer Vehicle Apps services.

### S5. Stellantis + Applied Intuition — STLA Brain Vehicle OS (2026) ⭐ NUEVO v3
Stellantis y **Applied Intuition** expandieron su partnership estratégico para escalar **STLA Brain** (el sistema central de cómputo de Stellantis) con:
- **Vehicle OS**: Sistema operativo vehicular de Applied Intuition
- **Cabin Intelligence**: AI para cockpit y experiencia del conductor
- **Autonomy Systems**: Funciones de conducción autónoma

- **Fuente**: appliedintuition.com/press-releases/stellantis-applied-intuition-vehicle-os-stla-brain
- **Signal**: Primer OEM de volumen (14 marcas: Jeep, Dodge, Chrysler, Fiat, etc.) con AI-native vehicle OS

### S6. BYD SDV Architecture Deep-Dive (comunidad, jul 2026)
Repositorio de análisis de la arquitectura SDV de BYD se volvió viral. BYD lidera LATAM con 100k+ órdenes BR+MX+AR. Interés en el stack de software que habilita sus ventajas.

- **Repo**: [Deconstructing-BYD-Technology-Architecture](https://github.com/vaisakhvenugopal/Deconstructing-BYD-s-Technology-Architecture)
- **Signal**: BYD = primer OEM chino con plataforma SDV en LATAM a escala

### S7. LEAD CVPR'26 + CARLA Leaderboard 2.1 — Nuevo SOTA en AD End-to-End
LEAD (kesai-labs, CVPR 2026) establece nuevo SOTA en conducción end-to-end. CARLA Leaderboard v2.1 (mar 2026) con scoring de infracciones mejorado.

- **Repo LEAD**: [kesai-labs/lead](https://github.com/kesai-labs/lead) | MIT
- **Leaderboard 2.1**: [carla-simulator/leaderboard](https://github.com/carla-simulator/leaderboard) | MIT

### S8. OBD-II + LLM — Nueva Categoría de Diagnóstico Agentico (jul 2026)
La combinación de adaptadores ELM327 Bluetooth ($15) + APIs LLM ha creado diagnóstico vehicular conversacional. AI diagnostic assistant alcanza **85% confidence** en diagnósticos complejos (P0420 = catalytic converter vs exhaust leak).

- **open-mechanic**: [speed785/open-mechanic](https://github.com/speed785/open-mechanic) | MIT | 120★
- **Vehicle-Diagnostic-Assistant**: [castlebbs/Vehicle-Diagnostic-Assistant](https://github.com/castlebbs/Vehicle-Diagnostic-Assistant) | MIT | 200★
- **Oportunidad**: App white-label de diagnóstico para talleres LATAM en español ($15 OBD + Claude API)

### S9. GTC 2026: BYD + Geely adoptan NVIDIA DRIVE Hyperion para L4 (mar 2026)
NVIDIA anunció en GTC 2026 que BYD, Geely, Isuzu y Nissan adoptarán NVIDIA DRIVE Hyperion para programas L4. Mayor movimiento de NVIDIA para dominar la plataforma de referencia AV L4 globalmente.

- **Implicación Globant**: BYD ya usa NVIDIA stack → oportunidad de integración SDV + AI layer para concesionarios LATAM

### S10. Agentic AI Manufacturing — Deloitte 6% → 24% en 2026 ⭐ NUEVO v3
Deloitte predice **cuádruple aumento** de agentic AI en manufactura, de 6% a 24% de adopción en 2026. En automotive, downtime de línea de ensamble cuesta **$22,000/minuto** — la ROI de predictive maintenance agentica es inmediata.

- **Dato clave**: LLM interest en manufactura: 16% → 35% en un año (language-based diagnostic tools)
- **Agentic vs predictive**: Predictive AI dice "bearing falla en 22 días". Agentic AI también: redacta plan, checa inventario, agenda técnico, coordina work order — sin intervención humana.
- **Stack**: python-OBD + Claude API + time series (Prophet) → alertas proactivas + work orders automáticos

---
*Pipeline automático — se actualiza cada hora.*
