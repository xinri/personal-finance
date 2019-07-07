import { Thunk, ExtendedDispatch } from "../../definitions";
import { Operation } from "./model";
import { ApplicationState } from "../../state";
import { applicationActionCreators } from "../../actions";
import { batchActions } from "redux-batched-actions";

export const operationThunksCreators = {
  operationsFetched
};

export function operationsFetched(operations: Operation[]): Thunk {
  return (dispatch: ExtendedDispatch, _: () => ApplicationState) => {
    const insertOperationActions = operations.map((operation: Operation) => {
      return applicationActionCreators.account.operation.createInsertAction(
        operation.id,
        operation,
        "FETCHED_OPERATION_ADDED"
      );
    });
    const batchedAction = batchActions(insertOperationActions, "ALL_FETCHED_OPERATIONS_ADDED");
    dispatch(batchedAction);
  };
}
