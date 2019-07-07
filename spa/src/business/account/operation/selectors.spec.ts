import { operationFixtures } from "./fixtures";
import { operationSelectors } from "./selectors";
import { Operation } from "./model";
import { ApplicationState } from "../../state";
import { mockObject } from "../../../util/mockObject";

const { operation0, operation1, operation2 } = operationFixtures;

describe("Test of getOperation selector", () => {
  it("should return the operation corresponding to the id", () => {
    // GIVEN
    const state = mockObject<ApplicationState>({
      operation: {
        [operation0.id]: operation0,
        [operation1.id]: operation1,
        [operation2.id]: operation2
      }
    });
    const operationId: string = operation1.id;

    // WHEN
    const actual: Operation = operationSelectors.getOperation(state, operationId);

    // THEN
    const expected: Operation = operation1;
    expect(actual).toEqual(expected);
  });

  it("should throw an exception in case no operation exists that corresponds to the given id", () => {
    // GIVEN
    const state = mockObject<ApplicationState>({
      operation: {
        [operation0.id]: operation0,
        [operation1.id]: operation1,
        [operation2.id]: operation2
      }
    });
    const operationId: string = "Another id";

    // WHEN THEN
    expect(() => operationSelectors.getOperation(state, operationId)).toThrowError(
      "No operation matches the following id: Another id"
    );
  });
});
