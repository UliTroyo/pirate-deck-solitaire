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
  {#each cards as cardIndex}
    <Card id={cardIndex} />
  {/each}
</main>
