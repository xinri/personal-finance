import React from "react";
import renderer from "react-test-renderer";
import { OperationComponent, Props } from "./Operation";

it("renders correctly", () => {
  const props: Props = {
    id: "0",
    operation: {
      id: "0",
      date: new Date(2019, 4, 24),
      amount: 10
    },
    onDelete: jest.fn()
  };
  const tree = renderer.create(<OperationComponent {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
