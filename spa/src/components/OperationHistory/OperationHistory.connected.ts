import { connect, State, Updater } from "../../store";
import { OperationHistoryComponent, StateProps, OwnProps, UpdateProps } from "./OperationHistory";
import { Operation as IOperation } from "../../interfaces/Operation";

function computeStateProps({ operations }: State): StateProps {
  return { operations };
}

function computeUpdateProps(updateState: (updater: Updater) => void): UpdateProps {
  const onOperationsFetched = (operations: IOperation[]) => {
    const updater: Updater = (state: State) => {
      return {
        ...state,
        operations
      };
    };
    updateState(updater);
  };
  return { onOperationsFetched };
}

export const OperationHistory = connect<OwnProps, StateProps, UpdateProps>(
  OperationHistoryComponent,
  { computeStateProps, computeUpdateProps }
);
