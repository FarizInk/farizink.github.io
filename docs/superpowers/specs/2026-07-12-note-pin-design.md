# Note Pin — Design

**Date:** 2026-07-12
**Status:** Approved (pre-implementation)
**Scope:** Surface the backend's `is_pinned` field and `toggle-pin` endpoint in the Notes UI — a quick pin/unpin toggle, a dedicated "Pinned" list section, and pin badges.

## Context

The Soul backend added an `is_pinned` boolean to notes. `GET /api/notes` now sorts **pinned-first** (`ORDER BY is_pinned DESC, <sort_by> <sort_order>`) and every note response includes `is_pinned`. A dedicated `PATCH /api/notes/{id}/toggle-pin` endpoint (auth-required, empty body) flips pin state and returns the updated note. Notes are global (no user ownership).

This is similar to the existing `is_favorite`, with two differences: pin has a **dedicated toggle endpoint** (so it's a quick action, not an edit-form round-trip like favorite) and the **server enforces pinned-first order**.

## Goals

1. Let authed users pin/unpin a note quickly from the card and the detail modal.
2. Show pinned notes in a distinct "Pinned" section at the top of the list (driven by the API's pinned-first order).
3. Reflect the new pin state instantly (optimistic), with correct position, and reconcile/revert on API result.

## Non-Goals (YAGNI)

- No `is_pinned` in the create/edit form (`CreateNoteData`/`UpdateNoteData`). Pin is toggled via the dedicated endpoint only — the form is not used for it (unlike `is_favorite`, which the form sets).
- No `?is_pinned=true|false` filter UI or param wiring. The Pinned section is a client-side partition of the already pinned-first list, not a separate filtered fetch.
- No pin UI in the deleted-notes/trash view.
- No test framework (project has none); verification is `npm run check` + manual.

## Design

### 1. Types & API — `src/lib/notes.ts`

- Add `is_pinned: boolean;` to the `Note` interface.
- Add:
  ```ts
  export async function togglePin(id: string): Promise<NoteResponse> {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (!token) throw new Error('Authentication required');
    const response = await apiClient.patch(`/api/notes/${id}/toggle-pin`, {}, { timeout: 5000 });
    return response.data; // { success, data: note } — caller reads .data.is_pinned
  }
  ```
  Follows the `getNote` convention (return the body; the note is at `.data`). Note: the toggle response carries **only note attributes** (no `tags`/`files` rel), which is fine — we only consume `is_pinned` and `id` from it.

### 2. State update — `src/pages/Notes.svelte`

- `handleTogglePin(note: Note)`:
  1. Snapshot the current `$notes` array for rollback.
  2. **Optimistic:** compute `newPinned = !note.is_pinned`; update the matching note's `is_pinned` in the store; **stable-sort the array pinned-first** (`[...arr].sort((a, b) => Number(b.is_pinned) - Number(a.is_pinned))`) so pinned notes keep their within-group order (the cache was loaded in server order). Because the list partition (below) is derived from `$notes`, the card moves into/out of the Pinned section instantly.
  3. Refresh `selectedDetailNote` / `singleNote` if either is the toggled note (same pattern as the edit-stale fix) so an open detail modal reflects the new state immediately.
  4. Call `togglePin(note.id)`. On success: reconcile to `res.data.is_pinned` (in case the server value differs) and `toast.success(newPinned ? 'Note pinned' : 'Note unpinned')`. On error: restore the snapshotted array, re-apply the pinned-first sort, and `toast.error('Failed to toggle pin')`.
- List partition via `$derived`:
  - `pinnedNotes = $notes.filter(n => n.is_pinned)`
  - `otherNotes = $notes.filter(n => !n.is_pinned)`
  - Both re-derive reactively when `$notes` changes.

### 3. UI

- **`NoteCard.svelte`:**
  - Pin toggle button in the footer action row, authed-only (`hasAuthToken`), beside share/edit/delete. Uses Lucide `Pin` (when unpinned) / `PinOff` (when pinned). `onclick` calls `onTogglePin(note)` with `e.stopPropagation()` (so the card's open-detail handler doesn't fire). Tooltip "Pin"/"Unpin". Not rendered in deleted-note mode.
  - Pin badge: a small `Pin` icon next to the title when `note.is_pinned` (visible to all viewers, identifies pinned notes even if a future view drops the section).
  - New optional prop: `onTogglePin?: (note: Note) => void`.
- **`NoteDetailModal.svelte`:**
  - Pin toggle button in the desktop action row and the mobile action grid, authed-only, beside edit/share/delete. Uses `Pin`/`PinOff`, calls `onTogglePin(note)`. Reflects current state from `note.is_pinned`.
  - New optional prop: `onTogglePin?: (note: Note) => void`.
- **List "Pinned" section (`Notes.svelte`, list view):**
  - When `pinnedNotes.length > 0`: render a `📌 Pinned` header, then the pinned cards (each still a `NoteCard` with `onTogglePin`), then the `otherNotes` cards as today.
  - When there are no pinned notes: render `otherNotes` exactly as the list renders today (no header, no behavior change).
  - "Load More" remains at the bottom; pagination is unaffected (pinned notes arrive on page 1 given pinned-first ordering; pins are expected to be few).
  - Read-only viewers (no `hasAuthToken`): see the Pinned section + badges, but no toggle buttons.

### 4. Error handling & verification

- Toggle API failure → revert optimistic array change + re-sort, `toast.error`. The card returns to its prior position/state.
- Reconcile on success handles the rare case where the server's `is_pinned` differs from the optimistic flip.
- `npm run check` confirms types (new `is_pinned` field, `togglePin`, new props). Manual: pin from card → jumps to Pinned section at top; unpin → returns; pin from detail modal → modal + list update; read-only view shows badge/section without a button.

## Files touched

- `src/lib/notes.ts` — `is_pinned` on `Note`; `togglePin()`.
- `src/components/NoteCard.svelte` — pin button (footer) + pin badge (title); `onTogglePin` prop.
- `src/components/NoteDetailModal.svelte` — pin button (desktop + mobile); `onTogglePin` prop.
- `src/pages/Notes.svelte` — `handleTogglePin` (optimistic + stable pinned-first sort + revert), `$derived` partition, "Pinned" section, pass `onTogglePin` to card + modal.
