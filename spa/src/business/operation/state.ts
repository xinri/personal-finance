import { Operation } from "./model";

export interface OperationState {
  operations: Operation[];
}

export const defaultState: OperationState = {
  operations: []
};
