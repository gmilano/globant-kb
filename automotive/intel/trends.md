# 📡 Tendencias — Automotive AI 2026

> Última actualización: 2026-07-05

## Megatendencias del sector

### 1. AI-Defined Vehicles (ADV) — la evolución del SDV
El sector está transitando de Software-Defined Vehicle (SDV) a **AI-Defined Vehicle (ADV)**: la IA no es solo una feature del cockpit sino el sistema nervioso que toma decisiones de percepción, conducción, eficiencia energética y servicio al conductor en tiempo real.

- NVIDIA presentó **Alpamayo**: modelo de 10B parámetros para razonamiento en escenarios complejos de conducción, apuntando a Level 4
- BYD lidera en integración SW-HW: sus vehículos tienen IA integrada en el chip de control de batería, sistema de frenado y suspensión activa
- Waymo y Uber confirman despliegue masivo de robotaxis en 2026

### 2. Edge AI + arquitectura híbrida
El modelo de AI puramente en la nube no funciona en automotive (latencia, conectividad). La arquitectura ganadora es híbrida:
- **Edge** (onboard compute): inferencia en tiempo real para seguridad crítica (frenado, percepción)
- **Cloud**: modelos grandes, actualización OTA, analytics de flota, fine-tuning

Impacto en open source: crecimiento de stacks como `cockpit-agent` que gestionan la orquestación cloud-edge, y de frameworks de inference en edge (TensorRT, ONNX Runtime).

### 3. Inspección visual con AI en manufactura — ROI probado
- Sistemas de visión AI reducen defectos de manufactura en **40-60%** (BMW, VW documentados)
- Adopción masiva de YOLOv8/v11 en líneas de producción tier-1 y tier-2
- Tendencia emergente: **multimodal** — CV + datos de sensor + historial de mantenimiento integrados en un agente único de quality control

### 4. LLM + MCP para talleres y diagnóstico
El patrón MCP (Model Context Protocol) emerge como el puente entre sistemas legacy de diagnóstico vehicular y LLMs:
- Técnico de taller consulta en lenguaje natural: "¿Qué vehículos necesitan cambio de correa antes de fin de mes?"
- LLM llama al servidor MCP que consulta el DMS/ERP y devuelve respuesta procesable
- Sin reescribir el stack legacy — reduce tiempo de adopción de semanas a días

### 5. Conducción autónoma open source para tier-2 y tier-3
- OEMs pequeños y medianos no pueden desarrollar su propio stack AV propietario
- **Apollo** y **Autoware** se consolidan como las bases de referencia para custom AV
- Ecosistema de simulación (CARLA, AirSim) permite validar antes de desplegar en vehículo real
- Apollo 11.0 se focaliza en deployments funcionales a escala en escenarios de alto valor

### 6. Agentes AI en concesionarios
- 68% de concesionarios reportan impacto positivo de AI en operaciones
- Principales aplicaciones: lead gen/CRM automatizado, pricing dinámico de usados, scheduling de servicio
- Próxima ola: agentes que cierran la cotización de reparación en tiempo real con el cliente (WhatsApp + LLM + datos de ERP)

### 7. Flotas EV y optimización de carga
- Adopción masiva de EV en flotas corporativas y de transporte público
- Problema: optimizar cuándo y dónde cargar minimizando costo y tiempo
- Solución: agentes RL + datos de tarifa eléctrica en tiempo real + estado de la flota
- Oportunidad en LATAM: Chile, Colombia, México con programas de renovación de flota de buses a EV

## Repos más activos esta semana

- [autowarefoundation/autoware_universe](https://github.com/autowarefoundation/autoware_universe) — Stack ROS 2 AV, actualización continua
- [commaai/openpilot](https://github.com/commaai/openpilot) — ADAS L2 open source, nuevo soporte de vehículos
- [LGDiMaggio/predictive-maintenance-mcp](https://github.com/LGDiMaggio/predictive-maintenance-mcp) — MCP + LLM para mantenimiento predictivo
- [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) — Testing de agentes AV en CARLA
- [SuperdeMan/cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) — Multi-agent cloud-edge para SDV
