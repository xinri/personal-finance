import React from "react";
import ReactDOM from "react-dom";
import { Account } from "./components/Account";
import { StateContext, State } from "./StateContext/StateContext";
import uuid from "uuid/v4";
import "./index.css";

const initialState: State = {
  operations: [
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
  ]
};

const Application: React.ReactElement = (
  <StateContext.Provider value={initialState}>
    <Account />
  </StateContext.Provider>
);

ReactDOM.render(Application, document.getElementById("root"));
