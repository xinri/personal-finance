import React from "react";
import ReactDOM from "react-dom";
import { Account } from "./components/Account";
import { Provider } from "react-redux";
import { makeGetStore } from "./store";
import { applicationApi } from "./business/api";
import "./index.css";

const Application: React.ReactElement = (
  <Provider store={makeGetStore(applicationApi)()}>
    <Account />
  </Provider>
);

ReactDOM.render(Application, document.getElementById("root"));
