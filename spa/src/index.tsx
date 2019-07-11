import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { makeGetStore } from "./store";
import { Application } from "./components/Application";
import { fetchAccounts } from "./business/account/thunks";
import "./index.css";

const store = makeGetStore()();

// @ts-ignore
store.dispatch(fetchAccounts());

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById("root")
);
