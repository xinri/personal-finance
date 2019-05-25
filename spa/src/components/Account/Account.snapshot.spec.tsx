import React from "react";
import renderer from "react-test-renderer";
import { AccountComponent, Props } from "./Account";

it("renders correctly", () => {
  const props: Props = {
    operations: [
      {
        id: "0",
        date: new Date(2019, 4, 24),
        amount: 10
      },
      {
        id: "1",
        date: new Date(2019, 4, 25),
        amount: -5
      }
    ]
  };
  const tree = renderer.create(<AccountComponent {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
