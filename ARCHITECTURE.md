# ARCHITECTURE.md

System architecture for Fariz's portfolio website — a Svelte 5 SPA consuming the Soul backend API.

## High-Level Overview

```
┌──────────────────────────────────────────────────────┐
│           farizink.github.io (GitHub Pages)           │
│                                                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────────┐  │
│  │  Portfolio  │  │  34 Tools  │  │  Soul-Linked   │  │
│  │  Pages      │  │  (static)  │  │  Pages         │  │
│  │            │  │            │  │                │  │
│  │ • Home     │  │ • JSON     │  │ • Notes CRUD   │  │
│  │ • Profile  │  │ • QR Code  │  │ • Finance      │  │
│  │ • Skills   │  │ • Hash Gen │  │ • Files        │  │
│  └────────────┘  │ • Color    │  │ • Spotify      │  │
│                  │ • ...30more│  └───────┬────────┘  │
│                  └────────────┘          │           │
│                                          │           │
│  ┌───────────────────────────────────────┘           │
│  │  API Client (Axios + Auth Interceptors)           │
│  └──────────────────────┬────────────────────────────┘
│                         │                             │
│  ┌──────────────────────┘                             │
│  │  State Management (Svelte 5 Runes + Stores)       │
│  │  • $state / $derived                              │
│  │  • PaginatedStore (Notes, Tags)                   │
│  │  • localStorage (theme, auth, cache)              │
│  └───────────────────────────────────────────────────┘
└──────────────────────┬───────────────────────────────┘
                       │ HTTPS / WebSocket
                       ▼
              ┌─────────────────┐
              │   Soul Backend   │
              │  (Laravel API)   │
              │  soul.fariz.dev  │
              └─────────────────┘
```

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Svelte | ^5.38.9 (with Runes) |
| Language | TypeScript | ^5.9.2 (strict mode) |
| Build | Vite | ^7.1.5 |
| Styling | Tailwind CSS | ^4.1.13 |
| HTTP Client | Axios | ^1.13.5 |
| Rich Text | TipTap | latest |
| Icons | Lucide Svelte | latest |
| Notifications | svelte-sonner | ^1.0.5 |
| QR Codes | qrcode | ^1.5.4 |
| Deployment | GitHub Pages | gh-pages ^4.0.0 |
| Analytics | Umami | self-hosted |

## Directory Structure

```
farizink.github.io/
├── index.html                      # HTML template with SEO meta tags
├── src/
│   ├── main.ts                     # App entry point
│   ├── app.css                     # Global styles + @theme design tokens
│   ├── App.svelte                  # Root component (theme, router, layout)
│   │
│   ├── routes/                     # Route definitions
│   │   ├── index.ts                # Aggregates all routes → exports allRoutes, routesByCategory
│   │   ├── main.ts                 # Portfolio routes: /, /notes, /finance, /files, /login
│   │   └── tools.ts                # 34 tool routes: /tools/*
│   │
│   ├── lib/                        # Core libraries
│   │   ├── constants.ts            # API URLs, Spotify config, app metadata
│   │   ├── toolsConfig.ts          # Tool definitions (id, name, icon, category, features)
│   │   ├── router.ts               # Custom SPA router (History API + SEO)
│   │   ├── Router.svelte           # Router component
│   │   ├── Counter.svelte          # Character counter utility
│   │   └── Link.svelte             # Enhanced link component
│   │
│   ├── components/                 # Reusable components
│   │   ├── Navigation.svelte       # Floating bottom nav + theme toggle
│   │   ├── CommandPalette.svelte   # Ctrl+K tool search
│   │   ├── Modal.svelte            # Reusable modal dialog
│   │   ├── ToolLayout.svelte       # Tool page wrapper (consistent layout)
│   │   ├── ScrollToTop.svelte      # Floating scroll button
│   │   ├── WavesBackground.svelte  # Animated background
│   │   ├── SpotifyActivity.svelte  # Now playing display
│   │   ├── NoteCard.svelte         # Note preview card
│   │   ├── NoteForm.svelte         # Note creation/edit form
│   │   ├── TagFormModal.svelte     # Tag management modal
│   │   ├── TiptapEditor.svelte     # Rich text editor (TipTap)
│   │   ├── MultipleSelect.svelte   # Multi-select dropdown
│   │   ├── Pagination.svelte       # Pagination controls
│   │   ├── PWAInstall.svelte       # PWA install prompt
│   │   ├── OfflineIndicator.svelte # Offline status indicator
│   │   └── icons/                  # Custom SVG icons (GitHub, Twitter, etc.)
│   │
│   └── pages/                      # Page components
│       ├── Home.svelte             # Portfolio homepage
│       ├── Tools.svelte            # Tools listing/index
│       ├── Notes.svelte            # Notes list (Soul API)
│       ├── NotesCreate.svelte      # Create note (TipTap editor)
│       ├── NotesEdit.svelte        # Edit note
│       ├── Finance.svelte          # Finance tracker (Soul API)
│       ├── Files.svelte            # File download via short code
│       └── tools/                  # 34 individual tool pages
│           ├── JsonParser.svelte
│           ├── QRCodeGenerator.svelte
│           ├── ColorConverter.svelte
│           └── ... (31 more)
│
├── public/                         # Static assets
├── package.json
├── vite.config.ts                  # Build config with chunk splitting
├── svelte.config.js                # Svelte 5 runes config
├── tsconfig.json                   # TypeScript strict
├── postcss.config.js               # Tailwind CSS
└── eslint.config.js                # ESLint + Prettier
```

