import { Price } from "./price";
import { AmenityGroup } from "./amenity-groups-from-backend";
import { UUID } from "./uuid";

export type CreateApartmentDto = {
   title: string;
   description: string;
   roomQuantity: number;
   guestQuantity: number;
   adultPrice: number;
   teenPrice: number;
   kidPrice: number;
   babyPrice: number;
   petPrice: number;
   address: string;
   area: number;
   amenityGroups: AmenityGroup[];
   draft: boolean;
   tariff: UUID;
   sleepPlaces: string;
};
