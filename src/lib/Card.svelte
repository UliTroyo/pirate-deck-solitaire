<script lang="ts">
  import type { Denomination, Suit } from "$lib/types";
  export let suit: Suit;
  export let denomination: Denomination;
</script>

<div role="img" class="card" data-suit={suit} data-denomination={denomination}>
  <span class="top-left">{denomination}{suit}</span>
  <span class="center">{denomination}{suit}</span>
  <span class="bottom-right">{denomination}{suit}</span>
</div>

<style>
  .card {
    border: 0.5px solid black;
    border-radius: 1vw;
    background-color: var(--background-color, gold);
    color: var(--color, purple);
    display: grid;
    filter: drop-shadow(3px 3px 5px #0006);
    font-family: system-ui, sans-serif;
    font-size: 2vw;
    font-weight: bold;
    grid-template-areas:
      "top-left . ."
      "center center center"
      ". . bottom-right";
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr auto;
    height: 30vw;
    padding: 0.5vw;
    place-items: center;
    width: 20vw;
  }
  .top-left {
    grid-area: top-left;
  }
  .center {
    font-size: 6vw;
    grid-area: center;
  }
  .bottom-right {
    grid-area: bottom-right;
    rotate: 180deg;
  }
  [data-suit="♣"] {
    --background-color: #00ff80;
    --color: black;
  }
  [data-suit="♦"] {
    --background-color: black;
    --color: #00ff80;
    border: 0.5px solid grey;
  }
  [data-suit="♥"] {
    --background-color: white;
    --color: #ff0080;
  }
  [data-suit="♠"] {
    --background-color: #ff0080;
    --color: white;
  }
</style>
