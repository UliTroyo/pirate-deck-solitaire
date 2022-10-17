/**
 * Takes a TypeScript enum and returns a **string[]** that I can use
 * from within Svelte to... enumerate its values as an array.
 * You might wonder why not just start with an array in the
 * first place? I just really like enums.
 *
 * @param tsStringEnum - A TypeScript enum with string values only
 *
 * @returns A **string[]** of each enum string value
 *
 * @example
 * ```ts
 * enum Suit {
 *   Clubs = "♣",
 *   Diamonds = "♦",
 *   Hearts = "♥",
 *   Spades = "♠",
 * }
 * const suit = arrayFromEnum(Suit);
 * console.log(suit);
 * // expected output: Array ["♣", "♦", "♥", "♠"]
 * ```
 */
export function arrayFromEnum(tsStringEnum: any) {
  let svelteEnum: string[] = [];
  for (const enumValue in tsStringEnum) {
    if (typeof tsStringEnum[enumValue] != "string") continue;
    svelteEnum = [...svelteEnum, tsStringEnum[enumValue]];
  }
  return svelteEnum;
}
