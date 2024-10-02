import {UUID} from "./uuid";
import {Price} from "./price";

export type Apartment = {
    apartmentId: UUID;
    title:string,
    landlordId:UUID,
    description:string,
    price:Price,
    addressUUID: UUID,
    roomsQuantity:number,
    bedsQuantity:number,
    guestsQuantity:number,
    photos: string[],
    tags:string[],
    areaInSquareMeters:number
}