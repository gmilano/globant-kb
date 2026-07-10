---
harness: sales-qualification
version: 1.0.0
generated_at: 2026-04-13T00:44:54.832Z
generator: harness-builder
---

# NLAH — sales-qualification

> Qualify an inbound lead using BANT (Budget, Authority, Need, Timeline), enrich with firmographic data, score it, and route to the right SDR with a human gate before any outbound message is sent.


**Owner:** Revenue Operations (GTM) — revops@example.com
**Trigger:** webhook from `hubspot.form_submission`
**Tags:** `sales` `lead` `bant` `revops`

---

## 1. Inputs

- `lead_email` (email, required) — Primary contact email from the inbound form. _(e.g. `"jane.doe@acme.com"`)_
- `company_domain` (url, required) — Company domain extracted from the email or form.
- `form_payload` (object, required) — Raw HubSpot form submission fields.
- `utm` (object, optional) — Marketing attribution payload.

## 2. Outputs

- `bant_json` (object) — Structured BANT assessment for CRM enrichment. → **crm.lead.custom_fields**
- `final_email` (string) — The human-approved outbound email (tier A only). → **gmail.send**
- `execution_trace` (object) — Step-by-step trace for the Revenue Ops dashboard. → **snowflake.harness_runs**

## 3. Error Policy

retry=2, backoff=exponential, on_failure=human_escalate, fallback=`revops.oncall`

---

## 4. Execution Plan (7 steps)

The harness runtime MUST execute the steps below in order, honoring `depends_on`
and stopping for any human checkpoint whose `required` flag is true.

### Step 1 — `enrich_company`

**Type:** `tool`
**Tool:** `clearbit.company_enrich`
**Timeout:** 15000ms
**Retries:** 2

**Description:** Look up firmographics (industry, employees, funding, tech stack) for the domain.

**Outputs:** `company_profile`

### Step 2 — `enrich_person`

**Type:** `tool`
**Tool:** `apollo.person_enrich`
**Timeout:** 15000ms
**Retries:** 2
**Depends on:** `enrich_company`

**Description:** Pull the lead's seniority, role, LinkedIn URL, and tenure.

**Outputs:** `person_profile`

### Step 3 — `bant_assessment`

**Type:** `llm`
**Model:** `claude-opus-4`
**Timeout:** 30000ms
**Depends on:** `enrich_person`

**Description:** Run a BANT assessment grounded in the form answers + enriched profile.

**Prompt:**

```
You are a senior B2B sales qualifier. Given the lead profile, company profile,
and the raw form submission below, produce a BANT assessment in strict JSON:
  { "budget": {"score": 0-5, "evidence": "..."},
    "authority": {"score": 0-5, "evidence": "..."},
    "need": {"score": 0-5, "evidence": "..."},
    "timeline": {"score": 0-5, "evidence": "..."},
    "overall": 0-20,
    "tier": "A" | "B" | "C" | "disqualify",
    "rationale": "1-3 sentences" }
Be conservative: missing evidence means a lower score, not a guess.
```

**Outputs:** `bant_json`

### Step 4 — `route_decision`

**Type:** `decision`
**Depends on:** `bant_assessment`

**Description:** Pick the routing lane from the BANT tier.

**Branches:**
- `tier == "A"` → `book_meeting_draft`
- `tier == "B"` → `nurture_sequence`
- `tier == "C"` → `nurture_sequence`
- `tier == "disqualify"` → `log_and_exit`

### Step 5 — `book_meeting_draft`

**Type:** `llm`
**Model:** `claude-opus-4`
**Timeout:** 20000ms

**Description:** Draft a personalized outreach requesting a 20-minute discovery call.

**Prompt:**

```
Write a concise outbound email (<= 120 words) asking for a 20-minute
discovery call. Reference one concrete detail from the company profile
(recent funding, hiring signal, or tech-stack move). No emojis. No "hope
you're doing well." End with two proposed times in the lead's timezone.
```

**Outputs:** `draft_email`

### Step 6 — `nurture_sequence`

**Type:** `agent`
**Agent:** `marketo.enroll_sequence`
**Timeout:** 10000ms

**Description:** Enroll tier B/C leads in the "education drip" nurture.

### Step 7 — `log_and_exit`

**Type:** `tool`
**Tool:** `crm.mark_disqualified`
**Timeout:** 5000ms

**Description:** Mark the lead disqualified with the rationale.

---

## 5. Human Checkpoints (2)

- **After `bant_assessment`** — required (SLA 60m) _[expects: approval | tier_override]_
    > Sales Ops: review the BANT JSON. Override the tier if the model under- or over-scored. Approve to continue to routing.

- **After `book_meeting_draft`** — required (SLA 240m) _[expects: approved_email_body]_
    > SDR: review the draft email. Edit freely. Send only after approval.


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
