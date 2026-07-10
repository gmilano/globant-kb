---
harness: content-pipeline
version: 1.0.0
generated_at: 2026-04-13T00:13:40.995Z
generator: harness-builder
---

# NLAH — content-pipeline

> End-to-end content pipeline: research a topic, draft a long-form article, fact-check claims, produce social variants, and publish — with an editor gate before anything ships and a final legal/brand check before social fans out.


**Owner:** Content Marketing (Brand) — content@example.com
**Trigger:** schedule `0 9 * * 1`
**Tags:** `content` `marketing` `blog` `social`

---

## 1. Inputs

- `topic_brief` (string, required) — The editorial brief — angle, audience, desired takeaway.
- `target_keyword` (string, required) — Primary SEO keyword.
- `target_word_count` (number, optional) — Defaults to 1500 if omitted.
- `must_cite_domains` (array, optional) — Domains whose evidence MUST be cited if relevant (e.g. gartner.com).

## 2. Outputs

- `article_md` (string) — The final approved long-form article. → **cms.posts**
- `social_bundle` (object) — LinkedIn + X thread + newsletter blurb. → **buffer.queue**
- `seo_report` (object) — On-page SEO score and recommendations. → **looker.content_dashboard**

## 3. Error Policy

retry=2, backoff=exponential, on_failure=human_escalate, fallback=`content.editor_oncall`

---

## 4. Execution Plan (7 steps)

The harness runtime MUST execute the steps below in order, honoring `depends_on`
and stopping for any human checkpoint whose `required` flag is true.

### Step 1 — `research`

**Type:** `agent`
**Agent:** `research.deepdive`
**Timeout:** 120000ms
**Retries:** 1

**Description:** Pull 10-20 high-signal sources on the topic from the last 18 months.

**Outputs:** `sources_jsonl`

### Step 2 — `outline`

**Type:** `llm`
**Model:** `claude-opus-4`
**Timeout:** 30000ms
**Depends on:** `research`

**Description:** Produce an editor-facing outline with H2/H3 headings and key claims per section.

**Prompt:**

```
You are a senior editor. Using the research sources and the topic brief,
produce a Markdown outline:
  - H1 title (<= 65 chars)
  - 4-7 H2 sections
  - Under each H2: 2-4 bullet "key claims" with the source id each claim
    will cite. Do not invent sources.
End with a short "angle rationale" paragraph explaining why this structure
serves the target audience.
```

**Outputs:** `outline_md`

### Step 3 — `draft`

**Type:** `llm`
**Model:** `claude-opus-4`
**Timeout:** 120000ms
**Depends on:** `outline`

**Description:** Expand the approved outline into the full article.

**Prompt:**

```
Write the full article from the approved outline. Rules:
  - Follow the H2/H3 structure exactly.
  - Every factual claim that has a source id must include an inline
    citation [^src-id].
  - No AI filler phrases ("in today's fast-paced world", "it's worth noting").
  - End with a 3-bullet "key takeaways" section.
  - Respect target_word_count ± 15%.
```

**Outputs:** `draft_md`

### Step 4 — `fact_check`

**Type:** `agent`
**Agent:** `fact_checker.claims`
**Timeout:** 180000ms
**Depends on:** `draft`

**Description:** Extract each cited claim and verify it against the source excerpt.

**Outputs:** `fact_check_report`

### Step 5 — `seo_pass`

**Type:** `tool`
**Tool:** `seo.analyzer`
**Timeout:** 30000ms
**Depends on:** `fact_check`

**Description:** Run on-page SEO analysis (title, meta, headings, keyword density, internal links).

**Outputs:** `seo_report`

### Step 6 — `social_variants`

**Type:** `llm`
**Model:** `claude-opus-4`
**Timeout:** 45000ms
**Depends on:** `seo_pass`

**Description:** Produce LinkedIn, X, and newsletter blurbs derived from the approved article.

**Prompt:**

```
Produce three variants from the article:
  - LinkedIn: 1200-1500 chars, first-person, one clear POV, no hashtags in body.
  - X: 3-tweet thread, each tweet <= 275 chars, no links in tweet 1.
  - Newsletter blurb: 80-120 words, ends with a single CTA link to the article.
All three MUST be consistent with the article's central claim.
```

**Outputs:** `social_bundle`

### Step 7 — `publish`

**Type:** `tool`
**Tool:** `cms.publish`
**Timeout:** 20000ms
**Depends on:** `social_variants`

**Description:** Publish the article to the CMS in draft state (human-scheduled).

---

## 5. Human Checkpoints (3)

- **After `outline`** — required (SLA 240m) _[expects: approval | revision_notes]_
    > Editor: approve the outline (or request revisions). This is the cheapest place to kill a bad angle.

- **After `fact_check`** — required (SLA 480m) _[expects: approval_after_fixes]_
    > Editor: review the fact-check report. Any "unsupported" claim must be fixed or cut before SEO pass.

- **After `social_variants`** — required (SLA 720m) _[expects: approved_bundle]_
    > Brand + Legal: final sign-off on article, social variants, and SEO tags before anything enters the CMS.


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
