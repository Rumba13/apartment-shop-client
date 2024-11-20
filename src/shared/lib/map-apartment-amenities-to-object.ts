import { AmenityGroups, AmenityGroupsFromBackend } from "../api/types/amenity-groups-from-backend";

export function mapApartmentAmenitiesToObject(amenityGroupFromBackend: AmenityGroups) {
   const amenityGroups: AmenityGroupsFromBackend = {};

   for (const amenityGroupTitle in amenityGroupFromBackend) {
      const amenities = amenityGroupFromBackend[amenityGroupTitle];
      amenityGroups[amenities.name] = amenities.amenities;
   }

   return amenityGroups;
}
