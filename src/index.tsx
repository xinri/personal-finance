import React from "react";
import ReactDOM from "react-dom";

interface Operation {
  date: Date;
  amount: number;
}

function OperationComponent({ date, amount }: Operation): React.ReactElement {
  const dateText: string = date.toDateString();
  const separatorText: string = " | ";
  const amountText: string = (amount >= 0 ? "+" : "") + amount.toString();
  const element: React.ReactElement = React.createElement(
    "div",
    {
      className: "operation",
      key: dateText + amountText
    },
    [dateText, separatorText, amountText]
  );
  return element;
}

const operationHistory: Operation[] = [
  {
    date: new Date(2019, 5, 12),
    amount: 100
  },
  {
    date: new Date(2019, 5, 13),
    amount: -40
  }
];

const rootElement: React.ReactElement = React.createElement("div", null, operationHistory.map(OperationComponent));

ReactDOM.render(rootElement, document.getElementById("root"));
