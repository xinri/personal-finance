import React from "react";
import renderer from "react-test-renderer";
import { AddOperationComponent, Props } from "./AddOperation";

it("renders correctly", () => {
  const props: Props = {
    onNewOperation: jest.fn()
  };
  const tree = renderer.create(<AddOperationComponent {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
