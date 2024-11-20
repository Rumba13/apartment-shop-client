import { Currency } from "./types/currency";
import { serverConnection } from "./server-connection";
import { FilterBounds } from "./types/filters-bounds";

class FiltersBoundsService {
   constructor() {}

   public async loadFiltersBound(resultCurrency: Currency): Promise<FilterBounds> {
      const response = (
         await serverConnection.get("apartments/minmax-price-area", {
            params: {
               resultCurrency,
            },
         })
      ).data as FilterBounds;

      response.minPrice = +response.minPrice;
      response.maxPrice = +response.maxPrice;
      response.minArea = +response.minArea;
      response.maxArea = +response.maxArea;

      return response;
   }
}

export const filtersBoundsService = new FiltersBoundsService();
