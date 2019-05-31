import { Operation } from "./model";
import { OperationState } from "./state";

export const operationSelectors = {
  getAllOperations,
  getOperation,
  computeBalance
};

function getAllOperations({ operations }: OperationState): Operation[] {
  return operations;
}

function getOperation({ operations }: OperationState, id: string): Operation {
  const index: number = operations.findIndex(({ id: currentId }: Operation) => currentId === id);
  if (index === -1) {
    throw new Error(`No operation matches the following id: ${id}`);
  }
  const operation: Operation = operations[index];
  return operation;
}

function computeBalance({ operations }: OperationState): number {
  return operations.map(extractAmount).reduce(sum, 0);
}

function extractAmount({ amount }: Operation): number {
  return amount;
}

function sum(accumulated: number, current: number): number {
  return accumulated + current;
}
