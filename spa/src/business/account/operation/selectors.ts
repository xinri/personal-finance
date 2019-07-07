import { Operation } from "./model";
import { ApplicationState } from "../../state";

export const operationSelectors = {
  getOperation
};

export function getOperation({ operation: state }: ApplicationState, id: string): Operation {
  const operation: Operation | undefined = state[id];
  if (operation === undefined) {
    throw new Error(`No operation matches the following id: ${id}`);
  }
  return operation;
}
