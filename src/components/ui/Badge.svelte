<script lang="ts">
  // Badge variants
  type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  type BadgeSize = 'sm' | 'md' | 'lg';

  // Props
  interface Props {
    variant?: BadgeVariant;
    size?: BadgeSize;
    rounded?: boolean;
    class?: string;
    children?: () => void;
  }

  let {
    variant = 'default',
    size = 'md',
    rounded = true,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // Generate CSS classes
  const baseClasses = ['inline-flex items-center font-medium'];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  }[size];

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400'
  }[variant];

  const roundedClasses = rounded ? 'rounded-full' : 'rounded';

  const badgeClasses = $derived(
    [...baseClasses, sizeClasses, variantClasses, roundedClasses, className].join(' ')
  );
</script>

<span class={badgeClasses} {...restProps}>
  {@render children?.()}
</span>
