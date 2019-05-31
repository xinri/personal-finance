import { Operation, SerializedOperation } from "../../business/operation/model";
import { deserializeOperations } from "../../business/operation";
import { _get } from "../../util/xhr";

export function getOperations(): Promise<Operation[]> {
  return _get<SerializedOperation[]>("/operations").then(deserializeOperations);
}
