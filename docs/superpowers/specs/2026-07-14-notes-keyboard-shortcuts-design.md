# Notes Page Keyboard Shortcuts — Design

- **Date:** 2026-07-14
- **Status:** Approved (ready for implementation plan)
- **Scope:** `src/pages/Notes.svelte`, `src/components/NoteCard.svelte`, new `src/components/NotesShortcutsModal.svelte`
- **No backend / router changes.** Static frontend only.

## Goal

Make the Notes list page fully navigable by keyboard so the user can move between
note cards and act on them without a trackpad or mouse — inspired by keyboard-only
GitHub usage. Add a shortcut helper modal so the bindings are discoverable. Use a
hybrid style: fast single-key bindings for list navigation, modifier bindings for
global/destructive actions (the latter already exist).

## Background / current state

Existing keyboard behavior on the notes page:

- `Ctrl/Cmd+Shift+F` → open filter modal (`src/pages/Notes.svelte`, the `$effect`
  keydown handler).
- `Ctrl/Cmd+Shift+S` → save note in create/edit (`src/components/NoteForm.svelte`).
- `Ctrl/Cmd+K` → command palette (`src/components/Navigation.svelte`).
- `Enter` on a note card (`role="button"`) → open detail (`NoteCard.svelte`).
- `Esc` → close modals (`src/components/Modal.svelte`).

The list view renders a **Pinned** section (`pinnedNotes`) then **other notes**
(`otherNotes`), each as a `NoteCard`. Cards are clickable; there is no keyboard
focus model today.

## Design

### 1. Shortcut bindings

**List navigation** — single-key, active only when not typing and no modal is open:

| Key | Action |
| --- | --- |
| `/` | Focus the search input |
| `j` / `↓` | Focus the next note card |
| `k` / `↑` | Focus the previous note card |
| `Enter` | Open detail of the focused note |
| `n` | New note (reuse `handleCreate`) |
| `?` | Open the shortcut helper modal |
| `Esc` | Contextual: close open modal → blur focused search → back to list |

**Per-focused-note actions** — single-key, list view, on the currently focused card:

| Key | Action |
| --- | --- |
| `p` | Toggle pin (reuse `handleTogglePin`) |
| `e` | Edit (reuse `handleEdit`) |
| `x` | Delete with confirmation (reuse `handleDelete`) |

**Global** — modifier bindings, already implemented, kept as-is:

| Key | Action |
| --- | --- |
| `Ctrl/Cmd+Shift+F` | Open filter modal |
| `Ctrl/Cmd+Shift+S` | Save note (create/edit) |
| `Ctrl/Cmd+K` | Command palette |

Out of scope (no single-key share binding) — keeps the set tight and avoids a
mental-model clash with save. Can be added later if requested.

### 2. Focus state & navigation model

New state in `Notes.svelte`:

```ts
let focusedNoteId = $state<string | null>(null);
```

- Navigation order = visual order: a derived `orderedNotes = [...pinnedNotes, ...otherNotes]`.
- `focusedIndex = $derived(focusedNoteId ? orderedNotes.findIndex(n => n.id === focusedNoteId) : -1)`.
- `moveFocus(delta)`:
  - If `focusedIndex < 0` and delta is +1 → focus index 0.
  - Otherwise clamp: `newIndex = Math.max(0, Math.min(focusedIndex + delta, orderedNotes.length - 1))`.
  - Set `focusedNoteId = orderedNotes[newIndex].id` (no-op if already at the clamp boundary).
- **Clamp, do not wrap** (predictable, matches the ends-of-list experience).
- On focus change, scroll the card into view: an `$effect` watching `focusedNoteId`
  queries `[data-note-card="<id>"]` and calls `el.scrollIntoView({ block: 'nearest' })`.
- After a successful delete, move focus to the card now occupying the same index
  (the one that shifts up), so the user can keep navigating without `j`-ing from top.

`NoteCard` gains an `isFocused` prop; when true it renders the focus ring:

```
ring-2 ring-warning-500 dark:ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900
```

The list wrappers in `Notes.svelte` get `data-note-card={note.id}` for the scroll query.

### 3. Guard (core of the hybrid style)

One `keydown` handler registered via `$effect` in `Notes.svelte` handles all
single-key shortcuts. Rules, evaluated in order:

1. `Esc` is always handled first. Each modal already self-closes on `Esc`
   (`src/components/Modal.svelte:58`), so the global handler must **not** duplicate
   that — it only acts when **no** modal is open: blur a focused search input, else
   if `viewMode === 'detail'` go back to list. If a modal is open, return without
   doing anything (the modal closes itself). Return.
