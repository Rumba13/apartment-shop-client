import {AmenityGroups, AmenityGroupsFromBackend} from "../api/types/amenity-groups-from-backend";

export function mapApartmentAmenities(amenityGroupFromBackend: AmenityGroupsFromBackend) {
    const amenityGroup: AmenityGroups = []

    for (const amenityGroupTitle in amenityGroupFromBackend) {
        const amenities = amenityGroupFromBackend[amenityGroupTitle];
        amenityGroup.push({
            name: amenityGroupTitle,
            amenities
        })
    }
    return amenityGroup;
}