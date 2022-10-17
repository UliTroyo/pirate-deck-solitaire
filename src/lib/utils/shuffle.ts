/**
 * Randomly shuffles the values of a string array. Copy-pasted from [Lodash](https://github.com/lodash/lodash/blob/master/shuffle.js), available under the MIT license.
 * @param array - An array of string values
 * @returns A copy of the input array but with its values shuffled randomly
 */
export function shuffle(array: string[]) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  let index = -1;
  const lastIndex = length - 1;
  const result = copyArray(array);
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }
  return result;
}

function copyArray(source: string[], array?: string[]) {
  let index = -1;
  const length = source.length;

  array || (array = new Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
