import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/svelte";
import { Deck } from "$lib/types";
import { shuffle } from "$lib/utils/shuffle";

const deck = shuffle(Deck);
if (deck.length > 60 || deck.length < 60) {
  throw new Error(`Unexpected deck size: ${deck.length}`);
}

export const solitaireMachine = createMachine(
  {
    predictableActionArguments: true,
    id: "solitaire",
    initial: "begin",
    context: {
      columns: {
        column1: deck.slice(0, 2),
        column2: deck.slice(2, 6),
        column3: deck.slice(6, 12),
        column4: deck.slice(12, 20),
      },
      stacks: {
        stack1: deck.slice(20, 30),
        stack2: deck.slice(30, 40),
        stack3: deck.slice(40, 50),
        stack4: deck.slice(50, 60),
      },
      grabbed: "",
      validPositions: [
        "column1",
        "column2",
        "column3",
        "column4",
        "stack1",
        "stack2",
        "stack3",
        "stack4",
      ],
    },
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
          GRAB: { target: "grabbing", actions: ["grabCard"] },
        },
      },
      grabbing: {
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
      // dealCards() {},
      // grabCard: assign({
      //   grabbed: (context, event) => {
      //     return event.card;
      //   },
      // }),
      // releaseCard() {},
    },
    guards: {
      //   setupComplete(context, event) {
      //     return true;
      //   },
      //   didPlayerWin(context, event) {
      //     return false;
      //   },
      //   didPlayerLose(context, event) {
      //     return false;
      //   },
      // },
    },
  }
);

export const { state, send, service } = useMachine(solitaireMachine);
