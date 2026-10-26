<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';
  interface Props { label?: string; for?: string; hint?: string; error?: string; optional?: boolean; children: Snippet }
  let { label, for: htmlFor, hint, error, optional = false, children }: Props = $props();
</script>

<div class="fz-field">
  {#if label}
    <label class="fz-field-label" for={htmlFor}>{label}{#if optional}<span class="fz-field-opt">Optional</span>{/if}</label>
  {/if}
  {@render children()}
  {#if error}
    <p class="fz-field-error" role="alert" id={htmlFor ? `${htmlFor}-msg` : undefined}><Icon name="alert" class="size-[15px]" />{error}</p>
  {:else if hint}
    <p class="fz-field-hint" id={htmlFor ? `${htmlFor}-msg` : undefined}>{hint}</p>
  {/if}
</div>
