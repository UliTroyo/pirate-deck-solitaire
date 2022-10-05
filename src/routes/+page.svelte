<script lang="ts">
  import { Suit, Denomination } from "$lib/types";
  import Card from "$lib/Card.svelte";
  import { svelteEnumFrom } from "$lib/utils/svelteEnum";

  const suits = svelteEnumFrom(Suit);
  const denominations = svelteEnumFrom(Denomination);
</script>

<svelte:head>
  <title>Pirate Deck Solitaire</title>
</svelte:head>

<main>
  {#each suits as suit}
    {#each denominations as denomination}
      <!-- content here -->
      <Card {suit} {denomination} />
    {/each}
  {/each}
</main>

<style global>
  * {
    box-sizing: border-box;
  }
  body {
    background-color: rgb(55, 75, 111);
  }
  main {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-template-rows: repeat(16, 2.7vh);
    justify-items: center;
  }
</style>
