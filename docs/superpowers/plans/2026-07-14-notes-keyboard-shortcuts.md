# Notes Page Keyboard Shortcuts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Notes list page fully navigable by keyboard (focus ring + per-note actions) and add a discoverable shortcut helper modal.

**Architecture:** Add a `focusedNoteId` state + `orderedNotes`/`focusedIndex` deriveds to `Notes.svelte` that drive a visible focus ring on `NoteCard`. A single guarded `keydown` listener maps single-key shortcuts (`/`, `j`/`k`, `Enter`, `n`, `?`, `p`, `e`, `x`) to existing handlers (`handleCreate`, `handleShowDetail`, `handleTogglePin`, `handleEdit`, `handleDelete`); the guard disables them while typing in a field or while any modal is open. A new `NotesShortcutsModal.svelte` documents the bindings.

**Tech Stack:** Svelte 5 (runes), TypeScript, Tailwind CSS 4, `@lucide/svelte`, existing `Modal.svelte`.

## Global Constraints

- **No test runner exists in this repo.** There is no vitest/jest. Verification per task = `npm run check` (svelte-check) must introduce **no new errors** in the touched file(s). The repo has ~77 pre-existing unrelated `svelte-check` errors in other files (e.g. `TempUpload.svelte`); those are expected and out of scope.
- **Git is read-only** (`CLAUDE.md`: no git commands that modify the repo). **Do NOT `git add`/`git commit`.** There are no commit steps in this plan.
- **Svelte 5 runes** (`$state`, `$derived`, `$effect`, `$props`, `$bindable`). Match the patterns already in `Notes.svelte`.
- Keyboard handler pattern: register on `document` inside a `$effect`, return a cleanup that removes the listener (see the existing `Ctrl/Cmd+Shift+F` effect in `Notes.svelte`).
- Dark mode classes are mandatory on every new styled element (`dark:...`).

## File Structure

| File | Responsibility | Action |
| --- | --- | --- |
| `src/components/NoteCard.svelte` | Render one note card; now shows a focus ring when keyboard-focused. | Modify |
| `src/components/NotesShortcutsModal.svelte` | Read-only reference of all notes-page shortcuts, grouped. | Create |
| `src/pages/Notes.svelte` | Owns focus state, navigation logic, single-key handler, and helper-modal wiring. | Modify |

No backend, router, store, or library changes.

---

### Task 1: Add focus-ring support to NoteCard

**Files:**
- Modify: `src/components/NoteCard.svelte` (props block ~lines 25-47, root `<div>` class ~line 78-82)

**Interfaces:**
- Produces: `NoteCard` gains an optional `isFocused: boolean` prop (default `false`). When true the root div renders a Tailwind focus ring.

- [ ] **Step 1: Add the `isFocused` prop**

In `src/components/NoteCard.svelte`, replace the props block:

```svelte
  let {
    note,
    onEdit,
    onDelete,
    hasAuthToken,
    onShowDetail,
    isDeleted = false,
    onPermanentDelete,
    onRestore,
    onShare,
    onTogglePin
  } = $props<{
    note: Note;
    onEdit?: (note: Note) => void;
    onDelete?: (note: Note) => void;
    hasAuthToken?: boolean;
    onShowDetail?: (note: Note) => void;
    isDeleted?: boolean;
    onPermanentDelete?: (note: Note) => void;
    onRestore?: (note: Note) => void;
    onShare?: (note: Note) => void;
    onTogglePin?: (note: Note) => void;
  }>();
```

with:

```svelte
  let {
    note,
    onEdit,
    onDelete,
    hasAuthToken,
    onShowDetail,
    isDeleted = false,
    onPermanentDelete,
    onRestore,
    onShare,
    onTogglePin,
    isFocused = false
  } = $props<{
    note: Note;
    onEdit?: (note: Note) => void;
    onDelete?: (note: Note) => void;
    hasAuthToken?: boolean;
    onShowDetail?: (note: Note) => void;
    isDeleted?: boolean;
    onPermanentDelete?: (note: Note) => void;
    onRestore?: (note: Note) => void;
    onShare?: (note: Note) => void;
    onTogglePin?: (note: Note) => void;
    isFocused?: boolean;
  }>();
```

