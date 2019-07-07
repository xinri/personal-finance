import { fetchOperations, operationsFetched, addOperation, deleteOperation } from "./thunks";
import { Operation } from "./model";
import { operationFixtures } from "./fixtures";
import { mockStore, mockState } from "../../../util/mockStore";
import { Thunk, ExtraArgument } from "../../definitions";
import { batchActions } from "redux-batched-actions";
import { applicationActionCreators } from "../../actions";
import { ApplicationState } from "../../state";
import { RecursivePartial } from "../../../util/recursivePartial";

const { operation0, operation1, operation2, operations } = operationFixtures;

describe("Test of fetchOperations()", () => {
  it("should return a thunk that calls the API, then dispatches an operationsFetchedThunk", async () => {
    // GIVEN
    const operationsFetched: Thunk = jest.fn().mockReturnValue({ type: "operationsFetched" });
    const getOperations = jest.fn().mockResolvedValue(operations);
    const extraArgument: RecursivePartial<ExtraArgument> = {
      thunkCreators: {
        account: {
          operation: {
            operationsFetched
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
    const thunk: Thunk = fetchOperations();
    await store.dispatch(thunk);

    // THEN
    expect(getOperations).toHaveBeenCalled();
    expect(operationsFetched).toHaveBeenCalledWith(operations);
    const actualActions = store.getActions();
    const expectedActions = [{ type: "operationsFetched" }];
    expect(actualActions).toEqual(expectedActions);
  });
});

describe("Test of operationsFetched()", () => {
  it("should return a thunk that dispatches a batch of FETCHED_OPERATION_ADDED actions, one per operation", () => {
    // GIVEN
    const initialState: ApplicationState = mockState();
    const store = mockStore({}, initialState);
    const operations: Operation[] = [operation0, operation1, operation2];

    // WHEN
    const thunk: Thunk = operationsFetched(operations);
    store.dispatch(thunk);

    // THEN
    const actualActions = store.getActions();
    const expectedActions = [
      batchActions(
        [
          applicationActionCreators.account.operation.createInsertAction(
            operation0.id,
            operation0,
            "FETCHED_OPERATION_ADDED"
          ),
          applicationActionCreators.account.operation.createInsertAction(
            operation1.id,
            operation1,
            "FETCHED_OPERATION_ADDED"
          ),
          applicationActionCreators.account.operation.createInsertAction(
            operation2.id,
            operation2,
            "FETCHED_OPERATION_ADDED"
          )
        ],
        "ALL_FETCHED_OPERATIONS_ADDED"
      )
    ];
    expect(actualActions).toEqual(expectedActions);
  });
});

describe("Test of addOperation()", () => {
  it("should return a thunk that calls the API, then dispatches an OPERATION_ADDED action", async () => {
    // GIVEN
    const addOperationApi = jest.fn().mockResolvedValue("OK");
    const extraArgument: RecursivePartial<ExtraArgument> = {
      api: {
        account: {
          operation: {
            addOperation: addOperationApi
          }
        }
      }
    };
    const initialState: ApplicationState = mockState();
    const store = mockStore(extraArgument, initialState);
    const operation: Operation = operation0;

    // WHEN
    const thunk: Thunk = addOperation(operation);
    await store.dispatch(thunk);

    // THEN
    expect(addOperationApi).toHaveBeenCalled();
    const actualActions = store.getActions();
    const expectedActions = [
      applicationActionCreators.account.operation.createInsertAction(operation0.id, operation0, "OPERATION_ADDED")
    ];
    expect(actualActions).toEqual(expectedActions);
  });
});

describe("Test of deleteOperation()", () => {
  it("should return a thunk that calls the API, then dispatches a OPERATION_DELETED action", async () => {
    // GIVEN
    const deleteOperationApi = jest.fn().mockResolvedValue("OK");
    const extraArgument: RecursivePartial<ExtraArgument> = {
      api: {
        account: {
          operation: {
            deleteOperation: deleteOperationApi
          }
        }
      }
    };
    const initialState: ApplicationState = mockState();
    const store = mockStore(extraArgument, initialState);
    const id: string = operation0.id;

    // WHEN
    const thunk: Thunk = deleteOperation(id);
    await store.dispatch(thunk);

    // THEN
    expect(deleteOperationApi).toHaveBeenCalled();
    const actualActions = store.getActions();
    const expectedActions = [
      applicationActionCreators.account.operation.createDeleteAction(operation0.id, "OPERATION_DELETED")
    ];
    expect(actualActions).toEqual(expectedActions);
  });
});
