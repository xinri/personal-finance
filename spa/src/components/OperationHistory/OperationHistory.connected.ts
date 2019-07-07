import { OperationHistoryComponent, OwnProps, StateProps, DispatchProps } from "./OperationHistory";
import { connect } from "react-redux";
import { ExtendedDispatch } from "../../business/definitions";
import { ApplicationState } from "../../business/state";
import { Operation } from "../../business/account/operation";
import { applicationSelectors } from "../../business/selectors";
import { OperationState } from "../../business/account/operation/state";
import { applicationThunksCreators } from "../../business/thunks";

function mapStateToProps(state: ApplicationState): StateProps {
  const operationState: OperationState = state.operation;
  const operations: Operation[] = applicationSelectors.account.operation.getAllOperations(operationState);
  return { operations };
}

function mapDispatchToProps(dispatch: ExtendedDispatch): DispatchProps {
  const requestOperationsFetching = () => {
    const thunk = applicationThunksCreators.account.operation.fetchOperations();
    dispatch(thunk);
  };
  return { requestOperationsFetching };
}

export const OperationHistory = connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
  mapStateToProps,
  mapDispatchToProps
)(OperationHistoryComponent);
