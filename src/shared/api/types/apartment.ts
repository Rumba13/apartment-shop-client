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
    guestQuantity:number, //TODO update naming when backend rename to guestsQuantity
    photos: string[],
    amenities:string[],
    square:number//TODO update naming when backend rename to area
}