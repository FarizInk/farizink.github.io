# Fariz Design System — implementation guide

> Source of truth for the visual redesign of fariz.dev. Read this before touching any UI.
> Stack: Svelte 5 (runes) + Tailwind CSS v4. Tokens live in `src/styles/fariz-tokens.css`.

## Rules for implementing (read first)

1. **Only use tokens.** Colors come from the Tailwind names in the token table below (`bg-canvas`, `bg-card`, `text-ink`, `text-ink-muted`, `bg-accent`, `text-accent-text`, `bg-tile-violet` …). No raw hex, no Tailwind palette colors (`yellow-*`, `purple-*`, `gray-*`), no gradients.
2. **Dark is the default theme.** Do not add `dark:` variants for color — semantic tokens already switch. Light mode = `data-theme="light"` on `<html>`; provide a toggle that writes it and respects `prefers-color-scheme` on first visit.
3. **Typography** via the utilities `text-display-xl`, `text-display`, `text-title`, `text-body-lg`, `text-body`, `text-body-sm`, `text-label`, `text-code`. Fonts: `font-display`, `font-sans`, `font-mono`. Remove the old Outfit import.
4. **Shape:** cards `rounded-lg` (24px), controls/chips/tags `rounded-pill`, album art `rounded-sm`. Spacing uses Tailwind's 4px scale (space-3 = 12px → `gap-3`, space-5 = 24px → `p-6`).
5. **Components** below are specs, not code to copy. Build each as a Svelte 5 component in `src/lib/components/ds/` with the same name and the props in "Props reference". Reuse them everywhere; do not restyle per page.
6. **Contrast:** text on `accent` is always `text-ink-on-accent`; purple *text* is `text-accent-text`; `glow-amber` is never text. Status colors (`live`, `negative`) always come with ▲/▼ or a label.
7. Keep behavior and data fetching as-is (Spotify, notes, finance, auth). This is a visual redesign.

## Token table

| Token | Tailwind name | Dark (primary) | Light | Usage |
|---|---|---|---|---|
| `bg-canvas` | `canvas` (e.g. `bg-canvas`, `text-…`, `border-…`) | #09070f | #f6f4fb | Latar halaman — ruang hampa tempat grid bento melayang. Tema dark adalah tema utama. |
| `bg-card` | `card` (e.g. `bg-card`, `text-…`, `border-…`) | #14101d | #ffffff | Permukaan kartu bento default. |
| `bg-sunken` | `sunken` (e.g. `bg-sunken`, `text-…`, `border-…`) | #050309 | #ece8f5 | Track progress, field input, area tenggelam di dalam kartu. |
| `border-subtle` | `line` (e.g. `bg-line`, `text-…`, `border-…`) | #251f35 | #e2dcef | Garis tepi kartu 1px dan pemisah. |
| `border-strong` | `line-strong` (e.g. `bg-line-strong`, `text-…`, `border-…`) | #6f6788 | #857d9c | Tepi kontrol (chip, icon button, search) — minimal 3:1 di atas bg-card. |
| `ink` | `ink` (e.g. `bg-ink`, `text-…`, `border-…`) | #f1edfa | #140f20 | Teks utama dan judul di atas bg-canvas, bg-card dan semua tile. |
| `ink-muted` | `ink-muted` (e.g. `bg-ink-muted`, `text-…`, `border-…`) | #a59fb8 | #5b5470 | Teks sekunder, label mono, metadata di atas bg-canvas/bg-card. |
| `accent` | `accent` (e.g. `bg-accent`, `text-…`, `border-…`) | #9b6bff | #6d28d9 | Ungu blackhole — warna identitas: fill tombol primer, tile aksen, progress bar, ring cover. Teks di atasnya selalu ink-on-accent. |
| `accent-hover` | `accent-hover` (e.g. `bg-accent-hover`, `text-…`, `border-…`) | #b08aff | #5b21b6 | Fill accent saat hover/pressed. |
| `ink-on-accent` | `ink-on-accent` (e.g. `bg-ink-on-accent`, `text-…`, `border-…`) | #0b0714 | #ffffff | Teks/ikon di atas fill accent: gelap di tema dark, putih di tema light. |
| `accent-text` | `accent-text` (e.g. `bg-accent-text`, `text-…`, `border-…`) | #bda2ff | #6d28d9 | Ungu untuk TEKS (link, kata yang ditekankan seperti "gabut") di atas bg-canvas/bg-card. |
| `tile-violet` | `tile-violet` (e.g. `bg-tile-violet`, `text-…`, `border-…`) | #2a1a50 | #e6dcff | Tile bento ungu — nebula, versi tenang dari accent. Teks: ink. Kategori Web Development. |
| `tile-orchid` | `tile-orchid` (e.g. `bg-tile-orchid`, `text-…`, `border-…`) | #3b1645 | #f7dcf3 | Tile bento orchid. Teks: ink. Kategori Generators & Converters. |
| `tile-amber` | `tile-amber` (e.g. `bg-tile-amber`, `text-…`, `border-…`) | #3d2a0b | #ffe3b3 | Tile bento amber — cahaya accretion disk, satu-satunya kehangatan di palet. Teks: ink. Kategori Text & Data. |
| `tile-teal` | `tile-teal` (e.g. `bg-tile-teal`, `text-…`, `border-…`) | #0f3236 | #cbece8 | Tile bento teal. Teks: ink. Kategori Utilities & Calculators. |
| `tile-void` | `tile-void` (e.g. `bg-tile-void`, `text-…`, `border-…`) | #241838 | #140f20 | Tile gelap paling dalam (Now Playing). Di dark ia sedikit terangkat dan berona ungu supaya tidak hilang di kanvas. Teks: ink-on-dark. |
| `ink-on-dark` | `ink-on-dark` (e.g. `bg-ink-on-dark`, `text-…`, `border-…`) | #f1edfa | #f1edfa | Teks di atas tile-void. |
| `ink-on-dark-muted` | `ink-on-dark-muted` (e.g. `bg-ink-on-dark-muted`, `text-…`, `border-…`) | #aaa3be | #aaa3be | Teks sekunder di atas tile-void. |
| `glow-amber` | `glow-amber` (e.g. `bg-glow-amber`, `text-…`, `border-…`) | #ffb347 | #d97706 | Garis cahaya accretion: aksen dekoratif tipis (ring cover, highlight hover). Bukan untuk teks. |
| `live` | `live` (e.g. `bg-live`, `text-…`, `border-…`) | #3ccf7a | #187a42 | Status sedang memutar/online, pemasukan (finance), layanan up. Titik, ikon, dan angka tebal. |
| `negative` | `negative` (e.g. `bg-negative`, `text-…`, `border-…`) | #ff7a8a | #c2354b | Pengeluaran (finance), error validasi, layanan down. Selalu disertai tanda −/ikon, bukan warna saja. |
| `focus-ring` | `focus-ring` (e.g. `bg-focus-ring`, `text-…`, `border-…`) | #bda2ff | #6d28d9 | Outline fokus keyboard 2px, offset 2px. |

