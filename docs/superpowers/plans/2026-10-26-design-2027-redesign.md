# Design 2027 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin every page of farizink.github.io to the Fariz design system (dark-first tokens, Space Grotesk + IBM Plex Mono, bento components) without changing behavior.

**Architecture:** Install tokens + the 16 prebuilt DS components, add a temporary bridge that re-points the legacy palette/classes at tokens, then migrate shell → Home → Tools → Notes/Finance/Files page by page, and finally delete the bridge.

**Tech Stack:** Svelte 5 runes, Tailwind CSS 4, Vite 7, @lucide/svelte, Playwright (screenshots only).

**Spec:** `docs/superpowers/specs/2026-10-26-design-2027-redesign-design.md`

## Global Constraints

- Colors only from tokens (`canvas card sunken line line-strong ink ink-muted accent accent-hover ink-on-accent accent-text tile-{violet,orchid,amber,teal,void} ink-on-dark ink-on-dark-muted glow-amber live negative focus-ring`). No Tailwind palette colors, no raw hex in markup, no gradients, no `dark:` color variants in migrated files.
- Text on `bg-accent` → `text-ink-on-accent`; purple text → `text-accent-text`; `glow-amber` never text; `live`/`negative` always with ▲/▼, −/+ or a label.
- Typography utilities: `text-display-xl text-display text-title text-body-lg text-body text-body-sm text-label text-code`. Fonts `font-display font-sans font-mono`.
- Cards `rounded-lg`; controls/chips/tags `rounded-pill`; album art `rounded-sm`. Max content width 1120px.
- Motion: only BentoCard hover-lift and IconButton tilt, 150–180 ms. No entrance animations, no view transitions, no perf-mode.
- English UI, sentence case titles/buttons, mono UPPERCASE eyebrows, no emoji in UI chrome.
- Behavior, API calls, auth, router logic, WebSocket untouched. Every route keeps its existing features.
- No git commits (read-only git policy). Checkboxes replace the "Commit" step.
- Baseline (2026-10-26): `npm run check` = 78 errors / 4 warnings; `npm run lint` = 15 errors / 28 warnings; `npm run build` passes. Gates: check errors ≤ 78 and never new errors in touched files; lint errors ≤ 15; build passes.

## Review Focus

- Theme persistence: a returning user with `localStorage.theme='light'` must load light with no dark flash; `'dark'` or unset+system-dark loads dark; unset+system-light loads light. (Task 1 shot check: run screenshots with `localStorage.theme` preset.)
- Light mode readability: tiles become pastel in light — any leftover `text-white`/`text-ink-on-dark` on a tile is unreadable. Every screenshot pass covers light.
- Mobile (375px) bento: 2×2 hero + 2-col grid must not overflow horizontally; audit with `document.documentElement.scrollWidth <= innerWidth` in the screenshot script.
- Third-party surfaces (svelte-sonner toasts, TipTap prose, QR canvas, JSON tree) must follow theme — check in the respective task screenshots.
- Keyboard focus: every interactive DS-migrated control shows the 2px `focus-ring` outline (no `outline-none` without replacement).

---

## Verification tooling (used by every task)

`.superpowers/ds/audit.sh <files…>` — greps the given files (default: all `src/**/*.svelte`, `src/app.css`) for: `gradient`, `\b(bg|text|border|ring|from|to|via|fill|stroke|outline|divide|placeholder|shadow|decoration|accent|caret)-(slate|gray|zinc|neutral|stone|purple|violet|yellow|amber|rose|red|green|blue|indigo|pink|orange|emerald|teal|cyan|sky|lime|fuchsia|primary|secondary|success|danger|warning|black|white)\b`, `dark:`, `#[0-9a-fA-F]{3,8}\b` inside `class=`. Prints `file:line:match`, exit 1 if any.

`.superpowers/ds/shots.mjs <route…>` — Playwright chromium against `npm run preview` (port 3000) or `vite dev`; for each route × width (375/768/1280) × theme (dark/light via `localStorage.theme` before load) saves `.superpowers/ds/shots/<route>-<w>-<theme>.png`, logs console errors and horizontal overflow. Flag `--fixture` sets `window.__BONEYARD_BUILD = true` via `addInitScript` for auth pages.

