import React from "react";
import renderer from "react-test-renderer";
import { BalanceComponent, Props } from "./Balance";

it("renders correctly", () => {
  const props: Props = {
    amount: 10
  };
  const tree = renderer.create(<BalanceComponent {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
