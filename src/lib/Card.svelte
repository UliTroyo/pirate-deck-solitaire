<script lang="ts">
  import type { Rank, Suit } from "$lib/types";
  export let id: string;

  let rank = id.length == 2 ? id[0] : id[0] + id[1];
  let suit = id.length == 2 ? id[1] : id[2];
</script>

<div role="img" {id} class="card">
  <span class="top-left" class:rank>{rank}</span>
  {#if rank == "F0"}
    <span class="top-fool">0L</span>
  {/if}
  <span class="top-left" class:suit>{suit}</span>
  <span class="center index">{id}</span>
  <span class="bottom-right" class:suit>{suit}</span>
  {#if rank == "F0"}
    <span class="bottom-fool">0L</span>
  {/if}
  <span class="bottom-right" class:rank>{rank}</span>
</div>
