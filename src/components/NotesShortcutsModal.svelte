<script lang="ts">
  import Modal from './Modal.svelte';
  import { Keyboard } from '@lucide/svelte';

  let { isOpen = $bindable(false) } = $props<{ isOpen?: boolean }>();
</script>

{#snippet Key(k: string)}
  <kbd
    class="px-2 py-1 bg-control text-ink rounded-sm font-mono text-code min-w-[1.5rem] text-center inline-flex justify-center"
  >
    {k}
  </kbd>
{/snippet}

<Modal bind:isOpen maxW="max-w-lg" onClose={() => (isOpen = false)}>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <div
        class="size-10 rounded-md bg-tile-deep text-ink-on-dark flex items-center justify-center shrink-0"
      >
        <Keyboard class="size-5" />
      </div>
      <div>
        <h2 class="text-title text-ink">Keyboard shortcuts</h2>
        <p class="text-body-sm text-ink-muted">Navigate notes without leaving the keyboard.</p>
      </div>
    </div>

    <!-- Navigation -->
    <div>
      <h3 class="text-label text-ink-muted mb-1">
        Navigation
      </h3>
      <div class="flex flex-col">
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">Focus search</span>
          <div class="flex items-center gap-1">{@render Key('/')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">Move between notes</span>
          <div class="flex items-center gap-1">{@render Key('j')}{@render Key('k')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">Move between notes</span>
          <div class="flex items-center gap-1">{@render Key('↑')}{@render Key('↓')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">Open note</span>
          <div class="flex items-center gap-1">{@render Key('Enter')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">Load more notes</span>
          <div class="flex items-center gap-1">{@render Key('l')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">Close / back</span>
          <div class="flex items-center gap-1">{@render Key('Esc')}</div>
        </div>
      </div>
    </div>

    <!-- Note actions -->
    <div>
      <h3 class="text-label text-ink-muted mb-1">
        Note actions <span class="normal-case font-normal">(on focused note)</span>
      </h3>
      <div class="flex flex-col">
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">New note</span>
          <div class="flex items-center gap-1">{@render Key('n')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">Pin / unpin</span>
          <div class="flex items-center gap-1">{@render Key('p')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">Edit</span>
          <div class="flex items-center gap-1">{@render Key('e')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">Delete</span>
          <div class="flex items-center gap-1">{@render Key('x')}</div>
        </div>
      </div>
    </div>

    <!-- Global -->
    <div>
      <h3 class="text-label text-ink-muted mb-1">
        Global
      </h3>
      <div class="flex flex-col">
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">Filter notes</span>
          <div class="flex items-center gap-1">{@render Key('Ctrl')}{@render Key('Shift')}{@render Key('F')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">Save note (create/edit)</span>
          <div class="flex items-center gap-1">{@render Key('Ctrl')}{@render Key('Shift')}{@render Key('S')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">Command palette</span>
          <div class="flex items-center gap-1">{@render Key('Ctrl')}{@render Key('K')}</div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-body-sm text-ink">This help</span>
          <div class="flex items-center gap-1">{@render Key('?')}</div>
        </div>
      </div>
    </div>
  </div>
</Modal>
