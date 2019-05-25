import React from "react";
import renderer from "react-test-renderer";
import { OperationActions, Props } from "./OperationActions";

it("renders correctly", () => {
  const props: Props = {
    onDelete: jest.fn()
  };
  const tree = renderer.create(<OperationActions {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
