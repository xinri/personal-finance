import React from "react";
import ReactDOM from "react-dom";
import { Store, StoreProvider } from "./store";
import { Account } from "./components/Account";
import "./index.css";

const store = new Store([]);

const Application: React.ReactElement = (
  <StoreProvider store={store}>
    <Account />
  </StoreProvider>
);

ReactDOM.render(Application, document.getElementById("root"));