- [ ] **Step 2: Apply the focus ring on the root div**

Replace the root div's `class=` attribute (currently):

```svelte
  class="card card-hover tv-card !p-6 group relative overflow-hidden cursor-pointer {!note.is_public
    ? 'bg-gradient-to-br from-warning-50 to-warning-50 dark:from-primary-900/30 dark:to-primary-900/20 border-2 border-warning-300 dark:border-primary-500 shadow-lg'
    : ''}"
```

with:

```svelte
  class="card card-hover tv-card !p-6 group relative overflow-hidden cursor-pointer {!note.is_public
    ? 'bg-gradient-to-br from-warning-50 to-warning-50 dark:from-primary-900/30 dark:to-primary-900/20 border-2 border-warning-300 dark:border-primary-500 shadow-lg'
    : ''} {isFocused
    ? 'ring-2 ring-warning-500 dark:ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900'
    : ''}"
```

- [ ] **Step 3: Type-check**

Run: `npm run check`
Expected: no new errors mentioning `NoteCard.svelte`. (Pre-existing errors elsewhere are fine.)

---

### Task 2: Create the NotesShortcutsModal component

**Files:**
- Create: `src/components/NotesShortcutsModal.svelte`

**Interfaces:**
- Produces: `<NotesShortcutsModal bind:isOpen={boolean} />`. Wraps `Modal.svelte`; self-closes on `Esc`/backdrop via `Modal.svelte`.

- [ ] **Step 1: Create the component file**

Create `src/components/NotesShortcutsModal.svelte` with this exact content:

```svelte
<script lang="ts">
  import Modal from './Modal.svelte';
  import { Keyboard } from '@lucide/svelte';

  let { isOpen = $bindable(false) } = $props<{ isOpen?: boolean }>();
</script>

{#snippet Key(k)}
  <kbd
    class="px-2 py-1 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 font-mono text-xs shadow-sm min-w-[1.5rem] text-center inline-flex justify-center"
  >
    {k}
  </kbd>
{/snippet}

<Modal bind:isOpen maxW="max-w-lg">
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-xl bg-warning-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0"
      >
        <Keyboard class="w-5 h-5 text-warning-600 dark:text-primary-400" />
      </div>
      <div>
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Keyboard Shortcuts</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">Navigate notes without leaving the keyboard.</p>
      </div>
    </div>

    <!-- Navigation -->
    <div>
      <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">
        Navigation
      </h3>
      <div class="divide-y divide-gray-100 dark:divide-gray-700">
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Focus search</span>
          <div class="flex items-center gap-1">{@render Key('/')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Move between notes</span>
          <div class="flex items-center gap-1">{@render Key('j')}{@render Key('k')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Move between notes</span>
          <div class="flex items-center gap-1">{@render Key('↑')}{@render Key('↓')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Open note</span>
          <div class="flex items-center gap-1">{@render Key('Enter')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Close / back</span>
          <div class="flex items-center gap-1">{@render Key('Esc')}</div>
        </div>
      </div>
    </div>

    <!-- Note actions -->
    <div>
      <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">
        Note actions <span class="normal-case font-normal text-gray-400 dark:text-gray-500">(on focused note)</span>
      </h3>
      <div class="divide-y divide-gray-100 dark:divide-gray-700">
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">New note</span>
          <div class="flex items-center gap-1">{@render Key('n')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Pin / unpin</span>
          <div class="flex items-center gap-1">{@render Key('p')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Edit</span>
          <div class="flex items-center gap-1">{@render Key('e')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Delete</span>
          <div class="flex items-center gap-1">{@render Key('x')}</div>
        </div>
      </div>
    </div>

    <!-- Global -->
    <div>
      <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">
        Global
      </h3>
      <div class="divide-y divide-gray-100 dark:divide-gray-700">
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Filter notes</span>
          <div class="flex items-center gap-1">{@render Key('Ctrl')}{@render Key('Shift')}{@render Key('F')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Save note (create/edit)</span>
          <div class="flex items-center gap-1">{@render Key('Ctrl')}{@render Key('Shift')}{@render Key('S')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">Command palette</span>
          <div class="flex items-center gap-1">{@render Key('Ctrl')}{@render Key('K')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-700 dark:text-gray-300">This help</span>
          <div class="flex items-center gap-1">{@render Key('?')}</div>
        </div>
      </div>
    </div>
  </div>
</Modal>
```

