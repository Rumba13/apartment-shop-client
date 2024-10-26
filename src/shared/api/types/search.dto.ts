import {Currency} from "./currency";

export type SearchDto = {
    pageSize: number,
    page: number,
    minPrice: number,
    maxPrice: number,
    minArea: number,
    maxArea: number,
    sortBy: string, //TODO add sortBy type
    resultCurrency: Currency,
    fromDate?: string,
    toDate?: string,
    amenities?: string,
    maxGuestsQuantity: number,
    minGuestsQuantity: number
}