import React from "react";
import renderer from "react-test-renderer";
import { OperationActions, Props } from "./OperationActions";

it("renders correctly", () => {
  const props: Props = {
    id: "0",
    onDelete: jest.fn()
  };
  const tree = renderer.create(<OperationActions {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
