import {UUID} from "./uuid";
import {Price} from "./price";
import {AmenityGroups} from "./amenity-groups-from-backend";
import {DescriptionListItem} from "./description-list-item";

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
    sleepPlaces: string
    adultPrice: number,
    teenPrice: number,
    kidPrice: number,
    babyPrice: number,
    petPrice: number,
    isTeenAllowed: boolean,
    isKidAllowed: boolean,
    isBabyAllowed: boolean,
    isPetAllowed: boolean,
    tariff: string,
    tariffId: UUID,
    rules: DescriptionListItem[],
    mainInfoItems: DescriptionListItem[],
    landlordPhoneNumber: string | null,
    landlordFirstName: string | null,
}