Per-task gate = `npm run check` (errors ≤ baseline, none in touched files) + `npm run build` + `npm run lint` (errors ≤ baseline) + `audit.sh <touched files>` clean + screenshots inspected for the task's routes. Fix, rerun, then continue.

---

### Task 0: Tooling

**Files:** Create `.superpowers/ds/audit.sh`, `.superpowers/ds/shots.mjs`

- [ ] Write both scripts as described above.
- [ ] Run `audit.sh src/pages/Home.svelte` → expect many hits (proves it detects). Run `shots.mjs /` against current site → PNGs produced.

### Task 1: Foundation — tokens, fonts, theme, DS components

**Files:**
- Create: `src/styles/fariz-tokens.css` (copy from zip), `src/lib/components/ds/*` (16 components, `index.ts`, `tones.ts`, `DsPreview.svelte` from zip)
- Modify: `src/app.css:1-16` (drop Outfit import + legacy `@custom-variant dark` + body colors; add `@import './styles/fariz-tokens.css'` after tailwind), `index.html` (Space Grotesk/Plex links, theme script → `data-theme`, `theme-color` `#09070f`, `#app` classes removed), `vite.config.ts` (`resolve.alias: { $lib: '/src/lib' }` via `fileURLToPath`), `tsconfig.json` (`baseUrl: "."`, `paths: { "$lib": ["src/lib"], "$lib/*": ["src/lib/*"] }`), `src/routes/main.ts` (temporary `/ds-preview` route, `robots: 'noindex, nofollow'`), `src/App.svelte` (isDark from `data-theme`; MutationObserver on `data-theme` attribute; drop WavesBackground), `src/components/Navigation.svelte` (theme toggle writes `data-theme`/`localStorage.theme`; remove perf-mode toggle + `perf-mode` class)
- Delete: `src/components/WavesBackground.svelte`

**Interfaces — Produces:** `import { BentoGrid, BentoCard, Button, IconButton, CopyChip, Tag, NowPlaying, PageHeader, SearchField, FilterTabs, ToolCard, NoteCard, StatTile, ServiceTile, EmptyState, ThemeToggle, categoryTone, type Tone, type TileTone } from '$lib/components/ds'`. Theme state = `document.documentElement.dataset.theme === 'light'`.

- [ ] Copy files; wire imports/alias/fonts/theme script (README snippet, key `theme`).
- [ ] `npm run check` / `build` pass gate. Shots of `/ds-preview` dark+light must match `design-2027/svelte-check.png` composition; shots of `/` with `localStorage.theme='light'` load light.

### Task 2: Bridge

**Files:** Modify `src/app.css` (the `@theme` block at ~1370 and legacy component classes), `src/main.ts` (drop `./lib/motion.css` import), Delete `src/lib/motion.css`.

- [ ] Re-point `--color-primary-50…950` at accent family and `--color-secondary-50…950` at violet neutrals (`color-mix` of `--ink`/`--bg-canvas`/`--bg-card` so they follow theme). Because `dark:` matches "not light", legacy `bg-white dark:bg-secondary-900` already resolves to the dark side by default.
- [ ] Rewrite permanently with tokens: `.btn .btn-primary .btn-secondary .btn-outline .btn-danger .btn-sm .btn-lg .btn-icon` (= DS Button look: pill, h-11/h-9), `.input .select .textarea .tool-input .tool-select .code-editor` (`bg-sunken border-line-strong rounded-md text-ink placeholder:text-ink-muted`), `.custom-checkbox .custom-radio` (accent fill), `.card .card-hover .card-elevated .tool-card .info-card .result-card .feature-card` (= surface BentoCard look), `.label .control-label` (text-label ink-muted), `.badge*` (pill, tile tones; success→live label, danger→negative label), `.section-title*`, scrollbar (line/line-strong).
- [ ] Replace `.text-gradient .title-gradient .home-page-mesh-text .home-page-shimmer` with solid `color: var(--accent-text)`; delete decorative keyframes (`gradient meshText shimmer float cardIn chipIn slideIn* fadeInUp selectedPulse*`) and their `.animate-*` users only after grepping usage (remove the class from markup where used).
- [ ] Gate + shots of `/`, `/tools`, `/tools/json-parser`, `/notes` (dark+light): whole site in new palette, no element disappears.

