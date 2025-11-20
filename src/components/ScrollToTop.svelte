<script lang="ts">
  import { onMount } from 'svelte';
  import { ChevronUp } from '@lucide/svelte';

  let showScrollTop = $state(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    showScrollTop = scrollTop > 300;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<!-- Scroll to Top Button -->
<button
  onclick={scrollToTop}
  class="!p-0 btn btn-primary fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full shadow-2xl hover:shadow-3xl group flex items-center justify-center transition-all duration-300 {showScrollTop
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-16 pointer-events-none'}"
  title="Scroll to top"
>
  <ChevronUp class="w-6 h-6 group-hover:-translate-y-0.5 transition-transform" />
</button>
