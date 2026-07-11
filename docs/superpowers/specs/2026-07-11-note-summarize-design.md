# Note Summarize Integration — Design

**Date:** 2026-07-11
**Status:** Approved (pre-implementation)
**Scope:** Wire the Soul backend's async link-summarize feature into the Notes detail modal.

## Context

The Soul backend summarizes the content of a note's `link` field asynchronously via a queue job (9router fetch + LLM). The frontend must reflect the job's lifecycle (`pending` → `done`, or `idle` on failure) and show the resulting `link_summarize`. Manual re-generation is available via a synchronous, slow endpoint (up to ~10 min) that should be reserved for the failure case.

## Current State

The integration is **partially built**:

- `Note` interface (`src/lib/notes.ts`) already has `link` and `link_summarize`. It is **missing `summarize_status`**.
- `regenerateSummarize()` (`src/lib/notes.ts:711`) calls `POST /api/notes/{id}/regenerate-summarize` with a **30s timeout** — too short; spec requires ≥600s.
- `NoteDetailModal.svelte` (lines ~373-420) already renders an "AI Summary" section with an always-visible **Regenerate** button and a show-more/less toggle. It checks only `note.link_summarize` null/non-null — **no `summarize_status` handling, no polling**.
- Summary is rendered as a plain `<p>` — spec requires `white-space: pre-wrap` (bullets are plain-text `- ` with preserved newlines).
- `summarize_status` is returned **only** by the show endpoint (`GET /api/notes/{id}`), **not** by the list endpoint.

## Goals

1. Reflect `summarize_status` accurately in the detail modal: `pending`, `idle`, `done`.
2. Poll the show endpoint while a summarize job is running; stop on completion, failure, timeout, or modal close.
3. Render `link_summarize` with preserved whitespace.
4. Offer manual retry (via the sync regenerate endpoint) **only** when the job has failed (`idle`), with an adequate timeout and a "this may take a few minutes" expectation.

## Non-Goals (YAGNI)

- No summary preview or status indicator on the list/cards (`summarize_status` is unavailable there; `link_summarize` null/non-null is insufficient to distinguish pending/idle).
- No sync-back of polled values to the `note` prop — the modal is the only consumer, so it reads poller state directly. The prop's `link_summarize` is used only as the initial seed.
- No client-side retry logic for the async job (backend auto-retries 3× + a 15-minute scheduled backfill). The client only polls.
- No test scaffolding (project has no test framework).

## Design

### 1. Types & API layer — `src/lib/notes.ts`

- Add: `export type SummarizeStatus = 'pending' | 'idle' | 'done';`
- Add field to `Note`: `summarize_status?: SummarizeStatus | null;`
  - Optional: the list response omits it; only the show response includes it. `undefined` (list) and `null`/value (show) both type-check.
- Fix `regenerateSummarize()` timeout: `30000` → `600000` (600s).
- `RegenerateSummarizeResponse` (`{ data: Note }`) is unchanged and now carries `summarize_status` via the updated `Note` type.

### 2. New module — `src/lib/summarize.svelte.ts`

A factory mirroring the `createWebSocket` pattern in `src/lib/websocket.svelte.ts` (holds internal `$state`, returns readonly getters + control functions).

```ts
import type { Note, SummarizeStatus } from './notes';

export interface SummarizePoller {
  readonly status: SummarizeStatus | null; // null = unknown (not yet fetched)
  readonly summary: string | null;
  readonly isRegenerating: boolean;
  activate(note: Note): Promise<void>; // seed + fetch + poll-if-pending
  stop(): void;                         // clear interval/timeout
  retry(): Promise<void>;               // sync regenerate, used on idle
}

export function createSummarizePoller(opts?: {
  intervalMs?: number;    // default 7000
  maxDurationMs?: number; // default 240000 (4 min)
}): SummarizePoller;
```

**Behavior:**

