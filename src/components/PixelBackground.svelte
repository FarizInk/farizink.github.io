<script lang="ts">
  // Mesh Gradient Background - CPU-efficient CSS-only animated background
  // No canvas, no requestAnimationFrame, near 0% CPU usage
</script>

<div class="mesh-background">
  <div class="mesh-gradient"></div>
</div>

<style>
  .mesh-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
  }

  .mesh-gradient {
    position: absolute;
    inset: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(at 40% 20%, #fbbf24 0px, transparent 40%),
                radial-gradient(at 80% 0%, #fcd34d 0px, transparent 40%),
                radial-gradient(at 0% 50%, #f59e0b 0px, transparent 40%),
                radial-gradient(at 80% 50%, #fde68a 0px, transparent 40%),
                radial-gradient(at 0% 100%, #d97706 0px, transparent 40%),
                radial-gradient(at 80% 100%, #fbbf24 0px, transparent 40%),
                radial-gradient(at 0% 0%, #fcd34d 0px, transparent 40%);
    animation: mesh-move 25s ease-in-out infinite;
    filter: blur(80px);
    opacity: 0.5;
    will-change: transform;
  }

  /* Firefox optimization - reduced blur for better CPU performance */
  @supports (-moz-appearance: none) {
    .mesh-gradient {
      filter: blur(50px);
      inset: -30%;
      width: 160%;
      height: 160%;
    }
  }

  @keyframes mesh-move {
    0% {
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    25% {
      transform: translate(5%, 5%) rotate(1deg) scale(1.02);
    }
    50% {
      transform: translate(-3%, 3%) rotate(-1deg) scale(1.05);
    }
    75% {
      transform: translate(3%, -3%) rotate(0.5deg) scale(0.98);
    }
    100% {
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
  }

  /* Dark mode - purple gradient */
  :global(.dark) .mesh-gradient {
    background: radial-gradient(at 40% 20%, #7c3aed 0px, transparent 40%),
                radial-gradient(at 80% 0%, #8b5cf6 0px, transparent 40%),
                radial-gradient(at 0% 50%, #6d28d9 0px, transparent 40%),
                radial-gradient(at 80% 50%, #a78bfa 0px, transparent 40%),
                radial-gradient(at 0% 100%, #5b21b6 0px, transparent 40%),
                radial-gradient(at 80% 100%, #7c3aed 0px, transparent 40%),
                radial-gradient(at 0% 0%, #8b5cf6 0px, transparent 40%);
    opacity: 0.4;
  }

  /* Respect user's motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .mesh-gradient {
      animation: none;
      filter: blur(60px);
      opacity: 0.6;
    }
  }
</style>
