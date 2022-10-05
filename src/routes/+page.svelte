<script lang="ts">
  import { Suit, Denomination } from "$lib/types";
  import Card from "$lib/Card.svelte";
  import { svelteEnumFrom } from "$lib/utils/svelteEnum";

  const cssVersion = "0.1.0";

  const suits = svelteEnumFrom(Suit);
  const denominations = svelteEnumFrom(Denomination);
</script>

<svelte:head>
  <title>Pirate Deck Solitaire</title>
  <link rel="stylesheet" href="{cssVersion}.css" />
</svelte:head>

<main>
  {#each suits as suit}
    {#each denominations as denomination}
      <!-- content here -->
      <Card {suit} {denomination} />
    {/each}
  {/each}
</main>
