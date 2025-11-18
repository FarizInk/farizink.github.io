<script lang="ts">
  // Alert variants
  type AlertVariant = 'info' | 'success' | 'warning' | 'error';

  // Props
  interface Props {
    variant?: AlertVariant;
    dismissible?: boolean;
    show?: boolean;
    title?: () => void;
    children?: () => void;
  }

  let { variant = 'info', dismissible = false, show = true, title, children }: Props = $props();

  // Handle dismiss
  function dismiss() {
    show = false;
  }

  // Generate CSS classes
  const baseClasses = ['p-4 rounded-lg border'];

  const variantClasses = $derived(
    {
      info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400',
      success:
        'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400',
      warning:
        'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400',
      error:
        'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
    }[variant]
  );

  const alertClasses = $derived([...baseClasses, variantClasses].join(' '));

  // Icon mapping
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };
</script>

{#if show}
  <div class={alertClasses} role="alert">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <span class="text-lg">{icons[variant]}</span>
      </div>
      <div class="ml-3 flex-1">
        {#if title}
          <h3 class="text-sm font-medium mb-1">
            {@render title()}
          </h3>
        {/if}
        <div class="text-sm">
          {@render children?.()}
        </div>
      </div>
      {#if dismissible}
        <div class="ml-auto pl-3">
          <button
            type="button"
            class="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:text-gray-600 dark:focus:text-gray-300 transition-colors"
            onclick={dismiss}
            aria-label="Dismiss"
          >
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
