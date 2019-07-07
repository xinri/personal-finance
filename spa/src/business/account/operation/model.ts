import { Omit } from "../../../util/omit";

export interface RawOperation {
  id: string;
  date: Date;
  amount: number;
}

export type SerializedRawOperation = Omit<RawOperation, "date"> & {
  date: string;
};

export type Operation = RawOperation & {
  accountId: string;
};

export function deserializeRawOperations(operations: SerializedRawOperation[]): RawOperation[] {
  return operations.map(deserializeSingleRawOperation);
}

export function deserializeSingleRawOperation(operation: SerializedRawOperation): RawOperation {
  return {
    ...operation,
    date: new Date(operation.date)
  };
}
