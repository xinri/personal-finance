import { OperationState } from "./state";
import { operationFixtures } from "./fixtures";
import { operationSelectors } from "./selectors";
import { Operation } from "./model";

const { operation0, operation1, operation2 } = operationFixtures;

describe("Test of getOperation selector", () => {
  it("should return the operation corresponding to the id", () => {
    // GIVEN
    const operationState: OperationState = {
      [operation0.id]: operation0,
      [operation1.id]: operation1,
      [operation2.id]: operation2
    };
    const operationId: string = operation1.id;

    // WHEN
    const actual: Operation = operationSelectors.getOperation(operationState, operationId);

    // THEN
    const expected: Operation = operation1;
    expect(actual).toEqual(expected);
  });

  it("should throw an exception in case no operation exists that corresponds to the given id", () => {
    // GIVEN
    const operationState: OperationState = {
      [operation0.id]: operation0,
      [operation1.id]: operation1,
      [operation2.id]: operation2
    };
    const operationId: string = "Another id";

    // WHEN THEN
    expect(() => operationSelectors.getOperation(operationState, operationId)).toThrowError(
      "No operation matches the following id: Another id"
    );
  });
});

describe("Test of computeBalance selector", () => {
  it("should add amounts of all operations", () => {
    // GIVEN
    const operationState: OperationState = {
      [operation0.id]: operation0,
      [operation1.id]: operation1,
      [operation2.id]: operation2
    };

    // WHEN
    const actual: number = operationSelectors.computeBalance(operationState);

    // THEN
    const expected: number = operation0.amount + operation1.amount + operation2.amount;
    expect(actual).toEqual(expected);
  });
});
