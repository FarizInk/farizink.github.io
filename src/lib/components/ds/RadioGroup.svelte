<script lang="ts">
  import Field from './Field.svelte';
  import Icon from './Icon.svelte';
  import type { Option } from './options';
  interface Props { options: Option[]; value?: string; label?: string; hint?: string; error?: string; variant?: 'list' | 'cards'; name?: string; onchange?: (v: string) => void }
  let { options, value = $bindable(), label, hint, error, variant = 'list', name, onchange }: Props = $props();
  const uid = $props.id();
  const group = $derived(name ?? `rg-${uid}`);
</script>

<Field {label} {hint} {error}>
  <div class={variant === 'cards' ? 'fz-choices-grid' : 'fz-choices'} role="radiogroup" aria-label={label}>
    {#each options as o (o.value)}
      {#if variant === 'cards'}
        <label class="fz-choice">
          <input type="radio" name={group} value={o.value} bind:group={value} disabled={o.disabled} onchange={() => onchange?.(o.value)} />
          <span class="fz-choice-tick"><Icon name="check" stroke={3} /></span>
          <span class="fz-choice-title">{o.label}</span>
          {#if o.description}<span class="fz-choice-desc">{o.description}</span>{/if}
        </label>
      {:else}
        <label class="fz-check fz-radio">
          <input type="radio" name={group} value={o.value} bind:group={value} disabled={o.disabled} onchange={() => onchange?.(o.value)} />
          <span class="fz-box"></span>
          <span class="fz-check-text">{o.label}{#if o.description}<small>{o.description}</small>{/if}</span>
        </label>
      {/if}
    {/each}
  </div>
</Field>
