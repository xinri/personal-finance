import React from "react";
import renderer from "react-test-renderer";
import { LabeledDebitOrCredit, Props } from "./LabeledDebitOrCredit";

it("renders correctly", () => {
  const props: Props = {
    amount: 10,
    renderLabel: () => <span>Label</span>
  };
  const tree = renderer.create(<LabeledDebitOrCredit {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
