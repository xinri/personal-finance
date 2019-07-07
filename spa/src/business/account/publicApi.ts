import { getAllAccounts, getAccount } from "./selectors";
import { operationPublicApi } from "./operation";

export const accountPublicApi = {
  getAllAccounts,
  getAccount,
  operation: operationPublicApi
};