- [ ] **Step 2: Type-check**

Run: `npm run check`
Expected: no new errors mentioning `NotesShortcutsModal.svelte`.

---

### Task 3: Wire keyboard navigation + handler + helper modal into Notes.svelte

**Files:**
- Modify: `src/pages/Notes.svelte` (imports, state, deriveds, `handleDelete`, two new `$effect`s, search input, toolbar button, both note-card loops, modal render)

**Interfaces:**
- Consumes: `NoteCard`'s new `isFocused` prop (Task 1); `NotesShortcutsModal` (Task 2).
- Produces: full keyboard navigation on the list view; helper modal opened by `?` and a toolbar button.

> All edits below are against the current `Notes.svelte`. Make them in the order listed. Each is a precise find/replace.

- [ ] **Step 1: Add the `Keyboard` icon import**

Find:

```
    BookOpen,
    Loader2
  } from '@lucide/svelte';
```

Replace with:

```
    BookOpen,
    Keyboard,
    Loader2
  } from '@lucide/svelte';
```

- [ ] **Step 2: Add the helper-modal import**

Find:

```
  import DeletedNotesModal from '../components/DeletedNotesModal.svelte';
```

Replace with:

```
  import DeletedNotesModal from '../components/DeletedNotesModal.svelte';
  import NotesShortcutsModal from '../components/NotesShortcutsModal.svelte';
```

- [ ] **Step 3: Add new state (focus id, helper modal, search input ref)**

Find the block:

```
  // Pinned-first partition of the loaded notes. The API already returns notes
  // pinned-first, so this just splits the cached array to drive a separate
  // "Pinned" list section.
  let pinnedNotes = $derived($notes.filter(n => n && n.is_pinned));
  let otherNotes = $derived($notes.filter(n => n && !n.is_pinned));
```

Replace with:

```
  // Keyboard navigation state: id of the focused note card, helper-modal flag,
  // and a ref to the search input (focused by the `/` shortcut).
  let focusedNoteId = $state<string | null>(null);
  let showShortcutsModal = $state(false);
  let searchInput = $state<HTMLInputElement | null>(null);

  // Pinned-first partition of the loaded notes. The API already returns notes
  // pinned-first, so this just splits the cached array to drive a separate
  // "Pinned" list section.
  let pinnedNotes = $derived($notes.filter(n => n && n.is_pinned));
  let otherNotes = $derived($notes.filter(n => n && !n.is_pinned));

  // Combined visual order for keyboard navigation (pinned first, then others)
  let orderedNotes = $derived([...pinnedNotes, ...otherNotes]);
  let focusedIndex = $derived(
    focusedNoteId ? orderedNotes.findIndex(n => n.id === focusedNoteId) : -1
  );
```

- [ ] **Step 4: Add the `moveFocus` helper**

Find the `handleShowDetail` function start:

```
  function handleShowDetail(note: Note) {
```

Insert **immediately before** it:

```
  // Move keyboard focus by delta (+1 = next/down, -1 = previous/up), clamped to
  // the list bounds. With no current focus, only "next" starts at the first card.
  function moveFocus(delta: number) {
    if (orderedNotes.length === 0) return;
    if (focusedIndex < 0) {
      if (delta > 0) focusedNoteId = orderedNotes[0].id;
      return;
    }
    const next = Math.max(0, Math.min(focusedIndex + delta, orderedNotes.length - 1));
    focusedNoteId = orderedNotes[next].id;
  }

```

- [ ] **Step 5: Shift focus to the replacement card after delete**

Find the existing `handleDelete`:

