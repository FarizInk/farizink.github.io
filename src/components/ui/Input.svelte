<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Input variants and states
  type InputVariant = 'default' | 'success' | 'warning' | 'error';
  type InputSize = 'sm' | 'md' | 'lg';

  // Props
  interface Props {
    variant?: InputVariant;
    size?: InputSize;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    label?: string;
    placeholder?: string;
    helperText?: string;
    errorText?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date';
    value?: string;
    leftIcon?: unknown;
    rightIcon?: unknown;
    id?: string;
    class?: string;
  }

  let {
    variant = 'default',
    size = 'md',
    disabled = false,
    readonly = false,
    required = false,
    label = '',
    placeholder = '',
    helperText = '',
    errorText = '',
    type = 'text',
    value = $bindable(),
    leftIcon = undefined,
    rightIcon = undefined,
    id,
    class: className = '',
    ...restProps
  }: Props = $props();

  // Dispatch events
  const dispatch = createEventDispatcher();

  // Handle input events
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    dispatch('input', { value: target.value, event });
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    dispatch('change', { value: target.value, event });
  }

  function handleFocus(event: FocusEvent) {
    dispatch('focus', { event });
  }

  function handleBlur(event: FocusEvent) {
    dispatch('blur', { event });
  }

  // Generate CSS classes
  const baseInputClasses = [
    'block w-full border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-offset-white dark:focus:ring-offset-gray-900'
  ];

  const sizeClasses = $derived(
    {
      sm: 'px-3 py-1.5 text-sm rounded',
      md: 'px-4 py-2 text-sm rounded-lg',
      lg: 'px-5 py-3 text-base rounded-lg'
    }[size]
  );

  const variantClasses = $derived(
    {
      default:
        'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 dark:focus:bg-gray-800',
      success:
        'border-green-300 bg-green-50 text-green-900 placeholder-green-500 focus:border-green-500 focus:ring-green-500 focus:bg-green-50 dark:border-green-600 dark:bg-green-900/30 dark:text-green-100 dark:placeholder-green-400 dark:focus:border-green-400 dark:focus:ring-green-400 dark:focus:bg-green-900/30',
      warning:
        'border-yellow-300 bg-yellow-50 text-yellow-900 placeholder-yellow-500 focus:border-yellow-500 focus:ring-yellow-500 focus:bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-100 dark:placeholder-yellow-400 dark:focus:border-yellow-400 dark:focus:ring-yellow-400 dark:focus:bg-yellow-900/30',
      error:
        'border-red-300 bg-red-50 text-red-900 placeholder-red-500 focus:border-red-500 focus:ring-red-500 focus:bg-red-50 dark:border-red-600 dark:bg-red-900/30 dark:text-red-100 dark:placeholder-red-400 dark:focus:border-red-400 dark:focus:ring-red-400 dark:focus:bg-red-900/30'
    }[errorText ? 'error' : variant]
  );

  const stateClasses = $derived(
    disabled ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400' : ''
  );
  const leftIconPadding = $derived(leftIcon ? 'pl-10' : '');
  const rightIconPadding = $derived(rightIcon ? 'pr-10' : '');

  const inputClasses = $derived(
    [
      ...baseInputClasses,
      sizeClasses,
      variantClasses,
      stateClasses,
      leftIconPadding,
      rightIconPadding,
      className
    ].join(' ')
  );

  // Label classes
  const labelClasses = $derived(
    [
      'block text-sm font-medium mb-2',
      required ? "after:content-['*'] after:ml-1 after:text-red-500" : '',
      disabled ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'
    ].join(' ')
  );

  // Helper text classes
  const helperTextClasses = $derived(
    [
      'mt-2 text-sm',
      errorText ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
    ].join(' ')
  );

  // Icon container classes
  const iconClasses = $derived('absolute inset-y-0 flex items-center pointer-events-none');
  const leftIconClasses = $derived(`${iconClasses} left-0 pl-3`);
  const rightIconClasses = $derived(`${iconClasses} right-0 pr-3`);
</script>

<div class="space-y-2">
  {#if label}
    <label for={id} class={labelClasses}>
      {label}
    </label>
  {/if}

  <div class="relative">
    {#if leftIcon}
      {@const LeftIcon = leftIcon}
      <div class={leftIconClasses}>
        <LeftIcon class="h-5 w-5 text-gray-400 dark:text-gray-500" />
      </div>
    {/if}

    <input
      {type}
      {placeholder}
      {disabled}
      {readonly}
      {required}
      {value}
      {id}
      class={inputClasses}
      oninput={handleInput}
      onchange={handleChange}
      onfocus={handleFocus}
      onblur={handleBlur}
      {...restProps}
    />

    {#if rightIcon}
      {@const RightIcon = rightIcon}
      <div class={rightIconClasses}>
        <RightIcon class="h-5 w-5 text-gray-400 dark:text-gray-500" />
      </div>
    {/if}
  </div>

  {#if helperText || errorText}
    <p class={helperTextClasses}>
      {errorText || helperText}
    </p>
  {/if}
</div>
