import { OperationHistoryComponent, OwnProps, StateProps } from "./OperationHistory";
import { connect } from "react-redux";
import { ApplicationState } from "../../business/state";
import { Operation } from "../../business/account/operation";
import { getAccountOperations } from "../../business/account/selectors";

function mapStateToProps(state: ApplicationState, { accountId }: OwnProps): StateProps {
  const operations: Operation[] = getAccountOperations(state, accountId);
  return { operations };
}

export const OperationHistory = connect<StateProps, undefined, OwnProps, ApplicationState>(
  mapStateToProps,
  undefined
)(OperationHistoryComponent);
