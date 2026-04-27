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
