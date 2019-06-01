import React from "react";
import ReactDOM from "react-dom";
import { Account } from "./components/Account";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { rootReducer } from "./business/reducer";
import { enableBatching } from "redux-batched-actions";
import thunk from "redux-thunk";
import "./index.css";

const store = createStore(enableBatching(rootReducer), composeWithDevTools(applyMiddleware(thunk)));

const Application: React.ReactElement = (
  <Provider store={store}>
    <Account />
  </Provider>
);

ReactDOM.render(Application, document.getElementById("root"));
