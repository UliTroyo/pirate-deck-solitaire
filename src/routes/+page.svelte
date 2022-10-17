<script lang="ts">
  import Game from "$lib/Game.svelte";

  const cssVersion = "0.1.0";
</script>

<svelte:head>
  <title>Pirate Deck Solitaire</title>
  <link rel="stylesheet" href="{cssVersion}.css" />
</svelte:head>

<Game />

<style global>
  * {
    box-sizing: border-box;
  }
  body {
    background-color: rgb(55, 75, 111);
    display: grid;
    justify-content: center;
  }
  main {
    align-content: start;
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 600px 300px;
    justify-items: center;
    max-width: calc(60vh + 3em);
  }
</style>
