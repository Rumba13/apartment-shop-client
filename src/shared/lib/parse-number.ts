export function parseNumber(string: string): number | null {
   const parsedValue = new RegExp("[0-9]+").exec(string);

   if (parsedValue === null) return null;

   return +parsedValue[0];
}
