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
- **Styling**: Tailwind CSS 4 with `@theme`-based design system
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

**Important**: No Git commands that modify the repository (read-only access policy).

## Project Structure

```
src/
├── main.ts                    # Application entry point
├── app.css                    # Global styles + @theme design tokens
├── App.svelte                 # Root component
├── routes/
│   ├── index.ts               # Route aggregator
│   ├── main.ts                # Main site routes (Home, Notes, Finance, Login, Files)
│   └── tools.ts               # 34 tool routes
├── components/
│   ├── Navigation.svelte      # Floating bottom nav with theme toggle
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
- Tailwind CSS 4 with custom `@theme` tokens in `app.css`
- Color palette: Purple primary (`--color-primary-*`), Slate secondary, semantic colors
- Component CSS classes: `.btn`, `.input`, `.card`, `.badge`, `.label`
- Dark mode: system detection + manual toggle, persisted in localStorage
- Google Fonts: Outfit family

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

### Portfolio Features
- Professional profile display
- Skills and experience showcase
- Real-time Spotify activity (via Soul WebSocket)
- Notes management (CRUD via Soul API)
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
- **DESIGN.md** — UI design system: Tailwind CSS 4 @theme tokens, color palette (purple primary), spacing/radius/shadow scales, component CSS classes, dark mode colors, typography, tool page layout pattern
- **AGENTS.md** — Agent-friendly instructions (Codex, Copilot, Cursor): quick reference, tech stack, API endpoints consumed, conventions checklist

## Constraints

- No server-side code — purely static frontend
- Git commands are read-only
- Must maintain visual consistency across all 34 tools
- Dark mode must work on all components
- All new code must use TypeScript
