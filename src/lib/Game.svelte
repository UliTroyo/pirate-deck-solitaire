<script lang="ts">
  import { Rank, Suit } from "$lib/types";
  import Card from "$lib/Card.svelte";
  import { combine } from "$lib/utils/combine";
  import { shuffle } from "$lib/utils/shuffle";
  import { svelteEnumFrom } from "$lib/utils/svelteEnum";
  import { useMachine } from "@xstate/svelte";
  import { createMachine } from "xstate";

  function createSolitaireMachine(shuffledDeck: string[]) {
    if (cards.length == 64) {
      const context = {
        column1: cards.slice(0, 2),
        column2: cards.slice(2, 6),
        column3: cards.slice(6, 12),
        column4: cards.slice(12, 20),
        stack1: cards.slice(20, 31),
        stack2: cards.slice(31, 42),
        stack3: cards.slice(42, 53),
        stack4: cards.slice(53, 64),
      };
      return createMachine(
        {
          predictableActionArguments: true,
          id: "solitaire",
          initial: "begin",
          context,
          states: {
            begin: {
              always: [{ target: "dealing", actions: ["dealCards"] }],
            },
            dealing: {
              always: [{ target: "ready", cond: "setupComplete" }],
            },
            ready: {
              always: [
                { target: "win", cond: "didPlayerWin" },
                { target: "lose", cond: "didPlayerLose" },
              ],
              on: {
                GRAB: { target: "scoping", actions: ["grabCard"] },
                SELECT: { target: "ready", actions: ["selectCard"] },
              },
            },
            scoping: {
              on: {
                PLACE: { target: "ready" },
                CANCEL: { target: "ready", actions: ["releaseCard"] },
              },
            },
            win: { type: "final" },
            lose: { type: "final" },
          },
        },
        {
          actions: {
            dealCards() {},
            grabCard() {},
            selectCard() {},
            releaseCard() {},
          },
          guards: {
            setupComplete(context, event) {
              return true;
            },
            didPlayerWin(context, event) {
              return false;
            },
            didPlayerLose(context, event) {
              return false;
            },
          },
        }
      );
    } else {
      throw new Error(`Unexpected deck size: ${cards.length}`);
    }
  }

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
</style>
