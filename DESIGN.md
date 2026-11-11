# DESIGN.md

Design system for farizink.github.io — **Fariz DS** ("Bento Grid Playful × Blackhole", flat edition), adopted October 2026.
Source package: `design-2027/fariz-ds.zip` (exported from Claude Design). This file is the implementation guide; read it before touching any UI.

## How it is wired in this repo

| Piece | Location |
|---|---|
| Tokens (colors, surfaces, radius, shadows, fonts, type utilities) | `src/styles/fariz-tokens.css` (imported by `src/app.css`) |
| DS component CSS (`.fz-*`: overlay, sidebar, modal, forms, editor `.fz-prose`) | `src/styles/fariz-components.css`, imported into `@layer components` |
| Svelte components | `src/lib/components/ds/` — import from `'$lib/components/ds'` |
| Permanent CSS component classes (form controls, cards, tabs, prose) | `src/app.css`, inside `@layer components` so utilities can override them |
| Theme state | `src/lib/theme.svelte.ts` (`theme.mode`, `theme.light`, `setThemeMode`, `toggleTheme`); pre-paint script in `index.html` |
| Fonts | Space Grotesk + IBM Plex Mono `<link>` in `index.html` |

- **Flat:** no borders or shadows separate surfaces. Ladder: `bg-canvas` → `bg-card` → `bg-control` (fields, secondary buttons, chips, tabs, rows) → `bg-raised` (sidebar, modal, palette, dropdowns); `bg-sunken` for tracks and sunken wells inside cards. Overlays: `.fz-overlay` (or `bg-overlay backdrop-blur-sm`). The tokens `line`/`line-strong`/`shadow-card` no longer exist. Only `focus-ring` draws a line; spinners may use `border-control border-t-accent`.
- **Theme:** modes `dark` (default, no attribute), `light` (`<html data-theme="light">`), `system` (follows `prefers-color-scheme`), saved in `localStorage.theme`. `ThemeSwitch` (Dark/Light/Auto) lives in the menu; the floating `ThemeToggle` flips dark ↔ light. Never add `dark:` color variants.
- **Menu:** `Navigation.svelte` renders the DS `Sidebar` (Explore: Home, Tools; Personal: Notes, Finance only when logged in — Notes is deliberately not advertised to guests) with ThemeSwitch + settings (API status, offline mode `Switch`, install, refresh cache) in the bottom bento.
- **Modal:** `src/components/Modal.svelte` keeps its API (portal, nested stacking, scroll lock, `maxW`) but uses the DS look (`.fz-overlay`, `bg-raised` panel, pop-in). The DS `Modal` is used for small one-decision dialogs (e.g. the editor's link prompt).
- **Editor:** `TiptapEditor.svelte` uses `EditorShell` + `.fz-prose` (no NoteEditor: its task-list/image extensions aren't installed).
- **CSS classes you can use in markup:** `.btn` + `.btn-primary|secondary|ghost|danger|copy` + `.btn-sm|lg`, `.btn-icon`; `.input .textarea .select .tool-input .tool-select .inline-input .code-editor` (flat `bg-control` wells like TextField; `aria-invalid="true"` tints them); `.slider` (like the DS Slider — set `style="--p: {pct}%"` for the fill); `.label .control-label`; `.custom-checkbox .custom-radio`; `.mode-toggle .mode-btn`; `.tab-nav .tab-btn`; `.preset-btn .quick-btn`; `.card .tool-card .info-card .result-card .result-row .card-header .section-title(-sm) .action-bar`; `.badge(-primary|-success|-danger)`; `.status-success|error|warning`; `.feature-icon .feature-title .feature-description .features-grid`; `.stat-label .stat-value .result-label .result-value .text-count`; `.prose` (note bodies, same look as `.fz-prose`).
- **Repo additions to the component specs below:** `BentoCard` and `NoteCard` accept `onclick` (renders a `<button>` with the same lift); `PageHeader` accepts `icon` (snippet) + `iconTone`; `ServiceTile` hides the status when `unknown`; `ThemeToggle`/`ThemeSwitch` read shared state from `theme.svelte.ts`; `EditorShell` accepts `tools` (names to show) and `disabled`; `Sidebar` accepts `logo` (image URL; Navigation passes the site favicon `/android-chrome-192x192.png`).
- **Routing:** plain same-origin `<a href>` clicks are handled client-side by `src/lib/router.ts`, so `href` on DS components (and Sidebar items) navigates without a reload.
- **Tile foreground:** Event Horizon tiles are the same in both themes and carry their paired text color — `deep`/`violet` → `text-ink-on-dark`, `lilac`/`lime` → `text-ink-on-bright` (`tileClass`/`toneClass` do it). Children inside a tile inherit that color. Selected rows use `bg-control`; selected chips `bg-accent`; selected cards `bg-tile-deep`.
- **Motion:** DS tokens only — `duration-instant|fast|base|slow` + `ease-soft|spring|smooth|exit` (Tailwind utilities), `motion.ts` (`dur()`, `EASE`, `DURATION`) for Svelte transitions. The permanent classes in `app.css` (`.btn`, `.btn-icon`, `.tab-btn`, `.preset-btn`, `.card-hover`, checkboxes, `.slider`) carry the same press/hover moments as the DS components. `src/components/Modal.svelte` pops in and fades out like the DS Modal. `BentoGrid` tiles rise in order on mount. Nothing loops except loading skeletons (DS `Skeleton`, hand-made per surface and wrapped in `LoadingDelay`); the route-loading bar (`.fz-route-progress`) eases in once and never loops; `animate-ping/pulse/bounce` stay frozen globally; `animate-spin` is allowed for loaders. `prefers-reduced-motion` turns everything off (rule in `fariz-components.css`).
- **Tool pages:** wrap content in `ToolLayout` (breadcrumb + PageHeader with the category tile). Category tones: Text & Data → lilac, Generators → violet, Web Dev → deep, Utilities → lime (`categoryTone` in `tones.ts`, category `id` in `toolsConfig.ts`).
- **Skeletons:** DS `Skeleton` on `--bg-control` → `--bg-control-hover`; translucent on toned tiles. Draw the tile/row footprint, keep known labels real, and show nothing for the first 200 ms (`src/components/skeletons/LoadingDelay.svelte`).

---

> Source of truth for the visual redesign of fariz.dev. Read this before touching any UI.
> Stack: Svelte 5 (runes) + Tailwind CSS v4. Tokens: `src/styles/fariz-tokens.css` + `src/styles/fariz-components.css`. Components: `src/lib/components/ds/`. Forms, Sidebar, Modal and the Tiptap toolbar are ready-made — never hand-roll an `<input>`, `<select>` or menu.

## Rules for implementing (read first)

0. **Flat — no borders, no separating shadows.** Never use `border`, `ring` (except focus) or `shadow-*` to separate surfaces. Use the surface ladder: `bg-canvas` → `bg-card` → `bg-control` (fields, secondary buttons, chips, tabs) → `bg-raised` (sidebar, modal, dropdown). Overlays use `bg-overlay` + `backdrop-blur-sm`. Only dropdowns use `shadow-pop`; only interactive cards use `shadow-lift` on hover.
1. **Only use tokens.** Colors come from the Tailwind names in the token table (`bg-canvas`, `bg-card`, `text-ink`, `text-ink-muted`, `bg-accent`, `text-accent-text`, `bg-tile-deep`, `bg-tile-lime` …). No raw hex, no Tailwind palette colors (`yellow-*`, `purple-*`, `gray-*`), no gradients.
2. **Dark is the default theme.** Do not add `dark:` variants for color — semantic tokens already switch. Light mode = `data-theme="light"` on `<html>` (use the `ThemeToggle` component).
3. **Fonts** load via the `<link>` tags in `index.html` (see the comment at the top of fariz-tokens.css). **Typography** via the utilities `text-display-xl`, `text-display`, `text-title`, `text-body-lg`, `text-body`, `text-body-sm`, `text-label`, `text-code`; families `font-display`, `font-sans`, `font-mono`. Remove the old Outfit import.
4. **Shape:** cards `rounded-lg` (24px), controls/chips/tags `rounded-pill`, album art `rounded-sm`. Spacing uses Tailwind's 4px scale (space-3 = 12px → `gap-3`, space-5 = 24px → `p-6`).
5. **Components already exist** in `src/lib/components/ds/` (import from its `index.ts`). Build pages by composing them; never restyle a component per page. If a page needs something new, add a component there following these specs, then reuse it. Specs and props below (prop names match the Svelte components).
6. **Tiles (Event Horizon):** `deep`, `violet` take light text (`text-ink-on-dark`); `lilac`, `lime` take dark text (`text-ink-on-bright`) — `toneClass`/`tileClass` in `tones.ts` already pair them. At most ONE lime tile per screen. Text on `accent` is `text-ink-on-accent`; purple *text* is `text-accent-text`. Status colors (`live`, `negative`) always come with ▲/▼ or a label.
8. **Motion:** use the tokens only — `duration-instant|fast|base|slow` utilities and `ease-soft|spring|smooth|exit`. Press = `active:scale-[.96]` (cards `.985`) with `duration-fast ease-spring`; hover = one fill step or a 2px nudge (`fz-nudge`); nothing over 240ms; exits faster than entrances (`ease-exit`); no looping animation except `Skeleton`; wrap Svelte transitions with `dur()` from `motion.ts` so reduced motion is respected. The component CSS already animates checks, chips, dropdowns, errors and overlays — don't re-animate them.
7. Keep behavior and data fetching as-is (Spotify, notes, finance, auth). This is a visual redesign.

## Token table

| Token | Tailwind name (`bg-*`, `text-*`, `border-*`) | Dark (primary) | Light | Usage |
|---|---|---|---|---|
| `bg-canvas` | `canvas` | #09070f | #f0edf7 | Latar halaman — ruang hampa tempat grid bento melayang. Tema dark adalah tema utama. |
| `bg-card` | `card` | #191426 | #ffffff | Permukaan kartu bento default. Flat: dipisahkan dari kanvas oleh warna, tanpa border/shadow. |
| `bg-sunken` | `sunken` | #050309 | #ece8f5 | Track progress dan area tenggelam di dalam kartu. |
| `bg-raised` | `raised` | #251d3a | #ffffff | Permukaan yang melayang di atas halaman: sidebar/drawer, modal, popover. Di dark jelas lebih terang dari kanvas dan overlay, jadi tidak butuh border atau shadow. |
| `bg-control` | `control` | #30284a | #e6e0f2 | Isi kontrol flat: tombol secondary, icon button, chip, search, tab tidak aktif, item nav saat hover. Menggantikan border. |
| `bg-control-hover` | `control-hover` | #3a3156 | #dad2ec | Kontrol flat saat hover/pressed. |
| `overlay` | `overlay` | rgba(4, 2, 8, 0.72) | rgba(26, 18, 48, 0.32) | Lapisan peredup di belakang modal/drawer, dipakai bersama backdrop-blur 8px. |
| `ink` | `ink` | #f1edfa | #140f20 | Teks utama dan judul di atas bg-canvas, bg-card dan semua tile. |
| `ink-muted` | `ink-muted` | #a59fb8 | #5b5470 | Teks sekunder, label mono, metadata di atas bg-canvas/bg-card. |
| `accent` | `accent` | #9b6bff | #6d28d9 | Ungu blackhole — warna identitas: fill tombol primer, tile aksen, progress bar, ring cover. Teks di atasnya selalu ink-on-accent. |
| `accent-hover` | `accent-hover` | #b08aff | #5b21b6 | Fill accent saat hover/pressed. |
| `ink-on-accent` | `ink-on-accent` | #0b0714 | #ffffff | Teks/ikon di atas fill accent: gelap di tema dark, putih di tema light. |
| `accent-text` | `accent-text` | #bda2ff | #6d28d9 | Ungu untuk TEKS (link, kata yang ditekankan seperti "gabut") di atas bg-canvas/bg-card. |
| `tile-deep` | `tile-deep` | #3a2391 | #3a2391 | Tile ungu terdalam (sisi dalam event horizon). Teks: ink-on-dark. Kategori Web Development. |
| `tile-violet` | `tile-violet` | #6a4bf0 | #6a4bf0 | Tile ungu elektrik, langkah tengah skala. Teks: ink-on-dark. Kategori Generators & Converters. |
| `tile-lilac` | `tile-lilac` | #c3b0ff | #c3b0ff | Tile lilac terang, cahaya di tepi horizon. Teks: ink-on-bright. Kategori Text & Data. |
| `tile-lime` | `tile-lime` | #d6ff3d | #d6ff3d | Satu-satunya warna pop di luar ungu: highlight, tile 'baru/aktif', ring cover. Maksimal satu tile lime per layar. Teks: ink-on-bright. Kategori Utilities & Calculators. |
| `ink-on-bright` | `ink-on-bright` | #0b0714 | #0b0714 | Teks/ikon di atas tile-lilac dan tile-lime (≥10:1). |
| `tile-void` | `tile-void` | #241838 | #140f20 | Tile gelap paling dalam (Now Playing). Di dark ia sedikit terangkat dan berona ungu supaya tidak hilang di kanvas. Teks: ink-on-dark. |
| `ink-on-dark` | `ink-on-dark` | #f1edfa | #f1edfa | Teks di atas tile-void, tile-deep dan tile-violet. |
| `ink-on-dark-muted` | `ink-on-dark-muted` | #aaa3be | #aaa3be | Teks sekunder di atas tile-void dan tile-deep (tidak di tile-violet). |
| `live` | `live` | #3ccf7a | #187a42 | Status sedang memutar/online, pemasukan (finance), layanan up. Titik, ikon, dan angka tebal. |
| `negative` | `negative` | #ff7a8a | #c2354b | Pengeluaran (finance), error validasi, layanan down. Selalu disertai tanda −/ikon, bukan warna saja. |
| `focus-ring` | `focus-ring` | #bda2ff | #6d28d9 | Outline fokus keyboard 2px, offset 2px — satu-satunya garis di sistem ini (aksesibilitas). |

Radius: `rounded-sm` 10px · `rounded-md` 16px · `rounded-lg` 24px · `rounded-pill` 999px. Shadows: `shadow-card`, `shadow-lift`.

---

## Brand book

Design system untuk **fariz.dev**, personal hub milik Nizar Alfarizi Akbar. Arah visualnya **Bento Grid Playful × Blackhole**: kartu-kartu modular dengan radius besar yang melayang di ruang hampa, dengan **ungu blackhole** sebagai warna identitas. Palet tile-nya **Event Horizon**: skala ungu dari dalam horizon (deep) sampai tepinya yang bercahaya (lilac), ditambah satu pop **lime**. Tipografinya Space Grotesk + IBM Plex Mono. **Dark mode adalah tema utama**, dan light mode tersedia sebagai pendamping. Kesannya rapi seperti backend engineer, tapi santai seperti proyek "gabut".

## Apa yang dicakup sistem ini

fariz.dev bukan sekadar halaman profil. Hasil penelusuran (Oktober 2026) menemukan lima area yang memakai sistem yang sama:

| Area | Rute | Komponen utama |
|---|---|---|
| Profil / Home | `/` | BentoGrid, BentoCard, CopyChip, IconButton, NowPlaying |
| Dashboard (login) | `/` saat login | StatTile, NoteCard, ServiceTile |
| Developer Tools | `/tools`, 34 × `/tools/<id>` | PageHeader, SearchField, FilterTabs, ToolCard |
| Notes | `/notes`, `/notes/create`, `/notes/edit/:id` | PageHeader, SearchField, NoteCard, Tag, EditorShell |
| Finance | `/finance` | StatTile, FilterTabs |
| Temp Share | `/tools/temp-upload`, `/files/:code` | Button, EmptyState |
| Sistem | `/login`, 404, loading | EmptyState, Button, Skeleton |
| Menu (semua halaman) | drawer | Sidebar, ThemeSwitch, NowPlaying |
| Form (Tools, Notes, Finance, Temp Share) | — | TextField, Textarea, Select, MultiSelect, Checkbox, RadioGroup, Switch, Slider, FileDrop, Segmented, Modal |
| Editor catatan (Tiptap) | `/notes/create`, `/notes/edit/:id` | EditorShell + `.fz-prose` |

Kategori tools beserta tile-nya: **Text & Data Processing** (8) → `tile-lilac`, **Generators & Converters** (7) → `tile-violet`, **Web Development** (6) → `tile-deep`, **Utilities & Calculators** (13) → `tile-lime`.

## Content fundamentals

- **Bahasa situs: Inggris**, kalimat pendek, nada santai dan jujur. Contoh: "Currently building *gabut* projects and crushing work tasks." Istilah lokal boleh dipakai dan diberi penekanan dengan `accent-text`.
- **Sentence case** untuk judul dan tombol ("Load sample", bukan "Load Sample"). Label kartu ditulis UPPERCASE dalam mono ("NOW PLAYING", "STACK").
- Angka selalu nyata dan terlihat: "34 tools", "59 notes". Jangan pakai "banyak" atau "berbagai".
- Pesan error dibuat ringan tapi informatif. Contoh: "This page vanished into the digital void". Setelah itu langsung beri jalan keluar.
- Emoji tidak dipakai di UI (judul, kartu, tombol). Satu emoji di paragraf bio masih boleh.

## Visual foundations

**Warna.** Tema utama adalah **dark**: kanvas `bg-canvas` hampir hitam dengan rona ungu (#09070F), dan kartu `bg-card` sedikit lebih terang, tanpa border. Ungu `accent` (#9B6BFF di dark, #6D28D9 di light) adalah identitas, dipakai untuk tombol primer, satu tile aksen per layar, progress bar, dan border kartu saat hover. Teks di atas `accent` memakai `ink-on-accent` (gelap di dark, putih di light). Untuk *teks* ungu pakai `accent-text`. Empat tile membentuk palet **Event Horizon**. `tile-deep` (#3A2391) dan `tile-violet` (#6A4BF0) adalah ungu gelap dan elektrik dengan teks `ink-on-dark`. `tile-lilac` (#C3B0FF) adalah ungu terang dengan teks `ink-on-bright`. `tile-lime` (#D6FF3D) adalah satu-satunya warna pop di luar ungu, juga dengan teks `ink-on-bright`; pakai **maksimal satu tile lime per layar**, untuk hal yang baru, aktif, atau penting. Warna tile **sama di kedua tema**, jadi kartu tetap menyala di atas kanvas hitam maupun terang. Judul kartu `title`, isi `body`.

**Grid & spasi.** Grid bento 4 kolom (2 kolom di bawah 720px), gap `space-4` (mobile `space-3`). Padding kartu `space-5`, hero `space-6`. Antar section `space-7`, margin halaman `space-8`. Lebar konten maksimum 1120px.

**Bentuk.** `radius-lg` (24px) untuk semua kartu, dan ini radius khas sistem. Chip, tag, tombol, dan progress bar memakai `radius-pill`. Cover album memakai `radius-sm`.

**Flat, tanpa border.** Sistem ini flat seperti layout bento: **tidak ada border dan tidak ada shadow untuk memisahkan permukaan**. Pemisahan memakai tangga warna permukaan: `bg-canvas` → `bg-card` (kartu) → `bg-control` (isi kontrol: field, tombol secondary, chip, tab) → `bg-raised` (sidebar, modal, dropdown). Satu-satunya garis adalah `focus-ring` untuk fokus keyboard. Error ditandai dengan isi field yang diberi rona `negative` plus pesan, bukan garis merah.

**Overlay.** Sidebar dan modal muncul di atas `overlay` (peredup plus blur 8px), dan panelnya `bg-raised`. Di dark, panel jelas lebih terang dari halaman yang diredupkan, jadi tidak perlu border atau shadow. Dropdown kecil (Select, MultiSelect) adalah satu-satunya yang memakai `shadow-pop`, karena melayang di atas kartu yang warnanya sama.

**Motion.** Ringan, cepat, dan kalem, supaya UI tidak kaku tanpa jadi ramai. Token `duration-*` (90–240ms) dan `ease-*` mengatur semuanya:
- **Press:** semua yang bisa diklik sedikit mengecil (tombol 0.96, kartu 0.985), lalu memantul kembali dengan `ease-spring`.
- **Hover:** isi kontrol bergeser satu tingkat warna, kartu interaktif naik 2px dengan pendar `shadow-lift`, ikon di ujung tombol dan menu bergeser 2px ke arah aksinya, dan IconButton miring −6°.
- **Form:** centang checkbox tergambar sendiri, dot radio muncul dengan pop, chip multi-select muncul dari 80%, dropdown turun 4px dari trigger-nya, dan field error bergoyang 3px sekali.
- **Overlay:** drawer bergeser 24px, modal naik 8px; keduanya keluar lebih cepat dari masuknya (`ease-exit`).
- **Halaman:** tile bento muncul berurutan dengan selisih 35ms, sekali per halaman (`BentoGrid enter`).
- **Aturan:** tidak ada yang lebih dari 240ms, tidak ada animasi berulang kecuali `Skeleton` saat loading, dan `prefers-reduced-motion` mematikan semuanya. Detail per momen ada di kartu **Motion**.

**Komposisi bento.** Home page wajib memakai span campuran: satu tile 2×2 untuk hero, tile 2×1 untuk Now Playing, lalu tile 1×1 untuk stack, tools, foto, dan kontak. Grid berisi tile seragam hanya untuk halaman daftar (Tools, Notes).

**Tema.** Tema pertama di `tokens.json` adalah `dark`, jadi tanpa `data-theme` halaman tampil gelap. Light mode diaktifkan lewat `data-theme="light"` (atau `prefers-color-scheme: light`): kanvas jadi lavender sangat muda (#F6F4FB), ungu jadi lebih dalam (#6D28D9) supaya kontras tetap terjaga, dan tile tetap sama.

## Iconography

- Ikon UI: garis 2px, `stroke-linecap: round`, viewBox 24, warna `currentColor`. Gaya ini sama dengan Lucide, yang juga dipakai situs saat ini.
- Ukuran 20px di tombol dan 22px di ToolCard.
- Logo pihak ketiga (GitHub, Spotify, Unsplash, Immich, dll.) diambil dari aset resmi atau Simple Icons, dan tidak digambar ulang.
- Sistem ini belum punya logo/monogram Fariz. Untuk sementara wordmark ditulis sebagai teks "Fariz" dengan Space Grotesk 700.

## Aksesibilitas

Semua pasangan teks/latar di atas lolos 4.5:1 di kedua tema, dan `focus-ring` lolos 3:1. Kontrol dikenali dari isi `bg-control` dan labelnya, bukan dari garis. Fokus keyboard memakai outline 2px `focus-ring` dengan offset 2px. Warna status tidak pernah jadi satu-satunya penanda.

## Catatan untuk tim

- `/projects` ada di sitemap tapi menghasilkan 404. Pilihannya: buat halaman Projects (BentoGrid + BentoCard dengan `href`) atau hapus dari sitemap.
- `/notes` saat ini terbaca publik tanpa login. Pertimbangkan untuk menguncinya seperti `/finance`.


---

## Motion

Motion is how the system moves: light, quick and calm — hover and press the examples to feel it.

| Moment | Duration | Easing | What happens |
|---|---|---|---|
| Hover colour | `duration-instant` / `duration-fast` | `ease-smooth` | Fills shift one step (`bg-control` → `bg-control-hover`) |
| Press | `duration-fast` | `ease-spring` | Buttons, chips, tabs scale to 0.96; cards to 0.985; icon buttons 0.9 — spring back on release |
| Hover nudge | `duration-fast` | `ease-soft` | Trailing icons (`iconRight`, nav icons) move 2px toward the action; upload icon rises 3px; lime badge grows 8% |
| Card lift | `duration-base` | `ease-soft` | Interactive cards rise 2px with the `shadow-lift` glow |
| Check / radio | `duration-base` / `duration-fast` | `ease-soft` / `ease-spring` | Tick draws itself, radio dot pops, choice-card lime tick springs in |
| Chips & dropdowns | `duration-base` | `ease-spring` / `ease-soft` | Chips pop in from 80%; dropdowns drop 4px from their trigger |
| Feedback | `duration-base` | `ease-spring` | Copy icon pops to a check; errors shake 3px once; progress bars glide |
| Overlays | `duration-slow` in, faster out | `ease-soft` / `ease-exit` | Drawer slides 24px, modal rises 8px and scales from 98%, overlay fades |
| Page enter | `duration-slow` + `stagger` | `ease-soft` | Bento tiles rise 8px in order, 35ms apart, once per page (`BentoGrid enter`) |

Rules
- Nothing over 240ms; exits are faster than entrances.
- Move little: 2–8px, scale 0.9–1.08. No bounces bigger than the spring curve gives.
- Nothing loops except `Skeleton` while loading. No pulsing dots, no idle animation.
- `prefers-reduced-motion: reduce` turns every animation and transition into an instant change.

## Components

### BentoGrid

BentoGrid lays bento tiles on a 4-column grid that drops to 2 columns under 720px.

- Gap: `space-4` desktop, `space-3` mobile. Rows are at least 160px and grow with content.
- Children are `BentoCard`s (or any component built on it: `NowPlaying`, `ToolCard`, `NoteCard`, `StatTile`).
- Mix spans on purpose: one 2×2 hero, then 1×1 and 2×1 tiles. A grid of identical 1×1 tiles is a list; use it for Tools/Notes pages, not the home page.
- Consumer provides: page max-width (1120px suggested) and outer margin `space-8`.

### BentoCard

BentoCard is the single tile every surface in the system is built from.

- `tone`: `surface` (default, flat `bg-card`, no border), the four tiles `lime` `deep` `lilac` `violet`, `accent` (blackhole purple, text `ink-on-accent`), `void` (deepest dark tile, text `ink-on-dark`).
- Radius is always `radius-lg`; padding `space-5` (`size="lg"`: `space-6`).
- With `href` it becomes a link and lifts 2px with the soft `shadow-lift` glow on hover. Without `href` it never moves.
- `label` renders a mono uppercase eyebrow; keep it to 1–2 words ("NOW PLAYING", "STACK").
- Use at most one `accent` tile per screen; the purple is the brand, not decoration.

### Button

Button is a pill-shaped action; primary is blackhole purple with `ink-on-accent` text.

- `primary` once per view (Login, Upload, Save note). `secondary` for the rest, `ghost` inside cards and toolbars.
- Height 44px (`sm`: 36px). Label in `body-sm`, sentence case.
- With `href` it renders an `<a>`.

### IconButton

IconButton is a 44px round button for one icon: social links, the menu toggle, share.

- `label` is required; it becomes the `aria-label` and tooltip.
- Hover fills with `tile-lime` and tilts −6°, the system's one playful micro-motion.
- Consumer provides the icon (24px viewBox, 2px stroke, `currentColor`). Brand marks (GitHub, Spotify, Unsplash) come from the official brand assets or Simple Icons; never redraw them.

### CopyChip

CopyChip copies a value (the email) to the clipboard and confirms in place.

- Purple disc with a mail glyph; after copying it turns `live` green with a check and reads "Copied!" for 1.6s.
- The confirmation is announced (`aria-live`). Do not also show a toast.
- One per page: the primary contact on the home hero.

### Tag

Tag is a small mono pill for stack items, tool features and note labels.

- Neutral (`bg-sunken`) by default; `tone="accent"` (lilac) only for the "+N more" overflow tag.
- `dot` adds a purple dot: use it for note labels ("Yapping").
- Lowercase for tech names (`go`, `svelte`), as written for features.

### NowPlaying

NowPlaying is the Spotify tile: a dark `ink` bento card showing the current track.

- Two states: playing (title, artist, green live dot, `m:ss / m:ss`) and idle ("Not playing", grey dot, `--:--`).
- Progress bar fill is `accent` on a translucent track; it is decorative, the times are the data.
- Spans 2 columns by default. Consumer provides the data (`soul.fariz.dev/api/spotify`) and polls; the component is stateless.

### PageHeader

PageHeader opens every app page (Tools, Notes, Finance) with a badge, a title and one line of context.

- `highlight` is the last word of the title in `accent-text`: replaces the old purple-yellow gradient text.
- `badge` carries the live count ("34 tools", "59 notes") in mono on `tile-lime`.
- Centered on index pages, `start` on detail pages.

### SearchField

SearchField is the full-width pill search used on Tools and Notes.

- 52px tall, flat `bg-control` fill (no border), icon at left; optional `shortcut` hint (`Ctrl ⇧ F`) at right.
- Filters as you type; no submit button.

### FilterTabs

FilterTabs switches categories and always shows the item count.

- Selected tab inverts to `ink` with a purple count; others are flat `bg-control`.
- Use for the 4 tool categories, note labels, finance periods.

### ToolCard

ToolCard lists one developer tool on `/tools`.

- Icon square takes the category tile: Text & Data `lilac`, Generators & Converters `violet`, Web Development `deep`, Utilities & Calculators `lime`.
- Up to 3 feature tags, then a lilac "+N".
- Whole card is the link; hover lifts with a purple glow.

### NoteCard

NoteCard previews one note on `/notes`.

- Pinned notes show a purple "● PINNED" eyebrow and sort first.
- Excerpt clamps to 3 lines; labels are dotted Tags; footer shows date and attachment count in mono.
- Sample content only: never show real note text in docs or screenshots.

### StatTile

StatTile shows one number on the Finance page and the logged-in dashboard.

- Value in display type with tabular figures; delta below in mono: ▲ `live` for income/growth, ▼ `negative` for spending. The arrow carries the meaning, not just the colour.
- Use `tone` tiles sparingly: one highlighted stat per row.

### ServiceTile

ServiceTile links to one self-hosted service on the dashboard (9Router, RustFS, Immich, HH, Uptime, Cloud).

- A tinted square with the service initial (or a consumer-provided mark), name, one-line description, and an UP/DOWN status read from Uptime.
- Replaces the old per-service rainbow gradients: tints rotate through the four tiles.

### EmptyState

EmptyState covers 404, expired share links, login-required and empty lists.

- Optional big `code` ("404") in display type, `accent-text`.
- Title says what happened; text says what to do; at most two actions (primary + secondary).
- Copy stays light and human, in the site's voice ("vanished into the digital void").

### Sidebar

Sidebar is the site menu: a flat drawer floating 12px inside the viewport, over a blurred overlay.

- Separation is by surface, never border or shadow: `overlay` dims and blurs the page, the panel is `bg-raised` (clearly lighter than the dimmed page in dark, white over a lavender veil in light).
- Header: the blackhole mark (accent square, void disc, lime arc), name, domain, close button.
- Groups with a mono label: **Explore** (Home, Tools), **Personal** (Notes, Finance, Files — `locked` with a lock icon when logged out), **Homelab** (service links) when logged in.
- Item: 48px row, `radius-md`; 36px icon square in `bg-control`. Hover fills the row with `bg-control`. Active (`aria-current="page"`): row `bg-control`, icon square `accent`. Counts use the lime `badge` — at most one.
- Bottom bento (`children`): Now Playing mini and the ThemeSwitch, then a mono footer.
- Closes on Esc, overlay click and the close button. Consumer handles focus trap and body scroll lock (`inert` on the page works).
- `contained` renders inside its parent (for previews); omit it in the app.

### Modal

Modal asks for one decision or one small form, centered over the same blurred overlay as Sidebar.

- Panel `bg-raised`, `radius-lg`, padding `space-6`, max 480px wide. No border, no shadow: the overlay plus the lighter surface separate it in both themes.
- Title in `title` style, one-line description in `ink-muted`, body, then actions right-aligned: primary last.
- Inputs inside sit on `bg-control` like everywhere else.
- Closes on Esc, overlay click, close button. Destructive confirms use a secondary "Cancel" + primary verb ("Delete note").

### Segmented

Segmented picks one of 2–4 short options in place (period filters on Finance, view modes).

- `bg-control` track, selected segment `accent`. Labels one word, optional 16px icon.

### ThemeSwitch

ThemeSwitch is a segmented control for Dark / Light / Auto; it lives in the Sidebar's bottom bento.

- Built on `Segmented`: a `bg-control` pill track, the chosen segment filled `accent` with `ink-on-accent`.
- Dark is the default. "Auto" follows `prefers-color-scheme`. The consumer writes `data-theme` on `<html>` and remembers the choice.

### TextField

TextField is the flat text input: a `bg-control` well, 48px tall, `radius-md`, no border.

- Label above (`body-sm` 500), optional "OPTIONAL" mono tag, hint below in `ink-muted`.
- Hover → `bg-control-hover`. Focus → 2px `focus-ring` outline, offset 2px (the only line in the system). Caret is `accent`.
- Error: the fill tints toward `negative` and the hint is replaced by a message with an alert icon. Never colour alone.
- `prefix`/`suffix` in mono (units, `https://`), `icon` at left, `mono` for codes and hashes. Disabled = 50% opacity.

### Textarea

Textarea is TextField for multi-line plain text (descriptions, JSON input in tools). Same well, same states; resizes vertically. For rich text use EditorShell.

### Select

Select picks one value from a list: a TextField-looking trigger with a chevron and a floating listbox.

- The listbox is `bg-raised` with `shadow-pop` (the only shadow besides card hover: it floats over same-coloured cards), `radius-md`, 6px inset; options 40px, hover `bg-control`, the chosen one marked with an `accent-text` check.
- Keyboard: ↓/↑ move, Enter/Space choose, Esc closes; click outside closes.
- Options may carry a mono `hint` (unit, count). Over ~12 options, use MultiSelect-style search.

### MultiSelect

MultiSelect picks several values (note labels, tool filters): chosen values sit inside the well as lilac chips with a remove button.

- Listbox like Select plus a filter field on top; options carry a checkbox.
- Chips: `tile-lilac` with `ink-on-bright`, 32px, pill. Backspace-friendly remove buttons have labels ("Remove Dev").
- Keep chip text short; over ~5 chips the well wraps.

### Checkbox

Checkbox and Switch toggle options; RadioGroup chooses one.

- Checkbox: 22px, radius 7px, `bg-control`; checked = `accent` fill with an `ink-on-accent` check. Label at right, optional description in `ink-muted`.
- Switch: for settings that apply immediately (notifications, auto-play). Track `bg-control-hover`, on = `accent`, thumb `ink-on-accent`.
- Use checkboxes for options that are submitted together (Password Generator character sets).

### RadioGroup

RadioGroup chooses one option, as a list or as bento **choice cards**.

- List: 22px round `bg-control` box; checked = `accent` with an `ink-on-accent` dot.
- `variant="cards"`: each option is a `bg-control` tile with title + description; the chosen tile turns `tile-deep` with a lime check badge. Use for 2–4 meaningful choices (password style, upload expiry).

### Slider

Slider sets a number in a range (password length, Pomodoro minutes).

- 8px `bg-control` track, `accent` fill up to the value, 22px `ink` thumb (grows on hover). Value shown top-right in mono `accent-text` with its unit; optional scale marks under it.

### FileDrop

FileDrop is the Temp Share upload area: a big flat `bg-control` tile, no dashed border.

- Accent disc with an upload arrow, "Drop files or browse", a mono hint (limits, expiry).
- Drag-over: the tile turns `tile-deep`, the link turns lime, the title reads "Release to upload".
- Files list below as `bg-control` rows: lilac extension square, name, mono meta, a thin accent progress bar while uploading, remove button.

### EditorShell

EditorShell is the visual shell for the Tiptap editor used in Notes: a flat toolbar over a `bg-card` writing surface, plus the `.fz-prose` styles for Tiptap's content.

- Toolbar: `bg-control` strip, groups separated by space (no dividers): marks · headings · blocks · insert · history. Buttons 34px `radius-sm`, `ink-muted`; active = `accent` fill (pass Tiptap's `isActive` names in `active`). `onMouseDown` keeps editor focus.
- Content (`.fz-prose` on Tiptap's element): headings in Space Grotesk, links `accent-text` underlined, `mark` = lime highlight, inline code on `bg-control`, code blocks on `tile-void`, blockquote as a `bg-control` tile (no side border), list markers in `accent-text`, task lists with flat checkboxes, `hr` as a dotted row, placeholder via `data-placeholder`.
- Consumer provides the Tiptap editor and maps toolbar names to commands.

### Skeleton

Skeleton holds the place of content that is still loading (Spotify track, notes list, finance totals).

- A `bg-control` block with a soft shimmer toward `bg-control-hover`; on dark tiles it shimmers in translucent light.
- The **only** looping animation in the system — remove it the moment data arrives. Off under reduced motion.
- Match the shape of what's coming: `variant="text"` with `lines`, or a block with `width`/`height`, `round` for avatars and album art.

## Props reference (React types from the design system; the Svelte props use the same names)

```ts
import type { ReactNode, ChangeEvent } from "react";
export type Tone = "surface" | "lime" | "deep" | "lilac" | "violet" | "accent" | "void";
/** 4-column bento grid (2 columns under 720px). Gap space-4 / space-3. */
export interface BentoGridProps { children: ReactNode; enter?: boolean; className?: string; style?: object }
/** One bento tile. Becomes a link with hover-lift when href is set. */
export interface BentoCardProps { tone?: Tone; colSpan?: 1 | 2 | 3 | 4; rowSpan?: 1 | 2; label?: string; title?: ReactNode; size?: "md" | "lg"; href?: string; target?: string; children?: ReactNode }
export interface ButtonProps { variant?: "primary" | "secondary" | "ghost"; size?: "md" | "sm"; icon?: ReactNode; iconRight?: ReactNode; href?: string; disabled?: boolean; onClick?: () => void; children: ReactNode }
/** Round 44px button for a single icon; label is required (aria-label + tooltip). */
export interface IconButtonProps { label: string; href?: string; target?: string; onClick?: () => void; children: ReactNode }
/** Pill that copies value to the clipboard and confirms inline. */
export interface CopyChipProps { value: string; children?: ReactNode; copiedText?: string; resetMs?: number; onCopy?: (v: string) => void }
export interface TagProps { tone?: "neutral" | "accent"; dot?: boolean; children: ReactNode }
/** Spotify now-playing tile (tone void). Times in seconds. */
export interface NowPlayingProps { isPlaying: boolean; title?: string; artist?: string; albumArt?: string; progress?: number; duration?: number; href?: string; colSpan?: 1 | 2 | 3 | 4 }
export interface PageHeaderProps { title: string; highlight?: string; subtitle?: string; badge?: ReactNode; align?: "start" | "center" }
export interface SearchFieldProps { placeholder?: string; label?: string; value?: string; defaultValue?: string; shortcut?: string; onChange?: (e: ChangeEvent<HTMLInputElement>) => void }
export interface FilterTabsProps { items: { id: string; label: string; count?: number }[]; value?: string; defaultValue?: string; onChange?: (id: string) => void }
export interface ToolCardProps { name: string; description: string; icon: ReactNode; tone?: "lime" | "deep" | "lilac" | "violet"; features?: string[]; maxFeatures?: number; href?: string; colSpan?: 1 | 2 }
export interface NoteCardProps { title: string; excerpt?: string; labels?: string[]; date: string; attachments?: number; pinned?: boolean; href?: string; colSpan?: 1 | 2 }
export interface StatTileProps { label: string; value: string; delta?: { direction: "up" | "down"; text: string }; caption?: string; tone?: Tone; colSpan?: 1 | 2 }
export interface ServiceTileProps { name: string; description: string; href: string; mark?: ReactNode; tone?: "lime" | "deep" | "lilac" | "violet"; status?: "up" | "down" | "unknown" }
export interface EmptyStateProps { code?: string; title: string; text?: string; actions?: ReactNode }
export interface NavItem { id: string; label: string; href?: string; icon?: ReactNode; hint?: string; badge?: string | number; meta?: string; locked?: boolean }
/** Flat drawer menu over a blurred overlay. children = bottom bento (NowPlaying, ThemeSwitch). */
export interface SidebarProps { open: boolean; onClose: () => void; groups: { label: string; items: NavItem[] }[]; activeId?: string; brand?: string; subtitle?: string; side?: "right" | "left"; footer?: ReactNode | false; contained?: boolean; children?: ReactNode }
export interface ModalProps { open: boolean; onClose: () => void; title: string; description?: string; actions?: ReactNode; contained?: boolean; children?: ReactNode }
export interface SegmentedProps { label: string; options: { value: string; label: string; icon?: ReactNode }[]; value?: string; defaultValue?: string; onChange?: (v: string) => void }
export interface ThemeSwitchProps { value?: "dark" | "light" | "system"; defaultValue?: "dark" | "light" | "system"; onChange?: (v: "dark" | "light" | "system") => void }
interface FieldBase { label?: string; hint?: string; error?: string; optional?: boolean; id?: string }
export interface TextFieldProps extends FieldBase { value?: string; defaultValue?: string; placeholder?: string; type?: string; prefix?: string; suffix?: string; icon?: ReactNode; mono?: boolean; disabled?: boolean; onChange?: (e: ChangeEvent<HTMLInputElement>) => void }
export interface TextareaProps extends FieldBase { value?: string; defaultValue?: string; placeholder?: string; rows?: number; disabled?: boolean }
export interface Option { value: string; label: string; hint?: string; description?: string; disabled?: boolean }
export interface SelectProps extends FieldBase { options: Option[]; value?: string; defaultValue?: string; placeholder?: string; icon?: ReactNode; defaultOpen?: boolean; onChange?: (v: string) => void }
export interface MultiSelectProps extends FieldBase { options: Option[]; value?: string[]; defaultValue?: string[]; placeholder?: string; searchable?: boolean; defaultOpen?: boolean; onChange?: (v: string[]) => void }
export interface CheckboxProps { label: ReactNode; description?: string; checked?: boolean; defaultChecked?: boolean; disabled?: boolean; onChange?: (e: ChangeEvent<HTMLInputElement>) => void }
export interface RadioGroupProps extends FieldBase { options: Option[]; value?: string; defaultValue?: string; variant?: "list" | "cards"; name?: string; onChange?: (v: string) => void }
export interface SwitchProps { label: ReactNode; description?: string; checked?: boolean; defaultChecked?: boolean; disabled?: boolean; onChange?: (e: ChangeEvent<HTMLInputElement>) => void }
export interface SliderProps { label: string; min?: number; max?: number; step?: number; value?: number; defaultValue?: number; unit?: string; marks?: string[]; onChange?: (v: number) => void }
export interface UploadFile { name: string; meta: string; progress?: number; onRemove?: () => void }
export interface FileDropProps { hint?: string; multiple?: boolean; accept?: string; files?: UploadFile[]; onFiles?: (files: FileList) => void }
/** Toolbar names: bold italic strike code highlight h1 h2 h3 bulletList orderedList taskList blockquote codeBlock link image hr undo redo. */
export interface EditorShellProps { active?: string[]; onCommand?: (name: string) => void; meta?: string; children: ReactNode }
/** Loading placeholder; the only looping animation. */
export interface SkeletonProps { variant?: "block" | "text"; lines?: number; width?: number | string; height?: number | string; round?: boolean }
// BentoGridProps.enter (default true): tiles rise in order once on mount. ButtonProps.iconRight: trailing icon that nudges 2px on hover.

```
