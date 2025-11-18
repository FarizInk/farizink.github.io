<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Card variants
  type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';

  // Props
  interface Props {
    variant?: CardVariant;
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    hover?: boolean;
    clickable?: boolean;
    class?: string;
    id?: string;
    onclick?: (event: MouseEvent) => void;
    onkeydown?: (event: KeyboardEvent) => void;
    children?: any;
    header?: any;
    body?: any;
    footer?: any;
  }

  let {
    variant = 'default',
    padding = 'md',
    hover = false,
    clickable = false,
    class: className = '',
    id,
    onclick,
    onkeydown,
    children,
    header,
    body,
    footer,
    ...restProps
  }: Props = $props();

  // Dispatch events
  const dispatch = createEventDispatcher();

  // Handle card click
  function handleClick(event: MouseEvent) {
    if (clickable) {
      onclick?.(event);
      dispatch('click', event);
    }
  }

  // Generate CSS classes
  const baseClasses = [
    'rounded-xl transition-all duration-200'
  ];

  const variantClasses = $derived({
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm',
    elevated: 'bg-white dark:bg-gray-800 border border-transparent shadow-lg hover:shadow-xl dark:shadow-gray-900/50 dark:hover:shadow-gray-900/70',
    outlined: 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600',
    flat: 'bg-gray-50 dark:bg-gray-900 border-0'
  }[variant]);

  const paddingClasses = $derived({
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }[padding]);

  const interactionClasses = $derived({
    hover: hover && !clickable ? 'hover:shadow-md' : '',
    clickable: clickable ? 'cursor-pointer hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600' : ''
  });

  const cardClasses = $derived([...baseClasses, variantClasses, paddingClasses, interactionClasses.hover, interactionClasses.clickable, className].join(' '));
</script>

<div
  {id}
  class={cardClasses}
  onclick={clickable ? handleClick : undefined}
  role={clickable ? 'button' : undefined}
  tabindex={clickable ? 0 : undefined}
  onkeydown={clickable ? (e) => e.key === 'Enter' && handleClick(e as any) : undefined}
  {...restProps}
>
  {#if header}
    <div class="mb-4">
      {@render header()}
    </div>
  {/if}

  {#if body}
    <div>
      {@render body()}
    </div>
  {:else}
    {@render children?.()}
  {/if}

  {#if footer}
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      {@render footer()}
    </div>
  {/if}
</div>