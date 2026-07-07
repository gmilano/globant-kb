# Vertical Solutions — Travel & Hospitality

> Real open-source platforms to fork and add AI on top.
> Last updated: 2026-07-07

## Core Platform Recommendations

| Platform | License | GitHub | Stack | Use Case | Stars |
|----------|---------|--------|-------|----------|-------|
| **QloApps** | OSL-3.0 | [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | PHP/MySQL | Hotel PMS + Booking Engine + Website | ~1.4k★ |
| **OpenTripPlanner** | LGPL-3.0 | [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | Java, GTFS+OSM | Multi-modal trip routing | ~5.5k★ |
| **ExcursioX** | MIT | [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | Node.js/React | Travel Agency CRM + Ticketing + Booking | ~120★ |
| **PHPTRAVELS** | Commercial Open | [phptravels.com](https://phptravels.com/open-source-travel-management-software) | PHP/Laravel | OTA: hotels, flights, tours, transfers, visa | N/A |
| **Cal.com** | AGPLv3 | [calcom/cal.com](https://github.com/calcom/cal.com) | Next.js/TypeScript | Scheduling infrastructure for tour/activity bookings | ~35k★ |
| **Odoo Community** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python/JS | ERP with travel/hospitality modules | ~40k★ |
| **Mews Fiscalizations** | MIT | [MewsSystems/fiscalizations](https://github.com/MewsSystems/fiscalizations) | .NET | Fiscal compliance for hotel invoicing 15+ countries | ~62★ |

## LATAM Deployment Notes

| Country | Key Consideration | Recommended Stack |
|---------|------------------|-------------------|
| Argentina | USD/ARS dual pricing, AFIP fiscal receipts | QloApps + Mews Fiscalizations + Mercado Pago |
| Brazil | PIX payment, NF-e invoicing | QloApps + custom fiscal module + PIX API |
| Mexico | CFDI invoicing, SAT compliance | QloApps + Facturama + OXXO Pay |
| Colombia | Dian invoicing | QloApps + custom fiscal + PSE payments |
| Chile | SII invoicing | QloApps + bsale integration |

---
*Updated: 2026-07-07*
