<script lang="ts">
  import { ChevronLeft, Home, ArrowRight } from '@lucide/svelte';
  import { navigate } from '../lib/router';

  interface Props {
    title: string;
    description: string;
    icon: typeof import('@lucide/svelte').ChevronLeft;
    color: 'primary' | 'success' | 'danger' | 'warning' | 'secondary';
    children: import('svelte').Snippet;
  }

  let { title, description, icon: Icon, color = 'primary', children }: Props = $props();

  const colorConfig = {
    primary: {
      gradient: 'from-purple-500 to-purple-600',
      gradientDark: 'from-purple-400 to-purple-500',
      lightBg: 'bg-purple-50',
      lightBgDark: 'dark:bg-primary-900/20',
      lightText: 'text-purple-700',
      lightTextDark: 'dark:text-primary-300'
    },
    success: {
      gradient: 'from-green-500 to-green-600',
      gradientDark: 'from-green-400 to-green-500',
      lightBg: 'bg-green-50',
      lightBgDark: 'dark:bg-green-900/20',
      lightText: 'text-green-700',
      lightTextDark: 'dark:text-green-300'
    },
    danger: {
      gradient: 'from-red-500 to-red-600',
      gradientDark: 'from-red-400 to-red-500',
      lightBg: 'bg-red-50',
      lightBgDark: 'dark:bg-red-900/20',
      lightText: 'text-red-700',
      lightTextDark: 'dark:text-red-300'
    },
    warning: {
      gradient: 'from-warning-500 to-amber-500',
      gradientDark: 'from-warning-400 to-amber-400',
      lightBg: 'bg-warning-50',
      lightBgDark: 'dark:bg-primary-900/20',
      lightText: 'text-warning-700',
      lightTextDark: 'dark:text-primary-300'
    },
    secondary: {
      gradient: 'from-slate-500 to-slate-600',
      gradientDark: 'from-slate-400 to-slate-500',
      lightBg: 'bg-slate-50',
      lightBgDark: 'dark:bg-slate-900/20',
      lightText: 'text-slate-700',
      lightTextDark: 'dark:text-slate-300'
    }
  };

  const config = colorConfig[color];

  function handleBackToTools() {
    navigate('/tools');
  }

  function navigateToTools() {
    navigate('/tools');
  }

  function navigateToHome() {
    navigate('/');
  }
</script>

<svelte:head>
  <title>{title} - Developer Tools</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="tool-layout">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
    <!-- Back Button -->
    <div class="mb-6">
      <button
        onclick={handleBackToTools}
        class="btn btn-secondary back-button inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 hover:shadow-md"
      >
        <ChevronLeft class="w-4 h-4" />
        <span>Back to Tools</span>
      </button>
    </div>

    <!-- Hero Section -->
    <div class="tool-hero text-center relative flex flex-col items-center">
      <div class="flex items-center gap-3 mb-2">
        <!-- <div
          class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br {config.gradient} dark:{config.gradientDark}"
        >
          <Icon class="w-5 h-5 text-white drop-shadow" />
        </div> -->
        <h1 class="tool-title !mb-0">
          <span
            class="title-gradient bg-clip-text text-transparent bg-gradient-to-r {config.gradient} dark:{config.gradientDark}"
          >
            {title}
          </span>
        </h1>
      </div>

      <p class="tool-description max-w-xl">
        {description}
      </p>
    </div>

    <!-- Breadcrumb -->
    <nav class="mb-6" aria-label="Breadcrumb">
      <ol class="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
        <li>
          <button
            onclick={navigateToHome}
            class="btn-icon breadcrumb-link inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            <Home class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">Home</span>
          </button>
        </li>
        <ArrowRight class="w-3.5 h-3.5 text-gray-400 dark:text-gray-600" />
        <li>
          <button
            onclick={navigateToTools}
            class="btn-icon breadcrumb-link inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            Tools
          </button>
        </li>
        <ArrowRight class="w-3.5 h-3.5 text-gray-400 dark:text-gray-600" />
        <li
          class="breadcrumb-current text-gray-900 dark:text-white font-medium truncate max-w-[200px]"
        >
          {title}
        </li>
      </ol>
    </nav>

    <!-- Divider -->
    <div class="divider">
      <div class="divider-line"></div>
      <div class="divider-dot {config.lightBg} {config.lightBgDark}"></div>
      <div class="divider-line"></div>
    </div>

    <!-- Main Content -->
    <div class="tool-content">
      {@render children()}
    </div>
  </div>
</div>
