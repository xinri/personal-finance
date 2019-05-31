import React from "react";
import { OperationHistoryComponent } from "./OperationHistory";
import { shallow, ShallowWrapper } from "enzyme";
import { Operation as IOperation } from "../../business/operation";
import { operationFixtures } from "../../business/operation/fixtures";
import { Operation } from "../Operation";

const { operation0, operation1, operation2 } = operationFixtures;

describe("<AddOperation />", () => {
  it("should not call onNewOperation when the user inputs 0 and clicks the add button", () => {
    // GIVEN
    const onOperationsFetched = jest.fn();
    const operations: IOperation[] = [operation0, operation1, operation2];
    const element = <OperationHistoryComponent operations={operations} onOperationsFetched={onOperationsFetched} />;

    // WHEN
    const wrapper: ShallowWrapper = shallow(element);

    // THEN
    expect(wrapper.findWhere(n => n.type() === Operation).length).toEqual(3);
  });
});
