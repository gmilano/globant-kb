# 🗺️ Mapa de mercado — Retail & Consumer AI

> Players globales, oportunidades LATAM, posicionamiento Globant.
> Última actualización: 2026-07-07

## Tamaño del mercado (2026)

| Segmento | Valor 2026 | Proyección | CAGR |
|----------|-----------|------------|------|
| AI en retail (global) | $45B+ | — | — |
| Agentic AI en retail/ecommerce | $60.43B | $218.37B (2031) | 29.29% |
| AI platforms en US ecommerce | $20.9B (1.5% del total US) | — | — |
| LATAM ecommerce total | $200B+ | — | ~15% YoY |

**Datos clave de adopción:**
- 89% de retailers usando o probando AI activamente (NVIDIA survey 2026)
- 58% ya en despliegue completo (vs. experimental)
- Amazon: 35% de ventas desde recomendaciones AI
- Shopify: órdenes desde búsqueda AI crecieron 15x YoY

---

## Players globales

| Empresa | Tipo | Fortaleza | Posición 2026 |
|---------|------|-----------|----------------|
| **Amazon** | Retailer + Plataforma | AWS AI services, recomendaciones, Alexa, Just Walk Out | Líder indiscutido; 35% ventas por AI recoms |
| **Shopify** | Plataforma SaaS | Shopify Magic AI, 1M+ merchants, plugins ecosystem | Dominante PYME; AI baked into core product |
| **Salesforce** | CRM + Commerce Cloud | Einstein AI, Agentforce Commerce, 150k clientes | Enterprise; fuerte en omnichannel B2B+B2C |
| **Adobe** | Commerce (ex-Magento) + Marketing | Firefly, AI-native marketing suite, Sensei AI | Enterprise; fuerte en D2C grandes marcas |
| **Commercetools** | SaaS headless | MACH architecture, composable commerce, 340+ merchants | Enterprise européo; referencia técnica MACH |
| **Bloomreach** | Discovery + CMS | Loomi AI, personalización en tiempo real | Search & Discovery especializado |
| **NVIDIA** | Chips + Blueprints | Retail Blueprints, NIM microservices, AI hardware | Infraestructura; define el stack de referencia |
| **Google** | Search + AI | Shopping AI, UCP protocol, Gemini para retail | Distribución masiva; dueño del discovery intent |

### Actores open source clave

| Proyecto | Modelo | Relevancia Globant |
|----------|--------|--------------------|
| Medusa.js | MIT, VC-backed | Plataforma base recomendada para proyectos nuevos |
| Saleor | BSD-3, VC-backed | Alternativa Python; fuerte en LATAM enterprise |
| Odoo | LGPL Community | ERP completo; alta demanda de implementadores en LATAM |
| WooCommerce / Automattic | GPL | 28% mercado mundial; gigantesca oportunidad de AI add-ons |

---

## Oportunidades AI en LATAM

### Contexto LATAM

- **LATAM ecommerce**: $200B+ en GMV 2026, crecimiento ~15% YoY (LATAM el de más rápido crecimiento global)
- **MercadoLibre**: Dominante; Meli AI incorporando recomendaciones personalizadas masivas
- **Falabella, Liverpool, Walmart LATAM**: Grandes inversiones en AI para personalización y predicción de demanda
- **PYME digital**: Millones de merchants en WhatsApp/Instagram/TikTok Shop sin herramientas AI básicas

### Gaps específicos donde Globant puede entrar

| Oportunidad | Dolor actual | Solución AI open source | Esfuerzo |
|-------------|-------------|------------------------|----------|
| **Personalización para PYME** | Plataformas básicas sin recomendaciones | Gorse + Medusa/WooCommerce | 4-6 semanas |
| **Chatbot de soporte en español/portugués** | Bots básicos, sin RAG sobre catálogo | retailGPT + multilingual LLM | 3-4 semanas |
| **Demanda forecasting regional** | Excel o ERP sin ML | tensor-house + Odoo API | 6-8 semanas |
| **Visual search para moda** | Búsqueda solo textual | CLIP + Medusa/Saleor | 4-6 semanas |
| **WhatsApp commerce agent** | Pedidos manuales por WhatsApp | LangGraph + Twilio + Medusa | 3-4 semanas |
| **Dynamic pricing** | Precios estáticos vs. competencia | tensor-house DQN + scraping | 6-8 semanas |
| **Agentic checkout UCP** | No indexados en ChatGPT/Perplexity | Implementar Google UCP | 2-3 semanas |

---

## Posicionamiento Globant

### Propuesta de valor diferencial

```
Globant AI Studios — Retail Practice
├── Speed: blueprints NVIDIA + open source → PoC en 2-3 semanas
├── Scale: experiencia LATAM + nearshore
├── Open: MIT/Apache stack → sin vendor lock-in
└── Agentic-ready: UCP + MCP + LangGraph desde el día 1
```

### Clientes objetivo en LATAM

1. **Retailers mid-market** ($10M-$500M GMV): necesitan personalización nivel enterprise sin costos enterprise
2. **Fabricantes con canal D2C**: añadir AI sobre ERP existente (Odoo, SAP)
3. **Marketplaces regionales**: recomendaciones + fraud + pricing
4. **Retailers brick-and-mortar** con digitalización pendiente: POS AI, shelf intelligence, demand forecasting

### Competencia directa (system integrators)

| Competidor | Fortaleza | Debilidad vs. Globant |
|------------|-----------|----------------------|
| Accenture / McKinsey | Marca, enterprise relationships | Caro, lento, no open source first |
| TOTVS (LATAM) | ERP install base regional | Limitado en AI nativo |
| Nuvemshop / Tiendanube | PaaS para PYME | Sin servicios de AI customizados |
| Agencias locales | Precio bajo | Sin AI expertise, sin escala |
