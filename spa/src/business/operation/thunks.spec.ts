import { createOperationsFetchedThunk } from "./thunks";
import { Operation } from "./model";
import { operationFixtures } from "./fixtures";
import { mockStore, mockState } from "../../util/mockStore";
import { Thunk, Dispatchable } from "../definitions";
import { batchActions } from "redux-batched-actions";
import { applicationActionCreators } from "../actions";
import { ApplicationState } from "../state";

const { operation0, operation1, operation2 } = operationFixtures;

describe("Test of createOperationsFetchedThunk()", () => {
  it("should return a thunk that dispatches a batch of ADD_FETCHED_OPERATION actions, one per operation", () => {
    // GIVEN
    const initialState: ApplicationState = mockState();
    const store = mockStore(initialState);
    const operations: Operation[] = [operation0, operation1, operation2];

    // WHEN
    const thunk: Thunk = createOperationsFetchedThunk(operations);
    store.dispatch(thunk);

    // THEN
    const actualActions: Dispatchable[] = store.getActions();
    const expectedActions: Dispatchable[] = [
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
