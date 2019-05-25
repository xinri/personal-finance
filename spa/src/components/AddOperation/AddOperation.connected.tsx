import React from "react";
import { StoreContext, Store, Updater, State } from "../../store";
import { AddOperationComponent, OwnProps } from "./AddOperation";
import { Operation } from "../../interfaces/Operation";

export const AddOperation: React.StatelessComponent<OwnProps> = () => (
  <StoreContext.Consumer>
    {(store: Store | undefined) => {
      if (store) {
        const onNewOperation = (operation: Operation) => {
          const updater: Updater = (state: State) => {
            return {
              ...state,
              operations: [...state.operations, operation]
            };
          };
          store.updateState(updater);
        };
        return <AddOperationComponent onNewOperation={onNewOperation} />;
      }
    }}
  </StoreContext.Consumer>
);
