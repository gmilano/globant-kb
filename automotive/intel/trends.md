# Tendencias — Automotive AI 2026

> Señales clave del mercado. Qué está pasando y qué significa para los proyectos.
> Última actualización: 2026-07-13

## T1 — Software-Defined Vehicles (SDV) como prioridad estratégica #1

**Señal**: 45% de OEMs y suppliers priorizan SDV sobre todo lo demás. 57%+ de equipos de desarrollo desplegando arquitecturas SDV globalmente (IoT Analytics, 2026).

**Qué significa**: El vehículo como plataforma de software. OTA updates frecuentes (Tesla weekly, BYD semanal). BMW "Neue Klasse" (2026) con OS X cloud-native. Separación hardware/software = oportunidad de servicios continuos.

**Oportunidad Globant**: Integración SDV, Eclipse S-CORE, continuous deployment vehicular.

---

## T2 — Arquitectura Zonal reemplaza ECUs distribuidas

**Señal**: Transición de sistemas distribuidos (100+ ECUs) a arquitecturas zonales con 3-5 compute units centrales. Reduce peso de cableado, costo, y complejidad.

**Qué significa**: Centralización = más capacidad de AI on-vehicle. Qualcomm SA8295P en BMW, GM, Stellantis. NVIDIA Orin (254 TOPS) estándar L2/L3. NVIDIA Thor (2.000 TOPS) para L4.

**Oportunidad Globant**: Software zonal, middleware de comunicación entre zonas, testing de integración.

---

## T3 — ADAS L3 → L4 expansion y robotaxis comerciales

**Señal**: L3 highway pilot en múltiples OEMs (Mercedes Drive Pilot, BMW). L4 robotaxis en expansión: Waymo Las Vegas (2025) + cobra rides 2026. Zoox Las Vegas late 2025, SF pronto. China: BYD/Huawei NOA dominando L2+ urbano.

**Qué significa**: El stack autónomo se está comercializando. El desafío se mueve a escala, safety validation y operaciones.

**Oportunidad Globant**: Backend de operaciones para robotaxi, safety AI, simulation & validation pipelines.

---

## T4 — NVIDIA Alpamayo: modelos open-weights con razonamiento para AVs

**Señal**: CES 2026 — NVIDIA lanza Alpamayo, familia open-source de modelos para AVs. 10B params, video input, genera trayectorias + chain-of-thought. Primer envío en Mercedes-Benz CLA (Q1 2026). Dataset: 1.727h, 25 países. AlpaSim también open-source.

**Qué significa**: Primera vez que modelos AV de grado producción son open. Compite con FSD (Tesla) y Waymo (ambos propietarios). Democratización de reasoning para autonomía.

**Oportunidad Globant**: Fine-tuning de Alpamayo para clientes OEM, integración con pipelines de validación CARLA.

---

## T5 — LCDrive: razonamiento latente 2x más eficiente (CVPR 2026)

**Señal**: NVIDIA Research presenta LCDrive en CVPR 2026. Reemplaza chain-of-thought textual por representaciones latentes compactas. Misma calidad de trayectoria a la mitad del costo computacional en hardware embebido.

**Qué significa**: Eficiencia crítica para despliegue edge en vehículos. Reduce costos de inferencia on-device para sistemas autónomos.

**Oportunidad Globant**: Optimización de inferencia AI para clientes con hardware vehicular limitado.

---

## T6 — MCP como protocolo de integración industrial

**Señal**: Emergen servidores MCP para industria física: `predictive-maintenance-mcp`, `mcp-motor-current-signature-analysis`. LLMs (Claude, GPT, Ollama) consultando señales de vibraciones, corriente, temperatura directamente.

**Qué significa**: La misma arquitectura MCP que conecta LLMs a bases de datos y APIs se extiende a sensores físicos. Mantenimiento predictivo conversacional es un caso de uso inmediato.

**Oportunidad Globant**: Construir servidores MCP especializados para equipos de producción automotriz, líneas de ensamblaje, flotas.

---

## T7 — In-Cabin AI: VLMs y asistentes multimodales

**Señal**: Mercedes MBUX con Google Automotive AI Agent (Gemini). Qualcomm Snapdragon Cockpit con VLMs procesando interacciones AI en edge. BMW Next-Gen cockpit con OS X. Arquitecturas como cockpit-agent (cloud-edge multi-agent).

**Qué significa**: El cockpit como plataforma AI de conversación, reconocimiento de contexto, control del vehículo mediante lenguaje natural.

**Oportunidad Globant**: Diseño de experiencia in-cabin, integración de VLMs con sistemas de entretenimiento y control.

---

## T8 — V2X y MQTT como backbone de inteligencia vehicular

**Señal**: EMQX adoptado por SAIC-VW para millones de vehículos. V2X (Vehicle-to-Everything) crece como estándar de comunicación. Satellite links + edge computing para cobertura en zonas sin red.

**Qué significa**: La flota conectada genera datos en tiempo real procesables por AI. Oportunidades en analytics de flota, alertas predictivas, optimización de tráfico.

**Oportunidad Globant**: Arquitecturas de datos IoV (Internet of Vehicles) con EMQX + AI analytics.

---

## T9 — EVs y optimización de carga como caso AI

**Señal**: Proliferación de EVs en toda LATAM (especialmente Chile, Brasil). Optimización de rutas de carga, gestión de baterías, predicción de demanda en charging networks.

**Qué significa**: Nuevo dominio de optimización donde AI agrega valor inmediato. Flotas de taxis/delivery que migran a EV necesitan herramientas de planificación.

**Oportunidad Globant**: Agentes de optimización de carga + routing para flotas EV en LATAM.

---

## T10 — Manufactura automotriz + AI: calidad y predicción

**Señal**: México = 4to productor mundial de vehículos. Maquiladoras (BMW San Luis Potosí, GM Silao, Ford Cuautitlán) invirtiendo en Industry 4.0. Computer vision para inspección de calidad. Mantenimiento predictivo para líneas de ensamblaje.

**Qué significa**: El mayor mercado de servicios AI para Globant en automotive es manufactura, no los vehículos en sí.

**Oportunidad Globant**: Visión computacional para calidad, agentes de mantenimiento predictivo, digital twins de línea de producción.

---

## Resumen ejecutivo

| Tendencia | Madurez | Urgencia | Prioridad Globant |
|-----------|---------|---------|-------------------|
| SDV / Zonal architecture | Alta | Alta | ★★★★★ |
| Mantenimiento predictivo MCP | Media | Alta | ★★★★★ |
| In-Cabin AI (VLMs) | Media | Alta | ★★★★☆ |
| Robotaxi backend/ops | Baja-Media | Media | ★★★☆☆ |
| ADAS validation (CARLA) | Media | Media | ★★★★☆ |
| V2X / IoV analytics | Alta | Media | ★★★★☆ |
| EV charging optimization | Media | Alta (LATAM) | ★★★★☆ |
| Alpamayo fine-tuning | Baja | Baja | ★★★☆☆ |
| Manufactura / quality AI | Alta | Alta | ★★★★★ |
