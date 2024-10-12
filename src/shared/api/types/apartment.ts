import {UUID} from "./uuid";
import {Price} from "./price";

export type Apartment = {
    id: UUID;
    title:string,
    landlordId:UUID,
    description:string,
    price:Price, //TODO map
    address: string,
    roomsQuantity:number,
    bedsQuantity:number,
    guestsQuantity:number,
    photos: string[],
    amenities:string[],
    area:number
}