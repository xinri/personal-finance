import { State, Updater, connect } from "../../store";
import { OperationComponent, OwnProps, StateProps, UpdateProps } from "./Operation";
import { Operation as IOperation } from "../../interfaces/Operation";

function computeStateProps({ operations }: State, { id }: OwnProps): StateProps {
  const index: number = operations.findIndex(({ id: currentId }: IOperation) => currentId === id);
  if (index === -1) {
    throw new Error(`No operation matches the following id: ${id}`);
  }
  const operation: IOperation = operations[index];
  return { operation };
}

function computeUpdateProps(updateState: (updater: Updater) => void, { id }: OwnProps): UpdateProps {
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
    updateState(updater);
  };
  return { onDelete };
}

export const Operation = connect<OwnProps, StateProps, UpdateProps>(
  OperationComponent,
  { computeStateProps, computeUpdateProps }
);
