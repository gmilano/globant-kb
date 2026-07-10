# harness-builder

**Archon-style harness builder for business processes.**
Write a YAML spec of a process → get back a deterministic, reviewable
**NLAH** (Natural Language Agent Harness) markdown file that an agent
runtime can execute.

## Why

[coleam00/Archon](https://github.com/coleam00/Archon) argues that the way
to get AI coding from "impressive demo" to "production tool" is to make
agent work **deterministic and repeatable** — specs, gates, and reviewable
artifacts instead of freewheeling prompts.

`harness-builder` applies that thesis to **business operations** instead of
code. The client (Sales Ops, Legal, Content) defines the process in YAML,
the builder compiles it into an NLAH markdown spec, and the harness runtime
executes it with the same step-by-step, human-gated rigor Archon uses for
code.

The generated NLAH is:

- **Readable** — a Sales Ops manager can review the plan without touching
  the YAML.
- **Deterministic** — same input YAML, same NLAH, every time.
- **Gated** — human checkpoints are first-class, not an afterthought.
- **Auditable** — the harness runtime records a full trace per run.

## Usage

```bash
cd harness-builder
npm install
node build.js examples/sales-qualification.yaml
# ✅ Built sales-qualification → examples/sales-qualification.nlah.md (7 steps, 2 checkpoints)
```

Or build all three bundled examples:

```bash
npm run build:all
```

Validation errors exit non-zero and print every problem found:

```
✗ Validation failed for my-process.yaml:
  - steps.[2]: type=agent requires "agent"
  - human_checkpoints.[0]: after_step "review" is not a declared step
```

## YAML schema — field by field

See [`schema/process.schema.json`](schema/process.schema.json) for the
authoritative JSON Schema. Summary:

### Top level

| Field               | Required | Description |
|---------------------|----------|-------------|
| `process_name`      | yes      | Kebab-case id. Used as the harness id. |
| `version`           | yes      | Semver (`1.0.0`). |
| `description`       | yes      | One-paragraph prose description of the process. |
| `owner.name`        | yes      | Human owner of the process. |
| `owner.team`        | no       | Owning team. |
| `owner.contact`     | no       | Email / slack handle. |
| `trigger.type`      | no       | `manual` \| `webhook` \| `schedule` \| `event`. |
| `trigger.cron`      | no       | Cron expression (if `schedule`). |
| `trigger.event`     | no       | Event name (if `event`). |
| `trigger.source`    | no       | Upstream system. |
| `inputs[]`          | no       | Declared process inputs. |
| `steps[]`           | **yes**  | Ordered execution plan (min 1). |
| `human_checkpoints[]` | no     | Mandatory / optional human gates. |
| `outputs[]`         | no       | Declared process outputs + sinks. |
| `error_policy`      | no       | Retry / backoff / failure behavior. |
| `tags[]`            | no       | Free-form labels. |

### `inputs[]`

| Field         | Required | Description |
|---------------|----------|-------------|
| `name`        | yes      | Input identifier. |
| `type`        | yes      | `string` \| `number` \| `boolean` \| `object` \| `array` \| `url` \| `email` \| `file`. |
| `required`    | no       | Defaults to `true`. |
| `description` | no       | Human-facing description. |
| `example`     | no       | Example value (any type). |

### `steps[]`

| Field         | Required | Description |
|---------------|----------|-------------|
| `name`        | yes      | Kebab/snake-case step id. |
| `description` | yes      | What this step does, in prose. |
| `type`        | yes      | `agent` \| `tool` \| `llm` \| `decision`. |
| `agent`       | if `type=agent` | Agent name the runtime should invoke. |
| `tool`        | if `type=tool`  | Tool name (e.g. `clearbit.company_enrich`). |
| `prompt`      | if `type=llm`   | Literal prompt body (multiline OK). |
| `branches`    | if `type=decision` | Map of `condition → next_step_name`. |
| `model`       | no       | Model override for `llm` steps. |
| `timeout_ms`  | no       | Per-step timeout. |
| `retries`     | no       | Per-step retry count (0–10). |
| `depends_on`  | no       | Array of step names this step depends on. |
| `outputs`     | no       | Named outputs this step emits. |

### `human_checkpoints[]`

| Field           | Required | Description |
|-----------------|----------|-------------|
| `after_step`    | yes      | Name of a declared step. |
| `prompt`        | yes      | What the human is being asked to do. |
| `required`      | no       | Defaults to `true`. |
| `expected_input`| no       | E.g. `approval`, `approved_email_body`, `tier_override`. |
| `sla_minutes`   | no       | How long the runtime should wait before escalating. |

### `outputs[]`

| Field         | Required | Description |
|---------------|----------|-------------|
| `name`        | yes      | Output identifier. |
| `type`        | yes      | Free-form type string. |
| `description` | no       | Human-facing description. |
| `sink`        | no       | Where the runtime should write it (`crm.lead`, `slack.#deals`, `s3://...`). |

### `error_policy`

| Field            | Description |
|------------------|-------------|
| `retry`          | Global retry count (0–10). |
| `backoff`        | `none` \| `linear` \| `exponential`. |
| `fallback_agent` | Agent to invoke if retries are exhausted. |
| `on_failure`     | `halt` \| `skip` \| `human_escalate`. |

## Examples

Three real business processes ship with the builder. Each one is 4–8
steps with at least one human checkpoint and realistic prompts — no TODOs,
no placeholders.

| Process | YAML | Generated NLAH |
|---|---|---|
| Sales qualification (BANT + routing) | [`examples/sales-qualification.yaml`](examples/sales-qualification.yaml) | [`examples/sales-qualification.nlah.md`](examples/sales-qualification.nlah.md) |
| Legal contract review (playbook diff + redline) | [`examples/legal-review.yaml`](examples/legal-review.yaml) | [`examples/legal-review.nlah.md`](examples/legal-review.nlah.md) |
| Content pipeline (research → publish) | [`examples/content-pipeline.yaml`](examples/content-pipeline.yaml) | [`examples/content-pipeline.nlah.md`](examples/content-pipeline.nlah.md) |

## Adding a new template

The NLAH renderer is a single file, [`templates/nlah.md.template`](templates/nlah.md.template),
that uses `{{variable}}` placeholders populated by [`build.js`](build.js).

To add a variant (e.g., a terser "ops card" template):

1. Copy `templates/nlah.md.template` to `templates/<name>.md.template`.
2. In `build.js`, swap `TEMPLATE_PATH` for a CLI flag (e.g. `--template ops-card`).
3. Add any new placeholders to the `applyTemplate` call in `render()`.
4. Re-run against the examples and commit both the template and updated outputs.

The placeholders currently supported are:

```
{{process_name}} {{version}} {{description}} {{owner}}
{{trigger}} {{generated_at}} {{tags}}
{{inputs}} {{outputs}} {{steps}} {{checkpoints}}
{{error_policy}} {{step_count}} {{checkpoint_count}}
```

## How it relates to Wany KB

This is **Idea 2** from `viz/ideas/ideas-2026-04-10.md`. It plugs into the
broader "Knowledge Prime for agents" thesis: Wany KB handles **ingestion
and curation** of domain knowledge, and `harness-builder` handles the
**executable wiring** of that knowledge into a repeatable business
process.

## Design decisions

- **Hand-written validator instead of `ajv`.** Keeps the dep surface to
  one package (`js-yaml`) and keeps errors friendly. The subset of JSON
  Schema we need is small.
- **Markdown, not JSON, as the harness artifact.** NLAHs are read by
  humans first, machines second. The template is designed to render well
  on GitHub.
- **Human checkpoints are first-class** — not a `step.type`. This makes
  it impossible to "accidentally" skip a gate by reordering steps.
- **Generated outputs are committed** next to the YAML. A reviewer sees
  both the input spec and the compiled harness in one diff.
