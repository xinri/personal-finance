import React from "react";
import ReactDOM from "react-dom";
import { Store, StoreProvider } from "./store";
import { Account } from "./components/Account";
import { Operation as IOperation } from "./interfaces/Operation";
import uuid from "uuid/v4";
import "./index.css";

const operations: IOperation[] = [
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

const store = new Store(operations);

const Application: React.ReactElement = (
  <StoreProvider store={store}>
    <Account />
  </StoreProvider>
);

ReactDOM.render(Application, document.getElementById("root"));
