import {
  createOperationsFetchingRequestedThunk,
  createOperationsFetchedThunk,
  createAddOperationRequestedThunk,
  createDeleteOperationRequestedThunk
} from "./thunks";
import { Operation } from "./model";
import { operationFixtures } from "./fixtures";
import { mockStore, mockState } from "../../util/mockStore";
import { Thunk, Dispatchable, ExtraArgument } from "../definitions";
import { batchActions } from "redux-batched-actions";
import { applicationActionCreators } from "../actions";
import { ApplicationState } from "../state";
import { RecursivePartial } from "../../util/recursivePartial";

const { operation0, operation1, operation2, operations } = operationFixtures;

describe("Test of createOperationsFetchingRequestedThunk()", () => {
  it("should return a thunk that calls the API, then dispatches an operationsFetchedThunk", async () => {
    // GIVEN
    const initialState: ApplicationState = mockState();
    const createOperationsFetchedThunk: Thunk = jest.fn().mockReturnValue({ type: "createOperationsFetchedThunk" });
    const extraArgument: RecursivePartial<ExtraArgument> = {
      thunkCreators: {
        createOperationsFetchedThunk
      }
    };
    const store = mockStore(extraArgument, initialState);
    const getOperations = jest.fn().mockReturnValue(Promise.resolve(operations));

    // WHEN
    const thunk: Thunk = createOperationsFetchingRequestedThunk({ getOperations });
    await store.dispatch(thunk);

    // THEN
    expect(getOperations).toHaveBeenCalled();
    expect(createOperationsFetchedThunk).toHaveBeenCalledWith(operations);
    const actualActions = store.getActions();
    const expectedActions = [{ type: "createOperationsFetchedThunk" }];
    expect(actualActions).toEqual(expectedActions);
  });
});

describe("Test of createOperationsFetchedThunk()", () => {
  it("should return a thunk that dispatches a batch of ADD_FETCHED_OPERATION actions, one per operation", () => {
    // GIVEN
    const initialState: ApplicationState = mockState();
    const store = mockStore({}, initialState);
    const operations: Operation[] = [operation0, operation1, operation2];

    // WHEN
    const thunk: Thunk = createOperationsFetchedThunk(operations);
    store.dispatch(thunk);

    // THEN
    const actualActions = store.getActions();
    const expectedActions = [
      batchActions(
        [
          applicationActionCreators.operation.createInsertAction(operation0.id, operation0, "ADD_FETCHED_OPERATION"),
          applicationActionCreators.operation.createInsertAction(operation1.id, operation1, "ADD_FETCHED_OPERATION"),
          applicationActionCreators.operation.createInsertAction(operation2.id, operation2, "ADD_FETCHED_OPERATION")
        ],
        "ADD_FETCHED_OPERATIONS"
      )
    ];
    expect(actualActions).toEqual(expectedActions);
  });
});

describe("Test of createAddOperationRequestedThunk()", () => {
  it("should return a thunk that calls the API, then dispatches an ADD_OPERATION action", async () => {
    // GIVEN
    const initialState: ApplicationState = mockState();
    const store = mockStore({}, initialState);
    const addOperation = jest.fn().mockReturnValue(Promise.resolve());
    const operation: Operation = operation0;

    // WHEN
    const thunk: Thunk = createAddOperationRequestedThunk({ addOperation }, operation);
    await store.dispatch(thunk);

    // THEN
    expect(addOperation).toHaveBeenCalled();
    const actualActions = store.getActions();
    const expectedActions = [
      applicationActionCreators.operation.createInsertAction(operation0.id, operation0, "ADD_OPERATION")
    ];
    expect(actualActions).toEqual(expectedActions);
  });
});

describe("Test of createDeleteOperationRequestedThunk()", () => {
  it("should return a thunk that calls the API, then dispatches a DELETE_OPERATION action", async () => {
    // GIVEN
    const initialState: ApplicationState = mockState();
    const store = mockStore({}, initialState);
    const deleteOperation = jest.fn().mockReturnValue(Promise.resolve());
    const id: string = operation0.id;

    // WHEN
    const thunk: Thunk = createDeleteOperationRequestedThunk({ deleteOperation }, id);
    await store.dispatch(thunk);

    // THEN
    expect(deleteOperation).toHaveBeenCalled();
    const actualActions = store.getActions();
    const expectedActions = [applicationActionCreators.operation.createDeleteAction(operation0.id, "DELETE_OPERATION")];
    expect(actualActions).toEqual(expectedActions);
  });
});
