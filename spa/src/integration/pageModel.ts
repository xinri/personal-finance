import { Enhancer, PageModel } from "redux-integration-testing";
import { ExtendedDispatch } from "../business/definitions";
import { ApplicationState } from "../business/state";
import { RawOperation, Operation } from "../business/account/operation";
import { accountFixtures } from "../business/account";
import { accountThunksCreators } from "../business/account/thunks";
import { accountSelectors } from "../business/account/selectors";

export enum Count {
  first = 0,
  second = 1,
  third = 2
}

export interface Application extends PageModel {
  onAccount(
    count: Count
  ): {
    addOperation(operation: RawOperation): Promise<void>;
    deleteOperation(operationId: string): Promise<void>;
    expectNumberOfOperationsToEqual(n: number): void;
    expectBalanceToEqual(value: number): void;
  };
}

export const enhancer: Enhancer<ExtendedDispatch, ApplicationState, Application> = (
  dispatch: ExtendedDispatch,
  state: ApplicationState
) => {
  function onAccount(count: Count) {
    const accountId = accountFixtures.accounts[count].id;

    async function addOperation(operation: Operation): Promise<void> {
      await dispatch(accountThunksCreators.addOperation(accountId, operation));
    }

    async function deleteOperation(operationId: string): Promise<void> {
      await dispatch(accountThunksCreators.deleteOperation(operationId));
    }

    function expectNumberOfOperationsToEqual(n: number): void {
      expect(accountSelectors.getAccountOperations(state, accountId).length).toEqual(n);
    }

    function expectBalanceToEqual(value: number): void {
      expect(accountSelectors.computeBalance(state, accountId)).toEqual(value);
    }

    return {
      addOperation,
      deleteOperation,
      expectNumberOfOperationsToEqual,
      expectBalanceToEqual
    };
  }
  return { onAccount };
};
