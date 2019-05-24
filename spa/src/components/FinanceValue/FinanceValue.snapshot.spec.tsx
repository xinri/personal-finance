import React from "react";
import renderer from "react-test-renderer";
import { FinanceValue, Props } from "./FinanceValue";

it("should render positive amounts with a '+' sign", () => {
  const props: Props = {
    amount: 10
  };
  const tree = renderer.create(<FinanceValue {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render zero on without a sign", () => {
  const props: Props = {
    amount: 0
  };
  const tree = renderer.create(<FinanceValue {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render negative amounts with a '-' sign", () => {
  const props: Props = {
    amount: -10
  };
  const tree = renderer.create(<FinanceValue {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
