<script lang="ts">
  import { ChevronLeft, Home, ArrowRight, Sparkles } from '@lucide/svelte';
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
  <!-- Decorative Background Elements -->
  <div class="decoration-blob decoration-blob-1"></div>
  <div class="decoration-blob decoration-blob-2"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
    <!-- Back Button -->
    <div class="mb-6">
      <button
        onclick={handleBackToTools}
        class="back-button inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 hover:shadow-md"
      >
        <ChevronLeft class="w-4 h-4" />
        <span>Back to Tools</span>
      </button>
    </div>

    <!-- Hero Section -->
    <div class="tool-hero text-center relative">
      <!-- Animated Icon Card -->
      <div class="relative inline-block mb-6">
        <!-- Decorative rings (behind) -->
        <div
          class="absolute inset-0 rounded-full border-2 border-warning-400/20 dark:border-primary-400/20 animate-ping"
          style="animation-delay: 0s;"
        ></div>
        <div
          class="absolute inset-0 rounded-full border-2 border-warning-300/20 dark:border-primary-300/20 animate-ping"
          style="animation-delay: 0.5s;"
        ></div>
        <div
          class="absolute inset-0 rounded-full border-2 border-warning-200/20 dark:border-primary-200/20 animate-ping"
          style="animation-delay: 1s;"
        ></div>

        <!-- Icon container -->
        <div
          class="relative z-10 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl bg-gradient-to-br {color ===
          'warning'
            ? 'from-yellow-500 to-amber-500 dark:from-primary-400 dark:to-primary-500'
            : color === 'primary'
              ? 'from-purple-500 to-purple-600 dark:from-primary-400 dark:to-primary-500'
              : color === 'success'
                ? 'from-green-500 to-green-600 dark:from-green-400 dark:to-green-500'
                : color === 'danger'
                  ? 'from-red-500 to-red-600 dark:from-red-400 dark:to-red-500'
                  : 'from-slate-500 to-slate-600 dark:from-slate-400 dark:to-slate-500'}"
        >
          <Icon class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white drop-shadow-lg" />
        </div>
      </div>

      <!-- Title & Description -->
      <h1 class="tool-title">
        <span
          class="title-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-400 dark:from-primary-400 to-purple-500 bg-gradient-to-l"
        >
          {title}
        </span>
      </h1>

      <p class="tool-description">
        {description}
      </p>

      <!-- Feature Badge (Optional - can show tool stats) -->
      <div class="flex items-center justify-center gap-2 mt-4">
        <div
          class="flex items-center gap-1.5 px-3 py-1 rounded-full {config.lightBg} {config.lightBgDark} border border-gray-200 dark:border-gray-700"
        >
          <Sparkles class="w-3.5 h-3.5 {config.lightText} {config.lightTextDark}" />
          <span class="text-xs font-medium {config.lightText} {config.lightTextDark}"
            >Free & Fast</span
          >
        </div>
      </div>
    </div>

    <!-- Breadcrumb -->
    <nav class="mt-10 mb-10" aria-label="Breadcrumb">
      <ol class="flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
        <li>
          <button
            onclick={navigateToHome}
            class="breadcrumb-link inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            <Home class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">Home</span>
          </button>
        </li>
        <ArrowRight class="w-3.5 h-3.5 text-gray-400 dark:text-gray-600" />
        <li>
          <button
            onclick={navigateToTools}
            class="breadcrumb-link inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
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

<style>
  .tool-layout {
    @apply relative min-h-screen;
  }

  /* Decorative Blobs */
  .decoration-blob {
    @apply absolute rounded-full blur-2xl opacity-30;
    @apply pointer-events-none;
    animation: float 8s ease-in-out infinite;
  }

  .decoration-blob-1 {
    @apply w-64 h-64 bg-warning-400 dark:bg-primary-600;
    @apply top-0 -left-16;
    animation-delay: 0s;
  }

  .decoration-blob-2 {
    @apply w-96 h-96 bg-amber-400 dark:bg-primary-700;
    @apply bottom-0 -right-16;
    animation-delay: 4s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(30px, -30px) scale(1.1);
    }
  }

  /* Back Button */
  .back-button {
    @apply inline-flex items-center gap-2 px-4 py-2.5;
    @apply bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700;
    @apply border border-gray-200 dark:border-gray-700 rounded-xl;
    @apply text-sm font-medium text-gray-700 dark:text-gray-300;
    @apply transition-all duration-200 hover:shadow-md;
  }

  /* Hero Section */
  .tool-hero {
    @apply text-center relative py-8 sm:py-12;
  }

  /* Animated Rings - removed, now inline */

  @keyframes ping {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .tool-title {
    font-size: clamp(2.5rem, 9vw, 4.5rem);
    font-weight: 800;
    line-height: 1;
    margin-bottom: 1rem;
    letter-spacing: -0.03em;
  }

  .tool-title span {
    font-weight: 800;
  }

  .title-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(135deg, #1f2937 0%, #4b5563 50%, #1f2937 100%);
  }

  .dark .title-gradient {
    background-image: linear-gradient(135deg, #f3f4f6 0%, #d1d5db 50%, #f3f4f6 100%);
  }

  .tool-description {
    @apply text-base sm:text-lg;
    @apply text-gray-600 dark:text-gray-400;
    @apply max-w-2xl mx-auto leading-relaxed;
    @apply mb-6;
  }

  .breadcrumb-link {
    @apply inline-flex items-center gap-1;
    @apply text-gray-500 dark:text-gray-400;
    @apply hover:text-gray-700 dark:hover:text-gray-300;
    @apply transition-colors;
    @apply focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-purple-400;
  }

  .breadcrumb-current {
    @apply text-gray-900 dark:text-white;
    @apply font-medium;
  }

  /* Divider */
  .divider {
    @apply flex items-center gap-4 my-8;
  }

  .divider-line {
    @apply flex-1 h-px;
    @apply bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700;
  }

  .divider-dot {
    @apply w-2 h-2 rounded-full;
    @apply bg-gray-400 dark:bg-gray-600;
  }

  /* Content Area */
  .tool-content {
    @apply relative;
    @apply z-10;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .tool-title {
      @apply text-2xl;
    }

    .tool-description {
      @apply text-sm;
    }
  }
</style>
