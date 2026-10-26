# Design 2027 — full-site redesign (Fariz DS)

Status: approved in chat 2026-10-26. Source package: `design-2027/` (`DESIGN_SYSTEM.md`, `fariz-tokens.css`, `fariz-ds.zip`, `svelte-check.png`). Where the zip and the loose files differ, **the zip wins** (newer: fonts via `<link>`, components already built).

## Goal

Re-skin every page of farizink.github.io to the "Bento Grid Playful × Blackhole" design system: dark-first semantic tokens, Space Grotesk + IBM Plex Mono, solid purple accent, no gradients, 24px cards, DS components reused everywhere. Behavior, data fetching, auth, routing and WebSocket logic stay unchanged — this is visual only.

## Decisions (from the user)

- Old decorative motion is **removed entirely**: `WavesBackground`, `src/lib/motion.ts`, `src/lib/motion.css`, decorative keyframes in `app.css`, the perf-mode toggle. Allowed motion = BentoCard hover-lift and IconButton tilt (150–180 ms). Skeletons stay static.
- Phase gates are **automated by Claude**: after each phase run check/build/lint/audit + dark/light screenshots, fix, continue. User reviews at the end.
- No git commits by Claude (CLAUDE.md read-only git policy).
- Out of scope: `/projects` sitemap 404 and making `/notes` private (DS "notes for team").

## Approach: bridge first, then migrate per page

1. **Foundation** — tokens file, fonts, theme, DS components, `$lib` alias, `/ds-preview` route.
2. **Bridge** — legacy `--color-primary-*` / `--color-secondary-*` scales and legacy component classes (`.btn*`, `.card*`, `.input`, `.select`, `.textarea`, `.badge*`, `.label`, tool classes) are re-pointed at DS tokens so the whole site switches palette immediately and never looks half-migrated.
3. **App shell** — App.svelte, Navigation, CommandPalette, Modal, ToolLayout, footer, Router 404.
4. **Home + Dashboard**.
5. **Tools index + 34 tools**.
6. **Notes, Finance, Files, LoginModal, remaining components**.
7. **Cleanup** — delete bridge + legacy palette, remove `/ds-preview`, repo-wide audit to zero, docs, boneyard colors + recapture.

## Architecture

- `src/styles/fariz-tokens.css` = zip version, imported in `app.css` right after `@import 'tailwindcss'`. Outfit import removed; Space Grotesk + IBM Plex Mono `<link>` tags in `index.html`.
- DS components: `src/lib/components/ds/` (16 from zip + `index.ts` + `tones.ts`). New components needed by pages go in the same folder, following the DS spec style (token classes only, Svelte 5 runes, `class` passthrough).
- `$lib` alias → `src/lib` in `vite.config.ts` (`resolve.alias`) and `tsconfig.json` (`paths`).
- Form controls have no DS component: `.input`, `.textarea`, `.select`, `.custom-checkbox`, `.custom-radio` remain **permanent CSS classes** in `app.css`, rewritten with tokens (`bg-sunken`, `border-line-strong`, `rounded-md`, `text-ink`, focus ring = `focus-ring`). `.btn*` classes are kept as permanent aliases that visually match `Button` (primary/secondary/ghost/danger) so tool internals don't all need component rewrites; new or rewritten markup prefers `<Button>`.
- `rounded-sm/md/lg` are redefined globally (10/16/24 px) — intentional.

### Theme

- Dark = default (no attribute). Light = `<html data-theme="light">`. Anti-flash script in `index.html` reads `localStorage.theme` (existing key, values `light`/`dark` — compatible), falling back to `prefers-color-scheme`.
- Legacy `.dark` class handling (index.html script, App.svelte MutationObserver, Navigation toggle) is replaced by `data-theme`. During the bridge, the tokens file's `@custom-variant dark` keeps leftover `dark:` utilities working.
- Toaster theme follows `data-theme`. `<meta name="theme-color">` updated to canvas color.
- Navigation's theme button uses DS `ThemeToggle` (or its logic) — no separate perf-mode control.

### Bridge mapping (temporary)

