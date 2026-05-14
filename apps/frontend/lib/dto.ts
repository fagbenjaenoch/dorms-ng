import { STRING_LITERAL_DROP_BUNDLE } from "next/dist/shared/lib/constants";
import { CreateInstitutionData } from "./forms";

export type APIResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  payload: T;
};

export type BaseAuthPayload = {
  id: string;
  fullname: string;
  email: string;
  token: string;
};

export type SigninPayload = BaseAuthPayload & {
  provider: "password" | "google";
};

export type CreateInstitutionPayload = CreateInstitutionData;

export type CreateNeighborhood = {
  name: string;
  institutionId: string;
};

export interface SearchResult {
  entity_id: string;
  entity_type: string;
  entity: string;
  slug: string;
  address: string;
}

export interface Hostel {
  name: string;
  address: string;
  city: string;
  description: string;
  is_verified: boolean;
  primary_photo_url: string;
}

export type Institution = {
  id: string;
  name: string;
  acronym: string;
  city: string;
  longitude: number;
  latitude: number;
};

export type Neighborhood = {
  id: string;
  name: string;
};
