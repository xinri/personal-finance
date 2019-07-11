import { Thunk, ExtendedDispatch } from "../definitions";
import { Account, AccountWithRawOperations } from "./model";
import { ApplicationState } from "../state";
import { BatchAction, batchActions } from "redux-batched-actions";
import { operationThunksCreators } from "./operation/thunks";
import { RawOperation, Operation } from "./operation";
import { applicationActionCreators } from "../actions";
import flatMap from "lodash.flatmap";
import { accountApi } from "./api";

export type AccountApi = GetAccountsApi & AddOperationApi & DeleteOperationApi;

export const accountThunksCreators = {
  fetchAccounts,
  accountsFetched,
  addOperation,
  deleteOperation,
  ...operationThunksCreators
};

interface GetAccountsApi {
  getAccounts(): Promise<AccountWithRawOperations[]>;
}

export function fetchAccounts(): Thunk {
  return async (
    dispatch: ExtendedDispatch,
    _: () => ApplicationState,
    { thunkCreators: { accountsFetched, operationsFetched } }
  ) => {
    const accountsWithOperations: AccountWithRawOperations[] = await accountApi.getAccounts();

    const allAccountsOperations: Operation[] = flatMap(
      accountsWithOperations,
      ({ id, operations }: AccountWithRawOperations) => operations.map(enhanceOperationWithAccountId(id))
    );
    dispatch(operationsFetched(allAccountsOperations));

    const accounts: Account[] = accountsWithOperations.map(({ id, operations }: AccountWithRawOperations) => ({
      id,
      operationIds: operations.map(({ id }: RawOperation) => id)
    }));
    dispatch(accountsFetched(accounts));
  };
}

function enhanceOperationWithAccountId(accountId: string) {
  return (rawOperation: RawOperation): Operation => {
    return {
      ...rawOperation,
      accountId
    };
  };
}

export function accountsFetched(accounts: Account[]): Thunk {
  return (dispatch: ExtendedDispatch, _: () => ApplicationState) => {
    const insertAccountActions = accounts.map((account: Account) => {
      return applicationActionCreators.account.createInsertAction(account.id, account, "FETCHED_ACCOUNT_ADDED");
    });

    const batchedAction: BatchAction = batchActions(insertAccountActions, "ALL_FETCHED_ACCOUNTS_ADDED");

    dispatch(batchedAction);
  };
}

interface AddOperationApi {
  addOperation(accountId: string, operation: RawOperation): Promise<void>;
}

export function addOperation(accountId: string, operation: RawOperation): Thunk {
  return async (dispatch: ExtendedDispatch, getState: () => ApplicationState, { selectors: { getAccount } }) => {
    await accountApi.addOperation(accountId, operation);

    const state: ApplicationState = getState();
    const account: Account = getAccount(state, accountId);
    const updateAccountAction = applicationActionCreators.account.createUpdateAction(
      accountId,
      {
        operationIds: [...account.operationIds, operation.id]
      },
      "ACCOUNT_UPDATED"
    );

    const insertOperationAction = applicationActionCreators.account.operation.createInsertAction(
      operation.id,
      { ...operation, accountId },
      "OPERATION_ADDED"
    );

    const batchAction = batchActions([updateAccountAction, insertOperationAction], "OPERATION_ADDED");

    dispatch(batchAction);
  };
}

interface DeleteOperationApi {
  deleteOperation(id: string): Promise<void>;
}

export function deleteOperation(operationId: string): Thunk {
  return async (
    dispatch: ExtendedDispatch,
    getState: () => ApplicationState,
    { selectors: { getOperation, getAccount } }
  ) => {
    await accountApi.deleteOperation(operationId);

    const state: ApplicationState = getState();
    const { accountId } = getOperation(state, operationId);
    const { operationIds } = getAccount(state, accountId);
    const updatedOperationIds = removeOperationId(operationIds, operationId);
    const updateAccountAction = applicationActionCreators.account.createUpdateAction(
      accountId,
      {
        operationIds: updatedOperationIds
      },
      "ACCOUNT_UPDATED"
    );

    const deleteOperationAction = applicationActionCreators.account.operation.createDeleteAction(
      operationId,
      "OPERATION_DELETED"
    );

    const batchAction = batchActions([updateAccountAction, deleteOperationAction], "OPERATION_DELETED");

    dispatch(batchAction);
  };
}

function removeOperationId(operationIds: string[], operationId: string): string[] {
  const updatedOperationIds = [...operationIds];
  const index = operationIds.findIndex(id => id === operationId);
  if (index === -1) {
    throw new Error(`The account is expected to have an operation with id ${operationId} but it doesn't`);
  }
  updatedOperationIds.splice(index, 1);
  return updatedOperationIds;
}