```
  async function handleDelete(note: Note) {
    if (deletingNoteId === note.id) return;
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    deletingNoteId = note.id;
    try {
      await deleteNote(note.id);
      toast.success('Note deleted successfully');
      notesStore.removeNote(note.id);
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to delete note');
      } else {
        toast.error('An unexpected error occurred');
      }
      console.error('Delete note error:', error);
    } finally {
      deletingNoteId = null;
    }
  }
```

Replace with (adds focus capture before removal + focus shift after):

```
  async function handleDelete(note: Note) {
    if (deletingNoteId === note.id) return;
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    const replaceIndex = focusedIndex; // captured before the note leaves the list
    deletingNoteId = note.id;
    try {
      await deleteNote(note.id);
      toast.success('Note deleted successfully');
      notesStore.removeNote(note.id);
      // Move focus to the card now occupying the same position (the one that
      // shifts up), so keyboard users keep their place in the list.
      const replacement = orderedNotes[replaceIndex] ?? orderedNotes[replaceIndex - 1] ?? null;
      focusedNoteId = replacement ? replacement.id : null;
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Failed to delete note');
      } else {
        toast.error('An unexpected error occurred');
      }
      console.error('Delete note error:', error);
    } finally {
      deletingNoteId = null;
    }
  }
```

- [ ] **Step 6: Add the single-key handler + scroll-into-view `$effect`s**

Find the existing filter-shortcut effect (the one we changed earlier):

```
  // Keyboard shortcut for Ctrl+Shift+F / Command+Shift+F to open filter modal
  $effect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        openFilterModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>
```

Replace with (keeps the filter effect, adds scroll effect + single-key effect before `</script>`):