2. Otherwise, **skip every other single-key** when either condition holds:
   - The event target is a typing element (`INPUT`, `TEXTAREA`, `SELECT`, or
     `isContentEditable`), or
   - Any modal is open (`isModalOpen`, `isDetailModalOpen`, `showFilterModal`,
     `isTagModalOpen`, `showDeletedNotesModal`, `showShortcutsModal`).
3. Map the remaining single keys (`/`, `j`, `k`, `ArrowDown`, `ArrowUp`, `Enter`,
   `n`, `?`, `p`, `e`, `x`) to their actions, each `event.preventDefault()` where
   appropriate (`/`, `?`).

Typing-target helper:

```ts
function isTyping(el: EventTarget | null): boolean {
  return el instanceof HTMLElement && (
    el.tagName === 'INPUT' ||
    el.tagName === 'TEXTAREA' ||
    el.tagName === 'SELECT' ||
    el.isContentEditable
  );
}
```

The existing `Ctrl/Cmd+Shift+F` `$effect` is untouched; it does not need the guard
(modifier bindings are intentionally always-on).

Mobile: irrelevant (no physical keyboard). The handler and guard are harmless on
touch devices, so no device gating is needed.

### 4. Shortcut helper modal

New component `src/components/NotesShortcutsModal.svelte`:

- Uses the existing `Modal.svelte` shell for consistent open/close, `Esc`, backdrop,
  and dark mode.
- Three grouped sections — **Navigation**, **Note actions**, **Global** — each a
  heading plus rows of `[label] [kbd pills]`.
- `kbd` pills reuse the existing style from `CommandPalette.svelte:471`
  (`px-2 py-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-300
  dark:border-gray-600 font-mono shadow-sm`) so no new visual language is introduced.

Wiring in `Notes.svelte`:

- `let showShortcutsModal = $state(false);`
- A small `?` icon button in the toolbar (next to Filter/Refresh) with
  `title="Keyboard shortcuts (?)"` for mouse discoverability.
- Key `?` opens it (guard-protected). `Esc` closes it via the guard's first rule.

### 5. Files touched

| File | Change |
| --- | --- |
| `src/pages/Notes.svelte` | Add `focusedNoteId` + `orderedNotes`/`focusedIndex` deriveds; `moveFocus`; single-key `$effect` handler; `showShortcutsModal` state + toolbar `?` button; `data-note-card` on card wrappers; pass `isFocused` to `NoteCard`; render `<NotesShortcutsModal>`. |
| `src/components/NoteCard.svelte` | Add `isFocused` prop; apply focus-ring class. |
| `src/components/NotesShortcutsModal.svelte` | New component. |

### 6. Edge cases

- **List changes** (filter, search, load more): `focusedNoteId` may reference a note
  no longer present → `focusedIndex` derives to `-1`; the next `j` focuses index 0.
  No crash, no stale ring.
- **Edit via `e`** opens a modal on desktop → subsequent single-keys are
  automatically suppressed by the modal-open guard.
- **Edit on mobile** redirects to `/notes/edit/:id` (existing `handleEdit`); no
  single-key interaction needed there.
- **Delete via `x`** routes through the existing `handleDelete`, which already
  `confirm()`s and updates the store; focus shifts to the replacement card (see §2).
- **`/` while a modal is open** is suppressed by the guard (avoids stealing focus
  into search behind a modal).

### 7. Verification

- `npm run check` passes for the three touched files (the repo has ~77 pre-existing
  unrelated `svelte-check` errors in other files; those are out of scope).
- Manual browser drive on the list page:
  - `j`/`k` and `↑`/`↓` move a visible focus ring; cards scroll into view at the edges.
  - `Enter` opens the focused note's detail.
  - `p`, `e`, `x` act on the focused note (pin toggles, edit opens, delete confirms).
  - `/` focuses search; `n` opens new-note; `?` opens the helper modal.
  - `Esc` closes modals / blurs search.
  - Guard: with focus inside the search box or the title field, single-keys do not
    fire; opening any modal suppresses single-keys (except `Esc`).
  - Helper modal shows all three groups with styled `kbd` pills in light and dark mode.

## Out of scope / future (Approach C)

- Number keys `1`–`9` to jump to the nth note.
- `g g` / `G` for top/bottom of list.
- Single-key bindings for `r` refresh, `t` trash modal.
- A share single-key.

These can be added in a follow-up without changes to the architecture established
here.
