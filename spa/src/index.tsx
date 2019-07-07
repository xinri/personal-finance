import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { makeGetStore } from "./store";
import { applicationApi } from "./business/api";
import business from "./business";
import { Application } from "./components/Application";
import "./index.css";

const store = makeGetStore(applicationApi)();

// @ts-ignore
store.dispatch(business.fetchAccounts());

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById("root")
);