## Routing Architecture

### Custom SPA Router

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│ URL Change  │────▶│ Route Match  │────▶│ Render Page  │
│ (History    │     │ (router.ts)  │     │ Component    │
│  API)       │     │              │     │              │
└─────────────┘     └──────┬───────┘     └──────────────┘
                           │
                    ┌──────▼───────┐
                    │ Update SEO   │
                    │ Meta Tags    │
                    │ (title, desc,│
                    │  OG, JSON-LD)│
                    └──────────────┘
```

### Route Configuration

```typescript
// src/routes/main.ts — Main portfolio routes
{ path: '/',            component: Home,        title: 'Home' }
{ path: '/notes',       component: Notes,       title: 'Notes' }
{ path: '/notes/create',component: NotesCreate, title: 'Create Note' }
{ path: '/notes/edit/:id', component: NotesEdit,title: 'Edit Note' }  // :id parameter
{ path: '/finance',     component: Finance,     title: 'Finance' }
{ path: '/files/:code', component: Files,       title: 'Files' }      // :code parameter

// src/routes/tools.ts — 34 tool routes
{ path: '/tools/json-parser', component: JsonParser, title: 'JSON Parser', ... }
{ path: '/tools/qr-code',    component: QRCodeGen,  title: 'QR Code', ... }
// ... 32 more
```

Each route includes SEO metadata: `title`, `description`, `keywords`, `robots`.

### GitHub Pages SPA Support
- Uses redirect hack for clean URLs
- `404.html` redirects to `/?redirect=/path`
- Router picks up `redirect` query parameter on load

## State Management

### Svelte 5 Runes Pattern

```
$state        → Reactive mutable state
$derived      → Computed from $state
$effect       → Side effects (auto-tracked)
```

### Store Architecture

```
PaginatedStore (abstract base class)
│   ├── items: $state<T[]>           # Current items
│   ├── loading: $state<boolean>     # Loading state
│   ├── error: $state<string|null>   # Error state
│   ├── hasMore: $state<boolean>     # Pagination flag
│   │
│   ├── fetch(): Promise<void>       # Initial load
│   ├── loadMore(): Promise<void>    # Next page
│   └── refresh(): Promise<void>     # Reload
│
├── NotesStore
│   ├── notes (active notes)
│   ├── deletedNotesStore (trash)
│   └── 5-minute localStorage cache
│
└── TagsStore
    ├── tags (all tags)
    └── tagOptions (derived: [{label, value}])
