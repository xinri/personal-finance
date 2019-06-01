import { Thunk, ExtendedDispatch } from "../definitions";
import { Operation } from "./model";
import { ApplicationState } from "../state";
import { applicationActionCreators } from "../actions";
import { BatchAction, batchActions } from "redux-batched-actions";

export const operationThunksCreators = {
  createOperationsFetchedThunk
};

export function createOperationsFetchedThunk(operations: Operation[]): Thunk {
  return (dispatch: ExtendedDispatch, _: () => ApplicationState) => {
    const actions = operations.map((operation: Operation) => {
      return applicationActionCreators.operation.createInsertAction(operation.id, operation, "ADD_FETCHED_OPERATION");
    });
    const batchedAction: BatchAction = batchActions(actions, "ADD_FETCHED_OPERATIONS");
    dispatch(batchedAction);
  };
}
