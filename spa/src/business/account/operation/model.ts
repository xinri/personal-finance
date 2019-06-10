export interface Operation {
  id: string;
  date: Date;
  amount: number;
}

export type SerializedOperation = Omit<Operation, "date"> & {
  date: string;
};

export function deserializeOperations(operations: SerializedOperation[]): Operation[] {
  return operations.map(deserializeSingleOperation);
}

export function deserializeSingleOperation(operation: SerializedOperation): Operation {
  return {
    ...operation,
    date: new Date(operation.date)
  };
}
