import { UUID } from "./uuid";
import { Currency } from "./currency";

export type UpdateApartmentPriceDto = {
   apartmentId: UUID;
   fromDate: string;
   toDate: string;
   resultCurrency: Currency;
   adultQuantity: number;
   petQuantity: number;
   kidQuantity: number;
   teenQuantity: number;
   babyQuantity: number;
};
