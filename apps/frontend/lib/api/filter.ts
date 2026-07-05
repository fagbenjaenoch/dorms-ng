import {
  parseAsStringLiteral,
  parseAsInteger,
  parseAsBoolean,
  parseAsString,
  createSerializer,
} from "nuqs";
import { defaultFilters } from "../utils";

export const sortByValues = ["price-asc", "price-desc"] as const;
export type SortByValue = (typeof sortByValues)[number];

export const areaTypes = ["institution", "neighborhood"] as const;
export type AreaType = (typeof areaTypes)[number];

export const hostelFilterParsers = {
  sortBy: parseAsStringLiteral(sortByValues).withDefault(defaultFilters.sortBy),
  minPrice: parseAsInteger.withDefault(defaultFilters.minPrice),
  maxPrice: parseAsInteger.withDefault(defaultFilters.maxPrice),
  isVerified: parseAsBoolean.withDefault(false),
};
export const hostelFilterSerializer = createSerializer(hostelFilterParsers);

export type HostelFilterOptions = {
  sortBy: SortByValue;
  minPrice: number;
  maxPrice: number;
  isVerified: boolean;
};

export const areaFilterParsers = {
  searchTerm: parseAsString,
  areaType: parseAsStringLiteral(areaTypes),
  areaId: parseAsString,
};
export const areaSerializer = createSerializer(areaFilterParsers);

export type AreaOptions = {
  areaType: AreaType | null;
  areaId: string | null;
};
