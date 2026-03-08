<script lang="ts">
  // Soft Waves Background - Calm, organic, inspired by Japanese minimalist design
  // Uses CSS gradients with smooth curves and gentle motion
</script>

<div class="waves-background">
  <div class="wave wave-1"></div>
  <div class="wave wave-2"></div>
  <div class="wave wave-3"></div>
</div>

<style>
  .waves-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(180deg, #fefce8 0%, #fef3c7 100%);
    overflow: hidden;
  }

  .wave {
    position: absolute;
    width: 200%;
    height: 200%;
    opacity: 0.3;
    will-change: transform;
  }

  .wave-1 {
    top: -30%;
    left: -50%;
    background: radial-gradient(ellipse at center, #fbbf24 0%, transparent 60%);
    animation: wave-drift-1 25s ease-in-out infinite;
  }

  .wave-2 {
    bottom: -40%;
    right: -50%;
    background: radial-gradient(ellipse at center, #fcd34d 0%, transparent 60%);
    animation: wave-drift-2 30s ease-in-out infinite;
  }

  .wave-3 {
    top: 30%;
    left: 30%;
    background: radial-gradient(ellipse at center, #fde68a 0%, transparent 50%);
    opacity: 0.2;
    animation: wave-drift-3 35s ease-in-out infinite;
  }

  @keyframes wave-drift-1 {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(10%, 15%) scale(1.1);
    }
  }

  @keyframes wave-drift-2 {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(-15%, -10%) scale(1.05);
    }
  }

  @keyframes wave-drift-3 {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(5%, -5%) scale(1.15);
    }
  }

  /* Firefox optimization */
  @supports (-moz-appearance: none) {
    .wave-3 {
      display: none;
    }
  }

  /* Dark mode */
  :global(.dark) .waves-background {
    background: linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%);
  }

  :global(.dark) .wave-1 {
    background: radial-gradient(ellipse at center, #7c3aed 0%, transparent 60%);
    opacity: 0.2;
  }

  :global(.dark) .wave-2 {
    background: radial-gradient(ellipse at center, #8b5cf6 0%, transparent 60%);
    opacity: 0.15;
  }

  :global(.dark) .wave-3 {
    background: radial-gradient(ellipse at center, #a78bfa 0%, transparent 50%);
    opacity: 0.1;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .wave {
      animation: none !important;
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .wave {
      width: 150%;
      height: 150%;
    }

    .wave-3 {
      display: none;
    }
  }
</style>
