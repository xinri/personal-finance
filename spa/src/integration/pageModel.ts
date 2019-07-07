import { Enhancer, PageModel } from "redux-integration-testing";
import { ExtendedDispatch } from "../business/definitions";
import { ApplicationState } from "../business/state";
import { RawOperation, Operation } from "../business/account/operation";
import { accountFixtures } from "../business/account";
import { operationFixtures } from "../business/account/operation/fixtures";
import business from "../business";

const { operation0, operation1, operation2 } = operationFixtures;

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
      await dispatch(business.addOperation(accountId, operation));
    }

    async function deleteOperation(operationId: string): Promise<void> {
      await dispatch(business.deleteOperation(operationId));
    }

    function expectNumberOfOperationsToEqual(n: number): void {
      expect(business.getAccountOperations(state, accountId).length).toEqual(n);
    }

    function expectBalanceToEqual(value: number): void {
      expect(business.computeBalance(state, accountId)).toEqual(value);
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
