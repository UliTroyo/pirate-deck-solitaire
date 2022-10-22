<script lang="ts">
  import Card from "$lib/Card.svelte";
  import { useMachine } from "@xstate/svelte";
  import { Layout } from "$lib/types";
  import { createSolitaireMachine } from "$lib/solitaireMachine";

  const solitaireMachine = createSolitaireMachine();
  const { state, send } = useMachine(solitaireMachine);

  $: ({ columns, stacks } = $state.context);
  $: {
    console.log($state);
  }

  function logCard(event: MouseEvent) {
    let target = <HTMLElement>event?.target;
    let targetIsCard = Array.from(target.classList).includes("card");
    if (targetIsCard) {
      console.log(target.id);
      send({ type: "GRAB", card: target.id });
    }
  }
</script>

<main id="layout" on:mousedown={logCard}>
  {#each Object.entries(columns) as [name, column]}
    <div id={name}>
      {#each column as card}
        <Card id={card} />
      {/each}
    </div>
  {/each}

  {#each Object.entries(stacks) as [name, stack]}
    <div id={name}>
      {#each stack as card, index}
        {@const flipped = index < Layout.stackHeight - 1 ? true : false}
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
