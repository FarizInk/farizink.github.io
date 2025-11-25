<script lang="ts">
  import { ChevronLeft } from '@lucide/svelte';
  import { navigate } from '../lib/router';

  interface Props {
    title: string;
    description: string;
    icon: typeof import('@lucide/svelte').ChevronLeft;
    color: 'primary' | 'success' | 'danger' | 'warning' | 'secondary';
    children: import('svelte').Snippet;
  }

  let { title, description, icon: Icon, color = 'primary', children }: Props = $props();

  const colorClasses = {
    primary: 'from-primary-400 to-primary-600',
    success: 'from-success-400 to-success-600',
    danger: 'from-danger-400 to-danger-600',
    warning: 'from-warning-400 to-warning-600',
    secondary: 'from-secondary-400 to-secondary-600'
  };

  const gradientClass = colorClasses[color] || colorClasses.primary;

  function handleBackToTools() {
    navigate('/tools');
  }
</script>

<svelte:head>
  <title>{title} - Developer Tools</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
  <!-- Header -->
  <div class="mb-6 sm:mb-8">
    <div class="flex items-center gap-4 mb-4 sm:mb-6">
      <button class="btn btn-primary" onclick={handleBackToTools}>
        <ChevronLeft class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        <span class="text-sm sm:text-base">Back to Tools</span>
      </button>
    </div>

    <div class="text-center mb-6 sm:mb-8">
      <div
        class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br {gradientClass} rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg"
      >
        <Icon class="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </div>
      <h1
        class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3"
      >
        {title}
      </h1>
      <p
        class="text-sm sm:text-base lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
      >
        {description}
      </p>
    </div>
  </div>

  <!-- Breadcrumb -->
  <nav class="mb-6 sm:mb-8">
    <ol class="flex items-center justify-center space-x-2 text-xs sm:text-sm">
      <li>
        <a
          href="/"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
        >
          Home
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li>
        <a
          href="/tools"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
        >
          Tools
        </a>
      </li>
      <li class="text-gray-300 dark:text-gray-600">/</li>
      <li class="text-gray-900 dark:text-white font-medium">{title}</li>
    </ol>
  </nav>

  <!-- Main Content -->
  {@render children()}
</div>
