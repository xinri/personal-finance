import { ApplicationState } from "../state";
import { mockObject } from "../../util/mockObject";
import { Operation } from "./operation";
import { getAccountOperations, computeBalance } from "./selectors";
import { accountFixtures } from "./fixtures";
import { operationFixtures } from "./operation/fixtures";

const { account0 } = accountFixtures;
const { operation0, operation1, operation2 } = operationFixtures;

describe("Test of getAccountOperations()", () => {
  it("should return all operations corresponding to the given account", () => {
    // GIVEN
    const state = mockObject<ApplicationState>({
      account: {
        [account0.id]: {
          ...account0,
          operationIds: [operation0.id, operation1.id, operation2.id]
        }
      },
      operation: {
        [operation0.id]: operation0,
        [operation1.id]: operation1,
        [operation2.id]: operation2
      }
    });

    // WHEN
    const actual: Operation[] = getAccountOperations(state, account0.id);

    // THEN
    const expected: Operation[] = [operation0, operation1, operation2];
    expect(actual).toEqual(expected);
  });
});

describe("Test of computeBalance selector", () => {
  it("should add amounts of all operations", () => {
    // GIVEN
    const state = mockObject<ApplicationState>({
      account: {
        [account0.id]: {
          ...account0,
          operationIds: [operation0.id, operation1.id, operation2.id]
        }
      },
      operation: {
        [operation0.id]: operation0,
        [operation1.id]: operation1,
        [operation2.id]: operation2
      }
    });

    // WHEN
    const actual: number = computeBalance(state, account0.id);

    // THEN
    const expected: number = operation0.amount + operation1.amount + operation2.amount;
    expect(actual).toEqual(expected);
  });
});
