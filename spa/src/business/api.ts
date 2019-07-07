import { accountApi } from "./account/api";

export const applicationApi = {
  ...accountApi
};

export type ApplicationApi = typeof applicationApi;
