<script lang="ts">
  export let id: string;
  export let flipped = false;

  let rank = id.length == 2 ? id[0] : id[0] + id[1];
  let suit = id.length == 2 ? id[1] : id[2];
</script>

<div role="img" {id} class="card" class:flipped>
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

<style global>
  .card {
    --aquamarine: #00ff99;
    --black: black;
    --rose: #e30071;
    --white: white;

    aspect-ratio: 5/7;
    border: 0.5px solid black;
    border-radius: 1vw;
    background-color: var(--background-color, gold);
    color: var(--color, purple);
    display: grid;
    filter: drop-shadow(3px 3px 5px #0006);
    font-family: system-ui, sans-serif;
    font-size: 0.8em;
    font-weight: bold;
    grid-template-columns: 2ch 1fr 2ch;
    grid-template-rows: auto auto 1fr auto auto;
    padding: 0.3em;
    place-items: center;
    user-select: none;
    width: min(22vw, 15vh);
  }
  .card.flipped {
    background-color: purple;
    border: 0.5px solid black;
  }
  .card.flipped > span {
    display: none;
  }
  .card > .suit {
    margin-bottom: 0.2em;
    margin-top: 0.2em;
  }
  .top-left.rank {
    grid-column: 1;
    grid-row: 1;
  }
  .top-left.suit {
    grid-column: 1;
    grid-row: 2;
  }
  .top-fool {
    grid-column: 5;
    grid-row: 1;
  }
  .center {
    font-size: 3em;
    grid-column: -1 / 1;
    grid-row: -1 / 1;
  }
  .bottom-right.rank {
    grid-column: 5;
    grid-row: 5;
    rotate: 180deg;
  }
  .bottom-right.suit {
    grid-column: 5;
    grid-row: 4;
    rotate: 180deg;
  }
  .bottom-fool {
    grid-column: 1;
    grid-row: 5;
    rotate: 180deg;
  }
</style>
