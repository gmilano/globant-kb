---
harness: legal-review
version: 1.0.0
generated_at: 2026-04-13T00:13:40.943Z
generator: harness-builder
---

# NLAH — legal-review

> First-pass legal review of an inbound vendor contract. Extracts clauses, flags deviations from the company playbook, produces a redline, and escalates to a human lawyer before anything goes back to the counterparty.


**Owner:** General Counsel (Legal) — legal@example.com
**Trigger:** event on `contract.received` from `docusign.inbox`
**Tags:** `legal` `contracts` `redline` `playbook`

---

## 1. Inputs

- `contract_file` (file, required) — PDF or DOCX of the inbound contract.
- `counterparty_name` (string, required)
- `deal_value_usd` (number, optional) — Expected annual contract value; influences risk threshold.
- `contract_type` (string, required) — One of: MSA, DPA, NDA, SOW, order_form.

## 2. Outputs

- `redline_docx` (file) — Tracked-changes redline of the inbound contract. → **sharepoint.legal.redlines**
- `risk_json` (object) — Structured risk scoring for the legal dashboard. → **legal_datawarehouse.contract_risk**
- `summary_memo` (string) — 1-page prose memo for the GC + deal owner. → **notion.legal.memos**

## 3. Error Policy

retry=1, backoff=linear, on_failure=human_escalate, fallback=`legal.senior_lawyer_oncall`

---

## 4. Execution Plan (6 steps)

The harness runtime MUST execute the steps below in order, honoring `depends_on`
and stopping for any human checkpoint whose `required` flag is true.

### Step 1 — `extract_text`

**Type:** `tool`
**Tool:** `docparser.extract`
**Timeout:** 60000ms
**Retries:** 1

**Description:** OCR + text extraction with layout preserved. Returns plain text + structural map.

**Outputs:** `contract_text`, `structure_map`

### Step 2 — `clause_segmentation`

**Type:** `llm`
**Model:** `claude-opus-4`
**Timeout:** 45000ms
**Depends on:** `extract_text`

**Description:** Segment the contract into named clauses.

**Prompt:**

```
You are a contracts paralegal. Segment the contract text into named clauses
using the industry taxonomy (indemnification, limitation_of_liability, term,
termination, ip_assignment, data_protection, warranty, governing_law,
confidentiality, payment_terms, sla, audit_rights, insurance). Return JSON:
  [ { "clause": "<taxonomy_name>", "heading": "<as written>", "text": "..." } ]
Do not summarize — return the full clause text verbatim.
```

**Outputs:** `clauses_json`

### Step 3 — `playbook_diff`

**Type:** `agent`
**Agent:** `legal.playbook_compare`
**Timeout:** 60000ms
**Depends on:** `clause_segmentation`

**Description:** Compare each clause against the company playbook and flag deviations by severity.

**Outputs:** `deviations`

### Step 4 — `risk_scoring`

**Type:** `llm`
**Model:** `claude-opus-4`
**Depends on:** `playbook_diff`

**Description:** Score overall deal risk from deviations + deal value.

**Prompt:**

```
Given the deviations list and the deal value, produce a risk JSON:
  { "risk": "low" | "medium" | "high" | "critical",
    "top_issues": [ { "clause": "...", "severity": "...", "recommendation": "..." } ],
    "must_escalate": boolean }
Deals >= $250k with any "high" deviation MUST set must_escalate = true.
```

**Outputs:** `risk_json`

### Step 5 — `draft_redline`

**Type:** `agent`
**Agent:** `legal.redline_drafter`
**Timeout:** 90000ms
**Retries:** 1
**Depends on:** `risk_scoring`

**Description:** Produce a tracked-changes redline document with playbook language substitutions.

**Outputs:** `redline_docx`

### Step 6 — `summary_memo`

**Type:** `llm`
**Model:** `claude-opus-4`
**Depends on:** `draft_redline`

**Description:** Write a 1-page memo the GC can read in 3 minutes.

**Prompt:**

```
Write a 1-page memo for the General Counsel:
  - Counterparty, contract type, ACV
  - 3-5 bullet points of the biggest issues, ranked
  - Proposed negotiation posture (accept / push back / walk)
  - Open questions for the business owner
Plain prose, no marketing language, no hedging.
```

---

## 5. Human Checkpoints (2)

- **After `risk_scoring`** — required (SLA 240m) _[expects: approval | reassignment]_
    > Legal Ops: confirm the auto-risk scoring is sane. If must_escalate is true, assign to a senior lawyer before the redline step runs.

- **After `summary_memo`** — required (SLA 1440m) _[expects: approved_memo + approved_redline]_
    > General Counsel: sign off on the memo + redline before it is sent to the business owner / counterparty. You MAY edit the redline directly.


---

## 6. Operating Contract

This NLAH is the **contract** between the process owner and the agent harness runtime.
A compliant runtime MUST:

1. Validate all required inputs before starting step 1.
2. Execute each step with the declared `type`, `agent`/`tool`/`prompt`, `timeout_ms`, and `retries`.
3. Halt and surface to a human operator at every `required` checkpoint before proceeding.
4. On step failure, apply the `error_policy` (retry → fallback_agent → on_failure).
5. Emit each declared output to its `sink`, if any.
6. Record a full execution trace (step name, start, end, status, tokens, cost) for audit.

_This file was generated from YAML by `harness-builder`. Do not hand-edit — regenerate from source._
