<script lang="ts">
  import { SendHorizontal } from '@lucide/svelte';

  interface Props {
    /** Creates the entry; resolve true to clear the input. */
    onsubmit: (name: string) => Promise<boolean>;
  }
  let { onsubmit }: Props = $props();

  let text = $state('');
  let input: HTMLInputElement | undefined = $state();
  let sending = $state(false);
  const canSend = $derived(text.trim().length > 0 && !sending);

  async function send() {
    const name = text.trim();
    if (!name || sending) return;
    sending = true;
    try {
      if (await onsubmit(name)) text = '';
      input?.focus();
    } finally {
      sending = false;
    }
  }
</script>

<form
  class="flex items-center gap-2 rounded-lg bg-raised p-2 pl-4 shadow-pop"
  onsubmit={e => {
    e.preventDefault();
    send();
  }}
>
  <input
    bind:this={input}
    bind:value={text}
    class="min-w-0 flex-1 bg-transparent py-2 text-body text-ink outline-none placeholder:text-ink-muted"
    placeholder="What's going on?"
    aria-label="What's going on?"
    enterkeyhint="send"
    maxlength="255"
    readonly={sending}
  />
  <button
    type="submit"
    aria-label="Post"
    title="Post"
    disabled={!canSend}
    class="grid size-11 flex-none place-items-center rounded-pill text-ink transition-[background-color,scale] duration-fast ease-spring enabled:bg-accent enabled:text-ink-on-accent enabled:hover:bg-accent-hover enabled:active:scale-90 disabled:text-ink-muted disabled:opacity-50"
  >
    <SendHorizontal class="size-5" />
  </button>
</form>
