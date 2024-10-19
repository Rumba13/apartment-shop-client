import {UUID} from "./uuid";
import {Currency} from "./currency";

export type UpdateApartmentPriceDto = {
    apartmentId: UUID,
    guestsCount: number,
    fromDate: string,
    toDate: string,
    resultCurrency:Currency
}