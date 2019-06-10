import { Thunk, ExtendedDispatch } from "../../definitions";
import { Operation } from "./model";
import { ApplicationState } from "../../state";
import { applicationActionCreators, ApplicationAction } from "../../actions";
import { BatchAction, batchActions } from "redux-batched-actions";

export type OperationApi = GetOperationsApi & AddOperationApi & DeleteOperationApi;

export const operationThunksCreators = {
  createOperationsFetchingRequestedThunk,
  createOperationsFetchedThunk,
  createAddOperationRequestedThunk,
  createDeleteOperationRequestedThunk
};

interface GetOperationsApi {
  getOperations(): Promise<Operation[]>;
}

export function createOperationsFetchingRequestedThunk(): Thunk {
  return async (
    dispatch: ExtendedDispatch,
    _: () => ApplicationState,
    {
      thunkCreators: {
        account: {
          operation: { createOperationsFetchedThunk }
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
    dispatch(createOperationsFetchedThunk(operations));
  };
}

export function createOperationsFetchedThunk(operations: Operation[]): Thunk {
  return (dispatch: ExtendedDispatch, _: () => ApplicationState) => {
    const actions = operations.map((operation: Operation) => {
      return applicationActionCreators.account.operation.createInsertAction(
        operation.id,
        operation,
        "ADD_FETCHED_OPERATION"
      );
    });
    const batchedAction: BatchAction = batchActions(actions, "ADD_FETCHED_OPERATIONS");
    dispatch(batchedAction);
  };
}

interface AddOperationApi {
  addOperation(operation: Operation): Promise<void>;
}

export function createAddOperationRequestedThunk(operation: Operation): Thunk {
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
      "ADD_OPERATION"
    );
    dispatch(action);
  };
}

interface DeleteOperationApi {
  deleteOperation(id: string): Promise<void>;
}

export function createDeleteOperationRequestedThunk(id: string): Thunk {
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
      "DELETE_OPERATION"
    );
    dispatch(action);
  };
}
