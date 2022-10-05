export function combine(first: string[], second: string[]) {
  const combined = [];
  for (const start of first) {
    for (const end of second) {
      combined.push(`${start}${end}`);
    }
  }
  return combined;
}
