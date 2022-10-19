<script lang="ts">
  import { Deck } from "$lib/types";
  import Card from "$lib/Card.svelte";
  import { useMachine } from "@xstate/svelte";
  import { solitaireMachine } from "$lib/solitaireMachine";

  // Get rid of poop global
  const STACK_HEIGHT = 10;

  const { state, send } = useMachine(solitaireMachine);
  console.log($state.context);
</script>

<main id="layout">
  {#each Object.entries($state.context.columns) as [name, column]}
    <div id={name}>
      {#each column as card}
        <Card id={card} />
      {/each}
    </div>
  {/each}

  {#each Object.entries($state.context.stacks) as [name, stack]}
    <div id={name}>
      {#each stack as card, index}
        {@const flipped = index < STACK_HEIGHT - 1 ? true : false}
        <Card id={card} {flipped} />
      {/each}
    </div>
  {/each}
</main>

<style global>
  [id^="column"] {
    display: grid;
    grid-template-rows: repeat(auto-fit, 1.5em);
  }
  [id^="stack"] {
    display: grid;
    grid-row: 2;
    grid-template-rows: repeat(auto-fit, 0.2em);
  }
  [id$="♣"] {
    --background-color: var(--aquamarine);
    --color: var(--black);
  }
  [id$="♦"] {
    --background-color: var(--black);
    --color: var(--aquamarine);
    border: 0.5px solid grey;
  }
  [id$="♥"] {
    --background-color: var(--white);
    --color: var(--rose);
  }
  [id$="♠"] {
    --background-color: var(--rose);
    --color: var(--white);
  }
  .card:hover {
    cursor: grab;
  }
  .grabbed.card {
    --x: 0;
    --y: 0;
    cursor: grabbing;
  }
</style>
