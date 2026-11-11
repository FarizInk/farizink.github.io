# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**farizink.github.io** is a personal portfolio website for Nizar Alfarizi Akbar (Fariz), a Software Engineer based in Sidoarjo, Indonesia. It is:

1. **Portfolio Website** — Showcases professional profile, skills, and experience
2. **Developer Tools Collection** — 34 fully implemented developer utilities as technical demonstrations
3. **Soul API Consumer** — Frontend app that connects to the Soul backend for Notes, Finance, Files, and Spotify activity

Deployed as a static site on GitHub Pages with SPA routing support. No server-side code — all data comes from the Soul API.

### Connection to Soul Backend
- **API Base URL**: `https://soul.fariz.dev` (production) / `http://localhost:8000` (dev)
- Configured in `src/lib/constants.ts`
- Authentication via Bearer token (Laravel Sanctum)
- WebSocket for real-time Spotify activity (Pusher-compatible protocol)

## Technology Stack

- **Framework**: Svelte 5 with TypeScript and Runes (`$state`, `$derived`)
- **Build Tool**: Vite 7 with Svelte plugin
- **Styling**: Tailwind CSS 4 + Fariz design system (tokens in `src/styles/fariz-tokens.css`, Svelte components in `src/lib/components/ds/`) — see DESIGN.md
- **Rich Text**: TipTap editor (`@tiptap/*`) for note editing
- **Icons**: Lucide Svelte (`@lucide/svelte`)
- **Notifications**: svelte-sonner
- **HTTP Client**: Axios with interceptors for auth/error handling
- **QR Codes**: qrcode library
- **Analytics**: Umami (privacy-focused)
- **Deployment**: GitHub Pages (gh-pages package)

## Development Commands

- `npm run dev` — Start dev server (runs `./clean-js.sh && vite`)
- `npm run build` — TypeScript check + Vite build
- `npm run preview` — Preview production build
- `npm run check` — Svelte type checking
- `npm run lint` — ESLint
- `npm run format` — Prettier
- `npm test` — Node test runner for pure helpers in `tests/` (`node --test`, no extra deps)

**Important**: No Git commands that modify the repository (read-only access policy).

### Loading states (skeletons)

Hand-made from the DS `Skeleton` (`.fz-skeleton` shimmer) — no generator, nothing to re-capture.

- **Shape, not detail**: placeholders match the footprint of what loads, at tile/row level. Static parts (headings, tile labels, field labels, tones) render for real; only data-driven content shimmers. Shared pieces live in `src/components/skeletons/` (`StatTileSkeleton`, `NoteCardSkeleton`).
- **`LoadingDelay`** (`src/components/skeletons/LoadingDelay.svelte`): wrap every loading placeholder in it. It announces the status to screen readers immediately but only shows the placeholder after 200 ms, so fast responses never flash a skeleton. Pass layout classes via `class`; children render inside a `display: contents` wrapper, so use `gap-*` (flex/grid), not `space-y-*`.
- **Tones**: on dark tiles (`bg-tile-deep/violet/void`) the shimmer turns translucent light, on bright tiles (`lilac/lime/accent`) translucent dark — handled in `fariz-components.css`.
- **Route chunks**: while a lazy route loads, `Router.svelte` shows one thin accent bar (`.fz-route-progress`) instead of a guessed page shape.
- **When a layout changes**, update the matching placeholder by hand in the same commit.

## Project Structure

```
src/
├── main.ts                    # Application entry point
├── app.css                    # Global styles + DS component classes (@layer components)
├── styles/fariz-tokens.css    # Fariz design tokens (dark default, light via data-theme)
├── App.svelte                 # Root component
├── routes/
│   ├── index.ts               # Route aggregator
│   ├── main.ts                # Main site routes (Home, Notes, Finance, Login, Files)
│   └── tools.ts               # 34 tool routes
├── components/
│   ├── Navigation.svelte      # Floating theme toggle + menu drawer
│   ├── CommandPalette.svelte  # Ctrl+K keyboard navigation
│   ├── Modal.svelte           # Reusable modal
│   ├── ToolLayout.svelte      # Consistent tool page wrapper
│   ├── SpotifyActivity.svelte # Real-time Spotify display
│   ├── NoteCard.svelte        # Note display cards
│   └── icons/                 # Custom icon components
├── lib/
│   ├── constants.ts           # API endpoints, app metadata
│   ├── toolsConfig.ts         # Centralized tool definitions + metadata
│   ├── router.ts              # Client-side SPA router with SEO
│   └── Link.svelte            # Enhanced link component
└── pages/
    ├── Home.svelte            # Portfolio homepage
    ├── Notes.svelte           # Notes list (from Soul API)
    ├── NotesCreate.svelte     # Create note (TipTap editor)
    ├── NotesEdit.svelte       # Edit note
    ├── Finance.svelte         # Personal finance tracker
    ├── Files.svelte           # File download via short codes
    └── tools/                 # 34 individual tool pages
```

## Architecture

### Routing
- Custom client-side router using History API
- GitHub Pages SPA support via redirect hack
- Dynamic meta tag updates per route (SEO)
- Each route has: `title`, `description`, `keywords`, `robots`

### State Management
- Svelte 5 Runes: `$state` for reactive state, `$derived` for computed values
- localStorage for persistence (theme, auth token)
- No external state management library

