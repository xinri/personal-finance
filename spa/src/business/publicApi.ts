import { accountPublicApi } from "./account";

export const publicApi = {
  ...accountPublicApi
};

export type PublicApi = typeof publicApi;
