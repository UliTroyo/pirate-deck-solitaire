export function svelteEnumFrom(tsStringEnum: any) {
  let svelteEnum: any[] = [];
  for (const enumValue in tsStringEnum) {
    if (typeof tsStringEnum[enumValue] != "string") continue;
    svelteEnum = [...svelteEnum, tsStringEnum[enumValue]];
  }
  return svelteEnum;
}
