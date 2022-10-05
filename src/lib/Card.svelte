<script lang="ts">
  import type { Denomination, Suit } from "$lib/types";
  export let suit: Suit;
  export let denomination: Denomination;

  let id = `${denomination}${suit}`;
</script>

<div role="img" {id} class="card">
  <span class="top-left">{denomination}</span>
  <span class="center">{denomination}{suit}</span>
  <span class="bottom-right">{denomination}</span>
</div>
