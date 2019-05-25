import React from "react";
import { StoreContext, Store } from "../../store";
import { OperationHistoryComponent, OwnProps } from "./OperationHistory";

export const OperationHistory: React.StatelessComponent<OwnProps> = () => (
  <StoreContext.Consumer>
    {(store: Store | undefined) => {
      const operations = store === undefined ? [] : store.getState().operations;
      return <OperationHistoryComponent operations={operations} />;
    }}
  </StoreContext.Consumer>
);
