<script lang="ts">
  import Modal from './Modal.svelte';
  import { Keyboard } from '@lucide/svelte';

  let { isOpen = $bindable(false) } = $props<{ isOpen?: boolean }>();
</script>

{#snippet Key(k: string)}
  <kbd
    class="px-2 py-1 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 font-mono text-xs shadow-sm min-w-[1.5rem] text-center inline-flex justify-center"
  >
    {k}
  </kbd>
{/snippet}

<Modal bind:isOpen maxW="max-w-lg" onClose={() => (isOpen = false)}>
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
          <span class="text-sm text-gray-700 dark:text-gray-300">Load more notes</span>
          <div class="flex items-center gap-1">{@render Key('l')}</div>
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
