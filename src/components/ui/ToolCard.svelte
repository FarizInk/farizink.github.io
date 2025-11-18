<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  import { ArrowRight } from '@lucide/svelte';

  // Props
  interface Props {
    tool: {
      id: string;
      name: string;
      description: string;
      icon: any;
      color: string;
      features: string[];
      comingSoon: boolean;
    };
    colors: {
      bg: string;
      text: string;
      border: string;
      hover: string;
      gradient: string;
    };
  }

  let { tool, colors }: Props = $props();

  // Dispatch events
  const dispatch = createEventDispatcher();

  // Handle tool click
  function handleToolClick() {
    if (!tool.comingSoon) {
      dispatch('toolClick', { toolId: tool.id });
    }
  }

  // Handle card hover
  let isHovered = $state(false);
</script>

<div
  class="group relative bg-white dark:bg-gray-800 rounded-xl border {colors.border} overflow-hidden transition-all duration-300 {colors.hover} cursor-pointer text-left transform hover:scale-[1.02] hover:shadow-lg"
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
  onclick={handleToolClick}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === 'Enter' && handleToolClick()}
>
  <!-- Tool Content -->
  <div class="p-6">
    <!-- Icon with gradient background -->
    <div
      class="w-16 h-16 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 {isHovered ? 'scale-110 shadow-lg' : ''}"
      class:gradient-red={tool.color === 'red' || tool.color === 'password-red'}
      class:gradient-blue={tool.color === 'blue' || tool.color === 'hash-blue' || tool.color === 'url-orange'}
      class:gradient-green={tool.color === 'green' || tool.color === 'json-green'}
      class:gradient-purple={tool.color === 'purple' || tool.color === 'base64-purple'}
      class:gradient-pink={tool.color === 'pink' || tool.color === 'palette-pink'}
      class:gradient-teal={tool.color === 'teal' || tool.color === 'qrcode-teal'}
      class:gradient-yellow={tool.color === 'yellow'}
      class:gradient-indigo={tool.color === 'indigo'}
      class:gradient-orange={tool.color === 'orange'}
      class:gradient-rose={tool.color === 'rose'}
      class:gradient-emerald={tool.color === 'emerald'}
      class:gradient-violet={tool.color === 'violet'}
      class:gradient-amber={tool.color === 'amber'}
      class:gradient-slate={tool.color === 'slate'}
      class:gradient-cyan={tool.color === 'cyan'}
      class:gradient-lime={tool.color === 'lime'}
      class:gradient-gray={tool.color === 'gray'}
    >
      {#if tool.icon}
        <svelte:component
          this={tool.icon}
          class="w-8 h-8 text-white drop-shadow-md transition-all duration-300"
        />
      {/if}
    </div>

    <!-- Tool Name -->
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
      {tool.name}
    </h3>

    <!-- Tool Description -->
    <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
      {tool.description}
    </p>

    <!-- Features -->
    <div class="space-y-2 mb-4">
      {#each tool.features.slice(0, 3) as feature}
        <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
          {feature}
        </div>
      {/each}
      {#if tool.features.length > 3}
        <div class="text-xs text-gray-400 dark:text-gray-500 italic">
          +{tool.features.length - 3} more features
        </div>
      {/if}
    </div>

    <!-- Status Badge -->
    <div class="flex items-center justify-between">
      {#if tool.comingSoon}
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          Coming Soon
        </span>
      {/if}

      <div class="flex items-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span class="text-xs font-medium mr-1">Launch</span>
        <ArrowRight class="w-4 h-4" />
      </div>
    </div>
  </div>

  <!-- Hover Overlay -->
  {#if !tool.comingSoon && isHovered}
    <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 pointer-events-none"></div>
  {/if}

  <!-- Coming Soon Overlay -->
  {#if tool.comingSoon}
    <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center">
      <div class="text-center">
        <div class="text-white font-semibold text-lg mb-2">Coming Soon</div>
        <div class="text-gray-300 text-sm">We're working on it!</div>
      </div>
    </div>
  {/if}
</div>