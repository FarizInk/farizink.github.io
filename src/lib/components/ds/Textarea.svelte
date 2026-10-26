<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import Field from './Field.svelte';
  interface Props extends HTMLTextareaAttributes { value?: string; label?: string; hint?: string; error?: string; optional?: boolean; mono?: boolean }
  let { value = $bindable(''), label, hint, error, optional, mono = false, id, rows = 4, disabled, ...rest }: Props = $props();
  const uid = $props.id();
  const fid = $derived(id ?? `ta-${uid}`);
</script>

<Field {label} for={fid} {hint} {error} {optional}>
  <div class="fz-control items-start {mono ? 'fz-control-mono [&_textarea]:font-mono [&_textarea]:text-[14px]' : ''}" data-invalid={error ? 'true' : undefined} data-disabled={disabled ? 'true' : undefined}>
    <textarea id={fid} bind:value {rows} {disabled} aria-invalid={error ? 'true' : undefined} aria-describedby={error || hint ? `${fid}-msg` : undefined} {...rest}></textarea>
  </div>
</Field>
