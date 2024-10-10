import {Currency} from "./currency";

export type FilterBounds = {
    currency: Currency,
    minPrice: number,
    maxPrice: number,
    minSquare: number,
    maxSquare: number
}