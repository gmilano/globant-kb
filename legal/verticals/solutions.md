# Vertical Platforms — Legal

> Open-source and open-core platforms Globant can deploy and customize with AI on top. Focus: permissive licenses for production use.

## Case Management

| Platform | GitHub | License | Description |
|----------|--------|---------|-------------|
| ArkCase | [arkcase/ArkCase](https://github.com/arkcase/ArkCase) | LGPL-3.0 | Comprehensive case management: document management, workflow automation, collaboration, audit trails. Used in government legal organizations and private law firms. AI-ready via REST APIs. |
| CiviCRM | [civicrm/civicrm-core](https://github.com/civicrm/civicrm-core) | AGPL-3.0 | CRM + case management for legal aid organizations and nonprofit law firms; strong community; integrates with Drupal, WordPress, Joomla. |

## Contract Lifecycle Management (CLM)

| Platform | GitHub | License | Description |
|----------|--------|---------|-------------|
| OpenContracts | [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | Document intelligence + annotation platform. MCP server, vector search, GraphQL/REST API. The open-source CLM foundation for AI-first teams — annotate, query, and run agents against contract corpora. |
| ContraxSuite | [LexPredict/lexpredict-contraxsuite](https://github.com/LexPredict/lexpredict-contraxsuite) | AGPL-3.0* | Full contract analytics: clause classification, obligation extraction, contract comparison, compliance monitoring. Built on LexNLP. *SaaS deployment needs commercial license. |

## CRM for Law Firms

| Platform | GitHub | License | Description |
|----------|--------|---------|-------------|
| SuiteCRM | [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | AGPL-3.0 | Full-featured CRM with case management modules: tasks, documents, reporting, workflows. Widely used by law firms as the open-source Salesforce alternative. |
| EspoCRM | [espocrm/espocrm](https://github.com/espocrm/espocrm) | GPL-3.0 | Lightweight CRM with clean REST API; frequently customized for law firm client intake, relationship management, and matter tracking workflows. |

## Document Management

| Platform | GitHub | License | Description |
|----------|--------|---------|-------------|
| Mayan EDMS | [mayan-edms/mayan-edms](https://github.com/mayan-edms/mayan-edms) | Apache 2.0 | Enterprise document management: tagging, versioning, OCR, full-text search, granular access control. Foundation layer for legal document repositories needing compliance-grade audit trails. |
| OpenKM | [openkm/document-management-system](https://github.com/openkm/document-management-system) | GPL-2.0 | Document management with workflow, metadata extraction, and full-text search; widely used in law firms for compliance document control. |

## Billing & Practice Management

| Platform | GitHub | License | Description |
|----------|--------|---------|-------------|
| InvoiceNinja | [invoiceninja/invoiceninja](https://github.com/invoiceninja/invoiceninja) | Elastic-2.0 | Time tracking, invoicing, and billing for professional services; common in solo attorney and small law firm deployments. |

## AI Augmentation Layer

For each platform above, the standard Globant AI layer adds:

| Capability | Components |
|-----------|------------|
| Document intake agent | RAGFlow (parse) → LexNLP (extract entities) → OpenContracts (store + index) |
| Contract review | OpenContracts + CUAD risk signals → Lavern debate protocol → human gate |
| Legal research | smolagents + OpenContracts MCP server → citation-linked memos |
| Compliance monitor | LexNLP obligation extraction → scheduled scan → Lavern alert system |
| Client intake | RAGFlow + InLegalBERT classifier → ArkCase/SuiteCRM API → matter creation |
