<script lang="ts">
  // Soft Waves Background - Pure CSS layered gradients
  // Dark mode: purple, Light mode: warning/amber, zero animation
</script>

<div class="waves-background"></div>

<style>
  .waves-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
    background:
      radial-gradient(ellipse at 20% 10%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 90%, rgba(124, 58, 237, 0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(167, 139, 250, 0.12) 0%, transparent 50%),
      linear-gradient(180deg, #1a1028 0%, #140e20 100%);
  }

  :global(html:not(.dark)) .waves-background {
    background:
      radial-gradient(ellipse at 20% 15%, rgba(251, 191, 36, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 85%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(253, 230, 138, 0.12) 0%, transparent 45%),
      linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%);
  }
</style>