Radius: `rounded-sm` 10px · `rounded-md` 16px · `rounded-lg` 24px · `rounded-pill` 999px. Shadows: `shadow-card`, `shadow-lift`.

---

## Brand book

Design system untuk **fariz.dev**, personal hub milik Nizar Alfarizi Akbar. Arah visualnya **Bento Grid Playful × Blackhole**: kartu-kartu modular dengan radius besar yang melayang di ruang hampa, dengan **ungu blackhole** sebagai warna identitas dan pendar amber dari accretion disk sebagai satu-satunya kehangatan. Tipografinya Space Grotesk + IBM Plex Mono. **Dark mode adalah tema utama**, dan light mode tersedia sebagai pendamping. Kesannya rapi seperti backend engineer, tapi santai seperti proyek "gabut".

## Apa yang dicakup sistem ini

fariz.dev bukan sekadar halaman profil. Hasil penelusuran (Oktober 2026) menemukan lima area yang memakai sistem yang sama:

| Area | Rute | Komponen utama |
|---|---|---|
| Profil / Home | `/` | BentoGrid, BentoCard, CopyChip, IconButton, NowPlaying |
| Dashboard (login) | `/` saat login | StatTile, NoteCard, ServiceTile |
| Developer Tools | `/tools`, 34 × `/tools/<id>` | PageHeader, SearchField, FilterTabs, ToolCard |
| Notes | `/notes`, `/notes/create`, `/notes/edit/:id` | PageHeader, SearchField, NoteCard, Tag |
| Finance | `/finance` | StatTile, FilterTabs |
| Temp Share | `/tools/temp-upload`, `/files/:code` | Button, EmptyState |
| Sistem | `/login`, 404 | EmptyState, Button |

Kategori tools beserta tile-nya: **Text & Data Processing** (8) → `tile-amber`, **Generators & Converters** (7) → `tile-orchid`, **Web Development** (6) → `tile-violet`, **Utilities & Calculators** (13) → `tile-teal`.

## Content fundamentals

- **Bahasa situs: Inggris**, kalimat pendek, nada santai dan jujur. Contoh: "Currently building *gabut* projects and crushing work tasks." Istilah lokal boleh dipakai dan diberi penekanan dengan `accent-text`.
- **Sentence case** untuk judul dan tombol ("Load sample", bukan "Load Sample"). Label kartu ditulis UPPERCASE dalam mono ("NOW PLAYING", "STACK").
- Angka selalu nyata dan terlihat: "34 tools", "59 notes". Jangan pakai "banyak" atau "berbagai".
- Pesan error dibuat ringan tapi informatif. Contoh: "This page vanished into the digital void". Setelah itu langsung beri jalan keluar.
- Emoji tidak dipakai di UI (judul, kartu, tombol). Satu emoji di paragraf bio masih boleh.

