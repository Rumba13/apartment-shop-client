import {Currency} from "./currency";

export type CreateApartmentDto = {
    title: string,
    description: string,
    roomsQuantity: number,
    bedsQuantity: number,
    guestQuantity: number,
    priceAmount: number,
    priceCurrency: Currency,
    address: string,
    square: number,
    amenities: string[],
    photos: any[],
}