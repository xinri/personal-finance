import { AccountApi } from "./thunks";
import { _get, _post, _delete } from "../../util/xhr";
import { SerializedAccountWithRawOperations, AccountWithRawOperations, deserializeAccounts } from "./model";

export const accountApi: AccountApi = {
  getAccounts,
  addOperation,
  deleteOperation
};

function getAccounts(): Promise<AccountWithRawOperations[]> {
  return _get<SerializedAccountWithRawOperations[]>("/accounts").then(deserializeAccounts);
}

function addOperation(): Promise<void> {
  return _post("/operation");
}

function deleteOperation(id: string): Promise<void> {
  return _delete("/operation/" + id);
}