### Task 3: App shell

**Files:** Modify `src/App.svelte`, `src/components/{Navigation,CommandPalette,Modal,ScrollToTop,OfflineIndicator,PWAInstall,PWAInstallPrompt,RouteSkeletons,Thanks,ConnectWithMe}.svelte`, `src/lib/Router.svelte` (404), `src/lib/router.ts` (drop `withViewTransition`), Delete `src/lib/motion.ts`.

- [ ] App: `bg-canvas text-ink`, container `max-w-[1120px] mx-auto px-4 md:px-8`; footer `border-line text-ink-muted`, heart button `text-negative` + `aria-label` kept; Toaster theme from `data-theme`.
- [ ] Navigation: floating bottom bar `bg-card border-line rounded-pill shadow-lift`, items `text-ink-muted` → active `bg-ink text-card`; `ThemeToggle`; Modal/panel transitions replaced by none (or Svelte `fade` ≤150 ms if needed for unmount).
- [ ] Modal: overlay `bg-canvas/70`, panel `bg-card border-line rounded-lg shadow-lift`. CommandPalette: `SearchField`-style input, items `rounded-md hover:bg-sunken`, selected `bg-tile-violet`.
- [ ] Router 404 → `EmptyState code="404" title="Page not found" text="This page vanished into the digital void. Head home or try one of the tools."` with `Button href="/"` "Back to home" + secondary `href="/tools"` "Browse tools".
- [ ] Gate (audit touched files clean) + shots of `/`, `/nope` (404), Ctrl+K palette open, nav menu open.

### Task 4: Home + Dashboard

**Files:** Modify `src/pages/Home.svelte`, `src/components/{DashboardView,SpotifyActivity}.svelte`, `src/lib/fixtures.ts` only if fixture shape must change (it must not).

**Interfaces — Consumes:** existing Spotify store/props in `SpotifyActivity.svelte` → map to `NowPlaying { isPlaying, title, artist, albumArt, progress (s), duration (s), href }` (convert ms → s).

- [ ] Logged out: `BentoGrid` = hero `BentoCard tone="accent" colSpan=2 rowSpan=2 size="lg" label="Hi, I'm"` (`text-display-xl` Fariz; bio sentence with `gabut` emphasized `font-semibold`; `CopyChip` with current email; `IconButton`s for existing social links); `BentoCard tone="teal" label="Stack"` with Tags (lowercase); `BentoCard tone="orchid" label="Tools" title="34 utilities" href="/tools"`; `NowPlaying` (2×1); remaining existing home content (experience/connect/photo) as surface 1×1/2×1 tiles. One accent tile only. Keep `<Skeleton>` wrappers and fixtures.
- [ ] Logged in (DashboardView): `StatTile` row, recent notes via DS `NoteCard`, services via `ServiceTile` (tones rotate violet→orchid→amber→teal, status from existing data or `unknown`).
- [ ] Gate + shots `/` dark/light ×3 widths, and `/` with `--fixture` (dashboard). No horizontal overflow at 375.

### Task 5: Tools index + ToolLayout

**Files:** Modify `src/pages/Tools.svelte`, `src/components/ToolLayout.svelte`, `src/lib/toolsConfig.ts` (only to expose category id → `categoryTone` key mapping if ids differ).

**Interfaces — Produces:** `ToolLayout` props unchanged (`title, description, icon, color, children`) so the 34 tools need no prop edits; `color` is accepted but ignored (tone comes from category lookup by current path, fallback `violet`).

