# 🗺️ Market Map — Legal AI

> Key players, market structure, and positioning for AI in legal services.
> Last updated: 2026-07-15

## Market Size

| Metric | Value | Source |
|--------|-------|--------|
| Legal AI market 2025 | $4.59 billion | Azumo / multiple analysts |
| Legal AI market 2026 | $5.59 billion | Azumo / multiple analysts |
| Adoption — law firms using GenAI | 41% (2026) vs 28% (2025) | Thomson Reuters |
| Adoption — corporate legal using GenAI | 47% (2026) vs 23% (2025) | Thomson Reuters |
| In-house counsel actively using GenAI | 52% | Wolters Kluwer |
| Legal professionals using AI tools | 79% | BCG Attorney Search |
| Firms exploring agentic AI | >60% | Summize / Wordsmith AI |
| Corporate depts using AI contract analysis | 58% | Multiple surveys |

## Global Players — Proprietary

| Company | Product | Strength | Market Position |
|---------|---------|----------|-----------------|
| Thomson Reuters | Westlaw AI, CoCounsel | $6B legal data moat, 150 years of case law | Dominant incumbent, now AI-native |
| LexisNexis (RELX) | Lexis+ AI, Lexis Create | Parallel data moat to Westlaw | Tight #2, racing Thomson Reuters on AI features |
| Harvey AI | Harvey | GPT-4-class legal reasoning, top law firm adoption | Fastest-growing legal AI startup; $300M+ raised |
| Ironclad | Ironclad CLM | Contract lifecycle management, Fortune 500 legal ops | CLM category leader |
| Litera (fmr. Kira) | Litera Kira | Contract review, due diligence ML | M&A due diligence workhorse |
| Casetext (Thomson Reuters) | CoCounsel | AI legal assistant, acquired by TR 2023 | Integrated into Westlaw workflow |
| EvenUp | EvenUp | AI demand packages for personal injury | Vertical AI; processing 100k+ cases |
| Summize | Summize CLM | CLM + AI clause summarization | SMB CLM with strong AI UX |

## Global Players — Open Source Ecosystem

| Organization | Contribution | Significance |
|--------------|-------------|-------------|
| Free Law Project | CourtListener, RECAP, eyecite, Juriscraper | The data infrastructure backbone of legal AI |
| LexPredict | LexNLP, ContraxSuite | Foundational NLP tools in most commercial legal AI |
| Equall.ai | SaulLM-7B/54B/141B (MIT) | Only open-weights frontier legal LLM family |
| Maastricht Law Tech Lab | awesome-legal-nlp, ECHR research | European legal NLP research hub |
| Harvard Library Innovation Lab | Caselaw Access Project | 6.9M cases, 360 years — the open legal corpus |
| Suffolk University LIT Lab | Docassemble, Assembly Line Project | Open source legal document automation ecosystem |
| FudanDISC | DISC-LawLLM | Leading Chinese legal LLM system |
| ICLRandD | Blackstone | UK/Commonwealth legal NLP pipeline |

## LATAM Opportunities

| Opportunity | Justification | Open Source Starting Point |
|-------------|--------------|----------------------------|
| Contract automation for SMB | 90%+ of LATAM SMBs have no CLM; contracts managed in email/DOCX | Docassemble (MIT) + SaulLM (MIT) |
| Legal aid access | 70%+ of low-income population has no access to legal representation | Docassemble guided self-help flows + local LLM |
| Compliance monitoring (Brazil/Mexico) | Complex, changing tax and labor regulation | LexNLP + RAG over regulatory corpus |
| Court document processing | Backlogs in LatAm civil courts; AI triage and summarization | LexNLP + Blackstone adapted for Spanish/Portuguese |
| Spanish-language legal LLM gap | No SaulLM equivalent for Spanish law | Llama-3 + legal pretraining on LATAM corpus; clear Globant opportunity |
| Corporate due diligence | M&A activity recovering; Kira-style tools at accessible price point | ContraxSuite + SaulLM |

## Positioning for Globant AI Studios

- **Differentiation**: The proprietary players (Harvey, Ironclad, Westlaw AI) are all US-English-centric. Globant can lead on **Spanish/Portuguese legal AI** and **LATAM jurisdiction coverage** — a white space with no incumbent.
- **Open source leverage**: SaulLM (MIT) + Docassemble (MIT) + LexNLP (Apache-2.0) + CourtListener data = a full legal AI stack at near-zero license cost. Globant margin comes from integration, fine-tuning, and verticalization — not from buying Harvey licenses.
- **Data moat path**: Build a high-quality corpus of LATAM legal documents (Brazilian CLT labor law, Mexican NOM standards, Argentine Civil Code) and fine-tune SaulLM-7B on it. This creates a defensible legal LLM for the region that no US vendor will prioritize.
- **Engagement pattern**: Start with contract review (fastest ROI, clearest output) → expand to full CLM + compliance monitoring → eventually offer legal AI as a managed service.

---
*Data sourced from Thomson Reuters, Azumo, BCG Attorney Search, Wolters Kluwer, Summize — July 2026.*
