import { Range } from "../api/types/range";

export function inRange(range: Range, value: number): boolean {
   return value <= range.max && value >= range.min;
}
