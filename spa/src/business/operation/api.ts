import { Operation, SerializedOperation, deserializeOperations } from "./model";
import { OperationApi } from "./thunks";
import { _get, _post, _delete } from "../../util/xhr";

export const operationApi: OperationApi = {
  getOperations,
  addOperation,
  deleteOperation
};

function getOperations(): Promise<Operation[]> {
  return _get<SerializedOperation[]>("/operations").then(deserializeOperations);
}

function addOperation(): Promise<void> {
  return _post("/operation");
}

function deleteOperation(id: string): Promise<void> {
  return _delete("/operation/" + id);
}
