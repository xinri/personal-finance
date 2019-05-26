import { Updater, State, connect } from "../../store";
import { AddOperationComponent, UpdateProps, OwnProps } from "./AddOperation";
import { Operation } from "../../interfaces/Operation";

function computeUpdateProps(updateState: (updater: Updater) => void): UpdateProps {
  const onNewOperation = (operation: Operation) => {
    const updater: Updater = (state: State) => {
      return {
        ...state,
        operations: [...state.operations, operation]
      };
    };
    updateState(updater);
  };
  return { onNewOperation };
}

export const AddOperation = connect<OwnProps, {}, UpdateProps>(
  AddOperationComponent,
  { computeUpdateProps }
);