### API Integration (Soul Backend)
- **Axios instance** with base URL, timeout, Bearer token headers
- **Auth flow**: `validateToken()` → `login()` → token stored in localStorage
- **Auto-logout** on 401/403 responses
- **WebSocket manager** for real-time Spotify activity (Pusher protocol, auto-reconnect)

### Styling
- Fariz design system ("Bento Grid Playful × Blackhole") — full guide in DESIGN.md, source package in `design-2027/`
- Tokens only: `bg-canvas`, `bg-card`, `text-ink`, `text-ink-muted`, `bg-accent`, `text-accent-text`, `bg-tile-{deep,violet,lilac,lime,void}` (paired with `text-ink-on-dark` / `text-ink-on-bright`), `live`, `negative` … No Tailwind palette colors, no gradients, no `dark:` color variants
- DS components in `src/lib/components/ds/` (import from `'$lib/components/ds'`); permanent CSS classes (`.btn`, `.input`, `.card`, `.label`, `.badge`, tabs, prose) in `app.css`
- Flat: no borders/shadows between surfaces — ladder `bg-canvas` → `bg-card` → `bg-control` → `bg-raised` (`line`/`line-strong`/`shadow-card` tokens no longer exist); DS component CSS in `src/styles/fariz-components.css`
- Theme: modes dark (default) / light (`<html data-theme="light">`) / system, state in `src/lib/theme.svelte.ts`, persisted in `localStorage.theme`
- Fonts: Space Grotesk (sans/display) + IBM Plex Mono (labels, code), loaded in `index.html`

### Build Configuration
- Vite: manual chunk splitting (vendor, router, notifications)
- Svelte 5 runes enabled in `svelte.config.js`
- TypeScript strict mode
- ESLint + Prettier

## Key Features

### Developer Tools (34 tools)
Organized in 4 categories, configured centrally in `src/lib/toolsConfig.ts`:

- **Text & Data** (8): JSON Parser, Text Case Converter, Lorem Ipsum, Character Counter, Text Diff, URL Parser, Hash Generator, Base64 Converter
- **Generators & Converters** (7): QR Code, Color Converter, CSS Gradient, Color Palette, Password Generator, Slug Generator, Timestamp Converter
- **Web Development** (6): URL Encoder, HTML Entity Encoder, CSS Minifier, JS Minifier, CSS Shadow Generator, Meta Tag Generator
- **Utilities & Calculators** (13): Age Calculator, BMI Calculator, Percentage Calculator, Tip Calculator, Unit Converter, Random Picker, Hash Comparer, JWT Decoder, Cron Generator, ASCII Art, Markdown Preview, Pomodoro Timer, Temp File Upload

Tool page pattern (all 34 follow it — keep new tools the same):
- **Logic in `src/lib/tools/<name>.ts`**, pure and self-contained (no relative imports — `node --test` can't resolve extensionless ones; package imports are fine), with tests in `tests/<name>.test.ts`. Heavy libraries (terser, prettier, csso) are loaded with dynamic `import()` so they stay out of the main bundle.
- **Live output via `$derived`** (debounce large inputs; async work guarded by a run counter) — no "Generate/Convert" buttons, no stale output when input is cleared, never NaN/Infinity on screen.
- **DS components only**: `CopyChip` for every copy (no toasts), `Segmented`/`Switch`/`Slider`/`Select`/`TextField`/`Textarea`/`FileDrop`; every input labelled, icon-only buttons have `aria-label`, state never conveyed by color alone.
- **No filler**: no "Features"/"Tips" marketing cards. Persist only harmless preferences/drafts in `localStorage` (try/catch); never secrets (passwords, tokens).
- **Mobile**: no page-level horizontal scroll at 375px — grid children get `min-w-0`, long values `break-all`, code scrolls inside its box.

### Portfolio Features
- Professional profile display
- Skills and experience showcase
- Real-time Spotify activity (via Soul WebSocket)
- Notes management (CRUD via Soul API)
- Diary (Home view when logged in: Profile / Dashboard / Diary) — status-style quick notes over the Notes API, filtered by tags saved in `localStorage.diaryTagIds`; helpers in `src/lib/diary.ts` (tested with `npm test`), components in `src/components/diary/`
- Finance tracking (via Soul API)
- File sharing (via Soul API)
- Command palette (Ctrl+K)
- Responsive floating navigation

## Design Patterns

- **Composition over inheritance** for components
- **Utility-first CSS** with Tailwind classes
- **Type-safe tool configuration** with TypeScript interfaces
- **SEO-first**: every route has meta tags, Open Graph, structured data (JSON-LD)
- **Mobile-first responsive design**
- **WCAG 2.1 AA accessibility**: ARIA labels, keyboard nav, focus management

## Documentation

- **ARCHITECTURE.md** — Full system architecture: routing flow, state management (PaginatedStore), API client setup, WebSocket integration, build pipeline, component hierarchy, tool page pattern, SEO strategy, deployment pipeline
- **DESIGN.md** — Fariz design system: how tokens/components/theme are wired here, token table, brand book, component specs and props
- **AGENTS.md** — Agent-friendly instructions (Codex, Copilot, Cursor): quick reference, tech stack, API endpoints consumed, conventions checklist

## Constraints

- No server-side code — purely static frontend
- Git commands are read-only
- Must maintain visual consistency across all 34 tools
- Both themes (dark default, light) must work on all components; use tokens only
- All new code must use TypeScript
