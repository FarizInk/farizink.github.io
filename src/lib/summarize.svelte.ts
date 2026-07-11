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
  let activateGen = 0;

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
      const gen = ++activateGen; // invalidates any in-flight activate/interval for a prior gen

      // Seed from the passed note to avoid a blank flash (list-sourced notes
      // have no summarize_status, so guess 'done' when a summary already exists).
      summary = note.link_summarize ?? null;
      status = note.summarize_status ?? (note.link_summarize ? 'done' : null);

      // Authoritative state from the show endpoint.
      await fetchOnce(id);

      // We may have been stop()ped, superseded by another note, or re-activated
      // for the same note while this fetch was in flight.
      if (gen !== activateGen) return;

      // Poll while a job is running OR the status is still unknown (the initial
      // fetch may have failed transiently). Stop once we reach a concrete state.
      if (status === 'pending' || status === null) {
        maxTimer = setTimeout(() => {
          if (gen !== activateGen) {
            clearTimers();
            return;
          }
          // Gave up waiting — surface a recoverable state with the Retry button.
          if (status === 'pending' || status === null) status = 'idle';
          clearTimers();
        }, maxDurationMs);
        intervalTimer = setInterval(async () => {
          if (gen !== activateGen) {
            clearTimers();
            return;
          }
          await fetchOnce(id);
          if (gen !== activateGen) {
            clearTimers();
            return;
          }
          if (status === 'done' || status === 'idle') {
            clearTimers();
          }
        }, intervalMs);
      }
    },

    stop(): void {
      clearTimers();
      activeNoteId = null;
      activateGen++; // invalidate any in-flight activate/fetch/retry
    },

    async retry(): Promise<void> {
      if (!activeNoteId) return;
      const id = activeNoteId;
      const gen = activateGen; // guard against close/swap during the (long) regenerate
      isRegenerating = true;
      try {
        const res = await regenerateSummarize(id);
        // Don't write if we've been closed or a different note is now active.
        if (gen !== activateGen) return;
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
