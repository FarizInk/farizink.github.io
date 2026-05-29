# DESIGN.md

Design system and UI architecture for the Fariz portfolio website (Svelte 5 + Tailwind CSS 4).

## Design Foundation

The portfolio uses a custom design system built with **Tailwind CSS 4 `@theme` tokens** defined in `src/app.css`. The design is **purple-primary** with a warm, modern aesthetic.

### Font
- **Outfit** (Google Fonts) — primary typeface for all text
- Clean, geometric sans-serif suitable for both headings and body

### Color System

Colors are defined as CSS custom properties in the `@theme` block of `src/app.css` and used as Tailwind utilities.

#### Primary Colors — Purple
The signature brand color. Used for primary actions, links, and emphasis.

| Token | Purpose |
|---|---|
| `--color-primary-50` through `--color-primary-900` | Full purple scale (light → dark) |
| **Core**: `#8b5cf6` (500) → `#4c1d95` (900) | Brand purple range |

#### Secondary Colors — Slate Gray
Neutral palette for text, backgrounds, and borders.

| Token | Purpose |
|---|---|
| `--color-secondary-50` through `--color-secondary-900` | Slate gray scale |
| Range: `#f8fafc` (50) → `#0f172a` (900) | Light → dark gray |

#### Semantic Colors

| Color | Token Prefix | Core Value | Usage |
|---|---|---|---|
| **Success** | `--color-success-*` | Green `#22c55e` → `#14532d` | Success states, confirmations |
| **Warning** | `--color-warning-*` | Amber `#f59e0b` → `#78350f` | Warnings, caution states |
| **Danger** | `--color-danger-*` | Red `#ef4444` → `#7f1d1d` | Errors, destructive actions |

Each semantic color has a full 50–900 scale.

#### Color Scale Pattern
All colors follow the standard Tailwind scale:
```
50  (lightest) → 100 → 200 → 300 → 400 → 500 (base) → 600 → 700 → 800 → 900 (darkest)
```

### Spacing System
Custom spacing scale via CSS custom properties:
```
--space-1  (4px)   → --space-2  (8px)   → --space-3  (12px)
--space-4  (16px)  → --space-5  (20px)  → --space-6  (24px)
--space-8  (32px)  → --space-10 (40px)  → --space-12 (48px)
--space-16 (64px)  → --space-20 (80px)
```

### Border Radius
```
--radius-sm  (6px)   → --radius-md  (8px)   → --radius-lg  (12px)
--radius-xl  (16px)  → --radius-2xl (24px)  → --radius-full (9999px)
```

### Shadows
```
--shadow-sm  → --shadow-md → --shadow-lg → --shadow-xl → --shadow-2xl
```
Includes blur effects for elevated surfaces.

## Component Patterns

### CSS Component Classes
Reusable utility classes defined in `src/app.css`:

| Class | Usage |
|---|---|
| `.btn` | Base button with variants (`.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost`, `.btn-danger`) |
| `.input` | Form input fields |
| `.textarea` | Multi-line text inputs |
| `.select` | Dropdown selects |
| `.card` | Container card with padding, border, shadow |
| `.badge` | Small label/tag with color variants |
| `.label` | Form label |

### Svelte Components

#### Layout Components
- **`Navigation.svelte`** — Floating bottom navigation bar with:
  - Theme toggle (light/dark/system)
  - Responsive design
  - Glassmorphism effect
- **`ToolLayout.svelte`** — Wrapper for all developer tool pages with:
  - Consistent header (icon, title, description)
  - Standard padding and max-width
  - Breadcrumb navigation
- **`Modal.svelte`** — Reusable modal dialog
- **`CommandPalette.svelte`** — Ctrl+K keyboard-driven tool search

#### Feature Components
- **`SpotifyActivity.svelte`** — Real-time now-playing display
- **`NoteCard.svelte`** — Note preview card with metadata
- **`DashboardView.svelte`** — Analytics overview
- **`ConnectWithMe.svelte`** — Social media links grid
- **`ScrollToTop.svelte`** — Floating scroll-to-top button
- **`PixelBackground.svelte`** — Animated pixel art background

### Tool Page Pattern
All 34 tools follow a consistent structure:
```
ToolLayout (header + icon + title + description)
  └── Tool-specific content area
       ├── Input section (controls, forms)
       ├── Output section (results, previews)
       └── Action buttons (copy, download, clear)
```

## Dark Mode

### Implementation
- **System detection**: respects `prefers-color-scheme`
- **Manual toggle**: via Navigation theme switcher
- **Persistence**: stored in `localStorage`
- **CSS**: dark mode styles defined alongside light styles

### Dark Mode Colors
| Element | Light | Dark |
|---|---|---|
| Background | white / light gray | `#0f172a` / dark slate |
| Text | dark gray / black | light gray / white |
| Cards | white with shadow | dark gray with subtle border |
| Primary | purple-600 | purple-400 |
| Inputs | white bg, gray border | dark bg, gray border |

## Layout System

### Max Widths
- Content: `max-w-7xl` (1280px)
- Tool content: `max-w-4xl` (896px)
- Full-width sections for hero/backgrounds

### Navigation
- **Floating bottom bar** — appears on scroll, contains main nav links
- **Command Palette** — Ctrl+K opens searchable tool list
- **Breadcrumbs** — on tool pages for navigation hierarchy

### Responsive Breakpoints
Standard Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Typography

### Scale
- **Hero headings**: `text-4xl` to `text-6xl`, bold
- **Section headings**: `text-2xl` to `text-3xl`, semibold
- **Subheadings**: `text-xl`, medium
- **Body**: `text-base` (16px), regular
- **Small/caption**: `text-sm` to `text-xs`

### Color
- Headings: `text-secondary-900` (light) / `text-secondary-50` (dark)
- Body: `text-secondary-700` (light) / `text-secondary-300` (dark)
- Muted: `text-secondary-500` (light) / `text-secondary-400` (dark)

## Animations & Effects

- **Glassmorphism**: navigation bar uses `backdrop-blur` + semi-transparent bg
- **Hover transitions**: smooth `transition-all` on interactive elements
- **Scroll animations**: scroll-to-top with smooth behavior
- **Loading states**: Skeleton components and spinner animations

## Adding New Tool Pages

1. Create component in `src/pages/tools/<ToolName>.svelte`
2. Wrap content in `<ToolLayout>` with icon, title, description
3. Add route entry in `src/routes/tools.ts` with SEO metadata
4. Add tool config in `src/lib/toolsConfig.ts` with:
   - `id`, `name`, `description`, `icon` (from Lucide)
   - `category`, `route`, `keywords`
5. Follow the input → output pattern
6. Ensure dark mode works
7. Test responsive on mobile

## Accessibility Standards

- **WCAG 2.1 AA** compliance target
- ARIA labels on interactive elements
- Keyboard navigation support (tab, enter, escape)
- Focus management in modals and command palette
- High contrast color ratios (4.5:1 minimum)
- Semantic HTML structure
- Screen reader compatible
