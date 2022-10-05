<script lang="ts">
  import Game from "$lib/Game.svelte";

  const cssVersion = "0.1.0";
</script>

<svelte:head>
  <title>Pirate Deck Solitaire</title>
  <link rel="stylesheet" href="{cssVersion}.css" />
</svelte:head>

<Game />
