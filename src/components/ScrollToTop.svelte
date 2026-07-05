<script lang="ts">
  import { onMount } from 'svelte';
  import { ChevronUp } from '@lucide/svelte';
  import { getLenis } from '../lib/lenis';

  let showScrollTop = $state(false);

  function scrollToTop() {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.8 });
    } else {
      // reduced-motion fallback (no Lenis instance)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function onScroll(scrollTop: number) {
    showScrollTop = scrollTop > 300;
  }

  onMount(() => {
    const lenis = getLenis();
    if (lenis) {
      // Lenis drives window scroll, so read its position from its 'scroll' event.
      const off = lenis.on('scroll', (e: { scroll: number }) => onScroll(e.scroll));
      onScroll(lenis.scroll);
      return off;
    } else {
      const handler = () =>
        onScroll(window.pageYOffset || document.documentElement.scrollTop);
      window.addEventListener('scroll', handler, { passive: true });
      handler();
      return () => window.removeEventListener('scroll', handler);
    }
  });
</script>

<!-- Scroll to Top Button -->
<button
  onclick={scrollToTop}
  class="!p-0 btn fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full shadow-2xl hover:shadow-3xl group flex items-center justify-center transition-all duration-300 bg-warning-600 text-white hover:bg-yellow-700 dark:bg-primary-600 dark:hover:bg-primary-700 {showScrollTop
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-16 pointer-events-none'}"
  title="Scroll to top"
>
  <ChevronUp class="w-6 h-6 group-hover:-translate-y-0.5 transition-transform" />
</button>