- [ ] Tools: `PageHeader align="center" badge="{n} TOOLS" title="Developer" highlight="Tools"`, `SearchField` (keep existing filter + shortcut hint), `FilterTabs` with All + 4 categories and live counts, grid `md:grid-cols-2 lg:grid-cols-3` of `ToolCard` (icon via snippet rendering the config's lucide icon, features from config).
- [ ] ToolLayout: back link (`Button variant="ghost" size="sm"` "All tools"), category icon square in tile tone, `PageHeader align="start"`, children inside `div.flex.flex-col.gap-4` (tools wrap sections in `.card` = surface card via bridge until migrated).
- [ ] Gate + shots `/tools` (dark/light ×3), `/tools/json-parser`.

### Task 6: The 34 tool pages (batched, parallelizable)

**Files:** `src/pages/tools/*.svelte` in 5 batches by category: Text & Data (8), Generators (7), Web Dev (6), Utilities A (AgeCalculator…JwtDecoder, 7), Utilities B (CronGenerator…TempUpload, 6) — plus `src/components/{JsonTree,FileUpload,ExistingFiles}.svelte` with their tool batch.

- [ ] Per file: replace palette/gradient/`dark:` color classes with tokens; sections → `.card` or `BentoCard`; primary action `Button` (one primary per view); status/results `live`/`negative` + label; code/outputs `font-mono bg-sunken rounded-md`; keep every feature and handler unchanged. Gradient Generator / Color tools may render user-chosen colors via inline `style` (that's data, not chrome) — allowed.
- [ ] Gate per batch: `audit.sh <batch files>` clean, check/build, shots of each tool route at 1280 dark + 375 light.

### Task 7: Notes

**Files:** `src/pages/{Notes,NotesCreate,NotesEdit}.svelte`, `src/components/{NoteCard,NoteForm,NoteModal,NoteDetailModal,NotesFilterModal,NotesShortcutsModal,DeletedNotesModal,TagModal,TagFormModal,TagsSelector,MultipleSelect,Pagination,TiptapEditor,LoginModal}.svelte`, `src/app.css` (`.prose`, `.prose-wrapper`, `.notes-*`, `.tag-*`, `.note-*` blocks).

- [ ] Notes list: `PageHeader align="center" badge="{total} NOTES" title="My" highlight="Notes"` (keep existing copy wording if different, highlight last word), `SearchField`, label filter via `FilterTabs` where the page has tabs; legacy `NoteCard.svelte` restyled to DS NoteCard look (keep its pin/actions/selection behavior; reuse DS `Tag dot`, `● PINNED` eyebrow, mono footer) — do not replace its logic.
- [ ] Editor/prose: `.prose` colors → ink/ink-muted/accent-text/line/sunken; TipTap toolbar buttons pill ghost.
- [ ] LoginModal: `Button` primary "Log in", inputs `.input`.
- [ ] Gate + shots `/notes`, `/notes?id=boneyard-capture`, `/notes/create`, `/notes/edit/boneyard-capture` with `--fixture`.

### Task 8: Finance + Files

**Files:** `src/pages/{Finance,Files}.svelte`.

- [ ] Finance: `PageHeader` + `StatTile` row (income ▲ live, expense ▼ negative, balance one `tone="violet"`), `FilterTabs` for existing periods, tables `border-line`, amounts mono tabular with sign.
- [ ] Files: card with file list, `Button` download; invalid/expired → `EmptyState`.
- [ ] Gate + shots `/finance --fixture`, `/files/boneyard --fixture`.

### Task 9: Cleanup, docs, bones

**Files:** `src/app.css` (delete bridge + legacy `@theme` palette, unused legacy classes), `src/routes/main.ts` (remove `/ds-preview`), delete `src/lib/components/ds/DsPreview.svelte`, `src/main.ts` + `boneyard.config.json` (bone colors `#e2dcef` / `#251f35`), `DESIGN.md` (replace with zip `DESIGN_SYSTEM.md` content), `CLAUDE.md` / `AGENTS.md` / `ARCHITECTURE.md` (styling, fonts, theme, removed motion/perf-mode, DS component folder), `src/bones/*` (recapture).

- [ ] `audit.sh` (repo-wide) → 0 hits; any unavoidable hit documented in the final report.
- [ ] Full gate; shots of every main route + 6 sampled tools, both themes.
- [ ] Recapture bones: run `npm run dev` until boneyard plugin writes `src/bones/` for all configured routes, then stop.
- [ ] Final whole-change review (fresh reviewer) against spec.
