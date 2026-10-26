<script lang="ts">
  import type { Snippet } from 'svelte';
  import Field from './Field.svelte';
  import Icon from './Icon.svelte';
  import { fade } from 'svelte/transition';
  import { clickOutside, type Option } from './options';
  import { dur } from './motion';

  interface Props { options: Option[]; value?: string; label?: string; hint?: string; error?: string; optional?: boolean; placeholder?: string; icon?: Snippet; open?: boolean; disabled?: boolean; onchange?: (v: string) => void }
  let { options, value = $bindable(), label, hint, error, optional, placeholder = 'Select…', icon, open = $bindable(false), disabled = false, onchange }: Props = $props();
  const uid = $props.id();
  const fid = `sel-${uid}`;
  let active = $state(0);
  const current = $derived(options.find((o) => o.value === value));

  function pick(o: Option) { if (o.disabled) return; value = o.value; onchange?.(o.value); open = false; }
  function openList() { open = true; active = Math.max(0, options.findIndex((o) => o.value === value)); }
  function key(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) openList(); else active = Math.min(options.length - 1, active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(0, active - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (open) pick(options[active]); else openList(); }
    else if (e.key === 'Escape' || e.key === 'Tab') open = false;
  }
</script>

<Field {label} for={fid} {hint} {error} {optional}>
  <div class="fz-select" data-open={open} use:clickOutside={() => (open = false)}>
    <button id={fid} type="button" class="fz-control fz-select-trigger" {disabled} aria-haspopup="listbox" aria-expanded={open} aria-controls={`${fid}-list`}
      data-invalid={error ? 'true' : undefined} data-disabled={disabled ? 'true' : undefined}
      onclick={() => (open ? (open = false) : openList())} onkeydown={key}>
      {@render icon?.()}
      <span class="fz-select-value" data-empty={!current}>{current?.label ?? placeholder}</span>
      <Icon name="chev" class="fz-chev" />
    </button>
    {#if open}
      <div out:fade={{ duration: dur(100) }} class="fz-pop" role="listbox" id={`${fid}-list`} aria-labelledby={fid} tabindex="-1">
        {#each options as o, i (o.value)}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <div id={`${fid}-o${i}`} role="option" class="fz-option" aria-selected={o.value === value} aria-disabled={o.disabled} data-active={i === active}
            tabindex="-1" onmouseenter={() => (active = i)} onclick={() => pick(o)}>
            {o.label}
            {#if o.hint}<span class="fz-option-hint">{o.hint}</span>{/if}
            {#if o.value === value}<Icon name="check" class="fz-option-check" />{/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</Field>
