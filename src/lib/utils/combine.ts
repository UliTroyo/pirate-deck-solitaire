/**
 * Combines the string values of two string arrays to return a new
 * array containing every possible combination of the two.
 * @param first - The first string array
 * @param second - The second string array
 * @returns A string array of combined `first` and `second` values
 * @example
 * ```ts
 * const first = ["top", "bottom"];
 * const second = ["right", "left"];
 * const corners = combine(first, second);
 *
 * console.log(corners);
 * // expected output: Array ["topright", "topleft", "bottomright", "bottomleft"]
 * ```
 */
export function combine(first: string[], second: string[]) {
  const combined = [];
  for (const start of first) {
    for (const end of second) {
      combined.push(`${start}${end}`);
    }
  }
  return combined;
}
