import { Thunk, ExtendedDispatch } from "../../definitions";
import { Operation } from "./model";
import { ApplicationState } from "../../state";
import { applicationActionCreators, ApplicationAction } from "../../actions";
import { BatchAction, batchActions } from "redux-batched-actions";

export type OperationApi = GetOperationsApi & AddOperationApi & DeleteOperationApi;

export const operationThunksCreators = {
  fetchOperations,
  operationsFetched,
  addOperation,
  deleteOperation
};

interface GetOperationsApi {
  getOperations(): Promise<Operation[]>;
}

export function fetchOperations(): Thunk {
  return async (
    dispatch: ExtendedDispatch,
    _: () => ApplicationState,
    {
      thunkCreators: {
        account: {
          operation: { operationsFetched }
        }
      },
      api: {
        account: {
          operation: { getOperations }
        }
      }
    }
  ) => {
    const operations: Operation[] = await getOperations();
    dispatch(operationsFetched(operations));
  };
}

export function operationsFetched(operations: Operation[]): Thunk {
  return (dispatch: ExtendedDispatch, _: () => ApplicationState) => {
    const actions = operations.map((operation: Operation) => {
      return applicationActionCreators.account.operation.createInsertAction(
        operation.id,
        operation,
        "FETCHED_OPERATION_ADDED"
      );
    });
    const batchedAction: BatchAction = batchActions(actions, "ALL_FETCHED_OPERATIONS_ADDED");
    dispatch(batchedAction);
  };
}

interface AddOperationApi {
  addOperation(operation: Operation): Promise<void>;
}

export function addOperation(operation: Operation): Thunk {
  return async (
    dispatch: ExtendedDispatch,
    _: () => ApplicationState,
    {
      api: {
        account: {
          operation: { addOperation }
        }
      }
    }
  ) => {
    await addOperation(operation);
    const action: ApplicationAction = applicationActionCreators.account.operation.createInsertAction(
      operation.id,
      operation,
      "OPERATION_ADDED"
    );
    dispatch(action);
  };
}

interface DeleteOperationApi {
  deleteOperation(id: string): Promise<void>;
}

export function deleteOperation(id: string): Thunk {
  return async (
    dispatch: ExtendedDispatch,
    _: () => ApplicationState,
    {
      api: {
        account: {
          operation: { deleteOperation }
        }
      }
    }
  ) => {
    await deleteOperation(id);
    const action: ApplicationAction = applicationActionCreators.account.operation.createDeleteAction(
      id,
      "OPERATION_DELETED"
    );
    dispatch(action);
  };
}
