import React from "react";
import renderer from "react-test-renderer";
import { FinanceDate, Props } from "./FinanceDate";

it("renders correctly", () => {
  const props: Props = {
    date: new Date(2019, 4, 24)
  };
  const tree = renderer.create(<FinanceDate {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
