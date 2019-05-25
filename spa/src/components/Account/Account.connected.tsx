import React from "react";
import { StateContext, State } from "../../StateContext/StateContext";
import { AccountComponent, OwnProps } from "./Account";

export const Account: React.StatelessComponent<OwnProps> = () => (
  <StateContext.Consumer>{(state: State) => <AccountComponent operations={state.operations} />}</StateContext.Consumer>
);
