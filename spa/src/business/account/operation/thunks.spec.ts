import { operationsFetched } from "./thunks";
import { Operation } from "./model";
import { operationFixtures } from "./fixtures";
import { mockStore } from "../../../util/mockStore";
import { Thunk } from "../../definitions";
import { batchActions } from "redux-batched-actions";
import { applicationActionCreators } from "../../actions";
import { ApplicationState } from "../../state";
import { mockObject } from "../../../util/mockObject";

const { operation0, operation1, operation2 } = operationFixtures;

describe("Test of operationsFetched()", () => {
  it("should return a thunk that dispatches a batch of FETCHED_OPERATION_ADDED actions, one per operation", () => {
    // GIVEN
    const initialState = mockObject<ApplicationState>({});
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
