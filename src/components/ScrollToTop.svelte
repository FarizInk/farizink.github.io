<script lang="ts">
  import { onMount } from 'svelte';
  import { ChevronUp } from '@lucide/svelte';
  import { scrollTopButton } from '../lib/scrollTop.svelte';

  let showScrollTop = $state(false);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function onScroll() {
    showScrollTop = (window.pageYOffset || document.documentElement.scrollTop) > 300;
    scrollTopButton.visible = showScrollTop;
  }

  onMount(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      scrollTopButton.visible = false;
    };
  });
</script>

<!-- Scroll to Top Button -->
<button
  onclick={scrollToTop}
  class="fixed right-5 bottom-6 z-40 grid size-11 place-items-center rounded-pill bg-raised text-ink shadow-pop transition-[opacity,background-color,color] duration-150 hover:bg-tile-lime hover:text-ink-on-bright {showScrollTop
    ? 'opacity-100'
    : 'pointer-events-none opacity-0'}"
  aria-label="Scroll to top"
  title="Scroll to top"
>
  <ChevronUp class="size-5" />
</button>
