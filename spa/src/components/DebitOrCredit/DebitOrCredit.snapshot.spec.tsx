import React from "react";
import renderer from "react-test-renderer";
import { DebitOrCredit, Props } from "./DebitOrCredit";

it("should render positive amounts on the left side", () => {
  const props: Props = {
    amount: 10
  };
  const tree = renderer.create(<DebitOrCredit {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render zero on the left side", () => {
  const props: Props = {
    amount: 0
  };
  const tree = renderer.create(<DebitOrCredit {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render negative amounts on the right side", () => {
  const props: Props = {
    amount: -10
  };
  const tree = renderer.create(<DebitOrCredit {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
