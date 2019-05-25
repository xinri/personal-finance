import React from "react";
import { StoreContext, Store, State, Updater } from "../../store";
import { OperationComponent, OwnProps } from "./Operation";
import { Operation as IOperation } from "../../interfaces/Operation";

export const Operation: React.StatelessComponent<OwnProps> = ({ id }: OwnProps) => (
  <StoreContext.Consumer>
    {(store: Store | undefined) => {
      if (store) {
        const operation: IOperation = getOperation(store.getState(), id);
        const onDelete = () => {
          const updater: Updater = (state: State) => {
            const operations: IOperation[] = [...state.operations];
            const index: number = operations.findIndex(({ id: currentId }: IOperation) => currentId === id);
            if (index === -1) {
              return state;
            }
            operations.splice(index, 1);
            return {
              ...state,
              operations
            };
          };
          store.updateState(updater);
        };
        return <OperationComponent id={id} operation={operation} onDelete={onDelete} />;
      }
    }}
  </StoreContext.Consumer>
);

function getOperation({ operations }: State, id: string): IOperation {
  const index: number = operations.findIndex(({ id: currentId }: IOperation) => currentId === id);
  if (index === -1) {
    throw new Error(`No operation matches the following id: ${id}`);
  }
  return operations[index];
}
