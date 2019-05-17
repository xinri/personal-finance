import uuid from "uuid/v4";
import React from "react";
import ReactDOM from "react-dom";
import { Operation as IOperation } from "./interfaces/Operation";
import { Account } from "./components/Account";
import "./index.css";

const operationHistory: IOperation[] = [
  {
    id: uuid(),
    date: new Date(2019, 5, 12),
    amount: 100
  },
  {
    id: uuid(),
    date: new Date(2019, 5, 13),
    amount: -40
  },
  {
    id: uuid(),
    date: new Date(2019, 10, 21),
    amount: -5
  }
];

ReactDOM.render(<Account operations={operationHistory} />, document.getElementById("root"));
