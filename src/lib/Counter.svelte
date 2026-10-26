<script lang="ts">
  let count = $state(0);
  const increment = () => {
    count += 1;
  };
</script>

<button class="btn btn-secondary" onclick={increment}>
  count is {count}
</button>
