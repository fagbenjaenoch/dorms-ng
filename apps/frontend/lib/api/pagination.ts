import { createSerializer, parseAsInteger } from "nuqs";
import { defaultFilters } from "../utils";

export interface PaginationOptions {
  page: number;
  limit: number;
}

export const paginationSerializerObject = {
  page: parseAsInteger.withDefault(defaultFilters.page),
  limit: parseAsInteger.withDefault(defaultFilters.limit),
};
export const paginationSerializer = createSerializer(paginationSerializerObject);
