<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Field from './Field.svelte';

  interface Props extends Omit<HTMLInputAttributes, 'prefix'> {
    value?: string | number | null;
    label?: string;
    hint?: string;
    error?: string;
    optional?: boolean;
    prefix?: string;
    suffix?: string;
    icon?: Snippet;
    /** Monospace input for codes, hashes, URLs. */
    mono?: boolean;
  }
  let { value = $bindable(''), label, hint, error, optional, prefix, suffix, icon, mono = false, id, disabled, ...rest }: Props = $props();
  const uid = $props.id();
  const fid = $derived(id ?? `tf-${uid}`);
</script>

<Field {label} for={fid} {hint} {error} {optional}>
  <div class="fz-control {mono ? 'fz-control-mono' : ''}" data-invalid={error ? 'true' : undefined} data-disabled={disabled ? 'true' : undefined}>
    {@render icon?.()}
    {#if prefix}<span class="fz-control-affix">{prefix}</span>{/if}
    <input id={fid} bind:value {disabled} aria-invalid={error ? 'true' : undefined} aria-describedby={error || hint ? `${fid}-msg` : undefined} {...rest} />
    {#if suffix}<span class="fz-control-affix">{suffix}</span>{/if}
  </div>
</Field>
