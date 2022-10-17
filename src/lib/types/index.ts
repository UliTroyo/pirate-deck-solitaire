import { combine } from "$lib/utils/combine";
import { shuffle } from "$lib/utils/shuffle";
import { arrayFromEnum } from "$lib/utils/arrayFromEnum";

export enum Suit {
  Clubs = "♣",
  Diamonds = "♦",
  Hearts = "♥",
  Spades = "♠",
}
export enum Rank {
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Artist = "A",
  Bodyguard = "B",
  Clairvoyant = "C",
  Doctor = "D",
  Empress = "E",
  Fool = "F0",
}

export class Deck {
  cards: string[];
  constructor() {
    const ranks = arrayFromEnum(Rank);
    const suits = arrayFromEnum(Suit);
    this.cards = combine(ranks, suits);
    this.shuffle();
  }
  shuffle() {
    return shuffle(this.cards);
  }
}
