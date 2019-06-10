import { Enhancer, PageModel } from "redux-integration-testing";
import { ExtendedDispatch } from "../business/definitions";
import { ApplicationState } from "../business/state";
import { Operation } from "../business/operation";
import { applicationSelectors } from "../business/selectors";
import { applicationThunksCreators } from "../business/thunks";
import { operationFixtures } from "../business/operation/fixtures";

const { operation0, operation1, operation2 } = operationFixtures;

export enum Count {
  first = 0,
  second = 1,
  third = 2
}

export interface Application extends PageModel {
  addOperation(operation: Operation): Promise<void>;
  deleteOperation(count: Count): Promise<void>;
  expectNumberOfOperationsToEqual(n: number): void;
  expectBalanceToEqual(value: number): void;
}

export const enhancer: Enhancer<ExtendedDispatch, ApplicationState, Application> = (
  dispatch: ExtendedDispatch,
  state: ApplicationState
) => {
  async function addOperation(operation: Operation): Promise<void> {
    await dispatch(applicationThunksCreators.createAddOperationRequestedThunk(operation));
  }
  async function deleteOperation(count: Count): Promise<void> {
    const operations: Operation[] = [operation0, operation1, operation2];
    const id: string = operations[count].id;
    await dispatch(applicationThunksCreators.createDeleteOperationRequestedThunk(id));
  }
  function expectNumberOfOperationsToEqual(n: number): void {
    expect(applicationSelectors.operation.getAllOperations(state.operation).length).toEqual(n);
  }
  function expectBalanceToEqual(value: number): void {
    expect(applicationSelectors.operation.computeBalance(state.operation)).toEqual(value);
  }
  return {
    addOperation,
    deleteOperation,
    expectNumberOfOperationsToEqual,
    expectBalanceToEqual
  };
};
