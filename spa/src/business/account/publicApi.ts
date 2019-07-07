import { fetchAccounts, addOperation, deleteOperation } from "./thunks";
import { getAllAccounts, getAccount, getAccountOperations, computeBalance } from "./selectors";
import { operationPublicApi } from "./operation";

export const accountPublicApi = {
  fetchAccounts,
  getAllAccounts,
  getAccount,
  getAccountOperations,
  computeBalance,
  addOperation,
  deleteOperation,
  ...operationPublicApi
};
