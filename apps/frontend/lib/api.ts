type APIResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  payload: T;
};