```

### Persistence Layers

| Storage | Data | TTL |
|---|---|---|
| `localStorage` | Auth token | Until logout |
| `localStorage` | Theme preference | Permanent |
| `localStorage` | Notes cache | 5 minutes |

## API Integration

### HTTP Client Setup

```
┌───────────────────────────────────────────┐
│              Axios Instance                │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │ Request Interceptor                 │  │
│  │  • Inject Bearer token from localStorage
│  │  • Set Content-Type headers         │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │ Response Interceptor                │  │
│  │  • 401/403 → auto-logout           │  │
│  │  • Network error → toast notification
│  │  • Pass through successful data     │  │
│  └─────────────────────────────────────┘  │
└───────────────────────────────────────────┘
```

### API Endpoints Consumed

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| `GET` | `/api/health` | Health check | No |
| `POST` | `/api/login` | Authenticate | No |
| `POST` | `/api/logout` | Logout | Yes |
| `GET` | `/api/me` | Current user profile | Yes |
| `GET` | `/api/spotify/token` | Spotify access token | No |
| `GET` | `/api/notes` | List notes | Optional |
| `POST` | `/api/notes` | Create note | Yes |
| `GET` | `/api/notes/{id}` | Get note | Optional |
| `PUT` | `/api/notes/{id}` | Update note | Yes |
| `DELETE` | `/api/notes/{id}` | Delete note | Yes |
| `GET` | `/api/finance/transactions` | List transactions | Yes |
| `POST` | `/api/finance/transactions` | Create transaction | Yes |
| `GET` | `/api/finance/summary` | Finance summary | Yes |
| `POST` | `/api/temp-upload/upload` | Upload temp file | No |
| `POST` | `/api/temp-upload/shortlink` | Create shortlink | No |

### WebSocket (Real-time)

```
┌────────────┐     ┌───────────────────┐     ┌────────────────┐
│ Spotify    │────▶│ WebSocket Manager │────▶│ Soul Backend   │
│ Activity   │     │ (Pusher protocol) │     │ /api/spotify/  │
│ Component  │     │ • Auto-reconnect  │     │  stream (SSE)  │
└────────────┘     │ • Event routing   │     └────────────────┘
                   └───────────────────┘
```

## Build Architecture

### Vite Configuration

```
┌─────────────────────────────────────────────┐
│              Vite Build Pipeline             │
│                                             │
│  Input:                                     │
│    src/main.ts → index.html                 │
│                                             │
│  Plugins:                                   │
│    ├── @sveltejs/vite-plugin-svelte         │
│    └── @tailwindcss/vite                    │
│                                             │
│  Output Chunks:                             │
│    ├── vendor.js   (Svelte, Axios, etc.)    │
│    ├── router.js   (SPA router)             │
│    ├── notifications.js (svelte-sonner)     │
│    └── page chunks (per-route lazy load)    │
│                                             │
│  Target: GitHub Pages (static)              │
└─────────────────────────────────────────────┘
```

### Development vs Production

| Aspect | Development | Production |
|---|---|---|
| API URL | `http://localhost:8000` | `https://soul.fariz.dev` |
| WS URL | `ws://localhost:8080` | via Soul backend |
| Analytics | Disabled | Umami on fariz.dev |
| Source Maps | Enabled | Disabled |
| HMR | Enabled | N/A |
| Port | 3000 | N/A (static) |

## Component Hierarchy

```
App.svelte
├── Theme Provider (dark/light/system)
├── Router.svelte
│   ├── Navigation.svelte (floating bottom bar)
│   │   ├── Theme Toggle
│   │   └── Nav Links
│   ├── CommandPalette.svelte (Ctrl+K)
│   ├── ScrollToTop.svelte
│   └── WavesBackground.svelte
│
├── [Page Components]
│   ├── Home.svelte
│   │   ├── SpotifyActivity.svelte
│   │   ├── ConnectWithMe.svelte
│   │   └── DashboardView.svelte
│   │
│   ├── Notes.svelte
│   │   ├── NoteCard.svelte (per note)
│   │   ├── TagFormModal.svelte
│   │   └── Pagination.svelte
│   │
│   ├── NotesCreate.svelte / NotesEdit.svelte
│   │   ├── TiptapEditor.svelte
│   │   └── TagFormModal.svelte
│   │
│   ├── Finance.svelte
│   │   └── (inline forms + charts)
│   │
│   └── tools/[ToolName].svelte
│       └── ToolLayout.svelte (wrapper)
│           ├── Input Section
│           ├── Output Section
│           └── Action Buttons
│
├── Modal.svelte (shared)
├── PWAInstall.svelte
└── OfflineIndicator.svelte
```

