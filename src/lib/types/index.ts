import { combine } from "$lib/utils/combine";

export const Suit = {
  Clubs: "♣",
  Diamonds: "♦",
  Hearts: "♥",
  Spades: "♠",
} as const;

export const Rank = {
  One: "1",
  Two: "2",
  Three: "3",
  Four: "4",
  Five: "5",
  Six: "6",
  Seven: "7",
  Eight: "8",
  Nine: "9",
  Artist: "A",
  Bodyguard: "B",
  Clairvoyant: "C",
  Doctor: "D",
  Empress: "E",
  Fool: "F0",
} as const;

export const Layout = {
  deckSize: 60,
  column1: { height: 2 },
  column2: { height: 4 },
  column3: { height: 6 },
  column4: { height: 8 },
  stackHeight: 10,
} as const;

export const Deck = combine(Object.values(Rank), Object.values(Suit));
