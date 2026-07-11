# Note Summarize Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the Soul backend's async link-summarize lifecycle (`pending` / `idle` / `done`) into the Notes detail modal — polling, status-driven UI states, preserved-whitespace rendering, and an idle-only manual retry.

**Architecture:** A new runes-based factory `createSummarizePoller` (`src/lib/summarize.svelte.ts`, mirroring the existing `createWebSocket` pattern) owns summary/status reactive state + polling + retry. `NoteDetailModal` instantiates it, drives it with a lifecycle `$effect`, and renders the four status states. The `Note` type gains an optional `summarize_status` field and the sync `regenerateSummarize` timeout is raised to 600s.

**Tech Stack:** Svelte 5 (runes: `$state`, `$effect`, `$props`), TypeScript, Tailwind CSS 4, Axios, svelte-sonner.

## Global Constraints

- **No test framework.** The project has no vitest/jest and the spec scopes tests out. Each task verifies with `npm run check` (svelte-check — the project's type gate) and Task 3 adds manual browser verification. Do not add a test framework.
- **Read-only git.** CLAUDE.md forbids git mutations. **Do not run `git add` / `git commit` / `git push`.** The repo owner commits manually. Steps that would normally commit instead just say "done — ready for the owner to commit."
- **Runes in `.ts` need the `.svelte.ts` extension** to be processed by the Svelte compiler (precedent: `src/lib/websocket.svelte.ts`). The new module uses this extension.
- **`summarize_status` is only on the show endpoint** (`GET /api/notes/{id}`), never the list. Polling must use `getNote(id)`. Notes coming from the list have `summarize_status === undefined`.
- **Design system:** light-mode accent is `warning` (amber), dark-mode is `primary` (purple). Reuse existing classes (`btn`, `btn-primary`, `btn-sm`, `quick-btn`, `Loader2 animate-spin`, `Sparkles`). Match surrounding markup.
- Pre-existing `npm run check` reports ~82 unrelated errors across 17 files (e.g. `TempUpload.svelte`). **Do not try to fix those.** A task passes if it introduces **no new** errors in the files it touches.

---

## File Structure

- **Modify `src/lib/notes.ts`** — add `SummarizeStatus` type, add `summarize_status?` to `Note`, raise `regenerateSummarize` timeout. (Responsibility: API types + the sync regenerate call.)
- **Create `src/lib/summarize.svelte.ts`** — `createSummarizePoller` factory: reactive state + polling lifecycle + retry. (Responsibility: summarize state machine, decoupled from any component.)
- **Modify `src/components/NoteDetailModal.svelte`** — instantiate the poller, drive it via `$effect`, rework the "AI Summary" block to render the four states with `whitespace-pre-wrap`, remove the always-on Regenerate button (idle-only Retry instead). (Responsibility: presentation + lifecycle wiring.)

---

## Task 1: Add `SummarizeStatus` type, `summarize_status` field, fix regenerate timeout

**Files:**
- Modify: `src/lib/notes.ts`

**Interfaces:**
- Produces: `SummarizeStatus` (exported type), `Note.summarize_status?: SummarizeStatus | null` (consumed by Task 2 & 3). `regenerateSummarize()` now waits up to 600s (consumed by Task 2's `retry()`).

- [ ] **Step 1: Add `SummarizeStatus` type and `summarize_status` field**

In `src/lib/notes.ts`, find the `Note` interface (around line 33) and replace:

```ts
export interface Note {
  id: string;
  name: string | null;
  link: string | null;
  link_summarize: string | null;
  description: string | null;
```

with:

```ts
/**
 * Status of the async link-summarize job (show endpoint only).
 * - 'pending' — job queued/running
 * - 'idle'    — has link, no summary, no active job (failed after retries / waiting)
 * - 'done'    — summary available in link_summarize
 */
export type SummarizeStatus = 'pending' | 'idle' | 'done';

export interface Note {
  id: string;
  name: string | null;
  link: string | null;
  link_summarize: string | null;
  summarize_status?: SummarizeStatus | null;
  description: string | null;
```

- [ ] **Step 2: Raise the `regenerateSummarize` timeout**

In `src/lib/notes.ts`, find `regenerateSummarize` (around line 715-730) and replace:

```ts
  const response = await apiClient.post(
    `/api/notes/${id}/regenerate-summarize`,
    {},
    {
      timeout: 30000 // Longer timeout for AI summarization
    }
  );
```

with:

```ts
  const response = await apiClient.post(
    `/api/notes/${id}/regenerate-summarize`,
    {},
    {
      // Sync endpoint: fetches the link + summarizes in-request. Can take up
      // to ~10 min (see docs/superpowers/specs/2026-07-11-note-summarize-design.md).
      timeout: 600000
    }
  );
```

- [ ] **Step 3: Verify type-check introduces no new errors**

Run: `npm run check 2>&1 | grep "notes.ts" || echo "✓ no errors in notes.ts"`
Expected: `✓ no errors in notes.ts` (the pre-existing ~82 errors are in other files; `notes.ts` should be clean).

- [ ] **Step 4: Done — ready for the owner to commit**

---

## Task 2: Create `createSummarizePoller` factory

**Files:**
- Create: `src/lib/summarize.svelte.ts`

**Interfaces:**
- Consumes (from Task 1): `getNote(id): Promise<{ data: Note }>` and `regenerateSummarize(id): Promise<{ data: Note }>` from `./notes`; `Note`, `SummarizeStatus` from `./notes`; `toast` from `svelte-sonner`.
- Produces: `createSummarizePoller(opts?)` returning a `SummarizePoller` with readonly getters `status`, `summary`, `isRegenerating` and methods `activate(note)`, `stop()`, `retry()` (consumed by Task 3).

- [ ] **Step 1: Create the module file**

Create `src/lib/summarize.svelte.ts` with this exact content:

```ts
import { getNote, regenerateSummarize, type Note, type SummarizeStatus } from './notes';
import { toast } from 'svelte-sonner';

export interface SummarizePoller {
  readonly status: SummarizeStatus | null; // null = unknown (not yet fetched)
  readonly summary: string | null;
  readonly isRegenerating: boolean;
  activate(note: Note): Promise<void>;
  stop(): void;
  retry(): Promise<void>;
}

const DEFAULT_INTERVAL_MS = 7000;
const DEFAULT_MAX_DURATION_MS = 240_000; // 4 minutes

/**
 * Reactive poller for a note's async link-summarize job.
 *
 * Mirrors the createWebSocket pattern: holds internal $state and returns
 * readonly getters + control functions. Call activate(note) when the detail
 * modal opens for a linked note; call stop() when it closes.
 */
export function createSummarizePoller(opts?: {
  intervalMs?: number;
  maxDurationMs?: number;
}): SummarizePoller {
  const intervalMs = opts?.intervalMs ?? DEFAULT_INTERVAL_MS;
  const maxDurationMs = opts?.maxDurationMs ?? DEFAULT_MAX_DURATION_MS;

  let status = $state<SummarizeStatus | null>(null);
  let summary = $state<string | null>(null);
  let isRegenerating = $state(false);

  let activeNoteId: string | null = null;
  let intervalTimer: ReturnType<typeof setInterval> | null = null;
  let maxTimer: ReturnType<typeof setTimeout> | null = null;

  function clearTimers(): void {
    if (intervalTimer !== null) {
      clearInterval(intervalTimer);
      intervalTimer = null;
    }
    if (maxTimer !== null) {
      clearTimeout(maxTimer);
      maxTimer = null;
    }
  }

  async function fetchOnce(noteId: string): Promise<void> {
    try {
      const res = await getNote(noteId);
      status = res.data.summarize_status ?? null;
      summary = res.data.link_summarize ?? null;
    } catch (err) {
      // Swallow: keep last-known state; the next interval retries.
      console.error('summarize poll fetch failed:', err);
    }
  }

  return {
    get status(): SummarizeStatus | null {
      return status;
    },
    get summary(): string | null {
      return summary;
    },
    get isRegenerating(): boolean {
      return isRegenerating;
    },

    async activate(note: Note): Promise<void> {
      // Idempotent: already polling this same note.
      if (activeNoteId === note.id && intervalTimer !== null) return;

      clearTimers();
      activeNoteId = note.id;
      const id = note.id;

      // Seed from the passed note to avoid a blank flash (list-sourced notes
      // have no summarize_status, so guess 'done' when a summary already exists).
      summary = note.link_summarize ?? null;
      status = note.summarize_status ?? (note.link_summarize ? 'done' : null);

      // Authoritative state from the show endpoint.
      await fetchOnce(id);

      // We may have been stop()ped or superseded while fetching.
      if (activeNoteId !== id) return;

      if (status === 'pending') {
        // Hard stop after maxDurationMs regardless of status.
        maxTimer = setTimeout(clearTimers, maxDurationMs);
        intervalTimer = setInterval(async () => {
          if (activeNoteId !== id) {
            clearTimers();
            return;
          }
          await fetchOnce(id);
          if (status !== 'pending') {
            clearTimers();
          }
        }, intervalMs);
      }
    },

    stop(): void {
      clearTimers();
      activeNoteId = null;
    },

    async retry(): Promise<void> {
      if (!activeNoteId) return;
      isRegenerating = true;
      try {
        const res = await regenerateSummarize(activeNoteId);
        const newSummary = res.data?.link_summarize ?? null;
        if (newSummary) {
          summary = newSummary;
          status = res.data?.summarize_status ?? 'done';
        } else {
          // Backend returns 200 with old/null when it couldn't summarize.
          toast.error("Couldn't generate summary, try again later");
        }
      } catch (err) {
        console.error('regenerate summarize failed:', err);
        const msg = err instanceof Error ? err.message : 'Failed to regenerate summary';
        toast.error(msg);
      } finally {
        isRegenerating = false;
      }
    }
  };
}
```

- [ ] **Step 2: Verify type-check introduces no new errors**

Run: `npm run check 2>&1 | grep "summarize.svelte.ts" || echo "✓ no errors in summarize.svelte.ts"`
Expected: `✓ no errors in summarize.svelte.ts`.

- [ ] **Step 3: Done — ready for the owner to commit**

---

## Task 3: Wire the poller into `NoteDetailModal` and rework the AI Summary section

**Files:**
- Modify: `src/components/NoteDetailModal.svelte`

**Interfaces:**
- Consumes (from Task 2): `createSummarizePoller()` → `{ status, summary, isRegenerating, activate(note), stop(), retry() }`.

This task has four edits in one file. Apply them in order.

- [ ] **Step 1: Update imports**

In `src/components/NoteDetailModal.svelte`, replace:

```ts
  import { formatDate, getFileUrl, regenerateSummarize } from '../lib/notes';
  import { handleImageError, formatFileSize } from '../lib/uiUtils';
```

with:

```ts
  import { formatDate, getFileUrl } from '../lib/notes';
  import { createSummarizePoller } from '../lib/summarize.svelte';
  import { onDestroy } from 'svelte';
  import { handleImageError, formatFileSize } from '../lib/uiUtils';
```

- [ ] **Step 2: Add `RefreshCw` to the Lucide icon imports**

In the same file, find the icon import block and replace:

```ts
    Loader2,
    Sparkles
  } from '@lucide/svelte';
```

with:

```ts
    Loader2,
    RefreshCw,
    Sparkles
  } from '@lucide/svelte';
```

- [ ] **Step 3: Replace the local regenerate state/handler with the poller + lifecycle effect**

Find this block (the `isRegenerating` state, `isSummaryFull`, and `handleRegenerateSummarize` function):

```ts
  // Loading state for regenerate summarize
  let isRegenerating = $state(false);

  // Toggle state for summary view (short/full)
  let isSummaryFull = $state(false);

  async function handleRegenerateSummarize() {
    if (!note || !note.link) return;

    isRegenerating = true;
    try {
      const response = await regenerateSummarize(note.id);
      // Update the note with new link_summarize
      if (response.data && response.data.link_summarize) {
        note.link_summarize = response.data.link_summarize;
      }
      toast.success('Link summary regenerated successfully!');
    } catch (error) {
      console.error('Regenerate summarize error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to regenerate summary';
      toast.error(errorMessage);
    } finally {
      isRegenerating = false;
    }
  }
```

Replace it with:

```ts
  // Summarize poller: owns status/summary reactive state, polling, and retry.
  const poller = createSummarizePoller();

  // Toggle state for summary view (short/full)
  let isSummaryFull = $state(false);

  // Drive the poller from the modal lifecycle: activate when a linked note is
  // shown, stop when the modal closes or the note has no link. Reads only
  // shouldShowModal / note / note.link so poll updates don't retrigger it.
  $effect(() => {
    if (shouldShowModal && note && note.link) {
      isSummaryFull = false;
      void poller.activate(note);
    } else {
      poller.stop();
    }
  });

  onDestroy(() => {
    poller.stop();
  });
```

- [ ] **Step 4: Rework the AI Summary template to be status-driven**

Find the existing "Link Summarize Section" block (inside `{#if note.link}`, around lines 373-420):

```svelte
          <!-- Link Summarize Section -->
          <div class="mt-3 pt-3 border-t border-warning-200 dark:border-primary-700">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm font-semibold text-warning-900 dark:text-primary-100 flex items-center gap-1.5">
                <Sparkles class="w-4 h-4" />
                AI Summary
              </p>
              <div class="flex items-center gap-2">
                {#if note.link_summarize && (note.link_summarize.length > 150)}
                  <button
                    onclick={() => (isSummaryFull = !isSummaryFull)}
                      class="quick-btn text-xs text-warning-700 dark:text-primary-300 hover:text-warning-800 dark:hover:text-primary-200 font-medium transition-colors"
                    >
                      {isSummaryFull ? 'Show less' : 'Show more'}
                    </button>
                {/if}
                {#if hasAuthToken}
                  <button
                    onclick={handleRegenerateSummarize}
                    disabled={isRegenerating}
                      class="btn btn-primary btn-sm flex items-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Regenerate AI summary"
                  >
                    {#if isRegenerating}
                      <Loader2 class="w-3.5 h-3.5 animate-spin" />
                      <span>Regenerating...</span>
                    {:else}
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      <span>Regenerate</span>
                    {/if}
                  </button>
                {/if}
              </div>
            </div>
            {#if note.link_summarize}
              <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {isSummaryFull || note.link_summarize.length <= 150
                  ? note.link_summarize
                  : note.link_summarize.slice(0, 150) + '...'}
              </p>
            {:else}
              <p class="text-sm text-gray-500 dark:text-gray-400 italic">
                No summary available yet.{#if hasAuthToken} Click regenerate to generate AI summary.{/if}
              </p>
            {/if}
          </div>
```

Replace it with:

```svelte
          <!-- Link Summarize Section -->
          <div class="mt-3 pt-3 border-t border-warning-200 dark:border-primary-700">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm font-semibold text-warning-900 dark:text-primary-100 flex items-center gap-1.5">
                <Sparkles class="w-4 h-4" />
                AI Summary
              </p>
              {#if poller.status === 'idle' && !poller.summary && hasAuthToken}
                <button
                  onclick={() => poller.retry()}
                  disabled={poller.isRegenerating}
                  class="btn btn-primary btn-sm flex items-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Regenerate AI summary (may take a few minutes)"
                >
                  {#if poller.isRegenerating}
                    <Loader2 class="w-3.5 h-3.5 animate-spin" />
                    <span>Regenerating...</span>
                  {:else}
                    <RefreshCw class="w-3.5 h-3.5" />
                    <span>Retry</span>
                  {/if}
                </button>
              {/if}
            </div>

            {#if poller.status === 'pending' || (!poller.summary && poller.status === null)}
              <!-- pending, or first fetch in flight -->
              <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Loader2 class="w-4 h-4 animate-spin text-warning-600 dark:text-primary-400" />
                <span>Summarizing…</span>
              </div>
            {:else if poller.summary}
              <!-- done (or have a summary) — preserve bullets/newlines -->
              <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                {isSummaryFull || poller.summary.length <= 150
                  ? poller.summary
                  : poller.summary.slice(0, 150) + '...'}
              </p>
              {#if poller.summary.length > 150}
                <button
                  onclick={() => (isSummaryFull = !isSummaryFull)}
                  class="quick-btn text-xs text-warning-700 dark:text-primary-300 hover:text-warning-800 dark:hover:text-primary-200 font-medium transition-colors mt-1"
                >
                  {isSummaryFull ? 'Show less' : 'Show more'}
                </button>
              {/if}
            {:else if poller.status === 'idle'}
              <!-- not ready; retry button (if any) is in the header above -->
              <p class="text-sm text-gray-500 dark:text-gray-400 italic">
                Summary not ready yet. It will retry automatically.
              </p>
            {:else}
              <!-- done but empty -->
              <p class="text-sm text-gray-500 dark:text-gray-400 italic">
                No summary available.
              </p>
            {/if}
          </div>
```

- [ ] **Step 5: Verify type-check introduces no new errors**

Run: `npm run check 2>&1 | grep "NoteDetailModal.svelte" || echo "✓ no errors in NoteDetailModal.svelte"`
Expected: `✓ no errors in NoteDetailModal.svelte`.

- [ ] **Step 6: Manual verification in the browser**

Run the dev server: `npm run dev` (open `http://localhost:3000` or `http://mayo:3000`). Log in if needed. For each case, open a note **that has a `link`** and observe the AI Summary section:

1. **pending → done:** Create/edit a note with a fresh link (one not summarized before). Open it. Expect "Summarizing…" with a spinner, then the summary text appearing automatically (within the polling window). Confirm bullets (`- `) and line breaks render (pre-wrap).
2. **already summarized (no flash):** Re-open a note whose summary already exists. Expect the summary to render immediately (seeded), with no spinner flash before it.
3. **idle → retry:** Open a note whose summarize failed (status `idle`) — if hard to reproduce, temporarily point a note's `link` at an unreachable URL and wait. Expect "Summary not ready yet. It will retry automatically." and, when signed in, a **Retry** button. Click Retry → expect "Regenerating…" then the result (or an error toast if it still fails).
4. **no leak on close:** Open a pending note, then close the modal. Confirm (DevTools → Network) that polling stops — no continued `GET /api/notes/{id}` traffic.
5. **toggle:** For a summary > 150 chars, confirm "Show more" / "Show less" works.

- [ ] **Step 7: Done — ready for the owner to commit**
