import {Currency} from "./currency";
import {Price} from "./price";

export type CreateApartmentDto = {
    title: string,
    description: string,
    roomsQuantity: number,
    bedsQuantity: number,
    guestsQuantity: number,
    price: Price,
    address: string,
    area: number,
    amenities: string[],
    draft:boolean
}