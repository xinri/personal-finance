import React from "react";
import ReactDOM from "react-dom";

interface Operation {
  date: Date;
  amount: number;
}

function OperationComponent({ date, amount }: Operation): React.ReactElement {
  const dateText: string = date.toDateString();
  const amountText: string = (amount >= 0 ? "+" : "") + amount.toString();
  return (
    <div className="operation" key={dateText + amountText}>
      {dateText} | {amountText}
    </div>
  );
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

const rootElement: React.ReactElement = <div>{operationHistory.map(OperationComponent)}</div>;

ReactDOM.render(rootElement, document.getElementById("root"));
