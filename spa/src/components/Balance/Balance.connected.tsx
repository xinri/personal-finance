import React from "react";
import { StoreContext, Store } from "../../store";
import { BalanceComponent, OwnProps } from "./Balance";
import { Operation } from "../../interfaces/Operation";

export const Balance: React.StatelessComponent<OwnProps> = () => (
  <StoreContext.Consumer>
    {(store: Store | undefined) => {
      if (store) {
        const balance: number = store
          .getState()
          .operations.map(extractAmount)
          .reduce(sum, 0);
        return <BalanceComponent amount={balance} />;
      }
    }}
  </StoreContext.Consumer>
);

function extractAmount({ amount }: Operation): number {
  return amount;
}

function sum(accumulated: number, current: number): number {
  return accumulated + current;
}