## Tool Architecture

### Configuration (`src/lib/toolsConfig.ts`)

```typescript
interface Tool {
  id: string           // 'json-parser', 'qr-code-generator', etc.
  name: string         // Display name
  description: string  // Short description
  icon: any            // Lucide icon component
  features: string[]   // Feature list
  comingSoon: boolean  // Show as coming soon
}

interface Category {
  name: string         // 'Text & Data Processing'
  description: string  // Category description
  tools: Tool[]        // Tools in category
}
```

### Helper Functions
- `getAllTools()` → All tools flat array
- `getToolById(id)` → Single tool by ID
- `searchTools(query)` → Search by name/keywords

### Categories & Count

| Category | Count | Examples |
|---|---|---|
| Text & Data Processing | 8 | JSON Parser, Text Diff, Hash Generator |
| Generators & Converters | 7 | QR Code, Color Converter, Password Generator |
| Web Development | 6 | URL Encoder, CSS Minifier, Meta Tag Generator |
| Utilities & Calculators | 13 | BMI Calculator, JWT Decoder, Pomodoro Timer |

### Tool Page Pattern

Every tool follows this consistent structure:

```
┌─────────────────────────────────────┐
│ ToolLayout                          │
│ ├── Icon + Title + Description      │
│ └── Content Area                    │
│     ├── Input Section               │
│     │   ├── Textarea / Input        │
│     │   ├── Options / Settings      │
│     │   └── Action Button (Generate)│
│     │                               │
│     ├── Output Section              │
│     │   ├── Result Display          │
│     │   └── Copy / Download Button  │
│     │                               │
│     └── Error State (if any)        │
└─────────────────────────────────────┘
```

## SEO Architecture

### Meta Tag Strategy
```
┌──────────────────────────────────┐
│ Per-Route SEO                    │
│                                  │
│ ├── <title>                      │
│ ├── <meta name="description">    │
│ ├── <meta name="keywords">       │
│ ├── <meta name="robots">         │
│ ├── <link rel="canonical">       │
│ │                                │
│ ├── Open Graph                   │
│ │   ├── og:title                 │
│ │   ├── og:description           │
│ │   ├── og:type                  │
│ │   └── og:url                   │
│ │                                │
│ ├── Twitter Card                 │
│ │   ├── twitter:card             │
│ │   ├── twitter:title            │
│ │   └── twitter:description      │
│ │                                │
│ └── JSON-LD (Structured Data)    │
│     └── Person / WebSite schema  │
└──────────────────────────────────┘
```

### Dynamic Updates
- Router updates meta tags on every navigation
- Each route defines its own SEO metadata
- Home page includes comprehensive JSON-LD structured data

## Deployment

### GitHub Pages Pipeline

```
┌──────────┐     ┌──────────┐     ┌──────────────┐
│ npm run   │────▶│ vite     │────▶│ gh-pages     │
│ build     │     │ build    │     │ deploy       │
│           │     │          │     │              │
│ tsc check │     │ chunks + │     │ push to      │
│ + vite    │     │ assets   │     │ gh-pages     │
└──────────┘     └──────────┘     │ branch       │
                                  └──────────────┘
                                        │
                                        ▼
                                  ┌──────────────┐
                                  │ GitHub Pages  │
                                  │ fariz.dev     │
                                  │ (static CDN)  │
                                  └──────────────┘
```

### Constraints
- **Static only** — no server-side code
- **SPA routing** — requires redirect hack for clean URLs
- **HTTPS only** — enforced by GitHub Pages
- **No secrets** — all config via environment variables at build time
