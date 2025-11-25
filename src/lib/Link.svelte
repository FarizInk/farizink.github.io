<script lang="ts">
  import { navigate } from './router';

  interface Props {
    href: string;
    class?: string;
    activeClass?: string;
    children?: import('svelte').Snippet;
  }

  let { href, class: className = '', activeClass = '', children }: Props = $props();

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    navigate(href);
  }

  // Check if current path matches this link
  let isActive = $derived(window.location.pathname === href);

  let finalClass = $derived(`${className} ${isActive && activeClass ? activeClass : ''}`.trim());
</script>

<a {href} class={finalClass} onclick={handleClick}>
  {@render children?.()}
</a>
