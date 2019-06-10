import {
  createOperationsFetchingRequestedThunk,
  createOperationsFetchedThunk,
  createAddOperationRequestedThunk,
  createDeleteOperationRequestedThunk
} from "./thunks";
import { Operation } from "./model";
import { operationFixtures } from "./fixtures";
import { mockStore, mockState } from "../../../util/mockStore";
import { Thunk, ExtraArgument } from "../../definitions";
import { batchActions } from "redux-batched-actions";
import { applicationActionCreators } from "../../actions";
import { ApplicationState } from "../../state";
import { RecursivePartial } from "../../../util/recursivePartial";

const { operation0, operation1, operation2, operations } = operationFixtures;

describe("Test of createOperationsFetchingRequestedThunk()", () => {
  it("should return a thunk that calls the API, then dispatches an operationsFetchedThunk", async () => {
    // GIVEN
    const createOperationsFetchedThunk: Thunk = jest.fn().mockReturnValue({ type: "createOperationsFetchedThunk" });
    const getOperations = jest.fn().mockResolvedValue(operations);
    const extraArgument: RecursivePartial<ExtraArgument> = {
      thunkCreators: {
        account: {
          operation: {
            createOperationsFetchedThunk
          }
        }
      },
      api: {
        account: {
          operation: {
            getOperations
          }
        }
      }
    };
    const initialState: ApplicationState = mockState();
    const store = mockStore(extraArgument, initialState);

    // WHEN
    const thunk: Thunk = createOperationsFetchingRequestedThunk();
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
          applicationActionCreators.account.operation.createInsertAction(
            operation0.id,
            operation0,
            "ADD_FETCHED_OPERATION"
          ),
          applicationActionCreators.account.operation.createInsertAction(
            operation1.id,
            operation1,
            "ADD_FETCHED_OPERATION"
          ),
          applicationActionCreators.account.operation.createInsertAction(
            operation2.id,
            operation2,
            "ADD_FETCHED_OPERATION"
          )
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
    const addOperation = jest.fn().mockResolvedValue("OK");
    const extraArgument: RecursivePartial<ExtraArgument> = {
      api: {
        account: {
          operation: {
            addOperation
          }
        }
      }
    };
    const initialState: ApplicationState = mockState();
    const store = mockStore(extraArgument, initialState);
    const operation: Operation = operation0;

    // WHEN
    const thunk: Thunk = createAddOperationRequestedThunk(operation);
    await store.dispatch(thunk);

    // THEN
    expect(addOperation).toHaveBeenCalled();
    const actualActions = store.getActions();
    const expectedActions = [
      applicationActionCreators.account.operation.createInsertAction(operation0.id, operation0, "ADD_OPERATION")
    ];
    expect(actualActions).toEqual(expectedActions);
  });
});

describe("Test of createDeleteOperationRequestedThunk()", () => {
  it("should return a thunk that calls the API, then dispatches a DELETE_OPERATION action", async () => {
    // GIVEN
    const deleteOperation = jest.fn().mockResolvedValue("OK");
    const extraArgument: RecursivePartial<ExtraArgument> = {
      api: {
        account: {
          operation: {
            deleteOperation
          }
        }
      }
    };
    const initialState: ApplicationState = mockState();
    const store = mockStore(extraArgument, initialState);
    const id: string = operation0.id;

    // WHEN
    const thunk: Thunk = createDeleteOperationRequestedThunk(id);
    await store.dispatch(thunk);

    // THEN
    expect(deleteOperation).toHaveBeenCalled();
    const actualActions = store.getActions();
    const expectedActions = [
      applicationActionCreators.account.operation.createDeleteAction(operation0.id, "DELETE_OPERATION")
    ];
    expect(actualActions).toEqual(expectedActions);
  });
});
