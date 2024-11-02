import {UUID} from "./uuid";
import {Price} from "./price";
import {AmenityGroups} from "./amenity-groups-from-backend";

export type Apartment = {
    id: UUID;
    title: string,
    landlordId: UUID,
    description: string,
    price: Price, //TODO map
    address: string,
    roomQuantity: number,
    bedQuantity: number,
    guestQuantity: number,
    photos: string[],
    amenityGroups: AmenityGroups,
    area: number,
    sleepPlaces:string
}