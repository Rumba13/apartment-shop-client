export type AmenityGroupsFromBackend = { [key in string]: string[] }
export type AmenityGroups = AmenityGroup[];
type AmenityGroup = { title: string, amenities: string[] };