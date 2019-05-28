import { Operation as IOperation, SerializedOperation } from "../../interfaces/Operation";
import { _get } from "../../util/xhr";

export function getOperations(): Promise<IOperation[]> {
  return _get<SerializedOperation[]>("/operations").then(deserializeOperations);
}

function deserializeOperations(operations: SerializedOperation[]): IOperation[] {
  return operations.map(deserializeSingleOperation);
}

function deserializeSingleOperation(operation: SerializedOperation): IOperation {
  return {
    ...operation,
    date: new Date(operation.date)
  };
}
