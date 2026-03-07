import type { Tag } from './tags';
import { tagsStore, tags, isLoadingTags, tagsError } from './stores/tags';

/**
 * Custom hook for managing tags
 * Provides reactive state and methods for tag management
 *
 * Usage in Svelte 5 components:
 * ```svelte
 * <script>
 *   const { tagsStore, loadTags, isLoading, error } = useTags();
 *
 *   $effect(() => {
 *     loadTags(); // Load tags on mount
 *   });
 * </script>
 *
 * <!-- Use $tagsStore or $tags directly in template -->
 * ```
 */
export function useTags() {
  // Return reactive state and methods
  return {
    // Reactive stores (use with $ prefix in templates)
    tags,
    isLoading: isLoadingTags,
    error: tagsError,

    // Methods
    loadTags: () => tagsStore.loadTags(),
    addTag: (tag: Tag) => tagsStore.addTag(tag),
    updateTag: (tagId: string, tag: Tag) => tagsStore.updateTag(tagId, tag),
    removeTag: (tagId: string) => tagsStore.removeTag(tagId),
    clearTags: () => tagsStore.clearTags(),
    reset: () => tagsStore.reset()
  };
}

/**
 * Custom hook for managing modal state
 * Provides simple open/close functionality with optional callbacks
 *
 * Usage in Svelte 5 components:
 * ```svelte
 * <script>
 *   const modal = useModal({
 *     onClose: () => console.log('Modal closed')
 *   });
 * </script>
 *
 * <Modal isOpen={modal.isOpen()} onClose={modal.close}>
 *   ...
 * </Modal>
 * ```
 */
export function useModal(options?: {
  onOpen?: () => void;
  onClose?: () => void;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}) {
  let isOpen = $state(false);

  const open = () => {
    isOpen = true;
    options?.onOpen?.();
  };

  const close = () => {
    isOpen = false;
    options?.onClose?.();
  };

  const toggle = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  return {
    get isOpen() {
      return isOpen;
    },
    set isOpen(value: boolean) {
      isOpen = value;
      if (value) {
        options?.onOpen?.();
      } else {
        options?.onClose?.();
      }
    },
    open,
    close,
    toggle
  };
}

/**
 * Custom hook for managing form state with validation
 *
 * Usage:
 * ```svelte
 * <script>
 *   const form = useForm({
 *     initialValues: { name: '', email: '' },
 *     validate: (values) => {
 *       const errors = {};
 *       if (!values.name) errors.name = 'Name is required';
 *       return errors;
 *     }
 *   });
 * </script>
 * ```
 */
export function useForm<T extends Record<string, unknown>>(options: {
  initialValues: T;
  validate?: (values: T) => Record<keyof T, string | undefined>;
  onSubmit?: (values: T) => void | Promise<void>;
}) {
  let values = $state<T>({ ...options.initialValues });
  let errors = $state<Record<keyof T, string | undefined>>(
    {} as Record<keyof T, string | undefined>
  );
  let touched = $state<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  let isSubmitting = $state(false);
  const isValid = $derived(Object.keys(errors).length === 0);

  const setValue = <K extends keyof T>(field: K, value: T[K]) => {
    values[field] = value;
    touched[field] = true;

    // Validate on change if field has been touched
    if (options.validate) {
      const validationErrors = options.validate(values);
      errors = validationErrors as Record<keyof T, string | undefined>;
    }
  };

  const setError = <K extends keyof T>(field: K, error: string | undefined) => {
    if (error) {
      errors[field] = error;
    } else {
      delete errors[field];
    }
  };

  const setTouched = <K extends keyof T>(field: K) => {
    touched[field] = true;
  };

  const reset = () => {
    values = { ...options.initialValues };
    errors = {} as Record<keyof T, string | undefined>;
    touched = {} as Record<keyof T, boolean>;
    isSubmitting = false;
  };

  const submit = async () => {
    // Validate all fields
    if (options.validate) {
      const validationErrors = options.validate(values);
      errors = validationErrors as Record<keyof T, string | undefined>;

      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    isSubmitting = true;
    try {
      await options.onSubmit?.(values);
    } finally {
      isSubmitting = false;
    }
  };

  return {
    get values() {
      return values;
    },
    get errors() {
      return errors;
    },
    get touched() {
      return touched;
    },
    get isSubmitting() {
      return isSubmitting;
    },
    get isValid() {
      return isValid;
    },
    setValue,
    setError,
    setTouched,
    reset,
    submit
  };
}

/**
 * Custom hook for managing async operations with loading/error states
 *
 * Usage:
 * ```svelte
 * <script>
 *   const asyncAction = useAsync(async () => {
 *     await fetchData();
 *   });
 *
 *   const handleClick = () => {
 *     asyncAction.execute();
 *   };
 * </script>
 * ```
 */
export function useAsync<T>(
  asyncFn: () => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  }
) {
  let data = $state<T | null>(null);
  let error = $state<Error | null>(null);
  let isLoading = $state(false);

  const execute = async (): Promise<T | null> => {
    isLoading = true;
    error = null;

    try {
      const result = await asyncFn();
      data = result;
      options?.onSuccess?.(result);
      return result;
    } catch (e) {
      error = e as Error;
      options?.onError?.(e as Error);
      return null;
    } finally {
      isLoading = false;
    }
  };

  const reset = () => {
    data = null;
    error = null;
    isLoading = false;
  };

  return {
    get data() {
      return data;
    },
    get error() {
      return error;
    },
    get isLoading() {
      return isLoading;
    },
    execute,
    reset
  };
}

/**
 * Custom hook for managing debounced values
 *
 * Usage:
 * ```svelte
 * <script>
 *   let searchValue = $state('');
 *   const debouncedSearch = useDebounce(searchValue, 300);
 *
 *   $effect(() => {
 *     if ($debouncedSearch.value) {
 *       performSearch($debouncedSearch.value);
 *     }
 *   });
 * </script>
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 300) {
  let debouncedValue = $state(value);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  $effect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      debouncedValue = value;
    }, delay);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  });

  return {
    get value() {
      return debouncedValue;
    }
  };
}

/**
 * Custom hook for managing localStorage with reactivity
 *
 * Usage:
 * ```svelte
 * <script>
 *   const theme = useLocalStorage('theme', 'light');
 *
 *   $effect(() => {
 *     console.log($theme.value); // 'light' or saved value
 *   });
 * </script>
 * ```
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  let storedValue: T;

  try {
    const item = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    storedValue = item ? JSON.parse(item) : defaultValue;
  } catch {
    storedValue = defaultValue;
  }

  let value = $state(storedValue);

  $effect(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.warn(`Failed to save to localStorage:`, e);
    }
  });

  return {
    get value() {
      return value;
    },
    set value(newValue: T) {
      value = newValue;
    },
    remove: () => {
      value = defaultValue;
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(key);
        }
      } catch (e) {
        console.warn(`Failed to remove from localStorage:`, e);
      }
    }
  };
}