## Visual foundations

**Warna.** Tema utama adalah **dark**: kanvas `bg-canvas` hampir hitam dengan rona ungu (#09070F), dan kartu `bg-card` sedikit terangkat dengan `border-subtle`. Ungu `accent` (#9B6BFF di dark, #6D28D9 di light) adalah identitas, dipakai untuk tombol primer, satu tile aksen per layar, progress bar, dan border kartu saat hover. Teks di atas `accent` memakai `ink-on-accent` (gelap di dark, putih di light). Untuk *teks* ungu pakai `accent-text`. Empat tile (`tile-violet`, `tile-orchid`, `tile-amber`, `tile-teal`) memberi ritme pada grid; di dark mereka jadi versi gelap tersaturasi, di light jadi pastel, dan teks di atasnya selalu `ink`. `tile-void` adalah tile terdalam untuk Now Playing. `glow-amber` adalah garis cahaya accretion, hanya untuk dekorasi tipis dan tidak pernah untuk teks. `live` dan `negative` hanya untuk status dan uang, dan selalu ditemani tanda ▲/▼ atau label.

Gradien teks dan gradien pelangi per layanan dari desain lama **dihapus**. Penekanan sekarang memakai satu kata `accent-text` (lihat PageHeader), dan pembeda layanan memakai tile. Ungu tampil sebagai warna solid, tidak pernah dalam gradien biru-ungu.

**Tipografi.** `display` / `sans`: Space Grotesk. Karakternya geometris dengan sedikit quirk, cocok untuk nuansa playful. `mono`: IBM Plex Mono untuk label, tag, angka waktu, dan kode, sebagai tanda bahwa ini situs engineer. Nama di hero memakai `display-xl` (64/64, −3%). Judul kartu `title`, isi `body`.

**Grid & spasi.** Grid bento 4 kolom (2 kolom di bawah 720px), gap `space-4` (mobile `space-3`). Padding kartu `space-5`, hero `space-6`. Antar section `space-7`, margin halaman `space-8`. Lebar konten maksimum 1120px.

**Bentuk.** `radius-lg` (24px) untuk semua kartu, dan ini radius khas sistem. Chip, tag, tombol, dan progress bar memakai `radius-pill`. Cover album memakai `radius-sm`.

**Kedalaman & gerak.** Kartu diam memakai `shadow-card` yang hampir datar. Kartu yang bisa diklik naik 2px dengan `shadow-lift` saat hover. Di tema dark, `shadow-lift` berupa pendar ungu, seolah cahaya tertarik ke horizon. IconButton miring −6° dengan fill `tile-violet` dan border `accent`. Hanya itu gerak yang dipakai, durasi 150–180ms ease, tanpa animasi masuk halaman.

**Komposisi bento.** Home page wajib memakai span campuran: satu tile 2×2 untuk hero, tile 2×1 untuk Now Playing, lalu tile 1×1 untuk stack, tools, foto, dan kontak. Grid berisi tile seragam hanya untuk halaman daftar (Tools, Notes).

**Tema.** Tema pertama di `tokens.json` adalah `dark`, jadi tanpa `data-theme` halaman tampil gelap. Light mode diaktifkan lewat `data-theme="light"` (atau `prefers-color-scheme: light`): kanvas jadi lavender sangat muda (#F6F4FB), ungu jadi lebih dalam (#6D28D9) supaya kontras tetap terjaga, dan tile berubah jadi pastel.

## Iconography

- Ikon UI: garis 2px, `stroke-linecap: round`, viewBox 24, warna `currentColor`. Gaya ini sama dengan Lucide, yang juga dipakai situs saat ini.
- Ukuran 20px di tombol dan 22px di ToolCard.
- Logo pihak ketiga (GitHub, Spotify, Unsplash, Immich, dll.) diambil dari aset resmi atau Simple Icons, dan tidak digambar ulang.
- Sistem ini belum punya logo/monogram Fariz. Untuk sementara wordmark ditulis sebagai teks "Fariz" dengan Space Grotesk 700.

## Aksesibilitas

Semua pasangan teks/latar di atas lolos 4.5:1 di kedua tema, dan kontrol (`border-strong`, `focus-ring`) lolos 3:1. Fokus keyboard memakai outline 2px `focus-ring` dengan offset 2px. Warna status tidak pernah jadi satu-satunya penanda.

## Catatan untuk tim

- `/projects` ada di sitemap tapi menghasilkan 404. Pilihannya: buat halaman Projects (BentoGrid + BentoCard dengan `href`) atau hapus dari sitemap.
- `/notes` saat ini terbaca publik tanpa login. Pertimbangkan untuk menguncinya seperti `/finance`.


---

## Components

### BentoGrid

BentoGrid lays bento tiles on a 4-column grid that drops to 2 columns under 720px.

- Gap: `space-4` desktop, `space-3` mobile. Rows are at least 160px and grow with content.
- Children are `BentoCard`s (or any component built on it: `NowPlaying`, `ToolCard`, `NoteCard`, `StatTile`).
- Mix spans on purpose: one 2×2 hero, then 1×1 and 2×1 tiles. A grid of identical 1×1 tiles is a list; use it for Tools/Notes pages, not the home page.
- Consumer provides: page max-width (1120px suggested) and outer margin `space-8`.

### BentoCard

BentoCard is the single tile every surface in the system is built from.

- `tone`: `surface` (default, `bg-card` + `border-subtle`), the four tiles `amber` `teal` `orchid` `violet`, `accent` (blackhole purple, text `ink-on-accent`), `void` (deepest dark tile, text `ink-on-dark`).
- Radius is always `radius-lg`; padding `space-5` (`size="lg"`: `space-6`).
- With `href` it becomes a link and lifts 2px with `shadow-lift` on hover. Without `href` it never moves.
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
- Hover fills with `tile-amber` and tilts −6°, the system's one playful micro-motion.
- Consumer provides the icon (24px viewBox, 2px stroke, `currentColor`). Brand marks (GitHub, Spotify, Unsplash) come from the official brand assets or Simple Icons; never redraw them.

### CopyChip

CopyChip copies a value (the email) to the clipboard and confirms in place.

- Purple disc with a mail glyph; after copying it turns `live` green with a check and reads "Copied!" for 1.6s.
- The confirmation is announced (`aria-live`). Do not also show a toast.
- One per page: the primary contact on the home hero.

### Tag

Tag is a small mono pill for stack items, tool features and note labels.

- Neutral (`bg-sunken`) by default; `tone="accent"` (orchid) only for the "+N more" overflow tag.
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
- `badge` carries the live count ("34 tools", "59 notes") in mono on `tile-amber`.
- Centered on index pages, `start` on detail pages.

### SearchField

SearchField is the full-width pill search used on Tools and Notes.

- 52px tall, `border-strong`, icon at left; optional `shortcut` hint (`Ctrl ⇧ F`) at right.
- Filters as you type; no submit button.

### FilterTabs

FilterTabs switches categories and always shows the item count.

- Selected tab inverts to `ink` with a purple count; others are `bg-card` with a hairline.
- Use for the 4 tool categories, note labels, finance periods.

### ToolCard

ToolCard lists one developer tool on `/tools`.

- Icon square takes the category tile: Text & Data `amber`, Generators & Converters `orchid`, Web Development `violet`, Utilities & Calculators `teal`.
- Up to 3 feature tags, then an orchid "+N".
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

## Props reference

```ts
import type { ReactNode, ChangeEvent } from "react";
export type Tone = "surface" | "amber" | "teal" | "orchid" | "violet" | "accent" | "void";
/** 4-column bento grid (2 columns under 720px). Gap space-4 / space-3. */
export interface BentoGridProps { children: ReactNode; className?: string; style?: object }
/** One bento tile. Becomes a link with hover-lift when href is set. */
export interface BentoCardProps { tone?: Tone; colSpan?: 1 | 2 | 3 | 4; rowSpan?: 1 | 2; label?: string; title?: ReactNode; size?: "md" | "lg"; href?: string; target?: string; children?: ReactNode }
export interface ButtonProps { variant?: "primary" | "secondary" | "ghost"; size?: "md" | "sm"; icon?: ReactNode; href?: string; disabled?: boolean; onClick?: () => void; children: ReactNode }
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
export interface ToolCardProps { name: string; description: string; icon: ReactNode; tone?: "amber" | "teal" | "orchid" | "violet"; features?: string[]; maxFeatures?: number; href?: string; colSpan?: 1 | 2 }
export interface NoteCardProps { title: string; excerpt?: string; labels?: string[]; date: string; attachments?: number; pinned?: boolean; href?: string; colSpan?: 1 | 2 }
export interface StatTileProps { label: string; value: string; delta?: { direction: "up" | "down"; text: string }; caption?: string; tone?: Tone; colSpan?: 1 | 2 }
export interface ServiceTileProps { name: string; description: string; href: string; mark?: ReactNode; tone?: "amber" | "teal" | "orchid" | "violet"; status?: "up" | "down" | "unknown" }
export interface EmptyStateProps { code?: string; title: string; text?: string; actions?: ReactNode }

```
