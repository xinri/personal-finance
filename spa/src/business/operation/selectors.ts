import { Operation } from "./model";
import { OperationState } from "./state";

export const operationSelectors = {
  getAllOperations,
  getOperation,
  computeBalance
};

function getAllOperations(state: OperationState): Operation[] {
  return Object.keys(state).map((key: string) => state[key]);
}

function getOperation(state: OperationState, id: string): Operation {
  const operation: Operation | undefined = state[id];
  if (operation === undefined) {
    throw new Error(`No operation matches the following id: ${id}`);
  }
  return operation;
}

function computeBalance(state: OperationState): number {
  return getAllOperations(state)
    .map(extractAmount)
    .reduce(sum, 0);
}

function extractAmount({ amount }: Operation): number {
  return amount;
}

function sum(accumulated: number, current: number): number {
  return accumulated + current;
}
