import {Currency} from "./types/currency";
import {serverConnection} from "./server-connection.mocked";
import {FilterBounds} from "./types/filters-bounds";

class FiltersBoundsService {
    constructor() {
    }

    public async loadFiltersBound(resultCurrency: Currency): Promise<FilterBounds> {
        const response =  (await serverConnection.get("apartments/minmax-price-square", {
            params: {
                resultCurrency
            }
        })).data as FilterBounds;

        response.minPrice = +response.minPrice;
        response.maxPrice = +response.maxPrice;
        response.minSquare = +response.minSquare;
        response.maxSquare = +response.maxSquare;

        return response;
    }
}

export const filtersBoundsService = new FiltersBoundsService();