<script lang="ts">
  import { Rank, Suit } from "$lib/types";
  import Card from "$lib/Card.svelte";
  import { combine } from "$lib/utils/combine";
  import { shuffle } from "$lib/utils/shuffle";
  import { svelteEnumFrom } from "$lib/utils/svelteEnum";
  import { useMachine } from "@xstate/svelte";
  import { createSolitaireMachine } from "$lib/xstateStore";

  const ranks = <string[]>svelteEnumFrom(Rank);
  const suits = <string[]>svelteEnumFrom(Suit);

  const deck = combine(ranks, suits);
  const cards = shuffle(deck);

  const solitaireMachine = createSolitaireMachine(cards);
  const { state, send } = useMachine(solitaireMachine);
  console.log($state.context);
</script>

<main>
  <div id="column1">
    {#each $state.context.column1 as card}
      <Card id={card} />
    {/each}
  </div>
  <div id="column2">
    {#each $state.context.column2 as card}
      <Card id={card} />
    {/each}
  </div>
  <div id="column3">
    {#each $state.context.column3 as card}
      <Card id={card} />
    {/each}
  </div>
  <div id="column4">
    {#each $state.context.column4 as card}
      <Card id={card} />
    {/each}
  </div>

  <div id="stack1">
    {#each $state.context.stack1 as card}
      <Card id={card} flipped={true} />
    {/each}
  </div>
  <div id="stack2">
    {#each $state.context.stack2 as card}
      <Card id={card} flipped={true} />
    {/each}
  </div>
  <div id="stack3">
    {#each $state.context.stack3 as card}
      <Card id={card} flipped={true} />
    {/each}
  </div>
  <div id="stack4">
    {#each $state.context.stack4 as card}
      <Card id={card} flipped={true} />
    {/each}
  </div>
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
