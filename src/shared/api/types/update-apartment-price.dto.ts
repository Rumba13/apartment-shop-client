import {UUID} from "./uuid";

export type UpdateApartmentPriceDto = {
    apartmentId: UUID,
    guestsCount: number,
    fromDate: string,
    toDate: string
}