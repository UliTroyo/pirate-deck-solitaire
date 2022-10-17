import { createMachine, assign } from "xstate";

export function createSolitaireMachine(shuffledDeck: string[]) {
  if (shuffledDeck.length > 60 || shuffledDeck.length < 60) {
    throw new Error(`Unexpected deck size: ${shuffledDeck.length}`);
  }
  const context = {
    column1: shuffledDeck.slice(0, 2),
    column2: shuffledDeck.slice(2, 6),
    column3: shuffledDeck.slice(6, 12),
    column4: shuffledDeck.slice(12, 20),
    stack1: shuffledDeck.slice(20, 30),
    stack2: shuffledDeck.slice(30, 40),
    stack3: shuffledDeck.slice(40, 50),
    stack4: shuffledDeck.slice(50, 60),

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
        //     return event.target?.id;
        //   },
        // }),
        // releaseCard() {},
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
}