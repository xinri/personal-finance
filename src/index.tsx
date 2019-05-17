import uuid from "uuid/v4";
import React from "react";
import ReactDOM from "react-dom";
import { Operation } from "./interfaces/Operation";
import { OperationHistoryComponent } from "./components/OperationHistory";

const operationHistory: Operation[] = [
  {
    id: uuid(),
    date: new Date(2019, 5, 12),
    amount: 100
  },
  {
    id: uuid(),
    date: new Date(2019, 5, 13),
    amount: -40
  }
];

ReactDOM.render(<OperationHistoryComponent operations={operationHistory} />, document.getElementById("root"));
