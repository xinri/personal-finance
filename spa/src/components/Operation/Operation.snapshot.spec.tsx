import React from "react";
import renderer from "react-test-renderer";
import { Operation, Props } from "./Operation";

it("renders correctly", () => {
  const props: Props = {
    operation: {
      id: "0",
      date: new Date(2019, 4, 24),
      amount: 10
    }
  };
  const tree = renderer.create(<Operation {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
