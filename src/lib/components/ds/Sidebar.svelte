<script lang="ts">
  import IconButton from './IconButton.svelte';
  import Icon from './Icon.svelte';
  import { fade, fly } from 'svelte/transition';
  import { dur, EASE } from './motion';
  import type { NavGroup } from './types';
  import type { Snippet } from 'svelte';

  interface Props {
    open: boolean;
    groups: NavGroup[];
    activeId?: string;
    brand?: string;
    /** Image URL for the header mark (defaults to the blackhole mark). */
    logo?: string;
    subtitle?: string;
    side?: 'right' | 'left';
    /** Render inside the parent instead of the viewport (previews). */
    contained?: boolean;
    onclose?: () => void;
    /** Bottom bento: NowPlaying, ThemeSwitch… */
    children?: Snippet;
    footer?: Snippet;
  }
  let { open = $bindable(false), groups, activeId, brand = 'Fariz', logo, subtitle = 'fariz.dev', side = 'right', contained = false, onclose, children, footer }: Props = $props();

  let panel: HTMLElement | undefined = $state();
  function close() { open = false; onclose?.(); }

  $effect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const lock = !contained;
    if (lock) document.documentElement.style.overflow = 'hidden';
    queueMicrotask(() => panel?.querySelector<HTMLElement>('a,button')?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && panel) {
        const f = [...panel.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])')];
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); if (lock) document.documentElement.style.overflow = ''; prev?.focus?.(); };
  });
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="fz-overlay {contained ? 'fz-contained' : ''}" out:fade={{ duration: dur(160), easing: EASE.exit }} onclick={(e) => e.target === e.currentTarget && close()}>
    <div bind:this={panel} out:fly={{ x: side === 'left' ? -24 : 24, duration: dur(160), easing: EASE.exit }} class="fz-drawer {side === 'left' ? 'fz-drawer-left' : ''}" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="fz-drawer-head">
        {#if logo}<img class="size-10 flex-none object-contain" src={logo} alt="" aria-hidden="true" />{:else}<span class="fz-mark" aria-hidden="true"></span>{/if}
        <div class="fz-brand"><p class="fz-brand-name">{brand}</p><p class="fz-brand-sub">{subtitle}</p></div>
        <IconButton label="Close menu" onclick={close}><Icon name="x" /></IconButton>
      </div>

      {#each groups as g (g.label)}
        <nav class="fz-nav-group" aria-label={g.label}>
          <span class="text-label fz-nav-label text-ink-muted">{g.label}</span>
          {#each g.items as it (it.id)}
            <a class="fz-nav-item" href={it.href ?? '#'} aria-current={activeId === it.id ? 'page' : undefined} onclick={close}>
              <span class="fz-nav-icon">{@render it.icon?.()}</span>
              <span class="fz-nav-text">{it.label}{#if it.hint}<span class="fz-nav-hint">{it.hint}</span>{/if}</span>
              {#if it.locked}
                <span class="fz-nav-meta" title="Login required"><Icon name="lock" class="size-4" /></span>
              {:else if it.badge != null}
                <span class="fz-nav-badge">{it.badge}</span>
              {:else if it.meta}
                <span class="fz-nav-meta">{it.meta}</span>
              {/if}
            </a>
          {/each}
        </nav>
      {/each}

      {#if children}<div class="fz-drawer-bento">{@render children()}</div>{/if}
      <div class="fz-drawer-foot">
        {#if footer}{@render footer()}{:else}<span>© {new Date().getFullYear()} Fariz</span><span>Sidoarjo, ID</span>{/if}
      </div>
    </div>
  </div>
{/if}
