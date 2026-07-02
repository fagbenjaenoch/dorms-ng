import {
  parseAsStringLiteral,
  parseAsInteger,
  parseAsBoolean,
  parseAsString,
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
  searchTerm: parseAsString,
  areaType: parseAsStringLiteral(areaTypes),
  areaId: parseAsString,
};
