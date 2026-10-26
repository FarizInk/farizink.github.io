<script lang="ts">
  import Field from './Field.svelte';
  import Icon from './Icon.svelte';
  import { fade, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { clickOutside, type Option } from './options';
  import { dur, EASE } from './motion';

  interface Props { options: Option[]; value?: string[]; label?: string; hint?: string; error?: string; optional?: boolean; placeholder?: string; searchable?: boolean; open?: boolean; onchange?: (v: string[]) => void }
  let { options, value = $bindable([]), label, hint, error, optional, placeholder = 'Choose…', searchable = true, open = $bindable(false), onchange }: Props = $props();
  const uid = $props.id();
  const fid = `ms-${uid}`;
  let query = $state('');
  const shown = $derived(options.filter((o) => !query || o.label.toLowerCase().includes(query.toLowerCase())));
  const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;

  function toggle(v: string) {
    value = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
    onchange?.(value);
  }
  function key(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === 'ArrowDown') { e.preventDefault(); open = true; }
    else if (e.key === 'Escape') open = false;
    else if (e.key === 'Backspace' && value.length && !query) toggle(value[value.length - 1]);
  }
</script>

<Field {label} for={fid} {hint} {error} {optional}>
  <div class="fz-select" data-open={open} use:clickOutside={() => (open = false)}>
    <div id={fid} class="fz-control fz-multi" role="combobox" tabindex="0" aria-haspopup="listbox" aria-expanded={open} aria-controls={`${fid}-list`}
      data-invalid={error ? 'true' : undefined} onclick={() => (open = true)} onkeydown={key}>
      {#each value as v (v)}
        <span class="fz-chip-x" animate:flip={{ duration: dur(200), easing: EASE.soft }} out:scale={{ start: 0.8, duration: dur(120), easing: EASE.exit }}>{labelOf(v)}<button type="button" aria-label={`Remove ${labelOf(v)}`} onclick={(e) => { e.stopPropagation(); toggle(v); }}><Icon name="x" /></button></span>
      {:else}
        <span class="fz-multi-placeholder">{placeholder}</span>
      {/each}
      <span class="ml-auto"><Icon name="chev" class="fz-chev" /></span>
    </div>
    {#if open}
      <div out:fade={{ duration: dur(100) }} class="fz-pop" role="listbox" id={`${fid}-list`} aria-multiselectable="true" tabindex="-1">
        {#if searchable}
          <div class="fz-control fz-pop-search"><Icon name="search" /><input placeholder="Filter…" bind:value={query} aria-label="Filter options" /></div>
        {/if}
        {#each shown as o (o.value)}
          {@const on = value.includes(o.value)}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <div role="option" class="fz-option" aria-selected={on} tabindex="-1" onclick={() => toggle(o.value)}>
            <span class="fz-box" style={on ? 'background:var(--accent);color:var(--ink-on-accent)' : ''}><Icon name="check" stroke={3} /></span>
            {o.label}
            {#if o.hint}<span class="fz-option-hint ml-auto">{o.hint}</span>{/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</Field>
