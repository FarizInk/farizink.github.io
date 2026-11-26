<!-- Active / Off / Expired — always a word plus a shape, never colour alone. -->
<script lang="ts">
  import { linkStatus, STATUS_LABEL, type LinkCore } from '../../lib/linkHelpers';
  let { link }: { link: Pick<LinkCore, 'is_active' | 'expires_at'> } = $props();
  const status = $derived(linkStatus(link));
</script>

<span
  class="badge flex-none {status === 'active' ? 'badge-success' : status === 'expired' ? 'badge-danger' : 'text-ink-muted'}"
>
  {#if status === 'active'}
    <span class="size-1.5 rounded-pill bg-live" aria-hidden="true"></span>
  {:else if status === 'expired'}
    <span aria-hidden="true">✕</span>
  {:else}
    <span class="size-1.5 rounded-pill bg-ink-muted opacity-60" aria-hidden="true"></span>
  {/if}
  {STATUS_LABEL[status]}
</span>
