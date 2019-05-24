import React from "react";
import renderer from "react-test-renderer";
import { AddOperation, Props } from "./AddOperation";

it("renders correctly", () => {
  const props: Props = {
    onNewOperation: jest.fn()
  };
  const tree = renderer.create(<AddOperation {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
