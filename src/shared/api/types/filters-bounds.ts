import { Currency } from "./currency";

export type FilterBounds = {
   currency: Currency;
   minPrice: number;
   maxPrice: number;
   minArea: number;
   maxArea: number;
};
