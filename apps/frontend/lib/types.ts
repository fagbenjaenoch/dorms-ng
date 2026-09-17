export type EntityType = "hostel" | "institution" | "neighborhood";

export type Amenity = "light" | "water" | "common room" | "wifi";

export const MaleHostelType = "male";

export const FemaleHostelType = "female";

export const MixedHostelType = "mixed";

export const HostelTypes = [MaleHostelType, FemaleHostelType, MixedHostelType] as const;

export type HostelType = (typeof HostelTypes)[number];
