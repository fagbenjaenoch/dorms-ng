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

export interface SearchResult {
  entity_id: string;
  entity_type: string;
  entity: string;
  slug: string;
  address: string;
}