- `activate(note)`:
  1. If `note.id` equals the currently-active id and a poll is already running → no-op (idempotent). If the id differs → reset (clear timers, clear state).
  2. **Seed** reactive state from the passed note to avoid a blank flash:
     - `summary = note.link_summarize`
     - `status = note.summarize_status ?? (note.link_summarize ? 'done' : null)`
  3. Fetch authoritative state via `getNote(note.id)`; set `status` and `summary` from the response.
  4. If `status === 'pending'` → start an interval (`intervalMs`) that re-fetches `getNote(note.id)` and updates state. Stop the interval when `status !== 'pending'`, after `maxDurationMs` elapses, or when `stop()` is called.
  5. Fetch errors during polling are swallowed (logged); the next interval retries. On `maxDurationMs` expiry while still pending, leave the last-known status.
- `stop()`: clears the interval and any max-duration timeout. Does not reset `status`/`summary` (keeps last rendered state).
- `retry()` (used by the idle-state button):
  1. Set `isRegenerating = true`.
  2. `await regenerateSummarize(activeNoteId)`.
  3. On success: set `summary` and `status` from `response.data` (`link_summarize`, `summarize_status`). If the response returns `link_summarize` null (backend returns 200 with old/null on failure), toast a warning and leave status as-is.
  4. On network error: toast the error; leave status as-is.
  5. `isRegenerating = false`.

### 3. `NoteDetailModal.svelte` wiring

- Instantiate once: `const poller = createSummarizePoller();`
- Lifecycle via `$effect` (reads `shouldShowModal`, `note`, `note.link`, `note.id` only — not `link_summarize`, so poll updates do not retrigger it):
  - When `shouldShowModal && note?.link` → `poller.activate(note)`.
  - When the modal closes (or note has no link) → `poller.stop()`.
  - On destroy → `poller.stop()`.
- The existing "AI Summary" block (inside `{#if note.link}`) is reworked to read from the poller. Evaluate in this order (first match wins):

  | # | Condition | UI |
  |---|---|---|
  | 1 | `status === 'pending'` **or** (`summary === null` and status not yet known) | spinner + "Summarizing…" |
  | 2 | `summary` non-null | render `poller.summary` with `whitespace-pre-wrap`; keep show-more/less toggle (>150 chars) |
  | 3 | `status === 'idle'` | "Summary not ready yet." + **Retry** button (only if `hasAuthToken`) |
  | 4 | otherwise (`done` with empty summary) | "No summary available." |

  Per the backend spec, `idle` implies no summary, so rows 2 and 3 are mutually exclusive in practice; the ordering simply makes the precedence explicit.

- The **always-visible Regenerate button is removed**. Retry appears only in the idle state. The retry button reuses the existing regenerate UI (spinner + "Regenerating…" while `isRegenerating`, calls `poller.retry()`) and carries a `title`/hint that it may take several minutes.
- Note: because `summarize_status` is absent on list-sourced notes, the first thing `activate` does is fetch authoritative state; the seeded `done`-guess (when `link_summarize` exists) prevents a flash for already-summarized notes.

### 4. Error handling

- Poll `getNote` failure → silent retry on next interval; after `maxDurationMs` → UI naturally falls into the idle/not-ready state with the Retry button.
- `retry()` network error → `toast.error`.
- `retry()` returns 200 with null `link_summarize` → `toast.error('Couldn't generate summary, try again later')`; status remains `idle`.
- All paths guarantee `isRegenerating` is reset and timers are cleared on `stop()`/destroy.

## Verification

- `npm run check` — confirms the `Note` type change, the new module, and the modal compile cleanly (no new type errors introduced; the 82 pre-existing errors are unrelated).
- Manual flow in the browser:
  1. Create/edit a note with a `link` → open it → observe "Summarizing…" then the summary once `done`.
  2. Re-open an already-summarized note → summary renders immediately (seeded), no spinner flash.
  3. Force `idle` (e.g., a link the summarizer can't process) → "Summary not ready yet." + Retry button; clicking Retry shows "Regenerating…" then the result.
  4. Close the modal mid-pending → confirm polling stops (no continued network traffic).
- Confirm summary bullets/newlines render correctly (pre-wrap).

## Files touched

- `src/lib/notes.ts` — add `SummarizeStatus`, add `summarize_status` to `Note`, fix `regenerateSummarize` timeout.
- `src/lib/summarize.svelte.ts` — **new** module.
- `src/components/NoteDetailModal.svelte` — instantiate poller, lifecycle effect, reworked AI Summary section.
