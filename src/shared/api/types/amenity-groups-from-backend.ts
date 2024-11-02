export type AmenityGroupsFromBackend = { [key in string]: string[] }
export type AmenityGroups = AmenityGroup[];
type AmenityGroup = { name: string, amenities: string[] };