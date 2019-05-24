import React from "react";
import renderer from "react-test-renderer";
import { OperationHistory, Props } from "./OperationHistory";

it("renders correctly", () => {
  const props: Props = {
    operations: [
      {
        id: "0",
        date: new Date(2019, 4, 24),
        amount: 10
      },
      {
        id: "1",
        date: new Date(2019, 4, 25),
        amount: -5
      }
    ]
  };
  const tree = renderer.create(<OperationHistory {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
