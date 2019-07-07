import { fetchOperations, addOperation, deleteOperation } from "./thunks";
import { operationDomain } from "./domain";
import { getAllOperations, getOperation, computeBalance } from "./selectors";

export const operationPublicApi = {
  fetchOperations,
  addOperation,
  deleteOperation,
  ...operationDomain.actionCreators,
  getAllOperations,
  getOperation,
  computeBalance
};