```
  // Keyboard shortcut for Ctrl+Shift+F / Command+Shift+F to open filter modal
  $effect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        openFilterModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  // Keep the focused card scrolled into view while navigating with j/k.
  $effect(() => {
    if (!focusedNoteId) return;
    const el = document.querySelector(`[data-note-card="${CSS.escape(focusedNoteId)}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  });

  // Single-key shortcuts for list navigation and per-note actions.
  // Guarded: inactive while typing in a field/editor or while any modal is open.
  // Esc is handled first; modals self-close on Esc (Modal.svelte), so here we
  // only act on Esc when NO modal is open.
  $effect(() => {
    const anyModalOpen = () =>
      isModalOpen ||
      isDetailModalOpen ||
      showFilterModal ||
      isTagModalOpen ||
      showDeletedNotesModal ||
      showShortcutsModal;

    const isTyping = (el: EventTarget | null): boolean =>
      el instanceof HTMLElement &&
      (el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT' ||
        el.isContentEditable);

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      // Esc: defer modal-closing to Modal.svelte; only act when no modal is open.
      if (key === 'Escape') {
        if (anyModalOpen()) return;
        const active = document.activeElement;
        if (active instanceof HTMLElement && active.tagName === 'INPUT') {
          active.blur();
        } else if (viewMode === 'detail') {
          backToList();
        }
        return;
      }

      // Skip all other single-keys while typing or while a modal is open.
      if (isTyping(event.target) || anyModalOpen()) return;

      const focusedNote = focusedIndex >= 0 ? orderedNotes[focusedIndex] ?? null : null;

      switch (key) {
        case '/':
          if (viewMode === 'list') {
            event.preventDefault();
            searchInput?.focus();
          }
          break;
        case 'j':
        case 'ArrowDown':
          if (viewMode === 'list') {
            event.preventDefault();
            moveFocus(1);
          }
          break;
        case 'k':
        case 'ArrowUp':
          if (viewMode === 'list') {
            event.preventDefault();
            moveFocus(-1);
          }
          break;
        case 'Enter':
          if (viewMode === 'list' && focusedNote) {
            event.preventDefault();
            handleShowDetail(focusedNote);
          }
          break;
        case 'n':
          event.preventDefault();
          handleCreate();
          break;
        case '?':
          event.preventDefault();
          showShortcutsModal = true;
          break;
        case 'p':
          if (viewMode === 'list' && focusedNote) {
            event.preventDefault();
            handleTogglePin(focusedNote);
          }
          break;
        case 'e':
          if (viewMode === 'list' && focusedNote) {
            event.preventDefault();
            handleEdit(focusedNote);
          }
          break;
        case 'x':
          if (viewMode === 'list' && focusedNote) {
            event.preventDefault();
            handleDelete(focusedNote);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });
</script>
```

- [ ] **Step 7: Attach the search-input ref**

Find the search input (inside the search bar, has `bind:value={searchQuery}`):

```
          <input
            type="text"
            bind:value={searchQuery}
            onkeydown={e => {
```

Replace with (add `bind:this`):

```
          <input
            type="text"
            bind:value={searchQuery}
            bind:this={searchInput}
            onkeydown={e => {
```

- [ ] **Step 8: Add the helper-modal toolbar button**

Find the Refresh button block:

```
          <!-- Refresh -->
          <button
            onclick={handleRefresh}
            disabled={$isLoadingNotes || isLoadingMore}
            class="btn-icon w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-warning-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh"
          >
            <RefreshCw
              class={`w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-warning-500 dark:hover:text-primary-400 transition-colors ${$isLoadingNotes ? 'animate-spin' : ''}`}
            />
          </button>
```

Replace with (Refresh button + new Keyboard-shortcuts button after it):

```
          <!-- Refresh -->
          <button
            onclick={handleRefresh}
            disabled={$isLoadingNotes || isLoadingMore}
            class="btn-icon w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-warning-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh"
          >
            <RefreshCw
              class={`w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-warning-500 dark:hover:text-primary-400 transition-colors ${$isLoadingNotes ? 'animate-spin' : ''}`}
            />
          </button>

          <!-- Keyboard shortcuts -->
          <button
            onclick={() => (showShortcutsModal = true)}
            class="btn-icon w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-warning-50 dark:hover:bg-gray-700"
            title="Keyboard shortcuts (?)"
            aria-label="Keyboard shortcuts"
          >
            <Keyboard class="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-warning-500 dark:hover:text-primary-400 transition-colors" />
          </button>
```

- [ ] **Step 9: Mark pinned cards with `data-note-card` + pass `isFocused`**

Find the pinned-notes loop:

```
            <div class="flex flex-col gap-4">
              {#each pinnedNotes as note, index (note.id)}
                <div style="animation-delay: {index * 30}ms">
                  <NoteCard
                    {note}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    {hasAuthToken}
                    onShowDetail={handleShowDetail}
                    onShare={handleShare}
                    onTogglePin={handleTogglePin}
                  />
                </div>
              {/each}
            </div>
```

Replace with:

```
            <div class="flex flex-col gap-4">
              {#each pinnedNotes as note, index (note.id)}
                <div data-note-card={note.id} style="animation-delay: {index * 30}ms">
                  <NoteCard
                    {note}
                    isFocused={note.id === focusedNoteId}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    {hasAuthToken}
                    onShowDetail={handleShowDetail}
                    onShare={handleShare}
                    onTogglePin={handleTogglePin}
                  />
                </div>
              {/each}
            </div>
```

- [ ] **Step 10: Mark other cards with `data-note-card` + pass `isFocused`**

Find the other-notes loop:

```
        <!-- Other Notes -->
        <div class="flex flex-col gap-4">
          {#each otherNotes as note, index (note.id)}
            <div style="animation-delay: {index * 30}ms">
              <NoteCard
                {note}
                onEdit={handleEdit}
                onDelete={handleDelete}
                {hasAuthToken}
                onShowDetail={handleShowDetail}
                onShare={handleShare}
                onTogglePin={handleTogglePin}
              />
            </div>
          {/each}
        </div>
```

Replace with:

```
        <!-- Other Notes -->
        <div class="flex flex-col gap-4">
          {#each otherNotes as note, index (note.id)}
            <div data-note-card={note.id} style="animation-delay: {index * 30}ms">
              <NoteCard
                {note}
                isFocused={note.id === focusedNoteId}
                onEdit={handleEdit}
                onDelete={handleDelete}
                {hasAuthToken}
                onShowDetail={handleShowDetail}
                onShare={handleShare}
                onTogglePin={handleTogglePin}
              />
            </div>
          {/each}
        </div>
```

- [ ] **Step 11: Render the helper modal**

Find the DeletedNotesModal at the bottom of the file:

```
<!-- Deleted Notes Modal -->
<DeletedNotesModal bind:isOpen={showDeletedNotesModal} onClose={handleDeletedNotesModalClose} />
```

Replace with:

```
<!-- Deleted Notes Modal -->
<DeletedNotesModal bind:isOpen={showDeletedNotesModal} onClose={handleDeletedNotesModalClose} />

<!-- Keyboard Shortcuts Helper Modal -->
<NotesShortcutsModal bind:isOpen={showShortcutsModal} />
```

- [ ] **Step 12: Type-check**

Run: `npm run check`
Expected: no new errors mentioning `Notes.svelte` beyond the pre-existing ones (e.g. `'singleNote' is possibly 'null'` around the detail-view buttons). If a new error appears at one of the edited lines, fix it before proceeding.

---

### Task 4: Manual browser verification

**Files:** none (verification only).

The repo has no automated tests for UI behavior, so verify by driving the running app.

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
(If you hit stale "does not provide an export named 'X'" errors, run `./clean-js.sh` first, then retry.)

- [ ] **Step 2: Verify list-view navigation**

On `/notes` (logged in, with a few notes), confirm:
- `j` and `↓` move a purple/amber focus ring down the list; `k` and `↑` move it up; the ring clamps at the top and bottom (no wrap).
- Near the list edges, the focused card scrolls into view.
- `Enter` opens the focused note's detail modal (desktop).

- [ ] **Step 3: Verify per-note actions on the focused card**

With a card focused:
- `p` toggles its pin (card moves between Pinned / Other, toast shows).
- `e` opens the edit modal (desktop).
- `x` shows the delete confirm; on confirm the note is removed and focus moves to the replacement card.

- [ ] **Step 4: Verify global single-keys + helper modal**

- `/` puts the cursor in the search box.
- `n` opens the new-note modal.
- `?` opens the Keyboard Shortcuts modal; the toolbar `?` button (next to Refresh) opens it too.
- The modal shows three groups (Navigation / Note actions / Global) with styled `kbd` pills, readable in light and dark mode.
- `Esc` closes the helper modal, blurs the search box when focused, and returns from the detail (`?id=`) view to the list.

- [ ] **Step 5: Verify the guard**

- While the cursor is in the search box or the new-note title field, single-keys (`j`, `n`, `p`, …) must NOT fire. `Ctrl/Cmd+Shift+S` still saves inside the editor; `Ctrl/Cmd+Shift+F` still opens the filter modal.
- While any modal is open, single-keys (except `Esc`) must NOT fire.
- Existing browser Find (`Ctrl/Cmd+F`) works again (we moved the filter shortcut to `Ctrl/Cmd+Shift+F`).

---

## Self-Review (completed during planning)

- **Spec coverage:** Every spec section maps to a task — bindings (Task 3 step 6), focus model + scroll + post-delete shift (steps 3-5), guard (step 6), helper modal (Task 2 + step 8 + step 11), NoteCard ring (Task 1), edge cases (verified in Task 4), verification (Task 4). No gaps.
- **Placeholder scan:** None — every step contains exact code or exact commands.
- **Type consistency:** `focusedNoteId: string | null`, `orderedNotes`/`focusedIndex` deriveds, `moveFocus(delta: number)`, `NoteCard`'s `isFocused?: boolean`, `NotesShortcutsModal`'s `isOpen?: boolean` — all referenced consistently across tasks.
- **Known runtime note:** arrow keys (`↑`/`↓`) move focus and call `preventDefault`, so they no longer scroll the page (intentional, matches the approved spec). If that proves annoying, drop the `ArrowUp`/`ArrowDown` cases in Task 3 step 6 — a one-line change.
