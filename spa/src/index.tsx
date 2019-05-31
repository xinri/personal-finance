import React from "react";
import ReactDOM from "react-dom";
import { Account } from "./components/Account";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { rootReducer } from "./business/reducer";
import "./index.css";

const store = createStore(rootReducer, composeWithDevTools());

const Application: React.ReactElement = (
  <Provider store={store}>
    <Account />
  </Provider>
);

ReactDOM.render(Application, document.getElementById("root"));
