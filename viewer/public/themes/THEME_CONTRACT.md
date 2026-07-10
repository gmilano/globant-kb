# Theme Contract

Wany KB viewer loads themes as two CSS files:

1. **`<theme>/tokens.css`** — defines a `:root` block with CSS variables. This is the entire per-theme surface area.
2. **`_shared/components.css`** — the structural rules for every component. Targets classes and IDs with `var(--*)` references. Theme-agnostic.

A theme is a folder under `viewer/public/themes/<name>/` containing at minimum `tokens.css`. It is selected at runtime via the `KB_THEME` env var (defaults to `catppuccin`).

Any `tokens.css` **must** define every variable listed below, or `components.css` will break in places. `npm run theme:validate` enforces this.

## Required variables

### Surfaces
| Variable | Purpose |
|---|---|
| `--bg` | Base application background |
| `--bg-deep` | Deeper background for modal backdrops, embedded iframes, overlays |
| `--surface` | Default card / panel background |
| `--surface2` | Hover / elevated card background |
| `--surface3` | Borders, dividers, input outlines |
| `--surface-top` | Gradient top (sidebar) |

### Foreground
| Variable | Purpose |
|---|---|
| `--text` | Primary readable text |
| `--subtext` | Secondary / muted text |
| `--link-hover` | Link color on hover |
| `--white` | Pure white (icons, status indicators) |
| `--black` | Pure black (button text on accent backgrounds) |

### Accents & status
| Variable | Purpose |
|---|---|
| `--accent` | Primary brand color (buttons, active state, highlights) |
| `--accent2` | Secondary accent (links, info) |
| `--green` | Success, positive deltas |
| `--red` | Destructive, negative |
| `--yellow` | Warning, attention |
| `--error-fg` | Error text |
| `--success-fg` | Success text |

### Overlays
| Variable | Purpose |
|---|---|
| `--overlay-200` | Faint black overlay (subtle veil) |
| `--overlay-300` | Light black overlay |
| `--overlay-400` | Medium black overlay (sidebar shadow) |
| `--overlay-500` | Default modal backdrop |
| `--overlay-600` | Dense modal backdrop |
| `--overlay-850` | Opaque overlay (voice modal) |

### Structure
| Variable | Purpose |
|---|---|
| `--sidebar-w` | Sidebar fixed width |
| `--radius` | Default border radius |
| `--transition` | Default transition for interactive elements |

## Accent-derived tints

`components.css` uses `color-mix(in srgb, var(--accent) X%, transparent)` for accent tints. That means when you swap the theme, all the subtle purple highlights in Catppuccin automatically become blue (Primer) or whatever your accent is. You do not need to override those manually.

## Adding a new theme

1. `mkdir viewer/public/themes/<name>`
2. Copy `catppuccin/tokens.css` to `<name>/tokens.css`
3. Edit the variable values
4. `KB_THEME=<name> pm2 restart kb-viewer`
5. Verify visually; run `npm run theme:validate`

## Optional extras

A theme may also include:
- `<name>/overrides.css` — extra rules beyond variables (loaded after `components.css` if present). Useful for hot spots that the shared components don't nail.
- `<name>/theme.json` — metadata: `{name, author, mode: "dark"|"light", description}`.

Neither is required.