- `secondary-*` (slate) → violet-tinted neutrals: 50–200 ≈ light canvas/sunken/line, 300–500 ≈ line-strong/ink-muted, 600–950 ≈ dark ink-muted/line/card/canvas. `white` surfaces under dark default resolve through existing `dark:` pairs.
- `primary-*` (purple) → accent family.
- Gradients in legacy classes (`.text-gradient`, `.title-gradient`, mesh/shimmer) → solid `accent-text`.
Bridge exists only until phase 7.

## Pages

| Area | Target composition |
|---|---|
| Home `/` (logged out) | `BentoGrid`: hero `BentoCard tone=accent 2×2 size=lg` ("HI, I'M" / Fariz / bio with `gabut` emphasized / `CopyChip` email + `IconButton` socials), Stack (teal, Tags), Tools (orchid, "34 utilities", href `/tools`), `NowPlaying` 2×1 fed by existing Spotify WebSocket store, plus contact/photo 1×1 tiles. Exactly one accent tile. |
| Dashboard (logged in) | `StatTile`s, recent `NoteCard`s, `ServiceTile` grid (tints rotate through 4 tiles, UP/DOWN labels) — replaces rainbow gradients. |
| `/tools` | `PageHeader` centered, badge "34 tools", highlight "Tools"; `SearchField` with shortcut; `FilterTabs` with counts; uniform `ToolCard` grid with category tile (Text & Data amber, Generators orchid, Web Dev violet, Utilities teal). |
| 34 tool pages | `ToolLayout` → back link + `PageHeader align=start` + content inside surface `BentoCard`s. Each tool file: remove gradients, palette colors, raw hex in classes, `dark:` color variants; use tokens, `.input`/`.btn` classes or DS components. Result/status colors use `live`/`negative` with labels. |
| `/notes`, create, edit, detail modal | `PageHeader` (badge "N notes"), `SearchField`, `FilterTabs`/labels, DS `NoteCard` (pinned eyebrow, dotted Tags, mono footer); TipTap editor + prose restyled with tokens. |
| `/finance` | `StatTile` row (▲ live income / ▼ negative expense), `FilterTabs` for periods, token tables/forms. |
| `/files/:code`, TempUpload | `Button`, `EmptyState` for expired/invalid links. |
| Login modal, 404 | `EmptyState` ("This page vanished into the digital void", 404 in `accent-text`, two actions), `Button` primary. |
| Shell | Navigation (floating bottom bar restyled: `bg-card`, `border-line`, pill controls), CommandPalette, Modal (`bg-card`, `rounded-lg`, `border-line`), footer, ScrollToTop, OfflineIndicator, PWA prompts. |

Content: English UI, sentence case for titles/buttons, mono UPPERCASE card labels, real counts, no emoji in UI chrome.

## Verification (every phase, automated)

1. `npm run check` — 0 errors (pre-existing warnings recorded at start, must not grow).
2. `npm run build` and `npm run lint` pass (lint baseline recorded at start).
3. Audit (scoped to migrated files; repo-wide in phase 7): no `gradient`, no Tailwind palette colors (`(bg|text|border|ring|from|to|via|fill|stroke)-(slate|gray|zinc|neutral|purple|violet|yellow|amber|rose|red|green|blue|indigo|pink|orange|emerald|teal|cyan|sky|lime|fuchsia)-\d`), no `primary-*`/`secondary-*`, no `dark:` color variants, no raw hex in markup classes.
4. Playwright screenshots of affected routes at 375 / 768 / 1280, dark and light; Claude inspects them (contrast, layout, overflow). Auth-gated pages via boneyard fixture mode (`window.__BONEYARD_BUILD = true`).
5. Problems found → fix → re-verify before moving on.

## Done when

- All routes render in the new system in both themes; screenshots reviewed.
- Repo-wide audit is zero (outside `design-2027/` and third-party CSS like TipTap internals if unavoidable — documented).
- Bridge, legacy palette, motion files, WavesBackground, perf-mode and `/ds-preview` removed.
- `boneyard.config.json` + `main.ts` bone colors updated to tokens (light `#e2dcef`, dark `#251f35`), bones recaptured.
- `DESIGN.md` replaced by DS guide content; `CLAUDE.md`, `AGENTS.md`, `ARCHITECTURE.md` styling sections updated.
- check/build/lint green.
