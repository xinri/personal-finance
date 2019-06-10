import { accountApi } from "./account/api";

export const applicationApi = {
  account: accountApi
};

export type ApplicationApi = typeof applicationApi;
