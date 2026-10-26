# AGENTS.md

This file provides guidance for AI agents (Codex, Copilot, Cursor, etc.) working with this codebase.

## What is farizink.github.io?

A personal portfolio website for Nizar Alfarizi Akbar (Fariz) — Software Engineer from Sidoarjo, Indonesia. It is:

1. **Portfolio** — Professional profile, skills, experience showcase
2. **34 Developer Tools** — Fully implemented utilities as technical demonstrations
3. **Soul API Consumer** — Frontend-only app that connects to the Soul backend for Notes, Finance, Files, Spotify

Deployed as a **static site** on GitHub Pages. No server-side code.

## Quick Reference

### Run Commands
```bash
npm run dev        # Dev server (./clean-js.sh && vite)
npm run build      # tsc + vite build
npm run preview    # Preview production build
npm run check      # Svelte type checking
npm run lint       # ESLint
npm run format     # Prettier
```

**Constraint**: No Git commands that modify the repository (read-only access).

## Technology Stack

- **Svelte 5** with TypeScript and Runes (`$state`, `$derived`)
- **Vite 7** with Svelte plugin
- **Tailwind CSS 4** with `@theme` design tokens
- **TipTap** rich text editor
- **Axios** HTTP client with auth interceptors
- **Lucide Svelte** icons
- **svelte-sonner** toast notifications

## Architecture Summary

### Project Structure
```
src/
├── main.ts              # Entry point
├── app.css              # Global styles + DS component classes
├── styles/fariz-tokens.css # Fariz design tokens
├── App.svelte           # Root component
├── routes/
│   ├── index.ts         # Route aggregator
│   ├── main.ts          # Home, Notes, Finance, Login, Files
│   └── tools.ts         # 34 tool routes
├── components/          # Reusable UI components
├── lib/
│   ├── constants.ts     # API endpoints, app metadata
│   ├── toolsConfig.ts   # Tool definitions (centralized)
│   ├── router.ts        # SPA router (History API)
│   └── Link.svelte      # Enhanced link
└── pages/
    ├── Home.svelte      # Portfolio homepage
    ├── Notes*.svelte    # Notes CRUD (via Soul API)
    ├── Finance.svelte   # Finance tracker (via Soul API)
    ├── Files.svelte     # File sharing (via Soul API)
    └── tools/           # 34 tool pages
```

### Routing
- Custom SPA router using History API (`src/lib/router.ts`)
- GitHub Pages SPA routing via redirect hack
- Dynamic SEO meta tags per route (title, description, keywords, Open Graph, JSON-LD)

### Soul API Integration
- **Base URL**: `https://soul.fariz.dev` (production) / `http://localhost:8000` (dev)
- **Config**: `src/lib/constants.ts`
- **Auth**: Bearer token (Laravel Sanctum) stored in localStorage
- **HTTP**: Axios with request/response interceptors for auth and error handling
- **WebSocket**: Pusher-compatible protocol for real-time Spotify activity

### API Endpoints Used
| Endpoint | Purpose |
|---|---|
| `POST /api/login` | Authentication |
| `POST /api/logout` | Logout |
| `GET /api/me` | Current user |
| `GET /api/health` | Health check |
| `GET /api/spotify/token` | Spotify access token |
| `GET/POST/PUT/DELETE /api/notes/*` | Notes CRUD |
| `GET/POST/PUT/DELETE /api/finance/*` | Finance CRUD + summary |
| `POST /api/temp-upload/*` | File uploads + shortlinks |

### State Management
- **Svelte 5 Runes**: `$state` for reactive state, `$derived` for computed
- **localStorage**: theme preference, auth token persistence
- No external state library

### Styling
- **Tailwind CSS 4** + Fariz design system (see DESIGN.md): semantic tokens only (`canvas`, `card`, `ink`, `accent`, `tile-*`, `live`, `negative`), no palette colors, no gradients
- DS Svelte components in `src/lib/components/ds/` (import from `'$lib/components/ds'`)
- Component classes: `.btn`, `.input`, `.card`, `.badge`, `.label`
- Flat surfaces: no borders/shadows between surfaces; use `bg-card` → `bg-control` → `bg-raised`
- Theme: dark default, light via `data-theme="light"`, or system (`src/lib/theme.svelte.ts`) → localStorage; no `dark:` color variants
- Fonts: Space Grotesk + IBM Plex Mono

### Tools Configuration
All 34 tools defined in `src/lib/toolsConfig.ts`:
- TypeScript interfaces for type safety
- Helper functions: `getAllTools()`, `getToolById()`, `searchTools()`
- 4 categories: Text & Data (8), Generators (7), Web Dev (6), Utilities (13)
- Each tool has: id, name, description, icon, category, route, keywords

## Key Conventions

1. **TypeScript everywhere** — all new code must be typed
2. **Runes** — use `$state`/`$derived`, not legacy Svelte stores
3. **No Git writes** — read-only repository access
4. **Mobile-first** — responsive design on all components
5. **Themes** — dark (default) and light must work across all components
6. **Tool layout** — use `ToolLayout.svelte` wrapper for consistent tool pages
7. **SEO** — every route needs meta tags and Open Graph data
8. **Accessibility** — WCAG 2.1 AA compliance (ARIA, keyboard nav, focus management)
9. **Composition** — prefer component composition over inheritance
10. **API errors** — 401/403 auto-logout, network errors shown via sonner

## Documentation

- **CLAUDE.md** — Claude Code instructions: full feature details, routing, API integration, build config, tools inventory, constraints
- **ARCHITECTURE.md** — System diagrams, router flow, state management, API client, component hierarchy, build pipeline, deployment
- **DESIGN.md** — Fariz design system: tokens, components, theme wiring, brand rules
