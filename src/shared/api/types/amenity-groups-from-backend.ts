export type AmenityGroupsFromBackend = { [key in string]: string[] };
export type AmenityGroups = AmenityGroup[];
export type AmenityGroup = { name: string; amenities: string[] };
