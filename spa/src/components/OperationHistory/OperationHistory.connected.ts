import { connect, State } from "../../store";
import { OperationHistoryComponent, StateProps, OwnProps } from "./OperationHistory";

function computeStateProps({ operations }: State): StateProps {
  return { operations };
}

export const OperationHistory = connect<OwnProps, StateProps, {}>(
  OperationHistoryComponent,
  { computeStateProps }
);
