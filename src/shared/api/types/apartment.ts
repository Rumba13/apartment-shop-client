import {UUID} from "./uuid";
import {Price} from "./price";

export type Apartment = {
    title:string,
    landlordId:UUID,
    description:string,
    price:Price,
    addressId: UUID,
    roomsQuantity:number,
    bedsQuantity:number,
    guestsQuantity:number,
    photos: string[]
}