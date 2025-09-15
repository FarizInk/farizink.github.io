<script lang="ts">
  import { navigate } from './router.js';

  interface Props {
    href: string;
    class?: string;
    activeClass?: string;
    children?: any;
  }

  let { href, class: className = '', activeClass = '', children }: Props = $props();

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    navigate(href);
  }

  // Check if current path matches this link
  let isActive = $state(false);
  
  $effect(() => {
    isActive = window.location.pathname === href;
  });

  let finalClass = $derived(
    `${className} ${isActive && activeClass ? activeClass : ''}`.trim()
  );
</script>

<a 
  {href} 
  class={finalClass}
  onclick={handleClick}
>
  {@render children?.()}
</a>
