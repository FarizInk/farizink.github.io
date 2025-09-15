<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  interface Dot {
    x: number;
    y: number;
    size: number;
    targetSize: number;
    opacity: number;
    targetOpacity: number;
    color: string;
    speed: number;
    phase: number;
  }

  let canvas: HTMLCanvasElement | undefined;
  let ctx: CanvasRenderingContext2D | null = null;
  let dots: Dot[] = [];
  let animationId: number | undefined;
  let isActive = false;
  let resizeObserver: ResizeObserver | undefined;

  // Configuration
  const GRID_SIZE = 15;
  const MAX_SIZE = 3;
  const COLORS = ['#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b'];
  
  function createDots() {
    if (!canvas) return;
    
    dots = [];
    const cols = Math.ceil(canvas.width / GRID_SIZE);
    const rows = Math.ceil(canvas.height / GRID_SIZE);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // Add some randomness to grid positions
        const x = i * GRID_SIZE + (Math.random() - 0.5) * 5;
        const y = j * GRID_SIZE + (Math.random() - 0.5) * 5;
        
        dots.push({
          x,
          y,
          size: 0,
          targetSize: Math.random() * MAX_SIZE,
          opacity: 0,
          targetOpacity: Math.random() * 0.6 + 0.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          speed: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2
        });
      }
    }
  }

  function updateDot(dot: Dot, time: number) {
    // Create blinking on-off animation
    const cycle = Math.sin(time * 0.003 + dot.phase);
    const isOn = cycle > 0;
    
    // Animate size - either full size or tiny/off
    dot.targetSize = isOn ? MAX_SIZE : 0.1;
    dot.size += (dot.targetSize - dot.size) * (dot.speed * 3);
    
    // Animate opacity - either visible or nearly invisible
    dot.targetOpacity = isOn ? (Math.random() * 0.4 + 0.4) : 0.05;
    dot.opacity += (dot.targetOpacity - dot.opacity) * (dot.speed * 4);
  }

  function drawDot(dot: Dot) {
    if (!ctx || dot.size < 0.1) return;
    
    ctx.globalAlpha = dot.opacity;
    ctx.fillStyle = dot.color;
    
    // Draw rectangle centered on the dot position
    const halfSize = dot.size / 2;
    ctx.fillRect(
      dot.x - halfSize,
      dot.y - halfSize,
      dot.size,
      dot.size
    );
  }

  function animate(time: number) {
    if (!isActive || !ctx || !canvas) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw all dots
    dots.forEach(dot => {
      updateDot(dot, time);
      drawDot(dot);
    });
    
    animationId = requestAnimationFrame(animate);
  }

  function resizeCanvas() {
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    createDots();
  }

  function startAnimation() {
    if (!isActive) {
      isActive = true;
      animationId = requestAnimationFrame(animate);
    }
  }

  function stopAnimation() {
    isActive = false;
    if (animationId !== undefined) {
      cancelAnimationFrame(animationId);
      animationId = undefined;
    }
  }

  onMount(() => {
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    ctx = context;
    
    // Set up canvas
    resizeCanvas();
    
    // Start animation after a short delay
    const timeoutId = setTimeout(startAnimation, 100);
    
    // Handle resize
    resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    
    return () => {
      clearTimeout(timeoutId);
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = undefined;
      }
      stopAnimation();
    };
  });

  onDestroy(() => {
    stopAnimation();
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = undefined;
    }
    ctx = null;
  });
</script>

<div class="pixel-background">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .pixel-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  canvas {
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }

  :global(.dark) canvas {
    opacity: 0.3;
  }

  @media (prefers-reduced-motion: reduce) {
    canvas {
      opacity: 0.2;
    }
  }
</style>